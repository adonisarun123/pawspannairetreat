import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sql } from "./db";
import { SESSION_COOKIE, decrypt } from "./session";

export type Role = "admin" | "manager";

export type StaffUser = {
  id: number;
  email: string;
  name: string;
  role: Role;
  mustChangePassword: boolean;
};

/**
 * Permissions. Managers run day-to-day operations; admins can also manage
 * staff, delete bookings and see revenue.
 */
const PERMISSIONS = {
  "bookings.view": ["admin", "manager"],
  "bookings.decide": ["admin", "manager"],
  "bookings.create": ["admin", "manager"],
  "bookings.edit": ["admin", "manager"],
  "bookings.delete": ["admin"],
  "blocks.manage": ["admin", "manager"],
  "users.manage": ["admin"],
  "revenue.view": ["admin"],
} as const satisfies Record<string, readonly Role[]>;

export type Permission = keyof typeof PERMISSIONS;

export function can(user: Pick<StaffUser, "role"> | null, permission: Permission): boolean {
  return !!user && (PERMISSIONS[permission] as readonly Role[]).includes(user.role);
}

/** Reads the session cookie and re-checks the user in the database on every request. */
export const getCurrentUser = cache(async (): Promise<StaffUser | null> => {
  const session = await decrypt((await cookies()).get(SESSION_COOKIE)?.value);
  if (!session) return null;
  const rows = await sql`
    SELECT id, email, name, role, must_change_password
    FROM users WHERE id = ${session.uid} AND active = true`;
  const r = rows[0];
  if (!r) return null;
  return {
    id: r.id,
    email: r.email,
    name: r.name,
    role: r.role,
    mustChangePassword: r.must_change_password,
  };
});

/** For pages: redirects to login when signed out, to the dashboard when not permitted. */
export async function requireUser(permission?: Permission): Promise<StaffUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  if (permission && !can(user, permission)) redirect("/admin?denied=1");
  return user;
}

/** For server actions: throws instead of redirecting. */
export async function assertPermission(permission: Permission): Promise<StaffUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in");
  if (!can(user, permission)) throw new Error("You don't have permission to do that");
  return user;
}

/** For panel pages: as requireUser, and sends first-time users to set their own password. */
export async function panelUser(permission?: Permission): Promise<StaffUser> {
  const user = await requireUser(permission);
  if (user.mustChangePassword) redirect("/admin/account?first=1");
  return user;
}
