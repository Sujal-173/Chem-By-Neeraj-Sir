"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight, Mail, Phone, MapPin, GraduationCap } from "lucide-react";

type Entry = {
  _id: string;
  name?: string;
  phone?: string;
  email: string;
  studentClass?: string;
  city?: string;
  school?: string;
  createdAt: string;
};

type ListResult = {
  items: Entry[];
  total: number;
  page: number;
  totalPages: number;
};

export default function WaitingListTable() {
  const [data, setData] = useState<ListResult | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ search, page: String(page) });
    const res = await fetch(`/api/admin/waiting-list?${params}`);
    if (res.ok) setData(await res.json());
    setLoading(false);
  }, [search, page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dark/40" />
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          placeholder="Search by name, email, city, school..."
          className="w-full rounded-full border border-primary/15 bg-white pl-11 pr-4 py-2.5 text-sm focus:border-primary/40 transition-colors"
        />
      </div>

      {loading ? (
        <p className="text-sm text-dark/50 py-10 text-center">Loading...</p>
      ) : !data || data.items.length === 0 ? (
        <div className="rounded-2xl border border-primary/8 py-16 text-center text-dark/50 text-sm">
          No signups yet.
        </div>
      ) : (
        <>
          {/* Table layout on larger screens */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-primary/8 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary/8 text-left text-xs text-dark/40">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Class</th>
                  <th className="px-5 py-3 font-medium">City / School</th>
                  <th className="px-5 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((entry) => (
                  <tr key={entry._id} className="border-b border-primary/5 last:border-0">
                    <td className="px-5 py-3 text-dark/80">{entry.name || "—"}</td>
                    <td className="px-5 py-3 text-dark/60">{entry.email}</td>
                    <td className="px-5 py-3 text-dark/60">{entry.phone || "—"}</td>
                    <td className="px-5 py-3 text-dark/60">{entry.studentClass || "—"}</td>
                    <td className="px-5 py-3 text-dark/60">
                      {[entry.city, entry.school].filter(Boolean).join(" / ") || "—"}
                    </td>
                    <td className="px-5 py-3 text-dark/40 text-xs">
                      {new Date(entry.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card layout on mobile */}
          <div className="md:hidden space-y-3">
            {data.items.map((entry) => (
              <div key={entry._id} className="rounded-2xl bg-white border border-primary/8 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-heading font-semibold text-dark text-sm">
                    {entry.name || "Unnamed"}
                  </h3>
                  <span className="shrink-0 text-xs text-dark/35">
                    {new Date(entry.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="mt-2 space-y-1.5 text-xs text-dark/55">
                  <p className="flex items-center gap-1.5 break-all">
                    <Mail className="h-3.5 w-3.5 shrink-0" /> {entry.email}
                  </p>
                  {entry.phone && (
                    <p className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 shrink-0" /> {entry.phone}
                    </p>
                  )}
                  {entry.studentClass && (
                    <p className="flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 shrink-0" /> Class {entry.studentClass}
                    </p>
                  )}
                  {(entry.city || entry.school) && (
                    <p className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {[entry.city, entry.school].filter(Boolean).join(" / ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {data && data.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-dark/60">
            Page {data.page} of {data.totalPages}
          </span>
          <button
            type="button"
            disabled={page >= data.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
