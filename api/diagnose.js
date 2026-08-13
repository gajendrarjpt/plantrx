/**
 * PlantRx diagnosis endpoint — Vercel serverless function.
 *
 * POST /api/diagnose
 * Body: { "imageBase64": "<raw base64, no data: prefix>", "note": "<optional symptoms text>" }
 * Response: { "issue": string, "confidence": "low"|"medium"|"high",
 *             "explanation": string, "fixes": string[] (3–5) }
 *
 * The AI model is only ever called from here (server-side). The browser never
 * sees PLANT_API_KEY — set it in Vercel: Settings → Environment Variables.
 * The key is never logged, never returned, and never sent to the client.
 * Uploaded images are never persisted — they are streamed to Gemini for
 * analysis only.
 *
 * Local dev: run `npm run dev:api` (see scripts/dev-api.mjs).
 */

// gemini-flash-latest is a stable alias that always points at Google's current
// flash-tier model. (gemini-2.5-flash itself is deprecated for new API keys,
// and pinning an exact version risks the same breakage again — the alias keeps
// this app working without maintenance.) Verified to support vision + strict
// JSON responseSchema. See also: ai.google.dev/gemini-api/docs/models
const MODEL = "gemini-flash-latest";
const GEMINI_URL = (apiKey) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

const MAX_IMAGE_BASE64 = 6_000_000; // ~4.5 MB decoded; comfortably inside Vercel's 4.5 MB body cap
const MAX_NOTE_LENGTH = 300;
const VALID_CONFIDENCE = new Set(["low", "medium", "high"]);
const MAX_ISSUE_LENGTH = 150;
const MAX_EXPLANATION_LENGTH = 3000;
const MAX_FIX_LENGTH = 500;

/* ---------------- Simple in-memory rate limiter ---------------- */
// ~5 requests per minute per IP. Resets when the function cold-starts —
// fine for protecting a free-tier quota from a single eager user.
// No database or paid infrastructure needed for this prototype.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function clientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.trim()) return fwd.split(",")[0].trim();
  const real = req.headers["x-real-ip"];
  if (typeof real === "string" && real.trim()) return real.trim();
  return req.socket?.remoteAddress || "unknown";
}

function allowRequest(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return false;
  recent.push(now);
  hits.set(ip, recent);

  // Occasional cleanup so the map doesn't grow forever.
  if (hits.size > 2_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return true;
}

/* ---------------- Prompt + Gemini call ---------------- */

function buildPrompt(note) {
  const symptomLine = note
    ? `The user added this note: ${JSON.stringify(note)}\nTreat it as a clue worth checking against the photo — not as proof.`
    : "The user did not add any notes.\n";
  return [
    "You are the PlantRx plant doctor: a cautious, friendly houseplant assistant who explains things in plain English for non-gardeners.",
    "A user uploaded a photo of a struggling houseplant.",
    symptomLine,
    "Examine the photo carefully before deciding:",
    "- leaf color (yellowing, browning, pale patches, dark spots)",
    "- leaf texture and shape (spots, holes, curling, wilting, drooping)",
    "- signs of pests (tiny bugs, webbing, sticky residue, chewed edges)",
    "- stems and branches",
    "- the visible soil and pot (bone dry, soggy, moldy, drainage)",
    "- the plant's overall vigor",
    "",
    "Then provide the SINGLE most likely issue, following these rules:",
    "- Choose the confidence level honestly, based ONLY on how clear the evidence in the photo is. If the photo is blurry, dark, or ambiguous, use \"low\" and say so.",
    "- Never invent a plant species. Refer to it as a houseplant or describe what you can see.",
    "- Never claim an invisible condition as fact (for example, root rot you cannot actually see).",
    "- If the photo is too unclear to judge, still follow the schema: use \"low\" confidence, explain that the photo was unclear, and give safe steps such as retaking the photo in better light.",
    "- Provide 3-5 concrete, practical, safe steps the person can do today: adjust watering, light, drainage, repotting, or gentle inspection. Do NOT recommend harsh chemicals or anything unsafe in a home.",
    "- Keep the tone warm, encouraging, and non-clinical. Simple language, no unnecessary jargon.",
    "",
    'Return STRICT JSON matching the response schema exactly — no markdown, no code fences, no extra commentary.',
  ].join("\n");
}

/** Gemini structured-output schema — the model must conform to this shape. */
const DIAGNOSIS_SCHEMA = {
  type: "OBJECT",
  properties: {
    issue: {
      type: "STRING",
      description: "Short diagnosis name, e.g. 'Overwatering (root rot)'.",
    },
    confidence: {
      type: "STRING",
      enum: ["low", "medium", "high"],
      description: "How confident the diagnosis is from the photo alone.",
    },
    explanation: {
      type: "STRING",
      description: "2-4 plain-English sentences explaining why this is likely the problem.",
    },
    fixes: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "3-5 concrete, safe actions the user can take today.",
    },
  },
  required: ["issue", "confidence", "explanation", "fixes"],
};

