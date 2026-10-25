"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { findProduct, priceFor } from "@/lib/data";

// A line key is "slug" or "slug|inches" for products sold by length.
type Lines = Record<string, number>;

export type CartLine = {
  key: string;
  slug: string;
  inches?: number;
  qty: number;
  name: string;
  price: number;
  tone: string;
};

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, inches?: number, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);
const KEY = "lavish-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Lines>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore the saved cart after hydration
      setItems(JSON.parse(localStorage.getItem(KEY) || "{}"));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const value = useMemo<CartValue>(() => {
    const lines = Object.entries(items).flatMap(([key, qty]) => {
      const [slug, len] = key.split("|");
      const p = findProduct(slug);
      if (!p || qty <= 0) return [];
      const inches = len ? Number(len) : undefined;
      return [{ key, slug, inches, qty, name: p.name, price: priceFor(p, inches), tone: p.tone }];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.price, 0),
      add: (slug, inches, qty = 1) => {
        const key = inches ? `${slug}|${inches}` : slug;
        setItems((c) => ({ ...c, [key]: (c[key] || 0) + qty }));
      },
      setQty: (key, qty) =>
        setItems((c) => {
          const next = { ...c };
          if (qty <= 0) delete next[key];
          else next[key] = qty;
          return next;
        }),
      clear: () => setItems({}),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
