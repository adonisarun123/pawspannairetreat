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
  BASE_RATE,
  DISCOUNT_RATE,
  MAX_HOURS,
  POOL_RATE,
  rupees,
  tiers,
} from "@/lib/pricing";
import { JsonLd, breadcrumbSchema, offerSchema, pageMeta } from "@/lib/seo";
import { family, hours } from "@/lib/site";

export const metadata = pageMeta({
  title: "Sessions & Pricing",
  description:
    "Dog park sessions near Hosur from ₹1,000 per dog, dropping to ₹750 per dog per hour at two hours or two dogs. Pool add-on ₹250. Plan your slot and send it on WhatsApp.",
  path: "/sessions",
});

export default function SessionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Sessions & Pricing"
        title="Booked by the hour. Priced by the dog. Published in full."
        lede={`Two tiers, one discounted rate, and no number hidden behind an enquiry form. Sessions run inside our opening hours of ${hours.display} — there is no late-evening slot, so nothing here will offer you one.`}
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
          <Eyebrow className="text-canopy-700">How sessions work</Eyebrow>
          <Title>Two ways in. Same discounted rate at the end of both.</Title>
          <Lede>
            Exclusive rewards staying longer. Group rewards bringing more of your own dogs. Either
            trigger drops the whole slot to {rupees(DISCOUNT_RATE)} per dog per hour.
          </Lede>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card id="exclusive" className="scroll-mt-28">
              <Eyebrow className="text-canopy-700">Exclusive / Private</Eyebrow>
              <h3 className="font-display text-2xl font-semibold">The place to yourselves</h3>
              <p className="mt-4 leading-relaxed opacity-80">
                One dog, or your own crew, in a slot nobody else shares. The trigger here is time:
                book two hours or more and the entire slot re-prices at the lower rate — not just
                the second hour.
              </p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-3xl font-semibold">{rupees(BASE_RATE)}</span>
                <span className="opacity-70">first hour, per dog</span>
              </div>
              <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-3xl font-semibold text-canopy-700">
                  {rupees(DISCOUNT_RATE)}
                </span>
                <span className="opacity-70">per dog per hour, from 2 hours</span>
              </div>
            </Card>

            <Card id="group" className="scroll-mt-28">
              <Eyebrow className="text-pool-500">Group Session</Eyebrow>
              <h3 className="font-display text-2xl font-semibold">Bring your own crew</h3>
              <p className="mt-4 leading-relaxed opacity-80">
                Two or more dogs who already know each other, booked together by one party. The
                trigger here is headcount — the lower rate applies from the first hour.
              </p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-3xl font-semibold text-canopy-700">
                  {rupees(DISCOUNT_RATE)}
                </span>
                <span className="opacity-70">per dog per hour, from hour one</span>
              </div>
              <p className="mt-6 rounded-xl bg-canopy-600/8 px-4 py-3 text-sm leading-relaxed text-canopy-700">
                We do not mix unfamiliar dogs. A group slot is your dogs, or your friends&apos; dogs
                that yours already know — never strangers put together by us.
              </p>
            </Card>
          </div>
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
            <Note title={`${MAX_HOURS} hours`} body="The longest continuous block one crew can book. Take a break and book a fresh block if you want the whole day." />
            <Note title={`+${rupees(POOL_RATE)}/dog/hr`} body="The pool add-on, on either tier. Priced as the premium it is." />
            <Note title="No stranger mixing" body="Every slot belongs to one party. There's no on-site handler yet, and we won't take that risk with your dog." />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ pool */}
      <Section id="pool" tone="canopy">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow className="text-mango-300">Pool Add-On</Eyebrow>
              <Title>+{rupees(POOL_RATE)} per dog, per hour</Title>
              <Lede className="opacity-90">
                Add the bone-shaped pool to any session, on either tier. It is not bundled into
                entry and it is not a surprise at the gate — it&apos;s a separate line, priced
                openly, because it&apos;s the best thing on the farm.
              </Lede>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href="#plan">Add it to your session</CTA>
                <CTA href="/the-park/bone-pool" tone="outline">
                  See the pool
                </CTA>
              </div>
            </div>
            <div className="space-y-4 lg:pt-10">
              <ExampleLine label="1 dog · 1 hour · no pool" value={rupees(1000)} />
              <ExampleLine label="1 dog · 2 hours · pool" value={rupees(2000)} sub="₹1,500 session + ₹500 pool" />
              <ExampleLine label="2 dogs · 2 hours · pool" value={rupees(4000)} sub="₹3,000 session + ₹1,000 pool" />
              <ExampleLine label="3 dogs · 3 hours · no pool" value={rupees(6750)} />
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
              <h3 className="font-display text-xl font-semibold">2 hours + pool, free</h3>
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
