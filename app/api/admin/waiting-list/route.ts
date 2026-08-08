import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminApiGuard";
import { listWaitingList } from "@/lib/admin/data";

export async function GET(req: NextRequest) {
  const { response } = await requireAdminSession(req);
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  try {
    const result = await listWaitingList({ search, page });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[admin/waiting-list] Failed to list:", err);
    return NextResponse.json({ error: "Could not load the waiting list." }, { status: 500 });
  }
}
