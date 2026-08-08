import Link from "next/link";
import { getEnv } from "@/lib/env";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function ContactCTA() {
  const env = getEnv();
  const contactEmail =
    env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@chembyneerajsir.com";
  const whatsappLink =
    env.NEXT_PUBLIC_CONTACT_WHATSAPP || "https://wa.me/919876543210";

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="rounded-[2.5rem] bg-primary relative overflow-hidden px-8 py-16 sm:px-16 sm:py-20 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[length:28px_28px]" />
          <div className="relative">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-xl mx-auto">
              Have a question before you start?
            </h2>
            <p className="mt-4 text-white/70 max-w-md mx-auto">
              Reach out directly — Neeraj Sir personally responds to every
              message.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary hover:bg-white/90 transition-colors"
              >
                Contact Neeraj Sir
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={whatsappLink}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
