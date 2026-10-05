"use client";

import { useActionState } from "react";
import { createUser, resetUserPassword } from "@/app/admin/actions";
import { Alert, Field, Submit, inputCls } from "./forms";

export function CreateUserForm() {
  const [state, action, pending] = useActionState(createUser, undefined);
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name"><input name="name" required className={inputCls} /></Field>
        <Field label="Email"><input name="email" type="email" required className={inputCls} /></Field>
        <Field label="Role">
          <select name="role" defaultValue="manager" className={inputCls}>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </Field>
        <Field label="Temporary password" hint="10+ characters. They change it on first sign-in.">
          <input name="password" required minLength={10} className={inputCls} />
        </Field>
      </div>
      <Alert state={state} />
      <Submit pending={pending}>Add team member</Submit>
    </form>
  );
}

export function ResetPasswordForm({ id }: { id: number }) {
  const [state, action, pending] = useActionState(resetUserPassword, undefined);
  return (
    <form action={action} className="mt-2 flex flex-wrap items-start gap-2">
      <input type="hidden" name="id" value={id} />
      <input name="password" placeholder="New temporary password" minLength={10} required className={`${inputCls} max-w-56 py-1.5`} />
      <Submit pending={pending} tone="outline" className="py-1.5">Reset</Submit>
      <div className="w-full"><Alert state={state} /></div>
    </form>
  );
}
