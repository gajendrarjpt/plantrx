import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Camera, Leaf, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Accordion from "@/components/Accordion";
import PageShell, { PageHeader, SectionTitle } from "@/components/PageShell";
import AdSlot from "@/components/AdSlot";
import { usePageMeta, SITE_URL } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/config";
import { FAQS } from "@/data/faq";
import { GUIDES, getGuide, relatedGuides } from "@/data/guides";
import { ROUTES } from "@/lib/routes";

/**
 * All public content pages live in this single module so App can lazy-load
 * them as one small chunk — the home screen stays lean.
 */

/* ============================== About ============================== */

function AboutPage({ navigate, onDiagnose }) {
  usePageMeta({
    title: "About PlantRx — AI-Assisted Plant Care",
    description:
      "PlantRx is an AI-assisted plant care companion. Learn what it does, how the AI works, and its honest limitations.",
  });
  return (
    <PageShell route={ROUTES.about} navigate={navigate} onDiagnose={onDiagnose}>
      <PageHeader
        eyebrow="About"
        title="Plant care help, when you need it"
        intro="PlantRx is a simple, free tool that looks at a photo of your plant, works out what's most likely wrong, and gives you a plain-English care plan — no account, no fuss."
      />

      <SectionTitle>What PlantRx is</SectionTitle>
      <p className="mt-3 leading-relaxed text-moss-700">
        PlantRx is an AI-assisted plant care companion. You snap or upload a photo
        of a struggling houseplant, optionally add what you've noticed, and the app
        returns a likely issue, an estimated confidence level, an explanation, and
        3–5 practical steps. It's built to be the fastest possible first answer when
        your plant looks unhappy.
      </p>

      <SectionTitle>Why it exists</SectionTitle>
      <p className="mt-3 leading-relaxed text-moss-700">
        Most plant owners have had the same moment: the leaves are turning yellow
        and there's no one to ask at 9 p.m. PlantRx exists to give a useful,
        honest starting point in seconds — not to replace experience, nurseries,
        or professional horticulturists.
      </p>

      <SectionTitle>How it works</SectionTitle>
      <p className="mt-3 leading-relaxed text-moss-700">
        Your photo and optional symptom note are compressed on your device and sent
        to the PlantRx server, which sends them to Google's Gemini vision model.
        Gemini returns a structured assessment that PlantRx validates and shows you
        as a clear care plan. PlantRx does not intentionally store your photos, and
        your diagnosis history lives only in your browser's local storage.
      </p>

      <SectionTitle>What the AI does — and what it doesn't</SectionTitle>
      <p className="mt-3 leading-relaxed text-moss-700">
        The AI looks at visible signs — leaf color, spots, curling, drooping, pests,
        soil appearance — and combines them with your note to name the most likely
        issue. It doesn't identify plant species, and it can't see conditions that
        aren't visible in the photo. Results include an estimated confidence level,
        and the app deliberately says when a photo is unclear rather than guessing.
      </p>

      <SectionTitle>Limitations</SectionTitle>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-moss-700">
        <li>Plant conditions can have multiple causes; the result is a likely assessment, not a guaranteed diagnosis.</li>
        <li>A blurry, dark, or close-up-only photo produces a lower-confidence result.</li>
        <li>PlantRx doesn't diagnose pests or diseases from lab tests, soil tests, or microscopic inspection.</li>
        <li>For persistent decline or valuable plants, a local nursery or certified professional is the right next step.</li>
      </ul>

      <SectionTitle>Privacy approach</SectionTitle>
      <p className="mt-3 leading-relaxed text-moss-700">
        No account. No tracking of your photos. PlantRx does not intentionally save
        your images; they're sent to Google Gemini for analysis. Your diagnosis
        results stay in your browser's local storage. See the{" "}
        <a href={routeHref(ROUTES.privacy)} className="font-semibold text-moss-700 underline decoration-moss-300 underline-offset-2 hover:text-moss-900">
          privacy policy
        </a>{" "}
        for details.
      </p>

      <SectionTitle>Who's behind it</SectionTitle>
      <p className="mt-3 leading-relaxed text-moss-700">
        PlantRx is an independent project built by people who love plants and wanted
        a calmer, more honest answer than a web search. We're not a nursery, and we
        don't claim professional horticultural qualifications. We aim to be a
        genuinely useful first step — and to point you to real experts when your
        plant needs them.
      </p>
    </PageShell>
  );
}

