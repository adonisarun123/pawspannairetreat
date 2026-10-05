/**
 * Locality landing pages.
 *
 * These exist because "dog park near <my part of Bangalore>" is how people
 * actually search. They are NOT doorway pages: each one carries a different
 * route, a different reason to come, and a different honest caveat. If a
 * locality has nothing distinct to say, it does not get a page.
 */

export type Locality = {
  slug: string;
  /** How people write it. */
  name: string;
  /** Distance from site.driveTimes — kept in sync by hand, deliberately. */
  distance: string;
  /** The road you actually take. */
  route: string;
  title: string;
  description: string;
  /** One paragraph: why this drive is worth it from here specifically. */
  lede: string;
  /** The honest downside from this locality. */
  caveat: string;
  /** Three things that matter to this audience in particular. */
  points: { title: string; body: string }[];
  /** Locality-specific questions, feeding FAQPage JSON-LD on the page. */
  faqs: { q: string; a: string }[];
};

export const localities: Locality[] = [
  {
    slug: "whitefield",
    name: "Whitefield",
    distance: "44.9 km",
    route: "Whitefield → Sarjapur Road → Attibele → Hosur Road → Shoolagiri Road",
    title: "Dog park near Whitefield",
    description:
      "Paws Pannai Retreat is 44.9 km from Whitefield — a one-acre off-leash dog park with a bone-shaped dog swimming pool on a working farm near Hosur. Hourly sessions, shared or private.",
    lede:
      "Whitefield has more large dogs living in apartments than almost anywhere else in the city, and correspondingly little ground to run them on. At 44.9 km this is a real drive, but it is the same drive people already make for a weekend lunch — with a much better outcome for the dog.",
    caveat:
      "The route cuts south-east across the city rather than going through it, which is good, but it means you are on Sarjapur Road for a stretch. Leave early and it is straightforward; leave at eleven and Sarjapur will cost you.",
    points: [
      {
        title: "Built for a big dog",
        body: "An acre of open, fenced ground and a graded pool. A Labrador or a shepherd that lives in a two-bedroom flat gets more out of one session here than out of a fortnight of lift-and-pavement walks.",
      },
      {
        title: "Swimming, not just running",
        body: "Water is the exercise that spares the joints, which starts to matter for exactly the large breeds Whitefield is full of. The pool is graded shallow to deep, not stepped like a human pool.",
      },
      {
        title: "Turn it into a night",
        body: "At this distance the day-trip and the overnight are close in effort. Bevu Social Farmstay is through a separate entrance on the same land, and every day visitor gets 15% off a night.",
      },
    ],
    faqs: [
      {
        q: "How far is Paws Pannai Retreat from Whitefield?",
        a: "44.9 km, heading south-east via Sarjapur Road and Attibele onto Hosur Road, then off at Shoolagiri Road.",
      },
      {
        q: "Is it worth the drive from Whitefield for one hour?",
        a: "Honestly, no. Book two hours or more — it also drops the whole booking to the lower per-dog rate, so the longer session costs less per hour than the short one.",
      },
    ],
  },
  {
    slug: "hosur",
    name: "Hosur",
    distance: "25.2 km",
    route: "Hosur → Shoolagiri Road → Seekanapalli Village",
    title: "Dog park in Hosur",
    description:
      "A one-acre off-leash dog park and dog swimming pool 25.2 km from Hosur, at Seekanapalli Village on Shoolagiri Road. Booked by the hour, open every day.",
    lede:
      "Almost everything written about this park is aimed at people driving down from Bangalore. If you live in Hosur, none of that applies to you: at 25.2 km this is simply your local dog park, and you can use it like one.",
    caveat:
      "Being close is the trap. A twenty-minute drive makes it tempting to come for a single hour on a whim — which is fine, but the rate structure rewards two hours, and so does the dog.",
    points: [
      {
        title: "Use it as a routine, not an outing",
        body: "The people who get most out of this park are the ones who come often enough that their dog knows the ground. That is only realistic from Hosur.",
      },
      {
        title: "Weekday mornings are empty",
        body: "Weekends fill with Bangalore traffic. If you are local, you have access to the quietest and best hours of the week, which is exactly what a nervous or reactive dog needs.",
      },
      {
        title: "A working farm, not a facility",
        body: "You already know the landscape. What is different here is that an acre of it is fenced, off-leash and built for dogs — 12 tyre installations and a pool, on ground you can actually let a dog loose on.",
      },
    ],
    faqs: [
      {
        q: "Where exactly is the dog park in Hosur?",
        a: "Plot 79, SF3 (Divine Groves), Shoolagiri Road, Seekanapalli Village, Post Berigai, Hosur, Tamil Nadu 635105 — 25.2 km from Hosur town.",
      },
      {
        q: "Can I come regularly if I live in Hosur?",
        a: "Yes, and it is the best way to use the park. Sessions are booked by the hour every day, and once we have your dog's vaccination card on file, repeat bookings are quick.",
      },
    ],
  },
  {
    slug: "hsr-layout",
    name: "HSR Layout",
    distance: "58.3 km",
    route: "HSR Layout → Silk Board → Hosur Road (NH 44) → Shoolagiri Road",
    title: "Dog park near HSR Layout",
    description:
      "Around 58.3 km from HSR Layout via Hosur Road — a one-acre off-leash dog park and dog swimming pool on a working farm near Hosur. Booked by the hour, shared or private.",
    lede:
      "HSR has one of the densest dog-owning populations in Bangalore and some of its least dog-friendly public space. At 58.3 km this is the longest of the three runs, and the one people most often turn into a proper day out rather than a quick trip.",
    caveat:
      "You have to get past Silk Board. Leave before 8 AM and it is a non-event; leave at 10 on a Saturday and you will add half an hour before you have gone anywhere.",
    points: [
      {
        title: "Make it a group booking",
        body: "HSR dogs tend to already have a walking crew. Four or more dogs can take the whole park privately at ₹1,000 per dog per hour — or share the park at ₹500 per dog per hour — and you split the drive between you as well.",
      },
      {
        title: "Space HSR does not have",
        body: "An acre of fenced, off-leash ground with separated zones for puppies and for reactive dogs. Nothing in HSR comes close, which is exactly why the drive is on the table.",
      },
      {
        title: "Private when you need it",
        body: "If your dog is reactive around strange dogs — common in a neighbourhood this dense — book the park privately and no other dogs share your slot. That is the whole reason to come here rather than a public park.",
      },
    ],
    faqs: [
      {
        q: "How far is Paws Pannai Retreat from HSR Layout?",
        a: "Around 58.3 km, via Silk Board and Hosur Road. It is the longest drive of the Bangalore localities we serve, and the one most affected by when you leave.",
      },
      {
        q: "Can a group of us from HSR book together?",
        a: "Yes. Share the park at ₹500 per dog per hour, or with four or more dogs take the whole park privately at ₹1,000 per dog per hour so no other dogs join you. One person per dog comes free (introductory pricing).",
      },
    ],
  },
];

export function localityBySlug(slug: string): Locality | undefined {
  return localities.find((l) => l.slug === slug);
}
