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
 *   Trigger on: Create, Update, Delete   ← all three must be checked
 *   Filter: (leave blank — every document type is handled below)
 *   Projection:
 *     {
 *       "_type": coalesce(after()._type, before()._type),
 *       "_id": _id,
 *       "slug": coalesce(after().slug.current, before().slug.current)
 *     }
 *   Secret: same value as SANITY_REVALIDATE_SECRET in your environment
 *
 * The coalesce(after(), before()) pattern matters: on a Delete event the
 * document no longer exists, so a bare `_type` reference resolves to
 * nothing and Sanity sends an incomplete payload. before() still has the
 * last known state of a deleted document, so falling back to it is what
 * makes deletions actually revalidate the site instead of silently doing
 * nothing.
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

    // If the payload doesn't tell us what changed — most commonly because
    // the webhook's projection isn't using before()/after() and this was a
    // delete — don't silently no-op and leave stale content on the site.
    // Revalidating everything is cheap (it just means the next request for
    // each tag re-fetches from Sanity) and guarantees deletions are never
    // missed, which matters more than the small extra cost.
    const tags = body?._type ? TYPE_TO_TAGS[body._type] : undefined;
    if (!tags) {
      Object.values(SANITY_TAGS).forEach((tag) => revalidateTag(tag));
      return NextResponse.json({
        revalidated: true,
        reason: body?._type
          ? "Unrecognized _type — revalidated everything as a safety net"
          : "Payload missing _type (likely a delete without before()/after() in the projection) — revalidated everything as a safety net",
      });
    }

    tags.forEach((tag) => revalidateTag(tag));

    if (body?._type === "blogPost" && body.slug) {
      revalidatePath(`/blog/${body.slug}`);
    }

    return NextResponse.json({ revalidated: true, tags });
  } catch (err) {
    console.error("[revalidate] Webhook handling failed:", err);
    return NextResponse.json({ error: "Could not process the webhook." }, { status: 500 });
  }
}
