import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ layout */

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "narrow" | "wide";
}) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };
  return (
    <div className={cx("mx-auto w-full px-5 sm:px-8", widths[width], className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  tone = "bone",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "bone" | "paper" | "canopy" | "floor" | "pool";
  size?: "default" | "tight" | "loose";
}) {
  const tones = {
    bone: "bg-bone-100 text-floor-900",
    paper: "bg-bone-50 text-floor-900",
    canopy: "bg-canopy-600 text-bone-50",
    floor: "bg-floor-900 text-bone-100 dapple",
    pool: "bg-pool-500 text-white",
  };
  const sizes = {
    tight: "py-12 sm:py-16",
    default: "py-16 sm:py-24",
    loose: "py-20 sm:py-32",
  };
  return (
    <section id={id} className={cx(tones[tone], sizes[size], className)}>
      {children}
    </section>
  );
}

/* -------------------------------------------------------------- typography */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cx(
        "mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase",
        className,
      )}
    >
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {children}
    </p>
  );
}

export function Title({
  children,
  as: As = "h2",
  className,
  size = "lg",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  size?: "xl" | "lg" | "md" | "sm";
}) {
  const sizes = {
    xl: "text-4xl sm:text-5xl lg:text-6xl",
    lg: "text-3xl sm:text-4xl lg:text-5xl",
    md: "text-2xl sm:text-3xl",
    sm: "text-xl sm:text-2xl",
  };
  return <As className={cx(sizes[size], className)}>{children}</As>;
}

export function Lede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cx("mt-5 max-w-2xl text-lg leading-relaxed opacity-85 sm:text-xl", className)}>
      {children}
    </p>
  );
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "space-y-4 text-base leading-relaxed opacity-90 [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ button */

type ButtonTone = "gold" | "canopy" | "outline" | "ghost" | "light";

const buttonTones: Record<ButtonTone, string> = {
  gold: "bg-mango-400 text-floor-900 hover:bg-mango-300 shadow-sm",
  canopy: "bg-canopy-600 text-bone-50 hover:bg-canopy-500 shadow-sm",
  outline:
    "border border-current/30 hover:border-current/60 hover:bg-current/5 text-current",
  ghost: "text-current hover:bg-current/10",
  light: "bg-bone-50 text-floor-900 hover:bg-white shadow-sm",
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

export function CTA({
  href,
  children,
  tone = "gold",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  tone?: ButtonTone;
  className?: string;
  external?: boolean;
}) {
  const cls = cx(buttonBase, buttonTones[tone], className);
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={cls}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Button({
  tone = "gold",
  className,
  ...props
}: ComponentPropsWithoutRef<"button"> & { tone?: ButtonTone }) {
  return <button className={cx(buttonBase, buttonTones[tone], className)} {...props} />;
}

/* ------------------------------------------------------------------- cards */

export function Card({
  children,
  className,
  tone = "paper",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "paper" | "outline" | "dark";
  id?: string;
}) {
  const tones = {
    paper: "bg-bone-50 border border-floor-900/8 shadow-[0_1px_2px_rgba(62,39,35,0.04)]",
    outline: "border border-current/20",
    dark: "bg-floor-700 text-bone-100 border border-bone-50/10",
  };
  return (
    <div id={id} className={cx("rounded-2xl p-6 sm:p-7", tones[tone], className)}>
      {children}
    </div>
  );
}

export function Stat({
  value,
  label,
  className,
}: {
  value: ReactNode;
  label: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("border-l-2 border-mango-400 pl-4", className)}>
      <div className="font-display text-3xl leading-none font-semibold sm:text-4xl">{value}</div>
      <div className="mt-2 text-sm leading-snug opacity-75">{label}</div>
    </div>
  );
}

export function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-current/25 px-3 py-1 text-xs font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Flags copy that is standing in for a fact still being confirmed. */
export function Pending({ children }: { children: ReactNode }) {
  return (
    <span
      className="rounded bg-mango-100 px-1.5 py-0.5 text-[0.95em] text-tamarind-600 ring-1 ring-tamarind-300/60"
      title="Placeholder — confirm before launch"
    >
      {children}
    </span>
  );
}
