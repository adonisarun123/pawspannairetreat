import { NextResponse, type NextRequest } from "next/server";

/**
 * Optimistic gate for /admin: no session cookie → login page. The real
 * check (signature, user still active, role) happens in lib/server/auth.ts.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (!req.cookies.get("pp_admin")?.value) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
