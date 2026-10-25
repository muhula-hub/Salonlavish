// Payment placeholder. The plan is Paystack for M-Pesa STK push and cards.
// Replace startPayment with a call to a route handler that creates a Paystack
// charge using PAYSTACK_SECRET_KEY on the server, then confirms via webhook.

export type PaymentMethod = "mpesa" | "card";

export type PaymentRequest = {
  method: PaymentMethod;
  amount: number;
  phone: string;
  reference: string;
};

export type PaymentResult = { status: "not_configured"; message: string };

export async function startPayment(req: PaymentRequest): Promise<PaymentResult> {
  void req;
  return {
    status: "not_configured",
    message: "Online payment is not connected yet. We will confirm and take payment on WhatsApp.",
  };
}

export const makeReference = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
