import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import {
  CTA,
  Card,
  Container,
  Eyebrow,
  Lede,
  Section,
  Stat,
  Title,
} from "@/components/ui";
import { ecoCredentials } from "@/lib/content";
import { media } from "@/lib/media";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";
import { facts, family } from "@/lib/site";

export const metadata = pageMeta({
  title: "Our Story",
  description:
    "How an acre of farmland near Hosur became India's first play landscape built from upcycled tyres — 2,950 kg of them — with solar, a bio-digester, rainwater harvesting and a Miyawaki forest.",
  path: "/our-story",
});

export default function OurStoryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Pannai is Tamil for farm. We took that literally."
        lede="Everything here started as something else — a bare acre, a pile of dead tyres, a family farm that had never had a dog on it. None of that is a marketing story. It is just what happened, in order."
        crumbs={[{ name: "Our Story", path: "/our-story" }]}
        actions={
          <>
            <CTA href="/the-park">See what it became</CTA>
            <CTA href="/our-story/the-wider-farm" tone="outline">
              The wider farm
            </CTA>
          </>
        }
      />

      {/* ------------------------------------------------------------- land */}
      <Section id="the-land" tone="bone">
        <Container width="wide">
          <Eyebrow className="text-canopy-700">The land</Eyebrow>
          <Title>Before, and after</Title>
          <Lede>
            The mango and tamarind were already here — you cannot install thirty years of canopy.
            Everything under them is new.
          </Lede>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Figure slot={media.landBefore} sizes="(min-width: 640px) 50vw, 100vw" showCaption />
            <Figure slot={media.landAfter} sizes="(min-width: 640px) 50vw, 100vw" showCaption />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- upcycling */}
      <Section id="upcycling" tone="floor">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow className="text-mango-300">The upcycling story</Eyebrow>
              <Title>
                {facts.tyresSavedKg.toLocaleString("en-IN")} kg of tyres that were going to be
                burned
              </Title>
              <Lede className="opacity-90">
                India generates more end-of-life tyres than it knows what to do with. Most are
                burned or buried. We took {facts.tyresSavedKg.toLocaleString("en-IN")} kg of them,
                cut them, painted them and set them into the ground as{" "}
                {facts.tyreElements} play installations — the first play landscape of its kind in
                the country.
              </Lede>
              <p className="mt-6 leading-relaxed opacity-80">
                The blue and yellow isn&apos;t a mood board. Those are the two colours a dog sees
                most clearly — so the park is legible to the animal using it, which is not a claim
                most playgrounds can make.
              </p>
              <div className="mt-9 grid gap-6 sm:grid-cols-2">
                <Stat
                  value={facts.tyreElements}
                  label="installations, from Traverse Tyres to the Bamboo Hurdle"
                />
                <Stat value="First in India" label="a play landscape built this way" />
              </div>
            </div>
            <Figure slot={media.tyreJumpThrough} sizes="(min-width: 1024px) 45vw, 100vw" showCaption />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ dog's senses */}
      <Section>
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Eyebrow className="text-pool-500">Built for a dog&apos;s real senses</Eyebrow>
              <Title>The colours are for the dog, not the photo</Title>
              <p className="mt-5 leading-relaxed opacity-80">
                Dogs are not colour-blind, but they are dichromats: they see blues and yellows
                clearly and struggle to separate reds and greens. Paint a jump red on green grass
                and the dog is working from shape and shadow alone. Paint it blue or gold and it
                simply sees it.
              </p>
              <p className="mt-4 leading-relaxed opacity-80">
                That single fact set the palette of the entire park — the gate, the trail, the
                bunting on the boundary fence. The green and red pairing you&apos;ll see on some
                fenced zones is for the humans, and it&apos;s used where the dog doesn&apos;t need
                to read anything.
              </p>
            </div>
            <Card tone="dark" className="self-start">
              <h3 className="font-display text-lg font-semibold">Two facts worth a paragraph</h3>
              <ul className="mt-4 space-y-4 text-sm leading-relaxed opacity-85">
                <li>
                  <strong className="font-semibold">Dogs see blue and yellow most clearly.</strong>{" "}
                  That is why the rides are painted blue and gold, and not why they look cheerful.
                </li>
                <li>
                  <strong className="font-semibold">&quot;Pannai&quot; is Tamil for farm.</strong>{" "}
                  The name grounds this in one specific acre in Seekanapalli, not in a brand
                  concept that could be anywhere.
                </li>
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------------- eco */}
      <Section id="eco" tone="canopy">
        <Container width="wide">
          <Eyebrow className="text-mango-300">Eco credentials</Eyebrow>
          <Title>What the farm does when nobody&apos;s visiting</Title>
          <Lede className="opacity-90">
            None of this was built for a website. It was built because running a farm badly is
            expensive.
          </Lede>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecoCredentials.map((e) => (
              <div key={e.title} className="border-l-2 border-mango-400 pl-5">
                <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed opacity-85">{e.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ wider farm */}
      <Section tone="paper">
        <Container width="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Figure slot={media.farmWalk} sizes="(min-width: 1024px) 50vw, 100vw" />
            <div>
              <Eyebrow className="text-canopy-700">The wider farm</Eyebrow>
              <Title>
                The park is one acre of {facts.wideFarmAcres}
              </Title>
              <Lede>
                {facts.wideFarmName} runs to {facts.wideFarmAcres} acres of mud roads, mango and
                tamarind swathes. It is open to every visitor for long-leash walks — not reserved
                for overnight guests.
              </Lede>
              <div className="mt-8 flex flex-wrap gap-3">
                <CTA href="/our-story/the-wider-farm" tone="canopy">
                  About {facts.wideFarmName}
                </CTA>
                <CTA href="/the-park/farm-walks" tone="outline">
                  Farm walks
                </CTA>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ group */}
      <Section size="tight">
        <Container width="narrow">
          <Card>
            <Eyebrow className="text-canopy-700">Who runs it</Eyebrow>
            <h2 className="font-display text-2xl font-semibold">{family.company}</h2>
            <p className="mt-4 leading-relaxed opacity-80">
              Paws Pannai Retreat is a {family.company} property, alongside{" "}
              <a
                href={family.bsf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                {family.bsf.name}
              </a>{" "}
              next door and{" "}
              <a
                href={family.ssek.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                {family.ssek.name}
              </a>{" "}
              in {family.ssek.location}. Small group, three properties, one habit: build on land
              you actually live with.
            </p>
          </Card>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Story", path: "/our-story" },
        ], { type: "AboutPage" })}
      />
    </>
  );
}
