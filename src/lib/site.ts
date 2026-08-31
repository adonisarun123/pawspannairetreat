/**
 * Paws Pannai Retreat — single source of truth for facts, contacts and links.
 *
 * Anything marked TODO is a placeholder that must be replaced before launch.
 * Nothing else in the codebase should hard-code a phone number, price or URL.
 */

export const site = {
  name: "Paws Pannai Retreat",
  shortName: "Paws Pannai",
  tagline: "Pet Play & Pool",
  /** Used for canonical URLs, sitemap and JSON-LD. */
  url: "https://pawspannai.com", // TODO: confirm live domain
  locale: "en_IN",
  description:
    "A one-acre working farm near Hosur where your dog runs free — 12 upcycled tyre installations, a bone-shaped pool, mango and tamarind shade, and sessions booked by the hour.",
} as const;

export const contact = {
  /** International format, digits only — used to build wa.me links. */
  whatsapp: "919999999999", // TODO: real WhatsApp business number
  whatsappDisplay: "+91 99999 99999", // TODO
  phone: "+919999999999", // TODO
  phoneDisplay: "+91 99999 99999", // TODO
  email: "hello@pawspannai.com", // TODO
  instagram: "https://instagram.com/pawspannai", // TODO: confirm handle
} as const;

export const location = {
  village: "Seekanapalli village",
  nearest: "near Hosur, Tamil Nadu",
  addressLine: "Seekanapalli village, near Hosur, Tamil Nadu", // TODO: full postal address + PIN
  /** Approximate — replace with surveyed coordinates before launch. */
  lat: 12.7409, // TODO
  lng: 77.8253, // TODO
  mapsEmbedQuery: "Paws Pannai Retreat Seekanapalli Hosur", // TODO: replace with a Place ID embed
  mapsLink: "https://maps.google.com/?q=Paws+Pannai+Retreat+Seekanapalli+Hosur", // TODO
} as const;

export const hours = {
  opens: "08:00",
  closes: "19:30",
  opensDisplay: "8:00 AM",
  closesDisplay: "7:30 PM",
  display: "8:00 AM – 7:30 PM, every day",
  short: "8 AM – 7:30 PM daily",
} as const;

/** Sister properties under Sthairya Stays & Experiences LLP. */
export const family = {
  company: "Sthairya Stays & Experiences LLP",
  bsf: {
    name: "Bevu Social Farmstay",
    abbr: "BSF",
    blurb: "The farmstay next door — same land, separate entrance, one address.",
    url: "https://bevusocialfarmstay.com", // TODO: real URL — flagged in IA §09
    bookingUrl: "https://bevusocialfarmstay.com/book", // TODO: real booking URL
  },
  ssek: {
    name: "SSEK",
    location: "Kanha",
    blurb: "The group's forest property in Kanha, Madhya Pradesh.",
    url: "https://ssek.in", // TODO: real URL — flagged in IA §09
  },
  cafe: {
    name: "Cafe Tamarind",
    blurb: "Sthairya's own in-house kitchen — not a third-party vendor.",
    url: "#", // TODO: Cafe Tamarind page or external site
  },
} as const;

/** Facts the copy leans on repeatedly. Change here, changes everywhere. */
export const facts = {
  acres: 1,
  tyreElements: 12,
  tyresSavedKg: 2950,
  poolSqFt: 1050,
  mangoTrees: "10+",
  tamarindTrees: "8+",
  wideFarmAcres: "100+",
  wideFarmName: "Divine Groves",
} as const;

/** Drive times quoted on Home and Getting Here. Source: IA §01 / SF3 figures. */
export const driveTimes = [
  { from: "Electronic City", detail: "50 km" },
  { from: "Sarjapur Road", detail: "30 km via Hosur Rd" },
  { from: "HSR Layout", detail: "TODO km" },
  { from: "Whitefield", detail: "TODO km" },
  { from: "Hosur", detail: "TODO km" },
] as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
