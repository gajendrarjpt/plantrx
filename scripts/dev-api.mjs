/**
 * Local development server for api/diagnose.js — lets you run the full stack
 * without deploying to Vercel:
 *
 *   terminal 1: npm run dev:api        (this script, http://localhost:8787)
 *   terminal 2: npm run dev            (Vite, proxies /api → this server)
 *
 * Reads PLANT_API_KEY from .env (if present). Set MOCK_DIAGNOSIS=1 to get a
 * canned diagnosis without spending any API quota:
 *
 *   MOCK_DIAGNOSIS=1 npm run dev:api
 */
import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

// Tiny .env loader (no dependency needed).
function loadEnv() {
  const envPath = join(root, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
loadEnv();

const { default: handler } = await import("../api/diagnose.js");

const MOCK = process.env.MOCK_DIAGNOSIS === "1";
const PORT = Number(process.env.API_PORT || 8787);

const MOCK_RESULT = {
  issue: "Overwatering (root rot)",
  confidence: "medium",
  explanation:
    "The yellowing lower leaves and soggy-looking soil are classic signs of overwatering. When roots sit in water too long they stop getting air, and the plant slowly suffocates — which looks a lot like a thirst problem, so it's easy to water even more.",
  fixes: [
    "Let the top 2 inches of soil dry out completely before watering again — use your finger to check.",
    "Make sure the pot has drainage holes, and dump any water that collects in the saucer.",
    "Gently lift the plant out and trim soft, brown, mushy roots with clean scissors if you find any.",
    "Move it to bright, indirect light while it recovers, and skip fertilizer for a month.",
  ],
};

/**
 * The Vercel runtime augments the Node response with res.status() and
 * res.json(). Recreate that thin wrapper so api/diagnose.js runs as-is here.
 */
function wrapRes(res) {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (payload) => {
    if (!res.headersSent) {
      res.writeHead(res.statusCode || 200, { "Content-Type": "application/json" });
    }
    res.end(JSON.stringify(payload));
    return res;
  };
  return res;
}

/** Mirrors the handler's input validation so mock mode shows real error paths. */
function mockValidate(body, res) {
  if (typeof body !== "object" || body === null) {
    return res.status(400).json({ error: "That request wasn't valid JSON." });
  }
  if (typeof body.imageBase64 !== "string" || !body.imageBase64) {
    return res.status(400).json({ error: "No photo was included in the request." });
  }
  if (
    body.note != null &&
    (typeof body.note !== "string" || body.note.length > 300)
  ) {
    return res.status(400).json({ error: "The note must be text under 300 characters." });
  }
  return null;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (url.pathname !== "/api/diagnose") {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  // Collect + parse the body the way Vercel does, then hand off to the handler.
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");

  if (req.method === "POST" && raw) {
    try {
      req.body = JSON.parse(raw);
    } catch {
      req.body = raw; // handler will respond 400
    }
  } else {
    req.body = {};
  }
  req.headers["x-real-ip"] = req.socket.remoteAddress || "127.0.0.1";

  if (MOCK && req.method === "POST") {
    const invalid = mockValidate(req.body, wrapRes(res));
    if (invalid) return;
    await new Promise((r) => setTimeout(r, 900)); // mimic a real round-trip
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(MOCK_RESULT));
    return;
  }

  try {
    await handler(req, wrapRes(res));
  } catch (err) {
    console.error("[dev:api] handler crashed:", err);
    if (!res.headersSent) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "The plant doctor hit a snag. Please try again." }));
    } else {
      res.end();
    }
  }
});

server.listen(PORT, () => {
  console.log(`[dev:api] http://localhost:${PORT}/api/diagnose  (MOCK=${MOCK})`);
  if (!process.env.PLANT_API_KEY && !MOCK) {
    console.log(
      "[dev:api] ⚠ No PLANT_API_KEY found. Add it to .env, or set MOCK_DIAGNOSIS=1 to try the mock flow."
    );
  }
});
