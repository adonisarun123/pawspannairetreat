import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CTA, Card, Container, Eyebrow, Lede, Section, Title } from "@/components/ui";
import { WhatsAppGlyph } from "@/components/session-planner";
import { faqs, parkRules } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";
import { contact, driveTimes, hours, location, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Plan Your Visit",
  description:
    "Hours, vaccination requirements, park rules, drive times and directions for Paws Pannai Retreat — the dog park near Hosur, 45 km from Whitefield.",
  path: "/plan-your-visit",
});

export default function PlanYourVisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan Your Visit"
        title="Everything you'd want to know before you put the dog in the car"
        lede={`Open ${hours.display}, in ${location.addressLine}. The rest of this page answers the questions people actually ask us on WhatsApp, in roughly the order they ask them.`}
        crumbs={[{ name: "Plan Your Visit", path: "/plan-your-visit" }]}
        actions={
          <>
            <CTA href="/sessions#plan">Book a Session</CTA>
            <CTA href={whatsappLink("Hi! I have a question about visiting Paws Pannai.")} tone="outline" external>
              Ask us on WhatsApp
            </CTA>
          </>
        }
      />

      {/* -------------------------------------------------------- at a glance */}
      <Section tone="canopy" size="tight">
        <Container width="wide">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Glance label="Open" value={hours.display} />
            <Glance label="Where" value={location.addressLine} />
            <Glance label="First visit" value="Bring the vaccination card" />
            <Glance label="Booking" value="WhatsApp, confirmed by us" />
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- three cards */}
      <Section>
        <Container width="wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <LinkCard
              title="FAQ"
              body="Hours, vaccination proof, breed and temperament policy, cancellations, kids, and what happens when it rains."
              href="/plan-your-visit/faq"
              cta="Read the FAQ"
            />
            <LinkCard
              title="Park Rules"
              body="Nine rules, each with the reason behind it. Leash-to-gate, no stranger mixing, no outside toys or food."
              href="/plan-your-visit/park-rules"
              cta="Read the rules"
            />
            <LinkCard
              title="Getting Here"
              body="Drive times from Electronic City, Sarjapur, HSR, Whitefield and Hosur, plus the map and the last turn."
              href="/plan-your-visit/getting-here"
              cta="Directions"
            />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ top questions */}
      <Section tone="paper">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">The short version</Eyebrow>
              <Title>Five things people ask first</Title>
              <Lede>
                If you only read one section before booking, read this one.
              </Lede>
              <Link
                href="/plan-your-visit/faq"
                className="mt-6 inline-block text-sm font-semibold text-canopy-700 underline underline-offset-4"
              >
                All {faqs.length} questions →
              </Link>
            </div>

            <div className="divide-y divide-floor-900/10">
              {faqs.slice(0, 5).map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <span className="font-display text-lg font-semibold">{f.q}</span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-xl leading-none opacity-50 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 pr-10 text-sm leading-relaxed opacity-80">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- rules strip */}
      <Section>
        <Container width="wide">
          <Eyebrow className="text-canopy-700">Park rules, in one line each</Eyebrow>
          <Title size="md">The whole rulebook fits on a gate sign</Title>
          <ul className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {parkRules.map((r) => (
              <li
                key={r.rule}
                className="rounded-2xl border border-floor-900/10 bg-bone-50 px-5 py-4 text-sm font-medium"
              >
                {r.rule}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CTA href="/plan-your-visit/park-rules" tone="canopy">
              Why each rule exists
            </CTA>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- drive times */}
      <Section tone="bone">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">Drive times</Eyebrow>
              <Title>From your side of the city</Title>
              <Lede>
                Most of South, East and South-East Bangalore is inside ninety minutes. Leave before
                the Hosur Road traffic builds and it&apos;s a pleasant drive.
              </Lede>
              <div className="mt-8">
                <CTA href="/plan-your-visit/getting-here">Full directions</CTA>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {driveTimes.map((d) => (
                <li
                  key={d.from}
                  className="flex items-baseline justify-between gap-4 rounded-2xl border border-floor-900/10 bg-bone-50 px-5 py-4"
                >
                  <span className="font-medium">{d.from}</span>
                  <span className="text-sm opacity-70">{d.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- ask */}
      <Section tone="floor" size="tight">
        <Container width="narrow">
          <div className="text-center">
            <Title size="md">Still have a question?</Title>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed opacity-85">
              Message us. Someone reads it, and we answer with the actual answer rather than a
              form response.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink("Hi! I have a question about visiting Paws Pannai.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-mango-400 px-6 py-3 text-sm font-semibold text-floor-900 transition-colors hover:bg-mango-300"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                WhatsApp us
              </a>
              <CTA href={`tel:${contact.phone}`} tone="outline">
                {contact.phoneDisplay}
              </CTA>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd data={faqSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Plan Your Visit", path: "/plan-your-visit" },
        ])}
      />
    </>
  );
}

function Glance({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-mango-400 pl-4">
      <p className="text-xs font-semibold tracking-[0.14em] uppercase opacity-70">{label}</p>
      <p className="mt-2 font-display text-lg leading-snug font-semibold">{value}</p>
    </div>
  );
}

function LinkCard({
  title,
  body,
  href,
  cta,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <Card className="flex flex-col">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">{body}</p>
      <Link
        href={href}
        className="mt-6 text-sm font-semibold text-canopy-700 underline underline-offset-4"
      >
        {cta} →
      </Link>
    </Card>
  );
}
