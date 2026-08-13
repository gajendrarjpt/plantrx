import { motion } from "framer-motion";
import { Camera, Frown, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { friendlyError } from "@/lib/errors";

export default function ErrorScreen({ error, onRetry, onChangePhoto, onHome }) {
  return (
    <div className="mx-auto flex min-h-[70dvh] w-full max-w-md flex-col items-center justify-center px-4 pb-16 pt-12 text-center lg:max-w-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-xs"
      >
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-sun-200/60"
          aria-hidden="true"
        >
          <Frown className="h-8 w-8 text-sun-600" strokeWidth={2} />
        </div>
        <h1 className="mt-5 font-display text-headline font-semibold text-moss-800">
          Something went wrong
        </h1>
        <p className="mt-3 text-body leading-relaxed text-moss-600">{friendlyError(error)}</p>

        <div className="mt-8 space-y-3">
          <Button type="button" size="lg" className="w-full rounded-2xl" onClick={onRetry}>
            <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
            Try again
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full rounded-2xl"
            onClick={onChangePhoto}
          >
            <Camera className="mr-2 h-4 w-4" aria-hidden="true" />
            Choose another photo
          </Button>
          <Button type="button" variant="ghost" size="sm" className="w-full" onClick={onHome}>
            <Home className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Back to home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
