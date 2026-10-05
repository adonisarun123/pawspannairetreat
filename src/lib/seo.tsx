import type { Metadata } from "next";
import { faqs } from "./content";
import { media } from "./media";
import {
  ADULT_RATE,
  CHILD_RATE,
  PARK_CAPACITY,
  PRIVATE_MIN_DOGS,
  PRIVATE_RATE,
  SHARED_RATE,
} from "./pricing";
import { contact, family, hours, location, site } from "./site";

/* Stable node ids so every page's JSON-LD links into one graph. */
export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  business: `${site.url}#business`,
  service: `${site.url}/sessions#service`,
};

const abs = (path: string) => new URL(path, site.url).toString();

/** Real park photographs (pending slots have no src). */
function photoUrls(): string[] {
  return Object.values(media)
    .filter((m) => m.src)
    .map((m) => abs(m.src as string));
}

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

/**
 * Site-wide graph, rendered once in the public layout: the operating company,
 * the website, and the business itself (LocalBusiness + TouristAttraction).
 */
export function localBusinessSchema() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ids.organization,
        name: family.company,
        url: site.url,
        logo: { "@type": "ImageObject", url: abs(site.logoLockup) },
        brand: [
          { "@type": "Brand", name: site.name },
          { "@type": "Brand", name: family.bsf.name },
          { "@type": "Brand", name: family.ssek.name },
        ],
        subOrganization: [{ "@id": ids.business }],
        sameAs: [contact.instagram],
      },
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: site.url,
        name: site.name,
        alternateName: site.gbpName,
        description: site.description,
        inLanguage: "en-IN",
        publisher: { "@id": ids.organization },
      },
      {
        "@type": ["LocalBusiness", "TouristAttraction"],
        "@id": ids.business,
        name: site.name,
        alternateName: site.gbpName,
        additionalType: "https://www.wikidata.org/wiki/Q1195942",
        description: site.description,
        url: site.url,
        image: [abs(site.ogImage), ...photoUrls()],
        logo: abs(site.logoMark),
        telephone: contact.phone,
        email: contact.email,
        priceRange: `₹${SHARED_RATE}–₹${PRIVATE_RATE} per dog per hour`,
        currenciesAccepted: "INR",
        hasMap: location.mapsLink,
        isAccessibleForFree: false,
        publicAccess: true,
        touristType: ["Dog owners", "Families with pets"],
        maximumAttendeeCapacity: PARK_CAPACITY,
        parentOrganization: { "@id": ids.organization },
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
        areaServed: ["Hosur", "Bengaluru", "Whitefield", "HSR Layout"].map((n) => ({
          "@type": "Place",
          name: n,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: days,
            opens: hours.opens,
            closes: hours.closes,
          },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "bookings",
          telephone: contact.phone,
          email: contact.email,
          availableLanguage: ["English", "Tamil", "Kannada", "Hindi"],
          areaServed: "IN",
        },
        amenityFeature: [
          "Off-leash dog park",
          "Dog swimming pool (included)",
          "Tyre play trail",
          "Puppy play area",
          "Cafe",
          "Parking",
        ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
        makesOffer: { "@id": ids.service },
        sameAs: [contact.instagram, location.mapsLink],
      },
    ],
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
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.published,
    mainEntityOfPage: url,
    image: [new URL(post.image ?? site.ogImage, site.url).toString()],
    inLanguage: "en-IN",
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": ids.organization },
    about: { "@id": ids.business },
    isPartOf: { "@id": `${site.url}/journal#blog` },
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

const perDogHour = (price: number, name: string, extra: object = {}) => ({
  "@type": "Offer",
  name,
  price,
  priceCurrency: "INR",
  availability: "https://schema.org/InStock",
  url: `${site.url}/sessions`,
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price,
    priceCurrency: "INR",
    unitText: "per dog per hour",
  },
  ...extra,
});

const perPersonHour = (price: number, name: string) => ({
  "@type": "Offer",
  name,
  price,
  priceCurrency: "INR",
  url: `${site.url}/sessions#people`,
  priceSpecification: {
    "@type": "UnitPriceSpecification",
    price,
    priceCurrency: "INR",
    unitText: "per person per hour",
  },
});

