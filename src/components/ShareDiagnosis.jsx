import { toast } from "sonner";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function buildShareText(result) {
  return [
    `PlantRx diagnosis: ${result.issue}`,
    "",
    result.explanation,
    "",
    "What to do now:",
    ...result.fixes.map((fix, i) => `${i + 1}. ${fix}`),
    "",
    "— via PlantRx",
  ].join("\n");
}

/**
 * Shares the diagnosis as plain text. Uses the Web Share API when available;
 * otherwise copies to the clipboard and confirms with a toast. Nothing is
 * uploaded anywhere.
 */
export default function ShareDiagnosis({ result }) {
  const handleShare = async () => {
    const text = buildShareText(result);
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "PlantRx diagnosis", text });
        return; // user completed the native share sheet
      } catch (err) {
        if (err?.name === "AbortError") return; // user dismissed — not an error
        // fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Diagnosis copied", { description: "Paste it anywhere to share." });
      return;
    } catch {
      /* clipboard API blocked (e.g. sandboxed iframe) — try the legacy path */
    }
    try {
      copyLegacy(text);
      toast.success("Diagnosis copied", { description: "Paste it anywhere to share." });
    } catch {
      toast.error("Couldn't copy the diagnosis", { description: "Please try again." });
    }
  };

  /** Legacy copy for browsers/contexts without the async Clipboard API. */
  function copyLegacy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    if (!ok) throw new Error("copy failed");
  }

  return (
    <Button type="button" variant="outline" className="rounded-xl" onClick={handleShare}>
      <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
      Share diagnosis
    </Button>
  );
}
