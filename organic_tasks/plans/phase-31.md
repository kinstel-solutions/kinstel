# Phase 31 — Noindex transactional / ad-landing pages (SEO hygiene)

**Branch:** `staging` (builds on `f49251e`). Local commits only; do NOT push.
**Goal:** Fix a real indexation-hygiene gap: `/pay`, `/pay/success` (transactional) and `/landing` (an off-brand ad landing page) are currently indexable and out of the sitemap. Transactional + ad/duplicate pages should be `noindex` (was flagged in the original audit §3.2). Corrective, not a new feature.
**Implementer:** Sonnet 5. **By:** Opus 4.8. (Autonomous loop.)

## Fixes — add `robots: { index: false, follow: false }` to each of:
1. `/pay` — `src/app/pay/page.tsx`
2. `/pay/success` — `src/app/pay/success/page.tsx`
3. `/landing` — `src/app/landing/page.tsx`

**Method:** For each page, add a `metadata` export with the robots block. **BUT** if a page is a client component (`'use client'` — likely for `/pay` with its payment form), it CANNOT export `metadata`; in that case create a sibling `layout.tsx` in that route directory that exports the `metadata` (mirror the existing `src/app/packages/layout.tsx` pattern from Phase 0). Check each file for `'use client'` first and choose the right method.

- Do NOT add these routes to the sitemap (they're noindex). Do NOT change their content/design (e.g. don't touch `/landing`'s off-brand styling — just add noindex). Do NOT change payment logic.

## Constraints
- Only the noindex additions (metadata/layout files for those 3 routes). No content, design, or logic changes. No new deps. Do NOT create/stage `organic_tasks`.

## Acceptance criteria
- `npm run build` completes; built HTML for `/pay`, `/pay/success`, `/landing` each contains `noindex, nofollow`; sitemap unchanged (still excludes them); payment flow untouched.

## Deliverable
- Implement, build (verify the 3 pages emit noindex), **commit to `staging`**: `phase-31: noindex transactional (/pay) + ad-landing (/landing) pages`. Do NOT push. `git status` — stage only intended source files.
- Report: per page, which method used (metadata vs layout) + `'use client'` status, noindex confirmed in build output, build result, commit hash. Summaries only.
