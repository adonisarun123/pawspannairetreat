import { NextResponse } from "next/server";
import { sql } from "@/lib/server/db";

/**
 * Launch-invite RSVPs. One row per phone number — resubmitting updates the
 * earlier RSVP instead of duplicating it. The invite page still hands off to
 * WhatsApp afterwards, so a failure here never loses an RSVP.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim().slice(0, 80);
  const phone = String(body.phone ?? "").trim().slice(0, 20);
  const digits = phone.replace(/\D/g, "").slice(-10);
  const people = Number(body.people);
  const dogs = Number(body.dogs);
  const dogNames = String(body.dogNames ?? "").trim().slice(0, 200) || null;
  const notes = String(body.notes ?? "").trim().slice(0, 500) || null;

  if (!name || digits.length < 10) return NextResponse.json({ error: "Name and phone are required" }, { status: 422 });
  if (!Number.isInteger(people) || people < 1 || people > 30) return NextResponse.json({ error: "Invalid number of people" }, { status: 422 });
  if (!Number.isInteger(dogs) || dogs < 0 || dogs > 10) return NextResponse.json({ error: "Invalid number of dogs" }, { status: 422 });

  const rows = await sql`
    INSERT INTO rsvps (name, phone, phone_digits, people, dogs, dog_names, notes)
    VALUES (${name}, ${phone}, ${digits}, ${people}, ${dogs}, ${dogNames}, ${notes})
    ON CONFLICT (phone_digits) DO UPDATE SET
      name = EXCLUDED.name, phone = EXCLUDED.phone, people = EXCLUDED.people, dogs = EXCLUDED.dogs,
      dog_names = EXCLUDED.dog_names, notes = EXCLUDED.notes, updated_at = now()
    RETURNING id, (xmax <> 0) AS updated`;
  return NextResponse.json({ ok: true, updated: rows[0].updated });
}
