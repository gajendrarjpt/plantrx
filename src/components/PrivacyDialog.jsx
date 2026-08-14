import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const POINTS = [
  {
    title: "No account required",
    text: "PlantRx works without signing up or logging in.",
  },
  {
    title: "Your photo is used for diagnosis",
    text: "When you tap Diagnose, your photo is sent to the PlantRx server and then to Google Gemini for analysis. PlantRx does not intentionally save your photo.",
  },
  {
    title: "Optional notes are included",
    text: "Any symptoms you type (e.g. “leaves turning yellow”) are sent along with the photo for better results.",
  },
  {
    title: "History stays on your device",
    text: "Your diagnosis results are stored only in your browser's local storage. Nothing is uploaded, and no image data is kept.",
  },
  {
    title: "A word of advice",
    text: "Avoid photographing personal or sensitive information — stick to the plant.",
  },
  {
    title: "Ads stay on editorial pages only",
    text: "Advertisements, when shown, appear only on Plant Care editorial guide pages — clearly marked and below the article. Diagnosis screens stay ad-free.",
  },
];

/**
 * Honest, plain-English privacy summary. This is intentionally a dialog for
 * now — it can be promoted to a full /privacy page later without changing
 * the copy.
 */
export default function PrivacyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="link"
        size="sm"
        className="h-auto p-0 text-xs font-bold text-moss-600"
        onClick={() => setOpen(true)}
      >
        <ShieldCheck className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
        Privacy
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85dvh] max-w-sm overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">How PlantRx handles your data</DialogTitle>
            <DialogDescription className="text-center">
              A plain-English summary — no legalese.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-4">
            {POINTS.map((point) => (
              <li key={point.title}>
                <p className="text-sm font-bold text-moss-800">{point.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-moss-600">{point.text}</p>
              </li>
            ))}
          </ul>
          <Button type="button" className="w-full rounded-xl" onClick={() => setOpen(false)}>
            Got it
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
