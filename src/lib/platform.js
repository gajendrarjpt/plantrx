/**
 * Build-time platform flag.
 * - Web (default): VITE_APP_PLATFORM is unset → "web"
 * - Android (Capacitor build): set VITE_APP_PLATFORM=android in .env.android
 *   (see .env.android.example) and build with `npm run build:android`.
 *
 * Keep the value lowercase ("web" | "android") — Vite inlines
 * `import.meta.env.VITE_APP_PLATFORM` at build time, so these comparisons
 * fold to constants and dead platform branches are fully tree-shaken out.
 * (A runtime `.toLowerCase()` here would defeat that folding and ship the
 * web-only AdSense branch inside the Android bundle.)
 */
export const PLATFORM = import.meta.env.VITE_APP_PLATFORM || "web";
export const IS_ANDROID = PLATFORM === "android";
