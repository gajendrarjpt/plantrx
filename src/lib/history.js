const KEY = "plantrx:diagnoses";
const MAX = 3;

/**
 * Returns the last {MAX} diagnoses from localStorage (or [] on any failure).
 * Each entry is text metadata only — { id, issue, confidence, explanation,
 * fixes, date }. No image data is ever stored on-device.
 */
export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.slice(0, MAX) : [];
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
