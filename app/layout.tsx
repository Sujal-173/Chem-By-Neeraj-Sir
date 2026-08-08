import type { Metadata } from "next";
import { Poppins, Inter, Space_Grotesk } from "next/font/google";
import AnnouncementBar from "@/components/homepage/AnnouncementBar";
import Navbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer";
import WhatsAppFloatButton from "@/components/ui/WhatsAppFloatButton";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://chembyneerajsir.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Chemistry with Neeraj Sharma | CBSE Chemistry Teacher | Notes & Resources",
    template: "%s | CHEM by Neeraj Sir",
  },
  description:
    "Learn Chemistry the conceptual way with Neeraj Sharma, an experienced CBSE Chemistry teacher with 15+ years of teaching. Premium notes, free resources, and concept-based learning for Class 11, 12, JEE & NEET.",
  keywords: [
    "chemistry teacher",
    "CBSE chemistry notes",
    "Neeraj Sharma chemistry",
    "chemistry notes class 11",
    "chemistry notes class 12",
    "JEE chemistry",
    "NEET chemistry",
  ],
  authors: [{ name: "Neeraj Sharma" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "CHEM by Neeraj Sir",
    title: "Chemistry with Neeraj Sharma | CBSE Chemistry Teacher",
    description:
      "Learn Chemistry the Conceptual Way with 15+ years of experience.",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chemistry with Neeraj Sharma | CBSE Chemistry Teacher",
    description:
      "Learn Chemistry the Conceptual Way with 15+ years of experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <body>
        <AnnouncementBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
