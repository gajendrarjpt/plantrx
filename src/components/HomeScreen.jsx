import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  ChevronRight,
  Leaf,
  NotebookPen,
  ShieldCheck,
  Sprout,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BrandMark from "./BrandMark";
import SectionHeading from "./SectionHeading";
import EmptyHistory from "./EmptyHistory";
import PrivacyDialog from "./PrivacyDialog";

const STEPS = [
  {
    icon: Camera,
    title: "Snap",
    text: "A clear photo of the leaves is all it takes.",
  },
  {
    icon: NotebookPen,
    title: "Describe",
    text: "Add what you've noticed — optional, but helpful.",
  },
  {
    icon: Sprout,
    title: "Fix",
    text: "Get a likely diagnosis and a simple care plan.",
  },
];

const REVEAL = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 } };
const VIEWPORT = { once: true, margin: "-60px" };

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export default function HomeScreen({ onStart, history, onOpenResult, onClearHistory }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 pb-16 pt-10 sm:pt-14 lg:max-w-xl">
      {/* ---------- Hero ---------- */}
      <motion.header
        className="text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center gap-3">
          <BrandMark size="md" />
          <span className="font-display text-2xl font-semibold tracking-tight text-moss-800">
            Plant<span className="text-moss-500">Rx</span>
          </span>
        </div>

        <h1 className="mx-auto mt-7 max-w-xs text-display text-moss-800 sm:max-w-sm">
          Your plant's
          <br />
          doctor is here.
        </h1>
        <p className="mx-auto mt-4 max-w-xs text-body leading-relaxed text-moss-600">
          Snap a photo. Get a likely diagnosis and a simple plan to help your plant recover.
        </p>

        {/* Primary CTA */}
        <motion.div
          className="mt-8"
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <Button
            type="button"
            onClick={onStart}
            size="lg"
            className="h-auto w-full rounded-2xl px-6 py-5 text-lg font-bold shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0"
          >
            <Camera className="mr-2 h-5 w-5" aria-hidden="true" />
            Diagnose my plant
          </Button>
        </motion.div>

        <p className="mt-3 text-caption text-moss-600">
          Free · No sign-up · Photos aren't stored by PlantRx
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-moss-200 bg-white/70 px-3 py-1 text-[11px] font-semibold text-moss-700">
          <ShieldCheck className="h-3.5 w-3.5 text-moss-500" aria-hidden="true" />
          Your photo is analyzed, not saved by PlantRx
        </p>
      </motion.header>

      {/* ---------- Botanical showcase ---------- */}
      <motion.div
        {...REVEAL}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mt-12 overflow-hidden rounded-3xl border border-moss-100 shadow-card"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(150deg, rgb(229 238 226 / 0.9), rgb(247 249 244 / 0.4) 45%, rgb(248 228 188 / 0.35))",
          }}
        />
        <div className="relative flex flex-col items-center px-6 py-10 text-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <Leaf
              className="absolute h-24 w-24 rotate-[-14deg] text-moss-300/80"
              strokeWidth={1.2}
              aria-hidden="true"
            />
            <Leaf
              className="absolute h-20 w-20 rotate-[10deg] text-moss-400/90"
              strokeWidth={1.4}
              aria-hidden="true"
            />
            <Leaf className="relative h-12 w-12 text-moss-600" strokeWidth={1.8} aria-hidden="true" />
          </div>
          <p className="mt-4 font-display text-title font-semibold text-moss-800">
            Photo in. Care plan out.
          </p>
          <p className="mt-1.5 max-w-[260px] text-caption leading-relaxed text-moss-600">
            A likely issue, an honest confidence level, and a few steps you can take today.
          </p>
        </div>
      </motion.div>

      {/* ---------- How it works ---------- */}
      <section className="mt-14" aria-label="How it works">
        <SectionHeading eyebrow="How it works" title="Three steps to a happier plant" />

        <ol className="relative mt-8 space-y-5 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
          {/* Connecting botanical line */}
          <div
            aria-hidden="true"
            className="absolute left-[23px] top-7 bottom-7 w-px border-l border-dashed border-moss-300/70 lg:left-[12%] lg:right-[12%] lg:top-[26px] lg:h-px lg:w-auto lg:border-l-0 lg:border-t"
          />
          {STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              {...REVEAL}
              viewport={VIEWPORT}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.12 }}
              className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:text-center"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-moss-200 bg-cream shadow-card">
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-moss-600 text-[10px] font-extrabold text-white">
                  {i + 1}
                </span>
                <step.icon className="h-5 w-5 text-moss-600" strokeWidth={2} aria-hidden="true" />
              </div>
              <div className="lg:mt-4">
                <h3 className="font-display text-title font-semibold text-moss-800">{step.title}</h3>
                <p className="mt-1 max-w-[240px] text-sm leading-relaxed text-moss-600 lg:mx-auto">
                  {step.text}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ---------- Recent diagnoses ---------- */}
      <section className="mt-14" aria-label="Recent diagnoses">
        <SectionHeading eyebrow="Your plant journal" title="Recent diagnoses" />

        <motion.div {...REVEAL} viewport={VIEWPORT} transition={{ duration: 0.5, ease: "easeOut" }}>
          {history.length === 0 ? (
            <div className="mt-6">
              <EmptyHistory />
            </div>
          ) : (
            <ul className="mt-6 space-y-2">
              {history.map((entry, i) => (
                <motion.li
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                >
                  <button
                    type="button"
                    onClick={() => onOpenResult(entry)}
                    className="ring-focus group flex w-full items-center gap-3 rounded-2xl border border-moss-100 bg-white p-3 text-left shadow-card transition-all duration-200 hover:border-moss-200 hover:shadow-lift active:scale-[0.99]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-moss-50 transition-colors group-hover:bg-moss-100">
                      <Sprout className="h-5 w-5 text-moss-500" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-moss-800">
                        {entry.issue}
                      </span>
                      <span className="mt-0.5 block text-xs capitalize text-moss-600">
                        {entry.confidence} confidence · {formatDate(entry.date)}
                      </span>
                    </span>
                    <ChevronRight
                      className="h-5 w-5 shrink-0 text-moss-300 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        {history.length > 0 && (
          <motion.div
            {...REVEAL}
            viewport={VIEWPORT}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            className="mt-3 text-center"
          >
            <ClearHistoryButton onClear={onClearHistory} />
          </motion.div>
        )}
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="mt-16 text-center">
        <div className="flex items-center justify-center gap-4">
          <PrivacyDialog />
        </div>
        <p className="mt-4 text-caption leading-relaxed text-moss-600">
          PlantRx gives friendly, AI-powered suggestions — not a guarantee.
          <br />
          For plants you truly can't save, a local nursery knows best. 🌱
        </p>
      </footer>
    </div>
  );
}

/* Clear-history confirmation (local only, never uploaded) */
function ClearHistoryButton({ onClear }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="rounded-xl text-xs font-bold text-moss-500 hover:text-moss-700"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
        Clear history
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle>Clear diagnosis history?</DialogTitle>
            <DialogDescription>
              This removes the recent diagnoses saved on this device. It can't be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton={false}>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                onClear();
                setOpen(false);
                toast.success("History cleared", { description: "A fresh start for your journal." });
              }}
            >
              Clear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
