import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminApiGuard";
import { listContactMessages } from "@/lib/admin/data";

export async function GET(req: NextRequest) {
  const { response } = await requireAdminSession(req);
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const status = (searchParams.get("status") as "all" | "new" | "responded") || "all";
  const page = Number(searchParams.get("page")) || 1;

  try {
    const result = await listContactMessages({ search, status, page });
    return NextResponse.json(result);
  } catch (err) {
    console.error("[admin/messages] Failed to list:", err);
    return NextResponse.json({ error: "Could not load messages." }, { status: 500 });
  }
}
