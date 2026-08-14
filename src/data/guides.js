/**
 * Plant Care library — original, practical houseplant guides.
 * Written as a genuine resource: each guide covers symptoms, causes,
 * what to check, steps, prevention, an FAQ, and related guides.
 */

export const GUIDES = [
  {
    slug: "yellow-leaves",
    title: "Why Plant Leaves Turn Yellow",
    description:
      "Yellowing leaves are the most common houseplant complaint. Here's how to read what your plant is telling you.",
    intro:
      "When a leaf turns yellow, the plant is usually reallocating energy — either watering things out, feeding a new leaf, or reacting to stress. The pattern of the yellowing (whole leaf vs. tips, old leaves vs. new growth) is the biggest clue to the cause.",
    symptoms: [
      "Older, lower leaves turning yellow first",
      "New growth yellowing while old leaves stay green",
      "Yellowing with soft, mushy stems",
      "Yellowing with dry, crispy edges",
    ],
    causes: [
      "Overwatering is the most common cause — roots sit in wet soil and stop taking up nutrients",
      "Underwatering leaves foliage dehydrated and pale",
      "Lack of light slows photosynthesis and drains leaf color",
      "Nutrient shortage (usually nitrogen) shows first in older leaves",
      "Sudden temperature or location changes",
    ],
    check: [
      "Feel the soil 2–3 cm down — is it soggy or bone dry?",
      "Are the yellow leaves old or new?",
      "Look at the pot: does it have drainage holes?",
      "Check light: is the spot bright, medium, or low?",
    ],
    steps: [
      "If the soil is soggy, hold off watering until the top few centimetres dry out",
      "If the soil is bone dry, water slowly and thoroughly until it runs out the bottom",
      "Move the plant to brighter indirect light for a few weeks",
      "Snip off fully yellow leaves at the base — the plant has already drained them",
      "Only consider fertilizer if the soil is healthy and the plant is actively growing",
    ],
    prevention: [
      "Water on a schedule you check by feel, not by the calendar",
      "Use a pot with drainage and a well-draining mix",
      "Keep light conditions consistent once the plant is happy",
    ],
    faq: [
      {
        q: "Should I remove yellow leaves?",
        a: "Once a leaf is fully yellow it won't recover. Removing it keeps the plant tidy and lets it focus on healthy growth.",
      },
      {
        q: "Is one yellow leaf a problem?",
        a: "A single old leaf yellowing now and then is normal aging. Widespread or rapid yellowing is a sign to check watering and light.",
      },
    ],
    related: ["overwatering-vs-underwatering", "light-needs", "soil-improvement"],
  },
  {
    slug: "brown-tips",
    title: "Brown Leaf Tips",
    description:
      "Crispy brown tips are usually a water or humidity problem — here's how to tell which one, and how to fix it.",
    intro:
      "Brown tips are the plant world's version of chapped lips: the leaf edges are the last place moisture reaches, so they dry out first when conditions are off. The fix depends on whether the cause is underwatering, low humidity, or salt build-up.",
    symptoms: [
      "Crispy brown edges on multiple leaves",
      "Brown tips with otherwise green, healthy leaves",
      "Brown tips that spread inward over time",
      "White crust on the soil or pot rim (salt build-up)",
    ],
    causes: [
      "Underwatering or letting soil dry out completely and often",
      "Low humidity, especially near heaters or air conditioning",
      "Fluoride or chlorine in tap water (sensitive plants)",
      "Fertilizer salt build-up in the soil",
      "Consistent overwatering that damages root tips",
    ],
    check: [
      "Is the soil dry more often than moist?",
      "Is the plant near a vent, radiator, or drafty window?",
      "Does the pot rim or soil show a white salty crust?",
      "How long has it been since the plant was last fertilized?",
    ],
    steps: [
      "Water thoroughly when the top few centimetres are dry — don't let the pot sit dry for days",
      "Group plants together or set the pot on a pebble tray with water to raise humidity",
      "If using tap water, let it sit out overnight, or switch to filtered water",
      "Flush the soil: water heavily so it runs out the bottom, then repeat a few times",
      "Trim only the brown part of the tip — leave a thin margin of brown so the cut doesn't keep dying back",
    ],
    prevention: [
      "Keep a steady watering rhythm — avoid extremes of soggy and bone dry",
      "Mist occasionally or use a humidity tray in dry months",
      "Fertilize sparingly and never on dry soil",
    ],
    faq: [
      {
        q: "Will brown tips turn green again?",
        a: "No — damaged tips won't recover, but trimming them keeps the plant looking clean and the new growth will come in healthy.",
      },
      {
        q: "Does misting help brown tips?",
        a: "A little, in dry rooms. A pebble tray or humidifier raises humidity more effectively than misting.",
      },
    ],
    related: ["overwatering-vs-underwatering", "soil-improvement"],
  },
  {
    slug: "overwatering-vs-underwatering",
    title: "Overwatering vs Underwatering",
    description:
      "Soggy soil and bone-dry soil cause surprisingly similar symptoms. Learn to tell them apart before you water again.",
    intro:
      "The two most common plant mistakes look alike from the leaf alone, which is why so many plants get watered in exactly the wrong direction. The soil and the stem tell the real story — check those first, then decide.",
    symptoms: [
      "Overwatering: yellow, soft, drooping leaves and soggy soil",
      "Underwatering: dry, crispy, curled leaves and soil that pulls away from the pot edge",
      "Both can cause leaf drop",
      "Overwatered stems feel mushy; underwatered stems feel brittle",
    ],
    causes: [
      "Overwatering: watering on a fixed schedule regardless of soil, no drainage holes, heavy potting mix",
      "Underwatering: watering too little at a time, letting soil dry for days, small pots in dry rooms",
    ],
    check: [
      "Stick a finger 2–3 cm into the soil — wet or dry?",
      "Lift the pot — is it heavy (wet) or light (dry)?",
      "Smell the soil — a musty smell means stagnant water",
      "Inspect the stem near the soil — mushy or firm?",
    ],
    steps: [
      "If overwatered: stop watering, let the soil dry, and improve drainage (holes, lighter mix)",
      "If overwatered with mushy stems: remove the plant, trim soft roots, repot in fresh dry mix",
      "If underwatered: soak the pot in a basin of water for 15–30 minutes until the soil is moist through",
      "Then let it drain fully before returning it to its saucer",
      "Water only when the top few centimetres of soil feel dry",
    ],
    prevention: [
      "Check soil moisture before every watering",
      "Use pots with drainage holes and a light, airy mix",
      "Match watering to the season — plants drink less in winter",
    ],
    faq: [
      {
        q: "How often should I water my plant?",
        a: "There's no universal schedule. Test the soil with your finger and water only when the top few centimetres are dry.",
      },
      {
        q: "Can a plant recover from overwatering?",
        a: "Often yes, if roots aren't fully rotted. Let the soil dry, improve drainage, and trim mushy stems or roots.",
      },
    ],
    related: ["yellow-leaves", "dropping-leaves", "soil-improvement"],
  },
  {
    slug: "light-needs",
    title: "How Much Light Does a Houseplant Need?",
    description:
      "Low light, bright indirect light, direct sun — what the labels actually mean, and how to find the right spot.",
    intro:
      "Most houseplant problems trace back to light. Plants grow toward their light sweet spot: too little and growth slows and leaves fade; too much and leaves scorch. Understanding the three common light levels is enough to place almost any houseplant well.",
    symptoms: [
      "Too little light: slow growth, leggy stems, small pale leaves, colors fading",
      "Too much light: scorched patches, crispy edges, washed-out leaves",
      "Leaves leaning dramatically toward the window",
      "Variegation turning solid green (a low-light response)",
    ],
    causes: [
      "Putting a bright-light plant in a dim corner",
      "Putting a shade-loving plant in direct afternoon sun",
      "Light being blocked by curtains, shelves, or a dirty window",
      "Daylight hours shrinking in winter without adjustment",
    ],
    check: [
      "Read your plant's light tag: low, medium, or bright",
      "Test with your hand: if it casts a sharp shadow, that's bright; a soft shadow, medium; no shadow, low",
      "Note how far the plant is from the nearest window",
      "Watch which direction the leaves lean",
    ],
    steps: [
      "Match the plant to the spot: low-light plants a few metres from a window; bright-light plants right at a window",
      "Turn the pot a quarter turn each week for even growth",
      "Wipe dusty leaves occasionally — dust blocks light",
      "Move plants closer to windows in winter when days shorten",
      "Introduce brighter spots gradually over a week to avoid scorch",
    ],
    prevention: [
      "Check the light in each room before you buy a plant",
      "Choose plants suited to your actual light, not the ones you wish you had",
      "Rotate pots regularly to keep growth balanced",
    ],
    faq: [
      {
        q: "Can a plant survive in a windowless room?",
        a: "Most houseplants need some natural light. Only a few tolerate very low light, and even they prefer a window. A grow light is the reliable option for dark rooms.",
      },
      {
        q: "What does 'bright indirect light' mean?",
        a: "Bright light that doesn't hit the leaves directly — e.g., near an east or north window, or filtered by a sheer curtain.",
      },
    ],
    related: ["yellow-leaves", "curling-leaves"],
  },
  {
    slug: "curling-leaves",
    title: "Curling Leaves",
    description:
      "Leaves that curl inward are usually conserving water or reacting to heat. Here's what to check first.",
    intro:
      "Curling leaves are a stress response — the plant is reducing its leaf surface to hold onto moisture or shield itself. It's often the plant's earliest signal, before yellowing or browning appears.",
    symptoms: [
      "Leaf edges curling inward (taco shape)",
      "Curling combined with crisp, dry texture",
      "New leaves coming out curled or crinkled",
      "Curling with wilting stems",
    ],
    causes: [
      "Underwatering — leaves curl to retain moisture",
      "Heat stress — too much direct sun or a hot window",
      "Low humidity in dry, heated rooms",
      "Root damage from overwatering that limits water uptake",
      "Occasionally, pests like aphids feeding on new growth",
    ],
    check: [
      "Feel the soil — dry, wet, or something in between?",
      "Is the plant near a heat source or in direct afternoon sun?",
      "Check the undersides of leaves for tiny insects",
      "Are the curled leaves old or newly forming?",
    ],
    steps: [
      "If soil is dry: water thoroughly and let it drain",
      "If in hot sun: move to bright indirect light",
      "Raise humidity with a pebble tray or by grouping plants",
      "If pests are present, wipe leaves and treat with insecticidal soap",
      "Monitor for a week — curling should ease as conditions improve",
    ],
    prevention: [
      "Water before the soil fully dries out",
      "Avoid placing plants in hot, sun-blasted windows",
      "Keep humidity steady in dry seasons",
    ],
    faq: [
      {
        q: "Do curled leaves uncurl again?",
        a: "Mildly curled leaves often relax within a day or two of better watering and conditions. Severely crispy ones won't recover, but new growth will be normal.",
      },
    ],
    related: ["brown-tips", "common-pests"],
  },
  {
    slug: "dropping-leaves",
    title: "Dropping Leaves",
    description:
      "When a plant sheds leaves suddenly, it's usually reacting to change. Find the trigger and the plant usually stabilizes.",
    intro:
      "Sudden leaf drop is rarely a disease — it's a plant reacting to a change in its environment. The most common triggers are watering swings, temperature drafts, and relocation. The good news: once you remove the trigger, most plants settle down.",
    symptoms: [
      "Leaves fall when touched or on their own",
      "Lower leaves drop while the top stays healthy",
      "All-over leaf drop after a move or season change",
      "Leaf drop with soggy or bone-dry soil",
    ],
    causes: [
      "Change of location (light, temperature, or both)",
      "Drafts — cold window drafts or hot air vents",
      "Overwatering or underwatering stress",
      "Sudden temperature swings, especially in winter",
      "Repotting shock",
    ],
    check: [
      "When did the dropping start — after a move, repot, or weather change?",
      "Feel the soil: wet, dry, or balanced?",
      "Is the plant near a draft or vent?",
      "Are the dropped leaves old or new?",
    ],
    steps: [
      "Stop changing things — give the plant a stable spot and wait",
      "Correct the soil moisture: dry out if soggy, water if parched",
      "Move it away from drafts and heat sources",
      "Keep light consistent with what it had before",
      "Don't repot or fertilize while the plant is stressed",
    ],
    prevention: [
      "Move plants gradually when changing rooms",
      "Keep plants away from vents, radiators, and drafty windows",
      "Keep a steady watering rhythm through the year",
    ],
    faq: [
      {
        q: "Will all the leaves fall off?",
        a: "Usually not. Plants shed the stressed leaves and hold onto healthy growth. Patience and stable conditions are the fix.",
      },
      {
        q: "Is leaf drop normal in winter?",
        a: "Some seasonal shedding is normal as light drops and growth slows. Widespread dropping is a stress signal worth investigating.",
      },
    ],
    related: ["overwatering-vs-underwatering", "light-needs"],
  },
  {
    slug: "common-pests",
    title: "Common Houseplant Pests",
    description:
      "Spider mites, aphids, mealybugs, fungus gnats — how to spot the usual suspects and treat them safely indoors.",
    intro:
      "Most houseplant pests are tiny, reproduce fast, and arrive on new plants or open windows. Catching them early matters more than the exact species, because the treatment for most indoor pests is similar: isolate, remove, and treat repeatedly.",
    symptoms: [
      "Fine webbing between stems and leaves (spider mites)",
      "Tiny white cottony clumps in leaf joints (mealybugs)",
      "Clusters of small green or black insects on new growth (aphids)",
      "Small flies hovering around the soil (fungus gnats)",
      "Sticky residue or sooty spots on leaves",
    ],
    causes: [
      "New plants brought in without a quarantine period",
      "Overwatered soil that breeds fungus gnats",
      "Dry, dusty air that favors spider mites",
      "Leaves left dusty and unexamined",
    ],
    check: [
      "Look under leaves and in leaf joints — pests hide there",
      "Wipe a leaf with a white tissue to spot mites",
      "Check the soil surface for tiny flies",
      "Inspect new plants for two weeks before putting them with others",
    ],
    steps: [
      "Isolate the affected plant away from your others",
      "Wipe or rinse pests off with a damp cloth or gentle shower",
      "Treat with insecticidal soap or neem oil, covering leaf undersides",
      "Repeat the treatment weekly for 3–4 weeks — eggs hatch in cycles",
      "For fungus gnats: let the soil dry between waterings and use yellow sticky traps",
      "Toss heavily infested plants rather than spreading pests to the collection",
    ],
    prevention: [
      "Quarantine new plants for two weeks",
      "Keep leaves clean and inspect regularly",
      "Avoid chronically wet soil",
    ],
    faq: [
      {
        q: "Are houseplant pests harmful to people?",
        a: "The common houseplant pests don't bite or harm people — they're a plant problem, not a health one. Fungus gnats are a nuisance that clears up when the soil dries.",
      },
      {
        q: "Can I use any insecticide indoors?",
        a: "Use products labelled for indoor houseplants and follow the label. Insecticidal soap and neem oil are the gentlest options for most pests.",
      },
    ],
    related: ["curling-leaves", "soil-improvement"],
  },
  {
    slug: "soil-improvement",
    title: "How to Improve Houseplant Soil",
    description:
      "Most potting mixes get dense and tired over time. Here's how to refresh soil, improve drainage, and repot without stressing your plant.",
    intro:
      "Good soil is the foundation of plant health — it holds moisture, lets roots breathe, and supplies nutrients. Over time, potting mix breaks down into dense, waterlogged material that chokes roots. Refreshing the soil is one of the highest-value things you can do for a struggling plant.",
    symptoms: [
      "Water pools on the surface instead of soaking in",
      "Soil stays soggy for days after watering",
      "Compacted, hard soil that pulls away from the pot",
      "Slowed growth despite adequate light and water",
    ],
    causes: [
      "Old potting mix that has broken down and compacted",
      "Heavy garden soil used instead of potting mix",
      "No drainage layer or blocked drainage holes",
      "Salt and mineral build-up from fertilizer and tap water",
    ],
    check: [
      "How long does water take to soak in?",
      "Does the pot have clear drainage holes?",
      "Is the plant root-bound — roots circling the pot bottom?",
      "When was the last repot or soil refresh?",
    ],
    steps: [
      "Choose a quality indoor potting mix; add perlite or coarse sand for drainage",
      "Repot in spring or early summer when the plant is actively growing",
      "Gently loosen the root ball and trim any dark, mushy roots",
      "Pot at the same depth as before — burying the stem invites rot",
      "Water well after repotting, then return to your normal routine",
      "Top-dress yearly: gently replace the top few centimetres of soil without a full repot",
    ],
    prevention: [
      "Refresh or repot every 1–2 years",
      "Use pots only slightly larger than the root ball",
      "Flush the soil a few times a year to wash out salts",
    ],
    faq: [
      {
        q: "Do I need to repot every year?",
        a: "No — most houseplants are happy every 1–2 years, or when they become root-bound. Top-dressing the soil in between keeps things fresh without the stress of repotting.",
      },
      {
        q: "Can I use garden soil indoors?",
        a: "Avoid it — garden soil compacts in pots and can carry pests. Use a bagged indoor potting mix instead.",
      },
    ],
    related: ["overwatering-vs-underwatering", "brown-tips"],
  },
];

/** Index of guides by slug — the article route looks guides up here. */
export function getGuide(slug) {
  return GUIDES.find((g) => g.slug === slug) || null;
}

export function relatedGuides(slugs) {
  return slugs
    .map((slug) => getGuide(slug))
    .filter(Boolean)
    .map(({ slug, title }) => ({ slug, title }));
}
