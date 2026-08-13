export default function SectionHeading({ eyebrow, title, align = "center", className = "" }) {
  return (
    <div className={align === "center" ? `text-center ${className}` : className}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-moss-500">{eyebrow}</p>
      )}
      <h2 className="mt-2 font-display text-headline font-semibold text-moss-800">{title}</h2>
    </div>
  );
}
