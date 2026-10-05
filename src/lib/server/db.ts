import "server-only";
import { neon } from "@neondatabase/serverless";

/**
 * Neon over HTTP — one round trip per query, fine for serverless.
 * A missing DATABASE_URL fails at query time, not import time, so CI can
 * build the site without database credentials.
 */
const url = process.env.DATABASE_URL;
if (!url && process.env.NODE_ENV === "production" && process.env.VERCEL) {
  console.error("DATABASE_URL is not set — bookings and /admin will not work");
}
export const sql = neon(url ?? "postgresql://missing:missing@database-url-not-set.invalid/missing");
