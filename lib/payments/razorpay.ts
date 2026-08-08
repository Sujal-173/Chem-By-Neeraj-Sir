import Razorpay from "razorpay";
import { createHmac } from "crypto";
import { requireEnv } from "@/lib/env";
import type {
  PaymentProvider,
  CreateOrderInput,
  CreateOrderResult,
  VerifyPaymentInput,
} from "@/lib/payments/types";

export const isRazorpayConfigured = Boolean(
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
);

let client: Razorpay | null = null;

function getClient(): Razorpay {
  if (!client) {
    client = new Razorpay({
      key_id: requireEnv("RAZORPAY_KEY_ID"),
      key_secret: requireEnv("RAZORPAY_KEY_SECRET"),
    });
  }
  return client;
}

export const razorpayProvider: PaymentProvider = {
  async createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
    const keyId = requireEnv("RAZORPAY_KEY_ID");
    const order = await getClient().orders.create({
      amount: input.amountInPaise,
      currency: "INR",
      notes: {
        resourceId: input.resourceId,
        resourceTitle: input.resourceTitle,
        customerEmail: input.customerEmail,
      },
    });

    return {
      providerOrderId: order.id,
      amountInPaise: input.amountInPaise,
      currency: "INR",
      keyId,
    };
  },

  async verifyPayment(input: VerifyPaymentInput): Promise<boolean> {
    const secret = requireEnv("RAZORPAY_KEY_SECRET");
    const expectedSignature = createHmac("sha256", secret)
      .update(`${input.providerOrderId}|${input.providerPaymentId}`)
      .digest("hex");

    return expectedSignature === input.signature;
  },
};
