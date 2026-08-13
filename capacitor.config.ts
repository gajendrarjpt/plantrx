import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor configuration for the PlantRx Android app.
 * The Android app loads the same web build from https://localhost (a secure
 * context, which is required for getUserMedia camera access).
 */
const config: CapacitorConfig = {
  appId: "com.plantrx.app",
  appName: "PlantRx",
  webDir: "dist",

  server: {
    // Secure WebView origin (default) — enables camera + clipboard APIs.
    androidScheme: "https",
  },

  android: {
    // Render edges to edge by default (Capacitor 8); the web app already
    // respects safe-area insets.
    allowMixedContent: false,
  },
};

export default config;
