/**
 * Session pricing — IA §05, confirmed 30 Aug 2026.
 *
 * Rules encoded here:
 *  - Base rate is ₹1,000 per dog per hour.
 *  - The discounted rate of ₹750 per dog per hour applies once a booking
 *    trips EITHER trigger: 2+ hours (Exclusive's trigger) or 2+ dogs
 *    (Group's trigger). Both tiers land on the same discounted rate.
 *  - When a trigger is tripped, the WHOLE slot re-prices at ₹750/dog/hr —
 *    not just the marginal hour or dog. Flagged in IA §09 as an assumption
 *    worth confirming before launch.
 *  - Pool is a paid add-on at ₹250 per dog per hour, on either tier.
 *  - A single crew may book a maximum of 4 continuous hours.
 */

export const BASE_RATE = 1000;
export const DISCOUNT_RATE = 750;
export const POOL_RATE = 250;
export const MAX_HOURS = 4;
export const MIN_HOURS = 1;
export const MAX_DOGS = 10;

export type SessionTier = "exclusive" | "group";

export type Quote = {
  dogs: number;
  hours: number;
  pool: boolean;
  /** Per dog, per hour, before the pool add-on. */
  rate: number;
  discounted: boolean;
  /** Why the discounted rate did or did not apply. */
  reason: string;
  sessionTotal: number;
  poolTotal: number;
  total: number;
};

export function clampDogs(n: number): number {
  return Math.min(MAX_DOGS, Math.max(1, Math.round(n || 1)));
}

export function clampHours(n: number): number {
  return Math.min(MAX_HOURS, Math.max(MIN_HOURS, Math.round(n || 1)));
}

export function quote(input: {
  dogs: number;
  hours: number;
  pool: boolean;
}): Quote {
  const dogs = clampDogs(input.dogs);
  const hours = clampHours(input.hours);
  const pool = Boolean(input.pool);

  const byHours = hours >= 2;
  const byDogs = dogs >= 2;
  const discounted = byHours || byDogs;
  const rate = discounted ? DISCOUNT_RATE : BASE_RATE;

  const reason = discounted
    ? byHours && byDogs
      ? "Discounted rate — you're booking 2+ hours and 2+ dogs."
      : byHours
        ? "Discounted rate — the slot runs 2 hours or longer."
        : "Discounted rate — you're bringing 2 or more dogs."
    : "Single dog, single hour — the starting rate.";

  const sessionTotal = rate * dogs * hours;
  const poolTotal = pool ? POOL_RATE * dogs * hours : 0;

  return {
    dogs,
    hours,
    pool,
    rate,
    discounted,
    reason,
    sessionTotal,
    poolTotal,
    total: sessionTotal + poolTotal,
  };
}

export function rupees(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

/** The published tier table shown on Sessions & Pricing. */
export const tiers = [
  {
    id: "exclusive",
    name: "Exclusive / Private",
    format: "One dog, or your own crew — the slot is yours alone.",
    rate: "₹1,000 first hour · ₹750/dog/hr from 2 hours",
    note: "The trigger here is time. Book longer and the whole slot re-prices at the lower rate.",
    published: true,
  },
  {
    id: "group",
    name: "Group Session",
    format: "Two or more dogs who already know each other, booked by one party.",
    rate: "₹750/dog/hr from the first hour",
    note: "The trigger here is headcount. Bring the second dog and the lower rate applies immediately.",
    published: true,
  },
  {
    id: "pool",
    name: "Pool Add-On",
    format: "Add the bone-shaped pool to any session, either tier.",
    rate: "+₹250/dog/hr",
    note: "1,050 sq ft, built to a dog's proportions. The one thing you won't find on a walk.",
    published: true,
  },
  {
    id: "puppy",
    name: "Puppy-Safe Session",
    format: "Shorter, lower-stimulus, puppies only — in the separated Puppy Play Area.",
    rate: "Rate being finalised",
    note: "Mirrors the physical separation already built on site.",
    published: false,
  },
  {
    id: "training",
    name: "Training · Behaviour · Grooming",
    format: "Booked alongside a session, by appointment or on request. Weekends only.",
    rate: "Rate being finalised",
    note: "A paid add-on, never bundled into entry — we run a park, not a kennel.",
    published: false,
  },
  {
    id: "birthday",
    name: "Birthday & Private Events",
    format: "Half-day venue block with package tiers.",
    rate: "Rate being finalised",
    note: "Flat venue hire plus a per-head and per-dog add-on.",
    published: false,
  },
  {
    id: "bsf",
    name: "Staying at Bevu Social Farmstay",
    format: "Complimentary with a same-stay BSF night.",
    rate: "2 hours + pool — free",
    note: "Not a fixed slot. Timing flexes around the day's bookings, so the front desk fits you in.",
    published: true,
  },
] as const;
