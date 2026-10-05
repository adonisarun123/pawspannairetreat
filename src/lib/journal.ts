import type { MediaKey } from "./media";

/**
 * The Journal.
 *
 * Posts are structured data rather than MDX so the site keeps its zero-runtime
 * markdown toolchain and every post renders through the same design system.
 * Nothing here states a fact about the farm that isn't already in `site.ts`
 * or `content.ts` — if a post needs a new fact, add it there first.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "note"; text: string };

export type Post = {
  slug: string;
  title: string;
  /** Meta description and social card text. */
  description: string;
  /** Shown on the index. Should stand alone. */
  excerpt: string;
  tag: string;
  published: string;
  readingMinutes: number;
  hero: MediaKey;
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "built-from-scrap-tyres",
    title: "What 2,950 kg of scrap tyres becomes when you stop calling it waste",
    description:
      "Twelve dog play installations built from 2,950 kg of end-of-life tyres on a working farm near Hosur — what we made, why tyres, and what we got wrong first.",
    excerpt:
      "A truck tyre weighs more than most dogs and outlives most buildings. Here is what happened when we stopped treating them as rubbish and started treating them as a building material.",
    tag: "How we built it",
    published: "2026-08-12",
    readingMinutes: 6,
    hero: "tyreHill",
    blocks: [
      {
        kind: "p",
        text: "India generates end-of-life tyres faster than it can process them. The ones that don't get retreaded are usually burned or buried, and burning is worse than it sounds — a tyre fire is one of the dirtiest things a small town can do to its own air. We had an acre of farmland, a plan for a dog park, and a budget that would not stretch to imported agility equipment. The tyres solved all three problems at once.",
      },
      { kind: "h2", text: "Why a tyre is a good thing to build a dog park from" },
      {
        kind: "p",
        text: "It is the right hardness. A tyre gives slightly under a dog's weight, so a paw landing on a tread does not take the shock a paw landing on concrete or steel does. It holds heat less than metal, which matters when the ground temperature on an open acre in Tamil Nadu climbs through the middle of the day. It has no sharp edge anywhere on it. And it is heavy enough that a dog at full sprint cannot move it.",
      },
      {
        kind: "p",
        text: "It is also the right shape twice over — a circle to run through and a curve to climb on. Almost every piece of dog agility equipment ever manufactured is trying to be one of those two things.",
      },
      { kind: "h2", text: "The twelve" },
      {
        kind: "p",
        text: "There are twelve installations in the park, and only eleven of them are tyres. In order of how a dog usually meets them:",
      },
      {
        kind: "ul",
        items: [
          "Traverse Tyres — half-buried treads in a line, for balance and paw placement.",
          "Tyre Hill — stacked casings, the park's highest vantage point and its most photographed corner.",
          "Tyre Jump Through — vertical hoops along the fence line for leap-through work.",
          "Tyre Weave — a slalom of uprights that slows a fast dog down and makes it think.",
          "Tyre Tunnel — linked casings, low enough for a nervous first-timer.",
          "Stepping Treads — staggered heights that teach a dog to look before it lands.",
          "Tyre Arches — buried half-loops edging the fenced zones.",
          "The Climb Stack — a pyramid of stacked casings.",
          "Balance Beam — a long tread run for dogs that already think they're clever.",
          "Tyre Bunting — the colour line along the boundary fence; signage as much as play.",
          "Dig Pit Rings — sand-filled casings where digging is allowed and encouraged.",
          "Bamboo Hurdle — the one element that isn't a tyre, cut from the farm's own stand.",
        ],
      },
      { kind: "h2", text: "What we got wrong first" },
      {
        kind: "p",
        text: "We built for the dogs we imagined — confident, athletic, up for anything. The first version of the trail was too continuous. A dog would come through the gate, hit four obstacles in a row, and arrive at the far fence over-stimulated rather than tired. Tired and over-stimulated look similar for about ninety seconds and then they look nothing alike.",
      },
      {
        kind: "p",
        text: "So we broke the trail up. There is space between elements now, and shade in the gaps, and the Dig Pit sits deliberately off the main line so a dog can opt out of the circuit entirely and go do something with its nose instead. Most dogs choose the digging.",
      },
      {
        kind: "p",
        text: "The second thing we got wrong was colour. We painted the first batch in a single palette and it read as decorative rather than legible. The zones now use distinct colour pairings — yellow, blue and green in one, green and red in another — which turns out to help the humans navigate more than the dogs.",
      },
      { kind: "h2", text: "The rest of the acre" },
      {
        kind: "p",
        text: "The tyres are the visible part. Underneath them the farm runs its lighting and pumps off solar rather than the grid, processes its waste in an on-site bio-digester, harvests rainwater into the ground it falls on, and was built with compressed stabilised earth blocks made from the soil here rather than fired brick. There is a Miyawaki plantation on the boundary growing faster than a conventional one would.",
      },
      {
        kind: "note",
        text: "None of that is why anyone drives out from Bangalore. People come because their dog gets to run. But it is why the shade is real shade from 10-plus mango and 8-plus tamarind trees rather than a pergola with a shade cloth on it.",
      },
    ],
  },
  {
    slug: "dog-swimming-near-bangalore",
    title: "Where can you actually take a dog swimming near Bangalore?",
    description:
      "An honest look at the options for swimming a dog near Bangalore — lakes, rivers, hotel pools and purpose-built dog pools — and what each one costs you in risk.",
    excerpt:
      "Most of the water within driving distance of Bangalore is either off-limits to dogs, unsafe for them, or both. Here is the real list, including the option we built.",
    tag: "Planning a day out",
    published: "2026-08-19",
    readingMinutes: 5,
    hero: "bonePool",
    blocks: [
      {
        kind: "p",
        text: "Swimming is the best exercise most dogs will ever get. It loads the whole body without loading the joints, which is why it is the first thing a physiotherapist recommends for an older dog, a recovering dog or an overweight one. It is also the single hardest thing to arrange in and around Bangalore. Here is the honest state of the options.",
      },
      { kind: "h2", text: "Lakes" },
      {
        kind: "p",
        text: "Bangalore's lakes are the obvious answer and mostly the wrong one. Water quality varies enormously and unpredictably between lakes and between seasons, blue-green algae blooms are a genuine hazard to dogs, and access rules differ lake by lake with several explicitly prohibiting animals in the water. The bigger practical problem is the edges: a dog that gets into a lake easily does not always get out of one easily.",
      },
      { kind: "h2", text: "Rivers and reservoirs further out" },
      {
        kind: "p",
        text: "Better water, worse everything else. Current is the risk people underestimate — a dog swimming against even a mild flow tires far faster than it does in still water, and it will not tell you it is in trouble until it is. If you do this, do it in a shallow stretch, keep the dog on a long line, and get out long before it wants to.",
      },
      { kind: "h2", text: "Hotel and resort pools" },
      {
        kind: "p",
        text: "A handful of pet-friendly properties around Bangalore will let a dog into the water, usually as an exception rather than a policy, and usually in a pool built for people. Human pools are the wrong shape for dogs: uniform depth, vertical walls, and steps sized for a human stride. A dog that cannot find the exit in a pool it does not know is a dog in trouble. Chlorine levels set for humans are also higher than most dogs' skin and ears appreciate over repeated visits.",
      },
      { kind: "h2", text: "A pool built for dogs" },
      {
        kind: "p",
        text: "This is the option we built, so treat the rest of this section as interested rather than neutral. Our pool is 1,050 sq ft, shaped like a bone, and graded shallow to deep rather than stepped. The shallow end means a dog that has never swum can stand up in it and work out what is happening. The shape means there is always an obvious way out within a few strides, from anywhere in the pool.",
      },
      {
        kind: "p",
        text: "It is included with every session — shared or private — so there is no extra line to decide on at the gate. Dogs swim 15 minutes at a time, then come out for a break before going back in; tired dogs and deep water do not mix.",
      },
      { kind: "h2", text: "Whatever you choose, these hold" },
      {
        kind: "ul",
        items: [
          "Not every dog swims. Deep-chested breeds and short-muzzled breeds often can't, or can't safely. Never assume a dog will float because it is a dog.",
          "First time in water is on a leash or a long line, with you in it too if the dog will let you.",
          "Dogs do not pace themselves. You end the session, not the dog.",
          "Rinse the coat afterwards, and dry the ears properly — swimming ears are how ear infections start.",
          "A tired dog and an exhausted dog are different animals. Stop at tired.",
        ],
      },
      {
        kind: "note",
        text: "If your dog has never been in water, book a session and plan to spend the first fifteen-minute turn doing nothing but standing in the shallow end. That is not a wasted session. That is the session.",
      },
    ],
  },
  {
    slug: "first-off-leash-session",
    title: "Your dog's first off-leash session: what to bring, what to expect",
    description:
      "A practical guide to a first visit to an off-leash dog park — what to pack, what happens in the first ten minutes, and the mistakes that make a good day go wrong.",
    excerpt:
      "The first ten minutes decide how the next two hours go. Here is what to pack, what to do at the gate, and the two mistakes almost everyone makes.",
    tag: "Planning a day out",
    published: "2026-08-24",
    readingMinutes: 5,
    hero: "fencedPlayZone",
    blocks: [
      {
        kind: "p",
        text: "A dog that has spent its life on a lead in a city does not automatically know what to do with an acre. Some sprint. Some freeze. Some stand at your feet for ten minutes and then do not come back for an hour. All three are normal, and none of them tell you anything about your dog except that this is new.",
      },
      { kind: "h2", text: "What to bring" },
      {
        kind: "ul",
        items: [
          "A leash, for the walk from the car park to the inner gate. Off-leash starts inside the fence, not in the car park.",
          "Your dog's vaccination card, or a photograph of it, on the first visit. Core vaccinations and anti-rabies must be current. We check once and note it, so repeat visits are quicker.",
          "A towel, if you are adding the pool.",
          "Water for yourself. There is water for the dogs on site.",
          "A long line, if you want to walk the wider farm afterwards.",
        ],
      },
      { kind: "h2", text: "What to leave at home" },
      {
        kind: "p",
        text: "Toys and food. Both rules exist because of what they prevent rather than what they cost you. A toy is the fastest route to a fight between two dogs who were getting along a moment earlier, and it does not have to be a serious fight to end a good day. Food on an open farm attracts considerably more than dogs.",
      },
      { kind: "h2", text: "The first ten minutes" },
      {
        kind: "p",
        text: "Walk the perimeter with your dog before you let it off. It sounds fussy and it changes everything: a dog that has seen the boundary knows the shape of the space it is in, and a dog that knows the shape of the space settles far faster than one released into the middle of it.",
      },
      {
        kind: "p",
        text: "Then let it off and do nothing. Do not call it, do not follow it, do not start throwing anything. Let it go and smell the place. Most dogs do one fast lap, then slow down and start using their nose, and the nose is where the actual tiredness comes from.",
      },
      { kind: "h2", text: "The two mistakes" },
      {
        kind: "p",
        text: "The first is calling your dog constantly. Every recall you make that the dog ignores makes the next one weaker, and in a brand-new space with a hundred new smells, a dog will ignore you. Save the recall for when you need it and it will still work when you do.",
      },
      {
        kind: "p",
        text: "The second is running the session to the clock rather than to the dog. An hour is plenty for a first visit. A dog that leaves wanting more comes back into the space confidently next time; a dog that leaves overwhelmed remembers that instead.",
      },
      { kind: "h2", text: "One thing worth telling us in advance" },
      {
        kind: "p",
        text: "If your dog is reactive, or has bitten before, say so when you book. We do not turn dogs away by breed and we do not turn away reactive dogs. There is a separate netted zone that exists for exactly this, and it works far better as a plan than as a rescue. If your dog is uneasy around strange dogs, book the park privately so no other dogs share your slot — the honest version of your dog is the only version we need to plan around.",
      },
      {
        kind: "note",
        text: "Puppies use the Puppy Play Area rather than the open run — lower stimulus, softer ground, physically separated. Under-vaccinated puppies should not be in the open park at all.",
      },
    ],
  },
  {
    slug: "is-your-dog-ready-off-leash",
    title: "Is your dog ready for off-leash play? An honest checklist",
    description:
      "Not every dog should be off-leash, and not every dog that should be is ready today. A straight checklist, including the cases where the answer is no.",
    excerpt:
      "Most guides to this are written to sell you something. This one includes the cases where you should not come — and what to do instead.",
    tag: "Dogs",
    published: "2026-08-28",
    readingMinutes: 4,
    hero: "tyreJumpThrough",
    blocks: [
      {
        kind: "p",
        text: "Running a dog park means occasionally telling someone their dog is not ready, which is an awkward conversation to have at a gate someone has driven ninety minutes to reach. So here is the checklist in advance.",
      },
      { kind: "h2", text: "Health first" },
      {
        kind: "ul",
        items: [
          "Core vaccinations and anti-rabies current, with the card to show. Not negotiable, and it protects every dog booked after yours.",
          "Not currently in season. Come back afterwards.",
          "No limp, no recent surgery, no untreated skin condition. An acre finds a weakness that a street walk hides.",
          "Old dogs are welcome. Old dogs at full sprint on uneven ground are a different question — book the pool instead and let the water do the work.",
        ],
      },
      { kind: "h2", text: "Behaviour" },
      {
        kind: "p",
        text: "The honest test is not whether your dog is friendly. It is whether you can predict your dog. A dog you can predict is manageable even if it is difficult; a dog you cannot predict is a problem even if it is sweet.",
      },
      {
        kind: "ul",
        items: [
          "Do you know what your dog does when it is startled? If the answer is 'I have never seen it startled', that is worth finding out somewhere smaller first.",
          "Does your dog guard things — a toy, a stick, you? Resource guarding is the most common cause of trouble in shared space.",
          "Has your dog ever bitten? Tell us. There is a netted zone for dogs that need their own space, and using it is not a punishment.",
          "Does your dog come back at all, ever, in an open space? It does not need to be a perfect recall. It needs to exist.",
        ],
      },
      { kind: "h2", text: "When the answer is no, for now" },
      {
        kind: "p",
        text: "A dog that is reactive to other dogs is not disqualified here. Book the park privately and no other dogs share your slot — a genuinely different situation from a public park, and the reason some people drive a long way to get here.",
      },
      {
        kind: "p",
        text: "A dog that is reactive to people is a harder case, because there are people on a working farm — staff, other visitors walking to their own slot, the cafe. Talk to us before you book rather than after.",
      },
      {
        kind: "p",
        text: "And a puppy that has not finished its vaccination course should not be in the open park at all. The Puppy Play Area exists for the ones that have.",
      },
      {
        kind: "note",
        text: "If you are unsure, message us on WhatsApp and describe your dog honestly. We would far rather plan around it than discover it.",
      },
    ],
  },
];

export function postBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Newest first. */
export const postsByDate = [...posts].sort((a, b) => b.published.localeCompare(a.published));