/* ============================ Plant Care ============================ */

function PlantCarePage({ navigate, onDiagnose }) {
  usePageMeta({
    title: "Plant Care Library — Houseplant Guides",
    description:
      "Practical, free guides for common houseplant problems: yellow leaves, brown tips, overwatering, light, pests, and more.",
  });
  return (
    <PageShell route={ROUTES.plantCare} navigate={navigate} onDiagnose={onDiagnose}>
      <PageHeader
        eyebrow="Plant Care"
        title="A small library of real plant help"
        intro="Short, practical guides for the most common houseplant problems. Written for real plants in real homes — no jargon."
      />

      <ul className="grid gap-4 sm:grid-cols-2">
        {GUIDES.map((guide, i) => (
          <motion.li
            key={guide.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3, ease: "easeOut" }}
          >
            <a
              href={routeHref(ROUTES.article, guide.slug)}
              className="ring-focus group flex h-full flex-col rounded-2xl border border-moss-100 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-moss-200 hover:shadow-lift"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-moss-50 group-hover:bg-moss-100">
                <Leaf className="h-5 w-5 text-moss-500" aria-hidden="true" />
              </span>
              <h2 className="mt-3 font-display text-title font-semibold text-moss-800">
                {guide.title}
              </h2>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-moss-600">{guide.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-moss-700 group-hover:gap-1.5">
                Read the guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      <div className="mt-10 rounded-2xl border border-moss-100 bg-moss-50 p-6 text-center">
        <p className="font-display text-title font-semibold text-moss-800">
          Not sure which guide fits?
        </p>
        <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-moss-600">
          Take a photo of your plant and get a likely issue plus a care plan in seconds.
        </p>
        <Button type="button" size="lg" className="mt-4 rounded-2xl" onClick={onDiagnose}>
          <Camera className="mr-2 h-5 w-5" aria-hidden="true" />
          Diagnose my plant
        </Button>
      </div>
    </PageShell>
  );
}

function PlantCareArticlePage({ slug, navigate, onDiagnose }) {
  const guide = getGuide(slug);
  usePageMeta({
    title: guide ? `${guide.title} — Plant Care Guide` : "Guide not found — PlantRx",
    description: guide ? guide.description : "This plant care guide could not be found.",
  });
  if (!guide) {
    return (
      <PageShell route={ROUTES.article} navigate={navigate} onDiagnose={onDiagnose}>
        <PageHeader eyebrow="Plant Care" title="Guide not found" intro="That guide doesn't exist (yet)." />
        <Button type="button" className="rounded-xl" onClick={() => navigate(ROUTES.plantCare)}>
          Browse all guides
        </Button>
      </PageShell>
    );
  }
  const related = relatedGuides(guide.related);
  return (
    <PageShell route={ROUTES.article} navigate={navigate} onDiagnose={onDiagnose}>
      <article className="pb-4">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-moss-500">Plant Care Guide</p>
        <h1 className="mt-2 font-display text-display text-moss-800">{guide.title}</h1>
        <p className="mt-4 text-body leading-relaxed text-moss-600">{guide.intro}</p>

        <SectionTitle>Common symptoms</SectionTitle>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-moss-700">
          {guide.symptoms.map((s) => <li key={s}>{s}</li>)}
        </ul>

        <SectionTitle>Possible causes</SectionTitle>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-moss-700">
          {guide.causes.map((c) => <li key={c}>{c}</li>)}
        </ul>

        <SectionTitle>What to check first</SectionTitle>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-moss-700">
          {guide.check.map((c) => <li key={c}>{c}</li>)}
        </ul>

        <SectionTitle>Practical steps</SectionTitle>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed text-moss-700">
          {guide.steps.map((s) => <li key={s}>{s}</li>)}
        </ol>

        <SectionTitle>Prevention</SectionTitle>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed text-moss-700">
          {guide.prevention.map((p) => <li key={p}>{p}</li>)}
        </ul>

        <SectionTitle>FAQ</SectionTitle>
        <div className="mt-3 space-y-3">
          {guide.faq.map((f) => (
            <div key={f.q} className="rounded-xl border border-moss-100 bg-white p-4">
              <p className="font-bold text-moss-800">{f.q}</p>
              <p className="mt-1 text-sm leading-relaxed text-moss-600">{f.a}</p>
            </div>
          ))}
        </div>

        {/* AdSense: only on editorial guide pages, only after substantial
            article content (symptoms → causes → checks → steps → prevention
            → FAQ). Never on product/utility screens. */}
        <AdSlot placement="editorial-guide" />

        {related.length > 0 && (
          <>
            <SectionTitle>Related guides</SectionTitle>
            <ul className="mt-3 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <a
                    href={routeHref(ROUTES.article, r.slug)}
                    className="ring-focus inline-flex items-center gap-1.5 rounded-lg font-semibold text-moss-700 underline decoration-moss-300 underline-offset-2 hover:text-moss-900"
                  >
                    <BookOpen className="h-4 w-4 text-moss-500" aria-hidden="true" />
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-10 rounded-2xl border border-moss-100 bg-moss-50 p-6 text-center">
          <p className="font-display text-title font-semibold text-moss-800">Still unsure about your plant?</p>
          <p className="mx-auto mt-1.5 max-w-md text-sm leading-relaxed text-moss-600">
            Get a likely issue and a care plan from a photo in seconds.
          </p>
          <Button type="button" size="lg" className="mt-4 rounded-2xl" onClick={onDiagnose}>
            <Camera className="mr-2 h-5 w-5" aria-hidden="true" />
            Diagnose my plant
          </Button>
        </div>
      </article>
    </PageShell>
  );
}

/* ============================== FAQ ============================== */

function FaqPage({ navigate, onDiagnose }) {
  usePageMeta({
    title: "FAQ — PlantRx",
    description: "Answers to common questions about PlantRx: photo privacy, accuracy, accounts, and how the AI works.",
  });
  return (
    <PageShell route={ROUTES.faq} navigate={navigate} onDiagnose={onDiagnose}>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered honestly"
        intro="Straight answers about how PlantRx works, what it stores, and what it can't do."
      />
      <Accordion items={FAQS} />
      <p className="mt-8 text-sm leading-relaxed text-moss-600">
        Still have a question?{" "}
        <a href={routeHref(ROUTES.contact)} className="font-semibold text-moss-700 underline decoration-moss-300 underline-offset-2 hover:text-moss-900">
          Get in touch
        </a>
        .
      </p>
    </PageShell>
  );
}

/* ============================= Privacy ============================= */

function PrivacyPage({ navigate, onDiagnose }) {
  usePageMeta({
    title: "Privacy Policy — PlantRx",
    description: "How PlantRx handles your data: no account, photos sent for diagnosis and not stored, local history, and ads.",
  });
  return (
    <PageShell route={ROUTES.privacy} navigate={navigate} onDiagnose={onDiagnose}>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy policy"
        intro="Last updated: August 2026. This policy describes, in plain language, what PlantRx does with your information. We'd rather be clear than clever."
      />
      <Prose>
        <p>
          <strong>No account required.</strong> PlantRx has no sign-up, no login, and
          no profile. We don't know who you are.
        </p>
        <p>
          <strong>Your plant photos.</strong> When you use the Diagnose feature, your
          photo is sent from your device to the PlantRx server and then to Google
          Gemini for analysis. PlantRx does not intentionally store your photos —
          there is no database of images. The optional symptom note you type is sent
          with the request so the analysis can use it.
        </p>
        <p>
          <strong>Local history.</strong> Your diagnosis results (the issue,
          confidence, explanation, and care steps — not the image) are kept in your
          browser's local storage so the app can show your recent diagnoses. This
          data stays on your device and is never uploaded. Clearing your browser
          data removes it.
        </p>
        <p>
          <strong>Third-party services.</strong> Google Gemini processes the photo and
          note as part of the diagnosis. The app also loads the Fraunces display font
          from Google Fonts. If advertising is enabled, Google AdSense may set
          cookies and process usage data on the Plant Care editorial guide pages
          where ads appear; we keep ads clearly marked and below the article content
          — never on diagnosis screens.
        </p>
        <p>
          <strong>Advertising.</strong> PlantRx may show a clearly labelled ad slot
          on its Plant Care editorial guide pages, placed below the article content.
          Product screens — diagnosis results, photo capture, home, and similar —
          are kept ad-free. We don't use pop-ups, autoplay video, or full-screen
          ads. Ad networks may use cookies to show relevant ads; you can control
          this through your browser or Google's ad settings.
        </p>
        <p>
          <strong>Contact & data deletion.</strong> Since PlantRx doesn't store your
          photos or account data, there's nothing for you to delete server-side —
          clearing your browser's local storage removes your on-device history. For
          any privacy question, contact us at {CONTACT_EMAIL}.
        </p>
        <p>
          <strong>Changes.</strong> If this policy changes, we'll update it on this
          page with a new date.
        </p>
      </Prose>
    </PageShell>
  );
}

/* ============================== Terms ============================== */

function TermsPage({ navigate, onDiagnose }) {
  usePageMeta({
    title: "Terms of Service — PlantRx",
    description: "The terms of using PlantRx, an AI-assisted educational plant care tool.",
  });
  return (
    <PageShell route={ROUTES.terms} navigate={navigate} onDiagnose={onDiagnose}>
      <PageHeader
        eyebrow="Terms"
        title="Terms of service"
        intro="Last updated: August 2026. These terms are written to be readable, not to hide anything. This is not legal advice."
      />
      <Prose>
        <p>
          <strong>Service description.</strong> PlantRx is an AI-assisted educational
          tool that analyses photos of houseplants and returns a likely issue and
          suggested care steps. It is free to use and does not require an account.
        </p>
        <p>
          <strong>AI-generated information.</strong> Results are generated by an AI
          model and may be incomplete or incorrect. They are provided for
          informational purposes only and are not a professional diagnosis.
        </p>
        <p>
          <strong>No guarantee of diagnosis.</strong> PlantRx does not guarantee that
          any assessment is accurate, complete, or suitable for your plant. You use
          the service at your own discretion.
        </p>
        <p>
          <strong>Your responsibility.</strong> You are responsible for the photos
          you submit — don't photograph personal or sensitive information — and for
          how you apply the care steps. When in doubt, consult a local nursery or
          qualified professional.
        </p>
        <p>
          <strong>Acceptable use.</strong> Don't abuse the service: no automated
          scraping, no attempts to interfere with the app or its API, and no unlawful
          or harmful use.
        </p>
        <p>
          <strong>Intellectual property.</strong> PlantRx and its content belong to
          its creators. The app's design, text, and code are protected by applicable
          copyright law.
        </p>
        <p>
          <strong>Service availability.</strong> PlantRx is provided "as is" and may
          be unavailable from time to time for maintenance or capacity reasons. We
          don't guarantee uninterrupted service.
        </p>
        <p>
          <strong>Limitation of liability.</strong> To the fullest extent permitted
          by law, PlantRx is not liable for damages arising from use of the service,
          including reliance on AI-generated results. If you're not comfortable with
          this, please don't use the app.
        </p>
        <p>
          <strong>Changes.</strong> We may update these terms; the latest version
          will always be on this page. Continuing to use PlantRx after changes means
          you accept them.
        </p>
      </Prose>
    </PageShell>
  );
}

/* ============================ Disclaimer ============================ */

function DisclaimerPage({ navigate, onDiagnose }) {
  usePageMeta({
    title: "Disclaimer — PlantRx",
    description: "PlantRx is an AI-assisted educational tool and does not guarantee plant disease identification.",
  });
  return (
    <PageShell route={ROUTES.disclaimer} navigate={navigate} onDiagnose={onDiagnose}>
      <PageHeader
        eyebrow="Disclaimer"
        title="Please read this"
        intro="The short version: we're helpful, not infallible."
      />
      <Prose>
        <p>
          PlantRx is an <strong>AI-assisted educational plant care tool</strong>. It
          looks at a photo and returns a likely issue with an estimated confidence
          level — it does <strong>not</strong> guarantee plant disease identification.
        </p>
        <p>
          Plant conditions can have multiple causes, and a photo can only ever show
          so much. Always treat the result as a <strong>starting point</strong>,
          check the plant in person, and apply care steps gently.
        </p>
        <p>
          For serious or persistent problems — especially with large, valuable, or
          legally protected plants — consult a qualified professional: a local
          nursery, a certified arborist, or an agricultural extension service.
        </p>
        <p>
          PlantRx does not provide medical, veterinary, or legal advice, and it makes
          no claim of professional certification.
        </p>
      </Prose>
    </PageShell>
  );
}

/* ============================= Contact ============================= */

function ContactPage({ navigate, onDiagnose }) {
  usePageMeta({
    title: "Contact — PlantRx",
    description: "Get in touch with the PlantRx team.",
  });
  return (
    <PageShell route={ROUTES.contact} navigate={navigate} onDiagnose={onDiagnose}>
      <PageHeader
        eyebrow="Contact"
        title="Say hello"
        intro="Questions, feedback, or a plant emergency? We'd love to hear from you — though for urgent plant care, a local nursery is fastest."
      />
      <div className="rounded-2xl border border-moss-100 bg-white p-6 shadow-card">
        <p className="flex items-center gap-2 font-display text-title font-semibold text-moss-800">
          <Mail className="h-5 w-5 text-moss-500" aria-hidden="true" />
          Email us
        </p>
        <p className="mt-2 text-sm leading-relaxed text-moss-600">
          We read every message and reply within a few days.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="ring-focus mt-3 inline-flex items-center gap-1.5 rounded-lg font-bold text-moss-700 underline decoration-moss-300 underline-offset-2 hover:text-moss-900"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
      <p className="mt-6 text-sm leading-relaxed text-moss-600">
        Prefer helping yourself? Browse the{" "}
        <a href={routeHref(ROUTES.plantCare)} className="font-semibold text-moss-700 underline decoration-moss-300 underline-offset-2 hover:text-moss-900">
          plant care library
        </a>{" "}
        or diagnose a plant directly.
      </p>
    </PageShell>
  );
}

/* ============================ Shared bits ============================ */

function Prose({ children }) {
  return <div className="space-y-4 leading-relaxed text-moss-700">{children}</div>;
}

function routeHref(route, slug) {
  return slug ? `/plant-care/${slug}` : route === ROUTES.plantCare ? "/plant-care" : `/${route}`;
}

/**
 * Entry component used by App. `props`: { route, slug, navigate, onDiagnose }.
 * Sets the shell props once per render so every page can reach navigation.
 */
export default function ContentRoutes({ route, slug, navigate, onDiagnose }) {
  switch (route) {
    case ROUTES.about:
      return <AboutPage navigate={navigate} onDiagnose={onDiagnose} />;
    case ROUTES.plantCare:
      return <PlantCarePage navigate={navigate} onDiagnose={onDiagnose} />;
    case ROUTES.article:
      return <PlantCareArticlePage slug={slug} navigate={navigate} onDiagnose={onDiagnose} />;
    case ROUTES.faq:
      return <FaqPage navigate={navigate} onDiagnose={onDiagnose} />;
    case ROUTES.privacy:
      return <PrivacyPage navigate={navigate} onDiagnose={onDiagnose} />;
    case ROUTES.terms:
      return <TermsPage navigate={navigate} onDiagnose={onDiagnose} />;
    case ROUTES.disclaimer:
      return <DisclaimerPage navigate={navigate} onDiagnose={onDiagnose} />;
    case ROUTES.contact:
      return <ContactPage navigate={navigate} onDiagnose={onDiagnose} />;
    default:
      return <AboutPage navigate={navigate} onDiagnose={onDiagnose} />;
  }
}
