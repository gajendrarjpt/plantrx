# 🌿 PlantRx

Snap a photo of a struggling houseplant and get an instant AI diagnosis —
likely issue, confidence level, and 3–5 concrete fix steps. A single-purpose
"photo in → AI answer out" utility. No accounts, no database, no tracking.

## Tech stack

- **Frontend:** React + Vite, styled with Tailwind CSS
- **UI kit:** shadcn/ui (Buttons, Cards, Dialogs) + lucide-react icons
- **Motion:** framer-motion screen transitions, lottie-react loading animation
- **Camera & images:** react-webcam, react-dropzone, browser-image-compression
  (photos are compressed to < 300 KB before upload)
- **Feedback:** sonner toasts for errors, rate limits, and offline states
- **Backend:** one Vercel serverless function at `api/diagnose.js` that calls
  **Google Gemini** (`gemini-flash-latest` — the current flash-tier model,
  generous free tier) with a vision prompt and strict JSON structured output
- **Storage:** none — except the last 3 diagnoses kept on-device in `localStorage`
- **Ads:** a clearly-labeled, non-blocking AdSense banner slot below the result

```
photo in → /api/diagnose → Gemini → { issue, confidence, explanation, fixes } → you
```

Heavy screens (Capture, Loading) are code-split with `React.lazy`, so the home
screen loads a lean bundle (~130 KB gzip) even on slow mobile connections.

## Local development

```bash
npm install

# Terminal 1 — the API (uses .env for PLANT_API_KEY)
npm run dev:api

# Terminal 2 — the frontend (Vite, proxies /api to the API server)
npm run dev
```

Open http://localhost:5173.

**No API key yet?** Run the API in mock mode to try the whole flow for free:

```bash
MOCK_DIAGNOSIS=1 npm run dev:api
```

## Add your real API key (free)

1. Go to https://aistudio.google.com/apikey and create a key (no payment card needed).
2. Copy `.env.example` to `.env` and paste your key:
   ```bash
   cp .env.example .env   # then edit .env
   ```
3. Restart `npm run dev:api`.

The key is read from `process.env.PLANT_API_KEY` and **only** on the server —
it is never shipped to, or called from, the browser.

## Deploy to Vercel (free)

1. Push this repo to GitHub/GitLab.
2. In Vercel, **Add New → Project** and import it. Vercel auto-detects Vite,
   builds with `npm run build`, serves the frontend, and picks up the `api/`
   folder as serverless functions.
3. In **Settings → Environment Variables**, add:
   - `PLANT_API_KEY` → your real key
4. Deploy. That's it — `/api/diagnose` works on the same origin as the app.

Prefer the CLI?

```bash
npm i -g vercel
vercel login
vercel          # preview deploy
vercel --prod   # production
```

### Notes on the function

- **Rate limiting:** a simple in-memory limiter allows ~5 requests/minute per
  IP, so one user can't burn through the free quota alone. It resets when the
  function cold-starts (normal for serverless).
- **Payload:** the frontend compresses photos to a JPEG under 300 KB (max
  1280px) before sending — the original is never uploaded. The function
  rejects oversized bodies and malformed JSON with friendly errors.
- **Structured output:** Gemini is asked for strict JSON via
  `responseMimeType: "application/json"` **and** a `responseSchema`
  (`issue`, `confidence` low/medium/high, `explanation`, `fixes` 3–5). The
  server still validates and normalizes the answer before it reaches the UI —
  malformed responses become a safe 502 rather than broken data.
- **Model note:** `gemini-2.5-flash` is deprecated for new API keys, so
  `api/diagnose.js` uses the `gemini-flash-latest` alias, which always points
  at Google's current flash model (no maintenance needed when models change).

## Enable AdSense ads

The app is fully usable with no ads; the slot renders a placeholder box.

1. Get your site approved in [Google AdSense](https://adsense.google.com/).
2. Put your real publisher ID (`ca-pub-…`) in **two places**:
   - `index.html` — uncomment the script tag and replace the placeholder ID.
   - `src/components/AdSlot.jsx` — `data-ad-client`.
3. Replace the placeholder `data-ad-slot` in `AdSlot.jsx` with a real slot ID.
4. Redeploy.

The slot is a standard responsive banner (`data-ad-format="auto"`) placed
directly below the result card. No popups, no autoplay video, nothing that
blocks or covers the diagnosis.

## How the flow works

1. **Home** — pitch + big "Diagnose my plant" button + how-it-works strip.
2. **Capture** — live camera on phones, gallery upload on desktop, optional
   symptoms note.
3. **Loading** — friendly animated state while the API call runs (2–8 s).
4. **Result** — issue, confidence meter, plain-English explanation, numbered
   fix steps, ad slot below, "Diagnose another plant".
5. **Error** — friendly retry screen (handles offline, rate limits, big photos).

Diagnoses are kept on-device only: the last 3 show on the Home screen as
"Recent diagnoses" (text metadata — no image data is stored). Clear your
browser data to remove them.

## Project structure

```
api/diagnose.js          Vercel serverless function (Gemini call + rate limit)
scripts/dev-api.mjs      Local API server for development (mock mode included)
src/
  App.jsx                Screen state machine + framer-motion transitions + toasts
  components/            Home, Capture, Loading, Result, Error, AdSlot
  components/ui/         shadcn/ui components (button, card, dialog)
  lib/                   api.js, image.js (compression), errors.js, history.js
  assets/                loading-plant.json (local Lottie animation)
  index.css              Tailwind v4 theme + moss palette
```

## Privacy (summary)

A plain-English summary is built into the app (Home → Privacy). The short
version:

- No account required.
- Your photo is sent to the PlantRx server and then to Google Gemini for
  analysis. PlantRx does not intentionally save your photo.
- Optional symptom notes are sent with the request.
- Diagnosis results are stored only in your browser's local storage.
- Avoid photographing personal or sensitive information.

## Disclaimer

PlantRx gives friendly AI-powered suggestions, not a professional diagnosis.
If a plant keeps struggling, a local nursery is the best next step. 🌱
