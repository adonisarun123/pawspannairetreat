import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Eyebrow, Lede, Section, Title } from "./ui";

export type Crumb = { name: string; path: string };

export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  actions,
  tone = "paper",
}: {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  tone?: "paper" | "bone" | "floor" | "canopy";
}) {
  const dark = tone === "floor" || tone === "canopy";
  return (
    <Section tone={tone} size="tight" className="pt-8 sm:pt-12">
      <Container width="wide">
        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs opacity-70">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.path} className="flex items-center gap-2">
                  <span aria-hidden>/</span>
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page">{c.name}</span>
                  ) : (
                    <Link href={c.path} className="hover:underline">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Eyebrow className={dark ? "text-mango-300" : "text-canopy-700"}>{eyebrow}</Eyebrow>
        <Title as="h1" size="xl" className="max-w-3xl">
          {title}
        </Title>
        {lede ? <Lede>{lede}</Lede> : null}
        {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </Section>
  );
}
