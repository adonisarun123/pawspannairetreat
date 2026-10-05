/**
 * Session pricing — introductory rates, confirmed 5 Oct 2026.
 *
 *  - Shared park: ₹500 per dog per hour. Up to PARK_CAPACITY dogs from
 *    different families share the park in any hour.
 *  - Private park (the whole park to yourselves): ₹1,000 per dog per hour,
 *    charged for a minimum of PRIVATE_MIN_DOGS dogs.
 *  - The pool is included in every session. Dogs swim 15 minutes at a time,
 *    then take a break before going back in.
 *  - People: one person per dog comes free. Beyond that, children under 5
 *    are free, 5–12 years ₹300/hr, 12+ ₹500/hr. Free places go to the
 *    12+ guests first, then to 5–12s.
 *  - A single booking may run up to MAX_HOURS continuous hours.
 */

export const SHARED_RATE = 500;
export const PRIVATE_RATE = 1000;
export const PRIVATE_MIN_DOGS = 4;
export const CHILD_RATE = 300; // 5–12 years, per hour
export const ADULT_RATE = 500; // 12+, per hour
export const PARK_CAPACITY = 10; // dogs inside the park at once
export const POOL_SWIM_MINUTES = 15;
export const MAX_HOURS = 4;
export const MIN_HOURS = 1;
export const MAX_DOGS = PARK_CAPACITY;
export const INTRO_LABEL = "Introductory pricing";

export type SessionMode = "shared" | "private";

export type PeopleCount = { adults: number; kids: number; under5: number };

export type Quote = {
  mode: SessionMode;
  dogs: number;
  hours: number;
  /** Per dog, per hour. */
  dogRate: number;
  /** Dogs actually charged — private bookings bill at least PRIVATE_MIN_DOGS. */
  billedDogs: number;
  dogTotal: number;
  people: PeopleCount;
  freePlaces: number;
  chargedAdults: number;
  chargedKids: number;
  peopleTotal: number;
  total: number;
};

export function clampDogs(n: number): number {
  return Math.min(MAX_DOGS, Math.max(1, Math.round(n || 1)));
}

export function clampHours(n: number): number {
  return Math.min(MAX_HOURS, Math.max(MIN_HOURS, Math.round(n || 1)));
}

const clampPeople = (n: number) => Math.min(30, Math.max(0, Math.round(n || 0)));

export function quote(input: {
  mode: SessionMode;
  dogs: number;
  hours: number;
  adults: number;
  kids: number;
  under5: number;
}): Quote {
  const mode: SessionMode = input.mode === "private" ? "private" : "shared";
  const dogs = clampDogs(input.dogs);
  const hours = clampHours(input.hours);
  const people = { adults: clampPeople(input.adults), kids: clampPeople(input.kids), under5: clampPeople(input.under5) };

  const dogRate = mode === "private" ? PRIVATE_RATE : SHARED_RATE;
  const billedDogs = mode === "private" ? Math.max(dogs, PRIVATE_MIN_DOGS) : dogs;
  const dogTotal = dogRate * billedDogs * hours;

  // One free person per dog: 12+ first, then 5–12.
  let free = dogs;
  const freeAdults = Math.min(free, people.adults);
  free -= freeAdults;
  const freeKids = Math.min(free, people.kids);
  const chargedAdults = people.adults - freeAdults;
  const chargedKids = people.kids - freeKids;
  const peopleTotal = (chargedAdults * ADULT_RATE + chargedKids * CHILD_RATE) * hours;

  return {
    mode,
    dogs,
    hours,
    dogRate,
    billedDogs,
    dogTotal,
    people,
    freePlaces: freeAdults + freeKids,
    chargedAdults,
    chargedKids,
    peopleTotal,
    total: dogTotal + peopleTotal,
  };
}

export function rupees(n: number): string {
  return `₹${n.toLocaleString("en-IN")}`;
}

/** The published rate card shown on Sessions & Pricing. */
export const tiers = [
  {
    id: "shared",
    name: "Shared Park",
    format: `Your dogs play alongside other families' dogs — never more than ${PARK_CAPACITY} dogs in the park at once.`,
    rate: "₹500/dog/hr",
    note: "Vaccination proof and a friendly temperament required. The pool is included.",
    published: true,
  },
  {
    id: "private",
    name: "Private Park",
    format: "The whole park and pool to your group — no other dogs.",
    rate: "₹1,000/dog/hr · min. 4 dogs",
    note: "Charged for at least 4 dogs. The right choice for reactive or nervous dogs.",
    published: true,
  },
  {
    id: "people",
    name: "People",
    format: "One person per dog comes free.",
    rate: "Under 5 free · 5–12 ₹300/hr · 12+ ₹500/hr",
    note: "Extra guests beyond the free place, per person per hour.",
    published: true,
  },
  {
    id: "pool",
    name: "Bone Pool",
    format: "Included with every session, shared or private.",
    rate: "Included",
    note: "15 minutes in the water at a time, then a break before going back in.",
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
    rate: "2 hours — free",
    note: "Not a fixed slot. Timing flexes around the day's bookings, so the front desk fits you in.",
    published: true,
  },
] as const;
