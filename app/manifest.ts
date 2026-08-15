import type { MetadataRoute } from "next";
import { BRAND_NAME, SITE_DESCRIPTION_DEFAULT } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} | CBSE Chemistry Teacher`,
    short_name: "Easy Chem",
    description: SITE_DESCRIPTION_DEFAULT,
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#0A3D91",
    lang: "en-IN",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
