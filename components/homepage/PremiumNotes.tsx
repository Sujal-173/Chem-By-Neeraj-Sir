import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Printer, FileDown } from "lucide-react";

const NOTE_TYPES = [
  { icon: BookOpen, title: "Chapter-wise Notes", desc: "Focused, exam-ready notes for every chapter." },
  { icon: FileText, title: "Full Notes", desc: "Complete syllabus coverage in one organized set." },
  { icon: Printer, title: "Printed Notes", desc: "Delivered to your door, ready to study from." },
  { icon: FileDown, title: "PDF Notes", desc: "Instant digital access on any device." },
];

export default function PremiumNotes() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <span className="text-sm font-semibold text-accent">Premium Notes</span>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-dark tracking-tight">
              Concept-first notes, built to be understood
            </h2>
          </div>
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all shrink-0"
          >
            View all notes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {NOTE_TYPES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-3xl bg-white border border-primary/8 p-7 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-heading font-semibold text-dark">{title}</h3>
              <p className="mt-2 text-sm text-dark/55 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/10 px-6 py-4 text-sm text-dark/60 text-center">
          Pricing shared on request — message on WhatsApp for the current catalog and rates.
        </div>
      </div>
    </section>
  );
}
