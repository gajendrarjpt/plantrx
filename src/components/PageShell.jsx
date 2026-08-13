import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ROUTES, routeFromPath } from "@/lib/routes";

/**
 * Shared layout for content pages (About, Plant Care, FAQ, Privacy, …):
 * navbar + centered content + footer. The diagnostic screens keep their own
 * focused layouts and don't use this shell.
 */
export default function PageShell({ route, navigate, onDiagnose, children }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar route={route} onNavigate={navigate} onDiagnose={onDiagnose} />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto w-full max-w-3xl flex-1 px-4 pt-10"
        onClick={(e) => {
          // Internal links use the SPA transition instead of a full reload.
          const a = e.target.closest?.('a[href^="/"]');
          if (a && a.target !== "_blank") {
            e.preventDefault();
            const p = a.getAttribute("href");
            const slug = p.startsWith("/plant-care/") ? p.slice("/plant-care/".length) : undefined;
            navigate(slug ? ROUTES.article : routeFromPath(p).route, slug);
            window.scrollTo({ top: 0 });
          }
        }}
      >
        {children}
      </motion.main>
      <Footer onNavigate={navigate} onDiagnose={onDiagnose} />
    </div>
  );
}

/** Consistent page title block for content pages. */
export function PageHeader({ eyebrow, title, intro }) {
  return (
    <header className="mb-10">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-moss-500">{eyebrow}</p>
      )}
      <h1 className="mt-2 font-display text-display text-moss-800">{title}</h1>
      {intro && <p className="mt-4 max-w-2xl text-body leading-relaxed text-moss-600">{intro}</p>}
    </header>
  );
}

/** Section heading used inside content pages. */
export function SectionTitle({ children }) {
  return (
    <h2 className="mt-10 font-display text-title font-semibold text-moss-800">{children}</h2>
  );
}
