/**
 * Payment architecture, prepared ahead of time so switching the notes
 * purchase flow from "WhatsApp + manual UPI" to in-app checkout later
 * doesn't require touching the data model or API shape — only wiring a
 * button in the UI to call these already-working endpoints.
 *
 * Nothing in the current site calls these yet. The purchase flow stays
 * Website → WhatsApp → Manual Confirmation → UPI Payment → Notes Delivery
 * until online classes/payments are ready to launch.
 */

export type OrderStatus = "created" | "paid" | "failed";

export type Order = {
  _id?: string;
  resourceId: string;
  resourceTitle: string;
  amountInPaise: number;
  currency: "INR";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: OrderStatus;
  providerOrderId: string;
  providerPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateOrderInput = {
  resourceId: string;
  resourceTitle: string;
  amountInPaise: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
};

export type CreateOrderResult = {
  providerOrderId: string;
  amountInPaise: number;
  currency: "INR";
  keyId: string;
};

export type VerifyPaymentInput = {
  providerOrderId: string;
  providerPaymentId: string;
  signature: string;
};

export interface PaymentProvider {
  createOrder(input: CreateOrderInput): Promise<CreateOrderResult>;
  verifyPayment(input: VerifyPaymentInput): Promise<boolean>;
}
