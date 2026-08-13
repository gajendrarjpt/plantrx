import { useEffect } from "react";

/**
 * Base URL of the deployed site — used for the canonical link and sitemap.
 * REPLACE with your real domain after deploying (e.g. "https://plantrx.com").
 * Keep it truthful: an unreachable placeholder is only meant for local dev.
 */
export const SITE_URL = "https://plantrx.example.com";

/**
 * Lightweight per-page SEO: sets document.title, the meta description, and
 * the canonical link. Called from each content page.
 */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${SITE_URL}${window.location.pathname === "/" ? "" : window.location.pathname}`;
    // Clean up: keep the base description/canonical for the home page.
    return () => {};
  }, [title, description]);
}
