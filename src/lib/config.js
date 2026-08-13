/**
 * Site configuration.
 *
 * CONTACT_EMAIL — replace this placeholder with your real contact address
 * before going live. It is rendered on the /contact page and used in the
 * privacy policy. We deliberately don't invent an address.
 */
export const CONTACT_EMAIL = "contact@plantrx.example.com";

/**
 * Backend API base URL.
 * - Web: VITE_API_BASE_URL is unset → "" → requests go to the same origin
 *   (/api/diagnose), which works on Vercel and the local dev proxy.
 * - Android (Capacitor): set VITE_API_BASE_URL to your deployed PlantRx
 *   backend in .env.android (see .env.android.example) and build with
 *   `npm run build:android`. The Android WebView has no same-origin API, so
 *   it needs the absolute production URL. The Gemini key always stays
 *   server-side — the app only ever talks to the PlantRx API.
 */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");
