import type { MediaSlot } from "./media";

/**
 * Gallery-only photographs. These exist only in the ImageKit media library
 * (under /PPR — see `imagekit.ts`), not in /public, so the gallery page
 * includes them only when ImageKit is configured. Filenames are the slugs
 * set by `scripts/imagekit-organise.mjs`.
 *
 * Order is the walk through the park: gate, map, play zones, agility,
 * tyre features, swings and shade, the pool, kennels, water.
 */
const P = "3 / 4"; // 1086 × 1448 portrait
const L = "4 / 3"; // 1448 × 1086 landscape

const shot = (file: string, ratio: string, alt: string, caption?: string, focus?: string): MediaSlot => ({
  id: file.replace(/\.[^.]+$/, ""),
  src: `/${file}`,
  width: ratio === L ? 1448 : 1086,
  height: ratio === L ? 1086 : 1448,
  ratio,
  alt,
  caption,
  focus,
});

export const galleryPhotos: MediaSlot[] = [
  shot("entrance-signage.png", P, "Paws Pannai Retreat name boards on the fence just inside the gate, painted tyre boundary running off behind them.", "Just inside the gate."),
  shot("park-map.png", L, "The illustrated park map mounted on the fence, flanked by blue and green painted tyres.", "The park map, so you know where everything is."),
  shot("play-zone-green-mesh.png", P, "A play zone enclosed in green mesh fencing, painted tyres along the base, tall trees overhead.", "A fenced play zone — your dog's own space for the session."),
  shot("play-zone-fence-golden-hour.png", P, "Chain-link play-zone fence with red painted tyres at the base, in low afternoon light.", "Late light on the play-zone fence."),
  shot("play-zone-fence.png", L, "A fenced play enclosure under the trees, red and blue tyres along the fence line.", "Every zone is fenced on all four sides."),
  shot("tyre-pyramid.png", P, "A pyramid of stacked tyres painted blue, mustard and brown, built under the trees.", "The tyre pyramid."),
  shot("dog-on-tyre-pyramid.jpg", P, "A dog standing on top of the painted tyre pyramid.", "King of the hill.", "50% 30%"),
  shot("blue-tyre-arch.png", P, "An arch of blue painted tyres forming a tunnel on the grass.", "The tyre tunnel."),
  shot("inside-the-tyre-tunnel.png", P, "Looking down the tyre tunnel — blue, yellow and green rings in sequence.", "The view through."),
  shot("tyre-tunnel-under-the-trees.png", P, "The blue tyre tunnel in dappled shade under the mango canopy.", "Shade over the tunnel."),
  shot("dog-on-agility-ramp.png", P, "A dog on top of the bamboo-sided A-frame agility ramp, tyre-hoop fence behind.", "First up the ramp.", "50% 60%"),
  shot("agility-ramp-and-tyre-steps.png", P, "The A-frame agility ramp with tyre stepping rings in the foreground.", "Ramp and stepping rings."),
  shot("agility-zone.png", P, "The agility ramp inside the fenced zone, tyre-hoop boundary along the back.", "The agility zone."),
  shot("hoop-fence-corner.png", P, "The corner of the agility enclosure, white and blue tyre hoops along the fence.", "Hoops along the fence."),
  shot("agility-enclosure.png", P, "The agility enclosure from the side, hoops along the fence under the trees.", "From the side."),
  shot("tyre-hoop-wall.png", P, "A climbing frame of tyre hoops painted white, blue and yellow.", "The hoop wall."),
  shot("tyre-trail.png", L, "A trail of upright painted tyres across the grass.", "The tyre trail."),
  shot("tyre-planters.png", P, "A cluster of tyres painted blue, green and yellow, set into the ground.", "Tyre rings, set into the ground."),
  shot("tyre-swing-and-paw-charm.png", P, "A tyre swing hung from a mango branch, with a spiral yellow ribbon and a paw-print pendant.", "The paw-charm swing."),
  shot("yellow-tyre-swing.png", P, "A yellow tyre swing hanging from a tree.", "The yellow tyre swing."),
  shot("swing-set.png", P, "A tall swing frame under the trees, tyre seats painted blue and yellow.", "The swing set."),
  shot("swings-beneath-the-big-tree.png", P, "Swings hanging under a large tree in dappled light.", "Under the big tree."),
  shot("tyre-ring-under-the-trees.png", P, "A tyre ring set in the grass under the trees, yellow tyre swing beyond.", "Shade, mostly."),
  shot("woodland-tyre-playground.png", P, "Yellow tyres among the trees, long shadows across the grass.", "Evening in the woodland end."),
  shot("woodland-playground-golden-hour.png", L, "Painted tyres along the tree line at golden hour.", "Golden hour."),
  shot("tyre-seating.png", L, "Tyre seats painted white and black arranged under the trees.", "Seating for the humans."),
  shot("bunting-across-the-lawn.png", P, "Bunting strung between the trees across the lawn.", "Party-ready."),
  shot("bone-pool.png", P, "The bone-shaped dog pool with turquoise water, edged in stone, trees around.", "The Bone Pool."),
  shot("bone-pool-far-end.png", P, "The bone-shaped pool from the far end.", "From the far end."),
  shot("pool-under-the-trees.png", L, "The pool seen from under the trees.", "Shade over the water."),
  shot("kennels.png", L, "Three-compartment yellow steel kennels with pitched roofs.", "Rest kennels — shaded, separate."),
  shot("kennel-in-the-shade.png", P, "A yellow steel kennel block in the shade of the trees.", "Shade for a breather."),
  shot("water-station.png", P, "A two-bowl water station beside a stack of painted tyres.", "Water, always."),
];
