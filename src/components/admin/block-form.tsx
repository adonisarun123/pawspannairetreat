"use client";

import { useActionState, useState } from "react";
import { addBlock } from "@/app/admin/actions";
import { CLOSE_MIN, OPEN_MIN, minutesLabel } from "@/lib/booking-format";
import { Alert, Field, Submit, inputCls } from "./forms";

const times = Array.from({ length: (CLOSE_MIN - OPEN_MIN) / 30 + 1 }, (_, i) => OPEN_MIN + i * 30);

export function BlockForm() {
  const [state, action, pending] = useActionState(addBlock, undefined);
  const [allDay, setAllDay] = useState(true);
  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Date">
          <input type="date" name="date" required className={inputCls} />
        </Field>
        {!allDay ? (
          <>
            <Field label="From">
              <select name="start" className={inputCls} defaultValue={OPEN_MIN}>
                {times.slice(0, -1).map((t) => <option key={t} value={t}>{minutesLabel(t)}</option>)}
              </select>
            </Field>
            <Field label="Until">
              <select name="end" className={inputCls} defaultValue={CLOSE_MIN}>
                {times.slice(1).map((t) => <option key={t} value={t}>{minutesLabel(t)}</option>)}
              </select>
            </Field>
          </>
        ) : null}
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="allDay" checked={allDay} onChange={(e) => setAllDay(e.target.checked)} /> Whole day
      </label>
      <Field label="Reason (staff only)">
        <input name="reason" className={inputCls} placeholder="Pool maintenance, private event, closed…" />
      </Field>
      <Alert state={state} />
      <Submit pending={pending}>Block this time</Submit>
    </form>
  );
}
