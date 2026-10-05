import { deleteRsvp, setRsvpStatus } from "@/app/admin/actions";
import { Empty, PageTitle, Panel } from "@/components/admin/bits";
import { WhatsAppGlyph } from "@/components/session-planner";
import { cx } from "@/components/ui";
import { customerWhatsApp, dateLabel, minutesLabel, minutesOf } from "@/lib/booking-format";
import { can, panelUser } from "@/lib/server/auth";
import { listRsvps, rsvpTotals, type RsvpStatus } from "@/lib/server/rsvps";
import { launch, location } from "@/lib/site";

export const metadata = { title: "Launch RSVPs" };

const PILL: Record<RsvpStatus, string> = {
  new: "bg-mango-100 text-tamarind-600 ring-tamarind-300/60",
  confirmed: "bg-canopy-50 text-canopy-700 ring-canopy-300",
  declined: "bg-bone-200 text-bone-700 ring-bone-400",
};

export default async function RsvpsPage() {
  const user = await panelUser("rsvps.manage");
  const [rsvps, totals] = await Promise.all([listRsvps(), rsvpTotals()]);

  return (
    <>
      <PageTitle
        title="Launch RSVPs"
        sub={`${launch.dateDisplay} · ${launch.timeDisplay}. RSVPs from the invite page land here; WhatsApp gets a copy too.`}
      />
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { v: totals.parties, l: "RSVPs (excl. declined)" },
          { v: totals.people, l: "People coming" },
          { v: totals.dogs, l: "Dogs coming" },
          { v: totals.unreviewed, l: "Not yet reviewed" },
        ].map((t) => (
          <div key={t.l} className="rounded-2xl border border-floor-900/8 bg-bone-50 p-4">
            <div className="font-display text-3xl font-semibold">{t.v}</div>
            <div className="mt-1 text-xs opacity-70">{t.l}</div>
          </div>
        ))}
      </div>

      <Panel>
        {rsvps.length ? (
          <ul className="divide-y divide-floor-900/8">
            {rsvps.map((r) => {
              const confirmText = `Hi ${r.name.split(" ")[0]}, you're confirmed for the Paws Pannai launch on ${launch.dateDisplay}, ${launch.timeDisplay} — ${r.people} ${r.people === 1 ? "person" : "people"}${r.dogs ? ` and ${r.dogs} ${r.dogs === 1 ? "dog" : "dogs"}` : ""}. Directions: ${location.mapsLink}. See you there!`;
              return (
                <li key={r.id} className="grid gap-3 py-4 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div className="min-w-0 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{r.name}</span>
                      <span className={cx("rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1", PILL[r.status])}>{r.status}</span>
                      <span className="opacity-60">{r.phone}</span>
                    </div>
                    <p className="mt-1">
                      {r.people} {r.people === 1 ? "person" : "people"} · {r.dogs} {r.dogs === 1 ? "dog" : "dogs"}
                      {r.dog_names ? <span className="opacity-70"> ({r.dog_names})</span> : null}
                    </p>
                    {r.notes ? <p className="mt-1 opacity-70">“{r.notes}”</p> : null}
                    <p className="mt-1 text-xs opacity-50">
                      {dateLabel(r.created_at)} {minutesLabel(minutesOf(r.created_at))}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={customerWhatsApp(r.phone, confirmText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-mango-400 px-3 py-1.5 text-xs font-semibold text-floor-900 hover:bg-mango-300"
                    >
                      <WhatsAppGlyph className="h-3.5 w-3.5" /> Message
                    </a>
                    {(["confirmed", "declined", "new"] as const)
                      .filter((s) => s !== r.status)
                      .map((s) => (
                        <form key={s} action={setRsvpStatus}>
                          <input type="hidden" name="id" value={r.id} />
                          <input type="hidden" name="status" value={s} />
                          <button className="rounded-full border border-floor-900/20 px-3 py-1.5 text-xs hover:bg-floor-900/5">
                            {s === "confirmed" ? "Mark confirmed" : s === "declined" ? "Mark declined" : "Back to new"}
                          </button>
                        </form>
                      ))}
                    {can(user, "users.manage") ? (
                      <form action={deleteRsvp}>
                        <input type="hidden" name="id" value={r.id} />
                        <button className="px-2 py-1.5 text-xs text-red-800 underline underline-offset-4">Delete</button>
                      </form>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <Empty>No RSVPs yet. They appear here as soon as someone RSVPs on the invite page.</Empty>
        )}
      </Panel>
    </>
  );
}
