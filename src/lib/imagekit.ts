/**
 * ImageKit delivery config (client-safe — no private key here).
 *
 * Set NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT to turn ImageKit on. While it is
 * unset, every photograph is served exactly as before through next/image
 * from /public, so a deploy without the variable changes nothing.
 *
 * The endpoint serves the whole media library (shared with the farmstay), so
 * this site's files live under one folder, `/PPR`. Paths in `media.ts` and
 * `gallery.ts` are written relative to that folder; `ikPath` adds the prefix.
 *   /images/park/entrance-arch.jpg  →  <endpoint>/PPR/images/park/entrance-arch.jpg
 * The same relative path still resolves in /public when ImageKit is off.
 */
export const imagekitUrlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim().replace(/\/+$/, "") || null;

export const imagekitEnabled = imagekitUrlEndpoint !== null;

export const IMAGEKIT_FOLDER = "/PPR";

/** Path of a site image inside the media library. */
export const ikPath = (src: string) => (src.startsWith(IMAGEKIT_FOLDER + "/") ? src : IMAGEKIT_FOLDER + src);

/**
 * Canonical absolute URL for an image, for structured data and feeds.
 * On ImageKit, capped at 1600px so crawlers fetch a sane file, not a 4 MB PNG.
 */
export function imageContentUrl(src: string, siteUrl: string): string {
  if (!imagekitUrlEndpoint) return new URL(src, siteUrl).toString();
  return `${imagekitUrlEndpoint}${ikPath(src)}?tr=w-1600,c-at_max`;
}

/**
 * ~1 KB blurred thumbnail painted behind a frame until the photograph decodes.
 * Built by hand because the SDK's `buildSrc` is client-only and Figure renders
 * on the server.
 */
export function lqipUrl(src: string): string | null {
  if (!imagekitUrlEndpoint) return null;
  return `${imagekitUrlEndpoint}${ikPath(src)}?tr=w-32,q-30,bl-6,f-auto`;
}
