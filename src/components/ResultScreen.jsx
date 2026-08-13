import { motion } from "framer-motion";
import { ArrowLeft, Leaf, ListChecks, ScanSearch, ShieldCheck, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ConfidenceMeter from "./ConfidenceMeter";
import FixChecklist from "./FixChecklist";
import ShareDiagnosis from "./ShareDiagnosis";
import AdSlot from "./AdSlot";

const sectionMotion = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut", delay },
});

/**
 * The diagnosis report. Structure:
 * photo → likely issue → estimated confidence → what we noticed →
 * your care plan → step-by-step fixes → when to seek help →
 * AI disclaimer → actions → ad slot.
 */
export default function ResultScreen({ result, photo, onDiagnoseAnother, onHome }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 pb-safe pt-8 lg:max-w-xl">
      <div className="mb-6 flex items-center justify-between">
        <Button type="button" variant="ghost" size="sm" onClick={onHome}>
          <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Home
        </Button>
        <span className="font-display text-lg font-semibold text-moss-800">
          <Sprout className="mr-1 inline h-5 w-5 text-moss-500" aria-hidden="true" />
          PlantRx
        </span>
      </div>

      {/* ---------- Diagnosis report ---------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
      >
        <Card className="border-moss-100 shadow-card">
          <CardContent className="p-6">
            {/* The photo (transient, shown only for this diagnosis) */}
            {photo && (
              <motion.div {...sectionMotion(0.04)} className="mb-5 overflow-hidden rounded-2xl border border-moss-100">
                <img src={photo} alt="The plant you submitted for diagnosis" className="max-h-64 w-full object-cover" />
              </motion.div>
            )}

            {/* Likely issue */}
            <motion.div {...sectionMotion(0.08)} className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-moss-500">
                Your plant may have
              </p>
              <h1 className="mt-2 font-display text-display text-moss-800">{result.issue}</h1>
              <p className="mt-2 text-caption text-moss-600">
                Based on the photo and information provided.
              </p>
            </motion.div>

            {/* Estimated confidence */}
            <motion.div {...sectionMotion(0.16)} className="mt-6">
              <p className="mb-2 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-moss-500">
                Estimated confidence
              </p>
              <ConfidenceMeter level={result.confidence} />
            </motion.div>

            <div className="my-6 h-px bg-moss-100" />

            {/* What we noticed */}
            <motion.section {...sectionMotion(0.24)}>
              <h2 className="flex items-center gap-2 font-display text-title font-semibold text-moss-800">
                <Leaf className="h-5 w-5 text-moss-500" aria-hidden="true" />
                What we noticed
              </h2>
              <p className="mt-2 text-body leading-relaxed text-moss-700">{result.explanation}</p>
            </motion.section>

            <div className="my-6 h-px bg-moss-100" />

            {/* Your care plan */}
            <motion.section {...sectionMotion(0.32)}>
              <h2 className="flex items-center gap-2 font-display text-title font-semibold text-moss-800">
                <ListChecks className="h-5 w-5 text-moss-500" aria-hidden="true" />
                Your care plan
              </h2>
              <p className="mt-1 text-caption text-moss-600">
                Step-by-step fixes. Tap a step as you do it — your progress stays on this device.
              </p>
              <div className="mt-4">
                <FixChecklist fixes={result.fixes} />
              </div>
            </motion.section>

            <div className="my-6 h-px bg-moss-100" />

            {/* When to seek additional help */}
            <motion.section {...sectionMotion(0.38)}>
              <h2 className="flex items-center gap-2 font-display text-title font-semibold text-moss-800">
                <ShieldCheck className="h-5 w-5 text-moss-500" aria-hidden="true" />
                When to seek additional help
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-moss-700">
                If the plant keeps declining after a couple of weeks, shows sudden
                widespread damage, or is a large or valuable plant, a local nursery or
                certified professional can look at it in person.
              </p>
            </motion.section>

            {/* Responsible AI footer */}
            <motion.div {...sectionMotion(0.42)} className="mt-6">
              <p className="rounded-xl bg-moss-50 p-3.5 text-xs leading-relaxed text-moss-600">
                <ScanSearch className="mr-1.5 inline h-4 w-4 text-moss-500" aria-hidden="true" />
                PlantRx provides AI-assisted plant care guidance for informational
                purposes. Plant conditions can have multiple causes, so results should
                be treated as a starting point rather than a guaranteed diagnosis.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ---------- Actions ---------- */}
      <motion.div
        {...sectionMotion(0.2)}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <div className="flex-1">
          <ShareDiagnosis result={result} />
        </div>
        <Button
          type="button"
          size="lg"
          className="h-auto flex-1 rounded-xl py-3.5"
          onClick={onDiagnoseAnother}
        >
          <Sprout className="mr-2 h-4 w-4" aria-hidden="true" />
          Diagnose another plant
        </Button>
      </motion.div>

      {/* Ad slot sits directly below the result — never above it */}
      <AdSlot />
    </div>
  );
}
