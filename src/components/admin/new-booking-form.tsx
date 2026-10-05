"use client";

import { useActionState, useMemo, useState } from "react";
import { createManualBooking } from "@/app/admin/actions";
import { MAX_HOURS, quote, rupees } from "@/lib/pricing";
import { minutesLabel } from "@/lib/booking-format";
import { startOptions } from "./decision";
import { Alert, Field, Submit, inputCls } from "./forms";

export function NewBookingForm() {
  const [state, action, pending] = useActionState(createManualBooking, undefined);
  const [dogs, setDogs] = useState(1);
  const [hours, setHours] = useState(2);
  const [pool, setPool] = useState(false);
  const [acceptNow, setAcceptNow] = useState(true);
  const q = useMemo(() => quote({ dogs, hours, pool }), [dogs, hours, pool]);

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Customer name">
          <input name="name" required className={inputCls} />
        </Field>
        <Field label="Phone (WhatsApp)">
          <input name="phone" type="tel" required className={inputCls} placeholder="98xxxxxxxx" />
        </Field>
        <Field label="Dogs">
          <input name="dogs" type="number" min={1} max={10} value={dogs} onChange={(e) => setDogs(Number(e.target.value))} className={inputCls} />
        </Field>
        <Field label="Hours">
          <select name="hours" value={hours} onChange={(e) => setHours(Number(e.target.value))} className={inputCls}>
            {Array.from({ length: MAX_HOURS }, (_, i) => i + 1).map((h) => (
              <option key={h} value={h}>
                {h} hour{h > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Date">
          <input name="date" type="date" required={acceptNow} className={inputCls} />
        </Field>
        <Field label="Start">
          <select name="start" required={acceptNow} defaultValue="" className={inputCls}>
            <option value="">{acceptNow ? "Pick a time" : "Flexible"}</option>
            {startOptions(hours).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label} – {minutesLabel(o.value + hours * 60)}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="pool" checked={pool} onChange={(e) => setPool(e.target.checked)} /> Add the pool
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="acceptNow" checked={acceptNow} onChange={(e) => setAcceptNow(e.target.checked)} /> Confirmed — accept
        and lock the slot now
      </label>
      <Field label="Notes">
        <textarea name="notes" rows={2} className={inputCls} />
      </Field>
      <p className="text-sm">
        Quote: <strong>{rupees(q.total)}</strong> <span className="opacity-60">({rupees(q.rate)}/dog/hr{pool ? " + pool" : ""})</span>
      </p>
      <Alert state={state} />
      <Submit pending={pending}>Save booking</Submit>
    </form>
  );
}
