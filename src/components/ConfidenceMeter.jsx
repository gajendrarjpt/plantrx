const LEVELS = {
  low: {
    label: "Low confidence",
    hint: "A low-confidence estimate — the photo may not tell the whole story, so double-check in person.",
    bar: "bg-sun-400",
    badge: "bg-sun-200/70 text-moss-800",
    dot: "bg-sun-500",
    meter: 1,
  },
  medium: {
    label: "Medium confidence",
    hint: "A medium-confidence estimate — match it against what your plant looks like in person.",
    bar: "bg-sun-500",
    badge: "bg-sun-200/70 text-moss-800",
    dot: "bg-sun-500",
    meter: 2,
  },
  high: {
    label: "High confidence",
    hint: "A high-confidence estimate — the visible signs point clearly to this one.",
    bar: "bg-moss-500",
    badge: "bg-moss-100 text-moss-700",
    dot: "bg-moss-500",
    meter: 3,
  },
};

export default function ConfidenceMeter({ level }) {
  const conf = LEVELS[level] ?? LEVELS.medium;
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${conf.dot}`} aria-hidden="true" />
        <span className={`rounded-full px-3 py-1 text-sm font-bold ${conf.badge}`}>{conf.label}</span>
      </div>
      <div className="mt-3 flex w-40 gap-1.5" role="img" aria-label={`${conf.label} (${conf.meter} of 3)`}>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= conf.meter ? conf.bar : "bg-moss-100"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-moss-600">{conf.hint}</p>
    </div>
  );
}
