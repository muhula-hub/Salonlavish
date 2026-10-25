import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductArt, ProductCard, Stars } from "@/components/cards";
import { findCategory, findProduct, products, store } from "@/lib/data";
import { money } from "@/lib/format";
import { BuyBox } from "./buy-box";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = findProduct(slug);
  return { title: p?.name ?? "Product", description: p?.description };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  const category = findCategory(product.category)!;
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <div className="container-x pt-6">
      <nav className="text-sm text-muted">
        <Link href="/shop" className="hover:text-ink">Shop</Link> /{" "}
        <Link href={`/shop?category=${category.slug}`} className="hover:text-ink">{category.name}</Link>
      </nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-4 gap-3">
          <ProductArt product={product} className="col-span-4 block aspect-[4/5] w-full" />
          {["front", "side", "detail", "back"].map((v, i) => (
            <ProductArt key={v} product={product} view={v} inches={product.lengths?.[i % product.lengths.length]?.inches} className="block aspect-square w-full" />
          ))}
        </div>
        <div className="flex flex-col gap-4 lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow">{category.name}</p>
          <h1 className="text-4xl sm:text-5xl">{product.name}</h1>
          {product.rating && <Stars rating={product.rating} count={product.reviews} />}
          <p className="text-lg text-muted">{product.description}</p>
          <BuyBox product={product} />
          <ul className="mt-2 space-y-1.5 border-t border-line pt-4 text-sm">
            {product.details.map((d) => <li key={d}>· {d}</li>)}
          </ul>
          <div className="space-y-1 border-t border-line pt-4 text-sm text-muted">
            <p>Free Nairobi delivery over {money(store.freeDeliveryOver)}. Countrywide courier in 1 to 3 days.</p>
            {product.category === "wigs" && (
              <p>
                Want it installed? <Link className="text-ink underline" href="/booking?service=frontal-install">Book an install</Link>.
                Not sure about length? <Link className="text-ink underline" href="/length-guide">See the length guide</Link>.
              </p>
            )}
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="section-title mb-8">You may also like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
