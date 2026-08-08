import Link from "next/link";
import { getEnv } from "@/lib/env";

export default function WhatsAppFloatButton() {
  const env = getEnv();
  const whatsappLink =
    env.NEXT_PUBLIC_CONTACT_WHATSAPP || "https://wa.me/919876543210";

  if (!whatsappLink) return null;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-10 right-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-2 py-2 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#1ea952] sm:bottom-6 sm:right-6"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 shrink-0"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.199-.297.299-.495.099-.198.049-.372-.025-.521-.073-.149-.67-1.612-.92-2.207-.242-.579-.487-.501-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.521.074-.792.372-.271.297-1.036 1.012-1.036 2.467 0 1.455 1.059 2.862 1.206 3.06.147.198 2.086 3.18 5.048 4.463.705.304 1.255.487 1.684.62.707.225 1.35.193 1.858.117.568-.085 1.758-.72 2.007-1.415.249-.695.249-1.29.174-1.414-.074-.124-.273-.198-.57-.347Z" />
      </svg>
    </Link>
  );
}
