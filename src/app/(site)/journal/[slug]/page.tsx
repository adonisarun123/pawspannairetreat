import Link from "next/link";
import { notFound } from "next/navigation";
import { Figure } from "@/components/figure";
import { PageHero } from "@/components/page-hero";
import { CTA, Card, Container, Section } from "@/components/ui";
import { postBySlug, posts, postsByDate, type Block } from "@/lib/journal";
import { media } from "@/lib/media";
import { JsonLd, articleSchema, breadcrumbSchema, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/journal/${post.slug}`,
  });
}

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const more = postsByDate.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={post.tag}
        title={post.title}
        lede={post.excerpt}
        crumbs={[
          { name: "The Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ]}
      />

      <Section tone="bone" size="tight">
        <Container width="wide">
          <p className="mb-6 text-xs opacity-55">
            <time dateTime={post.published}>{dateFmt.format(new Date(post.published))}</time>
            {" · "}
            {post.readingMinutes} min read
          </p>
          <Figure
            slot={media[post.hero]}
            ratio="16 / 9"
            sizes="100vw"
            className="mx-auto max-w-5xl"
            priority
          />
        </Container>
      </Section>

      <Section>
        <Container width="narrow">
          <div className="space-y-6">
            {post.blocks.map((block, i) => (
              <BlockView key={i} block={block} />
            ))}
          </div>

          <Card className="mt-14">
            <h2 className="font-display text-xl font-semibold">Come and see it</h2>
            <p className="mt-3 text-sm leading-relaxed opacity-80">
              Sessions are booked by the hour, every day — share the park or book it privately. The
              pool is included with every session.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTA href="/sessions#plan">Book a session</CTA>
              <CTA href="/dog-park-near" tone="outline">
                How far is it from you?
              </CTA>
            </div>
          </Card>
        </Container>
      </Section>

      <Section tone="paper" size="tight">
        <Container width="wide">
          <p className="text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">
            More from the Journal
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {more.map((p) => (
              <article key={p.slug}>
                <h3 className="font-display text-lg leading-snug font-semibold">
                  <Link href={`/journal/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed opacity-75">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "The Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ])}
      />
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2 className="pt-6 font-display text-2xl leading-snug font-semibold sm:text-3xl">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="space-y-3 pl-1">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 leading-relaxed opacity-85">
              <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mango-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p className="border-l-2 border-mango-400 bg-mango-100/40 py-4 pl-5 text-[0.95rem] leading-relaxed">
          {block.text}
        </p>
      );
    default:
      return <p className="text-lg leading-relaxed opacity-85">{block.text}</p>;
  }
}
