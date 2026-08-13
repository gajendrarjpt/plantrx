import { Leaf } from "lucide-react";

/**
 * Fixed, decorative-only backdrop behind every screen.
 * Soft moss/sun glows + faint leaf outlines. Pure CSS/SVG — no images,
 * no network requests, no performance cost at rest.
 */
export default function BotanicalBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Soft light from above */}
      <div
        className="absolute -top-44 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgb(212 228 205 / 0.6), transparent 70%)" }}
      />
      {/* Warm sunlight hint, lower right */}
      <div
        className="absolute -bottom-52 -right-44 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgb(244 210 145 / 0.26), transparent 70%)" }}
      />
      {/* Faint botanical outlines */}
      <Leaf
        className="absolute -left-14 top-28 h-64 w-64 rotate-[-12deg] text-moss-200/70"
        strokeWidth={1}
      />
      <Leaf
        className="absolute -right-12 bottom-32 h-72 w-72 rotate-[14deg] text-moss-200/60"
        strokeWidth={1}
      />
    </div>
  );
}
