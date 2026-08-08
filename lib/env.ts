import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().trim().min(1).optional().or(z.literal("")),
  MONGODB_DB_NAME: z.string().trim().min(1).default("chem_neeraj_sir"),
  RESEND_API_KEY: z.string().trim().min(1).optional().or(z.literal("")),
  RESEND_FROM_EMAIL: z.string().trim().email().optional().or(z.literal("")),
  ADMIN_NOTIFICATION_EMAIL: z.string().trim().email().optional().or(z.literal("")),
  NEXT_PUBLIC_SITE_URL: z.string().trim().url().optional().or(z.literal("")),
  NEXT_PUBLIC_CONTACT_EMAIL: z.string().trim().email().optional().or(z.literal("")),
  NEXT_PUBLIC_CONTACT_PHONE: z.string().trim().min(1).optional().or(z.literal("")),
  NEXT_PUBLIC_CONTACT_WHATSAPP: z.string().trim().min(1).optional().or(z.literal("")),
  NEXT_PUBLIC_CONTACT_INSTAGRAM: z.string().trim().min(1).optional().or(z.literal("")),
  NEXT_PUBLIC_CONTACT_YOUTUBE: z.string().trim().min(1).optional().or(z.literal("")),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().trim().min(1).optional().or(z.literal("")),
  NEXT_PUBLIC_SANITY_DATASET: z.string().trim().min(1).default("production"),
  SANITY_API_TOKEN: z.string().trim().min(1).optional().or(z.literal("")),
  SANITY_REVALIDATE_SECRET: z.string().trim().min(1).optional().or(z.literal("")),
  CLOUDINARY_CLOUD_NAME: z.string().trim().min(1).optional().or(z.literal("")),
  CLOUDINARY_API_KEY: z.string().trim().min(1).optional().or(z.literal("")),
  CLOUDINARY_API_SECRET: z.string().trim().min(1).optional().or(z.literal("")),
  BETTER_AUTH_SECRET: z.string().trim().min(1).optional().or(z.literal("")),
  RAZORPAY_KEY_ID: z.string().trim().min(1).optional().or(z.literal("")),
  RAZORPAY_KEY_SECRET: z.string().trim().min(1).optional().or(z.literal("")),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates and returns the current process.env values.
 * This is intentionally re-evaluated on each call so runtime changes in
 * .env.local or environment variables are picked up immediately instead of
 * being stuck behind a stale cached value.
 */
export function getEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`
    );
  }
  return parsed.data;
}

export function requireEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = getEnv()[key];
  if (value === undefined || value === null || value === "") {
    throw new Error(
      `Missing required environment variable: ${String(key)}. Add it to your .env.local or Vercel project settings.`
    );
  }
  return value as NonNullable<Env[K]>;
}
