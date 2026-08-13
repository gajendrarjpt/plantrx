import { motion } from "framer-motion";
import { ArrowLeft, Leaf, ListChecks, ShieldCheck, Sprout } from "lucide-react";
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

export default function ResultScreen({ result, onDiagnoseAnother, onHome }) {
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
            {/* Eyebrow + dominant diagnosis */}
            <motion.div {...sectionMotion(0.08)} className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-moss-500">
                Your plant may have
              </p>
              <h1 className="mt-2 font-display text-display text-moss-800">{result.issue}</h1>
            </motion.div>

            <motion.div {...sectionMotion(0.16)} className="mt-6">
              <ConfidenceMeter level={result.confidence} />
            </motion.div>

            <div className="my-6 h-px bg-moss-100" />

            {/* Why we think so */}
            <motion.section {...sectionMotion(0.24)}>
              <h2 className="flex items-center gap-2 font-display text-title font-semibold text-moss-800">
                <Leaf className="h-5 w-5 text-moss-500" aria-hidden="true" />
                Why we think so
              </h2>
              <p className="mt-2 text-body leading-relaxed text-moss-700">{result.explanation}</p>
            </motion.section>

            <div className="my-6 h-px bg-moss-100" />

            {/* What to do now */}
            <motion.section {...sectionMotion(0.32)}>
              <h2 className="flex items-center gap-2 font-display text-title font-semibold text-moss-800">
                <ListChecks className="h-5 w-5 text-moss-500" aria-hidden="true" />
                What to do now
              </h2>
              <p className="mt-1 text-caption text-moss-600">
                Tap a step as you do it — your progress stays on this device.
              </p>
              <div className="mt-4">
                <FixChecklist fixes={result.fixes} />
              </div>
            </motion.section>

            {/* Good to know */}
            <motion.div {...sectionMotion(0.4)} className="mt-6">
              <p className="rounded-xl bg-moss-50 p-3.5 text-xs leading-relaxed text-moss-600">
                <ShieldCheck className="mr-1.5 inline h-4 w-4 text-moss-500" aria-hidden="true" />
                A friendly AI suggestion, not a guarantee. If the plant keeps struggling after a
                couple of weeks, a local nursery can take a look in person.
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
