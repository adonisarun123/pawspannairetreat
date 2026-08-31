import Image from "next/image";
import type { MediaSlot } from "@/lib/media";
import { cx } from "./ui";

/**
 * Renders a photograph, or — when the shot hasn't arrived yet — a labelled
 * placeholder at exactly the same aspect ratio, carrying the brief for whoever
 * takes it. Layout is identical either way, so dropping the real file in later
 * never moves anything on the page.
 */
export function Figure({
  slot,
  className,
  imgClassName,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  showCaption = false,
  rounded = "rounded-2xl",
}: {
  slot: MediaSlot;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
  rounded?: string;
}) {
  return (
    <figure className={cx("group", className)}>
      <div
        className={cx("relative w-full overflow-hidden bg-bone-200", rounded)}
        style={{ aspectRatio: slot.ratio }}
      >
        {slot.src ? (
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cx("object-cover", imgClassName)}
          />
        ) : (
          <Placeholder slot={slot} />
        )}
      </div>
      {showCaption && slot.caption ? (
        <figcaption className="mt-3 text-sm leading-snug opacity-70">{slot.caption}</figcaption>
      ) : null}
    </figure>
  );
}

function Placeholder({ slot }: { slot: MediaSlot }) {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-between gap-3 border-2 border-dashed border-tamarind-300 bg-tamarind-100/60 p-5 text-left"
      role="img"
      aria-label={`Photograph pending: ${slot.alt}`}
    >
      <div className="flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.14em] text-tamarind-600 uppercase">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden>
          <path
            d="M3 17l5.5-6 4 4.5L16 12l5 5M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Photo pending · {slot.ratio.replace(/\s/g, "")}
      </div>
      <div className="min-h-0">
        <p className="font-display text-base leading-snug font-semibold text-floor-900">
          {slot.alt}
        </p>
        {slot.brief ? (
          <p className="mt-1.5 line-clamp-4 text-xs leading-relaxed text-floor-700/80">
            {slot.brief}
          </p>
        ) : null}
      </div>
    </div>
  );
}
