import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SessionPlanner } from "@/components/session-planner";
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
import {
  ADULT_RATE,
  CHILD_RATE,
  MAX_HOURS,
  PARK_CAPACITY,
  POOL_SWIM_MINUTES,
  PRIVATE_MIN_DOGS,
  PRIVATE_RATE,
  SHARED_RATE,
  quote,
  rupees,
  tiers,
} from "@/lib/pricing";
import { JsonLd, breadcrumbSchema, offerSchema, pageMeta } from "@/lib/seo";
import { family, hours } from "@/lib/site";

export const metadata = pageMeta({
  title: "Sessions & Pricing",
  description:
    "Introductory pricing: shared dog park near Hosur at ₹500 per dog per hour, or the whole park privately at ₹1,000 per dog per hour (min. 4 dogs). Pool included. One person per dog free.",
  path: "/sessions",
});

const examples = [
  { label: "Shared · 1 dog · 1 hour · 1 person", q: quote({ mode: "shared", dogs: 1, hours: 1, adults: 1, kids: 0, under5: 0 }) },
  { label: "Shared · 1 dog · 2 hours · 2 adults", q: quote({ mode: "shared", dogs: 1, hours: 2, adults: 2, kids: 0, under5: 0 }) },
  { label: "Shared · 2 dogs · 2 hours · 2 adults + a 7-year-old", q: quote({ mode: "shared", dogs: 2, hours: 2, adults: 2, kids: 1, under5: 0 }) },
  { label: "Private · 4 dogs · 2 hours · 4 adults", q: quote({ mode: "private", dogs: 4, hours: 2, adults: 4, kids: 0, under5: 0 }) },
].map((e) => ({
  ...e,
  sub: (q: ReturnType<typeof quote>) =>
    `${rupees(q.dogTotal)} dogs${q.peopleTotal ? ` + ${rupees(q.peopleTotal)} guests` : " · guests free"}`,
}));

