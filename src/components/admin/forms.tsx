"use client";

import { useActionState, type ReactNode } from "react";
import type { FormState } from "@/app/admin/actions";
import { cx } from "@/components/ui";

export const inputCls =
  "w-full rounded-xl border border-floor-900/15 bg-bone-50 px-3.5 py-2.5 text-sm text-floor-900 outline-none transition-colors focus:border-canopy-600";
export const labelCls = "block text-xs font-semibold tracking-wide text-floor-700 uppercase";

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint ? <span className="mt-1 block text-xs opacity-60">{hint}</span> : null}
    </label>
  );
}

export function Alert({ state }: { state: FormState }) {
  if (!state) return null;
  if (state.error)
    return (
      <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200">
        {state.error}
      </p>
    );
  if (state.ok)
    return (
      <p role="status" className="rounded-xl bg-canopy-50 px-4 py-3 text-sm text-canopy-800 ring-1 ring-canopy-200">
        {state.ok}
      </p>
    );
  return null;
}

const tones = {
  gold: "bg-mango-400 text-floor-900 hover:bg-mango-300",
  canopy: "bg-canopy-600 text-bone-50 hover:bg-canopy-500",
  danger: "bg-red-700 text-white hover:bg-red-600",
  outline: "border border-floor-900/20 hover:bg-floor-900/5",
};

export function Submit({
  children,
  pending,
  tone = "canopy",
  className,
}: {
  children: ReactNode;
  pending?: boolean;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:cursor-wait disabled:opacity-60",
        tones[tone],
        className,
      )}
    >
      {pending ? "Working…" : children}
    </button>
  );
}

/** A form bound to a server action with inline error/success messages. */
export function ActionForm({
  action,
  children,
  className,
  render,
}: {
  action: (state: FormState, form: FormData) => Promise<FormState>;
  children?: ReactNode;
  className?: string;
  render?: (state: FormState, pending: boolean) => ReactNode;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form action={formAction} className={className}>
      {render ? render(state, pending) : children}
    </form>
  );
}
