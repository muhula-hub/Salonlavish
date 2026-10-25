import type { Metadata } from "next";
import { store } from "@/lib/data";
import { whatsappLink } from "@/lib/format";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = { title: "Contact us" };

export default function ContactPage() {
  return (
    <>
      <div className="page-head">
        <div className="container-x">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">We&apos;re here to help</h1>
          <p className="mt-3 max-w-xl text-muted">Questions about a unit, an order or a booking? WhatsApp is the fastest way to reach us.</p>
        </div>
      </div>
      <div className="container-x grid items-start gap-10 py-12 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm />
        <aside className="flex flex-col gap-6">
          <a className="btn bg-[#25d366] border-[#25d366] hover:bg-[#1da851] hover:border-[#1da851]" href={whatsappLink(`Hello ${store.name}`)} target="_blank" rel="noopener">
            Chat on WhatsApp
          </a>
          <div>
            <h2 className="mb-2 text-2xl">Visit the salon</h2>
            <p className="text-muted">{store.address}</p>
            <p className="mt-2">
              <a className="underline" href={`tel:${store.phone.replace(/\s/g, "")}`}>{store.phone}</a>
              <br />
              <a className="underline" href={`mailto:${store.email}`}>{store.email}</a>
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-2xl">Opening hours</h2>
            <ul className="divide-y divide-line border-y border-line">
              {store.hours.map((h) => (
                <li key={h.days} className="flex justify-between py-2"><span>{h.days}</span><span className="text-muted">{h.label}</span></li>
              ))}
            </ul>
          </div>
          <div className="grid aspect-[16/10] place-items-center border border-line bg-surface text-sm text-muted">Google Maps embed goes here</div>
        </aside>
      </div>
    </>
  );
}
