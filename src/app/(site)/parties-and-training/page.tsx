import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { CTA, Card, Container, Eyebrow, Lede, Section, Title } from "@/components/ui";
import { JsonLd, breadcrumbSchema, extraServicesSchema, pageMeta } from "@/lib/seo";
import { facts } from "@/lib/site";

export const metadata = pageMeta({
  title: "Parties & Training",
  description:
    "Dog birthday parties and private events on a farm near Hosur, plus training, behaviour and grooming booked alongside a session. Enquire on WhatsApp.",
  path: "/parties-and-training",
});

export default function PartiesAndTrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Parties & Training"
        title="Two reasons to book the farm for more than an hour"
        lede="A birthday takes the whole place. Training takes a trainer and a plan. Both are booked the same way — tell us what you want and we'll come back with dates and a number."
        crumbs={[{ name: "Parties & Training", path: "/parties-and-training" }]}
        actions={
          <>
            <CTA href="#birthday">Birthday &amp; events</CTA>
            <CTA href="#training" tone="outline">
              Training &amp; grooming
            </CTA>
          </>
        }
      />

      {/* -------------------------------------------------------- birthday */}
      <Section id="birthday" tone="bone">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow className="text-mango-500">Birthdays &amp; private events</Eyebrow>
              <Title>Book the acre</Title>
              <Lede>
                A half-day venue block: the park, the tyre trail, the pool and Tyre Cafe, with
                nobody else booked in. {facts.acres} acre is a very different party from a
                function room, and the dogs notice first.
              </Lede>

              <div className="mt-9 space-y-5">
                <Line
                  title="What a block includes"
                  body="Exclusive use of the park for your window, the pool, cafe access, parking, and space for humans to sit down. Decoration, cake and photography are yours to arrange — we'll tell you where they work best."
                />
                <Line
                  title="Capacity"
                  body="Sized to the crew rather than a fixed headcount. Tell us how many dogs and how many people and we'll say honestly whether it fits."
                />
                <Line
                  title="How it's priced"
                  body="A flat venue rate plus a per-head and per-dog add-on, in two or three tiers. The numbers are being finalised — ask and we'll quote you for your date."
                />
              </div>

              <div className="mt-9">
                <CTA href="/parties-and-training/birthday-parties" tone="canopy">
                  More on birthday parties
                </CTA>
              </div>
            </div>

            <EnquiryForm
              id="birthday-enquiry"
              title="Enquire about a party"
              intro="Send the shape of the day and we'll come back with availability and a quote."
              subject="I'd like to enquire about a birthday or private event."
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
                  label: "What are you planning?",
                  type: "textarea",
                  placeholder: "Birthday for a 3-year-old beagle, cake, about 12 people…",
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- training */}
      <Section id="training">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow className="text-canopy-700">Training, behaviour &amp; grooming</Eyebrow>
              <Title>An add-on, by appointment, on weekends</Title>
              <Lede>
                Booked alongside a session rather than instead of one. A trainer works with you and
                your dog on the ground your dog is already enjoying — which is a considerably
                better classroom than a hall.
              </Lede>

              <div className="mt-9 space-y-5">
                <Line
                  title="When"
                  body="Weekends only, by prior appointment or on request. Not a drop-in service."
                />
                <Line
                  title="How it's sold"
                  body="A stand-alone paid add-on booked next to a session. Never folded into the entry price."
                />
                <Line
                  title="Who runs it"
                  body="A trainer has agreed to work with us on this basis. We're not putting a name or a rate on the site until the terms are signed — when they are, this section gets both."
                />
                <Line
                  title="Grooming"
                  body="Available on the same weekend-appointment basis. Useful timing: a wash after the pool rather than before it."
                />
              </div>
            </div>

            <EnquiryForm
              id="training-enquiry"
              title="Ask about training or grooming"
              intro="Tell us what you're working on and which weekend suits."
              subject="I'd like to ask about a training, behaviour or grooming add-on."
              fields={[
                { name: "name", label: "Your name", autoComplete: "name" },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                {
                  name: "service",
                  label: "What do you need",
                  type: "select",
                  options: [
                    "Training session",
                    "Behaviour consultation",
                    "Grooming",
                    "Not sure — advise me",
                  ],
                },
                { name: "date", label: "Weekend you'd like", type: "date" },
                { name: "dog", label: "Your dog — breed and age" },
                {
                  name: "notes",
                  label: "What are you working on?",
                  type: "textarea",
                  placeholder: "Pulls hard on leash, nervous around bigger dogs, poor recall…",
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="paper" size="tight">
        <Container width="narrow">
          <Card tone="dark">
            <h2 className="font-display text-xl font-semibold">
              One thing we won&apos;t drift into
            </h2>
            <p className="mt-3 text-sm leading-relaxed opacity-80">
              Boarding. Training and grooming stay add-ons to a day here, not the start of a
              full-service kennel. If you want a night on this land, it happens next door at the
              farmstay — which is a better answer than a kennel anyway.
            </p>
            <div className="mt-6">
              <CTA href="/stay-at-bsf" tone="light">
                Overnight stays
              </CTA>
            </div>
          </Card>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Parties & Training", path: "/parties-and-training" },
        ])}
      />
      <JsonLd data={extraServicesSchema()} />
    </>
  );
}

function Line({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-canopy-600/40 pl-5">
      <p className="font-display text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-relaxed opacity-75">{body}</p>
    </div>
  );
}
