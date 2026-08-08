/**
 * Creates the single admin account this site allows. Run once, locally or
 * from a Vercel deployment's shell, after MONGODB_URI and
 * BETTER_AUTH_SECRET are set:
 *
 *   node --env-file=.env.local scripts/create-admin.mjs "Neeraj Sharma" neeraj@example.com "a-strong-password"
 *
 * The app's own auth instance (lib/auth.ts) has public sign-up disabled —
 * this script uses a local, unrestricted instance against the same
 * database purely to create that one account.
 */
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const [, , name, email, password] = process.argv;

if (!name || !email || !password) {
  console.error('Usage: node --env-file=.env.local scripts/create-admin.mjs "Full Name" email@example.com "password"');
  process.exit(1);
}

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not set. Pass --env-file=.env.local or export it first.");
  process.exit(1);
}

if (password.length < 10) {
  console.error("Password must be at least 10 characters (matches the app's minPasswordLength).");
  process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB_NAME || "chem_neeraj_sir");

const setupAuth = betterAuth({
  database: mongodbAdapter(db, { client }),
  secret: process.env.BETTER_AUTH_SECRET || "setup-only-secret",
  emailAndPassword: { enabled: true, disableSignUp: false, minPasswordLength: 10 },
});

try {
  const existing = await db.collection("user").findOne({ email });
  if (existing) {
    console.error(`An account already exists for ${email}. This site supports a single admin.`);
    process.exit(1);
  }

  await setupAuth.api.signUpEmail({ body: { name, email, password } });
  console.log(`Admin account created for ${email}. You can now sign in at /admin/login.`);
} catch (err) {
  console.error("Failed to create admin account:", err);
  process.exit(1);
} finally {
  await client.close();
}
