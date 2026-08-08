import type { Metadata } from "next";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { getEnv } from "@/lib/env";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Neeraj Sir",
  description:
    "Get in touch with Neeraj Sharma for questions about Chemistry notes, coaching, or upcoming online classes.",
};

export default function ContactPage() {
  const env = getEnv();
  const contactEmail =
    env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@chembyneerajsir.com";
  const contactPhone = env.NEXT_PUBLIC_CONTACT_PHONE || "+91-98765-43210";
  const whatsappLink =
    env.NEXT_PUBLIC_CONTACT_WHATSAPP || "https://wa.me/919876543210";

  return (
    <div className="py-20 lg:py-28">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <span className="text-sm font-semibold text-accent">Contact</span>
          <h1 className="mt-2 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight leading-tight">
            Have a question before you start?
          </h1>
          <p className="mt-4 text-dark/60 leading-relaxed">
            Reach out directly — Neeraj Sir personally responds to every
            message.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={whatsappLink}
              className="flex items-center gap-4 rounded-2xl border border-primary/8 p-5 hover:border-primary/20 transition-colors"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary shrink-0">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-semibold text-dark text-sm">
                  WhatsApp
                </p>
                <p className="text-sm text-dark/50">Fastest way to reach us</p>
              </div>
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-4 rounded-2xl border border-primary/8 p-5 hover:border-primary/20 transition-colors"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary shrink-0">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-semibold text-dark text-sm">
                  Email
                </p>
                <p className="text-sm text-dark/50">{contactEmail}</p>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-primary/8 p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/8 text-primary shrink-0">
                <Phone className="h-5 w-5" />
              </span>
              <div>
                <p className="font-heading font-semibold text-dark text-sm">
                  Phone
                </p>
                <p className="mt-1 text-sm text-dark/50">{contactPhone}</p>
                <p className="text-sm text-dark/50">
                  Shared after your first message
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white border border-primary/8 p-8 sm:p-10 shadow-soft">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
