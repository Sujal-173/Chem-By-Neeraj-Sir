import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Languages, Calendar } from "lucide-react";
import { getAboutPage } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  return {
    title:
      about.seo?.metaTitle || "About Neeraj Sharma | CBSE Chemistry Teacher",
    description:
      about.seo?.metaDescription ||
      "Learn about Neeraj Sharma's 15+ years of experience teaching CBSE Chemistry with a concept-based approach.",
  };
}

export default async function AboutPage() {
  const about = await getAboutPage();
  const hasPhoto = Boolean(about.photo?.url);

  return (
    <div className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-br from-primary/10 via-white to-accent/10 p-2 shadow-soft-lg">
              {hasPhoto ? (
                <Image
                  src={about.photo!.url!}
                  alt="Neeraj Sharma"
                  fill
                  className="object-cover rounded-[1.5rem]"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              ) : (
                <Image
                  src="/images/neeraj-sir-hero.png"
                  alt="Neeraj Sharma"
                  fill
                  className="object-contain rounded-[1.5rem]"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-primary/8 p-4 text-center">
                <GraduationCap className="h-5 w-5 text-primary mx-auto" />
                <p className="mt-2 text-xs font-medium text-dark/70">
                  {about.qualification}
                </p>
              </div>
              <div className="rounded-2xl border border-primary/8 p-4 text-center">
                <Calendar className="h-5 w-5 text-primary mx-auto" />
                <p className="mt-2 text-xs font-medium text-dark/70">
                  {about.experienceYears}+ Years
                </p>
              </div>
              <div className="rounded-2xl border border-primary/8 p-4 text-center">
                <Languages className="h-5 w-5 text-primary mx-auto" />
                <p className="mt-2 text-xs font-medium text-dark/70">
                  {about.teachingMedium?.join(" + ")}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="text-sm font-semibold text-accent">About</span>
            <h1 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight leading-tight">
              {about.heading}
            </h1>

            <div className="mt-6 space-y-4 text-dark/60 leading-relaxed">
              <p>
                Neeraj Sharma holds an {about.qualification} and has spent over{" "}
                {about.experienceYears} years in the classroom, teaching in{" "}
                {about.teachingMedium?.join(" and ")}. His approach centers on
                building genuine conceptual understanding, so students
                don&apos;t just pass exams, they understand the subject.
              </p>
              <p>
                Chemistry is often taught as a subject to memorize — formulas,
                reactions, and periodic trends recited without context. Neeraj
                Sir&apos;s classroom works differently: every topic starts with
                why it happens before moving to how it&apos;s tested, so the
                understanding sticks well beyond the exam.
              </p>
            </div>

            {about.philosophyPoints && about.philosophyPoints.length > 0 && (
              <div className="mt-12">
                <h2 className="font-heading text-xl font-semibold text-dark mb-6">
                  Teaching Philosophy
                </h2>
                <div className="space-y-5">
                  {about.philosophyPoints.map((point) => (
                    <div key={point.title} className="flex gap-4">
                      <div className="h-2 w-2 rounded-full bg-accent mt-2.5 shrink-0" />
                      <div>
                        <h3 className="font-heading font-semibold text-dark text-sm">
                          {point.title}
                        </h3>
                        <p className="mt-1 text-sm text-dark/55 leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {about.milestones && about.milestones.length > 0 && (
              <div className="mt-12">
                <h2 className="font-heading text-xl font-semibold text-dark mb-6">
                  Milestones
                </h2>
                <div className="space-y-4">
                  {about.milestones.map((m) => (
                    <div key={m.year} className="flex items-baseline gap-4">
                      <span className="font-mono text-sm font-bold text-primary shrink-0 w-14">
                        {m.year}
                      </span>
                      <span className="text-sm text-dark/60">
                        {m.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
