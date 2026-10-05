"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { Alert, Field, Submit, inputCls } from "@/components/admin/forms";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form action={action} className="space-y-4">
      <Field label="Email">
        <input name="email" type="email" autoComplete="username" required className={inputCls} />
      </Field>
      <Field label="Password">
        <input name="password" type="password" autoComplete="current-password" required className={inputCls} />
      </Field>
      <Alert state={state} />
      <Submit pending={pending} className="w-full">
        Sign in
      </Submit>
    </form>
  );
}
