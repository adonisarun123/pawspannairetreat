import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { CTA, Card, Container, Eyebrow, Lede, Section, Stat, Title } from "@/components/ui";
import { localities, localityBySlug } from "@/lib/localities";
import { PRIVATE_MIN_DOGS, PRIVATE_RATE, SHARED_RATE, rupees } from "@/lib/pricing";
import { JsonLd, breadcrumbSchema, faqSchemaFrom, pageMeta } from "@/lib/seo";
import { facts, hours } from "@/lib/site";

export function generateStaticParams() {
  return localities.map((l) => ({ locality: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locality: string }>;
}) {
  const { locality } = await params;
  const l = localityBySlug(locality);
  if (!l) return {};
  return pageMeta({
    title: l.title,
    description: l.description,
    path: `/dog-park-near/${l.slug}`,
  });
}

export default async function LocalityPage({
  params,
}: {
  params: Promise<{ locality: string }>;
}) {
  const { locality } = await params;
  const l = localityBySlug(locality);
  if (!l) notFound();

  return (
    <>
      <PageHero
        eyebrow={`From ${l.name} · ${l.distance}`}
        title={l.title}
        lede={l.lede}
        crumbs={[
          { name: "Dog park near Bangalore", path: "/dog-park-near" },
          { name: l.name, path: `/dog-park-near/${l.slug}` },
        ]}
        actions={
          <>
            <CTA href="/sessions#plan">Book a session</CTA>
            <CTA href="/plan-your-visit/getting-here" tone="outline">
              Directions
            </CTA>
          </>
        }
      />

      <Section tone="canopy" size="tight">
        <Container width="wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Stat value={l.distance} label={`from ${l.name} to the gate`} />
            <Stat value={`${facts.acres} acre`} label="of fenced, off-leash working farmland" />
            <Stat
              value={`${facts.poolSqFt.toLocaleString("en-IN")} sq ft`}
              label="of dog pool, shaped like a bone"
            />
            <Stat value={hours.short} label="every day, last session ends at close" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">The drive</Eyebrow>
              <Title>{l.route}</Title>
              <Lede>{l.caveat}</Lede>
              <div className="mt-8 space-y-5">
                {l.points.map((pt) => (
                  <div key={pt.title} className="border-l-2 border-canopy-600/40 pl-5">
                    <p className="font-display text-lg font-semibold">{pt.title}</p>
                    <p className="mt-1 text-sm leading-relaxed opacity-75">{pt.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <Card>
                <h2 className="font-display text-lg font-semibold">What a session costs</h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed opacity-80">
                  <li>Shared park: {rupees(SHARED_RATE)} per dog per hour.</li>
                  <li>
                    Private park: {rupees(PRIVATE_RATE)} per dog per hour, minimum{" "}
                    {PRIVATE_MIN_DOGS} dogs.
                  </li>
                  <li>Pool included. One person per dog free. Introductory pricing.</li>
                </ul>
                <div className="mt-6">
                  <CTA href="/sessions" tone="canopy">
                    Full pricing
                  </CTA>
                </div>
              </Card>
              <Card tone="dark">
                <h2 className="font-display text-lg font-semibold">Before you drive out</h2>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  Bring your dog&apos;s vaccination card on the first visit, leave toys and food at
                  home, and tell us in advance if your dog is reactive — a private booking keeps other dogs
                  out of your slot.
                </p>
                <p className="mt-4 text-sm">
                  <Link
                    href="/plan-your-visit/park-rules"
                    className="font-semibold underline underline-offset-4"
                  >
                    Park rules →
                  </Link>
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container width="narrow">
          <Eyebrow className="text-canopy-700">From {l.name}</Eyebrow>
          <Title size="md">Questions we get from this side of the city</Title>
          <dl className="mt-8 divide-y divide-floor-900/10">
            {l.faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-lg font-semibold">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed opacity-80">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm">
            <Link
              href="/plan-your-visit/faq"
              className="font-semibold text-canopy-700 underline underline-offset-4"
            >
              The full FAQ →
            </Link>
          </p>
        </Container>
      </Section>

      <Section size="tight">
        <Container width="wide">
          <Eyebrow className="text-canopy-700">Other neighbourhoods</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-3">
            {localities
              .filter((o) => o.slug !== l.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  href={`/dog-park-near/${o.slug}`}
                  className="rounded-full border border-floor-900/20 px-5 py-2.5 text-sm font-medium hover:border-floor-900/50"
                >
                  From {o.name} · {o.distance}
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      <JsonLd data={faqSchemaFrom(l.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Dog park near Bangalore", path: "/dog-park-near" },
          { name: l.name, path: `/dog-park-near/${l.slug}` },
        ])}
      />
    </>
  );
}
