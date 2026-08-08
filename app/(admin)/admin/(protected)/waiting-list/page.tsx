import WaitingListTable from "@/components/admin/WaitingListTable";

export default function AdminWaitingListPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-dark">Waiting List</h1>
      <p className="mt-1 text-sm text-dark/50">
        Everyone who signed up for early access to online classes.
      </p>
      <div className="mt-8">
        <WaitingListTable />
      </div>
    </div>
  );
}
