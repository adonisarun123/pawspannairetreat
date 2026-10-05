import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/server/auth";
import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin");
  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold tracking-[0.14em] text-canopy-700 uppercase">Paws Pannai</p>
        <h1 className="mt-2 font-display text-3xl font-semibold">Staff sign in</h1>
        <p className="mt-2 text-sm opacity-70">Bookings, calendar and team — for admins and managers.</p>
        <div className="mt-8 rounded-2xl border border-floor-900/8 bg-bone-50 p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
