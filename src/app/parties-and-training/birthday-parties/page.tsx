import { EnquiryForm } from "@/components/enquiry-form";
import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import { Card, Container, Eyebrow, Lede, Section, Title } from "@/components/ui";
import { media } from "@/lib/media";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { facts, hours } from "@/lib/site";

export const metadata = pageMeta({
  title: "Dog Birthday Parties",
  description:
    "Book a one-acre farm near Hosur for your dog's birthday — exclusive use of the park, the tyre trail, the bone-shaped pool and Tyre Cafe, in a half-day block.",
  path: "/parties-and-training/birthday-parties",
});

const runOfDay = [
  {
    time: "First 20 minutes",
    what: "Arrivals and sniffing. Dogs meet on neutral ground before anything else starts, which is the difference between a party and a scrap.",
  },
  {
    time: "The run",
    what: "Open acre and the tyre trail. This is where the photographs come from, and where the cake gets earned.",
  },
  {
    time: "Pool",
    what: "Best placed after the run, not before. Wet dogs are calm dogs, and calm dogs sit still for cake.",
  },
  {
    time: "Cafe and cake",
    what: "Humans at Tyre Cafe, dogs in the shade. Bring the cake; we'll point you at the table with the best light.",
  },
  {
    time: "Wind down",
    what: "Rinse-off, towels, and a slow walk to the cars. Nobody is rushed out at the end of a block.",
  },
];

export default function BirthdayPartiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Parties & Training · Birthdays"
        title="A birthday your dog actually understands"
        lede={`A half-day block with the whole acre to yourselves — the tyre trail, the ${facts.poolSqFt.toLocaleString("en-IN")} sq ft pool, the cafe and the shade. No other bookings, no sharing the run with strangers' dogs.`}
        crumbs={[
          { name: "Parties & Training", path: "/parties-and-training" },
          { name: "Birthday Parties", path: "/parties-and-training/birthday-parties" },
        ]}
      />

      <Section tone="bone" size="tight">
        <Container width="wide">
          <div className="grid gap-5 sm:grid-cols-3">
            <Figure slot={media.tyreHill} sizes="(min-width: 640px) 33vw, 100vw" />
            <Figure slot={media.bonePool} sizes="(min-width: 640px) 33vw, 100vw" />
            <Figure slot={media.tyreCafe} sizes="(min-width: 640px) 33vw, 100vw" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow className="text-mango-500">How the day runs</Eyebrow>
              <Title>A shape that works, not a schedule you must follow</Title>
              <Lede>
                You can run the block however you like. This is simply the order that has worked
                best on this land.
              </Lede>
              <ol className="mt-9 space-y-6">
                {runOfDay.map((r, i) => (
                  <li key={r.time} className="flex gap-5">
                    <span className="mt-1 font-display text-sm font-semibold text-mango-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-display text-lg font-semibold">{r.time}</p>
                      <p className="mt-1 text-sm leading-relaxed opacity-75">{r.what}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-6">
              <Card>
                <h2 className="font-display text-xl font-semibold">What&apos;s included</h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed opacity-80">
                  <li>Exclusive use of the park for your block — no other bookings</li>
                  <li>The tyre play trail and all twelve installations</li>
                  <li>The bone-shaped pool, with rinse-off</li>
                  <li>Tyre Cafe seating and shade for the humans</li>
                  <li>Parking, bins, and a team on site</li>
                </ul>
              </Card>

              <Card>
                <h2 className="font-display text-xl font-semibold">What you bring</h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed opacity-80">
                  <li>Cake, decoration and any photography</li>
                  <li>Towels, if you&apos;re using the pool</li>
                  <li>Vaccination cards for any dog visiting for the first time</li>
                  <li>An honest heads-up about any dog that doesn&apos;t like company</li>
                </ul>
              </Card>

              <Card tone="dark">
                <h2 className="font-display text-lg font-semibold">Pricing</h2>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  A flat venue rate for the block, plus a per-head and per-dog add-on, in two or
                  three tiers. The numbers are being finalised — send us your date and headcount
                  and we&apos;ll quote it properly rather than guess at a range.
                </p>
                <p className="mt-3 text-sm leading-relaxed opacity-80">
                  Blocks sit inside opening hours, {hours.display}.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container width="wide">
          <EnquiryForm
            title="Tell us about the party"
            intro="Date, headcount and what you're picturing. We'll come back with availability and a quote."
            subject="I'd like to book a birthday party at Paws Pannai."
            fields={[
              { name: "name", label: "Your name", autoComplete: "name" },
              { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
              { name: "date", label: "Preferred date", type: "date" },
              {
                name: "window",
                label: "Time of day",
                type: "select",
                options: ["Morning", "Midday", "Afternoon", "Flexible"],
              },
              { name: "dogs", label: "How many dogs", type: "number" },
              { name: "people", label: "How many people", type: "number" },
              {
                name: "pool",
                label: "Pool?",
                type: "select",
                options: ["Yes, include the pool", "No pool", "Not sure yet"],
              },
              {
                name: "notes",
                label: "Anything else",
                type: "textarea",
                placeholder: "Whose birthday, any nervous dogs, cake delivery timing…",
              },
            ]}
          />
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Parties & Training", path: "/parties-and-training" },
          { name: "Birthday Parties", path: "/parties-and-training/birthday-parties" },
        ])}
      />
    </>
  );
}
