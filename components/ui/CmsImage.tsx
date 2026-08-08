import Image from "next/image";
import type { SanityImage as SanityImageType } from "@/lib/sanity/queries";
import { cn } from "@/lib/utils";

type Props = {
  image?: SanityImageType;
  alt: string;
  className?: string;
  sizes?: string;
};

/**
 * Renders a Cloudinary-hosted image when a URL exists, otherwise a soft
 * brand-colored gradient placeholder — so cards look intentional even
 * before content editors upload thumbnails.
 */
export default function CmsImage({ image, alt, className, sizes }: Props) {
  if (!image?.url) {
    return (
      <div
        className={cn("bg-gradient-to-br from-primary/10 to-accent/10", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={image.url}
        alt={image.alt || alt}
        fill
        sizes={sizes || "(max-width: 768px) 100vw, 400px"}
        className="object-cover"
      />
    </div>
  );
}
