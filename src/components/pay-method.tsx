"use client";

import type { PaymentMethod } from "@/lib/payments";

export function PayMethod({ value, onChange }: { value: PaymentMethod; onChange: (m: PaymentMethod) => void }) {
  const opt = (m: PaymentMethod, title: string, note: string) => (
    <label className={`flex cursor-pointer items-start gap-3 border p-4 ${value === m ? "border-ink bg-surface" : "border-line"}`}>
      <input type="radio" name="method" className="mt-1 accent-[var(--color-ink)]" checked={value === m} onChange={() => onChange(m)} />
      <span>
        <span className="block font-medium">{title}</span>
        <span className="text-sm text-muted">{note}</span>
      </span>
    </label>
  );
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="label mb-2">Payment</legend>
      {opt("mpesa", "M-Pesa", "You get a prompt on your phone. Enter your PIN to pay.")}
      {opt("card", "Visa or Mastercard", "Pay securely by card.")}
    </fieldset>
  );
}
