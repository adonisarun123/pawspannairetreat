"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav } from "@/lib/nav";
import { hours } from "@/lib/site";
import { CTA, Container, cx } from "./ui";

function PawMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="currentColor">
      <ellipse cx="9" cy="10" rx="3.1" ry="4" />
      <ellipse cx="16" cy="7.6" rx="3.2" ry="4.2" />
      <ellipse cx="23" cy="10" rx="3.1" ry="4" />
      <path d="M16 14.4c4.3 0 7.8 3.2 7.8 7 0 3-2.3 4.6-5.1 4.6-1.1 0-1.9-.3-2.7-.3s-1.6.3-2.7.3c-2.8 0-5.1-1.6-5.1-4.6 0-3.8 3.5-7 7.8-7z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu when the route changes. Adjusting state during
  // render is the documented alternative to a setState-in-effect cascade.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cx(
        "sticky top-0 z-50 transition-shadow duration-200",
        scrolled ? "shadow-[0_1px_0_rgba(62,39,35,0.12)]" : "",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-floor-900 focus:px-4 focus:py-2 focus:text-sm focus:text-bone-50"
      >
        Skip to content
      </a>

      <div className="hidden bg-floor-900 text-bone-100 lg:block">
        <Container width="wide">
          <div className="flex items-center justify-between py-1.5 text-xs">
            <p className="opacity-80">
              Seekanapalli village, near Hosur · 1 acre of working farm
            </p>
            <p className="opacity-80">Open {hours.display}</p>
          </div>
        </Container>
      </div>

      <div className="border-b border-floor-900/10 bg-bone-50/95 backdrop-blur">
        <Container width="wide">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-2.5 text-floor-900"
              aria-label="Paws Pannai Retreat — home"
            >
              <PawMark className="h-7 w-7 text-canopy-600" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-lg font-semibold sm:text-xl">Paws Pannai</span>
                <span className="mt-0.5 text-[0.6rem] font-semibold tracking-[0.18em] text-canopy-600 uppercase">
                  Pet Play &amp; Pool
                </span>
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-0.5">
                {primaryNav.map((item) => (
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={cx(
                        "block rounded-full px-3 py-2 text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "bg-canopy-600/10 text-canopy-700"
                          : "text-floor-700 hover:bg-floor-900/5 hover:text-floor-900",
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <div className="invisible absolute top-full left-0 z-10 pt-2 opacity-0 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                        <ul className="min-w-56 rounded-2xl border border-floor-900/10 bg-bone-50 p-2 shadow-lg">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                target={child.note === "external" ? "_blank" : undefined}
                                rel={child.note === "external" ? "noopener noreferrer" : undefined}
                                className="block rounded-xl px-3 py-2 text-sm text-floor-700 hover:bg-canopy-600/8 hover:text-canopy-700"
                              >
                                {child.label}
                                {child.note === "external" ? (
                                  <span aria-hidden className="ml-1 opacity-50">
                                    ↗
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block">
                <CTA href="/sessions#plan" className="px-5 py-2.5 whitespace-nowrap">
                  Book a Session
                </CTA>
              </span>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-floor-900 hover:bg-floor-900/5 xl:hidden"
              >
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
                  {open ? (
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-floor-900/10 bg-bone-50 sm:top-20 xl:hidden"
        >
          <Container>
            <nav aria-label="Primary mobile" className="py-6">
              <ul className="divide-y divide-floor-900/8">
                {primaryNav.map((item) => (
                  <li key={item.href} className="py-4">
                    <Link
                      href={item.href}
                      className={cx(
                        "font-display text-xl font-semibold",
                        isActive(item.href) ? "text-canopy-700" : "text-floor-900",
                      )}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              target={child.note === "external" ? "_blank" : undefined}
                              rel={child.note === "external" ? "noopener noreferrer" : undefined}
                              className="text-sm text-floor-700 underline underline-offset-4 opacity-80"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <CTA href="/sessions#plan">Book a Session</CTA>
                <CTA href="/plan-your-visit" tone="outline">
                  Plan your visit
                </CTA>
              </div>
              <p className="mt-6 text-sm opacity-70">Open {hours.display}</p>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
