// Store content. Until the database is connected, everything the site shows comes from here.
// Placeholder text and prices are marked in README.md; swap in the real catalogue before launch.

export const store = {
  name: "Lavish Hairline",
  tagline: "Beautiful hair. Confident you.",
  heroTitle: "Your Hair. Your Signature.",
  phone: "+254 700 000 000",
  whatsapp: "254700000000", // digits only, for wa.me links
  email: "hello@lavish-hairline.com",
  address: "Shop 12, Example Plaza, Nairobi",
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/",
  hours: [
    { days: "Mon to Fri", label: "8:00 am to 7:00 pm", open: 8, close: 19 },
    { days: "Saturday", label: "8:00 am to 8:00 pm", open: 8, close: 20 },
    { days: "Sunday", label: "10:00 am to 5:00 pm", open: 10, close: 17 },
  ],
  currency: "KSh",
  freeDeliveryOver: 5000,
  depositPercent: 30,
  cancelCutoffHours: 12,
};

import type { PhotoKey } from "./photos";

// ---------- Shop ----------

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  tone: string;
  photo: PhotoKey;
};

export const categories: Category[] = [
  { slug: "wigs", name: "Wigs", blurb: "Natural-looking units, ready to wear or custom built.", tone: "#3b2a24", photo: "looseWave" },
  { slug: "extensions", name: "Hair Extensions", blurb: "Bundles, closures and frontals for length and volume.", tone: "#6b4b3a", photo: "curlyFrontBack" },
  { slug: "hair-care", name: "Hair Care", blurb: "Wash, condition and protect between appointments.", tone: "#a57c5b", photo: "giftBags" },
  { slug: "styling", name: "Styling Essentials", blurb: "Tools and finishers for a flawless install.", tone: "#c7a27c", photo: "sleekBob" },
];

export type Product = {
  slug: string;
  name: string;
  category: Category["slug"];
  texture?: "Straight" | "Body wave" | "Deep wave" | "Kinky curly";
  lengths?: { inches: number; price: number }[]; // price per length; omit for single-price items
  price: number; // lowest price, or the only price
  compareAt?: number; // original price when on sale
  rating?: number;
  reviews?: number;
  stock: number;
  bestSeller?: boolean;
  readyToShip?: boolean;
  tone: string;
  photos?: PhotoKey[]; // first one is the main image
  description: string;
  details: string[];
};

const lengths = (base: number, step: number, from = 12, to = 26) =>
  Array.from({ length: (to - from) / 2 + 1 }, (_, i) => ({ inches: from + i * 2, price: base + i * step }));

