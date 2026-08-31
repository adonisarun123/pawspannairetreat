import Image from "next/image";
import type { MediaSlot } from "@/lib/media";
import { cx } from "./ui";

/**
 * Renders a photograph, or — when the shot hasn't arrived yet — a quiet
 * brand-coloured panel at the same aspect ratio. The panel carries no
 * production notes: briefs live in `media.ts`, never on the public page.
 *
 * `ratio` overrides the slot's own aspect ratio so a row of figures can be
 * kept even regardless of the source photograph's shape.
 */
export function Figure({
  slot,
  className,
  imgClassName,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  showCaption = false,
  rounded = "rounded-2xl",
  ratio,
}: {
  slot: MediaSlot;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  showCaption?: boolean;
  rounded?: string;
  ratio?: string;
}) {
  return (
    <figure className={cx("group", className)}>
      <div
        className={cx("relative w-full overflow-hidden bg-bone-200", rounded)}
        style={{ aspectRatio: ratio ?? slot.ratio }}
      >
        {slot.src ? (
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes={sizes}
            priority={priority}
            style={slot.focus ? { objectPosition: slot.focus } : undefined}
            className={cx("object-cover", imgClassName)}
          />
        ) : (
          <Placeholder alt={slot.alt} />
        )}
      </div>
      {showCaption && slot.caption ? (
        <figcaption className="mt-3 text-sm leading-snug opacity-70">{slot.caption}</figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Deliberately wordless. A soft bone/tamarind wash with a single leaf mark —
 * reads as a design surface rather than as a missing asset.
 */
function Placeholder({ alt }: { alt: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bone-200 via-bone-200 to-tamarind-100"
      role="img"
      aria-label={alt}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-10 w-10 text-canopy-700/20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 22V9" />
        <path d="M12 12c0-4 2.6-6.8 7-7.6.5 4.6-2.3 7.6-7 7.6z" />
        <path d="M12 16c0-3.4-2.2-5.8-6-6.5.4 3.9 2 6.5 6 6.5z" />
      </svg>
    </div>
  );
}
