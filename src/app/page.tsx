import Link from "next/link";
import { BsfBanner } from "@/components/bsf-banner";
import { Figure } from "@/components/figure";
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
import { rupees, BASE_RATE, DISCOUNT_RATE, POOL_RATE } from "@/lib/pricing";
import { JsonLd, offerSchema, pageMeta } from "@/lib/seo";
import { driveTimes, facts, family, hours, location } from "@/lib/site";

export const metadata = pageMeta({
  title: "A dog park on a working farm near Hosur",
  description:
    "One acre of farmland near Hosur where your dog runs off-leash — twelve upcycled tyre installations, a bone-shaped pool, and mango shade. Sessions by the hour, 45 km from Whitefield.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <Section tone="paper" size="tight" className="pt-10 sm:pt-14">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">
                Seekanapalli village · {facts.acres} acre · near Hosur
              </Eyebrow>
              <Title as="h1" size="xl" className="max-w-2xl">
                A farm your dog runs free on.
              </Title>
              <Lede>
                Not a facility. Not a kennel. A working acre under mango and tamarind, with{" "}
                {facts.tyreElements} play installations built from{" "}
                {facts.tyresSavedKg.toLocaleString("en-IN")} kg of upcycled tyres — and a pool
                shaped like a bone.
              </Lede>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CTA href="/sessions#plan">Book a Session</CTA>
                <CTA href="/the-park" tone="outline">
                  See the park
                </CTA>
              </div>

              <p className="mt-6 text-sm opacity-70">
                From {rupees(BASE_RATE)} per dog · open {hours.display}
              </p>
            </div>

            <Figure
              slot={media.entranceArch}
              priority
              ratio="1 / 1"
              sizes="(min-width: 1024px) 42vw, 100vw"
              showCaption
            />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ difference */}
      <Section tone="canopy" size="tight">
        <Container width="wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Stat value={`${facts.acres} acre`} label="of working farmland, not landscaped lawn" />
            <Stat
              value={facts.tyreElements}
              label="upcycled tyre installations, each one built here"
            />
            <Stat
              value={`${facts.tyresSavedKg.toLocaleString("en-IN")} kg`}
              label="of tyres kept out of a landfill or a burn pile"
            />
            <Stat
              value={`${facts.poolSqFt.toLocaleString("en-IN")} sq ft`}
              label="of pool, shaped like a bone, built to a dog's proportions"
            />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------- pet · play · pool */}
      <Section>
        <Container width="wide">
          <Eyebrow className="text-canopy-700">What&apos;s here</Eyebrow>
          <Title>Pet · Play · Pool</Title>
          <Lede>
            Three things the gate promises, in the order a dog discovers them.
          </Lede>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <PillarCard
              kicker="Pet"
              title="Room to be a dog"
              body="Zones for every temperament — a separated Puppy Play Area, open run for the confident ones, and a netted Aggressive Dog Zone so a reactive dog still gets a day out."
              href="/the-park#zones"
              cta="The zones"
              slot={media.fencedPlayZone}
            />
            <PillarCard
              kicker="Play"
              title="Twelve tyre installations"
              body="Traverse Tyres, Tyre Hill, the Jump Through hoops, right down to the Bamboo Hurdle — an agility landscape made from what everyone else throws away."
              href="/the-park#tyre-play-trail"
              cta="The tyre trail"
              slot={media.tyreHill}
            />
            <PillarCard
              kicker="Pool"
              title="The Bone Pool"
              body={`${facts.poolSqFt.toLocaleString("en-IN")} sq ft of shallow-to-deep water, shaped like a bone. Add it to any session for ${rupees(POOL_RATE)} per dog per hour.`}
              href="/the-park/bone-pool"
              cta="The Bone Pool"
              slot={media.bonePool}
            />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- sessions */}
      <Section tone="paper">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">Sessions</Eyebrow>
              <Title>Booked by the hour, priced by the dog</Title>
              <Lede>
                Two ways in. Both land on the same discounted rate — one rewards staying longer,
                the other rewards bringing the crew.
              </Lede>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href="/sessions#plan">Book a Session</CTA>
                <CTA href="/sessions" tone="outline">
                  Full pricing
                </CTA>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Card className="flex flex-col">
                <p className="text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">
                  Exclusive
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  The place to yourselves
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">
                  One dog, or your own crew, in your own booked slot. Stay two hours or more and
                  the whole slot re-prices at the lower rate.
                </p>
                <p className="mt-5 font-display text-2xl font-semibold">
                  {rupees(BASE_RATE)}
                  <span className="text-base font-normal opacity-60"> first hour</span>
                </p>
                <p className="text-sm opacity-70">
                  then {rupees(DISCOUNT_RATE)} / dog / hr
                </p>
              </Card>

              <Card className="flex flex-col">
                <p className="text-xs font-semibold tracking-[0.14em] text-pool-500 uppercase">
                  Group
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">Bring your own crew</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">
                  Two or more dogs who already know each other, booked together by one party. We
                  don&apos;t mix unfamiliar dogs.
                </p>
                <p className="mt-5 font-display text-2xl font-semibold">
                  {rupees(DISCOUNT_RATE)}
                  <span className="text-base font-normal opacity-60"> / dog / hr</span>
                </p>
                <p className="text-sm opacity-70">from the first hour</p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- family */}
      <Section>
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Figure slot={media.tyreCafe} ratio="4 / 3" sizes="(min-width: 1024px) 50vw, 100vw" />
            <div>
              <Eyebrow className="text-canopy-700">For the whole family</Eyebrow>
              <Title>The dog is the point. Everyone else still has a good day.</Title>
              <Lede>
                Kids are welcome, and they climb the tyres whether or not the tyres were built for
                them. There is shade, there is somewhere to sit, and there is coffee.
              </Lede>
              <div className="mt-8 space-y-5">
                <Point
                  title="Tyre Cafe"
                  body={`Run by ${family.cafe.name} — Sthairya's own kitchen, not a third-party vendor parked at the gate.`}
                />
                <Point
                  title="Shade that isn't a pergola"
                  body={`${facts.mangoTrees} mango and ${facts.tamarindTrees} tamarind trees, plus a young Miyawaki plantation on the boundary.`}
                />
                <Point
                  title="Calm and joy, together"
                  body="A sprint round the tyre trail, then an hour of nothing much under a tree. Both count as a good day out."
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------- park right now */}
      <Section tone="paper">
        <Container width="wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="text-canopy-700">The park right now</Eyebrow>
              <Title size="md">Real photographs, taken on the farm</Title>
            </div>
            <Link
              href="/gallery"
              className="text-sm font-semibold text-canopy-700 underline underline-offset-4"
            >
              See the whole gallery →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[media.tyreHill, media.tyreJumpThrough, media.fencedPlayZone, media.boundarySignage].map(
              (slot) => (
                <Figure
                  key={slot.id}
                  slot={slot}
                  ratio="4 / 5"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  showCaption
                  className="[&_figcaption]:min-h-[2.75rem]"
                />
              ),
            )}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- stay bsf */}
      <BsfBanner />

      {/* ----------------------------------------------------- getting here */}
      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">Getting here</Eyebrow>
              <Title>Closer than you think</Title>
              <Lede>
                {location.addressLine}. About 45 km from Whitefield and 25 km from Hosur — an
                easy morning from South, East and South-East Bangalore.
              </Lede>
              <div className="mt-8">
                <CTA href="/plan-your-visit/getting-here" tone="canopy">
                  Directions &amp; drive times
                </CTA>
              </div>
            </div>

            <DistancePanel />
          </div>
        </Container>
      </Section>

      <JsonLd data={offerSchema()} />
    </>
  );
}