export const products: Product[] = [
  {
    slug: "amani-bone-straight-wig", name: "Amani bone straight wig", photos: ["longStraight", "longStraightFront", "straightProfile", "groupStraight"], category: "wigs", texture: "Straight",
    lengths: lengths(24500, 2500, 14, 26), price: 24500, rating: 4.9, reviews: 38, stock: 6, bestSeller: true, readyToShip: true,
    tone: "#2e211c", description: "Silky bone straight 13x4 HD lace frontal wig with a pre-plucked hairline.",
    details: ["100% human hair, 180% density", "13x4 HD lace, pre-plucked with baby hair", "Adjustable straps and combs", "Can be dyed and heat styled"],
  },
  {
    slug: "zuri-body-wave-wig", name: "Zuri honey body wave wig", photos: ["honeyWave", "honeyWaveSmile", "groupBodyWave"], category: "wigs", texture: "Body wave",
    lengths: lengths(22000, 2000, 16, 26), price: 22000, compareAt: 25000, rating: 4.8, reviews: 52, stock: 9, bestSeller: true, readyToShip: true,
    tone: "#4a332a", description: "Soft, bouncy body wave in a warm honey blend with darker roots, on a glueless 5x5 closure.",
    details: ["100% human hair, 180% density", "5x5 HD lace closure, glueless", "Wear straight out of the box", "Holds curls well"],
  },
  {
    slug: "nia-kinky-curly-wig", name: "Nia deep curly wig", category: "wigs", texture: "Deep wave", photos: ["deepCurly", "curlyFloral", "curlyLong", "curlyDuo", "curlyDuoLaugh"],
    lengths: lengths(26000, 2500, 14, 22), price: 26000, rating: 5, reviews: 21, stock: 3, bestSeller: true,
    tone: "#3d2b22", description: "Full, bouncy curls with lots of volume and a natural-looking hairline.",
    details: ["100% human hair, 200% density", "13x4 lace frontal", "Blends with natural 4a to 4c hair", "Refresh with water and leave-in"],
  },
  {
    slug: "malkia-bob-wig", name: "Malkia burgundy bob", photos: ["burgundyBob", "burgundyBobSmile", "burgundyBlazer", "groupBobsSmile"], category: "wigs", texture: "Straight",
    lengths: [{ inches: 10, price: 15500 }, { inches: 12, price: 17000 }], price: 15500, compareAt: 18000, rating: 4.7, reviews: 44, stock: 12, readyToShip: true,
    tone: "#251a16", description: "A sleek, shoulder-length bob in rich burgundy with a 4x4 closure. Our quickest install.",
    details: ["100% human hair", "4x4 lace closure", "Blunt cut, ready to wear", "Lightweight cap for all-day comfort"],
  },
  {
    slug: "shaba-copper-bob", name: "Shaba copper bob", category: "wigs", texture: "Straight", photos: ["copperBobFront", "copperBob", "copperBobBack", "groupBobsSmile"],
    lengths: [{ inches: 12, price: 17500 }, { inches: 14, price: 19000 }], price: 17500, rating: 4.9, reviews: 27, stock: 7, bestSeller: true, readyToShip: true,
    tone: "#7a3f22", description: "Glossy copper with soft dark roots, cut into a sleek collarbone bob.",
    details: ["100% human hair, 180% density", "13x4 HD lace frontal", "Pre-coloured copper with shadow root", "Ready to wear"],
  },
  {
    slug: "imani-sleek-bob", name: "Imani sleek black bob", category: "wigs", texture: "Straight", photos: ["sleekBob", "blackBobSide", "blackBobBack", "groupBobsGlance"],
    lengths: [{ inches: 12, price: 14500 }, { inches: 14, price: 16000 }], price: 14500, rating: 4.8, reviews: 35, stock: 10, readyToShip: true,
    tone: "#1f1714", description: "Natural black, silky straight and polished. An everyday classic.",
    details: ["100% human hair", "5x5 HD lace closure", "Glueless with adjustable band", "Can be curled or flat ironed"],
  },
  {
    slug: "neema-loose-wave-wig", name: "Neema loose wave wig", category: "wigs", texture: "Body wave", photos: ["looseWave", "waveSmile", "looseWaveGrey", "waveProfile", "waveBack"],
    lengths: lengths(23000, 2000, 16, 26), price: 23000, rating: 4.9, reviews: 31, stock: 8, bestSeller: true,
    tone: "#1b1310", description: "Big, soft, voluminous waves in natural black with a middle part.",
    details: ["100% human hair, 200% density", "13x4 HD lace frontal", "Holds its wave after washing", "Pre-plucked hairline"],
  },
  {
    slug: "zawadi-fringe-wig", name: "Zawadi fringe wig", category: "wigs", texture: "Straight", photos: ["fringeBob", "auburnFringe", "groupFringe"],
    lengths: lengths(16000, 1500, 12, 20), price: 16000, rating: 4.7, reviews: 19, stock: 11, readyToShip: true,
    tone: "#5a2e1d", description: "Straight hair with a full, face-framing fringe in natural brown or auburn. No lace to melt.",
    details: ["100% human hair", "Glueless, beginner friendly", "Available in natural black, chestnut and auburn", "Wear in minutes"],
  },
  {
    slug: "amara-burgundy-straight-wig", name: "Amara dark burgundy straight wig", category: "wigs", texture: "Straight", photos: ["burgundyLong"],
    lengths: lengths(25500, 2500, 18, 26), price: 25500, rating: 4.8, reviews: 16, stock: 5, readyToShip: true,
    tone: "#3a1418", description: "Long, silky straight hair in a deep wine shade that catches the light.",
    details: ["100% human hair, 180% density", "13x4 HD lace frontal", "Deep burgundy colour, done in-house", "Side or middle part"],
  },
  {
    slug: "asali-honey-bob", name: "Asali honey blonde bob", category: "wigs", texture: "Straight", photos: ["honeyBob", "honeyBobFront", "groupBobsSmile"],
    lengths: [{ inches: 10, price: 16500 }, { inches: 12, price: 18000 }], price: 16500, compareAt: 19000, rating: 4.9, reviews: 23, stock: 6, readyToShip: true,
    tone: "#b07a3c", description: "A bright honey blonde blunt bob with a soft side part. Instant glow.",
    details: ["100% human hair", "5x5 HD lace closure", "Pre-coloured honey blonde", "Glueless, ready to wear"],
  },
  {
    slug: "shani-black-body-wave-wig", name: "Shani black body wave wig", category: "wigs", texture: "Body wave", photos: ["blackBodyWave", "bodyWaveDuo", "groupWaves"],
    lengths: lengths(21000, 2000, 18, 28), price: 21000, rating: 4.8, reviews: 29, stock: 9, readyToShip: true,
    tone: "#1a1210", description: "Glossy natural black with deep, defined body waves and a side part.",
    details: ["100% human hair, 180% density", "13x4 HD lace frontal", "Pre-plucked with baby hair", "Holds curls for days"],
  },
  {
    slug: "malaika-chestnut-straight-wig", name: "Malaika chestnut straight wig", category: "wigs", texture: "Straight", photos: ["brownStraight", "whiteBlazer", "laceDressStraight", "highlightStraight"],
    lengths: lengths(22500, 2000, 16, 24), price: 22500, rating: 4.9, reviews: 14, stock: 6,
    tone: "#4a2c1e", description: "Soft chestnut brown, silky straight and polished. Office to evening.",
    details: ["100% human hair, 180% density", "5x5 HD lace closure", "Natural chestnut colour", "Middle part"],
  },
  {
    slug: "dhahabu-blonde-body-wave-wig", name: "Dhahabu blonde body wave wig", category: "wigs", texture: "Body wave", photos: ["blondeBodyWave"],
    lengths: lengths(27500, 2500, 18, 26), price: 27500, rating: 5, reviews: 12, stock: 4, bestSeller: true,
    tone: "#b89a6a", description: "Soft ash blonde balayage over a darker root, in big glamorous waves.",
    details: ["100% human hair, 200% density", "13x4 HD lace frontal", "Hand-coloured blonde balayage", "Side part, pre-plucked"],
  },
  {
    slug: "raw-straight-bundles", name: "Raw straight bundles", category: "extensions", texture: "Straight", photos: ["groupStraightSerious", "longStraight"],
    lengths: lengths(7500, 1000, 12, 26), price: 7500, rating: 4.8, reviews: 63, stock: 30, bestSeller: true,
    tone: "#5a3f31", description: "Single-donor raw hair that lasts for years with the right care.",
    details: ["Raw, unprocessed hair", "Price is per bundle; most installs use 3", "Minimal shedding, double weft", "Can be lifted to blonde"],
  },
  {
    slug: "deep-wave-bundles", name: "Deep wave bundles", category: "extensions", texture: "Deep wave", photos: ["curlyFrontBack", "curlyLong"],
    lengths: lengths(6500, 900, 12, 26), price: 6500, rating: 4.6, reviews: 29, stock: 24,
    tone: "#6e4c3b", description: "Defined, glossy waves that keep their pattern wash after wash.",
    details: ["100% virgin human hair", "Price is per bundle", "Double machine weft", "Pairs with our deep wave closure"],
  },
  {
    slug: "hd-lace-closure", name: "HD lace closure 5x5", category: "extensions", texture: "Straight", photos: ["longStraightFront", "straightProfile"],
    lengths: lengths(8500, 800, 12, 20), price: 8500, rating: 4.7, reviews: 18, stock: 14,
    tone: "#7a5644", description: "Invisible HD lace that melts into every skin tone.",
    details: ["5x5 HD Swiss lace", "Pre-plucked hairline", "Bleached knots", "Matches our straight bundles"],
  },
  {
    slug: "hydrating-wig-shampoo", name: "Hydrating wig shampoo", category: "hair-care",
    price: 1800, compareAt: 2200, rating: 4.9, reviews: 41, stock: 40, bestSeller: true,
    tone: "#b08d57", description: "Sulphate-free cleanse that keeps human hair units soft.",
    details: ["300 ml", "Sulphate and paraben free", "Safe for coloured hair", "Use every 7 to 10 wears"],
  },
  {
    slug: "silk-repair-conditioner", name: "Silk repair conditioner", category: "hair-care",
    price: 1900, rating: 4.7, reviews: 26, stock: 35,
    tone: "#c29b6a", description: "Restores softness and shine to wigs and bundles.",
    details: ["300 ml", "Detangles in one pass", "Light scent", "Also suits natural hair"],
  },
  {
    slug: "scalp-growth-oil", name: "Scalp and edges growth oil", category: "hair-care",
    price: 1200, rating: 4.6, reviews: 57, stock: 4,
    tone: "#a3794b", description: "Rosemary and castor oil blend for your natural hair under the unit.",
    details: ["100 ml with dropper", "Rosemary, castor and peppermint", "Use 3 times a week", "Non-greasy"],
  },
  {
    slug: "lace-melt-spray", name: "Lace melt spray", category: "styling",
    price: 1500, rating: 4.8, reviews: 33, stock: 22, bestSeller: true,
    tone: "#d4b48c", description: "Sets and flattens lace for a seamless, natural hairline.",
    details: ["120 ml", "Hold without residue", "Water resistant", "Use with an elastic band"],
  },
  {
    slug: "edge-control", name: "Extra hold edge control", category: "styling",
    price: 800, rating: 4.5, reviews: 48, stock: 50,
    tone: "#b89a74", description: "Sleek baby hairs that stay put all day without flaking.",
    details: ["100 g", "No white cast", "Light vanilla scent", "Pairs with our edge brush"],
  },
  {
    slug: "satin-bonnet", name: "Double-layer satin bonnet", category: "styling",
    price: 900, rating: 4.9, reviews: 72, stock: 0,
    tone: "#8c6b4a", description: "Protects your unit and natural hair overnight.",
    details: ["Reversible satin", "Wide, soft band", "Fits wigs up to 26 inches", "Machine washable"],
  },
  {
    slug: "wig-styling-kit", name: "Wig styling kit", category: "styling",
    price: 3500, compareAt: 4200, rating: 4.7, reviews: 15, stock: 10,
    tone: "#9c7a55", description: "Everything you need for a clean install at home.",
    details: ["Wig head and T-pins", "Edge brush and wide-tooth comb", "Elastic melt band", "Wig cap pack (2)"],
  },
];

