import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Interactive treatment checklist. Completion lives only in local component
 * state — it's never sent anywhere and resets for each new diagnosis.
 */
export default function FixChecklist({ fixes }) {
  const [done, setDone] = useState(() => fixes.map(() => false));

  const toggle = (index) => setDone((prev) => prev.map((v, i) => (i === index ? !v : v)));

  return (
    <ol className="space-y-2.5">
      {fixes.map((fix, i) => {
        const checked = done[i];
        return (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.3, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={checked}
              className={`ring-focus flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-all duration-200 active:scale-[0.99] ${
                checked
                  ? "border-moss-200 bg-moss-50/80"
                  : "border-moss-100 bg-white hover:border-moss-200 hover:shadow-card"
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold transition-all duration-200 ${
                  checked
                    ? "bg-moss-600 text-white"
                    : "border border-moss-300 bg-white text-moss-600"
                }`}
                aria-hidden="true"
              >
                {checked ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={`text-sm leading-relaxed transition-colors duration-200 ${
                  checked ? "text-moss-500 line-through decoration-moss-300/70" : "text-moss-700"
                }`}
              >
                {fix}
              </span>
            </button>
          </motion.li>
        );
      })}
    </ol>
  );
}
