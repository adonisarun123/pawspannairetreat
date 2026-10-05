import Link from "next/link";
import { LinkButton, PageTitle } from "@/components/admin/bits";
import { cx } from "@/components/ui";
import {
  CLOSE_MIN,
  OPEN_MIN,
  addDays,
  dateLabel,
  minutesLabel,
  minutesOf,
  todayIST,
} from "@/lib/booking-format";
import { panelUser } from "@/lib/server/auth";
import { calendarRange, type Block, type Booking } from "@/lib/server/bookings";

export const metadata = { title: "Calendar" };

const SPAN = CLOSE_MIN - OPEN_MIN;
const PX_PER_MIN = 1.1;

function mondayOf(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = Sun
  return addDays(iso, dow === 0 ? -6 : 1 - dow);
}

type Item =
  | { kind: "booking"; b: Booking; start: number; end: number }
  | { kind: "request"; b: Booking; start: number; end: number }
  | { kind: "block"; k: Block; start: number; end: number };

function itemsForDay(day: string, bookings: Booking[], blocks: Block[]): { timed: Item[]; untimed: Booking[] } {
  const timed: Item[] = [];
  const untimed: Booking[] = [];
  for (const b of bookings) {
    if (b.status === "accepted" && b.starts_at?.startsWith(day)) {
      timed.push({ kind: "booking", b, start: minutesOf(b.starts_at), end: minutesOf(b.ends_at!) });
    } else if (b.status === "pending" && b.requested_date === day) {
      if (b.requested_start_min != null) {
        timed.push({ kind: "request", b, start: b.requested_start_min, end: b.requested_start_min + b.hours * 60 });
      } else untimed.push(b);
    }
  }
  for (const k of blocks) {
    const s = k.starts_at.slice(0, 10) < day ? OPEN_MIN : minutesOf(k.starts_at);
    const e = k.ends_at.slice(0, 10) > day ? CLOSE_MIN : minutesOf(k.ends_at);
    if (k.starts_at.slice(0, 10) <= day && k.ends_at.slice(0, 10) >= day && e > s) timed.push({ kind: "block", k, start: s, end: e });
  }
  timed.sort((a, z) => a.start - z.start);
  return { timed, untimed };
}

function ItemBox({ item, absolute }: { item: Item; absolute?: boolean }) {
  const style = absolute
    ? {
        top: Math.max(0, item.start - OPEN_MIN) * PX_PER_MIN,
        height: Math.max(22, (Math.min(item.end, CLOSE_MIN) - Math.max(item.start, OPEN_MIN)) * PX_PER_MIN - 2),
      }
    : undefined;
  const time = `${minutesLabel(item.start)} – ${minutesLabel(item.end)}`;
  const base = cx("overflow-hidden rounded-lg px-2 py-1 text-xs leading-tight", absolute && "absolute inset-x-1");
  if (item.kind === "block") {
    return (
      <div style={style} className={cx(base, "bg-[repeating-linear-gradient(45deg,var(--color-bone-300),var(--color-bone-300)_6px,var(--color-bone-200)_6px,var(--color-bone-200)_12px)] text-bone-700")}>
        <p className="font-semibold">Blocked</p>
        <p>{item.k.reason ?? time}</p>
      </div>
    );
  }
  const pending = item.kind === "request";
  return (
    <Link
      href={`/admin/bookings/${item.b.id}`}
      style={style}
      className={cx(
        base,
        "block transition-opacity hover:opacity-85",
        pending ? "border border-dashed border-tamarind-500 bg-mango-100 text-tamarind-600" : "bg-canopy-600 text-bone-50",
      )}
    >
      <p className="truncate font-semibold">
        {pending ? "Request · " : ""}
        {item.b.customer_name}
      </p>
      <p className="truncate opacity-85">
        {time} · {item.b.dogs}🐕{item.b.pool ? " · pool" : ""}
      </p>
    </Link>
  );
}

