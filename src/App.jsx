import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import BotanicalBackground from "./components/BotanicalBackground";
import HomeScreen from "./components/HomeScreen";
import ResultScreen from "./components/ResultScreen";
import ErrorScreen from "./components/ErrorScreen";
import { diagnose } from "./lib/api";
import { friendlyError } from "./lib/errors";
import { clearHistory, loadHistory, saveDiagnosis } from "./lib/history";

// Heavy feature screens are lazy-loaded so the main bundle stays small on
// cellular connections: the camera/upload libs only load when the user
// reaches Capture, and lottie-web only loads while a diagnosis is running.
const CaptureScreen = lazy(() => import("./components/CaptureScreen"));
const LoadingScreen = lazy(() => import("./components/LoadingScreen"));

function makeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Gentle fade + slide between screens.
const screenMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const transition = { duration: 0.28, ease: "easeOut" };

export default function App() {
  const [screen, setScreen] = useState("home"); // home | capture | loading | result | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => loadHistory());
  const lastAttempt = useRef(null); // { imageBase64, note } for retries

  /* ---------- Browser/mobile back button ---------- */
  // No router needed — a lightweight history entry per screen keeps the SPA
  // from trapping the user (Home → Capture → Result … and back again).
  const navigate = useCallback((next) => {
    setScreen(next);
    try {
      window.history.pushState({ screen: next }, "");
    } catch {
      /* history unavailable (e.g. file://) — state still works */
    }
  }, []);

  useEffect(() => {
    const onPop = () => {
      const s = window.history.state?.screen;
      setScreen(typeof s === "string" ? s : "home");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goHome = useCallback(() => navigate("home"), [navigate]);
  const goCapture = useCallback(() => navigate("capture"), [navigate]);

  const runDiagnosis = useCallback(
    async ({ imageBase64, note }) => {
      lastAttempt.current = { imageBase64, note };
      setError(null);
      setScreen("loading"); // loading is transient — no history entry
      try {
        const data = await diagnose(imageBase64, note);
        // History stores text metadata only — never image data.
        const entry = { id: makeId(), date: Date.now(), ...data };
        setResult(entry);
        setHistory(saveDiagnosis(entry));
        navigate("result");
      } catch (err) {
        setError(err);
        // Instant feedback via toast; the full error screen follows with retry options.
        toast.error("Couldn't analyze that photo, try again", {
          description: friendlyError(err),
        });
        navigate("error");
      }
    },
    [navigate]
  );

  const openFromHistory = useCallback((entry) => {
    setResult(entry);
    setError(null);
    navigate("result");
  }, [navigate]);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  let content;
  switch (screen) {
    case "capture":
      content = <CaptureScreen onSubmit={runDiagnosis} onCancel={goHome} />;
      break;
    case "loading":
      content = <LoadingScreen />;
      break;
    case "result":
      content = result ? (
        <ResultScreen result={result} onDiagnoseAnother={goCapture} onHome={goHome} />
      ) : (
        <HomeScreen
          onStart={goCapture}
          history={history}
          onOpenResult={openFromHistory}
          onClearHistory={handleClearHistory}
        />
      );
      break;
    case "error":
      content = (
        <ErrorScreen
          error={error}
          onRetry={() => runDiagnosis(lastAttempt.current ?? {})}
          onChangePhoto={goCapture}
          onHome={goHome}
        />
      );
      break;
    case "home":
    default:
      content = (
        <HomeScreen
          onStart={goCapture}
          history={history}
          onOpenResult={openFromHistory}
          onClearHistory={handleClearHistory}
        />
      );
  }

  return (
    <>
      <BotanicalBackground />
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={screenMotion}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
        >
          {/* Minimal fallback while a lazy chunk loads — never a blank screen. */}
          <Suspense
            fallback={
              <div className="flex min-h-[70dvh] items-center justify-center" aria-busy="true">
                <div className="progress-track w-40">
                  <div className="progress-bar" />
                </div>
              </div>
            }
          >
            {content}
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <Toaster position="bottom-center" richColors closeButton toastOptions={{ duration: 4000 }} />
    </>
  );
}
