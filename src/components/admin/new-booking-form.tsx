"use client";

import { useActionState, useMemo, useState } from "react";
import { createManualBooking } from "@/app/admin/actions";
import { MAX_DOGS, MAX_HOURS, PRIVATE_MIN_DOGS, quote, rupees, type SessionMode } from "@/lib/pricing";
import { minutesLabel } from "@/lib/booking-format";
import { startOptions } from "./decision";
import { Alert, Field, Submit, inputCls } from "./forms";

export function NewBookingForm() {
  const [state, action, pending] = useActionState(createManualBooking, undefined);
  const [mode, setMode] = useState<SessionMode>("shared");
  const [dogs, setDogs] = useState(1);
  const [hours, setHours] = useState(2);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [under5, setUnder5] = useState(0);
  const [acceptNow, setAcceptNow] = useState(true);
  const q = useMemo(() => quote({ mode, dogs, hours, adults, kids, under5 }), [mode, dogs, hours, adults, kids, under5]);

  const num = (v: number, set: (n: number) => void, max: number, min = 0) => (
    <input type="number" min={min} max={max} value={v} onChange={(e) => set(Number(e.target.value))} className={inputCls} />
  );

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Customer name">
          <input name="name" required className={inputCls} />
        </Field>
        <Field label="Phone (WhatsApp)">
          <input name="phone" type="tel" required className={inputCls} placeholder="98xxxxxxxx" />
        </Field>
        <Field label="Session">
          <select name="mode" value={mode} onChange={(e) => setMode(e.target.value as SessionMode)} className={inputCls}>
            <option value="shared">Shared park — ₹500/dog/hr</option>
            <option value="private">Private park — ₹1,000/dog/hr (min {PRIVATE_MIN_DOGS} dogs)</option>
          </select>
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
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="Dogs"><span className="contents">{num(dogs, setDogs, MAX_DOGS, 1)}</span></Field>
        <Field label="Adults 12+"><span className="contents">{num(adults, setAdults, 30)}</span></Field>
        <Field label="Kids 5–12"><span className="contents">{num(kids, setKids, 30)}</span></Field>
        <Field label="Under 5"><span className="contents">{num(under5, setUnder5, 30)}</span></Field>
      </div>
      <input type="hidden" name="dogs" value={dogs} />
      <input type="hidden" name="adults" value={adults} />
      <input type="hidden" name="kids" value={kids} />
      <input type="hidden" name="under5" value={under5} />
      <div className="grid gap-4 sm:grid-cols-2">
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
        <input type="checkbox" name="acceptNow" checked={acceptNow} onChange={(e) => setAcceptNow(e.target.checked)} /> Confirmed — accept
        and lock the slot now
      </label>
      <Field label="Notes">
        <textarea name="notes" rows={2} className={inputCls} />
      </Field>
      <p className="text-sm">
        Quote: <strong>{rupees(q.total)}</strong>{" "}
        <span className="opacity-60">
          (dogs {rupees(q.dogTotal)}
          {q.billedDogs > q.dogs ? `, billed as ${q.billedDogs} dogs` : ""} · guests {rupees(q.peopleTotal)})
        </span>
      </p>
      <Alert state={state} />
      <Submit pending={pending}>Save booking</Submit>
    </form>
  );
}