export default function SessionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sessions & Pricing"
        title="Booked by the hour. Priced by the dog. Published in full."
        lede={`Introductory pricing: share the park from ${rupees(SHARED_RATE)} per dog per hour, or take the whole park privately. The pool is included and one person per dog comes free. Sessions run inside our opening hours of ${hours.display}.`}
        crumbs={[{ name: "Sessions & Pricing", path: "/sessions" }]}
        actions={
          <>
            <CTA href="#plan">Plan your session</CTA>
            <CTA href="/plan-your-visit" tone="outline">
              Before you come
            </CTA>
          </>
        }
      />

      {/* ------------------------------------------------------- the planner */}
      <Section id="plan" tone="bone" size="tight">
        <Container width="wide">
          <SessionPlanner />
        </Container>
      </Section>

      {/* --------------------------------------------------------- how it works */}
      <Section>
        <Container width="wide">
          <Eyebrow className="text-canopy-700">How sessions work · introductory pricing</Eyebrow>
          <Title>Share the park, or have it to yourselves.</Title>
          <Lede>
            Every session includes the pool. The difference is who else is in the park with you.
          </Lede>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card id="shared" className="scroll-mt-28">
              <Eyebrow className="text-canopy-700">Shared Park</Eyebrow>
              <h3 className="font-display text-2xl font-semibold">Play alongside other dogs</h3>
              <p className="mt-4 leading-relaxed opacity-80">
                Your dogs share the park with other families&apos; dogs — never more than{" "}
                {PARK_CAPACITY} dogs inside at once. You stay with your dog the whole time.
              </p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-3xl font-semibold text-canopy-700">
                  {rupees(SHARED_RATE)}
                </span>
                <span className="opacity-70">per dog per hour</span>
              </div>
              <p className="mt-6 rounded-xl bg-canopy-600/8 px-4 py-3 text-sm leading-relaxed text-canopy-700">
                Shared sessions are for friendly, vaccinated dogs. A dog showing aggression is asked
                to take a break or leave the shared park. Reactive or nervous dogs do better with a
                private booking.
              </p>
            </Card>

            <Card id="private" className="scroll-mt-28">
              <Eyebrow className="text-pool-500">Private Park</Eyebrow>
              <h3 className="font-display text-2xl font-semibold">The whole park to your group</h3>
              <p className="mt-4 leading-relaxed opacity-80">
                No other dogs for your slot — the park, the tyre trail and the pool are yours. Ideal
                for a crew of friends&apos; dogs, or a dog who needs space.
              </p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-3xl font-semibold text-canopy-700">
                  {rupees(PRIVATE_RATE)}
                </span>
                <span className="opacity-70">per dog per hour · minimum {PRIVATE_MIN_DOGS} dogs</span>
              </div>
              <p className="mt-6 text-sm leading-relaxed opacity-70">
                Charged for at least {PRIVATE_MIN_DOGS} dogs, so a private hour starts at{" "}
                {rupees(PRIVATE_RATE * PRIVATE_MIN_DOGS)}.
              </p>
            </Card>
          </div>

          <Card id="people" className="mt-6 scroll-mt-28">
            <Eyebrow className="text-tamarind-600">People</Eyebrow>
            <h3 className="font-display text-2xl font-semibold">One person per dog comes free</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Note title="Free" body="Children under 5 — always." />
              <Note title={`${rupees(CHILD_RATE)}/hr`} body="Children 5–12, beyond the free place." />
              <Note title={`${rupees(ADULT_RATE)}/hr`} body="Anyone 12 and over, beyond the free place." />
            </div>
          </Card>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- table */}
      <Section tone="paper">
        <Container width="wide">
          <Eyebrow className="text-canopy-700">Everything, in one table</Eyebrow>
          <Title>The full rate card</Title>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-floor-900/15">
                  <th className="py-3 pr-6 text-xs font-semibold tracking-[0.12em] uppercase opacity-60">
                    Tier
                  </th>
                  <th className="py-3 pr-6 text-xs font-semibold tracking-[0.12em] uppercase opacity-60">
                    Format
                  </th>
                  <th className="py-3 pr-6 text-xs font-semibold tracking-[0.12em] uppercase opacity-60">
                    Rate
                  </th>
                  <th className="py-3 text-xs font-semibold tracking-[0.12em] uppercase opacity-60">
                    Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.id} id={t.id} className="scroll-mt-28 border-b border-floor-900/8">
                    <td className="py-5 pr-6 align-top">
                      <span className="font-display font-semibold">{t.name}</span>
                      {!t.published ? (
                        <span className="mt-2 block">
                          <Pill className="text-tamarind-600">Pricing being finalised</Pill>
                        </span>
                      ) : null}
                    </td>
                    <td className="py-5 pr-6 align-top text-sm opacity-80">{t.format}</td>
                    <td className="py-5 pr-6 align-top text-sm font-semibold whitespace-nowrap">
                      {t.rate}
                    </td>
                    <td className="py-5 align-top text-sm opacity-70">{t.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Note title={`${PARK_CAPACITY} dogs max`} body="Never more than ten dogs inside the park at once, shared or private." />
            <Note title={`${POOL_SWIM_MINUTES}-minute swims`} body="Dogs come out of the pool after 15 minutes and go back in after a break." />
            <Note title={`${MAX_HOURS} hours`} body="The longest continuous block one booking can cover. Book a fresh block after a break for the whole day." />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ pool */}
      <Section id="pool" tone="canopy">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow className="text-mango-300">The Bone Pool</Eyebrow>
              <Title>Included with every session</Title>
              <Lede className="opacity-90">
                The bone-shaped pool comes with every booking, shared or private. Dogs swim{" "}
                {POOL_SWIM_MINUTES} minutes at a time, then come out for a break before going back
                in — tired dogs and deep water don&apos;t mix.
              </Lede>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href="#plan">Plan your session</CTA>
                <CTA href="/the-park/bone-pool" tone="outline">
                  See the pool
                </CTA>
              </div>
            </div>
            <div className="space-y-4 lg:pt-10">
              {examples.map((e) => (
                <ExampleLine key={e.label} label={e.label} value={rupees(e.q.total)} sub={e.sub(e.q)} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- puppy etc */}
      <Section id="puppy">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-3">
            <Card className="flex flex-col">
              <Eyebrow className="text-tamarind-600">Puppy Sessions</Eyebrow>
              <h3 className="font-display text-xl font-semibold">Shorter, quieter, separated</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">
                A low-stimulus slot in the Puppy Play Area, which is already physically separate on
                site. Expected to follow the same per-dog framework at a shorter, discounted,
                puppy-only rate.
              </p>
              <p className="mt-5 text-xs font-semibold tracking-wide text-tamarind-600 uppercase">
                Rate being finalised — ask us
              </p>
            </Card>

            <Card className="flex flex-col">
              <Eyebrow className="text-tamarind-600">Training &amp; Grooming</Eyebrow>
              <h3 className="font-display text-xl font-semibold">A paid add-on, weekends only</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">
                Booked alongside a session by prior appointment or on request. Never bundled into
                entry — we run a park, not a full-service kennel.
              </p>
              <Link
                href="/parties-and-training#training"
                className="mt-5 text-sm font-semibold text-canopy-700 underline underline-offset-4"
              >
                Training &amp; Grooming →
              </Link>
            </Card>

            <Card className="flex flex-col">
              <Eyebrow className="text-canopy-700">Staying at {family.bsf.abbr}</Eyebrow>
              <h3 className="font-display text-xl font-semibold">2 hours, pool included, free</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">
                Complimentary with a same-stay night at {family.bsf.name}. Not a fixed slot — the
                front desk fits you around the day&apos;s bookings.
              </p>
              <Link
                href="/stay-at-bsf"
                className="mt-5 text-sm font-semibold text-canopy-700 underline underline-offset-4"
              >
                How the bundle works →
              </Link>
            </Card>
          </div>
        </Container>
      </Section>

      <JsonLd data={offerSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Sessions & Pricing", path: "/sessions" },
        ])}
      />
    </>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-floor-900/10 bg-bone-100 p-5">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed opacity-70">{body}</p>
    </div>
  );
}

function ExampleLine({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-bone-50/20 pb-4">
      <div>
        <p className="font-medium">{label}</p>
        {sub ? <p className="mt-0.5 text-xs opacity-70">{sub}</p> : null}
      </div>
      <p className="font-display text-xl font-semibold whitespace-nowrap">{value}</p>
    </div>
  );
}
