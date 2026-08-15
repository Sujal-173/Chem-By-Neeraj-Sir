"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  ListChecks,
  BookOpen,
  LayoutTemplate,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/content", label: "Website Content", icon: LayoutTemplate },
  { href: "/admin/notes", label: "Upload Notes", icon: BookOpen },
  { href: "/admin/messages", label: "Contact Messages", icon: MessageSquare },
  { href: "/admin/waiting-list", label: "Waiting List", icon: ListChecks },
];

function SidebarContent({
  adminName,
  onNavigate,
}: {
  adminName: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-6 py-5 border-b border-primary/8">
        <Image
          src="/images/logo.png"
          alt="CHEM by Neeraj Sir"
          width={140}
          height={40}
          className="h-8 w-auto"
        />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
        {NAV.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-dark/60 hover:bg-primary/5 hover:text-dark"
              )}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        <a
          href="/studio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-dark/60 hover:bg-primary/5 hover:text-dark transition-colors"
        >
          <ExternalLink className="h-4.5 w-4.5 shrink-0" />
          Open Sanity Studio
        </a>
      </nav>

      <div className="border-t border-primary/8 p-4">
        <p className="px-3 text-xs text-dark/40 mb-2 truncate">Signed in as {adminName}</p>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-dark/60 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          Sign out
        </button>
      </div>
    </>
  );
}

export default function AdminShell({
  adminName,
  children,
}: {
  adminName: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer automatically whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent background scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex h-screen w-64 shrink-0 flex-col sticky top-0 border-r border-primary/10 bg-white">
        <SidebarContent adminName={adminName} />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-primary/10 bg-white px-4 py-3">
        <Link href="/admin" className="flex items-center gap-2" aria-label="Admin home">
          <Image src="/images/logo.png" alt="CHEM by Neeraj Sir" width={120} height={34} className="h-7 w-auto" />
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full text-dark hover:bg-primary/5"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-dark/40 backdrop-blur-[1px] animate-fade-in"
          />
          <aside className="absolute left-0 top-0 flex h-full w-[80vw] max-w-xs flex-col bg-white shadow-soft-lg animate-slide-in-left">
            <div className="flex items-center justify-end px-3 pt-3">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full text-dark/60 hover:bg-primary/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent adminName={adminName} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0 overflow-y-auto scroll-smooth-area p-4 pt-20 sm:p-6 sm:pt-20 lg:p-10 lg:pt-10">
        {children}
      </main>
    </div>
  );
}
