"use client";

/**
 * Loader — a custom, single-purpose loading indicator built for this
 * portfolio's editorial ink→purple palette. Inspired by the single-element
 * pure-CSS loaders at loaders.wtf, but hand-tuned to match the site's
 * halftone / paper aesthetic rather than copied.
 *
 * Three dots orbit a shared center on a staggered delay; each dot drifts
 * from ink (#1a1a1a) to the accent purple (#6B6FA3) as it travels. Honors
 * prefers-reduced-motion via the keyframe fallback in globals.css.
 */

type LoaderProps = {
  /** Diameter of the orbit in pixels. */
  size?: number;
  /**
   * Palette. "ink" (default) drifts dark→purple for light surfaces;
   * "light" drifts white→purple for dark surfaces.
   */
  tone?: "ink" | "light";
  /** Optional label announced to screen readers. */
  label?: string;
  className?: string;
};

const TONES = {
  ink: { from: "#1a1a1a", to: "#6B6FA3" },
  light: { from: "#ffffff", to: "#B9BCE0" },
} as const;

export default function Loader({
  size = 40,
  tone = "ink",
  label = "Loading",
  className = "",
}: LoaderProps) {
  const dot = Math.max(4, Math.round(size * 0.18));
  const { from, to } = TONES[tone];

  return (
    <div
      role="status"
      aria-label={label}
      className={`orbit-loader ${className}`}
      style={
        {
          width: size,
          height: size,
          "--orbit-dot": `${dot}px`,
          "--orbit-from": from,
          "--orbit-to": to,
        } as React.CSSProperties
      }
    >
      <span className="orbit-dot orbit-dot-1" />
      <span className="orbit-dot orbit-dot-2" />
      <span className="orbit-dot orbit-dot-3" />
      <span className="sr-only">{label}…</span>
    </div>
  );
}
