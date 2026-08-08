import { Suspense } from "react";
import Image from "next/image";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata = { title: "Admin Login", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Image src="/images/logo.png" alt="CHEM by Neeraj Sir" width={168} height={48} className="h-11 w-auto" />
        </div>
        <div className="rounded-3xl bg-white border border-primary/8 p-8 shadow-soft-lg">
          <h1 className="font-heading text-xl font-semibold text-dark text-center mb-1">
            Admin sign in
          </h1>
          <p className="text-sm text-dark/50 text-center mb-6">
            Restricted to the site administrator.
          </p>
          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
