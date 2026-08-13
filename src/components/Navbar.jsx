import { useState } from "react";
import { Camera, Menu, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BrandMark from "./BrandMark";
import { ROUTES } from "@/lib/routes";

function scrollToSection(id) {
  // Instant scrollTo (not smooth, not scrollIntoView): smooth animation isn't
  // reliable across every mobile browser/embedded webview, and instant always
  // lands. offsetTop works because content divs aren't positioned.
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo(0, el.offsetTop - 80); // leave room for the sticky navbar
}

const LINKS = [
  { label: "Plant Care", route: ROUTES.plantCare },
  { label: "FAQ", route: ROUTES.faq },
  { label: "About", route: ROUTES.about },
];

export default function Navbar({ route, onNavigate, onDiagnose }) {
  const [open, setOpen] = useState(false);
  const onHome = () => onNavigate(ROUTES.home);

  const goToHowItWorks = () => {
    setOpen(false);
    if (route === ROUTES.home) {
      scrollToSection("how-it-works");
      return;
    }
    onNavigate(ROUTES.home);
    // Home mounts after the screen-exit animation. Retry until the section
    // exists so the scroll lands even if mounting is slow.
    const tryScroll = (attempt = 0) => {
      const el = document.getElementById("how-it-works");
      if (el) {
        scrollToSection("how-it-works");
        return;
      }
      if (attempt < 8) setTimeout(() => tryScroll(attempt + 1), 250);
    };
    setTimeout(() => tryScroll(), 350);
  };

  const goTo = (next) => {
    setOpen(false);
    onNavigate(next);
  };

  const isActive = (r) => route === r;

  return (
    <header className="sticky top-0 z-40 border-b border-moss-100/80 bg-cream/85 backdrop-blur-sm">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4"
      >
        {/* Brand */}
        <button
          type="button"
          onClick={onHome}
          className="ring-focus flex items-center gap-2 rounded-xl"
          aria-label="PlantRx home"
        >
          <BrandMark size="sm" className="h-9 w-9 rounded-lg" />
          <span className="font-display text-xl font-semibold tracking-tight text-moss-800">
            Plant<span className="text-moss-500">Rx</span>
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl font-semibold text-moss-700 hover:bg-moss-50"
            onClick={onDiagnose}
          >
            <Camera className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Diagnose
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="rounded-xl font-semibold text-moss-700 hover:bg-moss-50"
            onClick={goToHowItWorks}
          >
            How it works
          </Button>
          {LINKS.map(({ label, route: r }) => (
            <Button
              key={r}
              type="button"
              variant="ghost"
              size="sm"
              className={`rounded-xl font-semibold hover:bg-moss-50 ${
                isActive(r) ? "text-moss-800 underline decoration-moss-400 decoration-2 underline-offset-4" : "text-moss-700"
              }`}
              onClick={() => goTo(r)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-xl md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </nav>

      {/* Mobile menu */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="top-4 w-[calc(100%-2rem)] max-w-sm rounded-2xl translate-y-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-moss-500" aria-hidden="true" />
              PlantRx
            </DialogTitle>
            <DialogDescription>Where would you like to go?</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-1.5">
            <Button
              type="button"
              variant="ghost"
              className="justify-start rounded-xl text-base font-semibold text-moss-800"
              onClick={() => goTo(ROUTES.home)}
            >
              Home
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="justify-start rounded-xl text-base font-semibold text-moss-800"
              onClick={() => {
                setOpen(false);
                onDiagnose();
              }}
            >
              <Camera className="mr-2 h-5 w-5 text-moss-500" aria-hidden="true" />
              Diagnose
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="justify-start rounded-xl text-base font-semibold text-moss-800"
              onClick={goToHowItWorks}
            >
              How it works
            </Button>
            {LINKS.map(({ label, route: r }) => (
              <Button
                key={r}
                type="button"
                variant="ghost"
                className="justify-start rounded-xl text-base font-semibold text-moss-800"
                onClick={() => goTo(r)}
              >
                {label}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
