/*
 * Lightweight, brand-flavoured decorative primitives.
 *
 * All of these are purely visual (aria-hidden) and inherit their colour from
 * the surrounding text colour via `currentColor`, so they can be tinted with a
 * Tailwind text-* class on the element itself. They are positioned absolutely,
 * so the parent must be `relative` and usually `overflow-hidden`.
 */

/** Subtle dotted-grid texture for otherwise flat sections. */
export function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: "radial-gradient(currentColor 1px, transparent 1.5px)",
        backgroundSize: "26px 26px",
      }}
    />
  );
}

/** Concentric "Neptune" orbit rings with a planet + moons — a quiet brand motif. */
export function OrbitMotif({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 480 480" fill="none" className={className}>
      <circle cx="240" cy="240" r="78" fill="currentColor" fillOpacity="0.10" />
      <circle
        cx="240"
        cy="240"
        r="78"
        stroke="currentColor"
        strokeOpacity="0.30"
        strokeWidth="1.5"
      />
      <circle
        cx="240"
        cy="240"
        r="140"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1.5"
      />
      <circle
        cx="240"
        cy="240"
        r="205"
        stroke="currentColor"
        strokeOpacity="0.13"
        strokeWidth="1.5"
      />
      <circle cx="240" cy="100" r="6" fill="currentColor" fillOpacity="0.75" />
      <circle cx="445" cy="240" r="4.5" fill="currentColor" fillOpacity="0.55" />
      <circle cx="92" cy="318" r="3.5" fill="currentColor" fillOpacity="0.45" />
    </svg>
  );
}

/** Soft blurred colour wash — drop one or two in to give flat sections depth. */
export function GradientBlob({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
    />
  );
}
