# Phase 21 — `/studio` Dashboard Rollup (command center)

**Branch:** `staging` (builds on `0a8ffcf`). Local commits only; do NOT push.
**Goal:** Make the `/studio` dashboard a glanceable command center — live rollup stats from the lead tracker + retainer tracker (reads localStorage). Ties the ops suite together; ADHD "one glance at the business."
**Implementer:** Sonnet 5. **Design by:** Opus 4.8. (Autonomous loop.)

## Build
- New client component `src/components/studio/studio-overview.tsx` ('use client'): on mount (hydration-guarded), read `studio.retainers` and `studio.leads` from localStorage and render a row of stat tiles. If a key is empty/absent, show `—`/zeros gracefully (first-run friendly).
- Mount it at the TOP of `src/app/studio/page.tsx` (above the existing tool cards). Keep the page a server component with its existing noindex metadata — just render `<StudioOverview />` (a client component) within it.

## Stats to show
- **MRR** — sum of `amount` for Active retainers (₹, `formatINR`).
- **Active retainers** — count.
- **Upcoming renewals (7d)** — Active retainers whose `billingDay` falls within the next 7 days (reuse the same day-of-month/next-occurrence logic as the retainer tracker; if simplest, import a shared helper or recompute inline — client-side date math is fine).
- **Open leads** — count of leads in stages New + Contacted + Quoted.
- **Open pipeline value** — sum of `value` for those open-stage leads (₹).
- (Optional) **Won value** — sum of `value` for Won leads.
- Each tile: label + value + small muted hint; reuse Card/design system + gold accent; responsive grid. A subtle "data lives on this device" note is fine.

## Constraints
- Client-side; reads existing localStorage keys (`studio.retainers`, `studio.leads`) — do NOT change those tools' schemas. `/studio` stays noindex + unlinked + not in sitemap. Reuse `formatINR` from `src/lib/quote-pricing.ts`. No new deps. Additive — only add the component + mount it on `studio/page.tsx`. Do NOT create/stage `organic_tasks`.

## Acceptance criteria
- `npm run build` completes; `/studio` renders the overview tiles above the tool cards; still noindex; not in sitemap; empty-state (no data) renders cleanly without errors.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-21: /studio dashboard rollup (MRR + leads command center)`. Do NOT push. `git status` — stage only intended SOURCE files (never `organic_tasks`).
- Report: files created/changed, stats + how computed, empty-state handling, noindex confirmed, build result, commit hash. Summaries only.
