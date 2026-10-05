import { AdminNav } from "@/components/admin/nav";
import { can, requireUser } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";
import { logout } from "../actions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const [{ n, r }] = (await sql`
    SELECT (SELECT count(*)::int FROM bookings WHERE status = 'pending') AS n,
           (SELECT count(*)::int FROM rsvps WHERE status = 'new') AS r`) as { n: number; r: number }[];

  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[240px_1fr]">
      <aside className="border-b border-floor-900/10 bg-floor-900 text-bone-100 lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between px-5 py-4 lg:block lg:py-6">
          <div>
            <p className="font-display text-lg font-semibold">Paws Pannai</p>
            <p className="text-xs opacity-60">Admin panel</p>
          </div>
          <form action={logout} className="lg:hidden">
            <button className="text-xs underline underline-offset-4 opacity-80">Sign out</button>
          </form>
        </div>
        <AdminNav pending={n} newRsvps={r} showUsers={can(user, "users.manage")} />
        <div className="hidden border-t border-bone-50/10 px-5 py-5 text-sm lg:block">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs capitalize opacity-60">{user.role}</p>
          <form action={logout} className="mt-3">
            <button className="text-xs underline underline-offset-4 opacity-80 hover:opacity-100">Sign out</button>
          </form>
        </div>
      </aside>
      <div className="min-w-0 px-4 py-6 sm:px-8 sm:py-8">{children}</div>
    </div>
  );
}
