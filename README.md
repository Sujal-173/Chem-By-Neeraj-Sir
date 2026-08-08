# CHEM by Neeraj Sir — Website

Full production build: design system, all content pages, Sanity CMS,
Cloudinary, an admin dashboard with authentication, on-demand revalidation,
and a Razorpay-ready (but not yet launched) payment architecture.

## Fixes applied in this pass

This codebase was audited and corrected. If you're comparing against an
earlier copy, here's what changed:

1. **Missing brand images restored** — `public/images/logo.png` and
   `neeraj-sir-hero.png` were empty; both are back and referenced correctly.
2. **About page's broken fallback image** — it pointed at a file that never
   existed (`/images/neeraj-sir-about.png`); now falls back to the real
   hero illustration.
3. **Images now stored correctly** — every image field in Sanity
   (`cloudinaryImage`) stores only a Cloudinary URL + alt text, not a
   Sanity-hosted asset. One media library, no dual-sync problem.
4. **Content freshness fixed** — content pages are statically rendered for
   speed, which on its own means Sanity edits wouldn't show up without a
   redeploy. Fixed with tag-based on-demand revalidation (details below).
5. **A real client/server bug in `NotesGrid`** — it called `getEnv()`
   (server-side env parsing) from inside a `"use client"` component. In the
   browser bundle that silently returns an empty object, so the WhatsApp
   number it *looked* like it was reading was always actually falling back
   to a hardcoded placeholder. Fixed by fetching the WhatsApp link
   server-side in `app/notes/page.tsx` and passing it down as a prop —
   the same pattern already used correctly in `Footer`, `ContactCTA`, and
   `WhatsAppFloatButton` (all server components, safe to call `getEnv()`
   directly).
6. **The whole admin system was missing** — no login, no dashboard, no
   protection on `/studio`, and publishing a note required editing Sanity
   Studio directly. Built out in full (see below).
7. **"Enquire" → "Buy on WhatsApp"** — the Notes page button opened a bare,
   contextless WhatsApp chat. It now pre-fills the note's title, type,
   class, subject, and price so no back-and-forth is needed to confirm
   what someone wants to buy.

## Architecture notes

**Contact & WhatsApp info is environment-variable driven**
(`NEXT_PUBLIC_CONTACT_EMAIL`, `_PHONE`, `_WHATSAPP`, `_INSTAGRAM`,
`_YOUTUBE` in `.env.example`) rather than stored in Sanity. This was an
intentional choice already present in this codebase, kept as-is rather than
introducing a second, competing source of truth — the admin dashboard does
**not** include a Settings page for this reason; update these values in
your environment (and redeploy, or update them in Vercel) when they change.

## What's included

### Design system
Full token system in `tailwind.config.ts` — brand colors, Poppins/Inter/
Space Grotesk type scale, shadows, motion. Reduced-motion support and
visible focus states throughout.

### Pages
Home, About, Notes (filterable, "Buy on WhatsApp" with note-specific
details), Free Resources, Blog (search/filter + full post pages with
portable text, reading time, tags, related posts, share buttons, JSON-LD),
Testimonials (auto-hides if empty), FAQ (grouped by category, FAQPage
schema), Contact (validated form → MongoDB → admin email, no auto-reply).

### Sanity CMS
Full schema set in `sanity/schemaTypes/`: `resource` (covers both free &
premium notes), `blogPost`, `author`, `category`, `testimonial`, `faq`, plus
singletons `homepage`, `about`, `navigation`, `footer`, `siteSettings` (the
last one currently unused by the frontend — see the note above — but left
in place in case you want to migrate off env vars later). Studio is
embedded at `/studio`.

Every page works before the CMS is connected — `lib/sanity/queries.ts`
returns realistic fallback content when `NEXT_PUBLIC_SANITY_PROJECT_ID`
isn't set, and switches to live data automatically once it is.

### Keeping the live site in sync with Sanity
1. Every query is cache-tagged (`SANITY_TAGS` in `lib/sanity/queries.ts`)
   and cached indefinitely until explicitly invalidated. `useCdn: false` on
   the Sanity client means once invalidated, refetches hit Sanity's live
   API directly.
2. Publishing a note through `/admin/notes` calls `revalidateTag`
   immediately — live with zero delay.
3. Edits made **directly in Sanity Studio** are covered by a webhook at
   `/api/revalidate`. Configure it once in sanity.io/manage → API →
   Webhooks:
   ```
   URL:        https://yourdomain.com/api/revalidate
   Trigger on: Create, Update, Delete
   Projection: {"_type": _type, "_id": _id, "slug": slug.current}
   Secret:     same value as SANITY_REVALIDATE_SECRET
   ```
   (Full detail in the comment at the top of `app/api/revalidate/route.ts`.)

