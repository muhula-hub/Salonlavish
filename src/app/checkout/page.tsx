"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart";
import { PayMethod } from "@/components/pay-method";
import { deliveryZones, store } from "@/lib/data";
import { money, whatsappLink } from "@/lib/format";
import { makeReference, startPayment, type PaymentMethod } from "@/lib/payments";

export default function CheckoutPage() {
  const { lines, subtotal, clear } = useCart();
  const [zoneId, setZoneId] = useState("pickup");
  const [method, setMethod] = useState<PaymentMethod>("mpesa");
  const [done, setDone] = useState<{ ref: string; message: string; wa: string } | null>(null);

  const freeNairobi = subtotal >= store.freeDeliveryOver;
  const feeFor = (z: (typeof deliveryZones)[number]) => (freeNairobi && (z.id === "cbd" || z.id === "nairobi") ? 0 : z.fee);
  const zone = deliveryZones.find((z) => z.id === zoneId)!;
  const fee = feeFor(zone);
  const total = subtotal + fee;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const ref = makeReference("ORD");
    const result = await startPayment({ method, amount: total, phone: d.phone, reference: ref });
    const text =
      `Hello ${store.name}, order ${ref}:\n` +
      lines.map((l) => `- ${l.qty} x ${l.name}${l.inches ? ` ${l.inches}"` : ""} (${money(l.qty * l.price)})`).join("\n") +
      `\n${zone.label}: ${fee ? money(fee) : "Free"}\nTotal: ${money(total)}\nName: ${d.name}\nPhone: ${d.phone}` +
      (d.address ? `\nAddress: ${d.address}` : "") +
      `\nPaying by: ${method === "mpesa" ? "M-Pesa" : "card"}`;
    setDone({ ref, message: result.message, wa: whatsappLink(text) });
    clear();
  }

  if (done) {
    return (
      <div className="container-x max-w-xl py-20 text-center">
        <p className="eyebrow">Reference {done.ref}</p>
        <h1 className="mt-2 text-5xl">Order received</h1>
        <p className="mt-4 text-muted">{done.message}</p>
        <a className="btn mt-8" href={done.wa} target="_blank" rel="noopener">Send order on WhatsApp</a>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <p className="mb-6 text-muted">Your cart is empty.</p>
        <Link className="btn" href="/shop">Shop the collection</Link>
      </div>
    );
  }

  return (
    <div className="container-x">
      <div className="page-head"><h1 className="text-5xl sm:text-6xl">Checkout</h1></div>
      <form onSubmit={submit} className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2 className="text-2xl">Contact</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="field">
                <span className="label">Full name</span>
                <input id="co-name" name="name" required autoComplete="name" className="input" />
              </label>
              <label className="field">
                <span className="label">Phone (M-Pesa number)</span>
                <input id="co-phone" name="phone" type="tel" required placeholder="07xx xxx xxx" pattern="^(\+?254|0)[17]\d{8}$" title="A Kenyan mobile number, for example 0712 345 678" autoComplete="tel" className="input" />
              </label>
            </div>
          </section>
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl">Delivery</h2>
            {deliveryZones.map((z) => (
              <label key={z.id} className={`flex cursor-pointer items-center justify-between gap-3 border p-4 ${zoneId === z.id ? "border-ink bg-surface" : "border-line"}`}>
                <span className="flex items-start gap-3">
                  <input type="radio" name="zone" className="mt-1 accent-[var(--color-ink)]" checked={zoneId === z.id} onChange={() => setZoneId(z.id)} />
                  <span>
                    <span className="block">{z.label}</span>
                    <span className="text-sm text-muted">{z.note}</span>
                  </span>
                </span>
                <span className="tabular-nums">{feeFor(z) ? money(feeFor(z)) : "Free"}</span>
              </label>
            ))}
            {zoneId !== "pickup" && (
              <label className="field mt-2">
                <span className="label">Delivery address</span>
                <textarea id="co-address" name="address" required className="input min-h-20" placeholder="Building, street, area and town" />
              </label>
            )}
          </section>
          <PayMethod value={method} onChange={setMethod} />
        </div>
        <aside className="card gap-3 lg:sticky lg:top-32">
          <h2 className="text-2xl">Order summary</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {lines.map((l) => (
              <li key={l.key} className="flex justify-between gap-3">
                <span>{l.qty} &times; {l.name}{l.inches ? `, ${l.inches}"` : ""}</span>
                <span className="tabular-nums">{money(l.qty * l.price)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-line pt-3 text-sm"><span>Subtotal</span><span className="tabular-nums">{money(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span>Delivery</span><span className="tabular-nums">{fee ? money(fee) : "Free"}</span></div>
          <div className="flex justify-between border-t border-line pt-3 text-lg"><span>Total</span><strong className="font-medium tabular-nums">{money(total)}</strong></div>
          <button className="btn mt-2" type="submit">Pay {money(total)}</button>
        </aside>
      </form>
    </div>
  );
}
