/**
 * The shared PlantRx leaf glyph: one clean leaf with an etched center vein,
 * side veins, and a small stem. Used by the showcase mark and the falling
 * leaves. Colored via `currentColor` (text-* classes).
 */
export default function LeafGlyph({ className }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* leaf body */}
      <path
        d="M32 7 C 19 15, 14.5 28, 32 45 C 49.5 28, 45 15, 32 7 Z"
        fill="currentColor"
      />
      {/* center vein + side veins, etched light */}
      <g stroke="#fff" strokeLinecap="round" opacity="0.45">
        <path d="M32 11 C 32 20, 32 30, 32 41" strokeWidth="1.7" />
        <path d="M32 17 C 27.5 18.5, 24 21.5, 22 25.5" strokeWidth="1.3" />
        <path d="M32 17 C 36.5 18.5, 40 21.5, 42 25.5" strokeWidth="1.3" />
        <path d="M32 27 C 28.5 28.5, 26 30.5, 24.5 33.5" strokeWidth="1.3" />
        <path d="M32 27 C 35.5 28.5, 38 30.5, 39.5 33.5" strokeWidth="1.3" />
      </g>
      {/* stem */}
      <path
        d="M32 44 C 32 48, 31.5 50.5, 30.5 53.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