### Cloudinary
`lib/cloudinary.ts` generates short-lived signed upload parameters so the
browser uploads directly to Cloudinary (never through the server),
organized into `chem-neeraj-sir/notes`, `/blog`, `/testimonials`,
`/gallery`, `/og-images`, `/teacher`. `/api/cloudinary/sign` and `/delete`
are protected by real admin sessions. `components/admin/CloudinaryUploader`
is the upload widget used on the notes upload page.

### Admin Panel & Authentication
Better Auth, email/password only, **no public sign-up route** — this site
supports exactly one admin account:
```bash
npm run create-admin -- "Neeraj Sharma" you@example.com "a-strong-password"
```
- `/admin/login` — sign-in
- `/admin` — dashboard overview (message/signup/note/post counts)
- `/admin/notes` — upload a thumbnail + PDF via Cloudinary, fill in
  details, publish — live immediately with SEO metadata applying
  automatically
- `/admin/messages` — contact submissions: searchable, filterable by
  status, paginated, one-click "mark responded"
- `/admin/waiting-list` — signups: searchable, paginated
- Homepage, About, Blog, Testimonials, FAQs stay managed in **Sanity
  Studio** (linked from the dashboard) rather than a duplicate UI

Two layers of protection: `middleware.ts` does a fast cookie-presence check
(Edge runtime), and every protected page/API route does the real
database-backed session check (Node.js runtime) — per Better Auth's own
guidance not to rely on middleware alone.

*Known harmless build warning:* Next.js warns that `better-auth`'s edge
cookie helper touches a Node-only compression API. This is a bundling
warning, not a runtime error.

### Payment architecture (prepared, not launched)
Per spec, online payments are **not implemented** — the Notes purchase flow
stays WhatsApp + manual UPI. `lib/payments/` has a real Razorpay
implementation (order creation + signature verification) and working
`/api/payments/create-order` + `/verify` endpoints, but nothing in the UI
calls them yet. Wiring a "Buy now" button to them later is a UI change, not
a rebuild.

### Backend (real, not stubbed)
`/api/waiting-list` and `/api/contact` — Zod validation, IP rate limiting,
MongoDB storage, Resend admin notification (no auto-reply on contact, per
spec).

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in MongoDB, Resend, contact info at minimum
npm run create-admin -- "Neeraj Sharma" you@example.com "a-strong-password"
npm run dev
```

The site runs with zero environment variables — forms need Mongo/Resend to
actually save/send, content pages need Sanity to move off fallback copy,
and the admin dashboard needs `MONGODB_URI` + `BETTER_AUTH_SECRET` to let
you sign in.

Admin dashboard: `http://localhost:3000/admin`
Sanity Studio: `http://localhost:3000/studio` (its own separate Sanity
login, in addition to the admin session)

## Deploying

1. Push to GitHub, import into Vercel.
2. Add every variable from `.env.example` in the Vercel project settings.
3. Deploy, then run `npm run create-admin` once (locally against the same
   `MONGODB_URI`, or via `vercel env pull` + local run) to create your
   account.
4. If using Sanity, configure the revalidation webhook (see above).

## Where things live

```
app/
  layout.tsx              Root layout: fonts, metadata, chrome (Navbar,
                          Footer, AnnouncementBar, WhatsAppFloatButton)
  page.tsx, about/, notes/, resources/, blog/, blog/[slug]/,
  testimonials/, faq/, contact/
  (admin)/admin/
    login/                 Public sign-in
    (protected)/           Auth-gated: layout.tsx does the real session check
      page.tsx, notes/, messages/, waiting-list/
  studio/[[...tool]]/     Embedded Sanity Studio
  api/
    auth/[...all]/, revalidate/, waiting-list/, contact/
    cloudinary/sign/, cloudinary/delete/
    payments/create-order/, payments/verify/
    admin/messages/, admin/messages/[id]/, admin/waiting-list/,
    admin/resources/
middleware.ts              Protects /admin, /studio (cookie check)
components/
  homepage/               Navbar, Footer, AnnouncementBar, page sections
  ui/                     CmsImage, WhatsAppFloatButton
  blog/, notes/, contact/, admin/
lib/
  env.ts, mongodb.ts, resend.ts, cloudinary.ts, whatsapp.ts, utils.ts
  auth.ts, auth-client.ts, getServerSession.ts, adminApiGuard.ts
  sanity/                 client.ts, writeClient.ts, queries.ts
  payments/, admin/
sanity/
  schemaTypes/            cloudinaryImage-based image handling throughout
  structure.ts
scripts/create-admin.mjs
public/images/            Logo and hero illustration
```
