import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import BotanicalBackground from "./components/BotanicalBackground";
import HomeScreen from "./components/HomeScreen";
import ResultScreen from "./components/ResultScreen";
import ErrorScreen from "./components/ErrorScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { diagnose } from "./lib/api";
import { friendlyError } from "./lib/errors";
import { clearHistory, loadHistory, saveDiagnosis } from "./lib/history";
import { ROUTES, pathFor, routeFromPath } from "./lib/routes";

// Heavy feature screens and content pages are lazy-loaded so the home screen
// stays lean on cellular connections.
const CaptureScreen = lazy(() => import("./components/CaptureScreen"));
const LoadingScreen = lazy(() => import("./components/LoadingScreen"));
const ContentRoutes = lazy(() => import("./pages/ContentRoutes"));

function makeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Gentle fade + slide between screens and pages.
const screenMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const transition = { duration: 0.28, ease: "easeOut" };

export default function App() {
  const initial = useRef(null);
  if (initial.current === null) initial.current = routeFromPath(window.location.pathname);

  const [route, setRoute] = useState(initial.current.route); // home | capture | loading | result | error | content routes
  const [articleSlug, setArticleSlug] = useState(initial.current.slug ?? null);
  const [result, setResult] = useState(null);
  const [photo, setPhoto] = useState(null); // transient — current diagnosis photo (memory only, never persisted)
  const [error, setError] = useState(null);
  const [history, setHistory] = useState(() => loadHistory());
  const lastAttempt = useRef(null); // { imageBase64, note, photoDataUrl } for retries

  /* ---------- Routing: real URLs for content pages, history-based ---------- */
  const navigate = useCallback((next, slug) => {
    setRoute(next);
    if (next === ROUTES.article) setArticleSlug(slug);
    const url = pathFor(next, slug);
    try {
      window.history.pushState(
        { route: next, slug: next === ROUTES.article ? slug : undefined },
        "",
        url ?? window.location.pathname
      );
    } catch {
      /* history unavailable (e.g. file://) — state still works */
    }
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const onPop = () => {
      const st = window.history.state;
      if (st?.route) {
        setRoute(st.route);
        if (st.route === ROUTES.article) setArticleSlug(st.slug);
      } else {
        const parsed = routeFromPath(window.location.pathname);
        setRoute(parsed.route);
        if (parsed.route === ROUTES.article) setArticleSlug(parsed.slug);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const goHome = useCallback(() => navigate(ROUTES.home), [navigate]);
  const goCapture = useCallback(() => navigate(ROUTES.capture), [navigate]);

  /* ---------- Diagnosis flow ---------- */
  const runDiagnosis = useCallback(
    async ({ imageBase64, note, photoDataUrl }) => {
      lastAttempt.current = { imageBase64, note, photoDataUrl };
      setPhoto(photoDataUrl ?? null);
      setError(null);
      setRoute(ROUTES.loading); // loading is transient — no history entry
      try {
        const data = await diagnose(imageBase64, note);
        // History stores text metadata only — never image data.
        const entry = { id: makeId(), date: Date.now(), ...data };
        setResult(entry);
        setHistory(saveDiagnosis(entry));
        navigate(ROUTES.result);
      } catch (err) {
        setError(err);
        toast.error("Couldn't analyze that photo, try again", {
          description: friendlyError(err),
        });
        navigate(ROUTES.error);
      }
    },
    [navigate]
  );

  const openFromHistory = useCallback(
    (entry) => {
      setResult(entry);
      setPhoto(null); // history has no image data
      setError(null);
      navigate(ROUTES.result);
    },
    [navigate]
  );

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  /* ---------- Content ---------- */
  let content;
  switch (route) {
    case ROUTES.capture:
      content = <CaptureScreen onSubmit={runDiagnosis} onCancel={goHome} />;
      break;
    case ROUTES.loading:
      content = <LoadingScreen />;
      break;
    case ROUTES.result:
      content = result ? (
        <ResultScreen
          result={result}
          photo={photo}
          onDiagnoseAnother={goCapture}
          onHome={goHome}
        />
      ) : (
        <HomeScreen
          onStart={goCapture}
          history={history}
          onOpenResult={openFromHistory}
          onClearHistory={handleClearHistory}
        />
      );
      break;
    case ROUTES.error:
      content = (
        <ErrorScreen
          error={error}
          onRetry={() => runDiagnosis(lastAttempt.current ?? {})}
          onChangePhoto={goCapture}
          onHome={goHome}
        />
      );
      break;
    case ROUTES.about:
    case ROUTES.plantCare:
    case ROUTES.article:
    case ROUTES.faq:
    case ROUTES.privacy:
    case ROUTES.terms:
    case ROUTES.disclaimer:
    case ROUTES.contact:
      content = (
        <ContentRoutes
          route={route}
          slug={articleSlug}
          navigate={navigate}
          onDiagnose={goCapture}
        />
      );
      break;
    case ROUTES.home:
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

  // Chrome (navbar + footer) on home is rendered by App; content pages render
  // their own via PageShell. Diagnostic screens stay focused without chrome.
  const withChrome = route === ROUTES.home;

  return (
    <>
      <BotanicalBackground />
      {withChrome && <Navbar route={route} onNavigate={navigate} onDiagnose={goCapture} />}
      <AnimatePresence mode="wait">
        <motion.div
          key={route}
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
      {withChrome && <Footer onNavigate={navigate} onDiagnose={goCapture} />}
      <Toaster position="bottom-center" richColors closeButton toastOptions={{ duration: 4000 }} />
    </>
  );
}
