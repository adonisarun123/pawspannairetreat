"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CLOSE_MIN, OPEN_MIN } from "@/lib/booking-format";
import { MAX_HOURS } from "@/lib/pricing";
import { assertPermission, getCurrentUser, type Role } from "@/lib/server/auth";
import { createBooking, findConflicts, getBooking, logEvent } from "@/lib/server/bookings";
import { sql } from "@/lib/server/db";
import { createSession, deleteSession } from "@/lib/server/session";

export type FormState = { error?: string; ok?: string } | undefined;

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const int = (f: FormData, k: string) => Number.parseInt(str(f, k), 10);

/* ----------------------------------------------------------------- auth */

export async function login(_: FormState, form: FormData): Promise<FormState> {
  const email = str(form, "email").toLowerCase();
  const password = str(form, "password");
  if (!email || !password) return { error: "Enter your email and password." };

  const rows = await sql`SELECT id, password_hash, active FROM users WHERE lower(email) = ${email}`;
  const u = rows[0];
  // Compare even when the user doesn't exist, so timing doesn't reveal valid emails.
  const ok = await bcrypt.compare(password, u?.password_hash ?? "$2b$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinva");
  if (!u || !ok || !u.active) return { error: "That email and password don't match an active account." };

  await createSession(u.id);
  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}

export async function changePassword(_: FormState, form: FormData): Promise<FormState> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const current = str(form, "current");
  const next = str(form, "next");
  const confirm = str(form, "confirm");
  if (next.length < 10) return { error: "Use at least 10 characters." };
  if (next !== confirm) return { error: "The two new passwords don't match." };

  const rows = await sql`SELECT password_hash FROM users WHERE id = ${user.id}`;
  if (!(await bcrypt.compare(current, rows[0].password_hash))) {
    return { error: "Your current password is wrong." };
  }
  const hash = await bcrypt.hash(next, 12);
  await sql`UPDATE users SET password_hash = ${hash}, must_change_password = false WHERE id = ${user.id}`;
  return { ok: "Password updated." };
}

/* ------------------------------------------------------------- bookings */

function slotFrom(form: FormData, hours: number): { startsAt: string; endsAt: string } | { error: string } {
  const date = str(form, "date");
  const start = int(form, "start");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Pick a date." };
  if (!Number.isFinite(start)) return { error: "Pick a start time." };
  const end = start + hours * 60;
  if (start < OPEN_MIN || end > CLOSE_MIN) return { error: "That slot runs outside opening hours (8:00 AM – 7:30 PM)." };
  const t = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  return { startsAt: `${date} ${t(start)}`, endsAt: `${date} ${t(end)}` };
}

async function conflictMessage(startsAt: string, endsAt: string, excludeId?: number) {
  const c = await findConflicts(startsAt, endsAt, excludeId);
  if (c.bookings.length) {
    const b = c.bookings[0];
    return `Clashes with ${b.ref} (${b.customer_name}) at ${b.starts_at.slice(11)}–${b.ends_at.slice(11)}.`;
  }
  if (c.blocks.length) {
    return `That time is blocked${c.blocks[0].reason ? ` (${c.blocks[0].reason})` : ""}.`;
  }
  return null;
}

export async function acceptBooking(_: FormState, form: FormData): Promise<FormState> {
  const user = await assertPermission("bookings.decide");
  const id = int(form, "id");
  const b = await getBooking(id);
  if (!b) return { error: "Booking not found." };
  if (b.status !== "pending") return { error: `This booking is already ${b.status}.` };

  const slot = slotFrom(form, b.hours);
  if ("error" in slot) return { error: slot.error };
  const clash = await conflictMessage(slot.startsAt, slot.endsAt, id);
  if (clash) return { error: clash };

  try {
    await sql`
      UPDATE bookings SET status = 'accepted', starts_at = ${slot.startsAt}::timestamp,
        ends_at = ${slot.endsAt}::timestamp, staff_note = ${str(form, "note") || null},
        decided_by = ${user.id}, decided_at = now(), updated_at = now()
      WHERE id = ${id} AND status = 'pending'`;
  } catch (e) {
    if (String(e).includes("no_double_booking")) return { error: "Someone just booked an overlapping slot. Pick another time." };
    throw e;
  }
  await logEvent(id, user.id, "accepted", `${slot.startsAt} – ${slot.endsAt.slice(11)}`);
  revalidatePath("/admin", "layout");
  return { ok: "accepted" };
}

