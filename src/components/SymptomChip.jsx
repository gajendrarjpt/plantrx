import { Check } from "lucide-react";

export default function SymptomChip({ label, selected, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`ring-focus inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
        selected
          ? "border-moss-600 bg-moss-600 text-white shadow-sm"
          : "border-moss-200 bg-white text-moss-700 hover:border-moss-300 hover:bg-moss-50"
      }`}
    >
      {selected && <Check className="h-4 w-4" aria-hidden="true" />}
      {label}
    </button>
  );
}
