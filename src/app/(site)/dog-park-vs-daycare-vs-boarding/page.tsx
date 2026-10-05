import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CTA, Card, Container, Eyebrow, Lede, Section, Title } from "@/components/ui";
import { PRIVATE_MIN_DOGS, PRIVATE_RATE, SHARED_RATE, rupees } from "@/lib/pricing";
import { JsonLd, breadcrumbSchema, faqSchemaFrom, pageMeta } from "@/lib/seo";
import { family, hours } from "@/lib/site";

export const metadata = pageMeta({
  title: "Dog park, daycare or boarding — which does your dog need?",
  description:
    "The honest difference between a dog park, dog daycare and boarding kennels, what each is actually for, and which one solves your problem. Paws Pannai is a day-visit dog park near Hosur — not a kennel.",
  path: "/dog-park-vs-daycare-vs-boarding",
});

const faqs = [
  {
    q: "Is Paws Pannai Retreat a boarding kennel?",
    a: "No. It is a day-visit dog park near Hosur, in Tamil Nadu. You stay with your dog for the whole session and take them home afterwards. We do not board dogs overnight, and we do not offer daycare or grooming.",
  },
  {
    q: "What is the difference between a dog park and dog daycare?",
    a: "At a dog park you are present — you book a slot, you are responsible for your dog, and you leave together. At daycare you drop your dog off and staff supervise it, usually alongside other people's dogs, while you are at work. The difference is who is holding the lead, not how big the space is.",
  },
  {
    q: "Can I leave my dog with you for the day and come back later?",
    a: "No. You stay with your dog for the whole session. There is no on-site handler taking custody of dogs, and we would rather say that plainly than imply a supervision service we do not run.",
  },
  {
    q: "Where do I go if I need somewhere for my dog while I travel?",
    a: `You need a boarding kennel or a home boarder, not us. If you want a night on this land with your dog rather than away from it, ${family.bsf.name} is next door through a separate entrance — that is a farmstay you attend together, not boarding.`,
  },
  {
    q: "My dog is reactive around other dogs. Which of the three suits us?",
    a: "A private dog-park booking — the whole park to yourselves, with no other dogs in your slot. Group daycare is usually the wrong answer for a reactive dog, because the whole model depends on dogs sharing space with strangers.",
  },
];

const rows: { need: string; answer: string; why: string }[] = [
  {
    need: "My dog has energy it cannot burn off at home",
    answer: "Dog park",
    why: "Space and terrain, with you there. An hour of open ground does more than three street walks.",
  },
  {
    need: "I am at work all day and my dog is alone",
    answer: "Daycare",
    why: "The point of daycare is supervised custody while you are elsewhere. A dog park cannot solve this — you have to be present.",
  },
  {
    need: "I am travelling and cannot take my dog",
    answer: "Boarding",
    why: "Overnight care in someone else's hands. Look for a kennel or a home boarder, and visit before you book.",
  },
  {
    need: "My dog is reactive and public parks are stressful",
    answer: "Dog park, booked privately",
    why: "A private slot means no unfamiliar dogs. Group daycare is the wrong shape for this dog.",
  },
  {
    need: "My puppy needs safe early experience",
    answer: "Dog park, puppy zone",
    why: "Low-stimulus, separated ground once the vaccination course is complete — not the open run, and not a room of strange adult dogs.",
  },
  {
    need: "I want a weekend away and my dog comes too",
    answer: "Pet-friendly stay",
    why: "Not boarding — you are together. Look for a property that takes dogs properly rather than tolerating them.",
  },
];

