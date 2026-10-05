"use client";

import { useMemo, useState } from "react";
import {
  ADULT_RATE,
  CHILD_RATE,
  MAX_DOGS,
  MAX_HOURS,
  MIN_HOURS,
  PARK_CAPACITY,
  POOL_SWIM_MINUTES,
  PRIVATE_MIN_DOGS,
  PRIVATE_RATE,
  SHARED_RATE,
  quote,
  rupees,
  type SessionMode,
} from "@/lib/pricing";
import { CLOSE_MIN, OPEN_MIN } from "@/lib/booking-format";
import { contact, hours as openHours, whatsappLink } from "@/lib/site";
import { Button, Card, cx } from "./ui";

/* Slot helpers -------------------------------------------------------- */

function label(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function startOptions(durationHours: number): { value: number; label: string }[] {
  const out: { value: number; label: string }[] = [];
  for (let t = OPEN_MIN; t + durationHours * 60 <= CLOSE_MIN; t += 30) {
    out.push({ value: t, label: label(t) });
  }
  return out;
}

function todayISO(): string {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

const REF_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function newRef(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return "PP-" + Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("");
}

/* Component ----------------------------------------------------------- */

export function SessionPlanner({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<SessionMode>("shared");
  const [dogs, setDogs] = useState(1);
  const [duration, setDuration] = useState(2);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [under5, setUnder5] = useState(0);
  const [date, setDate] = useState("");
  const [start, setStart] = useState<number | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [ref, setRef] = useState("");
  const [formError, setFormError] = useState("");

  const starts = useMemo(() => startOptions(duration), [duration]);
  const q = useMemo(
    () => quote({ mode, dogs, hours: duration, adults, kids, under5 }),
    [mode, dogs, duration, adults, kids, under5],
  );

  const startLabel = typeof start === "number" ? label(start) : "any time you have free";
  const endLabel = typeof start === "number" ? label(start + duration * 60) : "";

  const buildMessage = (bookingRef: string) => [
    "Hi Paws Pannai — I'd like to book a session.",
    bookingRef ? `Booking ref: ${bookingRef}` : "",
    "",
    `Session: ${mode === "private" ? "Private park (whole park)" : "Shared park"}`,
    `Dogs: ${dogs}`,
    `People: ${adults} aged 12+, ${kids} aged 5–12, ${under5} under 5`,
    `Length: ${duration} hour${duration > 1 ? "s" : ""}`,
    `Date: ${date || "flexible"}`,
    `Time: ${typeof start === "number" ? `${startLabel} – ${endLabel}` : "flexible"}`,
    `Estimated total: ${rupees(q.total)}`,
    "",
    name ? `Name: ${name}` : "",
    phone ? `Phone: ${phone}` : "",
    notes ? `Notes: ${notes}` : "",
  ]
    .filter((line, i) => i === 2 || Boolean(line))
    .join("\n");

  /**
   * Saves the request for the admin panel, then hands off to WhatsApp/email.
   * The save is fire-and-forget (keepalive) so the hand-off is never blocked
   * — and never opened late enough for a popup blocker to catch it.
   */
  function send(channel: "whatsapp" | "email") {
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setFormError("Add your name and a 10-digit phone number so we can confirm your slot.");
      document.getElementById(name.trim() ? "sp-phone" : "sp-name")?.focus();
      return;
    }
    setFormError("");
    const bookingRef = ref || newRef();
    setRef(bookingRef);
    try {
      void fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          ref: bookingRef,
          name,
          phone,
          mode,
          dogs,
          hours: duration,
          adults,
          kids,
          under5,
          date: date || null,
          start: typeof start === "number" ? start : null,
          notes,
          website,
        }),
      }).catch(() => {});
    } catch {
      /* the WhatsApp message still carries everything */
    }
    const text = buildMessage(bookingRef);
    if (channel === "whatsapp") {
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        `Session booking request ${bookingRef} — Paws Pannai`,
      )}&body=${encodeURIComponent(text)}`;
    }
  }


  const fieldCls =
    "w-full rounded-xl border border-floor-900/15 bg-bone-50 px-3.5 py-2.5 text-sm text-floor-900 outline-none transition-colors focus:border-canopy-600";
  const labelCls = "block text-xs font-semibold tracking-wide text-floor-700 uppercase";

  return (
    <Card className="scroll-mt-28" tone="paper">
      <div className={cx("grid gap-8", compact ? "" : "lg:grid-cols-[1.15fr_1fr]")}>
        {/* ---------------------------------------------------- inputs */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-2xl font-semibold">Plan your session</h3>
            <p className="mt-2 text-sm leading-relaxed opacity-75">
              Set it up here, then send it to us on WhatsApp. We confirm the slot against the
              day&apos;s calendar and reply with a time. Open {openHours.short}.
            </p>
          </div>

          <fieldset>
            <legend className={labelCls}>Shared or private?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              <Choice
                selected={mode === "shared"}
                onClick={() => setMode("shared")}
                label={`Shared park · ${rupees(SHARED_RATE)}/dog/hr`}
              />
              <Choice
                selected={mode === "private"}
                onClick={() => setMode("private")}
                label={`Private park · ${rupees(PRIVATE_RATE)}/dog/hr`}
              />
            </div>
            <p className="mt-2.5 text-xs leading-relaxed opacity-65">
              {mode === "shared"
                ? `Your dogs play alongside other families' dogs — never more than ${PARK_CAPACITY} dogs in the park at once.`
                : `The whole park and pool to your group, no other dogs. Charged for a minimum of ${PRIVATE_MIN_DOGS} dogs.`}
            </p>
          </fieldset>

          <fieldset>
            <legend className={labelCls}>How many dogs?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.from({ length: MAX_DOGS }, (_, i) => i + 1).map((n) => (
                <Choice key={n} selected={dogs === n} onClick={() => setDogs(n)} label={String(n)} />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={labelCls}>Who&apos;s coming with them?</legend>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <Counter label="12+ yrs" value={adults} onChange={setAdults} />
              <Counter label="5–12 yrs" value={kids} onChange={setKids} />
              <Counter label="Under 5" value={under5} onChange={setUnder5} />
            </div>
            <p className="mt-2.5 text-xs leading-relaxed opacity-65">
              One person per dog comes free. Beyond that: under 5 free, 5–12 {rupees(CHILD_RATE)}/hr,
              12+ {rupees(ADULT_RATE)}/hr.
            </p>
          </fieldset>

          <fieldset>
            <legend className={labelCls}>For how long?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {Array.from({ length: MAX_HOURS - MIN_HOURS + 1 }, (_, i) => i + MIN_HOURS).map(
                (h) => (
                  <Choice
                    key={h}
                    selected={duration === h}
                    onClick={() => {
                      setDuration(h);
                      setStart("");
                    }}
                    label={`${h} hr${h > 1 ? "s" : ""}`}
                  />
                ),
              )}
            </div>
            <p className="mt-2.5 text-xs opacity-65">
              The bone pool is included. Dogs swim {POOL_SWIM_MINUTES} minutes at a time, then take a
              break before going back in.
            </p>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="sp-date">
                Preferred date
              </label>
              <input
                id="sp-date"
                type="date"
                min={todayISO()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={cx(fieldCls, "mt-2")}
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="sp-start">
                Start time
              </label>
              <select
                id="sp-start"
                value={start}
                onChange={(e) => setStart(e.target.value === "" ? "" : Number(e.target.value))}
                className={cx(fieldCls, "mt-2")}
              >
                <option value="">I&apos;m flexible</option>
                {starts.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label} – {label(s.value + duration * 60)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="sp-name">
                Your name *
              </label>
              <input
                id="sp-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={cx(fieldCls, "mt-2")}
                autoComplete="name"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="sp-phone">
                Phone (WhatsApp) *
              </label>
              <input
                id="sp-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={cx(fieldCls, "mt-2")}
                autoComplete="tel"
              />
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="sp-notes">
              Anything we should know?
            </label>
            <textarea
              id="sp-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Breed and age, first visit, nervous around other dogs, bringing kids…"
              className={cx(fieldCls, "mt-2 resize-y")}
            />
          </div>
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>
        </div>

        {/* --------------------------------------------------- estimate */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl bg-canopy-600 p-6 text-bone-50">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase opacity-75">
              Your estimate
            </p>
            <p className="mt-4 font-display text-4xl font-semibold">{rupees(q.total)}</p>
            <p className="mt-2 text-sm opacity-80">
              {mode === "private" ? "Private park" : "Shared park"} · {dogs} dog{dogs > 1 ? "s" : ""} ·{" "}
              {duration} hour{duration > 1 ? "s" : ""} · pool included
            </p>

            <dl className="mt-6 space-y-2.5 border-t border-bone-50/20 pt-5 text-sm">
              <Row
                label={`Dogs — ${rupees(q.dogRate)}/dog/hr${q.billedDogs > q.dogs ? ` × ${q.billedDogs} (min.)` : ""}`}
                value={rupees(q.dogTotal)}
              />
              <Row
                label={`People — ${q.freePlaces} free${q.chargedAdults ? ` · ${q.chargedAdults} × 12+` : ""}${q.chargedKids ? ` · ${q.chargedKids} × 5–12` : ""}`}
                value={rupees(q.peopleTotal)}
              />
            </dl>

            <p className="mt-5 rounded-xl bg-mango-400 px-3.5 py-2.5 text-xs leading-relaxed text-floor-900">
              Introductory pricing.
              {q.billedDogs > q.dogs
                ? ` Private bookings are charged for at least ${PRIVATE_MIN_DOGS} dogs — the shared park is ${rupees(SHARED_RATE)}/dog/hr.`
                : " One person per dog is always free."}
            </p>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => send("whatsapp")}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-mango-400 px-6 py-3 text-sm font-semibold text-floor-900 transition-colors hover:bg-mango-300"
              >
                <WhatsAppGlyph className="h-4 w-4" />
                Send this on WhatsApp
              </button>
              <button
                type="button"
                onClick={() => send("email")}
                className="flex w-full items-center justify-center rounded-full border border-bone-50/35 px-6 py-3 text-sm font-semibold transition-colors hover:bg-bone-50/10"
              >
                Email it instead
              </button>
              {formError ? (
                <p role="alert" className="rounded-xl bg-bone-50 px-3.5 py-2.5 text-xs text-red-800">
                  {formError}
                </p>
              ) : null}
              {ref && !formError ? (
                <p className="text-xs opacity-80">
                  Request {ref} sent — we&apos;ll confirm on WhatsApp.
                </p>
              ) : null}
            </div>

            <p className="mt-4 text-xs leading-relaxed opacity-70">
              This is an estimate, not a payment. Your slot is held once we reply and confirm it.
            </p>
          </div>

          <p className="mt-4 text-xs leading-relaxed opacity-65">
            Bringing more than {MAX_DOGS} dogs, or planning a birthday?{" "}
            <a
              href="/parties-and-training"
              className="underline underline-offset-4 hover:text-canopy-700"
            >
              Ask about a private event instead
            </a>
            .
          </p>
        </div>
      </div>
    </Card>
  );
}

function Counter({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="rounded-xl border border-floor-900/15 bg-bone-50 p-2 text-center">
      <p className="text-[11px] font-semibold tracking-wide text-floor-700 uppercase">{label}</p>
      <div className="mt-1.5 flex items-center justify-between gap-1">
        <button
          type="button"
          aria-label={`Fewer ${label}`}
          onClick={() => onChange(Math.max(0, value - 1))}
          className="h-8 w-8 rounded-full border border-floor-900/20 text-lg leading-none hover:bg-floor-900/5"
        >
          −
        </button>
        <span className="font-display text-xl font-semibold tabular-nums">{value}</span>
        <button
          type="button"
          aria-label={`More ${label}`}
          onClick={() => onChange(Math.min(30, value + 1))}
          className="h-8 w-8 rounded-full border border-floor-900/20 text-lg leading-none hover:bg-floor-900/5"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="opacity-80">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function Choice({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <Button
      type="button"
      tone={selected ? "canopy" : "outline"}
      onClick={onClick}
      aria-pressed={selected}
      className={cx("px-4 py-2", selected ? "" : "text-floor-700")}
    >
      {label}
    </Button>
  );
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 01-1.25-4.38c0-4.54 3.7-8.23 8.23-8.23a8.18 8.18 0 015.82 2.41 8.18 8.18 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.1-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.21 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}