// ---------- Salon services ----------

export type ServiceGroup = "Wig services" | "Installs" | "Braids and natural hair";

export type Service = {
  id: string;
  group: ServiceGroup;
  name: string;
  minutes: number;
  price: number;
  description: string;
};

export const services: Service[] = [
  { id: "consultation", group: "Wig services", name: "Hair consultation", minutes: 30, price: 500, description: "Find your perfect unit, length and texture. Fee is deducted from any wig or install you book." },
  { id: "wig-refresh", group: "Wig services", name: "Wig refresh", minutes: 120, price: 3500, description: "Deep wash, condition, re-pluck and restyle to bring a tired unit back to life." },
  { id: "custom-unit", group: "Wig services", name: "Custom wig build", minutes: 240, price: 6000, description: "We construct a unit to your head measurements from bundles and a closure or frontal." },
  { id: "wig-colour", group: "Wig services", name: "Wig colouring", minutes: 180, price: 4500, description: "Highlights, balayage, ginger or blonde, done on the unit before you wear it." },
  { id: "frontal-install", group: "Installs", name: "Frontal wig install", minutes: 120, price: 3500, description: "Glued or glueless frontal install with a melted, natural-looking hairline." },
  { id: "closure-install", group: "Installs", name: "Closure wig install", minutes: 90, price: 2500, description: "Quick, secure closure install and style." },
  { id: "sew-in", group: "Installs", name: "Sew-in weave", minutes: 150, price: 3000, description: "Bundles sewn onto cornrows with a closure or leave-out." },
  { id: "knotless-braids", group: "Braids and natural hair", name: "Knotless braids", minutes: 300, price: 4500, description: "Lightweight, tension-free braids. Braiding hair included." },
  { id: "silk-press", group: "Braids and natural hair", name: "Silk press", minutes: 120, price: 2500, description: "Wash, deep condition and a glossy silk press with heat protection." },
  { id: "cornrows", group: "Braids and natural hair", name: "Cornrows", minutes: 90, price: 1500, description: "Classic or patterned cornrows, also used as a wig base." },
];

