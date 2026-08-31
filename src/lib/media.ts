/**
 * Image manifest.
 *
 * Every image on the site is declared here. Slots with `src: null` render as
 * a labelled placeholder at the correct aspect ratio, so layout never shifts
 * when the real photograph arrives — drop the file into /public/images/... and
 * set `src`, `width` and `height`.
 *
 * Photography direction (IA §07): real farm textures and dappled shade over
 * styled resort gloss. A slightly imperfect real shot of the tyre trail beats
 * a polished generic one. No stock.
 */

export type MediaSlot = {
  id: string;
  src: string | null;
  width: number;
  height: number;
  /** CSS aspect-ratio value, used by the placeholder and the frame. */
  ratio: string;
  alt: string;
  /** Shown under the image where a caption is wanted. */
  caption?: string;
  /** Brief for the photographer when `src` is null. */
  brief?: string;
};

const slot = (m: MediaSlot) => m;

export const media = {
  // ---------------------------------------------------------------- real
  entranceArch: slot({
    id: "entrance-arch",
    src: "/images/park/entrance-arch.jpg",
    width: 1000,
    height: 1333,
    ratio: "3 / 4",
    alt: "The yellow steel entrance arch at Paws Pannai Retreat, with PLAY and POOL gates below a mango canopy.",
    caption: "The gate, built. Play on one side, pool on the other.",
  }),
  tyreHill: slot({
    id: "tyre-hill",
    src: "/images/park/tyre-hill.jpg",
    width: 1000,
    height: 1333,
    ratio: "3 / 4",
    alt: "A ring of yellow, green and blue painted tyres set into the grass, with the stacked tyre hill behind it.",
    caption: "Tyre Hill — the park's highest vantage point.",
  }),
  tyreJumpThrough: slot({
    id: "tyre-jump-through",
    src: "/images/park/tyre-jump-through.jpg",
    width: 1000,
    height: 1333,
    ratio: "3 / 4",
    alt: "Blue and white tyre hoops mounted vertically along a fence line for leap-through agility training.",
    caption: "Tyre Jump Through, running the fence line.",
  }),
  fencedPlayZone: slot({
    id: "fenced-play-zone",
    src: "/images/park/fenced-play-zone.jpg",
    width: 1000,
    height: 1333,
    ratio: "3 / 4",
    alt: "A fenced play zone edged with green and red tyre arches, framed by tamarind branches.",
    caption: "A fenced zone in the park's second colour pairing.",
  }),
  boundarySignage: slot({
    id: "boundary-signage",
    src: "/images/park/boundary-signage.jpg",
    width: 1000,
    height: 750,
    ratio: "4 / 3",
    alt: "A hand-painted wooden sign reading Paws Pannai Pet Park & Pool, beside a chain-link fence hung with red and orange tyres.",
    caption: "Boundary signage and tyre bunting, both installed.",
  }),

  // ------------------------------------------------------------- pending
  bonePool: slot({
    id: "bone-pool",
    src: null,
    width: 1600,
    height: 900,
    ratio: "16 / 9",
    alt: "The bone-shaped swimming pool at Paws Pannai Retreat.",
    brief:
      "The pool from a raised angle so the bone shape reads clearly. Mid-morning, with a dog in the water if possible.",
  }),
  canopyTrail: slot({
    id: "canopy-trail",
    src: null,
    width: 1600,
    height: 900,
    ratio: "16 / 9",
    alt: "The tyre play trail running under the mango canopy.",
    brief:
      "Wide, low camera down the length of the tyre trail with dappled light through the mangoes. This is the Home hero backup.",
  }),
  miyawaki: slot({
    id: "miyawaki-forest",
    src: null,
    width: 1200,
    height: 900,
    ratio: "4 / 3",
    alt: "The young Miyawaki forest plantation on the boundary.",
    brief: "The Miyawaki plot and boundary plantation, showing density rather than height.",
  }),
  tyreCafe: slot({
    id: "tyre-cafe",
    src: null,
    width: 1200,
    height: 900,
    ratio: "4 / 3",
    alt: "Tyre Cafe seating at the edge of the park.",
    brief: "The cafe seating with people and dogs in frame — proves humans have somewhere to sit.",
  }),
  puppyArea: slot({
    id: "puppy-area",
    src: null,
    width: 1200,
    height: 900,
    ratio: "4 / 3",
    alt: "The separated Puppy Play Area.",
    brief: "The puppy zone showing its physical separation from the main run.",
  }),
  farmWalk: slot({
    id: "farm-walk",
    src: null,
    width: 1600,
    height: 900,
    ratio: "16 / 9",
    alt: "A mud road running through the wider Divine Groves farm.",
    brief: "A long-leash walk down one of the mud roads through the mango and tamarind swathes.",
  }),
  landBefore: slot({
    id: "land-before",
    src: null,
    width: 1200,
    height: 900,
    ratio: "4 / 3",
    alt: "The acre before work began.",
    brief: "Archive shot of the bare land, for the before/after pair on Our Story.",
  }),
  landAfter: slot({
    id: "land-after",
    src: null,
    width: 1200,
    height: 900,
    ratio: "4 / 3",
    alt: "The same acre after the park was built.",
    brief: "Match the framing of the 'before' shot as closely as possible.",
  }),
  bsfStay: slot({
    id: "bsf-stay",
    src: null,
    width: 1600,
    height: 900,
    ratio: "16 / 9",
    alt: "Bevu Social Farmstay, next door to the park.",
    brief: "A room or verandah at BSF with a dog in frame — the day-trip-to-stay upgrade in one picture.",
  }),
  ecoCredentials: slot({
    id: "eco-credentials",
    src: null,
    width: 1200,
    height: 900,
    ratio: "4 / 3",
    alt: "Solar panels and the bio-digester on the farm.",
    brief: "Solar array, bio-digester or the CSEB block work — whichever photographs most honestly.",
  }),
} as const;

export type MediaKey = keyof typeof media;

/** Everything the Gallery page shows, in order. */
export const galleryOrder: MediaKey[] = [
  "entranceArch",
  "tyreHill",
  "tyreJumpThrough",
  "fencedPlayZone",
  "boundarySignage",
  "bonePool",
  "canopyTrail",
  "tyreCafe",
  "puppyArea",
  "farmWalk",
  "miyawaki",
];
