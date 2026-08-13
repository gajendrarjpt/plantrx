import { useEffect } from "react";

/**
 * Responsive AdSense banner slot, shown directly below the result card.
 *
 * To activate real ads once your AdSense account is approved:
 *  1. Put your real publisher ID in the data-ad-client below AND in the
 *     script tag in index.html (uncomment it there too).
 *  2. Replace data-ad-slot with a real slot ID from your AdSense dashboard.
 *
 * Until then this renders a small, clearly-labeled placeholder box — it never
 * blocks or covers the diagnosis content.
 */
export default function AdSlot() {
  useEffect(() => {
    // Standard AdSense hydration call. Harmless no-op when the script hasn't
    // been loaded yet (ads just stay in the queue until it is).
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not available */
    }
  }, []);

  return (
    <div className="mt-8" aria-label="Advertisement">
      <p className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-moss-600">
        Advertisement
      </p>
      <div className="relative flex min-h-[100px] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-moss-200 bg-white/70">
        <ins
          className="adsbygoogle block h-full min-h-[100px] w-full"
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <span className="pointer-events-none absolute text-xs text-moss-400">
          Ad space (placeholder — add your AdSense ID)
        </span>
      </div>
    </div>
  );
}
