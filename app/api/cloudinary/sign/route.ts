import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateSignedUploadParams, type CloudinaryFolder } from "@/lib/cloudinary";
import { requireAdminSession } from "@/lib/adminApiGuard";

const bodySchema = z.object({
  folder: z.enum(["notes", "blog", "testimonials", "gallery", "og-images", "teacher"]),
});

export async function POST(req: NextRequest) {
  const { response } = await requireAdminSession(req);
  if (response) return response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "A valid folder is required." }, { status: 400 });
  }

  try {
    const params = generateSignedUploadParams(parsed.data.folder as CloudinaryFolder);
    return NextResponse.json(params);
  } catch (err) {
    console.error("[cloudinary/sign] Failed to generate signature:", err);
    return NextResponse.json(
      { error: "Cloudinary is not configured on the server yet." },
      { status: 500 }
    );
  }
}
