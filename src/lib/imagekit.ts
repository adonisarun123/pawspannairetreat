/**
 * ImageKit delivery config (client-safe — no private key here).
 *
 * Set NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT to turn ImageKit on. While it is
 * unset, every photograph is served exactly as before through next/image
 * from /public, so a deploy without the variable changes nothing.
 *
 * Image paths in `media.ts` stay relative (`/images/park/...`). ImageKit
 * appends them to the URL endpoint, so the endpoint's origin must resolve
 * those same paths — either the files are uploaded to the media library
 * under /images/park/, or the endpoint uses a web-folder origin pointing at
 * https://www.pawspannairetreat.com.
 */
export const imagekitUrlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.trim() || null;

export const imagekitEnabled = imagekitUrlEndpoint !== null;
