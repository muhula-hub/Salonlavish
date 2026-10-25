import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopGrid } from "./shop-grid";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-x py-24 text-center text-muted">Loading the shop...</div>}>
      <ShopGrid />
    </Suspense>
  );
}
