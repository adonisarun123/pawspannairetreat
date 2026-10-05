import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import { CTA, Card, Container, Eyebrow, Lede, Section, Title } from "@/components/ui";
import { media } from "@/lib/media";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { facts, hours } from "@/lib/site";

export const metadata = pageMeta({
  title: "Long-Leash Farm Walks",
  description:
    "Walk your dog on long leash through 100+ acres of working farm at Divine Groves — mud roads, mango swathes and tamarind stands, open to every Paws Pannai visitor.",
  path: "/the-park/farm-walks",
});

export default function FarmWalksPage() {
  return (
    <>
      <PageHero
        eyebrow="The Park · Farm Walks"
        title="The fence is not the edge of the day"
        lede={`Paws Pannai sits inside ${facts.wideFarmName}, ${facts.wideFarmAcres} acres of working farm. Mud roads, mango swathes, tamarind stands and the sort of ground a city dog almost never gets to smell.`}
        crumbs={[
          { name: "The Park", path: "/the-park" },
          { name: "Farm Walks", path: "/the-park/farm-walks" },
        ]}
        actions={<CTA href="/sessions#plan">Book a session</CTA>}
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
              <Eyebrow className="text-canopy-700">Open to everyone</Eyebrow>
              <Title>Not a guests-only privilege</Title>
              <Lede>
                This is worth saying plainly, because most farm properties do the opposite: the
                walks are open to every Paws Pannai visitor — day-trippers and overnight guests
                alike — inside our hours of {hours.short}.
              </Lede>
              <p className="mt-6 max-w-2xl leading-relaxed opacity-80">
                They&apos;re long-leash, not off-leash. Beyond the park fence you&apos;re on a
                working farm with vehicles, irrigation lines and other animals, and a recall
                that&apos;s perfect at home isn&apos;t always perfect at the smell of something new.
                Bring a long line, or ask us at the gate.
              </p>
            </div>

            <div className="space-y-5">
              <Card>
                <h3 className="font-display text-lg font-semibold">What the walk gives you</h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed opacity-80">
                  <li>
                    Ground that isn&apos;t tarmac — red soil, mud road, dry leaf, irrigation channel.
                  </li>
                  <li>Distance. A tired dog is made by kilometres, not by a lawn.</li>
                  <li>
                    A quieter option for dogs that find the open run too much on a busy weekend.
                  </li>
                </ul>
              </Card>
              <Card tone="dark">
                <h3 className="font-display text-lg font-semibold">Before you set off</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  Tell the team at the gate which way you&apos;re heading, keep the leash on, and be
                  back inside opening hours. The farm has no lighting after dusk, by design.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The Park", path: "/the-park" },
          { name: "Farm Walks", path: "/the-park/farm-walks" },
        ])}
      />
    </>
  );
}
