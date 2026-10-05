import { Figure } from "@/components/figure";
import { LaunchCountdown } from "@/components/launch-countdown";
import { RsvpForm } from "@/components/rsvp-form";
import { Card, Container, Eyebrow, Lede, Section, Title } from "@/components/ui";
import { media } from "@/lib/media";
import { pageMeta } from "@/lib/seo";
import { contact, launch, location } from "@/lib/site";

/**
 * Invite-only launch page. Shared directly with invitees — kept out of search
 * (noindex), the sitemap and the navigation on purpose.
 */
const base = pageMeta({
  title: "You're invited — the Paws Pannai launch",
  description: `An invite-only inauguration for dog parents at Paws Pannai Retreat. ${launch.dateDisplay}, ${launch.timeDisplay}. Food included.`,
  path: "/invite",
  noIndex: true,
});
export const metadata = { ...base, robots: { index: false, follow: false } };

const details = [
  { label: "Date", value: launch.dateDisplay },
  { label: "Time", value: launch.timeDisplay },
  { label: "Food", value: "Included for all invited guests" },
  { label: "Entry", value: "By invitation — please RSVP" },
];

const highlights = [
  {
    title: "The inauguration",
    text: "Be there as we open the gates to Paws Pannai for the very first time.",
  },
  {
    title: "First run of the park",
    text: "Your dog gets the first go on the tyre trail, Tyre Hill and the fenced play zone.",
  },
  {
    title: "Food on us",
    text: "Food is part of the celebration — just come hungry.",
  },
  {
    title: "Meet the pack",
    text: "Meet fellow dog parents under the mango and tamarind shade.",
  },
];

function RsvpButton({ className = "" }: { className?: string }) {
  return (
    <a
      href="#rsvp"
      className={`inline-flex items-center gap-2 rounded-full bg-mango-400 px-8 py-4 text-base font-semibold text-floor-900 shadow-sm transition-colors hover:bg-mango-300 ${className}`}
    >
      RSVP now ↓
    </a>
  );
}

export default function InvitePage() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <Section tone="floor" size="tight" className="pt-10 sm:pt-14">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow className="text-mango-300">Invite-only · {launch.dateDisplay}</Eyebrow>
              <p className="font-display text-lg italic opacity-80 sm:text-xl">
                Dear dog parent, you&apos;re invited to
              </p>
              <Title as="h1" size="xl" className="mt-2 max-w-2xl">
                The launch of <span className="text-mango-400">Paws Pannai</span>
              </Title>
              <Lede>
                {launch.timeDisplay} at the park in {location.village}, near Hosur. Food included.
                Bring your dog.
              </Lede>

              <div className="mt-8 max-w-md">
                <LaunchCountdown startsAt={launch.startsAt} />
              </div>

              <div className="mt-8">
                <RsvpButton />
                <p className="mt-4 text-sm opacity-70">
                  Entry is by invitation only. Please RSVP so we can plan for you and your dog.
                </p>
              </div>
            </div>

            <Figure
              slot={media.entranceArch}
              priority
              ratio="4 / 5"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- details */}
      <Section tone="paper" size="tight">
        <Container width="wide">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {details.map((d) => (
              <div key={d.label} className="border-l-2 border-mango-400 pl-4">
                <dt className="text-xs font-semibold tracking-[0.14em] uppercase opacity-60">
                  {d.label}
                </dt>
                <dd className="mt-1 font-medium">{d.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ---------------------------------------------------- what to expect */}
      <Section tone="bone">
        <Container width="wide">
          <div className="max-w-2xl">
            <Eyebrow className="text-canopy-700">What to expect</Eyebrow>
            <Title>A day for dogs and their people</Title>
            <Lede>
              We&apos;re inviting a small circle of dog parents to our inauguration — and we&apos;d
              love you and your dog to be among the first through the gates.
            </Lede>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h) => (
              <Card key={h.title}>
                <h3 className="font-display text-xl font-semibold">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-75">{h.text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Figure slot={media.tyreHill} ratio="4 / 3" sizes="(min-width: 640px) 50vw, 100vw" />
            <Figure
              slot={media.fencedPlayZone}
              ratio="4 / 3"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------- getting there */}
      <Section tone="paper">
        <Container width="narrow">
          <Eyebrow className="text-canopy-700">Getting there</Eyebrow>
          <Title size="md">{location.fullAddress}</Title>
          <p className="mt-4 text-sm opacity-75">
            Plus Code <strong className="font-semibold">{location.plusCode}</strong> — rural
            addresses route badly, so give your driver this or the map pin.
          </p>
          <a
            href={location.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-current/30 px-6 py-3 text-sm font-semibold transition-colors hover:border-current/60 hover:bg-current/5"
          >
            Open in Google Maps ↗
          </a>
        </Container>
      </Section>

      {/* --------------------------------------------------------- closing */}
      <Section tone="canopy" size="tight" id="rsvp" className="scroll-mt-24">
        <Container width="narrow">
          <div className="text-center">
            <Title size="md">Save your spot</Title>
            <p className="mx-auto mt-4 max-w-xl opacity-85">
              Tell us who&apos;s coming — you, your family and your dogs — so we can get the food and
              the park ready.
            </p>
          </div>
          <div className="relative mt-8">
            <RsvpForm whatsappNumber={contact.rsvpWhatsapp} eventLabel="10 October 2026" />
          </div>
        </Container>
      </Section>
    </>
  );
}
