# Lavish Hairline website

Online shop and salon booking site for Lavish Hairline, Nairobi. Built with Next.js (App Router, TypeScript) and Tailwind CSS, following the project plan: Next.js on Vercel now, with Supabase and Paystack to be added.

## Run it

Needs Node.js 20 or newer.

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Route | What it does |
| --- | --- |
| `/` | Hero, trust strip, shop by category, best sellers, salon services, story, reviews, newsletter |
| `/shop` | All products with category, texture, sale and search filters, and sorting. Filters live in the URL, so `/shop?category=wigs` links straight to wigs |
| `/shop/[slug]` | Product page with length picker (price per length), stock, details and related products |
| `/cart`, `/checkout` | Cart with free-delivery progress, delivery zones or pickup, M-Pesa or card |
| `/services`, `/booking` | Salon menu, and booking with service, stylist, time slots inside opening hours and a 30% deposit |
| `/about`, `/length-guide`, `/policies`, `/contact` | Story and stylists, length and cap size charts, delivery/returns/booking/privacy, contact form and WhatsApp |

A WhatsApp button floats on every page.

## Edit the content

Everything the site shows comes from `src/lib/data.ts`: store details, categories, products (with prices per length and sale prices), salon services, stylists, delivery zones and reviews. Colours and fonts are set at the top of `src/app/globals.css`.

**Placeholders to replace before launch:** phone, WhatsApp number, email, address, social links, all product names, prices and stock, the reviews (use real, verified ones), the About story, the draft policies, and every photo (the coloured blocks mark where photos go; put images in `public/`).

## Not connected yet

- **Payments.** `src/lib/payments.ts` returns "not configured", and orders and bookings finish on WhatsApp with the details filled in. Next step: Paystack M-Pesa STK push and cards through a route handler and webhook.
- **Database and admin.** Products, bookings and orders are not stored. Next step: Supabase tables, live stylist availability, and a staff admin area.
- **Newsletter and contact form.** The newsletter only shows a thank-you. The contact form opens the visitor's email app.
