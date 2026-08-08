import { createClient, type SanityClient } from "@sanity/client";
import { sanityProjectId, sanityDataset, sanityApiVersion, isSanityConfigured } from "@/lib/sanity/client";

export const isSanityWriteConfigured = Boolean(isSanityConfigured && process.env.SANITY_API_TOKEN);

let writeClient: SanityClient | null = null;

/**
 * A separate client authenticated with a write token, used only by admin
 * API routes (e.g. publishing a new note from the upload dashboard).
 * Never imported into anything that runs in the browser.
 */
export function getSanityWriteClient(): SanityClient {
  if (!isSanityWriteConfigured) {
    throw new Error(
      "Sanity write access is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN (with Editor permissions)."
    );
  }
  if (!writeClient) {
    writeClient = createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
      perspective: "raw",
    });
  }
  return writeClient;
}
