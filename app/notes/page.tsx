import type { Metadata } from "next";
import { getResources } from "@/lib/sanity/queries";
import { getEnv } from "@/lib/env";
import NotesGrid from "@/components/notes/NotesGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Premium Chemistry Notes for Class 9 , 10 , 11 & 12 | Chapter-wise PDF Notes",
  description:
    "Chapter-wise, full, printed, and PDF Chemistry notes built for CBSE boards — concept-based, exam-ready, and written by an experienced teacher. Covers class 9 class 10 Class 11, Class 12, JEE and NEET Chemistry.",
  path: "/notes",
  keywords: [
    "premium chemistry notes",
    "chapter wise chemistry notes",
    "full chemistry notes class 9",
    "full chemistry notes class 10",
    "full chemistry notes class 11",
    "full chemistry notes class 12",
    "printed chemistry notes",
    "buy chemistry notes online",
  ],
});

export default async function NotesPage() {
  const resources = await getResources();
  const premiumNotes = resources.filter((r) => r.accessType === "premium");
  const env = getEnv();
  const whatsappUrl = env.NEXT_PUBLIC_CONTACT_WHATSAPP || "https://wa.me/";

  return (
    <div className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-accent">Premium Notes</span>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight">
            Notes built to be understood, not just memorized
          </h1>
          <p className="mt-4 text-dark/60 leading-relaxed">
            Every note follows the concept-first approach — tap &ldquo;Buy on WhatsApp&rdquo; and
            we&apos;ll confirm the current price and send payment details.
          </p>
        </div>

        <NotesGrid resources={premiumNotes} whatsappUrl={whatsappUrl} />

        <div className="mt-10 rounded-2xl bg-primary/5 border border-primary/10 px-6 py-5 text-sm text-dark/60 text-center">
          Purchase flow: Website → WhatsApp → Manual Confirmation → UPI Payment → Notes Delivery.
        </div>
      </div>
    </div>
  );
}
