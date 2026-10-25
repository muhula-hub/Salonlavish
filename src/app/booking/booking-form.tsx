"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { PayMethod } from "@/components/pay-method";
import { findService, services, store, stylists } from "@/lib/data";
import { depositFor, duration, money, whatsappLink } from "@/lib/format";
import { makeReference, startPayment, type PaymentMethod } from "@/lib/payments";

const pad = (n: number) => String(n).padStart(2, "0");
const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// Opening hours for a date: index 0 is Mon to Fri, 1 Saturday, 2 Sunday.
const hoursFor = (date: string) => {
  const day = new Date(`${date}T12:00:00`).getDay();
  return store.hours[day === 6 ? 1 : day === 0 ? 2 : 0];
};

// Start times every 30 minutes that let the service finish before closing.
// Live availability per stylist replaces this once bookings are stored.
function slotsFor(date: string, minutes: number) {
  if (!date) return [];
  const { open, close } = hoursFor(date);
  const slots: string[] = [];
  for (let t = open * 60; t + minutes <= close * 60; t += 30) slots.push(`${pad(Math.floor(t / 60))}:${pad(t % 60)}`);
  return slots;
}

export function BookingForm() {
  const params = useSearchParams();
  const [serviceId, setServiceId] = useState(params.get("service") ?? "");
  const [stylistId, setStylistId] = useState("any");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("mpesa");
  const [done, setDone] = useState<{ ref: string; message: string; wa: string } | null>(null);

  const service = findService(serviceId);
  const available = stylists.filter((s) => !service || s.does.includes(service.group));
  const slots = slotsFor(date, service?.minutes ?? 60);
  const deposit = service ? depositFor(service.price) : 0;
  const today = isoDate(new Date());

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!service) return;
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const ref = makeReference("BK");
    const stylist = stylists.find((s) => s.id === stylistId)!;
    const result = await startPayment({ method, amount: deposit, phone: d.phone, reference: ref });
    const text =
      `Hello ${store.name}, I'd like to book (ref ${ref}).\n` +
      `Service: ${service.name}\nStylist: ${stylist.name}\nDate: ${date} at ${time}\n` +
      `Name: ${d.name}\nPhone: ${d.phone}\nDeposit: ${money(deposit)} by ${method === "mpesa" ? "M-Pesa" : "card"}` +
      (d.notes ? `\nNotes: ${d.notes}` : "");
    setDone({ ref, message: result.message, wa: whatsappLink(text) });
  }

  if (done && service) {
    return (
      <div className="container-x max-w-xl py-16 text-center">
        <p className="eyebrow">Reference {done.ref}</p>
        <h2 className="mt-2 text-4xl">Booking requested</h2>
        <p className="mt-3">{service.name} on {date} at {time}.</p>
        <p className="mt-3 text-muted">{done.message}</p>
        <a className="btn mt-6" href={done.wa} target="_blank" rel="noopener">Confirm on WhatsApp</a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="container-x mt-10 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl">1. Service</h2>
          <select id="bk-service" name="service" required className="input" value={serviceId} onChange={(e) => { setServiceId(e.target.value); setStylistId("any"); setTime(""); }}>
            <option value="">Choose a service</option>
            {[...new Set(services.map((s) => s.group))].map((g) => (
              <optgroup key={g} label={g}>
                {services.filter((s) => s.group === g).map((s) => (
                  <option key={s.id} value={s.id}>{s.name}, from {money(s.price)}</option>
                ))}
              </optgroup>
            ))}
          </select>
          {service && <p className="text-sm text-muted">{service.description} About {duration(service.minutes)}.</p>}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl">2. Stylist</h2>
          <div className="flex flex-wrap gap-2">
            {available.map((s) => (
              <button type="button" key={s.id} className={`chip ${stylistId === s.id ? "chip-active" : ""}`} onClick={() => setStylistId(s.id)} aria-pressed={stylistId === s.id}>
                {s.name}
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-2xl">3. Date and time</h2>
          <input id="bk-date" name="date" type="date" required min={today} className="input sm:max-w-xs" value={date} onChange={(e) => { setDate(e.target.value); setTime(""); }} />
          {date && (
            <>
              <p className="text-sm text-muted">Open {hoursFor(date).label}.</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {slots.map((t) => (
                  <button type="button" key={t} className={`chip text-center tabular-nums ${time === t ? "chip-active" : ""}`} onClick={() => setTime(t)} aria-pressed={time === t}>
                    {t}
                  </button>
                ))}
              </div>
              {slots.length === 0 && <p className="text-sm text-sale">This service is too long to fit that day. Try another date.</p>}
            </>
          )}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl">4. Your details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field">
              <span className="label">Full name</span>
              <input id="bk-name" name="name" required autoComplete="name" className="input" />
            </label>
            <label className="field">
              <span className="label">Phone (M-Pesa number)</span>
              <input id="bk-phone" name="phone" type="tel" required placeholder="07xx xxx xxx" pattern="^(\+?254|0)[17]\d{8}$" title="A Kenyan mobile number, for example 0712 345 678" autoComplete="tel" className="input" />
            </label>
          </div>
          <label className="field">
            <span className="label">Notes (optional)</span>
            <textarea id="bk-notes" name="notes" className="input min-h-24" placeholder="Bringing your own unit? Length, colour or style inspiration?" />
          </label>
          <PayMethod value={method} onChange={setMethod} />
        </section>
      </div>

      <aside className="card gap-3 lg:sticky lg:top-32">
        <h2 className="text-2xl">Your booking</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted">Service</dt><dd className="text-right">{service?.name ?? "Not chosen"}</dd>
          <dt className="text-muted">Stylist</dt><dd className="text-right">{stylists.find((s) => s.id === stylistId)?.name}</dd>
          <dt className="text-muted">When</dt><dd className="text-right">{date && time ? `${date}, ${time}` : "Not chosen"}</dd>
          <dt className="text-muted">Price from</dt><dd className="text-right tabular-nums">{service ? money(service.price) : "-"}</dd>
        </dl>
        <div className="flex justify-between border-t border-line pt-3">
          <span>Deposit today ({store.depositPercent}%)</span>
          <strong className="font-medium tabular-nums">{money(deposit)}</strong>
        </div>
        <button className="btn mt-2" type="submit" disabled={!service || !date || !time}>
          {service && date && time ? `Pay ${money(deposit)} deposit` : "Choose service and time"}
        </button>
        <p className="text-xs text-muted">
          Reschedule or cancel up to {store.cancelCutoffHours} hours before. Later cancellations keep the deposit.
        </p>
      </aside>
    </form>
  );
}