async function callGemini(apiKey, imageBase64, note) {
  let res;
  try {
    res = await fetch(GEMINI_URL(apiKey), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: buildPrompt(note) },
              { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json",
          responseSchema: DIAGNOSIS_SCHEMA,
        },
      }),
    });
  } catch {
    const err = new Error("Could not reach the AI provider.");
    err.status = 502;
    throw err;
  }

  if (!res.ok) {
    // Never log the request URL (it contains the API key) — status only.
    const err = new Error(`AI provider returned ${res.status}.`);
    err.status = res.status === 429 ? 429 : 502;
    throw err;
  }

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((p) => (typeof p.text === "string" ? p.text : ""))
      .join("") || "";

  // Defensive: even with responseSchema, some responses arrive wrapped in
  // ```json fences. Strip them before parsing.
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    const err = new Error("The AI returned an unreadable response.");
    err.status = 502;
    throw err;
  }
  return normalize(parsed);
}

/**
 * Validate + normalize Gemini's answer. Never trust the model blindly —
 * anything malformed becomes a safe server error (no broken data reaches
 * the client).
 */
function normalize(raw) {
  const issue = typeof raw?.issue === "string" ? raw.issue.trim().slice(0, MAX_ISSUE_LENGTH) : "";
  const explanation =
    typeof raw?.explanation === "string"
      ? raw.explanation.trim().slice(0, MAX_EXPLANATION_LENGTH)
      : "";
  const confidence = raw?.confidence;

  const fixes = Array.isArray(raw?.fixes)
    ? raw.fixes
        .filter((f) => typeof f === "string" && f.trim())
        .map((f) => f.trim().slice(0, MAX_FIX_LENGTH))
    : [];

  const fail = (reason) => {
    const err = new Error(`The AI response was invalid (${reason}).`);
    err.status = 502;
    throw err;
  };

  if (!issue) fail("missing issue");
  if (!explanation) fail("missing explanation");
  if (!VALID_CONFIDENCE.has(confidence)) fail("invalid confidence");
  if (fixes.length < 3) fail("too few fixes");
  // More than 5 fixes is trimmed to keep the result digestible, not an error.
  const result = { issue, confidence, explanation, fixes: fixes.slice(0, 5) };
  return result;
}

/* ---------------- Handler ---------------- */

export default async function handler(req, res) {
  // CORS isn't needed (frontend and function share the Vercel origin), but
  // answer OPTIONS politely for tooling.
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "This endpoint accepts POST requests only." });
  }

  if (!allowRequest(clientIp(req))) {
    return res.status(429).json({
      error:
        "Whoa, you're going fast! 🌪️ The plant doctor needs a minute — try again shortly.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "That request wasn't valid JSON." });
    }
  }
  body = body ?? {};

  const { imageBase64, note } = body;

  if (typeof imageBase64 !== "string" || !imageBase64) {
    return res.status(400).json({ error: "No photo was included in the request." });
  }
  if (imageBase64.length > MAX_IMAGE_BASE64) {
    return res.status(413).json({ error: "That photo is too large to send. Try a smaller one." });
  }
  if (note != null && (typeof note !== "string" || note.length > MAX_NOTE_LENGTH)) {
    return res.status(400).json({ error: "The note must be text under 300 characters." });
  }

  const apiKey = process.env.PLANT_API_KEY;
  if (!apiKey) {
    // Log only the fact that config is missing — never the key itself.
    console.error("[diagnose] PLANT_API_KEY is not set.");
    return res.status(500).json({ error: "PlantRx isn't fully set up yet. Please try again later." });
  }

  try {
    const result = await callGemini(apiKey, imageBase64, note || "");
    return res.status(200).json(result);
  } catch (err) {
    // err.message contains only status/schema info — no key, no image data.
    console.error("[diagnose] failed:", err.message);
    const status = err.status || 502;
    const message =
      status === 429
        ? "The plant doctor is seeing too many patients right now — try again in a minute."
        : status === 400 || status === 403
          ? "The plant doctor couldn't look at that photo. Try another one."
          : "Something went wrong while diagnosing your plant. Please try again.";
    return res.status(status).json({ error: message });
  }
}
