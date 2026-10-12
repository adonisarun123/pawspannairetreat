// One-off, idempotent. Reads IMAGEKIT_PRIVATE_KEY from .env.local.
//  1. Renames the curated /PPR photographs to slug filenames and moves them to /PPR/gallery/
//     (names with spaces make poor image URLs; the slugs match src/lib/gallery.ts).
//  2. Uploads the five /public/images/park photographs to /PPR/images/park/ so the paths the
//     site already uses resolve on ImageKit.
// Nothing is deleted. Files not in the curated list stay where they are.
import { readFileSync } from "node:fs";


const root = new URL("../", import.meta.url);
const env = Object.fromEntries(
  readFileSync(new URL(".env.local", root), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; }),
);
const auth = "Basic " + Buffer.from(env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64");
const api = async (method, path, body) => {
  const r = await fetch("https://api.imagekit.io/v1" + path, {
    method,
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  return { ok: r.ok, status: r.status, data: text ? JSON.parse(text) : null };
};

// original name in /PPR  ->  slug (without extension)
const curated = {
  "Paws Pannai Pet Park Entrance": "entrance-signage",
  "Paws Pannai Pet Park Map": "park-map",
  "Sunlit Garden Play Yard": "play-zone-green-mesh",
  "Golden-Hour Garden Fence with Painted Tyres": "play-zone-fence-golden-hour",
  "Sunny Park Enclosure with Colourful Tyres": "play-zone-fence",
  "Dog on a Colourful Tyre Pyramid": "tyre-pyramid",
  "natural_photo_10_percent_enhanced": "dog-on-tyre-pyramid",
  "Colourful Tyre Trail in a Sunlit Garden": "blue-tyre-arch",
  "Painted Tire Tunnel in the Park": "inside-the-tyre-tunnel",
  "Vibrant Tyre Obstacle Trail in a Garden": "tyre-tunnel-under-the-trees",
  "Happy Dog on Agility Ramp": "dog-on-agility-ramp",
  "Colourful Backyard Agility Playground": "agility-ramp-and-tyre-steps",
  "Sunlit Tire Agility Park": "agility-zone",
  "Vibrant Tyre-Ring Dog Agility Park": "hoop-fence-corner",
  "Colourful Pet Play Area in the Park": "agility-enclosure",
  "Sunlit Tyre Climbing Frame in Garden": "tyre-hoop-wall",
  "Colourful Tyre Obstacle in a Leafy Garden": "tyre-trail",
  "Colourful Tyre Garden Beneath a Tropical Sky": "tyre-planters",
  "Sunlit Spiral Paw Charm Garden": "tyre-swing-and-paw-charm",
  "Sunlit Yellow Tyre Beneath Twin Trees": "yellow-tyre-swing",
  "Sunlit Garden Swing Set": "swing-set",
  "Sunlit Swings Beneath the Great Tree": "swings-beneath-the-big-tree",
  "Woodland Tyre Obstacle Playground": "tyre-ring-under-the-trees",
  "Sunlit Woodland Tyre Playground": "woodland-tyre-playground",
  "Sunlit Woodland Playground with Tire Rings": "woodland-playground-golden-hour",
  "Golden-Hour Tyre Garden Seating": "tyre-seating",
  "Sunny Backyard Birthday Banner": "bunting-across-the-lawn",
  "Tranquil Garden Pool Retreat": "bone-pool",
  "Tranquil Leafy Garden Pool": "bone-pool-far-end",
  "Tranquil Leaf-Shaded Garden Pool": "pool-under-the-trees",
  "Yellow Three-Compartment Outdoor Kennel": "kennels",
  "Sunlit Yellow Kennel Amongst Greenery": "kennel-in-the-shade",
  "Sunny Garden with Tyre Planter and Pet Feeder": "water-station",
};

// ---- 1. rename + move the curated photographs
const list = async (path) => (await api("GET", `/files?path=${encodeURIComponent(path)}&limit=500&type=file`)).data ?? [];
// Renamed in place: the account plan allows no file versions, and a move
// creates one, so the slugs live at /PPR/<slug>.<ext>.
const inRoot = await list("/PPR");
const done = new Set(inRoot.map((f) => f.name.replace(/\.[^.]+$/, "")));
let renamed = 0;
for (const f of inRoot) {
  const stem = f.name.replace(/\.[^.]+$/, "");
  const ext = f.name.slice(stem.length);
  const slug = curated[stem];
  if (!slug) continue;
  if (done.has(slug)) { console.log("skip (already renamed)", slug); continue; }
  const r1 = await api("PUT", "/files/rename", { filePath: f.filePath, newFileName: slug + ext, purgeCache: false });
  if (!r1.ok) { console.error("rename failed", f.name, r1.status, r1.data); continue; }
  renamed++;
  console.log("renamed", f.name, "->", `/PPR/${slug}${ext}`);
}
console.log(`curated: ${Object.keys(curated).length}, renamed now: ${renamed}`);

// ---- 2. upload the local park photographs to /PPR/images/park
const parkDir = new URL("public/images/park/", root);
const { readdirSync } = await import("node:fs");
const existing = new Set((await list("/PPR/images/park")).map((f) => f.name));
for (const name of readdirSync(parkDir)) {
  if (existing.has(name)) { console.log("skip (uploaded)", name); continue; }
  const fd = new FormData();
  fd.append("file", new Blob([readFileSync(new URL(name, parkDir))]), name);
  fd.append("fileName", name);
  fd.append("folder", "/PPR/images/park");
  fd.append("useUniqueFileName", "false");
  const r = await fetch("https://upload.imagekit.io/api/v1/files/upload", { method: "POST", headers: { Authorization: auth }, body: fd });
  const d = await r.json();
  console.log(r.ok ? "uploaded" : "UPLOAD FAILED", name, r.ok ? d.filePath : d);
}
