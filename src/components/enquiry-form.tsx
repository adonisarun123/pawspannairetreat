"use client";

import { useState } from "react";
import { contact, whatsappLink } from "@/lib/site";
import { Card, cx } from "./ui";
import { WhatsAppGlyph } from "./session-planner";

export type EnquiryField = {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "date" | "number" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  autoComplete?: string;
};

/**
 * A general enquiry form that composes a structured WhatsApp message.
 * No server, no database — the enquiry lands in the same inbox the team
 * already watches. Swap in a server action later if a CRM arrives.
 */
export function EnquiryForm({
  title,
  intro,
  subject,
  fields,
  id,
}: {
  title: string;
  intro?: string;
  subject: string;
  fields: EnquiryField[];
  id?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});

  const set = (name: string, value: string) =>
    setValues((v) => ({ ...v, [name]: value }));

  const filled = fields
    .map((f) => (values[f.name] ? `${f.label}: ${values[f.name]}` : null))
    .filter(Boolean) as string[];

  const message = [`Hi Paws Pannai — ${subject}`, "", ...filled].join("\n");

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(message)}`;

  const fieldCls =
    "w-full rounded-xl border border-floor-900/15 bg-bone-50 px-3.5 py-2.5 text-sm text-floor-900 outline-none transition-colors focus:border-canopy-600";
  const labelCls = "block text-xs font-semibold tracking-wide text-floor-700 uppercase";

  return (
    <Card id={id} className="scroll-mt-28">
      <h3 className="font-display text-2xl font-semibold">{title}</h3>
      {intro ? <p className="mt-2 text-sm leading-relaxed opacity-75">{intro}</p> : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : undefined}>
            <label className={labelCls} htmlFor={`${id ?? "enq"}-${f.name}`}>
              {f.label}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={`${id ?? "enq"}-${f.name}`}
                rows={3}
                placeholder={f.placeholder}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={cx(fieldCls, "mt-2 resize-y")}
              />
            ) : f.type === "select" ? (
              <select
                id={`${id ?? "enq"}-${f.name}`}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={cx(fieldCls, "mt-2")}
              >
                <option value="">Choose one</option>
                {(f.options ?? []).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`${id ?? "enq"}-${f.name}`}
                type={f.type ?? "text"}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                value={values[f.name] ?? ""}
                onChange={(e) => set(f.name, e.target.value)}
                className={cx(fieldCls, "mt-2")}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-mango-400 px-6 py-3 text-sm font-semibold text-floor-900 transition-colors hover:bg-mango-300"
        >
          <WhatsAppGlyph className="h-4 w-4" />
          Send on WhatsApp
        </a>
        <a
          href={mailto}
          className="inline-flex flex-1 items-center justify-center rounded-full border border-floor-900/25 px-6 py-3 text-sm font-semibold transition-colors hover:bg-floor-900/5"
        >
          Email it instead
        </a>
      </div>

      <p className="mt-4 text-xs leading-relaxed opacity-65">
        We reply on WhatsApp, usually the same day within opening hours.
      </p>
    </Card>
  );
}
