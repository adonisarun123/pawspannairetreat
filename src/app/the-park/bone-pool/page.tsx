import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import {
  CTA,
  Card,
  Container,
  Eyebrow,
  Lede,
  Section,
  Stat,
  Title,
} from "@/components/ui";
import { media } from "@/lib/media";
import { POOL_RATE, rupees } from "@/lib/pricing";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { facts } from "@/lib/site";

export const metadata = pageMeta({
  title: "The Bone Pool",
  description:
    "A 1,050 sq ft dog swimming pool shaped like a bone, near Hosur. Graded entry, shallow to deep, added to any session for ₹250 per dog per hour.",
  path: "/the-park/bone-pool",
});

export default function BonePoolPage() {
  return (
    <>
      <PageHero
        eyebrow="The Park · The Bone Pool"
        title="A pool built to a dog's proportions, not a person's"
        lede={`${facts.poolSqFt.toLocaleString("en-IN")} sq ft, shaped like a bone, graded from a shallow paddle to a proper swim. It is the one thing here you cannot replicate on a long walk, and it is the reason most people book a second visit.`}
        crumbs={[
          { name: "The Park", path: "/the-park" },
          { name: "The Bone Pool", path: "/the-park/bone-pool" },
        ]}
        actions={
          <>
            <CTA href="/sessions#plan">Add the pool to a session</CTA>
            <CTA href="/sessions#pool" tone="outline">
              Pool pricing
            </CTA>
          </>
        }
      />

      <Section tone="bone" size="tight">
        <Container width="wide">
          <Figure
            slot={media.bonePool}
            sizes="100vw"
            showCaption
            className="mx-auto max-w-5xl"
          />
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow className="text-pool-500">How it works</Eyebrow>
              <Title>Your dog decides how deep it goes</Title>
              <Lede>
                The graded entry matters more than the depth. A dog that has never swum can stand
                in ankle-deep water and watch for ten minutes before committing — and most of them
                do commit.
              </Lede>
              <div className="mt-8 space-y-5">
                <Row
                  title="Shallow end"
                  body="Standing depth for a medium dog. Where first-timers, puppies and older dogs stay."
                />
                <Row
                  title="Deep end"
                  body="A genuine swim. Strong swimmers can work here for an hour and sleep for a day."
                />
                <Row
                  title="Rinse-off"
                  body="Fresh water at the exit so you're not putting a pond-smelling dog into your car."
                />
                <Row
                  title="Supervision"
                  body="You stay with your dog at the pool. We're a park, not a lifeguarded facility — and nobody reads your dog better than you."
                />
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <Eyebrow className="text-canopy-700">Pricing</Eyebrow>
                <p className="font-display text-4xl font-semibold">
                  +{rupees(POOL_RATE)}
                  <span className="text-lg font-normal opacity-60"> / dog / hr</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed opacity-75">
                  On top of the session rate, on either tier. We price it as a premium rather than
                  folding it into entry — it cost real money to build and it is genuinely the best
                  thing here.
                </p>
                <div className="mt-6">
                  <CTA href="/sessions#plan">Work out your total</CTA>
                </div>
              </Card>

              <div className="grid gap-6 sm:grid-cols-2">
                <Stat
                  value={`${facts.poolSqFt.toLocaleString("en-IN")} sq ft`}
                  label="of water surface"
                />
                <Stat value="Bone" label="the actual shape, from above" />
              </div>

              <Card tone="dark">
                <h3 className="font-display text-lg font-semibold">Bring a towel</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  We don&apos;t hand them out yet. A wet Labrador in a hatchback is a lesson people
                  only need once.
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
          { name: "The Bone Pool", path: "/the-park/bone-pool" },
        ])}
      />
    </>
  );
}

function Row({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-pool-500/40 pl-5">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-relaxed opacity-75">{body}</p>
    </div>
  );
}
