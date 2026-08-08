"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Mail, Phone, CheckCircle2, Circle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  studentClass: string;
  message: string;
  status: "new" | "responded";
  createdAt: string;
};

type ListResult = {
  items: Message[];
  total: number;
  page: number;
  totalPages: number;
};

export default function MessagesTable() {
  const [data, setData] = useState<ListResult | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "new" | "responded">("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ search, status, page: String(page) });
    const res = await fetch(`/api/admin/messages?${params}`);
    if (res.ok) setData(await res.json());
    setLoading(false);
  }, [search, status, page]);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleStatus(msg: Message) {
    const newStatus = msg.status === "new" ? "responded" : "new";
    await fetch(`/api/admin/messages/${msg._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    load();
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dark/40" />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search by name, email, phone..."
            className="w-full rounded-full border border-primary/15 bg-white pl-11 pr-4 py-2.5 text-sm focus:border-primary/40 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "new", "responded"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setPage(1);
                setStatus(s);
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors",
                status === s ? "bg-primary text-white" : "bg-white border border-primary/15 text-dark/70"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-dark/50 py-10 text-center">Loading...</p>
      ) : !data || data.items.length === 0 ? (
        <div className="rounded-2xl border border-primary/8 py-16 text-center text-dark/50 text-sm">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-3">
          {data.items.map((msg) => (
            <div key={msg._id} className="rounded-2xl bg-white border border-primary/8 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-dark text-sm">{msg.name}</h3>
                    <span className="text-xs text-dark/40">· {msg.studentClass}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-xs text-dark/50">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {msg.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" /> {msg.phone}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleStatus(msg)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium shrink-0",
                    msg.status === "responded"
                      ? "bg-primary/8 text-primary"
                      : "bg-accent/10 text-accent"
                  )}
                >
                  {msg.status === "responded" ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                  {msg.status === "responded" ? "Responded" : "New"}
                </button>
              </div>
              <p className="mt-3 text-sm text-dark/60 leading-relaxed">{msg.message}</p>
              <p className="mt-3 text-xs text-dark/35">
                {new Date(msg.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>
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
