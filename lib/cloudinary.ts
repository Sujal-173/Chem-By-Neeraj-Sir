import { v2 as cloudinary } from "cloudinary";
import { getEnv } from "@/lib/env";

export const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

let configured = false;

function ensureConfigured() {
  if (configured) return;
  const env = getEnv();
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  configured = true;
}

export type CloudinaryFolder =
  | "notes"
  | "blog"
  | "testimonials"
  | "gallery"
  | "og-images"
  | "teacher";

/**
 * Generates the timestamp + signature a browser needs to upload a file
 * directly to Cloudinary (bypassing our server for the file bytes
 * themselves — faster and avoids serverless body-size limits on large
 * PDFs). The API secret never leaves the server.
 *
 * use_filename/unique_filename are included here (and must be sent as
 * matching form fields by the client) because Cloudinary's raw uploads
 * default to an auto-generated public_id with NO file extension. A PDF
 * served from a URL with no ".pdf" extension is what most PDF
 * viewers/browsers/OSes fail to open correctly — it looks "corrupted"
 * even though the bytes are intact. Preserving the original filename
 * fixes that.
 */
export function generateSignedUploadParams(folder: CloudinaryFolder) {
  ensureConfigured();
  const env = getEnv();
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = {
    timestamp,
    folder: `chem-neeraj-sir/${folder}`,
    use_filename: true,
    unique_filename: true,
  };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, env.CLOUDINARY_API_SECRET!);

  return {
    timestamp,
    signature,
    apiKey: env.CLOUDINARY_API_KEY,
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    folder: paramsToSign.folder,
    useFilename: true,
    uniqueFilename: true,
  };
}

/**
 * Deletes an asset by its Cloudinary public_id. resourceType should be
 * "image" for photos/thumbnails or "raw" for PDFs.
 */
export async function deleteCloudinaryAsset(
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image"
) {
  ensureConfigured();
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}