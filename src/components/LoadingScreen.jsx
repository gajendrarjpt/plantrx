import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loadingPlant from "@/assets/loading-plant.json";

const MESSAGES = [
  "Looking closely at the leaves…",
  "Checking visible signs of stress…",
  "Comparing possible causes…",
  "Building your recovery plan…",
  "Almost there…",
];

export default function LoadingScreen() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % MESSAGES.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto flex min-h-[70dvh] w-full max-w-md flex-col items-center justify-center px-4 pb-16 pt-12 lg:max-w-xl">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Lottie
            animationData={loadingPlant}
            loop
            autoplay
            aria-hidden="true"
            className="mx-auto h-44 w-44"
          />
        </motion.div>
        <h1 className="mt-2 font-display text-headline font-semibold text-moss-800">
          Hold on a sec…
        </h1>
        <p
          role="status"
          aria-live="polite"
          className="mx-auto mt-2 min-h-6 max-w-xs text-base font-semibold text-moss-600"
        >
          {MESSAGES[step]}
        </p>
      </div>

      <div className="mt-10 w-full max-w-xs" aria-hidden="true">
        <div className="progress-track">
          <div className="progress-bar" />
        </div>
      </div>

      <p className="mt-10 max-w-xs text-center text-caption leading-relaxed text-moss-600">
        Your photo goes to our plant doctor (via Google Gemini) for analysis.
        <br />
        PlantRx doesn't save it. Usually takes 2–8 seconds.
      </p>
    </div>
  );
}