export async function rejectBooking(_: FormState, form: FormData): Promise<FormState> {
  const user = await assertPermission("bookings.decide");
  const id = int(form, "id");
  const note = str(form, "note") || null;
  const rows = await sql`
    UPDATE bookings SET status = 'rejected', staff_note = ${note}, decided_by = ${user.id},
      decided_at = now(), updated_at = now()
    WHERE id = ${id} AND status = 'pending' RETURNING id`;
  if (!rows.length) return { error: "Only pending bookings can be rejected." };
  await logEvent(id, user.id, "rejected", note ?? undefined);
  revalidatePath("/admin", "layout");
  return { ok: "rejected" };
}

export async function cancelBooking(_: FormState, form: FormData): Promise<FormState> {
  const user = await assertPermission("bookings.edit");
  const id = int(form, "id");
  const note = str(form, "note") || null;
  const rows = await sql`
    UPDATE bookings SET status = 'cancelled', staff_note = COALESCE(${note}, staff_note),
      updated_at = now()
    WHERE id = ${id} AND status IN ('pending','accepted') RETURNING id`;
  if (!rows.length) return { error: "This booking can't be cancelled." };
  await logEvent(id, user.id, "cancelled", note ?? undefined);
  revalidatePath("/admin", "layout");
  return { ok: "cancelled" };
}

/** Move an accepted booking to a new time. */
export async function rescheduleBooking(_: FormState, form: FormData): Promise<FormState> {
  const user = await assertPermission("bookings.edit");
  const id = int(form, "id");
  const b = await getBooking(id);
  if (!b || b.status !== "accepted") return { error: "Only accepted bookings can be rescheduled." };
  const slot = slotFrom(form, b.hours);
  if ("error" in slot) return { error: slot.error };
  const clash = await conflictMessage(slot.startsAt, slot.endsAt, id);
  if (clash) return { error: clash };
  try {
    await sql`UPDATE bookings SET starts_at = ${slot.startsAt}::timestamp, ends_at = ${slot.endsAt}::timestamp,
      updated_at = now() WHERE id = ${id}`;
  } catch (e) {
    if (String(e).includes("no_double_booking")) return { error: "That overlaps another accepted booking." };
    throw e;
  }
  await logEvent(id, user.id, "rescheduled", `${slot.startsAt} – ${slot.endsAt.slice(11)}`);
  revalidatePath("/admin", "layout");
  return { ok: "Rescheduled." };
}

export async function deleteBooking(form: FormData) {
  await assertPermission("bookings.delete");
  await sql`DELETE FROM bookings WHERE id = ${int(form, "id")}`;
  revalidatePath("/admin", "layout");
  redirect("/admin/bookings?deleted=1");
}

export async function createManualBooking(_: FormState, form: FormData): Promise<FormState> {
  const user = await assertPermission("bookings.create");
  const customerName = str(form, "name");
  const phone = str(form, "phone");
  const dogs = int(form, "dogs");
  const hours = int(form, "hours");
  const pool = form.get("pool") === "on";
  const acceptNow = form.get("acceptNow") === "on";
  if (!customerName || phone.replace(/\D/g, "").length < 10) return { error: "Name and a 10-digit phone number are required." };
  if (!(dogs >= 1 && dogs <= 10)) return { error: "Dogs must be 1–10." };
  if (!(hours >= 1 && hours <= MAX_HOURS)) return { error: `Hours must be 1–${MAX_HOURS}.` };

  const date = str(form, "date") || null;
  const startRaw = str(form, "start");
  const start = startRaw ? Number.parseInt(startRaw, 10) : null;

  let slot: { startsAt: string; endsAt: string } | null = null;
  if (acceptNow) {
    const s = slotFrom(form, hours);
    if ("error" in s) return { error: s.error };
    const clash = await conflictMessage(s.startsAt, s.endsAt);
    if (clash) return { error: clash };
    slot = s;
  }

  const created = await createBooking(
    { customerName, phone, dogs, hours, pool, requestedDate: date, requestedStartMin: start, notes: str(form, "notes") || null },
    "manual",
    user.id,
  );
  if (slot) {
    await sql`UPDATE bookings SET status = 'accepted', starts_at = ${slot.startsAt}::timestamp,
      ends_at = ${slot.endsAt}::timestamp, decided_by = ${user.id}, decided_at = now() WHERE id = ${created.id}`;
    await logEvent(created.id, user.id, "accepted", "Accepted when added");
  }
  revalidatePath("/admin", "layout");
  redirect(`/admin/bookings/${created.id}`);
}

