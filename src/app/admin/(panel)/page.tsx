import { BookingList } from "@/components/admin/booking-list";
import { LinkButton, PageTitle, Panel } from "@/components/admin/bits";
import { addDays, dateLabel, todayIST } from "@/lib/booking-format";
import { rupees } from "@/lib/pricing";
import { can, panelUser } from "@/lib/server/auth";
import { dashboardStats, listBookings } from "@/lib/server/bookings";
import { rsvpTotals } from "@/lib/server/rsvps";

export const metadata = { title: "Dashboard" };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await panelUser();
  const { denied } = await searchParams;
  const today = todayIST();
  const weekEnd = addDays(today, 6);
  const money = can(user, "revenue.view");

  const [stats, pending, upcoming, rsvp] = await Promise.all([
    dashboardStats(today, weekEnd, `${today.slice(0, 7)}-01`),
    listBookings({ status: "pending", limit: 8 }),
    listBookings({ status: "accepted", from: today, to: weekEnd, limit: 20 }),
    rsvpTotals(),
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

      <Panel
        className="mt-6"
        title="Launch RSVPs · 10 Oct"
        action={<LinkButton href="/admin/rsvps" tone="outline">See all</LinkButton>}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { v: rsvp.parties, l: "RSVPs" },
            { v: rsvp.people, l: "People coming" },
            { v: rsvp.dogs, l: "Dogs coming" },
            { v: rsvp.unreviewed, l: "Not yet reviewed" },
          ].map((t) => (
            <div key={t.l} className="border-l-2 border-mango-400 pl-3">
              <div className="font-display text-2xl font-semibold">{t.v}</div>
              <div className="text-xs opacity-70">{t.l}</div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
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
