"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  ListChecks,
  BookOpen,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/notes", label: "Upload Notes", icon: BookOpen },
  { href: "/admin/messages", label: "Contact Messages", icon: MessageSquare },
  { href: "/admin/waiting-list", label: "Waiting List", icon: ListChecks },
];

export default function AdminSidebar({ adminName }: { adminName: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-primary/10 bg-white">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-primary/8">
        <Image src="/images/logo.png" alt="CHEM by Neeraj Sir" width={140} height={40} className="h-8 w-auto" />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {NAV.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-dark/60 hover:bg-primary/5 hover:text-dark"
              )}
            >
              <Icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}

        <a
          href="/studio"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-dark/60 hover:bg-primary/5 hover:text-dark transition-colors"
        >
          <ExternalLink className="h-4.5 w-4.5" />
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
          <LogOut className="h-4.5 w-4.5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
