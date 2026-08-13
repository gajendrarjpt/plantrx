import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Vite's dep optimizer resolves lottie-react to its CJS build, where the
      // default export is the module namespace object rather than the component.
      // Pin to the ESM build so `import Lottie from "lottie-react"` works as documented.
      "lottie-react": fileURLToPath(
        new URL("./node_modules/lottie-react/build/index.es.js", import.meta.url)
      ),
    },
  },
  server: {
    // For local development, forward /api calls to the dev API shim
    // (run `npm run dev:api` in a second terminal). In production on
    // Vercel, /api/diagnose is a serverless function — no proxy needed.
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
  preview: {
    // Same proxy for `vite preview` (serving the production build locally).
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
});
