import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Camera,
  ChevronRight,
  NotebookPen,
  ScanSearch,
  ShieldCheck,
  Sprout,
  Timer,
  Trash2,
  Wallet,
  UserRoundX,
} from "lucide-react";
import { useState } from "react";
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
import SectionHeading from "./SectionHeading";
import ShowcaseMark from "./ShowcaseMark";
import FallingLeaves from "./FallingLeaves";
import EmptyHistory from "./EmptyHistory";
import Accordion from "./Accordion";
import { FAQS } from "@/data/faq";
import { GUIDES } from "@/data/guides";
import { ROUTES } from "@/lib/routes";

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
    text: "Get a likely issue and a simple care plan.",
  },
];

const BENEFITS = [
  {
    icon: UserRoundX,
    title: "No account",
    text: "No sign-up, no login, no profile.",
  },
  {
    icon: ShieldCheck,
    title: "Private",
    text: "Photos aren't stored by PlantRx.",
  },
  {
    icon: Timer,
    title: "Seconds",
    text: "A likely answer in 2–8 seconds.",
  },
  {
    icon: Wallet,
    title: "Free",
    text: "No subscription, no hidden cost.",
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

export default function HomeScreen({ onStart, history, onOpenResult, onClearHistory, onNavigate }) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10">
      {/* Gentle leaf-fall behind the whole home screen (decorative only) */}
      <FallingLeaves />
      {/* ---------- Hero ---------- */}
      <motion.header
        className="text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="mx-auto max-w-xl text-display text-moss-800">
          Your plant's
          <br />
          care assistant is here.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-body leading-relaxed text-moss-600">
          Snap a photo of a struggling houseplant and get a likely diagnosis and a
          simple plan to help it recover — in seconds.
        </p>

        {/* Primary CTA */}
        <motion.div
          className="mx-auto mt-8 max-w-sm"
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
      </motion.header>

      {/* ---------- Benefits strip ---------- */}
      <motion.ul
        {...REVEAL}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {BENEFITS.map((b) => (
          <li
            key={b.title}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-moss-100 bg-white/80 p-4 text-center shadow-card"
          >
            <b.icon className="h-5 w-5 text-moss-500" aria-hidden="true" />
            <p className="text-sm font-bold text-moss-800">{b.title}</p>
            <p className="text-xs leading-relaxed text-moss-600">{b.text}</p>
          </li>
        ))}
      </motion.ul>

      {/* ---------- What is PlantRx ---------- */}
      <motion.section {...REVEAL} viewport={VIEWPORT} transition={{ duration: 0.5, ease: "easeOut" }} className="mt-14">
        <SectionHeading eyebrow="What is PlantRx" title="A calm first step when your plant looks unhappy" />
        <p className="mt-4 max-w-2xl leading-relaxed text-moss-700">
          PlantRx is an AI-assisted plant care companion. You upload a photo, add what
          you've noticed, and get a <strong>likely issue</strong>, an{" "}
          <strong>estimated confidence</strong>, a plain-English explanation, and 3–5
          practical care steps. It's not a guaranteed diagnosis and it doesn't pretend
          to be one — it's a fast, honest starting point you can act on tonight.
        </p>
      </motion.section>

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
          <ShowcaseMark />
          <p className="mt-4 font-display text-title font-semibold text-moss-800">
            Photo in. Care plan out.
          </p>
          <p className="mt-1.5 max-w-[300px] text-caption leading-relaxed text-moss-600">
            A likely issue, an honest confidence level, and a few steps you can take today.
          </p>
        </div>
      </motion.div>

      {/* ---------- How it works ---------- */}
      <section id="how-it-works" className="mt-14 scroll-mt-20" aria-label="How it works">
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

      {/* ---------- Plant care library preview ---------- */}
      <section id="plant-care" className="mt-14 scroll-mt-20" aria-label="Plant care library">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Plant Care" title="Free guides for common plant problems" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mb-1 shrink-0 rounded-xl font-bold text-moss-700"
            onClick={() => onNavigate(ROUTES.plantCare)}
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <motion.ul {...REVEAL} viewport={VIEWPORT} transition={{ duration: 0.5, ease: "easeOut" }} className="mt-6 grid gap-3 sm:grid-cols-2">
          {GUIDES.slice(0, 4).map((guide) => (
            <li key={guide.slug}>
              <button
                type="button"
                onClick={() => onNavigate(ROUTES.article, guide.slug)}
                className="ring-focus flex w-full items-start gap-3 rounded-2xl border border-moss-100 bg-white p-4 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-moss-200 hover:shadow-lift"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-moss-50">
                  <BookOpen className="h-4 w-4 text-moss-500" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-moss-800">{guide.title}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-moss-600">
                    {guide.description}
                  </span>
                </span>
                <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-moss-300" aria-hidden="true" />
              </button>
            </li>
          ))}
        </motion.ul>
      </section>

      {/* ---------- FAQ preview ---------- */}
      <section id="faq" className="mt-14 scroll-mt-20" aria-label="Frequently asked questions">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="FAQ" title="Questions, answered honestly" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="mb-1 shrink-0 rounded-xl font-bold text-moss-700"
            onClick={() => onNavigate(ROUTES.faq)}
          >
            All FAQs
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <motion.div {...REVEAL} viewport={VIEWPORT} transition={{ duration: 0.5, ease: "easeOut" }} className="mt-6">
          <Accordion items={FAQS.slice(0, 4)} />
        </motion.div>
      </section>

      {/* ---------- Responsible AI ---------- */}
      <motion.section
        {...REVEAL}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-14 rounded-3xl border border-moss-100 bg-moss-50 p-6"
        aria-label="About AI accuracy"
      >
        <p className="flex items-center gap-2 font-display text-title font-semibold text-moss-800">
          <ScanSearch className="h-5 w-5 text-moss-500" aria-hidden="true" />
          Honest about AI
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-moss-600">
          PlantRx provides AI-assisted plant care guidance for informational purposes.
          Plant conditions can have multiple causes, so results should be treated as a
          starting point rather than a guaranteed diagnosis.
        </p>
        <Button
          type="button"
          variant="link"
          size="sm"
          className="mt-2 h-auto p-0 text-sm font-bold text-moss-700"
          onClick={() => onNavigate(ROUTES.disclaimer)}
        >
          Read the full disclaimer
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Button>
      </motion.section>

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
