/**
 * Paws Pannai Retreat — single source of truth for facts, contacts and links.
 *
 * Facts confirmed 31 Aug 2026. Surveyed lat/lng is the one item still open.
 * Nothing else in the codebase should hard-code a phone number, price or URL.
 */

export const site = {
  name: "Paws Pannai Retreat",
  shortName: "Paws Pannai",
  /** Exact Google Business Profile name. Keep these identical. */
  gbpName: "Paws Pannai Retreat - Pets Park & Pool",
  /** Social/OG share card, 1200x630. */
  ogImage: "/og.jpg",
  /**
   * Brand assets. The mark is a negative-space design — the dog's face is
   * the background showing through — so both files only work on a light
   * ground. Never place them on floor-900 or canopy-600.
   */
  logoMark: "/logo-mark.png",
  logoLockup: "/logo.png",
  tagline: "Pet Play & Pool",
  /** Used for canonical URLs, sitemap and JSON-LD. */
  url: "https://www.pawspannairetreat.com",
  locale: "en_IN",
  description:
    "A one-acre working farm near Hosur where your dog runs free — 12 upcycled tyre installations, a bone-shaped pool, mango and tamarind shade, and sessions booked by the hour.",
} as const;

export const contact = {
  /** International format, digits only — used to build wa.me links. */
  whatsapp: "917795207779",
  whatsappDisplay: "+91 77952 07779",
  phone: "+917795207779",
  phoneDisplay: "+91 77952 07779",
  email: "sthairyastays@gmail.com",
  instagram: "https://www.instagram.com/pawspannairetreat/",
} as const;

export const location = {
  village: "Seekanapalli Village",
  nearest: "near Hosur, Tamil Nadu",
  /** Short form, for prose. */
  addressLine: "Seekanapalli village, near Hosur, Tamil Nadu",
  /** Full postal address, for the Getting Here card and the footer. */
  fullAddress:
    "Plot 79, SF3 (Divine Groves), Shoolagiri Road, Seekanapalli Village, Post Berigai, Hosur, Tamil Nadu 635105",
  streetAddress: "Plot 79, SF3 (Divine Groves), Shoolagiri Road, Seekanapalli Village",
  addressLocality: "Post Berigai, Hosur",
  addressRegion: "Tamil Nadu",
  postalCode: "635105",
  /** Taken from the Google Business Profile pin (Plus Code QXGQ+2P). */
  lat: 12.775113,
  lng: 77.9892776,
  /** Google Business Profile CID — the stable id for this listing. */
  googleCid: "10278887574214274125",
  mapsEmbedQuery:
    "Paws Pannai Retreat, Plot 79 SF3 Divine Groves, Shoolagiri Road, Seekanapalli Village, Post Berigai, Hosur, Tamil Nadu 635105",
  mapsLink: "https://maps.google.com/?cid=10278887574214274125",
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
    address:
      "Plot 59, SF3 (Divine Groves), Shoolagiri Road, Seekanapalli Village, Post Berigai, Hosur, Tamil Nadu 635105",
    url: "https://bevusocialfarmstay.com/",
    bookingUrl: "https://bevusocialfarmstay.com/",
  },
  ssek: {
    name: "SSEK",
    location: "Kanha",
    blurb: "The group's forest property in Kanha, Madhya Pradesh.",
    url: "https://www.surwahi.com",
  },
  cafe: {
    name: "Cafe Tamarind",
    blurb: "Sthairya's own in-house kitchen — not a third-party vendor.",
    /** No page of its own yet — referenced in copy, never linked. */
    url: null as string | null,
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

/**
 * Measured distances to the gate. Every locality quoted anywhere on the site
 * must appear here — no estimates. Add a row only once the figure is real.
 */
export const driveTimes = [
  { from: "Hosur", detail: "25.2 km" },
  { from: "Whitefield", detail: "44.9 km" },
  { from: "HSR Layout", detail: "58.3 km" },
] as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
