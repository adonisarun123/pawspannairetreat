// Lists media-library files and folders. Reads IMAGEKIT_PRIVATE_KEY from .env.local.
// Usage: node scripts/imagekit-list.mjs [path]
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; }),
);
const auth = "Basic " + Buffer.from(env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64");
const path = process.argv[2] ?? "/";
const url = `https://api.imagekit.io/v1/files?path=${encodeURIComponent(path)}&limit=200&type=all`;
const res = await fetch(url, { headers: { Authorization: auth } });
const data = await res.json();
if (!res.ok) { console.error(res.status, data); process.exit(1); }
for (const f of data) {
  console.log(`${f.type === "folder" ? "[DIR] " : "[FILE]"} ${f.filePath}${f.type === "folder" ? "" : `  ${f.width ?? "?"}x${f.height ?? "?"}  ${Math.round((f.size ?? 0) / 1024)}KB`}`);
}
console.log(`(${data.length} entries under ${path})`);