export default async function CalendarPage({ searchParams }: { searchParams: Promise<{ week?: string }> }) {
  await panelUser("bookings.view");
  const { week } = await searchParams;
  const today = todayIST();
  const start = mondayOf(week && /^\d{4}-\d{2}-\d{2}$/.test(week) ? week : today);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const { bookings, blocks } = await calendarRange(days[0], days[6]);
  const perDay = days.map((d) => ({ day: d, ...itemsForDay(d, bookings, blocks) }));
  const hours = Array.from({ length: Math.floor(SPAN / 60) + 1 }, (_, i) => OPEN_MIN + i * 60);

  return (
    <>
      <PageTitle
        title="Calendar"
        sub={`${dateLabel(days[0])} – ${dateLabel(days[6])}`}
        actions={
          <>
            <LinkButton href={`/admin/calendar?week=${addDays(start, -7)}`} tone="outline">← Prev</LinkButton>
            <LinkButton href="/admin/calendar" tone="outline">This week</LinkButton>
            <LinkButton href={`/admin/calendar?week=${addDays(start, 7)}`} tone="outline">Next →</LinkButton>
          </>
        }
      />
      <div className="mb-4 flex flex-wrap gap-4 text-xs opacity-80">
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-canopy-600" /> Accepted</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-dashed border-tamarind-500 bg-mango-100" /> Pending request</span>
        <span className="inline-flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-bone-300" /> Blocked</span>
      </div>

      {/* Week grid — desktop */}
      <div className="hidden overflow-x-auto rounded-2xl border border-floor-900/8 bg-bone-50 md:block">
        <div className="grid min-w-[860px] grid-cols-[56px_repeat(7,1fr)]">
          <div />
          {perDay.map(({ day, untimed }) => (
            <div key={day} className={cx("border-l border-floor-900/8 px-2 py-2 text-center text-xs", day === today && "bg-mango-50")}>
              <p className="font-semibold">{dateLabel(day).slice(0, 3)}</p>
              <p className="opacity-70">{dateLabel(day).slice(5, 11)}</p>
              {untimed.length ? (
                <div className="mt-1 space-y-1">
                  {untimed.map((b) => (
                    <Link key={b.id} href={`/admin/bookings/${b.id}`} className="block truncate rounded bg-mango-100 px-1 py-0.5 text-[11px] text-tamarind-600">
                      {b.customer_name} · any time
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <div className="relative border-t border-floor-900/8" style={{ height: SPAN * PX_PER_MIN }}>
            {hours.map((h) => (
              <span key={h} className="absolute right-2 -translate-y-1/2 text-[10px] opacity-50" style={{ top: (h - OPEN_MIN) * PX_PER_MIN }}>
                {minutesLabel(h).replace(":00", "")}
              </span>
            ))}
          </div>
          {perDay.map(({ day, timed }) => (
            <div key={day} className={cx("relative border-t border-l border-floor-900/8", day === today && "bg-mango-50/50")} style={{ height: SPAN * PX_PER_MIN }}>
              {hours.map((h) => (
                <div key={h} className="absolute inset-x-0 border-t border-floor-900/5" style={{ top: (h - OPEN_MIN) * PX_PER_MIN }} />
              ))}
              {timed.map((it, i) => (
                <ItemBox key={i} item={it} absolute />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Agenda — mobile */}
      <div className="space-y-4 md:hidden">
        {perDay.map(({ day, timed, untimed }) => (
          <div key={day}>
            <p className={cx("mb-2 text-sm font-semibold", day === today && "text-canopy-700")}>
              {dateLabel(day)}
              {day === today ? " · today" : ""}
            </p>
            {timed.length || untimed.length ? (
              <div className="space-y-1.5">
                {timed.map((it, i) => (
                  <ItemBox key={i} item={it} />
                ))}
                {untimed.map((b) => (
                  <Link key={b.id} href={`/admin/bookings/${b.id}`} className="block rounded-lg border border-dashed border-tamarind-500 bg-mango-100 px-2 py-1 text-xs text-tamarind-600">
                    Request · {b.customer_name} · any time
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs opacity-50">Nothing booked</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
