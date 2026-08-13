import { API_BASE_URL } from "./config";

/**
 * Talks to the PlantRx backend at /api/diagnose.
 * - Web: relative URL (same origin on Vercel / dev proxy).
 * - Android: absolute production URL from VITE_API_BASE_URL.
 * The AI model is always called server-side — never from the app.
 */
export async function diagnose(imageBase64, note) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}/api/diagnose`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64, note: (note ?? "").trim() }),
    });
  } catch {
    throw new Error("network");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON error body — handled below */
  }

  if (!res.ok) {
    const message = (data && data.error) || "The plant doctor had a hiccup. Please try again.";
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  // Defense in depth: never render a malformed payload even if the server
  // somehow returned one.
  const VALID_CONFIDENCE = new Set(["low", "medium", "high"]);
  const malformed =
    !data ||
    typeof data.issue !== "string" ||
    !data.issue.trim() ||
    !VALID_CONFIDENCE.has(data.confidence) ||
    typeof data.explanation !== "string" ||
    !data.explanation.trim() ||
    !Array.isArray(data.fixes) ||
    data.fixes.length < 1 ||
    data.fixes.some((f) => typeof f !== "string" || !f.trim());
  if (malformed) {
    const err = new Error("The plant doctor gave a confusing answer. Please try again.");
    err.status = 502;
    throw err;
  }

  return data;
}
