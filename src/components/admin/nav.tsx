"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/components/ui";

export function AdminNav({
  pending,
  newRsvps,
  showUsers,
}: {
  pending: number;
  newRsvps: number;
  showUsers: boolean;
}) {
  const path = usePathname();
  const items = [
    { href: "/admin", label: "Dashboard", exact: true },
    { href: "/admin/bookings", label: "Bookings", badge: pending },
    { href: "/admin/calendar", label: "Calendar" },
    { href: "/admin/rsvps", label: "Launch RSVPs", badge: newRsvps },
    { href: "/admin/blocks", label: "Blocked times" },
    ...(showUsers ? [{ href: "/admin/users", label: "Team" }] : []),
    { href: "/admin/account", label: "My account" },
  ];
  return (
    <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3 lg:pb-6">
      {items.map((i) => {
        const active = i.exact ? path === i.href : path.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            className={cx(
              "flex shrink-0 items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm whitespace-nowrap transition-colors",
              active ? "bg-bone-50 text-floor-900" : "text-bone-100/85 hover:bg-bone-50/10",
            )}
          >
            {i.label}
            {i.badge ? (
              <span className="rounded-full bg-mango-400 px-2 py-0.5 text-xs font-semibold text-floor-900">
                {i.badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