export type Stylist = { id: string; name: string; does: ServiceGroup[] };

export const stylists: Stylist[] = [
  { id: "any", name: "Any available stylist", does: ["Wig services", "Installs", "Braids and natural hair"] },
  { id: "amina", name: "Amina", does: ["Wig services", "Installs"] },
  { id: "wanjiru", name: "Wanjiru", does: ["Installs", "Braids and natural hair"] },
  { id: "achieng", name: "Achieng", does: ["Braids and natural hair"] },
];

// ---------- Delivery ----------

export const deliveryZones = [
  { id: "pickup", label: "Pick up at the salon", note: "Ready in 24 hours", fee: 0 },
  { id: "cbd", label: "Nairobi CBD", note: "Same day if ordered by 2 pm", fee: 250 },
  { id: "nairobi", label: "Other Nairobi areas", note: "Next day", fee: 400 },
  { id: "countrywide", label: "Rest of Kenya by courier", note: "1 to 3 days", fee: 600 },
];

// Placeholder reviews. Replace with real, verified customer reviews before launch.
export const reviews = [
  { name: "Mercy K.", where: "Kilimani", text: "The Zuri wig is so soft and the lace disappeared on my skin. Delivered the next morning.", product: "Zuri body wave wig" },
  { name: "Faith O.", where: "Westlands", text: "They refreshed a wig I'd given up on and it looks brand new. Worth every shilling.", product: "Wig refresh" },
  { name: "Brenda W.", where: "Mombasa", text: "Courier was fast and the bundles have barely shed after three months.", product: "Raw straight bundles" },
];

export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
export const findService = (id: string) => services.find((s) => s.id === id);
export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const priceFor = (p: Product, inches?: number) =>
  p.lengths?.find((l) => l.inches === inches)?.price ?? p.price;
