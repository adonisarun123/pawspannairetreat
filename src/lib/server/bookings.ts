import "server-only";
import { randomInt } from "node:crypto";
import { PARK_CAPACITY, quote, type SessionMode } from "@/lib/pricing";
import type { BookingStatus } from "@/lib/booking-format";
import { sql } from "./db";

export type Booking = {
  id: number;
  ref: string;
  status: BookingStatus;
  source: "web" | "manual";
  mode: SessionMode;
  adults: number;
  kids: number;
  under5: number;
  customer_name: string;
  phone: string;
  dogs: number;
  hours: number;
  pool: boolean;
  requested_date: string | null;
  requested_start_min: number | null;
  /** IST local, "YYYY-MM-DDTHH:MM". */
  starts_at: string | null;
  ends_at: string | null;
  quoted_total: number;
  notes: string | null;
  staff_note: string | null;
  decided_by_name: string | null;
  decided_at: string | null;
  created_at: string;
};

export type Block = {
  id: number;
  starts_at: string;
  ends_at: string;
  reason: string | null;
};

/* Every read goes through this select so timestamps come back as plain IST strings. */
const COLS = sql`
  b.id, b.ref, b.status, b.source, b.mode, b.adults, b.kids, b.under5, b.customer_name, b.phone, b.dogs, b.hours, b.pool,
  to_char(b.requested_date, 'YYYY-MM-DD') AS requested_date,
  b.requested_start_min,
  to_char(b.starts_at, 'YYYY-MM-DD"T"HH24:MI') AS starts_at,
  to_char(b.ends_at, 'YYYY-MM-DD"T"HH24:MI') AS ends_at,
  b.quoted_total, b.notes, b.staff_note,
  u.name AS decided_by_name,
  to_char(b.decided_at AT TIME ZONE 'Asia/Kolkata', 'YYYY-MM-DD"T"HH24:MI') AS decided_at,
  to_char(b.created_at AT TIME ZONE 'Asia/Kolkata', 'YYYY-MM-DD"T"HH24:MI') AS created_at`;

const REF_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function newRef(): string {
  let s = "";
  for (let i = 0; i < 5; i++) s += REF_ALPHABET[randomInt(REF_ALPHABET.length)];
  return `PP-${s}`;
}

export function isValidRef(ref: string): boolean {
  return new RegExp(`^PP-[${REF_ALPHABET}]{5}$`).test(ref);
}

export async function listBookings(opts: {
  status?: BookingStatus | "all";
  from?: string;
  to?: string;
  limit?: number;
}): Promise<Booking[]> {
  const status = opts.status && opts.status !== "all" ? opts.status : null;
  const rows = await sql`
    SELECT ${COLS} FROM bookings b LEFT JOIN users u ON u.id = b.decided_by
    WHERE (${status}::text IS NULL OR b.status = ${status})
      AND (${opts.from ?? null}::date IS NULL OR COALESCE(b.starts_at::date, b.requested_date) >= ${opts.from ?? null}::date)
      AND (${opts.to ?? null}::date IS NULL OR COALESCE(b.starts_at::date, b.requested_date) <= ${opts.to ?? null}::date)
    ORDER BY CASE WHEN b.status = 'pending' THEN 0 ELSE 1 END,
             COALESCE(b.starts_at, b.requested_date::timestamp) NULLS LAST, b.created_at DESC
    LIMIT ${opts.limit ?? 200}`;
  return rows as Booking[];
}

export async function getBooking(id: number): Promise<Booking | null> {
  const rows = await sql`
    SELECT ${COLS} FROM bookings b LEFT JOIN users u ON u.id = b.decided_by WHERE b.id = ${id}`;
  return (rows[0] as Booking) ?? null;
}

export async function bookingEvents(id: number) {
  return (await sql`
    SELECT e.action, e.detail, u.name AS user_name,
      to_char(e.created_at AT TIME ZONE 'Asia/Kolkata', 'YYYY-MM-DD"T"HH24:MI') AS at
    FROM booking_events e LEFT JOIN users u ON u.id = e.user_id
    WHERE e.booking_id = ${id} ORDER BY e.created_at DESC`) as {
    action: string;
    detail: string | null;
    user_name: string | null;
    at: string;
  }[];
}

/** Accepted bookings and blocked slots in [from, to] (inclusive dates) — for the calendar. */
export async function calendarRange(from: string, to: string) {
  const bookings = (await sql`
    SELECT ${COLS} FROM bookings b LEFT JOIN users u ON u.id = b.decided_by
    WHERE (b.status = 'accepted' AND b.starts_at::date BETWEEN ${from}::date AND ${to}::date)
       OR (b.status = 'pending' AND COALESCE(b.starts_at::date, b.requested_date) BETWEEN ${from}::date AND ${to}::date)
    ORDER BY COALESCE(b.starts_at, b.requested_date::timestamp)`) as Booking[];
  const blocks = await listBlocks(from, to);
  return { bookings, blocks };
}

export async function listBlocks(from: string, to: string): Promise<Block[]> {
  return (await sql`
    SELECT id, reason,
      to_char(starts_at, 'YYYY-MM-DD"T"HH24:MI') AS starts_at,
      to_char(ends_at, 'YYYY-MM-DD"T"HH24:MI') AS ends_at
    FROM blocked_slots
    WHERE starts_at::date <= ${to}::date AND ends_at::date >= ${from}::date
    ORDER BY starts_at`) as Block[];
}

/**
 * Can a booking of `dogs` in `mode` take [startsAt, endsAt)? Returns a reason
 * when it can't. Rules:
 *  - blocked time is never bookable;
 *  - a private booking needs the park empty — no other accepted booking overlaps;
 *  - a shared booking can't overlap a private one, and the dogs already accepted
 *    in overlapping shared bookings plus these must stay within PARK_CAPACITY.
 *    (Overlapping bookings are summed — a conservative, never-over-capacity check.)
 */
