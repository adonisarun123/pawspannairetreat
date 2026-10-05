import Link from "next/link";
import { BookingList } from "@/components/admin/booking-list";
import { LinkButton, PageTitle } from "@/components/admin/bits";
import { cx } from "@/components/ui";
import { todayIST, type BookingStatus } from "@/lib/booking-format";
import { can, panelUser } from "@/lib/server/auth";
import { listBookings } from "@/lib/server/bookings";

export const metadata = { title: "Bookings" };

const TABS: { key: BookingStatus | "upcoming" | "all"; label: string }[] = [
  { key: "pending", label: "Pending" },
  { key: "upcoming", label: "Upcoming" },
  { key: "accepted", label: "All accepted" },
  { key: "rejected", label: "Rejected" },
  { key: "cancelled", label: "Cancelled" },
  { key: "all", label: "Everything" },
];

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; deleted?: string }>;
}) {
  const user = await panelUser("bookings.view");
  const sp = await searchParams;
  const tab = TABS.find((t) => t.key === sp.status)?.key ?? "pending";
  const bookings =
    tab === "upcoming"
      ? await listBookings({ status: "accepted", from: todayIST() })
      : await listBookings({ status: tab });

  return (
    <>
      <PageTitle
        title="Bookings"
        sub="Website requests land here as pending. Accept to lock the slot; the customer is told on WhatsApp."
        actions={<LinkButton href="/admin/bookings/new" tone="gold">+ Add booking</LinkButton>}
      />
      {sp.deleted ? <p className="mb-4 text-sm opacity-70">Booking deleted.</p> : null}
      <div className="mb-5 flex gap-1.5 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`/admin/bookings?status=${t.key}`}
            className={cx(
              "shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors",
              t.key === tab ? "bg-floor-900 text-bone-50" : "border border-floor-900/15 hover:bg-floor-900/5",
            )}
          >
            {t.label}
          </Link>
        ))}
      </div>
      <BookingList bookings={bookings} showMoney={can(user, "revenue.view")} />
    </>
  );
}
