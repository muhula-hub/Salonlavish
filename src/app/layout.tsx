import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CartProvider } from "@/components/cart";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { store } from "@/lib/data";
import "./globals.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: { default: `${store.name} | Wigs, extensions and salon in Nairobi`, template: `%s | ${store.name}` },
  description:
    "Human hair wigs, bundles, closures and hair care, delivered across Kenya. Book wig installs, refreshes and braids at our Nairobi salon.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
