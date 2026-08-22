"use client";

import { useState, useMemo } from "react";
import {
  BookOpen,
  FileText,
  Printer,
  FileDown,
  MessageCircle,
} from "lucide-react";
import type { Resource } from "@/lib/sanity/queries";
import CmsImage from "@/components/ui/CmsImage";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl, buildNoteEnquiryMessage } from "@/lib/whatsapp";

const TYPE_ICON: Record<string, typeof BookOpen> = {
  chapterWise: BookOpen,
  fullNotes: FileText,
  printed: Printer,
  pdf: FileDown,
};

const TYPE_LABEL: Record<string, string> = {
  chapterWise: "Chapter-wise",
  fullNotes: "Full Notes",
  printed: "Printed",
  pdf: "PDF",
};

const CLASS_FILTERS = ["All", "9", "10", "11", "12"] as const;
const CATEGORY_FILTERS = ["All", "chapterWise", "fullNotes", "printed", "pdf"] as const;

export default function NotesGrid({
  resources,
  whatsappUrl,
}: {
  resources: Resource[];
  whatsappUrl: string;
}) {
  const [classFilter, setClassFilter] =
    useState<(typeof CLASS_FILTERS)[number]>("All");
  const [categoryFilter, setCategoryFilter] =
    useState<(typeof CATEGORY_FILTERS)[number]>("All");

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
          No notes found for this filter yet — check back soon.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((note) => {
            const Icon = TYPE_ICON[note.resourceType] || FileText;
            const buyUrl = buildWhatsAppUrl(
              whatsappUrl,
              buildNoteEnquiryMessage({
                title: note.title,
                resourceType: note.resourceType,
                classLevel: note.classLevel,
                subject: note.subject,
                priceDisplay: note.priceDisplay,
              })
            );
            return (
              <div
                key={note._id}
                className="rounded-3xl bg-white border border-primary/8 overflow-hidden shadow-soft hover:shadow-soft-lg transition-shadow"
              >
                <CmsImage
                  image={note.thumbnail}
                  alt={note.title}
                  className="aspect-[4/3]"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-semibold text-dark/50">
                      {TYPE_LABEL[note.resourceType] || note.resourceType} ·
                      Class {note.classLevel}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-dark leading-snug">
                    {note.title}
                  </h3>
                  {note.description && (
                    <p className="mt-2 text-sm text-dark/55 leading-relaxed line-clamp-2">
                      {note.description}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      {note.priceDisplay || "Contact on WhatsApp"}
                    </span>
                    <a
                      href={buyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700 transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Buy on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
