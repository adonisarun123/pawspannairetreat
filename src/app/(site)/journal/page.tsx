import Link from "next/link";
import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import { Container, Section } from "@/components/ui";
import { postsByDate } from "@/lib/journal";
import { media } from "@/lib/media";
import { JsonLd, blogSchema, breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "The Journal",
  description:
    "Notes from a working farm that became a dog park — how it was built, where to swim a dog near Bangalore, and what a first off-leash session actually looks like.",
  path: "/journal",
});

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function JournalIndex() {
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Notes from the farm"
        lede="How the park was built, what we got wrong, and the practical things worth knowing before you drive out with a dog in the back."
        crumbs={[{ name: "The Journal", path: "/journal" }]}
      />

      <Section>
        <Container width="wide">
          <div className="grid gap-10 sm:grid-cols-2 lg:gap-14">
            {postsByDate.map((post) => (
              <article key={post.slug} className="flex flex-col">
                <Link href={`/journal/${post.slug}`} className="group">
                  <Figure
                    slot={media[post.hero]}
                    ratio="4 / 3"
                    sizes="(min-width: 640px) 46vw, 100vw"
                    imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </Link>
                <p className="mt-5 text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">
                  {post.tag}
                </p>
                <h2 className="mt-3 font-display text-xl leading-snug font-semibold">
                  <Link href={`/journal/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed opacity-75">{post.excerpt}</p>
                <p className="mt-5 text-xs opacity-55">
                  <time dateTime={post.published}>
                    {dateFmt.format(new Date(post.published))}
                  </time>
                  {" · "}
                  {post.readingMinutes} min read
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The Journal", path: "/journal" },
        ], { type: "CollectionPage" })}
      />
      <JsonLd data={blogSchema(postsByDate)} />
    </>
  );
}
