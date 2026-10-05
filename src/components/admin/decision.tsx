"use client";

import { useActionState, useState } from "react";
import {
  acceptBooking,
  cancelBooking,
  rejectBooking,
  rescheduleBooking,
} from "@/app/admin/actions";
import { CLOSE_MIN, OPEN_MIN, minutesLabel, minutesOf } from "@/lib/booking-format";
import { Alert, Field, Submit, inputCls } from "./forms";

export function startOptions(hours: number) {
  const out: { value: number; label: string }[] = [];
  for (let t = OPEN_MIN; t + hours * 60 <= CLOSE_MIN; t += 30) out.push({ value: t, label: minutesLabel(t) });
  return out;
}

function SlotFields({ hours, date, start }: { hours: number; date?: string | null; start?: number | null }) {
  const opts = startOptions(hours);
  const def = start != null && opts.some((o) => o.value === start) ? start : "";
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Date">
        <input type="date" name="date" defaultValue={date ?? ""} required className={inputCls} />
      </Field>
      <Field label={`Start (runs ${hours} hr${hours > 1 ? "s" : ""})`}>
        <select name="start" defaultValue={def} required className={inputCls}>
          <option value="" disabled>
            Pick a time
          </option>
          {opts.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label} – {minutesLabel(o.value + hours * 60)}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}

type Props = {
  id: number;
  hours: number;
  requestedDate: string | null;
  requestedStart: number | null;
  startsAt: string | null;
};

export function PendingDecision({ id, hours, requestedDate, requestedStart }: Props) {
  const [mode, setMode] = useState<"accept" | "reject">("accept");
  const [aState, accept, aPending] = useActionState(acceptBooking, undefined);
  const [rState, reject, rPending] = useActionState(rejectBooking, undefined);

  return (
    <div>
      <div className="mb-4 inline-flex rounded-full border border-floor-900/15 p-1 text-sm">
        {(["accept", "reject"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-full px-4 py-1.5 capitalize ${mode === m ? (m === "accept" ? "bg-canopy-600 text-bone-50" : "bg-red-700 text-white") : ""}`}
          >
            {m}
          </button>
        ))}
      </div>

      {mode === "accept" ? (
        <form action={accept} className="space-y-4">
          <input type="hidden" name="id" value={id} />
          <SlotFields hours={hours} date={requestedDate} start={requestedStart} />
          <Field label="Note for the customer (optional)">
            <input name="note" className={inputCls} placeholder="e.g. Please arrive 10 minutes early" />
          </Field>
          <Alert state={aState?.ok ? undefined : aState} />
          <Submit pending={aPending}>Accept and lock the slot</Submit>
        </form>
      ) : (
        <form action={reject} className="space-y-4">
          <input type="hidden" name="id" value={id} />
          <Field label="Reason / message to the customer" hint="Shown in the WhatsApp message. Leave blank for a polite default.">
            <textarea name="note" rows={3} className={inputCls} placeholder="That slot is taken — could you do 4 PM instead?" />
          </Field>
          <Alert state={rState?.ok ? undefined : rState} />
          <Submit pending={rPending} tone="danger">
            Reject request
          </Submit>
        </form>
      )}
    </div>
  );
}

export function AcceptedControls({ id, hours, startsAt }: Props) {
  const [sState, reschedule, sPending] = useActionState(rescheduleBooking, undefined);
  const [cState, cancel, cPending] = useActionState(cancelBooking, undefined);
  return (
    <div className="space-y-6">
      <details className="group">
        <summary className="cursor-pointer text-sm font-semibold">Reschedule</summary>
        <form action={reschedule} className="mt-4 space-y-4">
          <input type="hidden" name="id" value={id} />
          <SlotFields hours={hours} date={startsAt?.slice(0, 10)} start={startsAt ? minutesOf(startsAt) : null} />
          <Alert state={sState} />
          <Submit pending={sPending}>Move booking</Submit>
        </form>
      </details>
      <details>
        <summary className="cursor-pointer text-sm font-semibold text-red-800">Cancel booking</summary>
        <form action={cancel} className="mt-4 space-y-4">
          <input type="hidden" name="id" value={id} />
          <Field label="Reason (internal)">
            <input name="note" className={inputCls} />
          </Field>
          <Alert state={cState?.ok ? undefined : cState} />
          <Submit pending={cPending} tone="danger">
            Cancel booking
          </Submit>
        </form>
      </details>
    </div>
  );
}
