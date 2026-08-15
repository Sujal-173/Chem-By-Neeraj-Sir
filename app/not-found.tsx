import Link from "next/link";
import { ArrowLeft, FlaskConical, Search } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] via-white to-accent/[0.08] px-6 py-16 text-center shadow-soft sm:px-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-soft">
            <FlaskConical className="h-7 w-7" />
          </div>
          <p className="mt-7 text-7xl font-heading font-bold tracking-tight text-primary sm:text-8xl">
            404
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-dark sm:text-4xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-dark/60">
            This page may have moved, or the link may not be correct. Let&apos;s get you back to learning Chemistry.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              <Search className="h-4 w-4" />
              Browse Resources
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
