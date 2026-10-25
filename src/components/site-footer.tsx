import Link from "next/link";
import { store } from "@/lib/data";
import { money } from "@/lib/format";
import { Newsletter } from "./newsletter";

const col = "mb-3 text-xs tracking-[0.2em] text-white/50 uppercase";
const a = "block py-1 text-white/80 hover:text-gold-soft";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-ink text-white">
      <div className="border-b border-white/10">
        <div className="container-x grid gap-6 py-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl">Be first to know</h2>
            <p className="mt-2 text-white/70">New arrivals, restocks and member-only offers. No spam.</p>
          </div>
          <Newsletter />
        </div>
      </div>
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl">{store.name}</p>
          <p className="mt-2 max-w-xs text-white/70">{store.tagline} Premium human hair and a Nairobi salon that installs it right.</p>
          <div className="mt-4 flex gap-4 text-sm">
            <a className="hover:text-gold-soft" href={store.instagram} target="_blank" rel="noopener">Instagram</a>
            <a className="hover:text-gold-soft" href={store.tiktok} target="_blank" rel="noopener">TikTok</a>
          </div>
        </div>
        <div>
          <h4 className={col}>Shop</h4>
          <Link className={a} href="/shop?category=wigs">Wigs</Link>
          <Link className={a} href="/shop?category=extensions">Hair extensions</Link>
          <Link className={a} href="/shop?category=hair-care">Hair care</Link>
          <Link className={a} href="/shop?category=styling">Styling essentials</Link>
        </div>
        <div>
          <h4 className={col}>Help</h4>
          <Link className={a} href="/length-guide">Length and size guide</Link>
          <Link className={a} href="/policies#delivery">Delivery</Link>
          <Link className={a} href="/policies#returns">Returns</Link>
          <Link className={a} href="/policies#booking">Booking policy</Link>
          <Link className={a} href="/policies#privacy">Privacy</Link>
        </div>
        <div>
          <h4 className={col}>Visit</h4>
          <p className="text-white/80">{store.address}</p>
          <a className={a} href={`tel:${store.phone.replace(/\s/g, "")}`}>{store.phone}</a>
          <a className={a} href={`mailto:${store.email}`}>{store.email}</a>
        </div>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-5 text-xs text-white/50">
        <p>&copy; {store.name}. Free Nairobi delivery over {money(store.freeDeliveryOver)}.</p>
        <p className="flex gap-2">
          {["M-Pesa", "Visa", "Mastercard"].map((m) => (
            <span key={m} className="border border-white/20 px-2 py-1">{m}</span>
          ))}
        </p>
      </div>
    </footer>
  );
}
