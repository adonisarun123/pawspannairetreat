/** Formatting and messaging helpers shared by the admin panel (client-safe). */

export type BookingStatus = "pending" | "accepted" | "rejected" | "cancelled";

export const OPEN_MIN = 8 * 60; // 08:00
export const CLOSE_MIN = 19 * 60 + 30; // 19:30

export function minutesLabel(minutes: number): string {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** "2026-10-10T15:00" → minutes since midnight. */
export function minutesOf(localDateTime: string): number {
  const [h, m] = localDateTime.slice(11, 16).split(":").map(Number);
  return h * 60 + m;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "2026-10-10" → "Sat, 10 Oct 2026" (no timezone maths — dates are IST calendar dates). */
export function dateLabel(isoDate: string): string {
  const [y, mo, d] = isoDate.slice(0, 10).split("-").map(Number);
  const dow = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  return `${DAYS[dow]}, ${d} ${MONTHS[mo - 1]} ${y}`;
}

export function slotLabel(startsAt: string | null, endsAt: string | null): string {
  if (!startsAt || !endsAt) return "Time not set";
  return `${dateLabel(startsAt)} · ${minutesLabel(minutesOf(startsAt))} – ${minutesLabel(minutesOf(endsAt))}`;
}

/** Today's date in IST as YYYY-MM-DD. */
export function todayIST(): string {
  return new Date(Date.now() + 5.5 * 3600_000).toISOString().slice(0, 10);
}

export function addDays(isoDate: string, n: number): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

/** Indian mobile numbers to wa.me format: digits only, 91-prefixed when 10 digits. */
export function waNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
  return digits;
}

export function customerWhatsApp(phone: string, message: string): string {
  return `https://wa.me/${waNumber(phone)}?text=${encodeURIComponent(message)}`;
}

type MessageBooking = {
  ref: string;
  customer_name: string;
  dogs: number;
  hours: number;
  pool: boolean;
  starts_at: string | null;
  ends_at: string | null;
  quoted_total: number;
  staff_note?: string | null;
};

export function acceptMessage(b: MessageBooking, mapsLink: string): string {
  return [
    `Hi ${b.customer_name.split(" ")[0]}, your Paws Pannai session is confirmed!`,
    "",
    `Booking: ${b.ref}`,
    `When: ${slotLabel(b.starts_at, b.ends_at)}`,
    `Dogs: ${b.dogs} · ${b.hours} hr${b.hours > 1 ? "s" : ""}${b.pool ? " · pool added" : ""}`,
    `Total: ₹${b.quoted_total.toLocaleString("en-IN")}`,
    "",
    `Directions: ${mapsLink}`,
    "See you and your pack soon!",
  ].join("\n");
}

export function rejectMessage(b: MessageBooking): string {
  return [
    `Hi ${b.customer_name.split(" ")[0]}, thanks for booking with Paws Pannai (${b.ref}).`,
    "",
    b.staff_note
      ? b.staff_note
      : "Unfortunately we can't take this slot. Reply here and we'll find you another time that works.",
  ].join("\n");
}

export const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "bg-mango-100 text-tamarind-600 ring-tamarind-300/60",
  accepted: "bg-canopy-50 text-canopy-700 ring-canopy-300",
  rejected: "bg-red-50 text-red-700 ring-red-200",
  cancelled: "bg-bone-200 text-bone-700 ring-bone-400",
};
