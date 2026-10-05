import { updateUser } from "@/app/admin/actions";
import { PageTitle, Panel } from "@/components/admin/bits";
import { CreateUserForm, ResetPasswordForm } from "@/components/admin/user-forms";
import { panelUser } from "@/lib/server/auth";
import { sql } from "@/lib/server/db";

export const metadata = { title: "Team" };

type Row = { id: number; name: string; email: string; role: "admin" | "manager"; active: boolean; must_change_password: boolean };

export default async function UsersPage() {
  const me = await panelUser("users.manage");
  const users = (await sql`SELECT id, name, email, role, active, must_change_password FROM users ORDER BY active DESC, role, name`) as Row[];

  return (
    <>
      <PageTitle
        title="Team"
        sub="Managers run bookings, the calendar and blocked times. Admins can also manage the team, delete bookings and see revenue."
      />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <Panel title="People">
          <ul className="divide-y divide-floor-900/8">
            {users.map((u) => (
              <li key={u.id} className="py-4 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">
                      {u.name} {u.id === me.id ? <span className="opacity-50">(you)</span> : null}
                      {!u.active ? <span className="ml-2 rounded-full bg-bone-200 px-2 py-0.5 text-xs">deactivated</span> : null}
                    </p>
                    <p className="opacity-70">{u.email}{u.must_change_password ? " · hasn't set own password yet" : ""}</p>
                  </div>
                  {u.id !== me.id ? (
                    <div className="flex flex-wrap gap-2">
                      <form action={updateUser}>
                        <input type="hidden" name="id" value={u.id} />
                        <input type="hidden" name="role" value={u.role === "admin" ? "manager" : "admin"} />
                        <button className="rounded-full border border-floor-900/20 px-3 py-1 text-xs hover:bg-floor-900/5">
                          Make {u.role === "admin" ? "manager" : "admin"}
                        </button>
                      </form>
                      <form action={updateUser}>
                        <input type="hidden" name="id" value={u.id} />
                        <input type="hidden" name="active" value={u.active ? "false" : "true"} />
                        <button className="rounded-full border border-floor-900/20 px-3 py-1 text-xs hover:bg-floor-900/5">
                          {u.active ? "Deactivate" : "Reactivate"}
                        </button>
                      </form>
                    </div>
                  ) : null}
                </div>
                <p className="mt-1 text-xs font-semibold tracking-wide uppercase opacity-60">{u.role}</p>
                {u.id !== me.id ? (
                  <details className="mt-1">
                    <summary className="cursor-pointer text-xs opacity-70">Reset password</summary>
                    <ResetPasswordForm id={u.id} />
                  </details>
                ) : null}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Add someone">
          <CreateUserForm />
        </Panel>
      </div>
    </>
  );
}
