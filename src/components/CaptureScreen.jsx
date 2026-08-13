import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import {
  ArrowLeft,
  Camera,
  Check,
  Images,
  Loader2,
  RotateCcw,
  ScanSearch,
  TriangleAlert,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SymptomChip from "./SymptomChip";
import {
  analyzePhoto,
  compressForDiagnosis,
  dataUrlToBlob,
  isProblematicPhoto,
  isReasonableUpload,
  readFileAsBase64,
  readFileAsDataUrl,
} from "@/lib/image";

const SYMPTOMS = [
  "Yellow leaves",
  "Brown tips",
  "Drooping",
  "Spots",
  "Curling",
  "Tiny bugs",
  "Soil stays wet",
];

export default function CaptureScreen({ onSubmit, onCancel }) {
  const [photo, setPhoto] = useState(null); // confirmed photo { dataUrl, source }
  const [draft, setDraft] = useState(null); // captured but not yet confirmed
  const [draftWarning, setDraftWarning] = useState("");
  const [note, setNote] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [online, setOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine
  );

  const webcamRef = useRef(null);

  // Keep the offline banner honest: update when connectivity changes.
  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  /* ---------- Shared: turn a File or {dataUrl,source} into a reviewable draft ---------- */
  const makeDraft = useCallback(async (input, fromCamera) => {
    let dataUrl;
    let source;
    if (input instanceof File) {
      dataUrl = await readFileAsDataUrl(input);
      source = input;
    } else {
      dataUrl = input.dataUrl;
      source = input.source;
    }
    const draft = { dataUrl, source, fromCamera: !!fromCamera };
    setDraft(draft);
    setPhoto(null);
    // Lightweight quality check — never blocks, just warns.
    try {
      const analysis = await analyzePhoto(draft.dataUrl);
      if (isProblematicPhoto(analysis)) {
        if (analysis.brightness < 0.18) {
          setDraftWarning("That photo may be hard to diagnose — it looks quite dark. Try a brighter photo.");
        } else if (analysis.detail < 0.12) {
          setDraftWarning("That photo looks mostly flat or blurry. Try moving closer to the leaves.");
        } else {
          setDraftWarning("That photo is quite small. A closer shot of the leaves works better.");
        }
      } else {
        setDraftWarning("");
      }
    } catch {
      setDraftWarning(""); // couldn't analyze — don't block
    }
  }, []);

  /* ---------- File upload + drag & drop ---------- */
  const handleFile = useCallback(
    async (file) => {
      if (!file) return;
      if (!isReasonableUpload(file)) {
        if (file && !file.type.startsWith("image/")) {
          toast.error("That doesn't look like a photo", {
            description: "Please choose an image file (JPG, PNG, HEIC…).",
          });
        } else {
          toast.error("That photo is a bit too large", {
            description: "Please pick an image under 20 MB.",
          });
        }
        return;
      }
      setCameraOn(false);
      try {
        await makeDraft(file, false);
      } catch {
        toast.error("We couldn't read that image", { description: "Please try another one." });
      }
    },
    [makeDraft]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((accepted) => handleFile(accepted?.[0]), [handleFile]),
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
  });

  /* ---------- Webcam ---------- */
  const openCamera = useCallback(() => {
    setCameraError(false);
    setCameraOn(true);
  }, []);

  const takePhoto = useCallback(() => {
    const dataUrl = webcamRef.current?.getScreenshot();
    if (!dataUrl) {
      toast.error("The camera isn't ready yet", { description: "Give it one more second." });
      return;
    }
    setCameraOn(false);
    makeDraft({ dataUrl, source: dataUrlToBlob(dataUrl) }, true);
  }, [makeDraft]);

  /* ---------- Review actions ---------- */
  const retake = useCallback(() => {
    setDraft(null);
    setDraftWarning("");
    if (draft?.fromCamera) setCameraOn(true);
  }, [draft]);

  const usePhoto = useCallback(() => {
    setPhoto(draft);
    setDraft(null);
  }, [draft]);

  const resetPhoto = useCallback(() => {
    setPhoto(null);
    setDraft(null);
    setDraftWarning("");
  }, []);

  /* ---------- Symptom chips (single source of truth = note string) ---------- */
  const toggleSymptom = useCallback((label) => {
    setNote((prev) => {
      const parts = prev
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const present = parts.some((p) => p.toLowerCase() === label.toLowerCase());
      const next = present
        ? parts.filter((p) => p.toLowerCase() !== label.toLowerCase())
        : [...parts, label];
      return next.join(", ");
    });
  }, []);

  const chipSelected = (label) =>
    note
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .includes(label.toLowerCase());

  /* ---------- Diagnose ---------- */
  const handleDiagnose = useCallback(async () => {
    if (!photo || busy) return;
    setBusy(true);
    try {
      // Compress to a JPEG under 300 KB — exactly what gets sent (never the original).
      const mainFile = await compressForDiagnosis(photo.source);
      const imageBase64 = await readFileAsBase64(mainFile);
      // photoDataUrl is transient (memory only) so the result can show the
      // photo — it is never stored in history or sent anywhere extra.
      await onSubmit({ imageBase64, note, photoDataUrl: photo.dataUrl });
    } catch {
      toast.error("Couldn't prepare that photo", { description: "Please try again." });
      setBusy(false);
    }
    // On success, App switches screens — no reset needed here.
  }, [photo, busy, note, onSubmit]);

  const reviewMode = !!draft;
  const diagnosisMode = !!photo && !reviewMode;

  return (
    <div className="mx-auto w-full max-w-md px-4 pb-safe pt-8 lg:max-w-xl">
      <div className="mb-6 flex items-center justify-between">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
          Home
        </Button>
        <span className="font-display text-lg font-semibold text-moss-800">PlantRx</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <h1 className="font-display text-headline font-semibold text-moss-800">Show me the plant</h1>
        <p className="mt-1 text-sm text-moss-600">
          A clear photo of the leaves works best — good light helps too.
        </p>
      </motion.div>

      {/* Offline notice — diagnosis needs the network */}
      {!online && (
        <div
          role="status"
          className="mt-4 flex items-start gap-2.5 rounded-xl border border-sun-300/70 bg-sun-200/40 p-3"
        >
          <WifiOff className="mt-0.5 h-4 w-4 shrink-0 text-sun-600" aria-hidden="true" />
          <p className="text-sm font-semibold text-moss-800">
            You're offline. Connect to the internet to diagnose your plant.
          </p>
        </div>
      )}

      {/* ---------- Photo area ---------- */}
      <div className="mt-5">
        {/* Confirmed photo → review preview with note + diagnose */}
        {diagnosisMode && photo ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="relative overflow-hidden rounded-2xl border border-moss-100 shadow-card">
              <img
                src={photo.dataUrl}
                alt="Your plant, ready for diagnosis"
                className="mx-auto max-h-80 w-full object-contain"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              className="mt-3 w-full rounded-xl"
              onClick={resetPhoto}
            >
              <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
              Take a different photo
            </Button>
          </motion.div>
        ) : reviewMode && draft ? (
          /* Draft → review: preview + quality warning + Retake / Use this photo */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="overflow-hidden rounded-2xl border border-moss-100 shadow-card">
              <img
                src={draft.dataUrl}
                alt="Preview of your photo"
                className="mx-auto max-h-80 w-full object-contain"
              />
            </div>

            {draftWarning && (
              <div
                role="status"
                className="mt-3 flex items-start gap-2.5 rounded-xl border border-sun-300/70 bg-sun-200/40 p-3"
              >
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-sun-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-moss-800">{draftWarning}</p>
                  <p className="mt-0.5 text-xs text-moss-600">You can still use it if you like.</p>
                </div>
              </div>
            )}

            <div className="mt-3 flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={retake}
              >
                <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                Retake photo
              </Button>
              <Button type="button" className="flex-1 rounded-xl" onClick={usePhoto}>
                <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                Use this photo
              </Button>
            </div>
          </motion.div>
        ) : cameraOn ? (
          /* Live camera with scanning frame + guidance hint */
          <div className="overflow-hidden rounded-2xl border border-moss-100 shadow-card">
            <div className="relative">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                screenshotQuality={0.9}
                videoConstraints={{
                  facingMode: { ideal: "environment" },
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                }}
                onUserMediaError={() => setCameraError(true)}
                className="aspect-[4/3] w-full bg-moss-900 object-cover"
              />
              {/* Subtle botanical scanning frame */}
              <div aria-hidden="true" className="scan-corner left-3 top-3 rounded-tl-lg border-l-2 border-t-2" />
              <div aria-hidden="true" className="scan-corner right-3 top-3 rounded-tr-lg border-r-2 border-t-2" style={{ animationDelay: "0.9s" }} />
              <div aria-hidden="true" className="scan-corner bottom-3 left-3 rounded-bl-lg border-b-2 border-l-2" style={{ animationDelay: "1.8s" }} />
              <div aria-hidden="true" className="scan-corner bottom-3 right-3 rounded-br-lg border-b-2 border-r-2" style={{ animationDelay: "2.7s" }} />
              {/* Guidance hint */}
              <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-moss-900/75 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                Fill the frame with the leaves
              </div>
            </div>
            <div className="flex gap-3 bg-white p-3">
              <Button type="button" className="flex-1 rounded-xl" onClick={takePhoto}>
                <Camera className="mr-2 h-4 w-4" aria-hidden="true" />
                Capture photo
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl"
                onClick={() => setCameraOn(false)}
              >
                <Images className="mr-2 h-4 w-4" aria-hidden="true" />
                Gallery
              </Button>
            </div>
          </div>
        ) : (
          /* Picker: camera + drag & drop upload */
          <div className="flex flex-col gap-3">
            <motion.div whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
              <Button
                type="button"
                size="lg"
                className="h-auto w-full rounded-2xl py-5 text-base"
                onClick={openCamera}
              >
                <Camera className="mr-2 h-5 w-5" aria-hidden="true" />
                Take a photo
              </Button>
            </motion.div>

            <div
              {...getRootProps()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
                isDragActive
                  ? "border-moss-400 bg-moss-50"
                  : "border-moss-200 bg-white/70 hover:border-moss-300 hover:bg-moss-50/60"
              }`}
            >
              <input {...getInputProps()} />
              <Images className="h-7 w-7 text-moss-400" aria-hidden="true" />
              <p className="mt-2 text-sm font-bold text-moss-700">
                {isDragActive ? "Drop it right here!" : "Drag & drop a photo"}
              </p>
              <p className="text-xs text-moss-600">or tap to browse your gallery</p>
            </div>
          </div>
        )}
      </div>

      {/* ---------- Symptoms: quick chips + free text ---------- */}
      {diagnosisMode && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
          <label className="mt-6 block">
            <span className="mb-2 block text-sm font-bold text-moss-800">What have you noticed?</span>
            <span className="flex flex-wrap gap-2" role="group" aria-label="Quick symptom picker">
              {SYMPTOMS.map((label) => (
                <SymptomChip
                  key={label}
                  label={label}
                  selected={chipSelected(label)}
                  onToggle={() => toggleSymptom(label)}
                />
              ))}
            </span>
          </label>

          <label className="mt-4 block">
            <span className="mb-1 block text-sm font-bold text-moss-800">
              Anything else? <span className="font-normal text-moss-600">(optional)</span>
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={300}
              rows={2}
              placeholder="e.g. the soil always stays wet, or leaves are falling off…"
              className="w-full resize-none rounded-xl border border-moss-200 bg-white p-3 text-sm text-moss-900 placeholder:text-moss-300 focus:border-moss-400 focus:outline-none focus:ring-4 focus:ring-moss-100"
            />
            <span className="mt-1 block text-right text-[11px] text-moss-600">{note.length}/300</span>
          </label>
        </motion.div>
      )}

      {/* ---------- Diagnose ---------- */}
      <motion.div whileTap={photo && !busy ? { scale: 0.98 } : undefined} transition={{ type: "spring", stiffness: 400, damping: 22 }}>
        <Button
          type="button"
          size="lg"
          className="mt-6 h-auto w-full rounded-2xl py-5 text-lg"
          onClick={handleDiagnose}
          disabled={!photo || busy}
        >
          {busy ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
              Compressing photo…
            </>
          ) : photo ? (
            <>
              <ScanSearch className="mr-2 h-5 w-5" aria-hidden="true" />
              Diagnose my plant
            </>
          ) : (
            <>
              <ScanSearch className="mr-2 h-5 w-5" aria-hidden="true" />
              Scan my plant
            </>
          )}
        </Button>
      </motion.div>

      {/* Camera failure dialog */}
      <Dialog
        open={cameraError}
        onOpenChange={(open) => {
          setCameraError(open);
          if (!open) setCameraOn(false);
        }}
      >
        <DialogContent className="max-w-sm rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-center">Camera unavailable</DialogTitle>
            <DialogDescription className="text-center">
              We couldn't start the camera on this device. No worries — you can still upload a
              photo from your gallery.
            </DialogDescription>
          </DialogHeader>
          <Button type="button" className="w-full rounded-xl" onClick={() => setCameraError(false)}>
            <Images className="mr-2 h-4 w-4" aria-hidden="true" />
            Upload a photo instead
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
