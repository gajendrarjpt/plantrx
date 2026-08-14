import { motion } from "framer-motion";
import LeafGlyph from "./LeafGlyph";

/**
 * The PlantRx leaf mark shown in the "Photo in. Care plan out." showcase.
 *
 * One clean leaf (no overlapping strokes), gently swaying from its stem like
 * a plant in a light breeze, with a soft breathing halo and a few tiny leaves
 * drifting around it. All motion is slow and subtle — a hint of life, never a
 * distraction — and framer-motion's MotionConfig (reducedMotion="user")
 * disables the transforms entirely for visitors who prefer reduced motion.
 */

/** Tiny leaf that drifts around the badge. */
function DriftLeaf({ className, delay }) {
  return (
    <motion.span
      className={`absolute text-moss-400 ${className}`}
      animate={{ y: [0, -4, 0], opacity: [0.3, 0.7, 0.3], rotate: [0, 6, 0] }}
      transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden="true"
    >
      <LeafGlyph className="h-3.5 w-3.5" />
    </motion.span>
  );
}

export default function ShowcaseMark() {
  return (
    <div className="relative flex h-28 w-28 items-center justify-center" aria-hidden="true">
      {/* breathing halo — softer: less scale, less opacity swing */}
      <motion.span
        className="absolute inset-0 rounded-full bg-moss-100"
        animate={{ scale: [1, 1.05, 1], opacity: [0.75, 0.95, 0.75] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* quiet ring */}
      <span className="absolute inset-1.5 rounded-full border border-moss-200/50" />

      {/* drifting leaves around the badge — fewer, slower, more faint */}
      <DriftLeaf className="left-0 top-1" delay={0} />
      <DriftLeaf className="right-0 top-3" delay={1.8} />

      {/* the leaf itself, swaying from the stem base */}
      <motion.span
        className="relative text-moss-600"
        style={{ transformOrigin: "50% 100%" }}
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <LeafGlyph className="h-16 w-16 drop-shadow-sm" />
      </motion.span>
    </div>
  );
}
