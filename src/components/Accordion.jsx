import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Small accessible accordion — native buttons with aria-expanded/aria-controls,
 * no extra dependency. One item open at a time (or none).
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className="rounded-2xl border border-moss-100 bg-white shadow-card">
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                className="ring-focus flex w-full items-center justify-between gap-3 rounded-2xl p-4 text-left"
              >
                <span className="font-bold text-moss-800">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-moss-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {open && (
              <p id={`faq-panel-${i}`} className="px-4 pb-4 text-sm leading-relaxed text-moss-600">
                {item.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
