import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { revalidateTag } from "next/cache";
import { requireAdminSession } from "@/lib/adminApiGuard";
import { getSanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/writeClient";
import { SANITY_TAGS } from "@/lib/sanity/queries";

const bodySchema = z.object({
  title: z.string().trim().min(1).max(160),
  accessType: z.enum(["free", "premium"]),
  resourceType: z.enum([
    "chapterWise",
    "fullNotes",
    "printed",
    "pdf",
    "samplePdf",
    "importantQuestions",
    "ncertSolutions",
    "pyq",
    "revisionNotes",
  ]),
  subject: z.enum(["chemistry", "biology"]),
  classLevel: z.enum(["9", "10", "11", "12"]),
  chapter: z.string().trim().max(120).optional(),
  description: z.string().trim().max(500).optional(),
  thumbnailUrl: z.string().url().optional(),
  fileUrl: z.string().url().optional(),
  priceDisplay: z.string().trim().max(40).optional(),
});

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 96);
}

/**
 * Publishing a note automatically makes it appear on /notes or /resources
 * (both read live from Sanity via lib/sanity/queries.ts), gets picked up by
 * sitemap.xml on the next build/ISR revalidation, and inherits the site's
 * existing JSON-LD and metadata handling — no manual step beyond this form,
 * per the spec's automated admin workflow.
 */
export async function POST(req: NextRequest) {
  const { response } = await requireAdminSession(req);
  if (response) return response;

  if (!isSanityWriteConfigured) {
    return NextResponse.json(
      { error: "Sanity write access isn't configured yet. Add SANITY_API_TOKEN to enable publishing." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form for errors.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.accessType === "free" && !parsed.data.fileUrl) {
    return NextResponse.json(
      { error: "Free resources need a downloadable file." },
      { status: 400 }
    );
  }

  try {
    const client = getSanityWriteClient();
    const slug = `${slugify(parsed.data.title)}-${Date.now().toString(36)}`;

    const doc = await client.create({
      _type: "resource",
      title: parsed.data.title,
      slug: { _type: "slug", current: slug },
      accessType: parsed.data.accessType,
      resourceType: parsed.data.resourceType,
      subject: parsed.data.subject,
      classLevel: parsed.data.classLevel,
      chapter: parsed.data.chapter,
      description: parsed.data.description,
      thumbnail: parsed.data.thumbnailUrl ? { _type: "cloudinaryImage", url: parsed.data.thumbnailUrl } : undefined,
      fileUrl: parsed.data.fileUrl,
      priceDisplay: parsed.data.priceDisplay,
      publishedAt: new Date().toISOString(),
    });

    revalidateTag(SANITY_TAGS.resource);

    return NextResponse.json({ success: true, id: doc._id }, { status: 201 });
  } catch (err) {
    console.error("[admin/resources] Failed to publish:", err);
    return NextResponse.json({ error: "Could not publish the note." }, { status: 500 });
  }
}
