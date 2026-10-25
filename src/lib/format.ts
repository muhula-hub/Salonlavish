import { store } from "./data";

export const money = (n: number) => `${store.currency} ${n.toLocaleString("en-KE")}`;

export const duration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} hr ${m} min` : `${h} hr${h > 1 ? "s" : ""}`;
};

export const whatsappLink = (text: string) =>
  `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(text)}`;

export const depositFor = (price: number) => Math.round((price * store.depositPercent) / 100 / 50) * 50;
