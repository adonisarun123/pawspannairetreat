import type { Metadata } from "next";
import { faqs } from "./content";
import { contact, hours, location, site } from "./site";

export function pageMeta({
  title,
  description,
  path,
  noIndex,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description,
      locale: site.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
    },
  };
}

/* --------------------------------------------------------------- JSON-LD */

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction"],
    "@id": `${site.url}#business`,
    name: site.name,
    alternateName: "Paws Pannai Pet Park & Pool",
    description: site.description,
    url: site.url,
    telephone: contact.phone,
    email: contact.email,
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.village,
      addressLocality: "Hosur",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.lat,
      longitude: location.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: hours.opens,
        closes: hours.closes,
      },
    ],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Dog swimming pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Off-leash play area", value: true },
      { "@type": "LocationFeatureSpecification", name: "Cafe", value: true },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
    ],
    sameAs: [contact.instagram],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function offerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dog park session at Paws Pannai Retreat",
    description:
      "An hourly, per-dog session on a one-acre working farm near Hosur, with an optional bone-shaped pool add-on.",
    brand: { "@type": "Brand", name: site.name },
    offers: [
      {
        "@type": "Offer",
        name: "Exclusive session — first hour",
        price: 1000,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${site.url}/sessions`,
      },
      {
        "@type": "Offer",
        name: "Discounted rate — 2+ hours or 2+ dogs",
        price: 750,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${site.url}/sessions`,
      },
      {
        "@type": "Offer",
        name: "Pool add-on",
        price: 250,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${site.url}/sessions#pool`,
      },
    ],
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: new URL(t.path, site.url).toString(),
    })),
  };
}

/** Renders a JSON-LD block. Server components only. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
