import Link from "next/link";
import { CategoryTile, Photo, ProductCard, Stars, Swatch } from "@/components/cards";
import { categories, products, reviews, services, store } from "@/lib/data";
import { money } from "@/lib/format";

const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);
const salonHighlights = ["wig-refresh", "frontal-install", "custom-unit", "consultation"].map(
  (id) => services.find((s) => s.id === id)!,
);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <Swatch label="" tone="#3a2a22" className="absolute inset-0 opacity-90" />
        <div className="container-x relative grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow text-gold-soft">The Lavish Edit</p>
            <h1 className="mt-4 text-5xl sm:text-7xl">
              Your Hair.
              <br />
              <em className="text-gold-soft">Your Signature.</em>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/80">
              Premium human hair wigs and extensions, and a Nairobi salon that installs, refreshes and styles them for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-light" href="/shop">Shop the collection</Link>
              <Link className="inline-flex items-center border border-white/60 px-6 py-3 text-sm tracking-wider uppercase hover:bg-white/10" href="/booking">
                Book an appointment
              </Link>
            </div>
          </div>
          <Photo name="honeyWaveSmile" alt="Model wearing the Zuri honey body wave wig" priority sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] max-h-[560px] w-full justify-self-end sm:w-4/5 lg:w-4/5" />
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-line bg-surface">
        <div className="container-x grid grid-cols-2 gap-6 py-6 text-center text-sm md:grid-cols-4">
          <p><strong className="block font-medium">100% human hair</strong><span className="text-muted">Raw and virgin, quality checked</span></p>
          <p><strong className="block font-medium">Free Nairobi delivery</strong><span className="text-muted">On orders over {money(store.freeDeliveryOver)}</span></p>
          <p><strong className="block font-medium">Pay with M-Pesa</strong><span className="text-muted">Or Visa and Mastercard</span></p>
          <p><strong className="block font-medium">Installed in-salon</strong><span className="text-muted">Buy and book in one visit</span></p>
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-16 sm:py-24">
        <div className="mb-10 text-center">
          <p className="eyebrow">Collections</p>
          <h2 className="section-title mt-2">Shop by category</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((c) => <CategoryTile key={c.slug} category={c} />)}
        </div>
      </section>

      {/* Best sellers */}
      <section className="container-x pb-16 sm:pb-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Customer favourites</p>
            <h2 className="section-title mt-2">Best sellers</h2>
          </div>
          <Link className="link-arrow" href="/shop">View all products &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {bestSellers.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* Salon */}
      <section className="bg-gold-soft py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Photo name="groupBodyWave" alt="Three clients in body wave units styled at the salon" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full" />
          <div>
            <p className="eyebrow">The salon</p>
            <h2 className="section-title mt-2">Bought it? We&apos;ll install it.</h2>
            <p className="mt-4 max-w-lg text-muted">
              Our stylists melt lace, build custom units and bring tired wigs back to life. Book online and hold your slot with a
              {" "}{store.depositPercent}% M-Pesa deposit.
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {salonHighlights.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-4 py-3">
                  <span>{s.name}</span>
                  <span className="text-sm text-muted tabular-nums">From {money(s.price)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn" href="/booking">Book now</Link>
              <Link className="btn-outline" href="/services">All services</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="section-title mt-2">Beauty in every detail</h2>
          <Photo name="giftBags" alt="Lavish Hairline gift bags with the gold crown logo" sizes="(min-width: 1024px) 40vw, 100vw" className="mt-8 aspect-[3/2] w-full" />
        </div>
        <div className="space-y-4 text-lg text-muted">
          <p>
            Hair is more than a look. It changes how you walk into a room. {store.name} started with one promise: hair that
            looks like yours, feels like yours and lasts. Every order leaves the salon in our signature black and gold gift bag.
          </p>
          <Link className="link-arrow text-ink" href="/about">Discover {store.name} &rarr;</Link>
        </div>
      </section>

      {/* Lookbook */}
      <section className="pb-16 sm:pb-24">
        <div className="container-x mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The lookbook</p>
            <h2 className="section-title mt-2">Bobs, waves and curls</h2>
          </div>
          <Link className="link-arrow" href="/lookbook">See the full lookbook &rarr;</Link>
        </div>
        <div className="container-x grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <Link href="/shop/malkia-bob-wig" className="col-span-2 lg:row-span-2"><Photo name="groupBobsSmile" alt="Four models in copper, black, burgundy and blonde bobs" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[3/2] w-full lg:aspect-auto lg:h-full" /></Link>
          <Link href="/shop/nia-kinky-curly-wig"><Photo name="deepCurly" alt="Nia deep curly wig" className="aspect-[4/5] w-full" /></Link>
          <Link href="/shop/shaba-copper-bob"><Photo name="copperBob" alt="Shaba copper bob" className="aspect-[4/5] w-full" /></Link>
          <Link href="/shop/zawadi-fringe-wig"><Photo name="groupFringe" alt="Zawadi fringe wig in three shades" className="aspect-[4/5] w-full" /></Link>
          <Link href="/shop/neema-loose-wave-wig"><Photo name="looseWave" alt="Neema loose wave wig" className="aspect-[4/5] w-full" /></Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-y border-line bg-surface py-16 sm:py-24">
        <div className="container-x">
          <div className="mb-10 text-center">
            <p className="eyebrow">Real people. Real results.</p>
            <h2 className="section-title mt-2">Loved across Kenya</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="flex flex-col gap-4 border border-line p-6">
                <Stars rating={5} />
                <blockquote className="font-display text-xl leading-snug">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-auto text-sm text-muted">
                  {r.name}, {r.where} · <span className="text-ink">{r.product}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container-x pt-16 text-center sm:pt-24">
        <Photo name="groupCurly" alt="Four models in curly and wavy units" sizes="100vw" className="mb-12 aspect-[16/9] w-full sm:aspect-[21/9]" />
        <h2 className="section-title">Find your perfect look</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">Not sure which unit or length suits you? Book a 30 minute consultation, or message us on WhatsApp.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link className="btn" href="/shop">Shop the collection</Link>
          <Link className="btn-outline" href="/booking?service=consultation">Book a consultation</Link>
        </div>
      </section>
    </>
  );
}
