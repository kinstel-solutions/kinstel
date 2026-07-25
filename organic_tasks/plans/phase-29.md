# Phase 29 — Consistency Polish (clear logged leftovers)

**Branch:** `staging` (builds on `1640191`). Local commits only; do NOT push.
**Goal:** Fix small real inconsistencies logged earlier (not new features — corrective polish). Exact string swaps.
**Implementer:** Sonnet 5. **By:** Opus 4.8. (Autonomous loop.)

## Exact fixes
1. **`src/app/global/page.tsx`** — openGraph url: `"https://kinstel.com/global"` → `"https://www.kinstel.com/global"` (host unification, matches Phase 0).
2. **`src/app/global-promo/page.tsx`** — openGraph url: `"https://kinstel.com/global-promo"` → `"https://www.kinstel.com/global-promo"`.
3. **`public/site.webmanifest`** — `description`: replace the law-firm-specific text (`"Kinstel empowers lawyers and law firms to elevate their practice with custom website development, proven SEO, and legally compliant marketing."`) with a general one: `"Kinstel Solutions — web design, development, and digital marketing for businesses in Lucknow and worldwide."`
4. **`src/app/law-firm-marketing/page.tsx`** — metadata `description`: replace the same law-firm "empowers lawyers…" text with an honest vertical framing aligned to the reframed hero: `"Conversion-focused websites and marketing for law firms — part of the work Kinstel Solutions does for businesses across industries."`

## Constraints
- ONLY these 4 edits (exact strings). Do NOT change anything else, no new features, no new deps. Do NOT create/stage `organic_tasks`. Preserve surrounding code/formatting.

## Acceptance criteria
- `npm run build` completes; no remaining `https://kinstel.com/` (non-www) in `global`/`global-promo` og:url; manifest + law-page descriptions updated; nothing else changed.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-29: consistency polish (www og:url, manifest + law-page descriptions)`. Do NOT push. `git status` — stage only the 4 intended files.
- Report: the 4 edits confirmed (old→new), build result, commit hash. Summaries only.
