/**
 * Build-time platform flag.
 * - Web (default): VITE_APP_PLATFORM is unset → "web"
 * - Android (Capacitor build): set VITE_APP_PLATFORM=android in .env.android
 *   (see .env.android.example) and build with `npm run build:android`.
 */
export const PLATFORM = (import.meta.env.VITE_APP_PLATFORM || "web").toLowerCase();
export const IS_ANDROID = PLATFORM === "android";
