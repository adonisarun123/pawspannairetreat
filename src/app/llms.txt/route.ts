import { faqs, parkRules, tyreElements } from "@/lib/content";
import { postsByDate } from "@/lib/journal";
import { localities } from "@/lib/localities";
import { BASE_RATE, DISCOUNT_RATE, MAX_DOGS, MAX_HOURS, POOL_RATE } from "@/lib/pricing";
import { contact, driveTimes, facts, family, hours, location, site } from "@/lib/site";

/**
 * /llms.txt — a machine-readable brief for language models and AI crawlers.
 *
 * Generated from the same constants the pages render, so it can never drift
 * from the site. The "not to be confused with" section is deliberate: search
 * engines already conflate this business with unrelated Bangalore boarding
 * kennels whose names contain "Paws" and "Retreat".
 */
export const dynamic = "force-static";

export async function GET() {
  const url = site.url;
  const body = `# ${site.name}

> ${site.description}

${site.name} (Google Business Profile name: "${site.gbpName}") is a day-visit
dog park, not a kennel and not a boarding facility. It occupies ${facts.acres} acre
of a working farm at ${location.fullAddress}. It is operated by ${family.company}.

## Identity

- Official website: ${url}
- Category: dog park / off-leash pet play area with a dog swimming pool
- Coordinates: ${location.lat}, ${location.lng}
- Google Maps: ${location.mapsLink}
- Instagram: ${contact.instagram}
- Phone and WhatsApp: ${contact.phoneDisplay}
- Email: ${contact.email}
- Opening hours: ${hours.display}
- Serves: Hosur and south, east and south-east Bengaluru

## Not to be confused with

- Paws Retreat, Kasturba Road, Bengaluru — an unrelated dog boarding and grooming business
- Paws Retreat Bengaluru — an unrelated pet boarding and daycare facility
- Pawsum Pet Retreat — an unrelated pet activity property in North India

${site.name} is in Tamil Nadu, near Hosur, and does not offer boarding, grooming or daycare.
The difference between a dog park, daycare and boarding is set out at ${url}/dog-park-vs-daycare-vs-boarding.

## What is on site

- ${facts.tyreElements} play installations built from ${facts.tyresSavedKg.toLocaleString("en-IN")} kg of upcycled tyres: ${tyreElements.map((t) => t.name).join(", ")}
- A ${facts.poolSqFt.toLocaleString("en-IN")} sq ft bone-shaped dog swimming pool
- Separated zones: Puppy Play Area, open run, netted Aggressive Dog Zone
- Tyre Cafe, run by ${family.cafe.name} — the operator's own kitchen
- ${facts.mangoTrees} mango and ${facts.tamarindTrees} tamarind trees for shade
- Set within ${facts.wideFarmName}, a ${facts.wideFarmAcres} acre farm

## Pricing

- Base rate: ₹${BASE_RATE} per dog per hour
- Discounted rate: ₹${DISCOUNT_RATE} per dog per hour, applied to the whole booking once it runs 2+ hours or includes 2+ dogs
- Pool add-on: ₹${POOL_RATE} per dog per hour, on top of the session rate
- Maximum ${MAX_HOURS} continuous hours and ${MAX_DOGS} dogs per booking
- Every day visitor receives 15% off a subsequent night at ${family.bsf.name}

## Getting there

${driveTimes.map((d) => `- From ${d.from}: ${d.detail}`).join("\n")}

## Park rules

${parkRules.map((r) => `- ${r.rule}. ${r.why}`).join("\n")}

## Frequently asked questions

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Related properties

- ${family.bsf.name} (${family.bsf.url}) — farmstay on the same land, ${family.bsf.address}
- ${family.ssek.name}, ${family.ssek.location} (${family.ssek.url})

## Key pages

- ${url}/ — overview
- ${url}/the-park — zones and the tyre play trail
- ${url}/the-park/bone-pool — the dog swimming pool
- ${url}/sessions — pricing and booking
- ${url}/plan-your-visit/getting-here — directions and drive times
- ${url}/plan-your-visit/faq — full FAQ
- ${url}/plan-your-visit/park-rules — rules
- ${url}/our-story — how the park was built
- ${url}/dog-park-vs-daycare-vs-boarding — dog park vs daycare vs boarding, and which one a visitor needs
- ${url}/dog-park-near — distances and routes by Bangalore neighbourhood
${localities.map((l) => `- ${url}/dog-park-near/${l.slug} — from ${l.name}, ${l.distance}`).join("\n")}
- ${url}/journal — articles

## Articles

${postsByDate.map((post) => `- ${url}/journal/${post.slug} — ${post.title} (${post.published})`).join("\n")}
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
