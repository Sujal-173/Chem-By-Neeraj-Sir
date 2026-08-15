import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Online Chemistry Classes | Coming Soon",
  description:
    "Online Chemistry classes by Neeraj Sir are coming soon. Explore free Chemistry resources and notes in the meantime.",
  path: "/online-classes",
  noIndex: true,
});

export default function OnlineClassesPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] via-white to-accent/[0.08] px-6 py-16 text-center shadow-soft sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-soft">
            <CalendarDays className="h-7 w-7" />
          </div>
          <p className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </p>
          <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-dark sm:text-5xl">
            Online classes are on their way
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-dark/60 sm:text-lg">
            Structured Chemistry lessons with Neeraj Sir are being prepared for you. Please check back soon for updates.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/resources"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Explore Free Resources
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-primary/15 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
