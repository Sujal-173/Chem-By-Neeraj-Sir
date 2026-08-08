import { createClient, type SanityClient } from "@sanity/client";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = "2025-01-01";

/**
 * True once real Sanity credentials are configured. Every fetch helper in
 * lib/sanity/queries.ts checks this first and returns null/[] instead of
 * hitting the network, so the site builds and renders (with fallback copy)
 * before the CMS project exists — and switches over automatically once
 * NEXT_PUBLIC_SANITY_PROJECT_ID is set.
 */
export const isSanityConfigured = Boolean(sanityProjectId);

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient {
  if (!isSanityConfigured) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID before calling getSanityClient()."
    );
  }
  if (!client) {
    client = createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      // Freshness here is controlled entirely by Next.js's own tag-based
      // revalidation (see lib/sanity/queries.ts + app/api/revalidate) —
      // Sanity's CDN layer would add its own separate caching delay on top
      // of that, so it stays off to keep "publish → live" predictable.
      useCdn: false,
      perspective: "published",
    });
  }
  return client;
}
