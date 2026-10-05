import Link from "next/link";
import { dateLabel, minutesLabel, slotLabel } from "@/lib/booking-format";
import { rupees } from "@/lib/pricing";
import type { Booking } from "@/lib/server/bookings";
import { Empty, StatusPill } from "./bits";

export function requestedLabel(b: Booking): string {
  if (b.starts_at) return slotLabel(b.starts_at, b.ends_at);
  const d = b.requested_date ? dateLabel(b.requested_date) : "Date flexible";
  const t = b.requested_start_min != null ? minutesLabel(b.requested_start_min) : "time flexible";
  return `Asked for: ${d} · ${t}`;
}

export function BookingList({ bookings, showMoney }: { bookings: Booking[]; showMoney: boolean }) {
  if (!bookings.length) return <Empty>No bookings here.</Empty>;
  return (
    <ul className="divide-y divide-floor-900/8 overflow-hidden rounded-2xl border border-floor-900/8 bg-bone-50">
      {bookings.map((b) => (
        <li key={b.id}>
          <Link
            href={`/admin/bookings/${b.id}`}
            className="grid gap-1 px-4 py-3.5 transition-colors hover:bg-bone-100 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4 sm:px-5"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{b.customer_name}</span>
                <StatusPill status={b.status} />
                <span className="font-mono text-xs opacity-50">{b.ref}</span>
                {b.source === "manual" ? <span className="text-xs opacity-50">· added by staff</span> : null}
              </div>
              <p className="mt-0.5 truncate text-sm opacity-75">{requestedLabel(b)}</p>
            </div>
            <div className="text-sm opacity-80 sm:text-right">
              {b.dogs} dog{b.dogs > 1 ? "s" : ""} · {b.hours} hr{b.hours > 1 ? "s" : ""}
              {b.pool ? " · pool" : ""}
              {showMoney ? <span className="ml-2 font-medium">{rupees(b.quoted_total)}</span> : null}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
