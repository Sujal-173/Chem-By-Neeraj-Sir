import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * The real, database-backed session check (unlike middleware.ts, which
 * only confirms a cookie is present). Runs in the Node.js runtime, where
 * the MongoDB driver works.
 */
export async function getServerSession() {
  return auth.api.getSession({ headers: await headers() });
}
