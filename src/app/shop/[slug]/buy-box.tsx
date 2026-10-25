"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart";
import { priceFor, type Product } from "@/lib/data";
import { money } from "@/lib/format";

export function BuyBox({ product }: { product: Product }) {
  const { add } = useCart();
  const [inches, setInches] = useState(product.lengths?.[0]?.inches);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = priceFor(product, inches);
  const soldOut = product.stock === 0;

  return (
    <div className="flex flex-col gap-4">
      <p className="flex items-baseline gap-3 text-2xl tabular-nums">
        <span className={product.compareAt ? "text-sale" : ""}>{money(price)}</span>
        {product.compareAt && !product.lengths && <s className="text-base text-muted">{money(product.compareAt)}</s>}
      </p>
      {product.lengths && (
        <fieldset>
          <legend className="label mb-2">Length: {inches}&quot;</legend>
          <div className="flex flex-wrap gap-2">
            {product.lengths.map((l) => (
              <button
                key={l.inches}
                type="button"
                onClick={() => setInches(l.inches)}
                className={`chip min-w-14 ${l.inches === inches ? "chip-active" : ""}`}
                aria-pressed={l.inches === inches}
              >
                {l.inches}&quot;
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <p className={`text-sm ${soldOut || product.stock <= 5 ? "text-sale" : "text-muted"}`}>
        {soldOut ? "Sold out. Message us to be told when it's back." : product.stock <= 5 ? `Only ${product.stock} left` : product.readyToShip ? "In stock, ready to ship" : "In stock"}
      </p>
      <div className="flex gap-3">
        <div className="flex items-center border border-line">
          <button type="button" className="px-3 py-3" aria-label="Fewer" onClick={() => setQty((q) => Math.max(1, q - 1))}>&minus;</button>
          <span className="w-8 text-center tabular-nums">{qty}</span>
          <button type="button" className="px-3 py-3" aria-label="More" onClick={() => setQty((q) => q + 1)}>+</button>
        </div>
        <button
          className="btn flex-1"
          disabled={soldOut}
          onClick={() => {
            add(product.slug, inches, qty);
            setAdded(true);
          }}
        >
          {soldOut ? "Sold out" : `Add to cart · ${money(price * qty)}`}
        </button>
      </div>
      {added && (
        <p className="flex items-center justify-between bg-gold-soft px-4 py-3 text-sm">
          Added to your cart.
          <Link href="/cart" className="font-medium underline">View cart</Link>
        </p>
      )}
    </div>
  );
}
