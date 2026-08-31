import Link from "next/link";
import { WhatsAppGlyph } from "./session-planner";
import { whatsappLink } from "@/lib/site";

/**
 * IA §03 — one persistent Book button. On small screens the header can't hold
 * it, so it lives here instead: always reachable, never covering the footer.
 */
export function MobileBookBar() {
  return (
    <div className="sticky bottom-0 z-40 border-t border-floor-900/10 bg-bone-50/95 backdrop-blur sm:hidden">
      <div className="flex items-center gap-2 px-4 py-3">
        <Link
          href="/sessions#plan"
          className="flex flex-1 items-center justify-center rounded-full bg-mango-400 px-5 py-3 text-sm font-semibold text-floor-900"
        >
          Book a Session
        </Link>
        <a
          href={whatsappLink("Hi! I'd like to book a session at Paws Pannai.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message us on WhatsApp"
          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-floor-900/20 text-canopy-700"
        >
          <WhatsAppGlyph className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
