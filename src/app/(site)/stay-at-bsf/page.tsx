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
import { SHARED_RATE, rupees } from "@/lib/pricing";
import { JsonLd, breadcrumbSchema, bsfSchema, pageMeta } from "@/lib/seo";
import { family, hours } from "@/lib/site";

export const metadata = pageMeta({
  title: `Stay at ${family.bsf.abbr}`,
  description:
    "Bevu Social Farmstay is next door on the same land. Every stay includes 2 complimentary hours in the park with the pool, and every Paws Pannai day visitor gets 15% off their next night.",
  path: "/stay-at-bsf",
});

export default function StayAtBsfPage() {
  return (
    <>
      <PageHero
        tone="floor"
        eyebrow={`Stay at ${family.bsf.abbr}`}
        title="Turn your day out into a weekend away"
        lede={`${family.bsf.name} sits on the same land as the park, through its own entrance. One address, two properties, and a bundle that makes staying the obvious choice rather than the upsell.`}
        crumbs={[{ name: `Stay at ${family.bsf.abbr}`, path: "/stay-at-bsf" }]}
        actions={
          <>
            <CTA href={family.bsf.bookingUrl} external>
              Book a night at {family.bsf.abbr} ↗
            </CTA>
            <CTA href="#bundle" tone="outline">
              What&apos;s included
            </CTA>
          </>
        }
      />

      {/* ---------------------------------------------------------- bundle */}
      <Section id="bundle" tone="bone">
        <Container width="wide">
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">The Stay + Play bundle</Eyebrow>
              <Title>Two real numbers, not a soft invitation</Title>
              <Lede>
                Both of these are fixed terms of a {family.bsf.abbr} booking. Neither of them is a
                voucher you have to chase.
              </Lede>

              <div className="mt-10 space-y-8">
                <Offer
                  headline={`2 hours in the park, with the pool — complimentary`}
                  body={`Included with every ${family.bsf.abbr} stay. It is deliberately not a fixed slot: the timing flexes around the park's day-visitor calendar, so the front desk fits you around the day's bookings rather than handing you a time you can't use.`}
                  value={`Worth ${rupees(SHARED_RATE * 2)} for one dog`}
                />
                <Offer
                  headline="15% off your night at BSF or SSEK"
                  body={`An introductory ${family.company} offer: every Paws Pannai day visitor gets 15% flat off their next night's tariff — at ${family.bsf.name} next door, or at ${family.ssek.name} in Kanha. Ask at the gate on your way out.`}
                  value="Flat 15%, on the tariff"
                />
              </div>
            </div>

            <div className="space-y-6">
              <Figure slot={media.bsfStay} sizes="(min-width: 1024px) 50vw, 100vw" />
              <div className="grid gap-6 sm:grid-cols-2">
                <Stat value="2 hrs" label="of park time, free with a stay" />
                <Stat value="15%" label="off your next BSF or SSEK night" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ how it works */}
      <Section>
        <Container width="wide">
          <Eyebrow className="text-canopy-700">How it works</Eyebrow>
          <Title>Either direction</Title>
          <Lede>
            Most people arrive for a session and leave thinking about a night. Some do it the other
            way round. Both work.
          </Lede>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Card>
              <p className="text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">
                Day trip first
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold">
                Book a session, take the 15%
              </h3>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed opacity-80">
                <li>1. Book a park session and come out for the day.</li>
                <li>2. Ask about the farmstay at the gate — it&apos;s a two-minute walk.</li>
                <li>
                  3. Take 15% off your next night at {family.bsf.abbr} or {family.ssek.name}.
                </li>
              </ol>
              <div className="mt-6">
                <CTA href="/sessions#plan" tone="canopy">
                  Book a session
                </CTA>
              </div>
            </Card>

            <Card>
              <p className="text-xs font-semibold tracking-[0.14em] text-mango-500 uppercase">
                Stay first
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold">
                Book a night, the park is included
              </h3>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed opacity-80">
                <li>1. Book your night at {family.bsf.name}.</li>
                <li>2. Tell the front desk you&apos;re bringing a dog.</li>
                <li>
                  3. They fit your complimentary 2 hours plus pool around the day&apos;s park
                  calendar, inside {hours.short}.
                </li>
              </ol>
              <div className="mt-6">
                <CTA href={family.bsf.bookingUrl} external>
                  Book at {family.bsf.abbr} ↗
                </CTA>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- context */}
      <Section tone="paper">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">Same farm, separate gate</Eyebrow>
              <Title size="md">One address, two properties</Title>
              <p className="mt-5 leading-relaxed opacity-80">
                Both sit on the same land, with their own entrances. You can stay at the farmstay
                without ever coming into the park, and you can spend a whole day in the park
                without going near the farmstay. Most people end up doing both.
              </p>
            </div>

            <Card tone="dark">
              <h3 className="font-display text-lg font-semibold">{family.company}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Paws Pannai Retreat and {family.bsf.name} are sibling properties under{" "}
                {family.company}, alongside{" "}
                <a
                  href={family.ssek.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  {family.ssek.name}
                </a>{" "}
                in {family.ssek.location}. Same people, same land ethic, three very different
                places.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: `Stay at ${family.bsf.abbr}`, path: "/stay-at-bsf" },
        ])}
      />
      <JsonLd data={bsfSchema()} />
    </>
  );
}

function Offer({
  headline,
  body,
  value,
}: {
  headline: string;
  body: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-floor-900/10 bg-bone-50 p-6">
      <p className="font-display text-xl font-semibold">{headline}</p>
      <p className="mt-3 text-sm leading-relaxed opacity-75">{body}</p>
      <p className="mt-4 inline-block rounded-full bg-mango-400 px-3 py-1 text-xs font-semibold text-floor-900">
        {value}
      </p>
    </div>
  );
}
