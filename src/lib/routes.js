/**
 * PlantRx routing — real pathname routes for content pages, on top of the
 * existing screen-state machine in App. No router dependency: the app already
 * manages history via pushState/popstate, so we extend that pattern with a
 * tiny route table instead of pulling in a routing library.
 *
 * Diagnostic screens (capture/loading/result/error) keep their current
 * behavior — they're part of the in-app flow, not public content routes.
 */

export const ROUTES = {
  home: "home",
  capture: "capture",
  loading: "loading",
  result: "result",
  error: "error",
  about: "about",
  plantCare: "plant-care",
  article: "article", // /plant-care/:slug
  faq: "faq",
  privacy: "privacy",
  terms: "terms",
  disclaimer: "disclaimer",
  contact: "contact",
};

// Content routes get real URLs; diagnostic screens keep the current URL
// (no path change) so back/forward inside the flow still works naturally.
const PATHS = {
  home: "/",
  capture: "/diagnose",
  about: "/about",
  "plant-care": "/plant-care",
  faq: "/faq",
  privacy: "/privacy",
  terms: "/terms",
  disclaimer: "/disclaimer",
  contact: "/contact",
};

/** The URL for a route. Diagnostic screens return null → caller keeps URL. */
export function pathFor(route, slug) {
  if (route === ROUTES.article && slug) return `/plant-care/${encodeURIComponent(slug)}`;
  return PATHS[route] ?? null;
}

/** Parse a pathname into { route, slug? }. Unknown paths fall back to home. */
export function routeFromPath(pathname) {
  const p = (pathname || "/").replace(/\/+$/, "") || "/";
  if (p.startsWith("/plant-care/")) {
    return { route: ROUTES.article, slug: decodeURIComponent(p.slice("/plant-care/".length)) };
  }
  if (p === "/plant-care") return { route: ROUTES.plantCare };
  for (const [route, path] of Object.entries(PATHS)) {
    if (p === path) return { route };
  }
  return { route: ROUTES.home };
}

/** Whether a route is a public content page (gets nav + footer). */
export function isContentRoute(route) {
  return [
    ROUTES.about,
    ROUTES.plantCare,
    ROUTES.article,
    ROUTES.faq,
    ROUTES.privacy,
    ROUTES.terms,
    ROUTES.disclaimer,
    ROUTES.contact,
  ].includes(route);
}

/** Whether a route is one of the in-app diagnostic screens. */
export function isAppScreen(route) {
  return [ROUTES.capture, ROUTES.loading, ROUTES.result, ROUTES.error].includes(route);
}
