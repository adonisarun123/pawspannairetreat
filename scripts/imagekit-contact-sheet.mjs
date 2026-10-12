// Dumps /PPR as JSON (scripts/ppr-files.json) and fetches 240px thumbnails to /tmp/ik/thumbs.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, "")]; }),
);
const auth = "Basic " + Buffer.from(env.IMAGEKIT_PRIVATE_KEY + ":").toString("base64");
const res = await fetch("https://api.imagekit.io/v1/files?path=%2FPPR&limit=500&type=file", { headers: { Authorization: auth } });
const files = (await res.json()).map((f) => ({ fileId: f.fileId, name: f.name, filePath: f.filePath, width: f.width, height: f.height, size: f.size }));
writeFileSync(new URL("./ppr-files.json", import.meta.url), JSON.stringify(files, null, 2));
mkdirSync("/tmp/ik/thumbs", { recursive: true });
await Promise.all(files.map(async (f, i) => {
  const url = `https://ik.imagekit.io/bevusocialfarmstay${f.filePath.split("/").map(encodeURIComponent).join("/")}?tr=w-240,f-jpg,q-70`;
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(`/tmp/ik/thumbs/${String(i).padStart(2, "0")}.jpg`, buf);
}));
files.forEach((f, i) => console.log(String(i).padStart(2, "0"), f.width + "x" + f.height, f.name));
