import { PageTitle, Panel } from "@/components/admin/bits";
import { PasswordForm } from "@/components/admin/password-form";
import { requireUser } from "@/lib/server/auth";

export const metadata = { title: "My account" };

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ first?: string }> }) {
  const user = await requireUser();
  const { first } = await searchParams;
  return (
    <>
      <PageTitle title="My account" sub={`${user.name} · ${user.email} · ${user.role}`} />
      {first || user.mustChangePassword ? (
        <p className="mb-6 max-w-xl rounded-xl bg-mango-100 px-4 py-3 text-sm ring-1 ring-tamarind-300/60">
          You&apos;re signed in with a temporary password. Set your own before using the panel.
        </p>
      ) : null}
      <Panel title="Change password" className="max-w-xl">
        <PasswordForm />
      </Panel>
    </>
  );
}
