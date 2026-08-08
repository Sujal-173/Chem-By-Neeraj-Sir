import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import { razorpayProvider, isRazorpayConfigured } from "@/lib/payments/razorpay";

const bodySchema = z.object({
  resourceId: z.string().min(1),
  resourceTitle: z.string().min(1),
  amountInPaise: z.number().int().positive(),
  customerName: z.string().min(1).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(7).max(15),
});

/**
 * Not called from anywhere in the current UI — the live purchase flow is
 * still Website → WhatsApp → Manual Confirmation → UPI Payment, per spec.
 * This endpoint exists so switching to in-app checkout later is a UI change,
 * not a rebuild: point a "Buy now" button here once payments are ready to
 * launch, and set RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET.
 */
export async function POST(req: NextRequest) {
  if (!isRazorpayConfigured) {
    return NextResponse.json(
      { error: "Online payments are not enabled yet. Purchases go through WhatsApp for now." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order details." }, { status: 400 });
  }

  try {
    const result = await razorpayProvider.createOrder(parsed.data);
    const db = await getDb();
    const now = new Date();
    await db.collection("orders").insertOne({
      resourceId: parsed.data.resourceId,
      resourceTitle: parsed.data.resourceTitle,
      amountInPaise: parsed.data.amountInPaise,
      currency: "INR",
      customerName: parsed.data.customerName,
      customerEmail: parsed.data.customerEmail,
      customerPhone: parsed.data.customerPhone,
      status: "created",
      providerOrderId: result.providerOrderId,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    console.error("[payments/create-order] Failed:", err);
    return NextResponse.json({ error: "Could not create the order." }, { status: 500 });
  }
}
