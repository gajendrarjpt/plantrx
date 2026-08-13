const KEY = "plantrx:diagnoses";
const MAX = 3;
const CONFIDENCE = new Set(["low", "medium", "high"]);

/** Keep only entries that look like real diagnoses, so corrupted
 *  localStorage can never crash the UI or cause React key warnings. */
function sanitize(list) {
  if (!Array.isArray(list)) return [];
  return list
    .filter(
      (e) =>
        e &&
        typeof e === "object" &&
        typeof e.id === "string" &&
        typeof e.issue === "string" &&
        typeof e.date === "number" &&
        CONFIDENCE.has(e.confidence) &&
        Array.isArray(e.fixes)
    )
    .slice(0, MAX);
}

/**
 * Returns the last {MAX} diagnoses from localStorage (or [] on any failure).
 * Each entry is text metadata only — { id, issue, confidence, explanation,
 * fixes, date }. No image data is ever stored on-device.
 */
export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

/** Prepend a diagnosis, keep only the {MAX} newest, persist, and return the new list. */
export function saveDiagnosis(entry) {
  try {
    const list = [entry, ...loadHistory().filter((e) => e.id !== entry.id)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(list));
    return list;
  } catch {
    return loadHistory();
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
