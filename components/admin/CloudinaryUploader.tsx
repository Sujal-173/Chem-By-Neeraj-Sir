"use client";

import { useCallback, useState } from "react";
import { UploadCloud, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import type { CloudinaryFolder } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

type UploadResult = {
  secureUrl: string;
  publicId: string;
  format: string;
  bytes: number;
};

type Props = {
  folder: CloudinaryFolder;
  accept?: string;
  onUploaded: (result: UploadResult) => void;
  label?: string;
};

/**
 * Uploads a file directly from the browser to Cloudinary using a
 * short-lived signature from /api/cloudinary/sign (authorized via the
 * admin's session cookie) — the file itself never passes through our
 * server. Used by the admin panel for note PDFs, thumbnails, and blog
 * cover images.
 */
export default function CloudinaryUploader({
  folder,
  accept = "image/*",
  onUploaded,
  label = "Upload file",
}: Props) {
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setFileName(file.name);
      setStatus("uploading");
      setErrorMessage("");

      try {
        const signRes = await fetch("/api/cloudinary/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder }),
        });
        if (!signRes.ok) {
          const data = await signRes.json().catch(() => null);
          throw new Error(data?.error || "Could not start the upload.");
        }
        const {
          timestamp,
          signature,
          apiKey,
          cloudName,
          folder: signedFolder,
          useFilename,
          uniqueFilename,
        } = await signRes.json();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", String(timestamp));
        formData.append("signature", signature);
        formData.append("folder", signedFolder);
        // Must match exactly what the server signed in generateSignedUploadParams,
        // or Cloudinary rejects the request as a signature mismatch. These
        // preserve the original filename + extension — without them, raw
        // (PDF) uploads get an extension-less URL that many PDF viewers and
        // browsers fail to open, which looks like a corrupted file even
        // though the bytes are fine.
        formData.append("use_filename", String(useFilename));
        formData.append("unique_filename", String(uniqueFilename));

        // file.type is occasionally empty/unreliable for PDFs depending on
        // OS/browser/how the file was created, so fall back to the
        // extension rather than trusting MIME type alone.
        const isPdf =
          file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
        const resourceType = isPdf ? "raw" : "image";
        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
          { method: "POST", body: formData }
        );

        if (!uploadRes.ok) {
          const errBody = await uploadRes.json().catch(() => null);
          throw new Error(errBody?.error?.message || "Upload to Cloudinary failed.");
        }

        const data = await uploadRes.json();
        setStatus("success");
        onUploaded({
          secureUrl: data.secure_url,
          publicId: data.public_id,
          format: data.format,
          bytes: data.bytes,
        });
      } catch (err) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Upload failed.");
      }
    },
    [folder, onUploaded]
  );

  return (
    <div>
      <label
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 cursor-pointer transition-colors",
          status === "error" ? "border-red-300 bg-red-50" : "border-primary/20 hover:border-primary/40"
        )}
      >
        <input type="file" accept={accept} onChange={handleFileChange} className="sr-only" />
        {status === "uploading" && <Loader2 className="h-6 w-6 text-primary animate-spin" />}
        {status === "success" && <CheckCircle2 className="h-6 w-6 text-primary" />}
        {status === "error" && <XCircle className="h-6 w-6 text-red-500" />}
        {status === "idle" && <UploadCloud className="h-6 w-6 text-primary/50" />}

        <span className="text-sm font-medium text-dark/70">
          {status === "uploading" && `Uploading ${fileName}...`}
          {status === "success" && `${fileName} uploaded`}
          {status === "error" && (errorMessage || "Upload failed — try again")}
          {status === "idle" && label}
        </span>
      </label>
    </div>
  );
}