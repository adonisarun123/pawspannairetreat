import { facts, family, hours, location } from "./site";

export type QA = { q: string; a: string };

/** IA §07 — the friction-removal page. Also feeds FAQPage JSON-LD. */
export const faqs: QA[] = [
  {
    q: "What are your opening hours?",
    a: `${hours.display}. The last session has to finish by ${hours.closesDisplay}, so there are no late-evening slots — if a booking form ever offers you one, it's wrong.`,
  },
  {
    q: "Do I need to prove my dog is vaccinated?",
    a: "Yes. Bring the vaccination card, or a photo of it, on your first visit. Core vaccinations and anti-rabies must be current. We check once and note it against your dog, so repeat visits are quicker.",
  },
  {
    q: "Will my dog be mixed with dogs it doesn't know?",
    a: "No. Every slot is booked by one party. An exclusive session is you alone; a group session is two or more dogs who already know each other, booked together. We don't put strangers' dogs in the same run — there is no on-site handler yet, and we're not taking that risk with your dog.",
  },
  {
    q: "Are there breeds or temperaments you won't take?",
    a: "We don't turn dogs away by breed. We do ask you to tell us honestly if your dog is reactive or has bitten before — there is a separate netted Aggressive Dog Zone for dogs that need their own space, and we'd rather plan for it than discover it.",
  },
  {
    q: "Is the pool included in the session price?",
    a: `No — the pool is a paid add-on at ₹250 per dog per hour, on top of the session rate. It's ${facts.poolSqFt} sq ft, shaped like a bone, and it's the one thing here you won't find on a long walk.`,
  },
  {
    q: "Can I bring my kids?",
    a: "Yes, and plenty of people do. Children are welcome throughout the park and at Tyre Cafe, but they stay with an adult and out of the pool while dogs are swimming. The tyre installations were built for dogs; kids climb them anyway.",
  },
  {
    q: "What should I bring?",
    a: "A leash for the walk from the gate, your dog's vaccination card on the first visit, a towel if you're adding the pool, and water for yourself. Leave the toys and food at home — outside toys cause fights and outside food attracts everything on the farm.",
  },
  {
    q: "What happens if it rains?",
    a: "Light rain is a normal farm day and we run as usual. If the weather makes the ground genuinely unsafe we'll message you before you set out and move your slot to another day at no cost. If you cancel on the day for your own reasons, ask us — we'd rather reschedule you than keep your money.",
  },
  {
    q: "How do I cancel or move a booking?",
    a: "Message us on WhatsApp. Move it free up to 24 hours before your slot. Inside 24 hours we'll still do our best, but a same-day no-show means the slot sat empty, so please tell us.",
  },
  {
    q: "Is there anywhere to eat?",
    a: `Tyre Cafe sits at the edge of the park, run by ${family.cafe.name} — Sthairya's own kitchen, not a third-party vendor. Filter coffee, farm food, and a place to sit in the shade while your dog wears itself out.`,
  },
  {
    q: "Do you board dogs overnight?",
    a: `Not here. We run a day park, not a kennel. If you want a night with your dog on this land, ${family.bsf.name} is next door and every PPR day visitor gets 15% off their next night there.`,
  },
  {
    q: "Where exactly are you, and how long is the drive?",
    a: `${location.addressLine}. Roughly 45 km from Sarjapur Road and the ORR, about 50 km from Electronic City. Most people from South, East and South-East Bangalore are here inside an hour and a half.`,
  },
];

/** IA §07 — park rules, stated plainly. Deliberately short. */
export const parkRules: { rule: string; why: string }[] = [
  {
    rule: "Leash on until you're through the inner gate",
    why: "The stretch between parking and the gate is shared with the working farm. Off-leash starts inside the fence, not in the car park.",
  },
  {
    rule: "Unfamiliar dogs are never mixed",
    why: "Group slots are for one party's dogs who already know each other. Until we have a full-time on-site handler, we won't pair strangers.",
  },
  {
    rule: "Tell us before you arrive if your dog is reactive",
    why: "The netted Aggressive Dog Zone exists for exactly this. It works far better as a plan than as a rescue.",
  },
  {
    rule: "No outside toys, no outside food",
    why: "Toys are the fastest route to a fight between two dogs who were getting along. Food on an open farm attracts more than dogs.",
  },
  {
    rule: "Vaccination card on your first visit",
    why: "Once, then we have it on file. It protects every dog booked after yours.",
  },
  {
    rule: "Pick up after your dog",
    why: "Bins and bags are at every zone. This is a working acre, not a lawn someone else mows.",
  },
  {
    rule: "Puppies use the Puppy Play Area",
    why: "Lower stimulus, softer ground, physically separated from the main run. Under-vaccinated puppies shouldn't be in the open park at all.",
  },
  {
    rule: "Children stay with an adult",
    why: "Dogs at full sprint don't see small people. Kids are genuinely welcome — supervised.",
  },
  {
    rule: "Last session ends at 7:30 PM",
    why: "The farm closes at dusk. Sessions are sized so nobody is asked to leave mid-play.",
  },
];

/** The twelve tyre installations. IA §04 — The Park. */
export const tyreElements = [
  { name: "Traverse Tyres", note: "Half-buried treads set in a line for balance and paw placement." },
  { name: "Tyre Hill", note: "The park's highest vantage point, and its most photographed corner." },
  { name: "Tyre Jump Through", note: "Vertical hoops along the fence line for leap-through work." },
  { name: "Tyre Weave", note: "A slalom of uprights that slows a fast dog down and makes it think." },
  { name: "Tyre Tunnel", note: "Linked casings to run through, low enough for a nervous first-timer." },
  { name: "Stepping Treads", note: "Staggered heights that teach a dog to look before it lands." },
  { name: "Tyre Arches", note: "Buried half-loops edging the fenced zones in green and red." },
  { name: "The Climb Stack", note: "A pyramid of stacked casings, painted yellow, blue and green." },
  { name: "Balance Beam", note: "A long tread run for dogs that already think they're clever." },
  { name: "Tyre Bunting", note: "The colour line along the boundary fence — signage as much as play." },
  { name: "Dig Pit Rings", note: "Sand-filled casings where digging is allowed and encouraged." },
  { name: "Bamboo Hurdle", note: "The one element that isn't a tyre — bamboo from the farm's own stand." },
];

/** Eco credentials, IA §04 — Our Story. */
export const ecoCredentials = [
  {
    title: `${facts.tyresSavedKg.toLocaleString("en-IN")} kg of tyres`,
    body: "Kept out of a landfill or a burn pile and turned into twelve play installations — the first play landscape of its kind in India.",
  },
  {
    title: "Solar",
    body: "The farm runs its lighting and pumps off a solar array rather than the grid.",
  },
  {
    title: "Bio-digester",
    body: "Waste is processed on site instead of being trucked away.",
  },
  {
    title: "Rainwater harvesting",
    body: "The monsoon fills the ground it falls on, which is why the mangoes are the size they are.",
  },
  {
    title: "CSEB blocks",
    body: "Compressed stabilised earth blocks, made from the soil here, in place of fired brick.",
  },
  {
    title: "Miyawaki forest",
    body: "A dense native plantation on the boundary, growing faster than a conventional one would.",
  },
];