/* ------------------------------------------------------------- fragments */

function PillarCard({
  kicker,
  title,
  body,
  href,
  cta,
  slot,
}: {
  kicker: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  slot: (typeof media)[keyof typeof media];
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-floor-900/10 bg-bone-50">
      <Figure
        slot={slot}
        rounded="rounded-none"
        ratio="4 / 3"
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">
          {kicker}
        </p>
        <h3 className="mt-3 font-display text-xl font-semibold">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">{body}</p>
        <Link
          href={href}
          className="mt-6 text-sm font-semibold text-canopy-700 underline underline-offset-4"
        >
          {cta} →
        </Link>
      </div>
    </article>
  );
}

function DistancePanel() {
  const furthest = Math.max(...driveTimes.map((d) => parseFloat(d.detail)));
  return (
    <div className="self-start rounded-2xl border border-floor-900/10 bg-bone-50 p-6 sm:p-8">
      <p className="text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">
        Distance to the gate
      </p>

      <ul className="mt-7 space-y-6">
        {driveTimes.map((d) => (
          <li key={d.from}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-medium">{d.from}</span>
              <span className="font-display text-xl font-semibold sm:text-2xl">{d.detail}</span>
            </div>
            <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-floor-900/8">
              <div
                className="h-full rounded-full bg-mango-400"
                style={{ width: `${(parseFloat(d.detail) / furthest) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-floor-900/10 pt-6">
        <div>
          <p className="text-xs tracking-[0.14em] uppercase opacity-50">Plus Code</p>
          <p className="mt-1 font-medium">{location.plusCode}</p>
        </div>
        <a
          href={location.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-canopy-700 underline underline-offset-4"
        >
          <MapPin className="h-4 w-4" />
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function Point({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-canopy-600/40 pl-5">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-relaxed opacity-75">{body}</p>
    </div>
  );
}
