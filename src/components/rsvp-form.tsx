"use client";

import { useState } from "react";
import { WhatsAppGlyph } from "./session-planner";
import { cx } from "./ui";

/**
 * Invite RSVP: saves to the admin panel, then opens WhatsApp with the same
 * details so the team gets a message too. The save is fire-and-forget
 * (keepalive) so WhatsApp opens inside the click and isn't popup-blocked.
 */
export function RsvpForm({ whatsappNumber, eventLabel }: { whatsappNumber: string; eventLabel: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(2);
  const [dogs, setDogs] = useState(1);
  const [dogNames, setDogNames] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const fieldCls =
    "mt-1.5 w-full rounded-xl border border-floor-900/15 bg-bone-50 px-3.5 py-2.5 text-sm text-floor-900 outline-none transition-colors focus:border-canopy-600";
  const labelCls = "block text-xs font-semibold tracking-wide text-floor-700 uppercase";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Please add your name and a 10-digit phone number.");
      return;
    }
    setError("");
    void fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ name, phone, people, dogs, dogNames, notes, website }),
    }).catch(() => {});
    const text = [
      `Hi! I'd like to RSVP for the Paws Pannai launch on ${eventLabel}.`,
      "",
      `My name: ${name}`,
      `Phone: ${phone}`,
      `Number of people: ${people}`,
      `Number of dogs: ${dogs}`,
      dogNames ? `Dog's name(s): ${dogNames}` : "",
      notes ? `Notes: ${notes}` : "",
    ]
      .filter((l, i) => i === 1 || Boolean(l))
      .join("\n");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl bg-bone-50 p-6 text-left text-floor-900 sm:p-8">
        <p className="font-display text-2xl font-semibold">You&apos;re on the list, {name.split(" ")[0]}!</p>
        <p className="mt-2 text-sm opacity-75">
          We&apos;ve saved your RSVP for {people} {people === 1 ? "person" : "people"} and {dogs}{" "}
          {dogs === 1 ? "dog" : "dogs"}. If WhatsApp opened, press send so we can reply there.
        </p>
        <button type="button" onClick={() => setSent(false)} className="mt-4 text-sm font-semibold underline underline-offset-4">
          Change my RSVP
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl bg-bone-50 p-6 text-left text-floor-900 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Your name *</span>
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Phone (WhatsApp) *</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>People coming</span>
          <input type="number" min={1} max={30} value={people} onChange={(e) => setPeople(Number(e.target.value))} className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Dogs coming</span>
          <input type="number" min={0} max={10} value={dogs} onChange={(e) => setDogs(Number(e.target.value))} className={fieldCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelCls}>Dog&apos;s name(s)</span>
          <input value={dogNames} onChange={(e) => setDogNames(e.target.value)} placeholder="Bruno, Coco" className={fieldCls} />
        </label>
        <label className="block sm:col-span-2">
          <span className={labelCls}>Anything we should know?</span>
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Food preferences, a nervous pup…" className={fieldCls} />
        </label>
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      {error ? <p role="alert" className="mt-4 text-sm text-red-800">{error}</p> : null}
      <button
        type="submit"
        className={cx(
          "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-mango-400 px-8 py-3.5 text-base font-semibold text-floor-900 transition-colors hover:bg-mango-300 sm:w-auto",
        )}
      >
        <WhatsAppGlyph className="h-5 w-5" />
        RSVP
      </button>
      <p className="mt-3 text-xs opacity-60">We save your RSVP and open WhatsApp so you can send it to us too.</p>
    </form>
  );
}
