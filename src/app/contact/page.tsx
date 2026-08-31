import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { WhatsAppGlyph } from "@/components/session-planner";
import { CTA, Card, Container, Eyebrow, Section } from "@/components/ui";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { contact, family, hours, location, whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Reach Paws Pannai Retreat near Hosur on WhatsApp, phone or email. Open 8:00 AM to 7:30 PM daily, in Seekanapalli village.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a person"
        lede="WhatsApp is fastest and it's where bookings get confirmed. Phone works during opening hours. Email is fine for anything that isn't urgent."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <Section tone="bone">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div className="space-y-5">
              <Card>
                <Eyebrow className="text-canopy-700">Fastest</Eyebrow>
                <h2 className="font-display text-xl font-semibold">WhatsApp</h2>
                <p className="mt-2 text-sm leading-relaxed opacity-75">
                  Bookings, questions, and &quot;we&apos;re at the last turn and lost&quot;. Usually
                  answered the same day within opening hours.
                </p>
                <a
                  href={whatsappLink("Hi Paws Pannai!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-mango-400 px-6 py-3 text-sm font-semibold text-floor-900 transition-colors hover:bg-mango-300"
                >
                  <WhatsAppGlyph className="h-4 w-4" />
                  {contact.whatsappDisplay}
                </a>
              </Card>

              <Card>
                <Eyebrow className="text-canopy-700">Phone &amp; email</Eyebrow>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="opacity-60">Phone</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`tel:${contact.phone}`}
                        className="font-medium underline underline-offset-4"
                      >
                        {contact.phoneDisplay}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="opacity-60">Email</dt>
                    <dd className="mt-0.5">
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-medium underline underline-offset-4"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="opacity-60">Instagram</dt>
                    <dd className="mt-0.5">
                      <a
                        href={contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-4"
                      >
                        Follow the build ↗
                      </a>
                    </dd>
                  </div>
                </dl>
              </Card>

              <Card>
                <Eyebrow className="text-canopy-700">Where &amp; when</Eyebrow>
                <p className="text-sm leading-relaxed opacity-80">{location.addressLine}</p>
                <p className="mt-2 text-sm leading-relaxed opacity-80">Open {hours.display}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <CTA href="/plan-your-visit/getting-here" tone="canopy">
                    Directions
                  </CTA>
                  <CTA href={location.mapsLink} tone="outline" external>
                    Maps ↗
                  </CTA>
                </div>
              </Card>

              <Card tone="dark">
                <h2 className="font-display text-lg font-semibold">Staying overnight?</h2>
                <p className="mt-2 text-sm leading-relaxed opacity-80">
                  {family.bsf.name} handles its own bookings next door.
                </p>
                <div className="mt-5">
                  <CTA href="/stay-at-bsf" tone="light">
                    Stay at {family.bsf.abbr}
                  </CTA>
                </div>
              </Card>
            </div>

            <EnquiryForm
              title="Send us a message"
              intro="Fill this in and it opens as a ready-written WhatsApp message — or send it as an email instead."
              subject="I have a question about Paws Pannai."
              fields={[
                { name: "name", label: "Your name", autoComplete: "name" },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
                { name: "email", label: "Email", type: "email", autoComplete: "email" },
                {
                  name: "topic",
                  label: "What's this about",
                  type: "select",
                  options: [
                    "Booking a session",
                    "Birthday or private event",
                    "Training or grooming",
                    "Staying at BSF",
                    "Something else",
                  ],
                },
                {
                  name: "message",
                  label: "Your message",
                  type: "textarea",
                  placeholder: "Tell us what you need…",
                },
              ]}
            />
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
