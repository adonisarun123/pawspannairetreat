import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import { CTA, Container, Section } from "@/components/ui";
import { galleryPhotos } from "@/lib/gallery";
import { imagekitEnabled } from "@/lib/imagekit";
import { galleryOrder, media } from "@/lib/media";
import { JsonLd, breadcrumbSchema, imageGallerySchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Gallery",
  description:
    "Real photographs of Paws Pannai Retreat — the entrance arch, the fenced play zones, the agility ramp, the tyre tunnel and pyramid, the swings, the Bone Pool and the kennels, all shot on the farm.",
  path: "/gallery",
});

export default function GalleryPage() {
  // Only real photographs. Pending slots stay in `media.ts` as a shot list —
  // a gallery is the one page where an empty frame reads as a broken site.
  // The larger set in `gallery.ts` lives only on ImageKit, so it appears
  // once the CDN is configured.
  const shots = [
    ...galleryOrder.map((key) => media[key]).filter((s) => s.src),
    ...(imagekitEnabled ? galleryPhotos : []),
  ];

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
          {/*
            Column flow rather than a grid: portrait and landscape frames keep
            their own aspect ratio instead of being cropped to match, and the
            first two shots are the only ones fetched eagerly — the rest load
            as the reader scrolls.
          */}
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {shots.map((s, i) => (
              <Figure
                key={s.id}
                slot={s}
                className="mb-5 break-inside-avoid"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={i < 2}
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
        ], { type: "CollectionPage" })}
      />
      <JsonLd data={imageGallerySchema(shots)} />
    </>
  );
}
