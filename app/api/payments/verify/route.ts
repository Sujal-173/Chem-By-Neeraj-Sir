import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import { razorpayProvider, isRazorpayConfigured } from "@/lib/payments/razorpay";

const bodySchema = z.object({
  providerOrderId: z.string().min(1),
  providerPaymentId: z.string().min(1),
  signature: z.string().min(1),
});

export async function POST(req: NextRequest) {
  if (!isRazorpayConfigured) {
    return NextResponse.json({ error: "Online payments are not enabled yet." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid verification payload." }, { status: 400 });
  }

  try {
    const isValid = await razorpayProvider.verifyPayment(parsed.data);
    const db = await getDb();

    await db.collection("orders").updateOne(
      { providerOrderId: parsed.data.providerOrderId },
      {
        $set: {
          status: isValid ? "paid" : "failed",
          providerPaymentId: parsed.data.providerPaymentId,
          updatedAt: new Date(),
        },
      }
    );

    if (!isValid) {
      return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });
    }

    return NextResponse.json({ verified: true });
  } catch (err) {
    console.error("[payments/verify] Failed:", err);
    return NextResponse.json({ error: "Could not verify the payment." }, { status: 500 });
  }
}
