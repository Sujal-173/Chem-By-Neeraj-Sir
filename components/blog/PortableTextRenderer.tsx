import { PortableText, type PortableTextComponents, type PortableTextBlock } from "@portabletext/react";
import Image from "next/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => (
      <h2
        id={slugify(extractText(value))}
        className="font-heading text-2xl font-bold text-dark mt-10 mb-4 scroll-mt-28"
      >
        {children}
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={slugify(extractText(value))}
        className="font-heading text-xl font-semibold text-dark mt-8 mb-3 scroll-mt-28"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-lg font-semibold text-dark mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-dark/70 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-5 italic text-dark/60 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 space-y-2 text-dark/70 mb-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-2 text-dark/70 mb-4">{children}</ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-primary underline underline-offset-2 hover:text-primary-700"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    cloudinaryImage: ({ value }) => (
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden my-8">
        <Image src={value.url} alt={value.alt || ""} fill className="object-cover" />
      </div>
    ),
  },
};

function extractText(value: { children?: unknown }): string {
  const children = value.children;
  if (!Array.isArray(children)) return "";
  return children
    .map((c) => (c && typeof c === "object" && "text" in c ? String((c as { text?: unknown }).text ?? "") : ""))
    .join("");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function PortableTextRenderer({ value }: { value: unknown }) {
  if (!value) return null;
  return <PortableText value={value as PortableTextBlock[]} components={components} />;
}
