import NextImage from "next/image";
import { preload } from "react-dom";
import {
  DELIVERY_FORMATS,
  deliverySrcSet,
  deliveryUrl,
  ikPath,
  imagekitEnabled,
  lqipUrl,
} from "@/lib/imagekit";
import type { MediaSlot } from "@/lib/media";
import { cx } from "./ui";

/**
 * Renders a photograph, or — when the shot hasn't arrived yet — a quiet
 * brand-coloured panel at the same aspect ratio. The panel carries no
 * production notes: briefs live in `media.ts`, never on the public page.
 *
 * `ratio` overrides the slot's own aspect ratio so a row of figures can be
 * kept even regardless of the source photograph's shape.
 *
 * Loading: `priority` marks the above-the-fold hero (eager, fetchpriority=high,
 * preloaded). Every other figure is lazy and decoded off the main thread.
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
  // The full image is opaque and object-cover, so it simply covers the
  // placeholder once decoded — no client-side onLoad bookkeeping, no flash on SSR.
  const src = slot.src && imagekitEnabled ? ikPath(slot.src) : slot.src;
  const lqip = src ? lqipUrl(src) : null;

  return (
    <figure className={cx("group", className)}>
      <div
        className={cx("relative w-full overflow-hidden bg-bone-200", rounded)}
        style={{
          aspectRatio: ratio ?? slot.ratio,
          ...(lqip
            ? {
                backgroundImage: `url(${lqip})`,
                backgroundSize: "cover",
                backgroundPosition: slot.focus ?? "center",
                backgroundRepeat: "no-repeat",
              }
            : null),
        }}
      >
        {src && imagekitEnabled ? (
          <Picture slot={slot} src={src} sizes={sizes} priority={priority} className={imgClassName} />
        ) : src ? (
          <NextImage
            src={src}
            alt={slot.alt}
            fill
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : "lazy"}
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
 * ImageKit delivery as a native <picture>: the browser picks the first format
 * it decodes (AVIF, then WebP), each at the quality that suits that encoder,
 * and the width that fits `sizes` × device pixel ratio. A JPEG `src` is the
 * last resort for anything that understands neither.
 *
 * `priority` makes it the LCP candidate: fetched eagerly at high priority and
 * announced with a preload hint so the download starts during HTML parse.
 * The hint is typed AVIF — browsers that can't decode it ignore the hint and
 * simply fetch WebP when they reach the <img>.
 */
function Picture({
  slot,
  src,
  sizes,
  priority,
  className,
}: {
  slot: MediaSlot;
  src: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const fallback = deliveryUrl(src, 1200, "jpg", 75);
  const sets = DELIVERY_FORMATS.map((f) => ({
    mime: f.mime,
    srcSet: deliverySrcSet(src, slot.width, f.format, f.quality),
  }));

  if (priority) {
    preload(fallback, {
      as: "image",
      type: sets[0].mime,
      imageSrcSet: sets[0].srcSet,
      imageSizes: sizes,
      fetchPriority: "high",
    });
  }

  return (
    <picture>
      {sets.map((s) => (
        <source key={s.mime} type={s.mime} srcSet={s.srcSet} sizes={sizes} />
      ))}
      <img
        src={fallback}
        alt={slot.alt}
        width={slot.width}
        height={slot.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        style={slot.focus ? { objectPosition: slot.focus } : undefined}
        className={cx("absolute inset-0 h-full w-full object-cover", className)}
      />
    </picture>
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
