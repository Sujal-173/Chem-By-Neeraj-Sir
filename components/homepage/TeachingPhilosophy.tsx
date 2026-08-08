import { Lightbulb, Layers, Repeat } from "lucide-react";

const PILLARS = [
  {
    icon: Lightbulb,
    title: "Understand, then memorize",
    desc: "Every reaction starts with why it happens, not just what to write in the exam.",
  },
  {
    icon: Layers,
    title: "Build layer by layer",
    desc: "Topics connect to what came before, so chemistry stops feeling like disconnected chapters.",
  },
  {
    icon: Repeat,
    title: "Practice with purpose",
    desc: "Previous year and NCERT-aligned questions reinforce concepts, not just recall.",
  },
];

export default function TeachingPhilosophy() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark tracking-tight">
            Teaching Philosophy
          </h2>
          <p className="mt-4 text-dark/60">
            Chemistry is not a subject to be memorized — it&apos;s a way of understanding
            how the world works.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-3xl border border-primary/8 p-8 hover:border-primary/20 hover:shadow-soft-lg transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white mb-6">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-dark">{title}</h3>
              <p className="mt-2.5 text-sm text-dark/55 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
