import { Figure } from "./figure";
import { CTA, Container, Eyebrow, Title } from "./ui";
import { media } from "@/lib/media";
import { family } from "@/lib/site";

/**
 * IA §06 — the day-trip-to-stay engine. Two concrete hooks, not a soft
 * invitation: 2 complimentary hours + pool with every BSF night, and 15% off
 * that night's tariff for every PPR day visitor.
 */
export function BsfBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-floor-900 text-bone-100 dapple">
      <Container width="wide">
        <div className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow className="text-mango-300">Staying over?</Eyebrow>
            <Title size={compact ? "md" : "lg"}>
              Turn your day out into a weekend away
            </Title>
            <p className="mt-5 max-w-xl text-lg leading-relaxed opacity-85">
              {family.bsf.name} is on the same land, through a separate entrance. Book a night
              there and the park comes with it.
            </p>

            <ul className="mt-8 space-y-4">
              <Hook
                headline="2 hours in the park, plus the pool — free"
                body="Complimentary with every BSF stay. Not a fixed slot: the front desk fits you around the day's bookings rather than the other way round."
              />
              <Hook
                headline="15% off your next BSF or SSEK night"
                body="Every Paws Pannai day visitor gets it — an introductory offer across the group, including SSEK in Kanha."
              />
            </ul>

            <div className="mt-9 flex flex-wrap gap-3">
              <CTA href="/stay-at-bsf">How the bundle works</CTA>
              <CTA href={family.bsf.bookingUrl} tone="outline" external>
                Book a night at BSF ↗
              </CTA>
            </div>
          </div>

          <Figure
            slot={media.bsfStay}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="lg:order-last"
          />
        </div>
      </Container>
    </section>
  );
}

function Hook({ headline, body }: { headline: string; body: string }) {
  return (
    <li className="border-l-2 border-mango-400 pl-5">
      <p className="font-display text-lg font-semibold">{headline}</p>
      <p className="mt-1.5 text-sm leading-relaxed opacity-75">{body}</p>
    </li>
  );
}
