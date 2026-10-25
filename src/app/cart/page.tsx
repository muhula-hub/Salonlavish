"use client";

import Link from "next/link";
import { useCart } from "@/components/cart";
import { ProductArt } from "@/components/cards";
import { findProduct, store } from "@/lib/data";
import { money } from "@/lib/format";

export default function CartPage() {
  const { lines, subtotal, setQty, clear } = useCart();
  const toFree = store.freeDeliveryOver - subtotal;
  const qtyBtn = "px-3 py-1.5";

  return (
    <div className="container-x">
      <div className="page-head"><h1 className="text-5xl sm:text-6xl">Your cart</h1></div>
      {lines.length === 0 ? (
        <div className="py-20 text-center">
          <p className="mb-6 text-muted">Your cart is empty.</p>
          <Link className="btn" href="/shop">Shop the collection</Link>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((l) => (
              <li key={l.key} className="grid grid-cols-[72px_1fr] gap-4 py-5 sm:grid-cols-[88px_1fr_auto_auto] sm:items-center">
                <ProductArt product={findProduct(l.slug)!} inches={l.inches} className="block aspect-[4/5] w-full" />
                <div className="min-w-0">
                  <Link href={`/shop/${l.slug}`} className="hover:text-gold-dark">{l.name}</Link>
                  {l.inches && <p className="text-sm text-muted">Length {l.inches}&quot;</p>}
                  <p className="text-sm text-muted tabular-nums">{money(l.price)} each</p>
                </div>
                <div className="col-start-2 flex w-fit items-center border border-line sm:col-start-auto">
                  <button className={qtyBtn} aria-label="Remove one" onClick={() => setQty(l.key, l.qty - 1)}>&minus;</button>
                  <span className="w-6 text-center tabular-nums">{l.qty}</span>
                  <button className={qtyBtn} aria-label="Add one" onClick={() => setQty(l.key, l.qty + 1)}>+</button>
                </div>
                <strong className="col-start-2 font-medium tabular-nums sm:col-start-auto sm:min-w-28 sm:text-right">{money(l.price * l.qty)}</strong>
              </li>
            ))}
          </ul>
          <div className="card gap-3 lg:sticky lg:top-32">
            <div className="flex justify-between text-lg">
              <span>Subtotal</span>
              <strong className="font-medium tabular-nums">{money(subtotal)}</strong>
            </div>
            <p className="bg-gold-soft px-3 py-2 text-sm">
              {toFree > 0 ? `Add ${money(toFree)} more for free Nairobi delivery.` : "You qualify for free Nairobi delivery."}
            </p>
            <p className="text-sm text-muted">Delivery or pickup is chosen at checkout.</p>
            <Link className="btn" href="/checkout">Checkout</Link>
            <button className="py-1 text-sm text-muted hover:text-ink" onClick={clear}>Clear cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
