import { GraduationCap, Users, Target, Trophy } from "lucide-react";

const STATS = [
  { icon: GraduationCap, value: "15+", label: "Years of Experience" },
  { icon: Users, value: "1000+", label: "Students Guided" },
  { icon: Target, value: "100%", label: "Concept Based Learning" },
  { icon: Trophy, value: "Results", label: "That Inspire" },
];

export default function Statistics() {
  return (
    <section className="border-y border-primary/8 bg-white">
      <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-8 py-12">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/8 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-mono text-xl font-bold text-dark leading-none">{value}</p>
              <p className="text-sm text-dark/55 mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