export async function availabilityProblem(
  startsAt: string,
  endsAt: string,
  mode: SessionMode,
  dogs: number,
  excludeId?: number,
): Promise<string | null> {
  const blocks = (await sql`
    SELECT reason FROM blocked_slots
    WHERE tsrange(starts_at, ends_at) && tsrange(${startsAt}::timestamp, ${endsAt}::timestamp)
    LIMIT 1`) as { reason: string | null }[];
  if (blocks.length) return `That time is blocked${blocks[0].reason ? ` (${blocks[0].reason})` : ""}.`;

  const overlapping = (await sql`
    SELECT ref, customer_name, mode, dogs,
      to_char(starts_at, 'HH24:MI') AS s, to_char(ends_at, 'HH24:MI') AS e
    FROM bookings
    WHERE status = 'accepted' AND id <> ${excludeId ?? 0}
      AND tsrange(starts_at, ends_at) && tsrange(${startsAt}::timestamp, ${endsAt}::timestamp)
    ORDER BY starts_at`) as { ref: string; customer_name: string; mode: SessionMode; dogs: number; s: string; e: string }[];

  const priv = overlapping.find((o) => o.mode === "private");
  if (priv) return `The park is booked privately by ${priv.customer_name} (${priv.ref}) ${priv.s}–${priv.e}.`;
  if (mode === "private" && overlapping.length) {
    const o = overlapping[0];
    return `A private booking needs the park empty, but ${o.customer_name} (${o.ref}, ${o.dogs} dog${o.dogs > 1 ? "s" : ""}) is booked ${o.s}–${o.e}.`;
  }
  const already = overlapping.reduce((n, o) => n + o.dogs, 0);
  if (already + dogs > PARK_CAPACITY) {
    return `Only ${Math.max(0, PARK_CAPACITY - already)} of ${PARK_CAPACITY} places left in that time (${already} dog${already === 1 ? "" : "s"} already booked).`;
  }
  return null;
}

/** Overlap check used when blocking time: accepted bookings inside the window. */
export async function bookingsInWindow(startsAt: string, endsAt: string) {
  return (await sql`
    SELECT ref FROM bookings
    WHERE status = 'accepted'
      AND tsrange(starts_at, ends_at) && tsrange(${startsAt}::timestamp, ${endsAt}::timestamp)`) as { ref: string }[];
}

export type NewBooking = {
  customerName: string;
  phone: string;
  mode: SessionMode;
  dogs: number;
  hours: number;
  adults: number;
  kids: number;
  under5: number;
  requestedDate: string | null;
  requestedStartMin: number | null;
  notes: string | null;
};

export async function createBooking(
  input: NewBooking,
  source: "web" | "manual",
  userId: number | null,
  preferredRef?: string,
): Promise<{ id: number; ref: string; total: number }> {
  const q = quote(input);
  for (let attempt = 0; attempt < 5; attempt++) {
    const ref = attempt === 0 && preferredRef && isValidRef(preferredRef) ? preferredRef : newRef();
    try {
      const rows = await sql`
        INSERT INTO bookings (ref, source, mode, customer_name, phone, dogs, hours, adults, kids, under5,
          pool, requested_date, requested_start_min, quoted_total, notes, created_by)
        VALUES (${ref}, ${source}, ${q.mode}, ${input.customerName}, ${input.phone}, ${q.dogs}, ${q.hours},
          ${q.people.adults}, ${q.people.kids}, ${q.people.under5}, true,
          ${input.requestedDate}, ${input.requestedStartMin}, ${q.total}, ${input.notes}, ${userId})
        RETURNING id`;
      const id = rows[0].id as number;
      await logEvent(id, userId, "created", source === "web" ? "Requested on the website" : "Added by staff");
      return { id, ref, total: q.total };
    } catch (e) {
      if (String(e).includes("bookings_ref_key")) continue; // ref collision — retry
      throw e;
    }
  }
  throw new Error("Could not allocate a booking reference");
}

export async function logEvent(bookingId: number, userId: number | null, action: string, detail?: string) {
  await sql`INSERT INTO booking_events (booking_id, user_id, action, detail)
            VALUES (${bookingId}, ${userId}, ${action}, ${detail ?? null})`;
}

export async function dashboardStats(today: string, weekEnd: string, monthStart: string) {
  const rows = await sql`
    SELECT
      count(*) FILTER (WHERE status = 'pending') AS pending,
      count(*) FILTER (WHERE status = 'accepted' AND starts_at::date = ${today}::date) AS today,
      count(*) FILTER (WHERE status = 'accepted' AND starts_at::date BETWEEN ${today}::date AND ${weekEnd}::date) AS week,
      COALESCE(sum(dogs) FILTER (WHERE status = 'accepted' AND starts_at::date = ${today}::date), 0) AS dogs_today,
      COALESCE(sum(quoted_total) FILTER (WHERE status = 'accepted' AND starts_at::date >= ${monthStart}::date AND starts_at::date <= ${today}::date), 0) AS revenue_mtd,
      COALESCE(sum(quoted_total) FILTER (WHERE status = 'accepted' AND starts_at::date > ${today}::date), 0) AS revenue_upcoming
    FROM bookings`;
  const r = rows[0];
  return {
    pending: Number(r.pending),
    today: Number(r.today),
    week: Number(r.week),
    dogsToday: Number(r.dogs_today),
    revenueMtd: Number(r.revenue_mtd),
    revenueUpcoming: Number(r.revenue_upcoming),
  };
}
