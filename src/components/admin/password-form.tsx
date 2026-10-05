"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/admin/actions";
import { Alert, Field, Submit, inputCls } from "./forms";

export function PasswordForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  return (
    <form action={action} className="space-y-4">
      <Field label="Current password"><input name="current" type="password" autoComplete="current-password" required className={inputCls} /></Field>
      <Field label="New password" hint="At least 10 characters."><input name="next" type="password" autoComplete="new-password" minLength={10} required className={inputCls} /></Field>
      <Field label="Confirm new password"><input name="confirm" type="password" autoComplete="new-password" required className={inputCls} /></Field>
      <Alert state={state} />
      {state?.ok ? <a href="/admin" className="inline-block text-sm font-semibold underline underline-offset-4">Go to the dashboard →</a> : null}
      <Submit pending={pending}>Update password</Submit>
    </form>
  );
}
