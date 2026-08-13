import { useEffect } from "react";
import { IS_ANDROID } from "@/lib/platform";

// Placeholder publisher ID — replace with your real AdSense ID to activate
// the slot. As long as this contains XXXX, the slot is a visual placeholder
// only and does NOT make ad requests to Google.
const PLACEHOLDER_ID = "ca-pub-XXXXXXXXXXXXXXXX";
const PUBLISHER_ID_IS_PLACEHOLDER = PLACEHOLDER_ID.includes("XXXX");

/**
 * Responsive AdSense banner slot, shown directly below the result card.
 *
 * To activate real ads once your AdSense account is approved:
 *  1. Put your real publisher ID in the data-ad-client below (and it's
 *     already active in the script tag in index.html).
 *  2. Replace data-ad-slot with a real slot ID from your AdSense dashboard.
 *
 * Until then this renders a small, clearly-labeled placeholder box — it never
 * blocks or covers the diagnosis content, and it deliberately does NOT call
 * the adsbygoogle push while the IDs are placeholders, so the AdSense review
 * isn't hit with malformed ad requests.
 */
export default function AdSlot() {
  useEffect(() => {
    // Only hydrate the slot once real IDs are configured. With placeholders,
    // pushing would send Google a request with fake client/slot IDs. And on
    // Android this whole effect is dead code (AdSense never runs there —
    // monetization is AdMob), kept as a belt-and-braces guard in case the
    // build ever loses tree-shaking.
    if (PUBLISHER_ID_IS_PLACEHOLDER || IS_ANDROID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not available */
    }
  }, []);

  // Android: monetization goes through Google AdMob (Google's product for
  // mobile apps), never AdSense. This is a labelled placeholder until an
  // AdMob account + ad unit exist — no live IDs, no ad requests.
  if (IS_ANDROID) {
    return (
      <div className="mt-8" aria-label="Advertisement">
        <p className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-moss-600">
          Advertisement
        </p>
        <div className="flex min-h-[100px] w-full items-center justify-center rounded-xl border border-dashed border-moss-200 bg-white/70">
          <span className="text-xs text-moss-400">Ad space (AdMob — add your unit ID)</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8" aria-label="Advertisement">
      <p className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-moss-600">
        Advertisement
      </p>
      <div className="relative flex min-h-[100px] w-full items-center justify-center overflow-hidden rounded-xl border border-dashed border-moss-200 bg-white/70">
        <ins
          className="adsbygoogle block h-full min-h-[100px] w-full"
          data-ad-client={PLACEHOLDER_ID}
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
