import Link from "next/link";
import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import {
  CTA,
  Card,
  Container,
  Eyebrow,
  Lede,
  Pill,
  Section,
  Title,
} from "@/components/ui";
import { tyreElements } from "@/lib/content";
import { media } from "@/lib/media";
import { PARK_CAPACITY, POOL_SWIM_MINUTES } from "@/lib/pricing";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { facts, family, hours } from "@/lib/site";

export const metadata = pageMeta({
  title: "The Park",
  description:
    "One acre under mango and tamarind: a 1,050 sq ft bone-shaped pool, twelve upcycled tyre installations, a Miyawaki forest, zones for every temperament, and long-leash farm walks.",
  path: "/the-park",
});

export default function ParkPage() {
  return (
    <>
      <PageHero
        eyebrow="The Park"
        title="One acre. Twelve tyre installations. A pool shaped like a bone."
        lede={`"Pannai" is Tamil for farm, and that is what this is — a working acre with mango and tamarind canopy, red soil underfoot, and a play landscape built out of ${facts.tyresSavedKg.toLocaleString("en-IN")} kg of tyres that were going to be burned.`}
        crumbs={[{ name: "The Park", path: "/the-park" }]}
        actions={
          <>
            <CTA href="/sessions#plan">Book a Session</CTA>
            <CTA href="/gallery" tone="outline">
              See the gallery
            </CTA>
          </>
        }
      />

      {/* ------------------------------------------------------- bone pool */}
      <Section id="bone-pool" tone="bone">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow className="text-pool-500">The Bone Pool</Eyebrow>
              <Title>
                {facts.poolSqFt.toLocaleString("en-IN")} sq ft of water, shaped like a bone
              </Title>
              <Lede>
                Shallow at one end, deep at the other, with a graded entry so a first-timer can
                decide for itself. Most dogs in this part of the country have never swum. This is
                usually the moment the day turns.
              </Lede>
              <div className="mt-7 flex flex-wrap gap-2">
                <Pill>Included with every session</Pill>
                <Pill>{POOL_SWIM_MINUTES}-minute swims, then a break</Pill>
                <Pill>Towels: bring your own</Pill>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href="/the-park/bone-pool" tone="canopy">
                  More about the pool
                </CTA>
                <CTA href="/sessions#pool" tone="outline">
                  Pool pricing
                </CTA>
              </div>
            </div>
            <Figure slot={media.bonePool} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------- tyre play trail */}
      <Section id="tyre-play-trail" tone="paper">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">Tyre Play Trail</Eyebrow>
              <Title>Twelve elements, from Traverse Tyres to the Bamboo Hurdle</Title>
              <Lede>
                Painted blue and gold on purpose — those are the two colours a dog sees most
                clearly. The palette isn&apos;t decoration, it&apos;s legibility.
              </Lede>
              <div className="mt-8">
                <Figure slot={media.tyreHill} sizes="(min-width: 1024px) 35vw, 100vw" showCaption />
              </div>
            </div>

            <ol className="grid gap-3 sm:grid-cols-2">
              {tyreElements.map((el, i) => (
                <li
                  key={el.name}
                  className="rounded-2xl border border-floor-900/10 bg-bone-50 p-5"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-semibold text-mango-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-base font-semibold">{el.name}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed opacity-70">{el.note}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------- trees & forest */}
      <Section id="trees-and-forest" tone="canopy">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Figure slot={media.miyawaki} sizes="(min-width: 1024px) 50vw, 100vw" />
            <div>
              <Eyebrow className="text-mango-300">Trees &amp; Miyawaki Forest</Eyebrow>
              <Title>Shade you can&apos;t build in a season</Title>
              <Lede className="opacity-90">
                {facts.mangoTrees} mango trees and {facts.tamarindTrees} tamarind, already grown,
                already casting the dappled light the whole park runs on. On the boundary, a young
                Miyawaki plantation putting down a native forest at three times the usual rate.
              </Lede>
              <p className="mt-6 text-sm leading-relaxed opacity-80">
                It matters more than it sounds. An open dog park in Tamil Nadu in April is a
                cruelty. Under this canopy, the ground stays cool enough to run on all day.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ zones */}
      <Section id="zones">
        <Container width="wide">
          <Eyebrow className="text-canopy-700">Zones</Eyebrow>
          <Title>A zone for every temperament</Title>
          <Lede>
            Not every dog wants the same day. The park is divided so a nervous dog, a puppy and a
            reactive dog all get one anyway.
          </Lede>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Card className="flex flex-col">
              <h3 className="font-display text-xl font-semibold">Puppy Play Area</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">
                Physically separated, lower stimulus, softer ground and shorter sightlines. Built
                for dogs who are still deciding whether the world is safe.
              </p>
              <p className="mt-5 text-xs font-semibold tracking-wide text-tamarind-600 uppercase">
                Puppy-safe session pricing being finalised
              </p>
            </Card>

            <Card className="flex flex-col">
              <h3 className="font-display text-xl font-semibold">The Open Run</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">
                The main acre — tyre trail, canopy, and enough straight line for a Labrador to hit
                full speed and mean it. Where most sessions happen.
              </p>
              <p className="mt-5 text-xs font-semibold tracking-wide text-canopy-700 uppercase">
                Included in every session
              </p>
            </Card>

            <Card className="flex flex-col">
              <h3 className="font-display text-xl font-semibold">Aggressive Dog Zone</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">
                Netted and separate. A reactive dog is still a dog that deserves an hour off-leash
                — tell us before you arrive and we&apos;ll have it ready.
              </p>
              <p className="mt-5 text-xs font-semibold tracking-wide text-canopy-700 uppercase">
                Ask when you book
              </p>
            </Card>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed opacity-70">
            One rule sits behind all of this: never more than {PARK_CAPACITY} dogs in the park at
            once. Shared sessions are for friendly, vaccinated dogs; a private booking keeps other
            dogs out of your slot.{" "}
            <Link
              href="/plan-your-visit/park-rules"
              className="underline underline-offset-4 hover:text-canopy-700"
            >
              The full park rules
            </Link>
            .
          </p>
        </Container>
      </Section>

      {/* -------------------------------------------------------- tyre cafe */}
      <Section id="tyre-cafe" tone="paper">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">Tyre Cafe</Eyebrow>
              <Title>Somewhere for you to sit while your dog gets on with it</Title>
              <Lede>
                Run by {family.cafe.name} — Sthairya&apos;s own kitchen, not a third-party vendor
                parked at the gate. Filter coffee, farm food, shade, and a clear view of whatever
                your dog is doing at the far fence.
              </Lede>
              <p className="mt-6 text-sm opacity-70">Open alongside the park, {hours.short}.</p>
            </div>
            <Figure slot={media.tyreCafe} sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- farm walks */}
      <Section id="farm-walks" tone="floor">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Figure slot={media.farmWalk} sizes="(min-width: 1024px) 50vw, 100vw" />
            <div>
              <Eyebrow className="text-mango-300">Long-Leash Farm Walks</Eyebrow>
              <Title>
                {facts.wideFarmAcres} acres beyond the fence
              </Title>
              <Lede className="opacity-90">
                The park sits inside {facts.wideFarmName}, a working farm of{" "}
                {facts.wideFarmAcres} acres — mud roads, mango swathes, tamarind stands. Long-leash
                walks out there are open to every visitor, day-trippers included, not only to
                overnight guests.
              </Lede>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href="/the-park/farm-walks">About the farm walks</CTA>
                <CTA href="/our-story/the-wider-farm" tone="outline">
                  The wider farm
                </CTA>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ cat teaser */}
      <Section tone="bone" size="tight">
        <Container width="narrow">
          <div className="rounded-2xl border border-dashed border-tamarind-300 bg-tamarind-100/50 p-7 text-center">
            <p className="text-xs font-semibold tracking-[0.14em] text-tamarind-600 uppercase">
              Coming soon
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold">Cat Corner</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed opacity-75">
              There is already a cat on the entrance arch. A quiet, high-sided corner for cats is
              being planned — we&apos;ll say more once it&apos;s built rather than before.
            </p>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The Park", path: "/the-park" },
        ])}
      />
    </>
  );
}
