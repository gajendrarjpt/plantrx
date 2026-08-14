import { motion } from "framer-motion";
import LeafGlyph from "./LeafGlyph";

/**
 * A very gentle rain of tiny leaves drifting down the home screen, behind all
 * content. Purely decorative, slow, and sparse — a calm botanical whisper.
 *
 * The whole layer is hidden under prefers-reduced-motion (see .falling-leaves
 * in index.css), since it's decoration only.
 */
const LEAVES = [
  { left: 6, size: "h-4 w-4", delay: 0, duration: 18, className: "text-moss-400/60" },
  { left: 16, size: "h-3 w-3", delay: 6, duration: 15, className: "text-moss-300/70" },
  { left: 28, size: "h-3.5 w-3.5", delay: 11, duration: 17, className: "text-moss-500/50" },
  { left: 72, size: "h-3.5 w-3.5", delay: 3, duration: 16, className: "text-moss-300/70" },
  { left: 84, size: "h-3 w-3", delay: 9, duration: 14, className: "text-moss-400/60" },
  { left: 92, size: "h-4 w-4", delay: 14, duration: 19, className: "text-moss-500/45" },
];

export default function FallingLeaves() {
  return (
    <div
      aria-hidden="true"
      className="falling-leaves pointer-events-none fixed inset-0 -z-[5] overflow-hidden"
    >
      {LEAVES.map((leaf, i) => (
        <motion.span
          key={i}
          className={`absolute ${leaf.size} ${leaf.className}`}
          style={{ left: `${leaf.left}%`, top: 0 }}
          animate={{
            y: ["-8vh", "108vh"],
            x: [0, 36, -24, 18, 0],
            rotate: [0, 24, -18, 12, 0],
            opacity: [0, 0.55, 0.6, 0.4, 0],
          }}
          transition={{ duration: leaf.duration, repeat: Infinity, ease: "linear", delay: leaf.delay }}
        >
          <LeafGlyph className="h-full w-full" />
        </motion.span>
      ))}
    </div>
  );
}
