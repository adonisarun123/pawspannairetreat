import { PageHero } from "@/components/page-hero";
import { WhatsAppGlyph } from "@/components/session-planner";
import { CTA, Container, Section, Title } from "@/components/ui";
import { faqs } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";

export const metadata = pageMeta({
  title: "FAQ",
  description:
    "Answers about visiting Paws Pannai Retreat near Hosur — hours, vaccination proof, whether dogs are mixed, breed policy, the pool add-on, kids, weather and cancellations.",
  path: "/plan-your-visit/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Plan Your Visit · FAQ"
        title="Questions people actually ask"
        lede="Written the way we'd answer them on WhatsApp, which is where most of them arrive."
        crumbs={[
          { name: "Plan Your Visit", path: "/plan-your-visit" },
          { name: "FAQ", path: "/plan-your-visit/faq" },
        ]}
      />

      <Section tone="bone">
        <Container width="default">
          <div className="divide-y divide-floor-900/10 border-y border-floor-900/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <h2 className="font-display text-lg font-semibold sm:text-xl">{f.q}</h2>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-2xl leading-none opacity-40 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl pr-10 leading-relaxed opacity-80">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="floor" size="tight">
        <Container width="narrow">
          <div className="text-center">
            <Title size="md">Not answered here?</Title>
            <p className="mx-auto mt-4 max-w-lg leading-relaxed opacity-85">
              Send the question. If enough people ask it, it ends up on this page.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink("Hi! I have a question that isn't on your FAQ page.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-mango-400 px-6 py-3 text-sm font-semibold text-floor-900 transition-colors hover:bg-mango-300"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                Ask on WhatsApp
              </a>
              <CTA href="/sessions#plan" tone="outline">
                Book a session
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
          { name: "FAQ", path: "/plan-your-visit/faq" },
        ])}
      />
    </>
  );
}
