import type { Metadata } from "next";
import { faqs } from "./content";
import { contact, family, hours, location, site } from "./site";

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
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${site.name}`,
      description,
      images: [site.ogImage],
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
    alternateName: site.gbpName,
    additionalType: "https://www.wikidata.org/wiki/Q1195942",
    image: [new URL(site.ogImage, site.url).toString()],
    logo: new URL(site.logoMark, site.url).toString(),
    priceRange: "₹₹",
    hasMap: location.mapsLink,
    isAccessibleForFree: false,
    publicAccess: true,
    areaServed: [
      "Hosur",
      "Bengaluru",
      "Electronic City",
      "Sarjapur Road",
      "Whitefield",
      "HSR Layout",
    ].map((n) => ({ "@type": "Place", name: n })),
    parentOrganization: {
      "@type": "Organization",
      name: family.company,
    },
    description: site.description,
    url: site.url,
    telephone: contact.phone,
    email: contact.email,
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: "IN",
    },
    ...(location.lat !== null && location.lng !== null
      ? { geo: { "@type": "GeoCoordinates", latitude: location.lat, longitude: location.lng } }
      : {}),
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
    sameAs: [contact.instagram, location.mapsLink],
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

/** Article schema for Journal posts. */
export function articleSchema(post: {
  slug: string;
  title: string;
  description: string;
  published: string;
  image?: string;
}) {
  const url = new URL(`/journal/${post.slug}`, site.url).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.published,
    mainEntityOfPage: url,
    image: [new URL(post.image ?? site.ogImage, site.url).toString()],
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: new URL(site.logoMark, site.url).toString() },
    },
    isPartOf: { "@id": `${site.url}#business` },
  };
}

/** FAQPage built from an arbitrary list — used by the locality pages. */
export function faqSchemaFrom(list: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map((f) => ({
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
      "An hourly, per-dog session on a one-acre working farm near Hosur, bone-shaped pool included. Introductory pricing.",
    brand: { "@type": "Brand", name: site.name },
    offers: [
      {
        "@type": "Offer",
        name: "Shared park — per dog per hour",
        price: 500,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${site.url}/sessions`,
      },
      {
        "@type": "Offer",
        name: "Private park — per dog per hour (minimum 4 dogs)",
        price: 1000,
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: `${site.url}/sessions`,
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
