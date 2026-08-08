import MessagesTable from "@/components/admin/MessagesTable";

export default function AdminMessagesPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark">Contact Messages</h1>
      <p className="mt-1 text-sm text-dark/50">Everything submitted through the Contact page.</p>
      <div className="mt-8">
        <MessagesTable />
      </div>
    </div>
  );
}
