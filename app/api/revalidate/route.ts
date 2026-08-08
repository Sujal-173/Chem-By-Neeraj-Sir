import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAGS } from "@/lib/sanity/queries";

type WebhookPayload = {
  _type?: string;
  _id?: string;
  slug?: string;
};

// Document types that don't map 1:1 to a tag above, but whose changes
// should still invalidate something on the site (author/category are
// dereferenced into blog post queries via GROQ's `->`).
const TYPE_TO_TAGS: Record<string, string[]> = {
  resource: [SANITY_TAGS.resource],
  blogPost: [SANITY_TAGS.blogPost],
  testimonial: [SANITY_TAGS.testimonial],
  faq: [SANITY_TAGS.faq],
  about: [SANITY_TAGS.about],
  homepage: [SANITY_TAGS.homepage],
  siteSettings: [SANITY_TAGS.siteSettings],
  author: [SANITY_TAGS.blogPost],
  category: [SANITY_TAGS.blogPost],
};

/**
 * Configure this as a GROQ-powered webhook in sanity.io/manage → API →
 * Webhooks:
 *   URL: https://yourdomain.com/api/revalidate
 *   Trigger on: Create, Update, Delete
 *   Filter: (leave blank — every document type is handled below)
 *   Projection: {"_type": _type, "_id": _id, "slug": slug.current}
 *   Secret: same value as SANITY_REVALIDATE_SECRET in your environment
 *
 * This is what makes edits made directly in Sanity Studio (not through the
 * admin dashboard) show up on the live site without waiting for a redeploy.
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "SANITY_REVALIDATE_SECRET is not configured on the server." },
        { status: 503 }
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret);

    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
    }
    if (!body?._type) {
      return NextResponse.json({ error: "Missing _type in webhook payload." }, { status: 400 });
    }

    const tags = TYPE_TO_TAGS[body._type];
    if (!tags) {
      // Not a type we render — acknowledge without doing anything, rather
      // than erroring on document types outside this list.
      return NextResponse.json({ revalidated: false, reason: "Unhandled type" });
    }

    tags.forEach((tag) => revalidateTag(tag));

    if (body._type === "blogPost" && body.slug) {
      revalidatePath(`/blog/${body.slug}`);
    }

    return NextResponse.json({ revalidated: true, tags });
  } catch (err) {
    console.error("[revalidate] Webhook handling failed:", err);
    return NextResponse.json({ error: "Could not process the webhook." }, { status: 500 });
  }
}
