import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import { CTA, Card, Container, Eyebrow, Section, Title } from "@/components/ui";
import { media } from "@/lib/media";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { facts, family } from "@/lib/site";

export const metadata = pageMeta({
  title: "The Wider Farm",
  description:
    "Divine Groves is the 100+ acre working farm that Paws Pannai Retreat sits inside — mud roads, mango and tamarind swathes, open to every visitor for long-leash walks.",
  path: "/our-story/the-wider-farm",
});

export default function WiderFarmPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story · The Wider Farm"
        title={`${facts.wideFarmName}: the ${facts.wideFarmAcres} acres the park sits inside`}
        lede="A one-acre dog park is a good day out. The reason a day here feels longer than an hour is that the fence isn't the edge of anything."
        crumbs={[
          { name: "Our Story", path: "/our-story" },
          { name: "The Wider Farm", path: "/our-story/the-wider-farm" },
        ]}
        actions={
          <>
            <CTA href="/the-park/farm-walks">Walks on the farm</CTA>
            <CTA href="/sessions#plan" tone="outline">
              Book a session
            </CTA>
          </>
        }
      />

      <Section tone="bone" size="tight">
        <Container width="wide">
          <Figure slot={media.farmWalk} sizes="100vw" className="mx-auto max-w-5xl" showCaption />
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">What&apos;s out there</Eyebrow>
              <Title>A working farm, not a landscaped estate</Title>
              <p className="mt-5 leading-relaxed opacity-80">
                {facts.wideFarmName} is {facts.wideFarmAcres} acres under mango and tamarind, cut
                through with mud roads and irrigation lines. It is farmed. There are vehicles, there
                are seasons, and in April there is dust. That is the point — a dog gets a landscape
                with real information in it rather than a lawn.
              </p>
              <p className="mt-4 leading-relaxed opacity-80">
                Paws Pannai occupies one acre of it. {family.bsf.name} sits on the same land through
                a separate gate. The rest is farm.
              </p>

              <div className="mt-9 space-y-5">
                <Line
                  title="Open to every visitor"
                  body="Long-leash walks are available to day visitors and overnight guests alike, inside opening hours. This was a deliberate decision, not an oversight."
                />
                <Line
                  title="Long leash, always"
                  body="Beyond the park fence you're sharing space with farm work and other animals. A long line gives your dog range without giving it the whole farm."
                />
                <Line
                  title="Seasonal, honestly"
                  body="After the monsoon it is green and soft underfoot. In high summer it is dry and hot by eleven. Come early in April and May."
                />
              </div>
            </div>

            <div className="space-y-6">
              <Figure slot={media.miyawaki} sizes="(min-width: 1024px) 40vw, 100vw" showCaption />
              <Card tone="dark">
                <h2 className="font-display text-lg font-semibold">Why it matters to the park</h2>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  The canopy, the water table and the shade the park depends on are all functions of
                  the farm around it. You cannot build a cool acre inside a hot hundred. This one
                  works because the hundred works.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Story", path: "/our-story" },
          { name: "The Wider Farm", path: "/our-story/the-wider-farm" },
        ])}
      />
    </>
  );
}

function Line({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-canopy-600/40 pl-5">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-relaxed opacity-75">{body}</p>
    </div>
  );
}
