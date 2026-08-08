import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminSession } from "@/lib/adminApiGuard";
import { updateContactMessageStatus } from "@/lib/admin/data";

const bodySchema = z.object({ status: z.enum(["new", "responded"]) });

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { response } = await requireAdminSession(req);
  if (response) return response;

  const { id } = await params;
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    await updateContactMessageStatus(id, parsed.data.status);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[admin/messages/id] Failed to update:", err);
    return NextResponse.json({ error: "Could not update the message." }, { status: 500 });
  }
}
