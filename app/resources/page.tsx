import type { Metadata } from "next";
import { Download } from "lucide-react";
import { getResources } from "@/lib/sanity/queries";
import CmsImage from "@/components/ui/CmsImage";
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

const TYPE_LABEL: Record<string, string> = {
  samplePdf: "Sample PDF",
  importantQuestions: "Important Questions",
  ncertSolutions: "NCERT Solutions",
  pyq: "Previous Year Questions",
  revisionNotes: "Revision Notes",
};

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeResources.map((resource) => (
              <div
                key={resource._id}
                className="rounded-3xl bg-white border border-primary/8 overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                <CmsImage image={resource.thumbnail} alt={resource.title} className="aspect-[4/3]" />
                <div className="p-6">
                  <span className="text-xs font-semibold text-accent">
                    {TYPE_LABEL[resource.resourceType] || resource.resourceType} · Class{" "}
                    {resource.classLevel}
                  </span>
                  <h3 className="mt-2 font-heading font-semibold text-dark leading-snug">
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p className="mt-2 text-sm text-dark/55 leading-relaxed line-clamp-2">
                      {resource.description}
                    </p>
                  )}
                  <a
                    href={resource.fileUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
