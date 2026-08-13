import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const SIZES = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-14 w-14 rounded-2xl",
  lg: "h-16 w-16 rounded-3xl",
};

const ICON_SIZES = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-8 w-8" };

/**
 * The PlantRx leaf mark. The whole mark floats gently, and the leaf itself
 * sways like a plant in a light breeze (rotation around its stem base).
 * Both motions are intentionally tiny and slow — a hint of life, never a
 * distraction. With reduced motion, framer-motion skips them entirely.
 */
export default function BrandMark({ size = "md", className = "" }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`flex items-center justify-center bg-moss-100 shadow-card ${SIZES[size]} ${className}`}
      animate={{ y: [0, -2.5, 0] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        // Sway from the stem, as a leaf would in the breeze
        style={{ transformOrigin: "50% 100%" }}
        animate={{ rotate: [-7, 7, -7] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Leaf className={`text-moss-600 ${ICON_SIZES[size]}`} strokeWidth={2} />
      </motion.div>
    </motion.div>
  );
}
