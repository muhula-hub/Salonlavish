"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/cards";
import { categories, findCategory, products } from "@/lib/data";

const textures = ["Straight", "Body wave", "Deep wave", "Kinky curly"];
const sorts = {
  featured: "Featured",
  "price-asc": "Price, low to high",
  "price-desc": "Price, high to low",
  rating: "Top rated",
} as const;

export function ShopGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = params.get("category") ?? "";
  const texture = params.get("texture") ?? "";
  const q = params.get("q") ?? "";
  const sort = (params.get("sort") ?? "featured") as keyof typeof sorts;
  const onSale = params.get("sale") === "1";

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    router.replace(`${pathname}?${next}`, { scroll: false });
  };

  const needle = q.trim().toLowerCase();
  const shown = products
    .filter((p) => !category || p.category === category)
    .filter((p) => !texture || p.texture === texture)
    .filter((p) => !onSale || p.compareAt)
    .filter((p) => !needle || `${p.name} ${p.description} ${p.texture ?? ""}`.toLowerCase().includes(needle))
    .sort((a, b) =>
      sort === "price-asc" ? a.price - b.price
      : sort === "price-desc" ? b.price - a.price
      : sort === "rating" ? (b.rating ?? 0) - (a.rating ?? 0)
      : Number(!!b.bestSeller) - Number(!!a.bestSeller),
    );

  const current = findCategory(category);

  return (
    <>
      <div className="page-head">
        <div className="container-x">
          <p className="eyebrow">Shop</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">{current?.name ?? (q ? `Results for “${q}”` : "All products")}</h1>
          <p className="mt-3 max-w-xl text-muted">{current?.blurb ?? "Human hair wigs, extensions, care and styling essentials."}</p>
        </div>
      </div>
      <div className="container-x">
        <div className="flex flex-col gap-4 border-b border-line py-5">
          <div className="flex flex-wrap gap-2">
            <button className={`chip ${!category ? "chip-active" : ""}`} onClick={() => set("category", "")}>All</button>
            {categories.map((c) => (
              <button key={c.slug} className={`chip ${category === c.slug ? "chip-active" : ""}`} onClick={() => set("category", c.slug)}>
                {c.name}
              </button>
            ))}
            <button className={`chip ${onSale ? "chip-active" : ""}`} onClick={() => set("sale", onSale ? "" : "1")}>On sale</button>
          </div>
          <div className="flex flex-wrap items-end gap-4">
            <label className="field min-w-0 flex-1 sm:max-w-xs">
              <span className="label">Search</span>
              <input id="shop-search" className="input py-2" defaultValue={q} placeholder="Wig, bundle, shampoo..." onChange={(e) => set("q", e.target.value)} />
            </label>
            <label className="field">
              <span className="label">Texture</span>
              <select id="shop-texture" className="input py-2" value={texture} onChange={(e) => set("texture", e.target.value)}>
                <option value="">Any texture</option>
                {textures.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="field">
              <span className="label">Sort by</span>
              <select id="shop-sort" className="input py-2" value={sort} onChange={(e) => set("sort", e.target.value === "featured" ? "" : e.target.value)}>
                {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <p className="ml-auto pb-2 text-sm text-muted">{shown.length} products</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 py-8 sm:gap-x-6 lg:grid-cols-4">
          {shown.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
        {shown.length === 0 && (
          <p className="py-16 text-center text-muted">
            No products match. <button className="underline" onClick={() => router.replace(pathname)}>Clear filters</button>
          </p>
        )}
      </div>
    </>
  );
}
