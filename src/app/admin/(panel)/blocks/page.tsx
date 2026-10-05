import { removeBlock } from "@/app/admin/actions";
import { Empty, PageTitle, Panel } from "@/components/admin/bits";
import { BlockForm } from "@/components/admin/block-form";
import { addDays, slotLabel, todayIST } from "@/lib/booking-format";
import { panelUser } from "@/lib/server/auth";
import { listBlocks } from "@/lib/server/bookings";

export const metadata = { title: "Blocked times" };

export default async function BlocksPage() {
  await panelUser("blocks.manage");
  const today = todayIST();
  const blocks = await listBlocks(today, addDays(today, 365));
  return (
    <>
      <PageTitle title="Blocked times" sub="Close the park for maintenance, holidays or private events. Nobody can accept a booking into a blocked slot." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Block a time">
          <BlockForm />
        </Panel>
        <Panel title="Upcoming blocks">
          {blocks.length ? (
            <ul className="divide-y divide-floor-900/8">
              {blocks.map((k) => (
                <li key={k.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div>
                    <p className="font-medium">{slotLabel(k.starts_at, k.ends_at)}</p>
                    {k.reason ? <p className="opacity-70">{k.reason}</p> : null}
                  </div>
                  <form action={removeBlock}>
                    <input type="hidden" name="id" value={k.id} />
                    <button className="text-xs text-red-800 underline underline-offset-4">Remove</button>
                  </form>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No upcoming blocks.</Empty>
          )}
        </Panel>
      </div>
    </>
  );
}
