import Link from "next/link";
import type { ReactNode } from "react";
import { STATUS_STYLES, type BookingStatus } from "@/lib/booking-format";
import { cx } from "@/components/ui";

export function PageTitle({ title, sub, actions }: { title: string; sub?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h1>
        {sub ? <p className="mt-1 text-sm opacity-70">{sub}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function StatusPill({ status }: { status: BookingStatus }) {
  return (
    <span className={cx("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1", STATUS_STYLES[status])}>
      {status}
    </span>
  );
}

export function Panel({ children, className, title, action }: { children: ReactNode; className?: string; title?: string; action?: ReactNode }) {
  return (
    <section className={cx("rounded-2xl border border-floor-900/8 bg-bone-50 p-5 shadow-[0_1px_2px_rgba(62,39,35,0.04)] sm:p-6", className)}>
      {title ? (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function LinkButton({ href, children, tone = "canopy" }: { href: string; children: ReactNode; tone?: "canopy" | "outline" | "gold" }) {
  const tones = {
    canopy: "bg-canopy-600 text-bone-50 hover:bg-canopy-500",
    gold: "bg-mango-400 text-floor-900 hover:bg-mango-300",
    outline: "border border-floor-900/20 hover:bg-floor-900/5",
  };
  return (
    <Link href={href} className={cx("inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", tones[tone])}>
      {children}
    </Link>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-dashed border-floor-900/15 px-4 py-8 text-center text-sm opacity-60">{children}</p>;
}
