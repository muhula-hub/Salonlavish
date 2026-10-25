import Image from "next/image";
import Link from "next/link";
import type { Category, Product, Service } from "@/lib/data";
import { duration, money } from "@/lib/format";
import { photos, type PhotoKey } from "@/lib/photos";

export function Photo({ name, alt, className = "", sizes = "(min-width: 1024px) 25vw, 50vw", priority, natural }: { name: PhotoKey; alt: string; className?: string; sizes?: string; priority?: boolean; natural?: boolean }) {
  const { width, height } = photos[name];
  return (
    <div className={`relative overflow-hidden ${className}`} style={natural ? { aspectRatio: `${width} / ${height}` } : undefined}>
      <Image src={photos[name]} alt={alt} fill sizes={sizes} priority={priority} placeholder="blur" className="object-cover object-[50%_20%]" />
    </div>
  );
}

// A product's photo, or nothing when it has none yet.
export function ProductArt({ product, photo, className = "" }: { product: Product; photo?: PhotoKey; className?: string }) {
  const name = photo ?? product.photos?.[0];
  return name ? <Photo name={name} alt={product.name} className={className} /> : null;
}

export function Stars({ rating, count }: { rating: number; count?: number }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted">
      <span className="tracking-[0.15em] text-gold" aria-label={`${rating} out of 5 stars`}>
        {"★★★★★".slice(0, Math.round(rating))}
        <span className="text-line">{"★★★★★".slice(Math.round(rating))}</span>
      </span>
      {count !== undefined && <span>({count})</span>}
    </span>
  );
}

export function Price({ product }: { product: Product }) {
  return (
    <span className="flex flex-wrap items-baseline gap-2 tabular-nums">
      <span className={product.compareAt ? "text-sale" : ""}>
        {product.lengths ? "From " : ""}
        {money(product.price)}
      </span>
      {product.compareAt && <s className="text-sm text-muted">{money(product.compareAt)}</s>}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const badge = product.stock === 0 ? "Sold out" : product.compareAt ? "Sale" : product.bestSeller ? "Best seller" : null;
  return (
    <Link href={`/shop/${product.slug}`} className="group flex flex-col gap-2">
      <div className="relative">
        {product.photos ? (
          <div className="overflow-hidden">
            <ProductArt product={product} className="block aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.03]" />
          </div>
        ) : (
          <div className="flex aspect-[4/5] w-full flex-col justify-end border border-line bg-surface p-5 group-hover:border-gold">
            <p className="text-sm text-muted">{product.description}</p>
          </div>
        )}
        {badge && (
          <span className={`absolute top-3 left-3 px-2 py-1 text-[11px] tracking-wider uppercase ${badge === "Sale" ? "bg-sale text-white" : "bg-white text-ink"}`}>
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-1 font-sans text-base leading-snug group-hover:text-gold-dark">{product.name}</h3>
      {product.rating && <Stars rating={product.rating} count={product.reviews} />}
      <Price product={product} />
    </Link>
  );
}

export function CategoryTile({ category }: { category: Category }) {
  return (
    <Link href={`/shop?category=${category.slug}`} className="group relative block overflow-hidden">
      <Photo name={category.photo} alt={category.name} className="aspect-[3/4] w-full transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent p-5 text-white">
        <h3 className="text-3xl">{category.name}</h3>
        <p className="mt-1 text-sm text-white/80">{category.blurb}</p>
        <span className="mt-3 text-xs tracking-[0.2em] uppercase">Shop &rarr;</span>
      </div>
    </Link>
  );
}

export function ServiceRow({ service }: { service: Service }) {
  return (
    <article className="grid gap-3 border-b border-line py-6 sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <h3 className="text-2xl">{service.name}</h3>
        <p className="mt-1 max-w-xl text-muted">{service.description}</p>
        <p className="mt-2 text-sm text-muted">{duration(service.minutes)}</p>
      </div>
      <div className="flex items-center gap-5 sm:flex-col sm:items-end sm:gap-2">
        <strong className="text-lg font-medium tabular-nums">From {money(service.price)}</strong>
        <Link className="link-arrow" href={`/booking?service=${service.id}`}>Book &rarr;</Link>
      </div>
    </article>
  );
}