export default function ComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Which one do you need?"
        title="Dog park, daycare or boarding?"
        lede="These three get used interchangeably and they solve completely different problems. The difference is not the size of the space — it is who is responsible for your dog, and whether you are there."
        crumbs={[
          { name: "Which one do you need?", path: "/dog-park-vs-daycare-vs-boarding" },
        ]}
        actions={<CTA href="/sessions#plan">Book a session</CTA>}
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="flex flex-col">
              <p className="text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">
                Dog park
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold">You are there</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-80">
                You book a slot, you stay with your dog, you leave together. Nobody takes custody.
                What you are buying is space and terrain — ground a dog cannot get in a city, for a
                set number of hours.
              </p>
              <p className="mt-5 text-sm font-semibold text-canopy-700">This is what we are.</p>
            </Card>

            <Card className="flex flex-col">
              <p className="text-xs font-semibold tracking-[0.14em] text-pool-500 uppercase">
                Daycare
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold">Someone else is there</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-80">
                You drop your dog off and staff supervise it while you work, usually in a group with
                other people&apos;s dogs. What you are buying is supervision and company during
                hours you cannot cover.
              </p>
              <p className="mt-5 text-sm opacity-60">We do not offer this.</p>
            </Card>

            <Card className="flex flex-col">
              <p className="text-xs font-semibold tracking-[0.14em] text-tamarind-600 uppercase">
                Boarding
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold">Overnight, without you</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-80">
                Your dog sleeps somewhere else while you travel — a kennel or a home boarder. What
                you are buying is continuous care over days, which is a genuinely different duty of
                care from either of the above.
              </p>
              <p className="mt-5 text-sm opacity-60">We do not offer this either.</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container width="wide">
          <Eyebrow className="text-canopy-700">Start from the problem</Eyebrow>
          <Title>What are you actually trying to solve?</Title>
          <Lede>
            Most people arrive at the wrong category because they searched for a place rather than
            for a problem. Find your row.
          </Lede>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-floor-900/15">
                  <th className="py-3 pr-6 text-xs font-semibold tracking-[0.14em] uppercase opacity-60">
                    Your situation
                  </th>
                  <th className="py-3 pr-6 text-xs font-semibold tracking-[0.14em] uppercase opacity-60">
                    What you need
                  </th>
                  <th className="py-3 text-xs font-semibold tracking-[0.14em] uppercase opacity-60">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.need} className="border-b border-floor-900/10 align-top">
                    <td className="py-4 pr-6 text-sm font-medium">{r.need}</td>
                    <td className="py-4 pr-6 text-sm font-semibold text-canopy-700">{r.answer}</td>
                    <td className="py-4 text-sm leading-relaxed opacity-75">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">Being specific</Eyebrow>
              <Title>What Paws Pannai is, and is not</Title>
              <Lede>
                Worth stating plainly, because search engines routinely confuse us with boarding and
                grooming businesses in Bangalore whose names also contain &ldquo;Paws&rdquo; and
                &ldquo;Retreat&rdquo;. We are not any of them.
              </Lede>
              <div className="mt-8 space-y-5">
                <div className="border-l-2 border-canopy-600/40 pl-5">
                  <p className="font-display text-lg font-semibold">We are</p>
                  <p className="mt-1 text-sm leading-relaxed opacity-75">
                    A one-acre off-leash dog park with a bone-shaped dog pool, on a working farm at
                    Seekanapalli Village near Hosur, Tamil Nadu. Open {hours.short}. Introductory pricing:
                    shared sessions {rupees(SHARED_RATE)} per dog per hour, private sessions{" "}
                    {rupees(PRIVATE_RATE)} per dog per hour (minimum {PRIVATE_MIN_DOGS} dogs), pool
                    included.
                  </p>
                </div>
                <div className="border-l-2 border-tamarind-300 pl-5">
                  <p className="font-display text-lg font-semibold">We are not</p>
                  <p className="mt-1 text-sm leading-relaxed opacity-75">
                    A boarding kennel, a daycare, a grooming salon, a pet hotel, or a business in
                    Bangalore. We take no custody of dogs and keep none overnight.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <Card tone="dark">
                <h2 className="font-display text-lg font-semibold">
                  If you want a night on this land
                </h2>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  {family.bsf.name} is next door through a separate entrance — a farmstay you attend
                  with your dog, not boarding. Every day visitor gets 15% off a night there.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/stay-at-bsf" className="font-semibold underline underline-offset-4">
                    Stay + Play bundle →
                  </Link>
                </p>
              </Card>
              <Card>
                <h2 className="font-display text-lg font-semibold">
                  Choosing a boarder or daycare well
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm leading-relaxed opacity-80">
                  <li>Visit unannounced before you book, and look at where dogs sleep.</li>
                  <li>Ask how many dogs one handler is responsible for at once.</li>
                  <li>Ask what happens when two dogs fall out, and listen for a real answer.</li>
                  <li>Ask which vet they use and how far away it is.</li>
                  <li>Check they ask you as many questions as you ask them.</li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container width="narrow">
          <Eyebrow className="text-canopy-700">Questions</Eyebrow>
          <Title size="md">The ones we get asked most</Title>
          <dl className="mt-8 divide-y divide-floor-900/10">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-lg font-semibold">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed opacity-80">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <CTA href="/sessions#plan">Book a session</CTA>
            <CTA href="/plan-your-visit/faq" tone="outline">
              Full FAQ
            </CTA>
          </div>
        </Container>
      </Section>

      <JsonLd data={faqSchemaFrom(faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Which one do you need?", path: "/dog-park-vs-daycare-vs-boarding" },
        ])}
      />
    </>
  );
}
