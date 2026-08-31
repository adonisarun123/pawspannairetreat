import { PageHero } from "@/components/page-hero";
import { WhatsAppGlyph } from "@/components/session-planner";
import {
  CTA,
  Card,
  Container,
  Eyebrow,
  Lede,
  Pending,
  Section,
  Title,
} from "@/components/ui";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { contact, driveTimes, hours, location, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Getting Here",
  description:
    "Directions to Paws Pannai Retreat in Seekanapalli village near Hosur — roughly 45 km from Sarjapur Road and the ORR, 50 km from Electronic City. Map, drive times and parking.",
  path: "/plan-your-visit/getting-here",
});

export default function GettingHerePage() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    location.mapsEmbedQuery,
  )}&output=embed`;

  return (
    <>
      <PageHero
        eyebrow="Plan Your Visit · Getting Here"
        title="Seekanapalli village, near Hosur"
        lede={`About 45 km from Sarjapur Road and the ORR, and roughly 50 km from Electronic City. For most of South, East and South-East Bangalore that is a comfortable morning drive — and the last stretch is farm road, not highway.`}
        crumbs={[
          { name: "Plan Your Visit", path: "/plan-your-visit" },
          { name: "Getting Here", path: "/plan-your-visit/getting-here" },
        ]}
        actions={
          <>
            <CTA href={location.mapsLink} external>
              Open in Google Maps ↗
            </CTA>
            <CTA href="/sessions#plan" tone="outline">
              Book a session
            </CTA>
          </>
        }
      />

      <Section tone="bone">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="overflow-hidden rounded-2xl border border-floor-900/10">
              <iframe
                src={mapSrc}
                title="Map showing Paws Pannai Retreat, Seekanapalli village near Hosur"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[420px] w-full border-0 sm:h-[520px]"
              />
            </div>

            <div className="space-y-6">
              <Card>
                <Eyebrow className="text-canopy-700">Address</Eyebrow>
                <p className="font-display text-xl leading-snug font-semibold">
                  {location.addressLine}
                </p>
                <p className="mt-3 text-sm leading-relaxed opacity-70">
                  Full postal address and PIN: <Pending>to be confirmed</Pending>. Until then, use
                  the map pin — it is accurate to the gate.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <CTA href={location.mapsLink} tone="canopy" external>
                    Directions ↗
                  </CTA>
                </div>
              </Card>

              <Card>
                <Eyebrow className="text-canopy-700">Drive times</Eyebrow>
                <ul className="mt-2 divide-y divide-floor-900/10">
                  {driveTimes.map((d) => (
                    <li key={d.from} className="flex items-baseline justify-between gap-4 py-3">
                      <span className="font-medium">{d.from}</span>
                      <span className="text-sm opacity-70">
                        {d.detail.includes("TODO") ? <Pending>TBC</Pending> : d.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <Eyebrow className="text-canopy-700">On arrival</Eyebrow>
          <Title>The last five minutes</Title>
          <Lede>
            The turn off the main road is the only part people ask about twice. If in doubt, call —
            somebody will talk you in.
          </Lede>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Step
              n="01"
              title="Follow the farm road"
              body="Past the main gate of the farm, the road turns to compacted mud. That is correct — keep going."
            />
            <Step
              n="02"
              title="Look for the yellow arch"
              body="A yellow steel arch reading Paws Pannai Retreat, with PLAY and POOL gates below it. You cannot miss it."
            />
            <Step
              n="03"
              title="Park, then leash up"
              body="Park before the arch. Leash on from the car to the inner gate — the approach is shared with the working farm."
            />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card>
              <h2 className="font-display text-xl font-semibold">Timing your drive</h2>
              <p className="mt-3 leading-relaxed opacity-75">
                Hosur Road builds up badly from mid-morning on weekends. Leaving South Bangalore
                before 8 AM makes the difference between an hour and two. We open at{" "}
                {hours.opensDisplay}, so an early slot is genuinely the best one.
              </p>
            </Card>
            <Card tone="dark">
              <h2 className="font-display text-xl font-semibold">Lost on the last turn?</h2>
              <p className="mt-3 text-sm leading-relaxed opacity-85">
                Message or call. We would much rather talk you in than have you circling a farm
                road with an excited dog in the back.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappLink("Hi! I'm on my way and need help with the last turn.")}
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
            </Card>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Plan Your Visit", path: "/plan-your-visit" },
          { name: "Getting Here", path: "/plan-your-visit/getting-here" },
        ])}
      />
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-floor-900/10 bg-bone-50 p-6">
      <span className="font-display text-sm font-semibold text-mango-500">{n}</span>
      <h3 className="mt-2 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed opacity-75">{body}</p>
    </div>
  );
}
