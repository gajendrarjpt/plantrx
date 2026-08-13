/**
 * FAQ content — shared between the home-page FAQ preview and the full /faq
 * page. Every answer is honest and matches how the app actually works.
 */

export const FAQS = [
  {
    q: "Does PlantRx store my photos?",
    a: "No. When you tap Diagnose, your photo is sent to the PlantRx server and then to Google Gemini for analysis. PlantRx does not intentionally save your photo anywhere.",
  },
  {
    q: "Is PlantRx always accurate?",
    a: "No — and we don't claim it is. PlantRx gives an AI-assisted, likely assessment with an estimated confidence level. Plant conditions can have multiple causes, so treat the result as a starting point, not a guaranteed diagnosis.",
  },
  {
    q: "Does PlantRx require an account?",
    a: "No. There's no sign-up, no login, and no profile. You can diagnose a plant the moment you open the app.",
  },
  {
    q: "How does the AI analyze a photo?",
    a: "Your photo (and optional symptom note) goes from your device to the PlantRx server, which sends it to Google's Gemini vision model. Gemini returns a structured assessment — likely issue, estimated confidence, explanation, and 3–5 care steps — which PlantRx shows you.",
  },
  {
    q: "What plants can PlantRx analyze?",
    a: "PlantRx works best on common houseplants and their visible problems — leaf color, spots, drooping, pests, and similar. It doesn't identify plant species, and a blurry or dark photo will produce a lower-confidence result.",
  },
  {
    q: "What happens to the photos I upload?",
    a: "The photo is transmitted only for the diagnosis and is not intentionally stored by PlantRx. Google Gemini processes it as part of the request. Avoid photographing personal or sensitive information — stick to the plant.",
  },
  {
    q: "When should I contact a plant professional?",
    a: "If a plant keeps declining despite following the care steps, shows sudden widespread damage, or is a large or valuable plant, a local nursery or certified arborist can look at it in person. PlantRx is a helpful starting point, not a substitute for hands-on expertise.",
  },
];
