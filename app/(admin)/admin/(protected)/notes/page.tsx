import { isSanityWriteConfigured } from "@/lib/sanity/writeClient";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import NoteUploadForm from "@/components/admin/NoteUploadForm";

export default function AdminNotesPage() {
  const ready = isSanityWriteConfigured && isCloudinaryConfigured;

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-dark">Upload Notes</h1>
      <p className="mt-1 text-sm text-dark/50">
        Upload a thumbnail and PDF, fill in the details, and publish — it appears on the site
        immediately with SEO metadata generated automatically.
      </p>

      {!ready && (
        <div className="mt-6 rounded-2xl bg-accent/10 border border-accent/20 px-5 py-4 text-sm text-dark/70">
          {!isCloudinaryConfigured && (
            <p>Cloudinary isn&apos;t configured yet — set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.</p>
          )}
          {!isSanityWriteConfigured && (
            <p className="mt-1">
              Sanity write access isn&apos;t configured — set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN.
            </p>
          )}
        </div>
      )}

      <div className="mt-8 rounded-3xl bg-white border border-primary/8 p-8 shadow-soft">
        <NoteUploadForm />
      </div>
    </div>
  );
}
