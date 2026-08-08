"use client";

import { useState } from "react";
import { Video, ClipboardList, LayoutDashboard, Award } from "lucide-react";

const UPCOMING = [
  { icon: Video, title: "Online Classes" },
  { icon: ClipboardList, title: "Test Series" },
  { icon: LayoutDashboard, title: "Student Dashboard" },
  { icon: Award, title: "Certificates" },
];

export default function ComingSoon() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/waiting-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] bg-[length:32px_32px]" />
      <div className="container-custom relative">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-sm font-semibold text-accent">Coming Soon</span>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Online classes are on the way
          </h2>
          <p className="mt-4 text-white/60">
            Join the waiting list to get early access and founder pricing when it launches.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
          {UPCOMING.map(({ icon: Icon, title }) => (
            <div
              key={title}
              className="glass-dark rounded-2xl px-4 py-5 text-center"
            >
              <Icon className="h-5 w-5 text-accent mx-auto" />
              <p className="mt-2.5 text-xs font-medium text-white/80">{title}</p>
            </div>
          ))}
        </div>

        <div className="max-w-md mx-auto">
          {submitted ? (
            <div className="rounded-2xl glass-dark px-6 py-5 text-center text-white/90 text-sm">
              You&apos;re on the list. We&apos;ll notify you the moment classes launch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="waiting-list-email" className="sr-only">
                Email address
              </label>
              <input
                id="waiting-list-email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 rounded-full bg-white/10 border border-white/15 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:bg-white/15 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-600 transition-colors disabled:opacity-60"
              >
                {loading ? "Joining..." : "Join Waiting List"}
              </button>
            </form>
          )}
          {error && <p className="mt-3 text-center text-sm text-accent">{error}</p>}
        </div>
      </div>
    </section>
  );
}
