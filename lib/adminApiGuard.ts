import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Authoritative, database-backed session check for /api/admin/* routes.
 * Unlike middleware.ts (which only checks that a cookie exists), this
 * actually verifies the session against MongoDB.
 */
export async function requireAdminSession(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return { session: null, response: NextResponse.json({ error: "Unauthorized." }, { status: 401 }) };
  }
  return { session, response: null };
}
