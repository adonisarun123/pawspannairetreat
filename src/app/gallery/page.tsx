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
  const shots = galleryOrder.map((key) => media[key]);
  const live = shots.filter((s) => s.src).length;

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The park, photographed on the park"
        lede={`No stock, no renders. ${live} of these are real shots taken on the farm; the rest are marked and waiting for the camera to catch up with the building.`}
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
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
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
