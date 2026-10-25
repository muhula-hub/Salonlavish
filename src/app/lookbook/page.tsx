import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/cards";
import { products } from "@/lib/data";
import { photos, type PhotoKey } from "@/lib/photos";

export const metadata: Metadata = { title: "Lookbook" };

// Which product each photo shows, so every look links to something to buy.
const productFor = (key: PhotoKey) => products.find((p) => p.photos?.includes(key));
const all = (Object.keys(photos) as PhotoKey[]).filter((k) => k !== "giftBags");

export default function LookbookPage() {
  return (
    <>
      <div className="page-head">
        <div className="container-x">
          <p className="eyebrow">Lookbook</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Real hair, real clients</h1>
          <p className="mt-3 max-w-xl text-muted">Every look here is one of our units. Tap a photo to shop it.</p>
        </div>
      </div>
      <div className="container-x columns-2 gap-3 pt-10 sm:gap-5 lg:columns-3">
        {all.map((key) => {
          const product = productFor(key);
          const tile = (
            <figure className="group relative mb-3 break-inside-avoid sm:mb-5">
              <Photo name={key} alt={product?.name ?? "Lavish Hairline look"} sizes="(min-width: 1024px) 33vw, 50vw" natural className="w-full" />
              {product && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 max-lg:opacity-100">
                  {product.name} &rarr;
                </figcaption>
              )}
            </figure>
          );
          return product ? <Link key={key} href={`/shop/${product.slug}`}>{tile}</Link> : <div key={key}>{tile}</div>;
        })}
      </div>
    </>
  );
}