/** Hourly dog-park sessions as a Service with its published (introductory) rate card. */
export function offerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ids.service,
    name: "Dog park session",
    serviceType: "Off-leash dog park and dog swimming pool",
    description:
      "Hourly, per-dog sessions on a one-acre working farm near Hosur — shared or private, bone-shaped pool included. Introductory pricing.",
    provider: { "@id": ids.business },
    areaServed: { "@type": "Place", name: "Hosur and Bengaluru" },
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      opens: hours.opens,
      closes: hours.closes,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Introductory pricing",
      itemListElement: [
        perDogHour(SHARED_RATE, `Shared park — up to ${PARK_CAPACITY} dogs in the park`),
        perDogHour(PRIVATE_RATE, `Private park — minimum ${PRIVATE_MIN_DOGS} dogs`, {
          eligibleQuantity: { "@type": "QuantitativeValue", minValue: PRIVATE_MIN_DOGS, unitText: "dogs" },
        }),
        perPersonHour(0, "Guests — one person per dog, and children under 5"),
        perPersonHour(CHILD_RATE, "Guests aged 5–12 (beyond the free place)"),
        perPersonHour(ADULT_RATE, "Guests aged 12+ (beyond the free place)"),
      ],
    },
  };
}

/** Bookable extras that are priced on request (no price published yet). */
export function extraServicesSchema() {
  const svc = (name: string, path: string, description: string) => ({
    "@type": "Service",
    "@id": `${abs(path.split("#")[0])}#${path.includes("#") ? path.split("#")[1] : "service"}`,
    name,
    description,
    provider: { "@id": ids.business },
    url: abs(path),
  });
  return {
    "@context": "https://schema.org",
    "@graph": [
      svc(
        "Dog birthday parties and private events",
        "/parties-and-training/birthday-parties",
        "Half-day private use of the park, pool and cafe for a dog's birthday or private event. Priced on request.",
      ),
      svc(
        "Dog training, behaviour and grooming",
        "/parties-and-training#training",
        "Add-on training, behaviour and grooming sessions, by appointment on weekends. Priced on request.",
      ),
    ],
  };
}

/** The sister farmstay and the park bundle that comes with a stay. */
export function bsfSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${family.bsf.url}#lodging`,
    name: family.bsf.name,
    url: family.bsf.url,
    address: { "@type": "PostalAddress", streetAddress: family.bsf.address, addressCountry: "IN" },
    parentOrganization: { "@id": ids.organization },
    petsAllowed: true,
    makesOffer: {
      "@type": "Offer",
      name: `2 hours at ${site.name}, complimentary with a stay`,
      price: 0,
      priceCurrency: "INR",
      url: `${site.url}/stay-at-bsf`,
      itemOffered: { "@id": ids.service },
    },
  };
}

/** Journal index as a Blog listing every post. */
export function blogSchema(list: { slug: string; title: string; description: string; published: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/journal#blog`,
    name: `${site.name} Journal`,
    url: abs("/journal"),
    inLanguage: "en-IN",
    publisher: { "@id": ids.organization },
    blogPost: list.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${abs(`/journal/${p.slug}`)}#article`,
      headline: p.title,
      description: p.description,
      datePublished: p.published,
      url: abs(`/journal/${p.slug}`),
    })),
  };
}

/** Gallery page: the real photographs as an ImageGallery. */
export function imageGallerySchema(shots: { src: string | null; alt: string; caption?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${abs("/gallery")}#gallery`,
    name: `${site.name} — photographs`,
    url: abs("/gallery"),
    about: { "@id": ids.business },
    image: shots
      .filter((s) => s.src)
      .map((s) => ({
        "@type": "ImageObject",
        contentUrl: abs(s.src as string),
        description: s.alt,
        caption: s.caption ?? s.alt,
        creditText: site.name,
        copyrightHolder: { "@id": ids.organization },
      })),
  };
}

export type PageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage"
  | "FAQPage"
  | "ItemPage";

/**
 * The page node plus its breadcrumb trail. The last crumb is the current
 * page. Every public page renders this, so each one is linked to the WebSite
 * and the business in the same graph.
 */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
  opts: { type?: PageType; description?: string } = {},
) {
  const current = trail[trail.length - 1];
  const url = abs(current.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": opts.type ?? "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: current.path === "/" ? site.name : `${current.name} · ${site.name}`,
        ...(opts.description ? { description: opts.description } : {}),
        inLanguage: "en-IN",
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.business },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: trail.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.name,
          item: abs(t.path),
        })),
      },
    ],
  };
}

/** Renders a JSON-LD block. Server components only. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
