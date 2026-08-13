/**
 * Turns a caught error into a friendly, gardener-appropriate message.
 * The API itself returns user-friendly messages; this maps transport-level
 * failures (offline, proxy hiccups) and status codes that need extra context.
 */
export function friendlyError(err) {
  if (!err) return "Something went wrong on our end.";
  if (err.message === "network") {
    return "It looks like you're offline or the connection dropped. Check your connection and try again.";
  }
  if (err.status === 429) {
    return "You're moving fast! Our plant doctor needs a minute to catch its breath — try again in a few seconds.";
  }
  if (err.status === 413) {
    return "That photo is too big to send. Try a smaller image or a fresh photo.";
  }
  if (err.status === 400 || err.status === 403) {
    return "The plant doctor couldn't look at that photo. Try another one.";
  }
  if (typeof err.message === "string" && err.message) return err.message;
  return "Something went wrong on our end.";
}
