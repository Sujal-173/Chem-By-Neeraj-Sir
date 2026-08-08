"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const CLASSES = [
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Dropper",
  "Other",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(
          data?.error || "Something went wrong. Please try again.",
        );
      }
      e.currentTarget.reset();
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-primary/10 bg-primary/5 p-10 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary mx-auto" />
        <h3 className="mt-4 font-heading text-lg font-semibold text-dark">
          Message sent
        </h3>
        <p className="mt-2 text-sm text-dark/60">
          Thanks for reaching out — Neeraj Sir will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-dark/70 mb-1.5"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm focus:border-primary/40 transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-dark/70 mb-1.5"
          >
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm focus:border-primary/40 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-dark/70 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm focus:border-primary/40 transition-colors"
          />
        </div>
        <div>
          <label
            htmlFor="studentClass"
            className="block text-sm font-medium text-dark/70 mb-1.5"
          >
            Class
          </label>
          <select
            id="studentClass"
            name="studentClass"
            required
            defaultValue=""
            className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm focus:border-primary/40 transition-colors bg-white"
          >
            <option value="" disabled>
              Select class
            </option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-dark/70 mb-1.5"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-xl border border-primary/15 px-4 py-3 text-sm focus:border-primary/40 transition-colors resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
