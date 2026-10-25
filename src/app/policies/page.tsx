import type { Metadata } from "next";
import { deliveryZones, store } from "@/lib/data";
import { money } from "@/lib/format";

export const metadata: Metadata = { title: "Delivery, returns and policies" };

export default function PoliciesPage() {
  const h2 = "mb-3 text-3xl";
  const sec = "scroll-mt-32 border-b border-line py-10";
  return (
    <>
      <div className="page-head">
        <div className="container-x">
          <p className="eyebrow">Help</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Delivery, returns and policies</h1>
          <p className="mt-3 max-w-xl text-muted">Draft policies for review. Confirm them with the business before launch.</p>
        </div>
      </div>
      <div className="container-x max-w-3xl space-y-0 text-muted">
        <section id="delivery" className={sec}>
          <h2 className={`${h2} text-ink`}>Delivery</h2>
          <ul className="space-y-1">
            {deliveryZones.map((z) => (
              <li key={z.id}>{z.label}: {z.fee ? money(z.fee) : "free"}, {z.note.toLowerCase()}.</li>
            ))}
          </ul>
          <p className="mt-3">Delivery within Nairobi is free on orders over {money(store.freeDeliveryOver)}.</p>
        </section>
        <section id="returns" className={sec}>
          <h2 className={`${h2} text-ink`}>Returns and exchanges</h2>
          <p>
            For hygiene reasons, we accept returns of hair only if it is unworn, unwashed, uncut and with the lace and tags intact,
            within 3 days of delivery. Care products can be returned unopened within 7 days. Refunds go back to the M-Pesa number or
            card you paid with.
          </p>
        </section>
        <section id="booking" className={sec}>
          <h2 className={`${h2} text-ink`}>Booking and deposits</h2>
          <p>
            A {store.depositPercent}% deposit holds your appointment and comes off your final bill. You can reschedule or cancel up to{" "}
            {store.cancelCutoffHours} hours before your appointment. Later cancellations and no-shows keep the deposit.
          </p>
        </section>
        <section id="privacy" className={sec}>
          <h2 className={`${h2} text-ink`}>Privacy</h2>
          <p>
            We use your name, phone and address only to process orders and bookings and to send updates you asked for. We never sell
            your details. Payments are handled by our payment provider and we do not store card numbers.
          </p>
        </section>
      </div>
    </>
  );
}
