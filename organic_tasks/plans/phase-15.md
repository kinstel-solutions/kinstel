# Phase 15 — Internal `/studio`: Lead Tracker (kanban, local-first)

**Branch:** `staging` (builds on `111c62b`). Local commits only; do NOT push.
**Goal:** Third `/studio` tool — a visual lead pipeline (kanban). Completes the internal CRM triad (invoice + proposal + leads). ADHD-friendly: glanceable stages, minimal fields, one place to see the pipeline. Local-first.
**Implementer:** Sonnet 5. **Design by:** Opus 4.8. (Autonomous loop — default choices.)

## Location / access (same as other /studio tools)
- `src/app/studio/leads/page.tsx` — `robots:{index:false,follow:false}`; NOT in sitemap; NOT linked publicly.
- Add a "Lead Tracker" card to `src/app/studio/page.tsx` dashboard.

## Data (local-first)
- localStorage key `studio.leads` — array of leads. No server, no new deps. Nothing sensitive in source.
- Lead shape: `{ id, name, business?, source, value?, notes?, stage, createdAt }`.
- `source` options: `Google Ads`, `Organic`, `Referral`, `DesignRush`, `WhatsApp`, `Other`.
- `stage` options (kanban columns): `New`, `Contacted`, `Quoted`, `Won`, `Lost`.

## Tool `src/components/studio/lead-tracker.tsx` ('use client')
- **Kanban board:** 5 columns (New → Contacted → Quoted → Won → Lost). Each column shows its lead cards + a count + sum of `value` for that column.
- **Lead card:** name (+ business), source badge, value (₹, if set), truncated notes, created date. Actions on each card: **move stage** (◀ / ▶ buttons to shift to adjacent stage — NO drag-drop library, keep it dependency-free and reliable), **edit**, **delete** (with a confirm).
- **Add lead:** a form/inline panel (name required; business/source/value/notes optional) → prepends to `New`.
- **Stats bar** at top: total leads, open-pipeline value (sum of value across New+Contacted+Quoted), won value (sum across Won). Use `formatINR`-style formatting (reuse from `quote-pricing.ts` if handy, else inline).
- Reuse design system (Card, Button, Input, Textarea, Select/RadioGroup, Badge). Responsive: columns scroll horizontally on mobile.

## Constraints
- Client-side; localStorage; noindex + unlinked + not in sitemap; NO new deps; no drag-drop lib (use move buttons); reuse UI components; additive; don't touch public pages; do NOT create/stage an `organic_tasks` folder.

## Acceptance criteria
- `npm run build` completes; `/studio/leads` renders, noindex, not in sitemap; `/studio` dashboard links to it; add/edit/delete/move-stage all work and persist across reloads (localStorage); stats compute correctly.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-15: internal /studio lead tracker (kanban, local-first)`. Do NOT push. `git status` — stage only intended SOURCE files (never `organic_tasks`).
- Report: files created/changed, columns/card actions, localStorage key, noindex + not-in-sitemap confirmation, build result, commit hash. Summaries only.
