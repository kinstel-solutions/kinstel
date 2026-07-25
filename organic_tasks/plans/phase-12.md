# Phase 12 — Free Tools Hub + 3 Micro-Tools

**Branch:** `staging` (builds on `51c00b0`). Local commits only; do NOT push.
**Goal:** A `/tools` hub + 3 lightweight, **ungated** client-side calculators (idea #6). Unlike the audit tool (gated lead magnet), these are top-of-funnel: shareable, rank for their keyword, soft CTA to book a call. Honest math only.
**Implementer:** Sonnet 5. **Design/logic/copy by:** Opus 4.8.

## Build
- `src/app/tools/page.tsx` — "Free Tools" hub: hero + cards linking to all free tools (the 3 new ones + the existing **/website-audit** and **/quote**). metadata title `"Free Tools for Growing Your Website"`, canonical `/tools`, indexed.
- 3 tool pages (each: server `page.tsx` with metadata/canonical/indexed + a `'use client'` calculator component in `src/components/tools/`):
  1. `src/app/tools/website-roi-calculator/page.tsx` + `roi-calculator.tsx`
  2. `src/app/tools/nextjs-vs-wordpress/page.tsx` + `nextjs-vs-wordpress-picker.tsx`
  3. `src/app/tools/google-ads-budget-estimator/page.tsx` + `ads-budget-estimator.tsx`
- Reuse the design system (Cards, Button, inputs, Slider/RadioGroup, accent gold). Each page: Header, hero, the tool, a short "how this helps"/"how it's calculated" note (for honesty), soft CTA (SmartCtaButton, phone `+919889988408`, email `contact@kinstel.com`). Ungated (no email required); optional `event({action:'use_tool', category:'tool', label:'<tool>'})` on compute.
- Wire: add all 4 routes (`/tools` + 3) to `sitemap.ts` (hub 0.7, tools 0.6, monthly); add a **"Free Tools"** link to the footer pointing to `/tools`.

## Tool 1 — Website ROI Calculator
- title `"Website ROI Calculator — What's Your Site Really Worth?"`; desc about calculating revenue impact of conversion.
- Inputs: Monthly visitors (number), Current conversion rate (%, default 2), Average customer value (₹).
- Compute (client, pure math from inputs — NO fabricated data): current customers/mo = visitors × conv%; current revenue/mo = customers × value. Then show revenue at conv%+1 and conv%+2 (or a target-rate slider), and the **extra revenue/month & /year** from the uplift.
- Output message e.g.: `At {conv}% you earn ~₹{current}/mo. Lifting conversion to {target}% would add ~₹{delta}/mo (₹{deltaYear}/yr).` CTA: `A better-converting site pays for itself — book a free call.`
- Honesty note: "Estimates based on the numbers you enter."

## Tool 2 — Next.js vs WordPress Picker
- title `"Next.js vs WordPress: Which Should You Use? (Free Picker)"`.
- 5 yes/no (or A/B) questions, each nudging a score toward WP or Next — must be genuinely balanced (can recommend WordPress when it fits; do NOT rig it to always say Next.js):
  1. "Will you update content (posts/pages) yourself, often?" Yes→WP / No→Next
  2. "Is the lowest possible upfront cost your top priority?" Yes→WP / No→Next
  3. "Do you need a custom app — booking, marketplace, dashboard, logins?" Yes→Next / No→WP
  4. "Is top performance & a premium, custom look important?" Yes→Next / No→WP
  5. "Do you have a developer/agency to build & maintain it?" Yes→Next / No→WP
- Tally → recommendation (WordPress / Next.js / "either could work") + a short honest explanation of *why* based on their answers. CTA links to `/platforms` and the blog post `/blog/nextjs-vs-wordpress`.

## Tool 3 — Google Ads Budget Estimator
- title `"Google Ads Budget Estimator (India) — Free Tool"`.
- Inputs: Monthly budget (₹) OR target leads/month (toggle); Competitiveness (Low / Medium / High → assumed CPC bands, INDIA rough: Low ₹10–30, Medium ₹30–70, High ₹70–150); optional landing-page conversion rate (default range 5–12%).
- Compute RANGES (not false precision): clicks = budget ÷ CPC band; leads = clicks × conv band. If target-leads mode, back-solve to a budget range.
- Output: `~{clicksLow}–{clicksHigh} clicks and ~{leadsLow}–{leadsHigh} leads/month at this budget.` Clear disclaimer: `Rough estimates — real results depend on your niche, targeting, and landing page. We've run campaigns at ~15–40% conversion on tuned funnels.` CTA: `Want us to run it? Google Ads management from ₹10,000/mo — book a call.`

## Constraints
- Ungated, client-side math only; honest ranges/disclaimers; no fabricated stats (the 15–40% CVR line is the owner's real figure). Reuse components; additive; don't break other pages. Balanced picker (not rigged).

## Acceptance criteria
- `npm run build` completes; `/tools` + the 3 tool routes prerender; each computes correctly from inputs; all in sitemap; footer links to `/tools`.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-12: free tools hub + ROI calculator, Next-vs-WP picker, Ads budget estimator`. Do NOT push. `git status` — stage only intended files.
- Report: files created, each tool's inputs→outputs, build result, commit hash, confirm picker is balanced + tools ungated. Summaries only.
