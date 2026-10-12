import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";
import { getCurrentUser } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

/**
 * One-time credentials for browser uploads to ImageKit (`upload()` from
 * `@imagekit/next`). The private key never leaves the server; the browser
 * only receives a short-lived token + signature.
 *
 * Only signed-in staff may request credentials — anyone else could otherwise
 * fill the media library.
 */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  if (!privateKey || !publicKey) {
    return NextResponse.json({ error: "ImageKit is not configured" }, { status: 503 });
  }

  const { token, expire, signature } = getUploadAuthParams({ privateKey, publicKey });
  return NextResponse.json({ token, expire, signature, publicKey });
}
