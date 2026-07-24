# Phase 19 — "Industries We Serve" page (`/industries`)

**Branch:** `staging` (builds on `33265f5`). Local commits only; do NOT push.
**Goal:** One `/industries` page with a section per real client sector (NOT many thin doorway pages — the "few deep verticals" approach). Adds industry-keyword SEO + internal links to case studies. Honest — grounded in actual clients.
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8. (Autonomous loop.)

## Build
- `src/app/industries/page.tsx` (server component, metadata): title `"Industries We Serve"`, description, `alternates:{canonical:"/industries"}`, indexed. Header, hero, industry sections/cards, CTA, Footer.
- Reuse design system (Cards, icons, accent gold). Each industry = card/section: icon, name, 1–2 honest sentences, and a link to the matching case study (or relevant page). Keep it to the 5 real sectors below — do NOT invent industries we haven't served.
- Wire: add `/industries` to `sitemap.ts` (0.7, monthly) + an "Industries" link in the footer (Company column). Header nav optional (don't crowd — footer is fine).

## Industries (verbatim copy; link targets are real)
1. **B2B & Manufacturing** — `Enterprise-grade websites with proper enquiry (RFQ) pipelines and the credibility a serious manufacturer needs.` → link `/work/chopra-retec`.
2. **Healthcare & Wellness** — `From clinic sites to full booking & consultation platforms — secure, professional, and built to grow.` → link `/work/blissful-station`.
3. **Education & Coaching** — `Fast, modern sites that turn prospective students into enquiries, backed by Google Ads that fill the pipeline.` → link `/work/edgrowth`.
4. **Home & Local Services** — `Conversion-focused sites plus local SEO, so service businesses get found and get booked.` → link `/work/james-bond-cleaning`.
5. **Legal** — `Credible, conversion-focused websites and marketing for law firms.` → link `/law-firm-marketing`.

Intro line for the hero: `We work across industries — here's a look at some of the sectors we've built for, and the kind of results each needs.` Plus a closing note that this list isn't exhaustive + CTA (SmartCtaButton, phone `+919889988408`, email `contact@kinstel.com`, label "Tell Us About Your Project").

## Constraints
- Only the 5 real sectors; honest blurbs (no fabricated stats/volume). Reuse components; additive; touch only the new page + footer + sitemap; no new deps; do NOT create/stage `organic_tasks`. Optional `BreadcrumbList` JSON-LD (low-risk) — fine to include or skip.

## Acceptance criteria
- `npm run build` completes; `/industries` prerenders (canonical); links resolve to real routes (`/work/chopra-retec`, `/work/blissful-station`, `/work/edgrowth`, `/work/james-bond-cleaning`, `/law-firm-marketing`); in sitemap; footer links to it.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-19: industries we serve page`. Do NOT push. `git status` — stage only intended source files (never `organic_tasks`).
- Report: files created/changed, industries + link targets, build result, commit hash. Summaries only.
