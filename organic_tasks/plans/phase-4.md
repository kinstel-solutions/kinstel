# Phase 4 — Repositioning Copy (home + site voice)

**Branch:** `staging` (builds on `8123580`). Local commits only; do NOT push.
**Tone:** Honest + confident (owner's choice). Keep bold/premium language; broaden the *narrative* from "web design agency" → a studio that **designs, builds (incl. custom platforms/SaaS), and markets**. **Keyword-safe** — keep "web design", add "development"; don't strip SEO terms.
**Scope:** COPY ONLY. No layout/structure/component changes. These are exact string swaps.
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8.

## Exact string replacements

### `src/lib/site-config.ts`
- `title`: `'Kinstel | Premier Web Design & Digital Marketing Agency'`
  → `'Kinstel | Premium Web Design, Development & Digital Marketing'`
- `description`: `'Kinstel is a leading web design and digital marketing agency that helps businesses grow with professional websites, SEO, and targeted marketing strategies.'`
  → `'Kinstel is a web studio that designs and builds high-performing websites and custom platforms, and runs the SEO & Google Ads that grow them — for businesses in Lucknow and worldwide.'`
- In `keywords`, add these entries if not present: `'web development'`, `'custom web platforms'`, `'google ads management'`. Keep existing ones.

### `src/app/page.tsx` (home)
- metadata `title`: `"Kinstel | Web Design & Digital Marketing Agency"`
  → `"Web Design, Development & Digital Marketing"`  *(fixes a double-brand: this string title still gets `| Kinstel Solutions` appended by the template)*
- metadata `description`: `"Kinstel is a leading web design and digital marketing agency. We help businesses grow online with custom websites, SEO, and marketing strategies."`
  → `"Kinstel is a web studio that designs and builds high-performing websites and custom platforms — then runs the SEO and Google Ads that grow them. Conversion-focused work, delivered fast."`
- **Hero subhead** (currently): `We are a web design agency that helps businesses grow online. We build beautiful, high-performing websites that are designed to convert.`
  → `We design and build high-performing websites and custom platforms — then run the marketing that fills them with customers. Design, development, and growth, under one roof.`
- **Services intro paragraph** (currently): `We build beautiful, high-performing websites that are designed to convert visitors into customers. Every project is built around speed, simplicity, and strategic design.`
  → `From high-performing websites to custom platforms and SaaS, every build is engineered for speed, conversion, and growth — and backed by the marketing to match.`
- **CTA paragraph** (currently): `Your website is your most important marketing asset. Partner with a trusted web design agency to build a website that drives results. Get a free quote to get started.`
  → `Your website is your most important growth asset. Partner with a studio that designs, builds, and markets — so your site doesn't just look great, it delivers customers. Get a free quote to start.`
- **Stat description** for the "3–5 Day / Delivery" stat (currently): `Our conversion-focused designs deliver measurable results.`
  → `Rapid delivery without cutting corners — most sites go live in under a week.`

## Keep unchanged
- H1 ("Premier Web Design Company for Modern Businesses"), the `AuroraText`, "Our Premium Services" heading, "Premium Clientele" label, portfolio items, all layout/animation/structure.

## Rules
- Match the file's existing JSX text style (straight apostrophes are fine in JSX text). Use en/em dashes as written above.
- Do NOT touch other pages (services/global/etc.), schema, stats numbers, analytics.

## Acceptance criteria
- `npm run build` completes.
- Home `<title>` renders as `Web Design, Development & Digital Marketing | Kinstel Solutions` (brand once).
- Hero/services/CTA copy reflects the studio (design+build+market+platforms) narrative; keywords "web design"/"development" still present.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-4: reposition home + site voice to growth & product studio (keyword-safe, honest)`. Do NOT push.
- Report: each string changed (confirm old found & replaced), build result, commit hash. Summaries only.
