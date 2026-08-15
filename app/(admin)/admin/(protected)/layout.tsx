import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/getServerSession";
import AdminShell from "@/components/admin/AdminShell";

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
    <AdminShell adminName={session.user.name || session.user.email}>{children}</AdminShell>
  );
}
