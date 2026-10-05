import { PageHero } from "@/components/page-hero";
import { CTA, Card, Container, Eyebrow, Section } from "@/components/ui";
import { parkRules } from "@/lib/content";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { hours } from "@/lib/site";

export const metadata = pageMeta({
  title: "Park Rules",
  description:
    "The rules at Paws Pannai Retreat and the reason behind each one — leash to the gate, ten dogs at most, 15-minute swims, no outside toys or food, vaccination proof on the first visit.",
  path: "/plan-your-visit/park-rules",
});

export default function ParkRulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan Your Visit · Park Rules"
        title="Nine rules, and why each one exists"
        lede="A rule without a reason is just a sign. These are the ones that keep a farm full of unfamiliar dogs from becoming a bad afternoon."
        crumbs={[
          { name: "Plan Your Visit", path: "/plan-your-visit" },
          { name: "Park Rules", path: "/plan-your-visit/park-rules" },
        ]}
      />

      <Section tone="bone">
        <Container width="default">
          <ol className="space-y-5">
            {parkRules.map((r, i) => (
              <li key={r.rule}>
                <Card className="flex gap-5">
                  <span className="font-display text-xl font-semibold text-mango-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{r.rule}</h2>
                    <p className="mt-2 leading-relaxed opacity-75">{r.why}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container width="default">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card tone="dark">
              <Eyebrow className="text-mango-300">The one we won&apos;t bend</Eyebrow>
              <h2 className="font-display text-xl font-semibold">Ten dogs, friendly dogs</h2>
              <p className="mt-3 text-sm leading-relaxed opacity-85">
                Never more than 10 dogs in the park at once. Shared sessions are for vaccinated,
                friendly dogs, and you stay with yours the whole time. A dog showing aggression is
                asked to take a break or leave the shared park. If your dog is reactive, book the
                park privately — no other dogs in your slot.
              </p>
            </Card>
            <Card>
              <Eyebrow className="text-canopy-700">Timing</Eyebrow>
              <h2 className="font-display text-xl font-semibold">Sessions end by 6:00 PM</h2>
              <p className="mt-3 text-sm leading-relaxed opacity-75">
                We&apos;re open {hours.display}. The farm has no floodlighting, deliberately — the
                last session is sized so nobody is asked to leave in the middle of play.
              </p>
              <div className="mt-6">
                <CTA href="/sessions#plan" tone="canopy">
                  Book a session
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
          { name: "Park Rules", path: "/plan-your-visit/park-rules" },
        ])}
      />
    </>
  );
}
