import type { Metadata } from "next";
import { getResources } from "@/lib/sanity/queries";
import FreeResourcesGrid from "@/components/resources/FreeResourcesGrid";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free Chemistry Resources | Important Questions, NCERT Solutions & PYQs",
  description:
    "Download free Chemistry resources: important questions, NCERT solutions, previous year questions, and sample notes for Class 9, Class 10, Class 11, Class 12, JEE and NEET — no signup required.",
  path: "/resources",
  keywords: [
    "free chemistry resources",
    "free chemistry notes download",
    "chemistry important questions free",
    "chemistry NCERT solutions free",
    "chemistry previous year questions free",
  ],
});

export default async function ResourcesPage() {
  const resources = await getResources();
  const freeResources = resources.filter((r) => r.accessType === "free");

  return (
    <div className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-accent">Free Resources</span>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight">
            Start here — no cost, no signup wall
          </h1>
          <p className="mt-4 text-dark/60 leading-relaxed">
            A real sense of the teaching style, free to download.
          </p>
        </div>

        {freeResources.length === 0 ? (
          <div className="rounded-2xl border border-primary/8 py-16 text-center text-dark/50 text-sm">
            New resources are being added — check back soon.
          </div>
        ) : (
          <FreeResourcesGrid resources={freeResources} />
        )}
      </div>
    </div>
  );
}
