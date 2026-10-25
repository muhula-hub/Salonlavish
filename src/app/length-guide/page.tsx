import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Length and size guide" };

const lengthsGuide = [
  { inches: "10 to 12", fallsAt: "Chin to jaw", note: "Bobs and short styles" },
  { inches: "14 to 16", fallsAt: "Shoulders", note: "Easy everyday length" },
  { inches: "18 to 20", fallsAt: "Below the shoulders to armpits", note: "Our most popular" },
  { inches: "22 to 24", fallsAt: "Mid back", note: "Glam, more volume" },
  { inches: "26 and up", fallsAt: "Lower back", note: "Statement length" },
];

const caps = [
  { size: "Small", circumference: "21 to 21.5 in (53 to 55 cm)" },
  { size: "Medium (standard)", circumference: "22 to 22.5 in (56 to 57 cm)" },
  { size: "Large", circumference: "23 to 23.5 in (58 to 60 cm)" },
];

export default function LengthGuidePage() {
  return (
    <>
      <div className="page-head">
        <div className="container-x">
          <p className="eyebrow">Help</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Length and size guide</h1>
          <p className="mt-3 max-w-xl text-muted">
            Lengths are measured straight, from the top of the hairline to the tips. Curly and wavy textures look 2 to 4 inches shorter when worn.
          </p>
        </div>
      </div>
      <div className="container-x grid gap-14 py-12 lg:grid-cols-2">
        <section>
          <h2 className="mb-4 text-3xl">Hair length</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink">
                <tr><th className="py-2 pr-4 font-medium">Inches</th><th className="py-2 pr-4 font-medium">Falls at</th><th className="py-2 font-medium">Good for</th></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {lengthsGuide.map((l) => (
                  <tr key={l.inches}><td className="py-3 pr-4 tabular-nums">{l.inches}&quot;</td><td className="py-3 pr-4">{l.fallsAt}</td><td className="py-3 text-muted">{l.note}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="mb-4 text-3xl">Cap size</h2>
          <p className="mb-4 text-muted">
            Wrap a soft tape measure around your head, along the hairline, over the tops of your ears and around the nape.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink">
                <tr><th className="py-2 pr-4 font-medium">Cap size</th><th className="py-2 font-medium">Head circumference</th></tr>
              </thead>
              <tbody className="divide-y divide-line">
                {caps.map((c) => (
                  <tr key={c.size}><td className="py-3 pr-4">{c.size}</td><td className="py-3 tabular-nums">{c.circumference}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-muted">
            Between sizes? Every unit has adjustable straps. For a perfect fit, book a{" "}
            <Link className="text-ink underline" href="/booking?service=custom-unit">custom wig build</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
