import { PageHero } from "@/components/page-hero";
import { Card, Container, Eyebrow, Pending, Section } from "@/components/ui";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { contact, family, hours, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Policies",
  description:
    "Booking, cancellation, vaccination, liability and privacy policies for Paws Pannai Retreat.",
  path: "/policies",
});

const sections = [
  {
    id: "booking",
    title: "Booking & confirmation",
    body: [
      "A session is requested through WhatsApp, email or the enquiry forms on this site. It is not confirmed until we reply and confirm the slot against the day's calendar.",
      `All sessions run inside opening hours, ${hours.display}. The last session must finish by ${hours.closesDisplay}.`,
      "A crew may book a maximum of four continuous hours in one sitting. Booking a fresh block after a break is fine.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation & rescheduling",
    body: [
      "Move or cancel free of charge up to 24 hours before your slot. Message us on WhatsApp.",
      "Inside 24 hours we will still do our best to move you, but a same-day no-show means the slot went unused. Please tell us either way.",
      "If weather makes the ground genuinely unsafe, we will contact you before you set out and move your booking to another date at no cost.",
    ],
  },
  {
    id: "vaccination",
    title: "Vaccination & health",
    body: [
      "Every dog must have current core vaccinations and anti-rabies. Bring the vaccination card, or a clear photo of it, on your first visit; we record it once.",
      "Please do not bring a dog that is unwell, in season, or within a fortnight of a live vaccination.",
      "Puppies that are not fully vaccinated should not be in the open park. Use the Puppy Play Area and tell us in advance.",
    ],
  },
  {
    id: "conduct",
    title: "Behaviour, temperament & liability",
    body: [
      "We do not turn dogs away by breed. We do require you to tell us honestly if your dog is reactive or has bitten before, so the netted zone can be made ready.",
      "Dogs remain under the care and control of their owner at all times, including at the pool. There is no on-site handler and no lifeguard.",
      "Shared sessions mix dogs from different families, with never more than 10 dogs in the park at once. Dogs must be vaccinated and friendly; a dog showing aggression will be asked to take a break or leave the shared park. Private sessions have no other dogs.",
      "You are responsible for any injury or damage caused by your dog while on the property.",
    ],
  },
  {
    id: "pool",
    title: "Pool use",
    body: [
      "The pool is included with every session and is used under owner supervision. Dogs come out after 15 minutes in the water and rest before going back in. Enter and leave through the marked graded entry.",
      "Bring your own towel. Rinse your dog at the exit point before returning to the park or your vehicle.",
      "Children are not permitted in the pool while dogs are swimming.",
    ],
  },
  {
    id: "children",
    title: "Children on site",
    body: [
      "Children are welcome and must remain with a responsible adult throughout, including at Tyre Cafe and the tyre installations.",
      "The play elements were built for dogs. Children use them at their own risk and under adult supervision.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: [
      "We collect only what you send us — your name, phone number, email if you provide it, and details about your dog — and we use it to confirm and run your booking.",
      "Vaccination records are held so that repeat visits are quicker, and are not shared outside the property.",
      "We do not sell or rent personal information. Photographs taken on site may be used on this website or social media; tell us if you would rather not appear and we will not use the image.",
    ],
  },
  {
    id: "media",
    title: "Photography",
    body: [
      "Take as many photographs of your own dog as you like.",
      "If our team photographs the park while you are visiting and you would prefer not to be included, say so at the gate — that is the whole process.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Policies"
        title="The rules of the arrangement, in plain English"
        lede="Short, readable, and written to be understood rather than to be unenforceable. If something here is unclear, ask and we will fix the wording."
        crumbs={[{ name: "Policies", path: "/policies" }]}
      />

      <Section tone="bone">
        <Container width="default">
          <Card className="mb-8 border-tamarind-300 bg-tamarind-100/50">
            <p className="text-sm leading-relaxed">
              <Pending>Legal review pending.</Pending> These are working drafts written from
              operating practice. They should be reviewed and signed off by {family.company} — and
              by a lawyer for the liability and privacy sections — before launch.
            </p>
          </Card>

          <nav aria-label="On this page" className="mb-10">
            <ul className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-block rounded-full border border-floor-900/20 px-4 py-1.5 text-sm hover:bg-floor-900/5"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="font-display text-2xl font-semibold">{s.title}</h2>
                <div className="mt-4 space-y-3 leading-relaxed opacity-85">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-floor-900/12 pt-8">
            <Eyebrow className="text-canopy-700">Questions about any of this</Eyebrow>
            <p className="text-sm leading-relaxed opacity-80">
              Write to{" "}
              <a
                href={`mailto:${contact.email}`}
                className="underline underline-offset-4"
              >
                {contact.email}
              </a>
              . {site.name} is operated by {family.company}.
            </p>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Policies", path: "/policies" },
        ])}
      />
    </>
  );
}
