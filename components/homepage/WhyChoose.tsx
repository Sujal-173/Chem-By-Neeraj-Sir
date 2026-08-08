import { Check } from "lucide-react";

const REASONS = [
  "15+ years of classroom teaching experience",
  "M.Sc Chemistry with deep subject expertise",
  "Teaches in both Hindi and English",
  "Concept-based approach, not rote memorization",
  "Notes built specifically for CBSE board patterns",
  "Direct doubt-solving support via WhatsApp",
];

export default function WhyChoose() {
  return (
    <section className="py-24">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-sm font-semibold text-accent">Why Choose Neeraj Sir</span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-dark tracking-tight leading-tight">
            Fifteen years of turning confused students into confident ones
          </h2>
          <p className="mt-5 text-dark/60 leading-relaxed">
            There&apos;s no shortage of notes online. What&apos;s harder to find is someone
            who can make a difficult chapter click — and that&apos;s the difference in how
            these materials are built.
          </p>
        </div>

        <div className="rounded-3xl bg-primary p-8 sm:p-10">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            {REASONS.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent mt-0.5">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
                <span className="text-sm text-white/90 leading-relaxed">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
