import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { deleteCloudinaryAsset } from "@/lib/cloudinary";
import { requireAdminSession } from "@/lib/adminApiGuard";

const bodySchema = z.object({
  publicId: z.string().min(1),
  resourceType: z.enum(["image", "raw", "video"]).default("image"),
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
    return NextResponse.json({ error: "A valid publicId is required." }, { status: 400 });
  }

  try {
    const result = await deleteCloudinaryAsset(parsed.data.publicId, parsed.data.resourceType);
    return NextResponse.json({ result });
  } catch (err) {
    console.error("[cloudinary/delete] Failed to delete asset:", err);
    return NextResponse.json({ error: "Could not delete the asset." }, { status: 500 });
  }
}
