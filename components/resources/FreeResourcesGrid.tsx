"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { Resource } from "@/lib/sanity/queries";
import CmsImage from "@/components/ui/CmsImage";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<string, string> = {
  samplePdf: "Sample PDF",
  importantQuestions: "Important Questions",
  ncertSolutions: "NCERT Solutions",
  pyq: "Previous Year Questions",
  revisionNotes: "Revision Notes",
};

const CLASS_FILTERS = ["All", "9", "10", "11", "12"] as const;
const CATEGORY_FILTERS = [
  "All",
  "samplePdf",
  "importantQuestions",
  "ncertSolutions",
  "pyq",
  "revisionNotes",
] as const;

export default function FreeResourcesGrid({ resources }: { resources: Resource[] }) {
  const [classFilter, setClassFilter] = useState<(typeof CLASS_FILTERS)[number]>("All");
  const [categoryFilter, setCategoryFilter] = useState<(typeof CATEGORY_FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      resources.filter((r) => {
        const matchesClass = classFilter === "All" ? true : r.classLevel === classFilter;
        const matchesCategory = categoryFilter === "All" ? true : r.resourceType === categoryFilter;
        return matchesClass && matchesCategory;
      }),
    [resources, classFilter, categoryFilter],
  );

  return (
    <div>
      <div className="space-y-4 mb-10">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-dark/40">Class</p>
          <div className="flex flex-wrap gap-2">
            {CLASS_FILTERS.map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setClassFilter(cls)}
                aria-pressed={classFilter === cls}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  classFilter === cls
                    ? "bg-primary text-white"
                    : "bg-white border border-primary/15 text-dark/70 hover:border-primary/40",
                )}
              >
                {cls === "All" ? "All Classes" : `Class ${cls}`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-dark/40">Category</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                aria-pressed={categoryFilter === cat}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  categoryFilter === cat
                    ? "bg-accent text-white"
                    : "bg-white border border-primary/15 text-dark/70 hover:border-primary/40",
                )}
              >
                {cat === "All" ? "All Categories" : TYPE_LABEL[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-primary/8 py-16 text-center text-dark/50 text-sm">
          No resources found for this filter yet — check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((resource) => (
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
  );
}
