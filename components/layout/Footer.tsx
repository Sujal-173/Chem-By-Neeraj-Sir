import Image from "next/image";
import Link from "next/link";
import { Instagram, Youtube, MessageCircle, Mail } from "lucide-react";
import { getEnv } from "@/lib/env";

const FOOTER_LINKS = {
  Explore: [
    { label: "About", href: "/about" },
    { label: "Notes", href: "/notes" },
    { label: "Free Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
  ],
  Support: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Testimonials", href: "/testimonials" },
  ],
  Coming: [
    { label: "Online Classes", href: "/online-classes" },
    { label: "Test Series", href: "/online-classes" },
    { label: "Student Login", href: "/login" },
  ],
};

export default function Footer() {
  const env = getEnv();
  const contactEmail =
    env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@chembyneerajsir.com";
  const whatsappLink =
    env.NEXT_PUBLIC_CONTACT_WHATSAPP || "https://wa.me/919876543210";
  const instagramLink =
    env.NEXT_PUBLIC_CONTACT_INSTAGRAM || "https://www.instagram.com/";
  const youtubeLink =
    env.NEXT_PUBLIC_CONTACT_YOUTUBE || "https://www.youtube.com/";

  return (
    <footer className="bg-dark text-white">
      <div className="container-custom py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <Image
            src="/images/logo.png"
            alt="CHEM by Neeraj Sir logo"
            width={168}
            height={48}
            className="h-10 w-auto"
          />
          <p className="mt-4 text-sm text-white/50 leading-relaxed max-w-xs">
            Learn Chemistry the Conceptual Way — concept-based notes and
            guidance from an experienced CBSE Chemistry teacher.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent transition-colors"
            >
              <Youtube className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${contactEmail}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-accent transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h3 className="font-heading text-sm font-semibold text-white/90">
              {heading}
            </h3>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} CHEM by Neeraj Sir. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
