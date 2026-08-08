import type { Metadata } from "next";
import { Star } from "lucide-react";
import { getTestimonials } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Student & Parent Testimonials",
  description: "Read what students and parents say about learning Chemistry with Neeraj Sharma.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-sm font-semibold text-accent">Testimonials</span>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight">
            What students and parents say
          </h1>
        </div>

        {testimonials.length === 0 ? (
          <div className="rounded-2xl border border-primary/8 py-16 text-center text-dark/50 text-sm max-w-xl mx-auto">
            Testimonials will appear here as students share their experience.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t._id} className="rounded-3xl bg-white border border-primary/8 p-7 shadow-soft">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-dark/70 leading-relaxed">&ldquo;{t.review}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-heading font-semibold text-primary text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark">{t.name}</p>
                    <p className="text-xs text-dark/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
