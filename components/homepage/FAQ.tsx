import { getFaqs } from "@/lib/sanity/queries";
import FaqAccordion from "@/components/ui/FaqAccordion";

export default async function FAQ() {
  const faqs = (await getFaqs()).slice(0, 4);
  if (faqs.length === 0) return null;

  return (
    <section className="py-24">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-accent">FAQ</span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-dark tracking-tight">
            Common questions
          </h2>
        </div>
        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
