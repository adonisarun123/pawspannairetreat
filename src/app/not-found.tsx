import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CTA, Container, Section, Title } from "@/components/ui";

export default function NotFound() {
  return (
    <>
    <SiteHeader />
    <main id="main">
    <Section tone="paper" size="loose">
      <Container width="narrow">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">
            404
          </p>
          <Title as="h1" size="lg" className="mt-4">
            This one ran off the trail
          </Title>
          <p className="mx-auto mt-5 max-w-lg leading-relaxed opacity-75">
            The page you were after isn&apos;t here. The park, the pricing and the pool all still
            are.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CTA href="/">Back to the farm</CTA>
            <CTA href="/sessions#plan" tone="outline">
              Book a session
            </CTA>
          </div>
        </div>
      </Container>
    </Section>
    </main>
    <SiteFooter />
    </>
  );
}
