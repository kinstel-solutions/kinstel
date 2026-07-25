# Phase 27 — Homepage "Free Tools" Section (surface lead magnets)

**Branch:** `staging` (builds on `5541941`). Local commits only; do NOT push.
**Goal:** Surface the lead-gen tools (Audit, Quote, calculators) on the homepage — currently reachable only from the footer. High-conversion, low-risk (one additive section on the home page; no global-nav changes).
**Implementer:** Sonnet 5. **Design by:** Opus 4.8. (Autonomous loop.)

## Build
- In `src/app/page.tsx`, add ONE new `<section>` (reuse the existing section styling/`container`/Card patterns already in the file) placed **between the Stats section and the final Contact/CTA section**. Do not change other sections.
- Section: eyebrow `FREE TOOLS`, heading like `Try Before You Talk to Us`, short sub, then 3 cards:
  1. **Free Website Audit** — `See your site's real speed, SEO & performance scores in seconds.` → `/website-audit`
  2. **Instant Quote** — `Get a ballpark price for your project in a couple of clicks.` → `/quote`
  3. **Free Calculators** — `Website ROI, Google Ads budget, and Next.js-vs-WordPress — free tools to plan smarter.` → `/tools`
- Each card links (whole card or a button) to its route (Next `<Link>`), reuse `Card` + icons (lucide) + accent gold, matching the site's look. Responsive 3-col grid.

## Constraints
- Additive — modify ONLY `src/app/page.tsx` (add one section + any needed icon imports). Don't touch other pages/components. Reuse existing design system. No new deps. Do NOT create/stage `organic_tasks`.

## Acceptance criteria
- `npm run build` completes; home renders the new Free Tools section (between Stats and Contact) with 3 cards linking to `/website-audit`, `/quote`, `/tools`; visually consistent; nothing else changed.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-27: homepage free-tools section (surface audit/quote/tools)`. Do NOT push. `git status` — stage only `src/app/page.tsx`.
- Report: what was added + placement, build result, commit hash. Summaries only.
