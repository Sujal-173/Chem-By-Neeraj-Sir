import Link from "next/link";
import { ArrowRight, FlaskConical } from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="py-24">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent mb-4">
            <FlaskConical className="h-4 w-4" />
            Meet Your Teacher
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark tracking-tight leading-tight">
            An experienced chemistry teacher, not just a notes seller
          </h2>
          <p className="mt-5 text-dark/60 leading-relaxed">
            Neeraj Sharma holds an M.Sc in Chemistry and has spent over 15 years in the
            classroom, teaching in both Hindi and English. His approach centers on
            building genuine conceptual understanding — so students don&apos;t just pass
            exams, they understand the subject.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Read the full story
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-5">
          {[
            { title: "M.Sc Chemistry", desc: "Strong academic foundation in every topic taught." },
            { title: "Hindi + English", desc: "Concepts explained in the language students think in." },
            { title: "Board Focused", desc: "Aligned tightly with the CBSE syllabus and exam pattern." },
            { title: "JEE / NEET Ready", desc: "Depth that extends beyond boards, when students need it." },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white border border-primary/8 p-6 shadow-soft hover:shadow-soft-lg transition-shadow"
            >
              <h3 className="font-heading font-semibold text-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-dark/55 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
