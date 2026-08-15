"use client";

import { usePathname } from "next/navigation";
import AnnouncementBar from "@/components/homepage/AnnouncementBar";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer";
import WhatsAppFloatButton from "@/components/ui/WhatsAppFloatButton";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Both the admin dashboard and Sanity Studio are full-screen apps with
  // their own navigation — the public marketing chrome (and its sticky
  // header) would otherwise stack on top of them and eat into their
  // already-tight mobile viewport.
  const isStandaloneApp = pathname?.startsWith("/admin") || pathname?.startsWith("/studio");

  if (isStandaloneApp) {
    return <>{children}</>;
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloatButton />
      <ScrollToTopButton />
    </>
  );
}
