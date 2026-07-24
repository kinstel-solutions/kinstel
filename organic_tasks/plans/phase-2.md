# Phase 2 — Content Honesty (reconcile stats)

**Branch:** `staging` (builds on `65ad000`). Local commits only; do NOT push.
**Goal:** Remove false/inflated/contradictory stats and unify to ONE honest, defensible set sitewide. Content-only, surgical. No layout/positioning rewrite (that's Phase 3).
**Implementer:** Sonnet 5. **Planner:** Opus 4.8.

## The unified honest stat set (use these EXACT values everywhere a hero/stat trio appears)
1. **`10+`** — "Clients Served"
2. **`95+`** — "PageSpeed Score"
3. **`3–5 Day`** — "Delivery" (verifiable from proposals; replaces the unverified 300% claims)

## Changes
Find and reconcile the stat blocks / hero badges on these pages (grep for `98%`, `150+`, `300%`, `95+`, `10+`, "Law Firms Served", "Lead Increase", "More Conversions", "Conversion Uplift"):
- `src/app/page.tsx` (home) — `98%`→`95+`; keep `10+ Clients Served`; replace the `300% Avg. Conversion Uplift` stat with `3–5 Day Delivery` (label "Delivery" / "Avg. Build Time").
- `src/app/law-firm-marketing/page.tsx` — `98%`→`95+`; **`150+ Law Firms Served`→`10+ Clients Served`**; `300%`→`3–5 Day Delivery`.
- `src/app/offers/knsl052526/page.tsx` — `98%`→`95+`; keep `10+ Clients Served`; `300%`→`3–5 Day Delivery`.
- `src/app/global-promo/page.tsx` — change any `98%`/`98%+` (incl. "98%+ Lighthouse", "98% PageSpeed" badge) to `95+`; replace `300% More Conversions` badge with a truthful badge (`3–5 Day Delivery` or `Conversion-Focused`).
- Any other page using `98%` in a stat/badge → `95+`. (Pages already using `95+` like `global`, `web-design-company-lucknow`, `offers/lko` are correct — leave.)

## Rules
- **Do not invent new numbers.** Only use the three values above. Where a "300%"/"150+" appears, replace with one of the approved values or remove the stat cleanly.
- Keep wording/labels natural and consistent with each page's existing tone; change numbers/claims only, not surrounding copy.
- If you hit a stat you're unsure how to map, leave it and note it in the report (I'll handle it).
- Do NOT touch: schema (it reads no stats), canonical/titles/OG, positioning copy, the law page's structure (only its stat numbers), analytics/headers.

## Acceptance criteria
- `npm run build` completes.
- Grep shows **no remaining** `150+`, `300%`, or `98%` in stat/hero/badge contexts.
- The three unified stats appear consistently; no page contradicts another.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-2: reconcile stats to one honest set (remove 150+/300%/98% inconsistencies)`. Do NOT push.
- Report: files changed, every stat string changed (old→new), any stat you left/flagged, build result, commit hash. Summaries only.
