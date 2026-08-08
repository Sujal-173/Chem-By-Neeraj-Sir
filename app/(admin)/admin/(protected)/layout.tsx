import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/getServerSession";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar adminName={session.user.name || session.user.email} />
      <main className="flex-1 overflow-y-auto p-8 lg:p-10">{children}</main>
    </div>
  );
}
