"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { store } from "@/lib/data";
import { money } from "@/lib/format";
import { useCart } from "./cart";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=wigs", label: "Wigs" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/services", label: "Salon" },
  { href: "/booking", label: "Book" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const path = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  const close = () => {
    setOpen(false);
    setSearching(false);
  };

  return (
    <header className="sticky top-0 z-30">
      <p className="bg-ink px-4 py-2 text-center text-xs tracking-wider text-white/90">
        Free delivery in Nairobi on orders over {money(store.freeDeliveryOver)} · Countrywide delivery · Pay with M-Pesa
      </p>
      <div className="border-b border-line bg-bg/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <button className="-ml-2 p-2 lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <span className="my-1.5 block h-px w-6 bg-ink" />
            <span className="my-1.5 block h-px w-6 bg-ink" />
            <span className="my-1.5 block h-px w-4 bg-ink" />
          </button>
          <Link href="/" onClick={close} className="font-display text-2xl tracking-wide sm:text-3xl">
            {store.name}
          </Link>
          <nav
            className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col border-b border-line bg-bg px-4 pb-4 lg:static lg:flex lg:flex-1 lg:flex-row lg:justify-center lg:gap-1 lg:border-0 lg:p-0`}
          >
            {links.map((l) => {
              const active = l.href === "/shop" ? path === "/shop" : path.startsWith(l.href.split("?")[0]) && !l.href.includes("?");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className={`px-3 py-3 text-sm tracking-wider uppercase hover:text-gold-dark lg:py-2 ${active ? "text-gold-dark" : ""}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1">
            <button className="p-2" aria-label="Search" onClick={() => setSearching((s) => !s)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            </button>
            <Link href="/cart" onClick={close} className="relative p-2" aria-label={`Cart, ${count} items`}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
              {count > 0 && (
                <span className="absolute top-0 right-0 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] text-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
        {searching && (
          <form
            className="container-x pb-4"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget).get("q");
              close();
              router.push(`/shop?q=${encodeURIComponent(String(q || ""))}`);
            }}
          >
            <input id="site-search" name="q" autoFocus className="input" placeholder="Search wigs, bundles, hair care..." />
          </form>
        )}
      </div>
    </header>
  );
}
