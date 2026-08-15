"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import CloudinaryUploader from "@/components/admin/CloudinaryUploader";

const RESOURCE_TYPES = [
  { value: "chapterWise", label: "Chapter-wise Notes", access: "premium" },
  { value: "fullNotes", label: "Full Notes", access: "premium" },
  { value: "printed", label: "Printed Notes", access: "premium" },
  { value: "pdf", label: "PDF Notes", access: "premium" },
  { value: "samplePdf", label: "Sample PDF", access: "free" },
  { value: "importantQuestions", label: "Important Questions", access: "free" },
  { value: "ncertSolutions", label: "NCERT Solutions", access: "free" },
  { value: "pyq", label: "Previous Year Questions", access: "free" },
  { value: "revisionNotes", label: "Revision Notes", access: "free" },
] as const;

export default function NoteUploadForm() {
  const [accessType, setAccessType] = useState<"free" | "premium">("premium");
  const [resourceType, setResourceType] = useState<string>("chapterWise");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: String(formData.get("title") || ""),
      accessType,
      resourceType,
      subject: String(formData.get("subject") || "chemistry"),
      classLevel: String(formData.get("classLevel") || "11"),
      chapter: String(formData.get("chapter") || "") || undefined,
      description: String(formData.get("description") || "") || undefined,
      thumbnailUrl: thumbnailUrl || undefined,
      fileUrl: fileUrl || undefined,
      priceDisplay: String(formData.get("priceDisplay") || "") || undefined,
    };

    try {
      const res = await fetch("/api/admin/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Could not publish this note.");
      }
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
      setThumbnailUrl("");
      setFileUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="flex items-center gap-2 rounded-2xl bg-primary/8 px-5 py-4 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Published — it&apos;s now live on the site.
        </div>
      )}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-dark/70 mb-1.5">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm focus:border-primary/40 transition-colors"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-dark/70 mb-1.5">Access type</span>
        <div className="flex gap-2">
          {(["premium", "free"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setAccessType(type)}
              className={`rounded-full px-5 py-2 text-sm font-medium capitalize transition-colors ${
                accessType === type ? "bg-primary text-white" : "bg-white border border-primary/15 text-dark/70"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="resourceType" className="block text-sm font-medium text-dark/70 mb-1.5">
          Resource type
        </label>
        <select
          id="resourceType"
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
          className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm bg-white focus:border-primary/40 transition-colors"
        >
          {RESOURCE_TYPES.filter((t) => t.access === accessType).map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-dark/70 mb-1.5">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            defaultValue="chemistry"
            className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm bg-white focus:border-primary/40 transition-colors"
          >
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
          </select>
        </div>
        <div>
          <label htmlFor="classLevel" className="block text-sm font-medium text-dark/70 mb-1.5">
            Class
          </label>
          <select
            id="classLevel"
            name="classLevel"
            defaultValue="11"
            className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm bg-white focus:border-primary/40 transition-colors"
          >
            <option value="09">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="chapter" className="block text-sm font-medium text-dark/70 mb-1.5">
          Chapter (optional)
        </label>
        <input
          id="chapter"
          name="chapter"
          type="text"
          className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm focus:border-primary/40 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-dark/70 mb-1.5">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm focus:border-primary/40 transition-colors resize-none"
        />
      </div>

      {accessType === "premium" && (
        <div>
          <label htmlFor="priceDisplay" className="block text-sm font-medium text-dark/70 mb-1.5">
            Price display (optional)
          </label>
          <input
            id="priceDisplay"
            name="priceDisplay"
            type="text"
            placeholder='e.g. "₹199" — leave blank to show "Contact on WhatsApp"'
            className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm focus:border-primary/40 transition-colors"
          />
        </div>
      )}

      <div>
        <span className="block text-sm font-medium text-dark/70 mb-1.5">Thumbnail image</span>
        <CloudinaryUploader
          folder="notes"
          accept="image/*"
          label="Upload thumbnail"
          onUploaded={(result) => setThumbnailUrl(result.secureUrl)}
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-dark/70 mb-1.5">
          PDF file {accessType === "free" && <span className="text-accent">(required for free resources)</span>}
        </span>
        <CloudinaryUploader
          folder="notes"
          accept="application/pdf"
          label="Upload PDF"
          onUploaded={(result) => setFileUrl(result.secureUrl)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors disabled:opacity-60"
      >
        {submitting ? "Publishing..." : "Publish"}
      </button>
    </form>
  );
}
