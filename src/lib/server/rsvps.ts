import "server-only";
import { sql } from "./db";

export type RsvpStatus = "new" | "confirmed" | "declined";

export type Rsvp = {
  id: number;
  name: string;
  phone: string;
  people: number;
  dogs: number;
  dog_names: string | null;
  notes: string | null;
  status: RsvpStatus;
  staff_note: string | null;
  created_at: string;
};

export async function listRsvps(): Promise<Rsvp[]> {
  return (await sql`
    SELECT id, name, phone, people, dogs, dog_names, notes, status, staff_note,
      to_char(created_at AT TIME ZONE 'Asia/Kolkata', 'YYYY-MM-DD"T"HH24:MI') AS created_at
    FROM rsvps ORDER BY CASE status WHEN 'new' THEN 0 WHEN 'confirmed' THEN 1 ELSE 2 END, created_at DESC`) as Rsvp[];
}

export async function rsvpTotals() {
  const [r] = await sql`
    SELECT count(*) FILTER (WHERE status <> 'declined')::int AS parties,
      COALESCE(sum(people) FILTER (WHERE status <> 'declined'), 0)::int AS people,
      COALESCE(sum(dogs) FILTER (WHERE status <> 'declined'), 0)::int AS dogs,
      count(*) FILTER (WHERE status = 'new')::int AS unreviewed
    FROM rsvps`;
  return r as { parties: number; people: number; dogs: number; unreviewed: number };
}