/* --------------------------------------------------------------- blocks */

export async function addBlock(_: FormState, form: FormData): Promise<FormState> {
  const user = await assertPermission("blocks.manage");
  const date = str(form, "date");
  const allDay = form.get("allDay") === "on";
  const start = allDay ? OPEN_MIN : int(form, "start");
  const end = allDay ? CLOSE_MIN : int(form, "end");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Pick a date." };
  if (!(end > start)) return { error: "End must be after start." };
  const t = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  const startsAt = `${date} ${t(start)}`;
  const endsAt = `${date} ${t(end)}`;
  const c = await findConflicts(startsAt, endsAt);
  if (c.bookings.length) {
    return { error: `${c.bookings.length} accepted booking(s) fall in that window (e.g. ${c.bookings[0].ref}). Move or cancel them first.` };
  }
  await sql`INSERT INTO blocked_slots (starts_at, ends_at, reason, created_by)
    VALUES (${startsAt}::timestamp, ${endsAt}::timestamp, ${str(form, "reason") || null}, ${user.id})`;
  revalidatePath("/admin", "layout");
  return { ok: "Blocked." };
}

export async function removeBlock(form: FormData) {
  await assertPermission("blocks.manage");
  await sql`DELETE FROM blocked_slots WHERE id = ${int(form, "id")}`;
  revalidatePath("/admin", "layout");
}

/* ---------------------------------------------------------------- users */

export async function createUser(_: FormState, form: FormData): Promise<FormState> {
  await assertPermission("users.manage");
  const email = str(form, "email").toLowerCase();
  const name = str(form, "name");
  const role = str(form, "role") as Role;
  const password = str(form, "password");
  if (!/^\S+@\S+\.\S+$/.test(email) || !name) return { error: "Name and a valid email are required." };
  if (role !== "admin" && role !== "manager") return { error: "Pick a role." };
  if (password.length < 10) return { error: "Temporary password must be at least 10 characters." };
  const hash = await bcrypt.hash(password, 12);
  try {
    await sql`INSERT INTO users (email, name, password_hash, role) VALUES (${email}, ${name}, ${hash}, ${role})`;
  } catch (e) {
    if (String(e).includes("users_email_key")) return { error: "Someone already uses that email." };
    throw e;
  }
  revalidatePath("/admin/users");
  return { ok: `Added ${name}. They'll be asked to set their own password on first sign-in.` };
}

export async function updateUser(form: FormData) {
  const me = await assertPermission("users.manage");
  const id = int(form, "id");
  const role = str(form, "role");
  const active = str(form, "active");
  if (id === me.id && (role === "manager" || active === "false")) {
    throw new Error("You can't demote or deactivate yourself.");
  }
  if (role === "admin" || role === "manager") await sql`UPDATE users SET role = ${role} WHERE id = ${id}`;
  if (active === "true" || active === "false") await sql`UPDATE users SET active = ${active === "true"} WHERE id = ${id}`;
  revalidatePath("/admin/users");
}

export async function resetUserPassword(_: FormState, form: FormData): Promise<FormState> {
  await assertPermission("users.manage");
  const id = int(form, "id");
  const password = str(form, "password");
  if (password.length < 10) return { error: "At least 10 characters." };
  const hash = await bcrypt.hash(password, 12);
  await sql`UPDATE users SET password_hash = ${hash}, must_change_password = true WHERE id = ${id}`;
  return { ok: "Password reset. Share it with them privately." };
}

/* ---------------------------------------------------------------- rsvps */

export async function setRsvpStatus(form: FormData) {
  await assertPermission("rsvps.manage");
  const status = str(form, "status");
  if (!["new", "confirmed", "declined"].includes(status)) throw new Error("Bad status");
  await sql`UPDATE rsvps SET status = ${status}, updated_at = now() WHERE id = ${int(form, "id")}`;
  revalidatePath("/admin", "layout");
}

export async function deleteRsvp(form: FormData) {
  await assertPermission("users.manage");
  await sql`DELETE FROM rsvps WHERE id = ${int(form, "id")}`;
  revalidatePath("/admin", "layout");
}
