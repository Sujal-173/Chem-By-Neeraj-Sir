import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * A lightweight, DB-free check that a session cookie is present. This runs
 * on the Edge runtime, where the MongoDB driver isn't available, so it
 * can't fully verify the session — it only redirects obviously-signed-out
 * visitors before they reach the page. Every protected server component
 * (app/(admin)/admin/layout.tsx) does the real, authoritative session
 * check against the database, per Better Auth's own guidance to verify
 * auth in the page/layout rather than relying on middleware alone.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith("/admin") || pathname.startsWith("/studio");
  const isLoginPage = pathname === "/admin/login";

  if (!isProtected || isLoginPage) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/studio/:path*"],
};
