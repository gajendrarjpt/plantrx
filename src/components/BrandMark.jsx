import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const SIZES = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-14 w-14 rounded-2xl",
  lg: "h-16 w-16 rounded-3xl",
};

const ICON_SIZES = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-8 w-8" };

/**
 * The PlantRx leaf mark. Idle motion is intentionally tiny and slow
 * (a 4s gentle float) — a hint of life, never a distraction.
 * With reduced motion, framer-motion skips the animation entirely.
 */
export default function BrandMark({ size = "md", className = "" }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`flex items-center justify-center bg-moss-100 shadow-card ${SIZES[size]} ${className}`}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Leaf className={`text-moss-600 ${ICON_SIZES[size]}`} strokeWidth={2} />
    </motion.div>
  );
}
