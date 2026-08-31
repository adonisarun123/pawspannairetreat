import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import { CTA, Container, Section } from "@/components/ui";
import { galleryOrder, media } from "@/lib/media";
import { JsonLd, breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Gallery",
  description:
    "Real photographs of Paws Pannai Retreat — the entrance arch, Tyre Hill, the jump-through hoops, the fenced zones and the boundary signage, all shot on the farm.",
  path: "/gallery",
});

export default function GalleryPage() {
  // Only real photographs. Pending slots stay in `media.ts` as a shot list —
  // a gallery is the one page where an empty frame reads as a broken site.
  const shots = galleryOrder.map((key) => media[key]).filter((s) => s.src);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The park, photographed on the park"
        lede="No stock and no renders — every photograph here was taken on the farm, on the ground your dog will run on. More go up as the building finishes."
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        actions={
          <>
            <CTA href="/sessions#plan">Book a Session</CTA>
            <CTA href="/the-park" tone="outline">
              See the park
            </CTA>
          </>
        }
      />

      <Section tone="bone">
        <Container width="wide">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shots.map((s) => (
              <Figure
                key={s.id}
                slot={s}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                showCaption
              />
            ))}
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
    </>
  );
}
