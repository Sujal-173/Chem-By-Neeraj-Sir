import Link from "next/link";
import { ArrowRight, HelpCircle, CheckSquare, History, FileStack } from "lucide-react";

const RESOURCES = [
  { icon: HelpCircle, title: "Important Questions", desc: "The questions that show up year after year." },
  { icon: CheckSquare, title: "NCERT Solutions", desc: "Step-by-step, textbook-aligned answers." },
  { icon: History, title: "Previous Year Questions", desc: "Real board papers to practice under pressure." },
  { icon: FileStack, title: "Sample PDFs", desc: "A preview of the depth in the premium notes." },
];

export default function FreeResources() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mb-14">
          <span className="text-sm font-semibold text-accent">Free Resources</span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-dark tracking-tight">
            Start here — no cost, no signup wall
          </h2>
          <p className="mt-4 text-dark/60">
            Get a real sense of the teaching style before exploring premium notes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCES.map(({ icon: Icon, title, desc }) => (
            <Link
              key={title}
              href="/resources"
              className="group rounded-3xl border border-primary/8 p-7 hover:border-accent/30 hover:shadow-soft-lg transition-all"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-heading font-semibold text-dark">{title}</h3>
              <p className="mt-2 text-sm text-dark/55 leading-relaxed">{desc}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Download <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
