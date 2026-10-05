import { notFound } from "next/navigation";
import { deleteBooking } from "@/app/admin/actions";
import { requestedLabel } from "@/components/admin/booking-list";
import { LinkButton, PageTitle, Panel, StatusPill } from "@/components/admin/bits";
import { AcceptedControls, PendingDecision } from "@/components/admin/decision";
import { WhatsAppGlyph } from "@/components/session-planner";
import {
  acceptMessage,
  customerWhatsApp,
  dateLabel,
  minutesLabel,
  minutesOf,
  rejectMessage,
} from "@/lib/booking-format";
import { rupees } from "@/lib/pricing";
import { can, panelUser } from "@/lib/server/auth";
import { bookingEvents, getBooking } from "@/lib/server/bookings";
import { location } from "@/lib/site";

export const metadata = { title: "Booking" };

export default async function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await panelUser("bookings.view");
  const id = Number.parseInt((await params).id, 10);
  if (!Number.isFinite(id)) notFound();
  const [b, events] = await Promise.all([getBooking(id), bookingEvents(id)]);
  if (!b) notFound();

  const wa =
    b.status === "accepted"
      ? { label: "Send confirmation on WhatsApp", href: customerWhatsApp(b.phone, acceptMessage(b, location.mapsLink)) }
      : b.status === "rejected"
        ? { label: "Send the reply on WhatsApp", href: customerWhatsApp(b.phone, rejectMessage(b)) }
        : { label: "Message customer on WhatsApp", href: customerWhatsApp(b.phone, `Hi ${b.customer_name.split(" ")[0]}, this is Paws Pannai about your booking ${b.ref}.`) };

  const facts: [string, string][] = [
    ["Phone", b.phone],
    ["Dogs", String(b.dogs)],
    ["Length", `${b.hours} hour${b.hours > 1 ? "s" : ""}`],
    ["Pool", b.pool ? "Yes" : "No"],
    ["Quoted total", rupees(b.quoted_total)],
    ["Asked for", `${b.requested_date ? dateLabel(b.requested_date) : "Flexible date"} · ${b.requested_start_min != null ? minutesLabel(b.requested_start_min) : "flexible time"}`],
    ["Source", b.source === "web" ? "Website" : "Added by staff"],
    ["Received", `${dateLabel(b.created_at)} ${minutesLabel(minutesOf(b.created_at))}`],
  ];
  if (b.decided_by_name && b.decided_at) {
    facts.push(["Decided by", `${b.decided_by_name}, ${dateLabel(b.decided_at)} ${minutesLabel(minutesOf(b.decided_at))}`]);
  }

  return (
    <>
      <PageTitle
        title={b.customer_name}
        sub={
          <span className="inline-flex flex-wrap items-center gap-2">
            <StatusPill status={b.status} /> <span className="font-mono">{b.ref}</span> · {requestedLabel(b)}
          </span>
        }
        actions={<LinkButton href="/admin/bookings" tone="outline">← All bookings</LinkButton>}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <Panel title="Details">
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="opacity-60">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
            {b.notes ? (
              <div className="mt-5 rounded-xl bg-bone-100 p-4 text-sm">
                <p className="mb-1 text-xs font-semibold uppercase opacity-60">Customer notes</p>
                {b.notes}
              </div>
            ) : null}
            {b.staff_note ? (
              <div className="mt-3 rounded-xl bg-bone-100 p-4 text-sm">
                <p className="mb-1 text-xs font-semibold uppercase opacity-60">Staff note</p>
                {b.staff_note}
              </div>
            ) : null}
            <a
              href={wa.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-mango-400 px-5 py-2.5 text-sm font-semibold text-floor-900 hover:bg-mango-300"
            >
              <WhatsAppGlyph className="h-4 w-4" /> {wa.label}
            </a>
          </Panel>

          <Panel title="History">
            <ol className="space-y-2 text-sm">
              {events.map((e, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-36 shrink-0 opacity-60">
                    {dateLabel(e.at).slice(5)} {minutesLabel(minutesOf(e.at))}
                  </span>
                  <span>
                    <span className="font-medium capitalize">{e.action}</span>
                    {e.user_name ? ` by ${e.user_name}` : ""}
                    {e.detail ? <span className="opacity-70"> — {e.detail}</span> : null}
                  </span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <div className="space-y-6">
          {b.status === "pending" && can(user, "bookings.decide") ? (
            <Panel title="Decide">
              <PendingDecision id={b.id} hours={b.hours} requestedDate={b.requested_date} requestedStart={b.requested_start_min} startsAt={b.starts_at} />
            </Panel>
          ) : null}
          {b.status === "accepted" && can(user, "bookings.edit") ? (
            <Panel title="Manage">
              <AcceptedControls id={b.id} hours={b.hours} requestedDate={b.requested_date} requestedStart={b.requested_start_min} startsAt={b.starts_at} />
            </Panel>
          ) : null}
          {can(user, "bookings.delete") ? (
            <Panel title="Admin">
              <form action={deleteBooking}>
                <input type="hidden" name="id" value={b.id} />
                <p className="mb-3 text-sm opacity-70">Deleting removes the booking and its history for good. Prefer Cancel for real bookings.</p>
                <button className="rounded-full border border-red-300 px-5 py-2 text-sm font-semibold text-red-800 hover:bg-red-50">
                  Delete permanently
                </button>
              </form>
            </Panel>
          ) : null}
        </div>
      </div>
    </>
  );
}
