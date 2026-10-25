import type { Metadata } from "next";
import Link from "next/link";
import { Photo, ServiceRow } from "@/components/cards";
import { services, store } from "@/lib/data";

export const metadata: Metadata = { title: "Salon services and prices" };

const groups = [...new Set(services.map((s) => s.group))];

export default function ServicesPage() {
  return (
    <>
      <div className="page-head">
        <div className="container-x">
          <p className="eyebrow">The salon</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Services and prices</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Prices are starting prices and depend on length and density. A {store.depositPercent}% deposit holds your slot, and the
            balance is paid in the salon. Bring your own unit or buy one from us.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a key={g} href={`#${g.split(" ")[0].toLowerCase()}`} className="chip">{g}</a>
            ))}
          </nav>
        </div>
      </div>
      <div className="container-x">
        <Photo name="groupWaves" alt="Three clients with wave installs done at the salon" sizes="100vw" className="mt-10 aspect-[16/9] w-full sm:aspect-[21/9]" />
        {groups.map((g) => (
          <section key={g} id={g.split(" ")[0].toLowerCase()} className="scroll-mt-32 pt-12">
            <h2 className="section-title">{g}</h2>
            <div className="mt-2">
              {services.filter((s) => s.group === g).map((s) => <ServiceRow key={s.id} service={s} />)}
            </div>
          </section>
        ))}
        <div className="mt-16 flex flex-col items-start gap-4 bg-gold-soft p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl">Not sure what you need?</h2>
            <p className="text-muted">A 30 minute consultation helps you choose the right unit, length and install.</p>
          </div>
          <Link className="btn shrink-0" href="/booking?service=consultation">Book a consultation</Link>
        </div>
      </div>
    </>
  );
}
