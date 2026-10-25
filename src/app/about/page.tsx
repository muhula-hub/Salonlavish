import type { Metadata } from "next";
import Link from "next/link";
import { HairArt } from "@/components/hair-art";
import { store, stylists } from "@/lib/data";

export const metadata: Metadata = { title: "About us" };

const reasons = [
  { title: "Hair we'd wear ourselves", text: "Every bundle and unit is checked for shedding, tangling and lace quality before it goes on the shelf." },
  { title: "Honest lengths and density", text: "We measure every length we list, so 22 inches arrives as 22 inches." },
  { title: "Installed by specialists", text: "Our stylists focus on wigs and extensions, so your lace melts and your leave-out blends." },
  { title: "Aftercare that lasts", text: "Refresh services, care products and advice on WhatsApp keep your hair looking new for longer." },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-head">
        <div className="container-x">
          <p className="eyebrow">Our story</p>
          <h1 className="mt-2 max-w-3xl text-5xl sm:text-6xl">Beauty in every detail</h1>
        </div>
      </div>
      <section className="container-x grid gap-10 py-14 lg:grid-cols-2 lg:items-center">
        <HairArt kind="portrait" texture="Deep wave" inches={22} tone="#c9a77c" label="Founder portrait placeholder" seed="founder" className="block aspect-[4/5] w-full" />
        <div className="space-y-4 text-lg text-muted">
          <p>
            {store.name} began with a simple frustration: hair that looked great online and disappointing in person.
            We set out to sell only hair we would wear ourselves, and to install it properly.
          </p>
          <p>
            Today we are a Nairobi salon and online shop. You can buy a wig, have it customised, coloured and installed, and come back
            for a refresh, all in one place.
          </p>
          <p className="text-ink">Placeholder story. Replace with the founder&apos;s own words.</p>
        </div>
      </section>
      <section className="bg-surface py-14">
        <div className="container-x">
          <h2 className="section-title mb-10">Why clients choose us</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title}>
                <h3 className="text-2xl">{r.title}</h3>
                <p className="mt-2 text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-x py-14">
        <h2 className="section-title mb-8">Meet the stylists</h2>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
          {stylists.filter((s) => s.id !== "any").map((s, i) => (
            <div key={s.id}>
              <HairArt kind="portrait" texture={(["Straight", "Kinky curly", "Body wave"] as const)[i % 3]} inches={16} tone="#d8bf9c" label={`${s.name}, stylist`} seed={s.id} className="block aspect-square w-full" />
              <p className="mt-3 text-lg">{s.name}</p>
              <p className="text-sm text-muted">{s.does.join(", ")}</p>
            </div>
          ))}
        </div>
        <Link className="btn mt-10" href="/booking">Book with our team</Link>
      </section>
    </>
  );
}
