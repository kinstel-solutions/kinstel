# Phase 28 — Custom On-Brand 404 (`not-found.tsx`)

**Branch:** `staging` (builds on `b73f470`). Local commits only; do NOT push.
**Goal:** Replace the default 404 with an on-brand, helpful not-found page that routes lost visitors to key pages instead of a dead end (retention/UX). Single-file, additive, low-risk.
**Implementer:** Sonnet 5. **Design by:** Opus 4.8. (Autonomous loop.)

## Build
- `src/app/not-found.tsx` (new) — reuse the design system + `Header`/`Footer`. Dark theme, gold accent, `font-headline`.
  - Big friendly heading (e.g. `404 — Page Not Found`) + short reassuring copy (`The page you're looking for moved or never existed. Let's get you back on track.`).
  - A row of helpful links (Next `<Link>` / Buttons) to the most useful destinations: **Home** (`/`), **Services** (`/services`), **Free Tools** (`/tools`), **Blog** (`/blog`), **Contact** (`/contact`).
  - A primary CTA back to Home. Keep it clean and on-brand; reuse `Button`/`Card` as fits.
- (Next.js App Router auto-uses `app/not-found.tsx` for unmatched routes.)

## Constraints
- Additive — only create `src/app/not-found.tsx` (no other files). Reuse existing components (Header/Footer/Button/Link). No new deps. Do NOT create/stage `organic_tasks`. Note: `not-found.tsx` renders within the root layout; make sure it works as a standalone route component (import Header/Footer like other pages do).

## Acceptance criteria
- `npm run build` completes; visiting an unknown path renders the custom 404 with working links to the key pages; on-brand styling.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-28: custom on-brand 404 page`. Do NOT push. `git status` — stage only `src/app/not-found.tsx`.
- Report: file created, links included, build result, commit hash. Summaries only.
