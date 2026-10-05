import { NextResponse } from "next/server";
import { CLOSE_MIN, OPEN_MIN, todayIST } from "@/lib/booking-format";
import { MAX_DOGS, MAX_HOURS, MIN_HOURS, quote, type SessionMode } from "@/lib/pricing";
import { createBooking } from "@/lib/server/bookings";
import { sql } from "@/lib/server/db";

/**
 * Public booking requests from the session planner. Saves a *pending*
 * request; staff accept or reject it in /admin. The planner opens WhatsApp
 * regardless, so a failure here never loses the enquiry.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "website" field.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim().slice(0, 80);
  const phone = String(body.phone ?? "").trim().slice(0, 20);
  const dogs = Number(body.dogs);
  const hours = Number(body.hours);
  const mode: SessionMode = body.mode === "private" ? "private" : "shared";
  const people = {
    adults: Math.max(0, Math.min(30, Number(body.adults) || 0)),
    kids: Math.max(0, Math.min(30, Number(body.kids) || 0)),
    under5: Math.max(0, Math.min(30, Number(body.under5) || 0)),
  };
  const notes = String(body.notes ?? "").trim().slice(0, 1000) || null;
  const date = typeof body.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.date) ? body.date : null;
  const start = typeof body.start === "number" && Number.isInteger(body.start) ? body.start : null;
  const ref = typeof body.ref === "string" ? body.ref : undefined;

  if (!name || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 422 });
  }
  if (!Number.isInteger(dogs) || dogs < 1 || dogs > MAX_DOGS) {
    return NextResponse.json({ error: "Invalid number of dogs" }, { status: 422 });
  }
  if (!Number.isInteger(hours) || hours < MIN_HOURS || hours > MAX_HOURS) {
    return NextResponse.json({ error: "Invalid duration" }, { status: 422 });
  }
  if (date && date < todayIST()) {
    return NextResponse.json({ error: "Date is in the past" }, { status: 422 });
  }
  if (start != null && (start < OPEN_MIN || start + hours * 60 > CLOSE_MIN)) {
    return NextResponse.json({ error: "Outside opening hours" }, { status: 422 });
  }

  // Same visitor pressing Send again: update their pending request instead of duplicating it.
  if (ref) {
    const quoteDigits = phone.replace(/\D/g, "").slice(-10);
    const updated = await sql`
      UPDATE bookings SET customer_name = ${name}, phone = ${phone}, mode = ${mode}, dogs = ${dogs},
        hours = ${hours}, adults = ${people.adults}, kids = ${people.kids}, under5 = ${people.under5},
        requested_date = ${date}, requested_start_min = ${start}, notes = ${notes},
        quoted_total = ${quote({ mode, dogs, hours, ...people }).total}, updated_at = now()
      WHERE ref = ${ref} AND status = 'pending' AND source = 'web'
        AND right(regexp_replace(phone, '[^0-9]', '', 'g'), 10) = ${quoteDigits}
        AND created_at > now() - interval '2 hours'
      RETURNING ref`;
    if (updated.length) return NextResponse.json({ ok: true, ref });
  }

  // Light abuse guard: at most 5 requests per phone number per hour.
  const digits = phone.replace(/\D/g, "").slice(-10);
  const [{ n }] = (await sql`
    SELECT count(*)::int AS n FROM bookings
    WHERE right(regexp_replace(phone, '[^0-9]', '', 'g'), 10) = ${digits}
      AND created_at > now() - interval '1 hour'`) as { n: number }[];
  if (n >= 5) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const created = await createBooking(
    { customerName: name, phone, mode, dogs, hours, ...people, requestedDate: date, requestedStartMin: start, notes },
    "web",
    null,
    ref,
  );
  return NextResponse.json({ ok: true, ref: created.ref });
}
