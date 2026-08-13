import { Button } from "@/components/ui/button";
import BrandMark from "./BrandMark";
import { ROUTES } from "@/lib/routes";

export default function Footer({ onNavigate, onDiagnose }) {
  const go = (route) => onNavigate(route);

  return (
    <footer className="mt-20 border-t border-moss-100 bg-moss-50/60">
      <div className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <button
              type="button"
              onClick={() => go(ROUTES.home)}
              className="ring-focus flex items-center gap-2 rounded-xl"
              aria-label="PlantRx home"
            >
              <BrandMark size="sm" className="h-9 w-9 rounded-lg" />
              <span className="font-display text-xl font-semibold tracking-tight text-moss-800">
                Plant<span className="text-moss-500">Rx</span>
              </span>
            </button>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-moss-600">
              An AI-assisted plant care companion. Snap a photo, get a likely
              diagnosis and a simple plan to help your plant recover.
            </p>
          </div>

          {/* Product */}
          <nav aria-label="Product">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss-500">Product</p>
            <ul className="mt-3 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={onDiagnose}
                  className="ring-focus rounded-md text-sm font-semibold text-moss-700 hover:text-moss-900"
                >
                  Diagnose
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go(ROUTES.plantCare)}
                  className="ring-focus rounded-md text-sm font-semibold text-moss-700 hover:text-moss-900"
                >
                  Plant Care
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go(ROUTES.faq)}
                  className="ring-focus rounded-md text-sm font-semibold text-moss-700 hover:text-moss-900"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go(ROUTES.about)}
                  className="ring-focus rounded-md text-sm font-semibold text-moss-700 hover:text-moss-900"
                >
                  About
                </button>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss-500">Company</p>
            <ul className="mt-3 space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => go(ROUTES.about)}
                  className="ring-focus rounded-md text-sm font-semibold text-moss-700 hover:text-moss-900"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go(ROUTES.contact)}
                  className="ring-focus rounded-md text-sm font-semibold text-moss-700 hover:text-moss-900"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go(ROUTES.privacy)}
                  className="ring-focus rounded-md text-sm font-semibold text-moss-700 hover:text-moss-900"
                >
                  Privacy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go(ROUTES.terms)}
                  className="ring-focus rounded-md text-sm font-semibold text-moss-700 hover:text-moss-900"
                >
                  Terms
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go(ROUTES.disclaimer)}
                  className="ring-focus rounded-md text-sm font-semibold text-moss-700 hover:text-moss-900"
                >
                  Disclaimer
                </button>
              </li>
            </ul>
          </nav>

          {/* Trust */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-moss-500">Good to know</p>
            <p className="mt-3 text-sm leading-relaxed text-moss-600">
              PlantRx provides AI-assisted plant care guidance for informational
              purposes. Plant conditions can have multiple causes, so results
              should be treated as a starting point rather than a guaranteed
              diagnosis.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4 rounded-xl"
              onClick={onDiagnose}
            >
              Diagnose a plant
            </Button>
          </div>
        </div>

        <div className="mt-10 border-t border-moss-100 pt-6 text-xs text-moss-500">
          <p>© {new Date().getFullYear()} PlantRx. Made with care for plant people.</p>
          <p className="mt-1">
            PlantRx is an AI-assisted educational tool and does not guarantee
            plant disease identification.
          </p>
        </div>
      </div>
    </footer>
  );
}
