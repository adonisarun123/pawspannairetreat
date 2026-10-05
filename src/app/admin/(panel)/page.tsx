import { BookingList } from "@/components/admin/booking-list";
import { LinkButton, PageTitle, Panel } from "@/components/admin/bits";
import { addDays, dateLabel, todayIST } from "@/lib/booking-format";
import { rupees } from "@/lib/pricing";
import { can, panelUser } from "@/lib/server/auth";
import { dashboardStats, listBookings } from "@/lib/server/bookings";

export const metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await panelUser();
  const { denied } = await searchParams;
  const today = todayIST();
  const weekEnd = addDays(today, 6);
  const money = can(user, "revenue.view");

  const [stats, pending, upcoming] = await Promise.all([
    dashboardStats(today, weekEnd, `${today.slice(0, 7)}-01`),
    listBookings({ status: "pending", limit: 8 }),
    listBookings({ status: "accepted", from: today, to: weekEnd, limit: 20 }),
  ]);

  const tiles = [
    { label: "Waiting for a decision", value: stats.pending, tone: stats.pending ? "text-tamarind-600" : "" },
    { label: "Sessions today", value: stats.today },
    { label: "Dogs expected today", value: stats.dogsToday },
    { label: "Sessions next 7 days", value: stats.week },
    ...(money
      ? [
          { label: "Booked this month", value: rupees(stats.revenueMtd) },
          { label: "Upcoming (accepted)", value: rupees(stats.revenueUpcoming) },
        ]
      : []),
  ];

  return (
    <>
      <PageTitle
        title={`Hello, ${user.name.split(" ")[0]}`}
        sub={dateLabel(today)}
        actions={<LinkButton href="/admin/bookings/new" tone="gold">+ Add booking</LinkButton>}
      />
      {denied ? (
        <p className="mb-6 rounded-xl bg-mango-100 px-4 py-3 text-sm ring-1 ring-tamarind-300/60">
          That page is for admins only.
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-2xl border border-floor-900/8 bg-bone-50 p-4">
            <div className={`font-display text-2xl font-semibold sm:text-3xl ${t.tone ?? ""}`}>{t.value}</div>
            <div className="mt-1 text-xs leading-snug opacity-70">{t.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Panel title="Needs a decision" action={<LinkButton href="/admin/bookings?status=pending" tone="outline">All pending</LinkButton>}>
          <BookingList bookings={pending} showMoney={money} />
        </Panel>
        <Panel title="Coming up this week" action={<LinkButton href="/admin/calendar" tone="outline">Calendar</LinkButton>}>
          <BookingList bookings={upcoming} showMoney={money} />
        </Panel>
      </div>
    </>
  );
}
