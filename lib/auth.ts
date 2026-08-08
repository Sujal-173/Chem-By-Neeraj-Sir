import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Better Auth needs a synchronous database handle at module load time (the
// route handler below imports `auth` directly), so we can't await our usual
// lazy getDb() singleton here. The MongoClient constructor doesn't connect
// eagerly — it only connects on first real operation — so this is safe to
// construct even before MONGODB_URI is configured; login attempts will
// simply fail clearly at runtime until it is.
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/unset";
const dbName = process.env.MONGODB_DB_NAME || "chem_neeraj_sir";
const mongoClient = new MongoClient(mongoUri);
const authDb = mongoClient.db(dbName);

const authSecret = process.env.BETTER_AUTH_SECRET;
if (!authSecret) {
  console.warn(
    "[auth] BETTER_AUTH_SECRET is not set. Admin login will not work securely until it is configured in your environment."
  );
}

export const auth = betterAuth({
  database: mongodbAdapter(authDb, { client: mongoClient }),
  secret: authSecret || "unsafe-build-time-placeholder-set-BETTER_AUTH_SECRET-before-deploying",
  baseURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  emailAndPassword: {
    // Only the single admin account (created via `npm run create-admin`)
    // can sign in — there is intentionally no public sign-up endpoint used
    // anywhere in the app, matching the "Only one Admin" requirement.
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 10,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once per day of activity
  },
  advanced: {
    // Every admin surface (Studio, dashboard) lives under /studio and
    // /admin, both same-origin — no cross-site cookie needs.
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});
