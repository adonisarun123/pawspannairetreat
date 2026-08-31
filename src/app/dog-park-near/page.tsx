import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CTA, Card, Container, Section } from "@/components/ui";
import { localities } from "@/lib/localities";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { location } from "@/lib/site";

export const metadata = pageMeta({
  title: "Dog park near Bangalore — by neighbourhood",
  description:
    "How to reach Paws Pannai Retreat from Hosur, Sarjapur Road, Whitefield, Electronic City and HSR Layout — distances, routes and what suits each drive. An off-leash dog park and dog pool near Hosur.",
  path: "/dog-park-near",
});

export default function DogParkNearIndex() {
  return (
    <>
      <PageHero
        eyebrow="Getting here"
        title="A dog park near Bangalore, depending where you start"
        lede={`The park is at ${location.addressLine}. Which drive you get depends entirely on which side of the city you leave from — so here they are separately, with the honest version of each.`}
        crumbs={[{ name: "Dog park near Bangalore", path: "/dog-park-near" }]}
        actions={<CTA href="/sessions#plan">Book a session</CTA>}
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {localities.map((l) => (
              <Card key={l.slug} className="flex flex-col">
                <p className="text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">
                  {l.distance}
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold">{l.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">{l.lede}</p>
                <Link
                  href={`/dog-park-near/${l.slug}`}
                  className="mt-6 text-sm font-semibold text-canopy-700 underline underline-offset-4"
                >
                  From {l.name} →
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Dog park near Bangalore", path: "/dog-park-near" },
        ])}
      />
    </>
  );
}
