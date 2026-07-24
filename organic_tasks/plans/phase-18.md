# Phase 18 — Internal `/studio`: Retainers & MRR Tracker (local-first)

**Branch:** `staging` (builds on `8e6d998`). Local commits only; do NOT push.
**Goal:** A `/studio` tool to track recurring clients — Kinstel's real revenue engine (Ads mgmt, SEO+GBP, AMC, hosting retainers). Shows MRR at a glance + upcoming renewals so nothing slips (ADHD-helping). Local-first.
**Implementer:** Sonnet 5. **Design by:** Opus 4.8. (Autonomous loop.)

## Location / access (same as other /studio tools)
- `src/app/studio/retainers/page.tsx` — `robots:{index:false,follow:false}`; NOT in sitemap; NOT linked publicly.
- Add a "Retainers & MRR" card to `src/app/studio/page.tsx`.

## Data (local-first, localStorage `studio.retainers`)
- Retainer shape: `{ id, client, service, amount, billingDay, status, notes?, startedAt }`.
- `service` options: `Google Ads Management`, `SEO & GBP`, `AMC / Maintenance`, `Hosting`, `Other`.
- `billingDay`: day of month (1–31) the retainer bills.
- `status`: `Active`, `Paused`, `Cancelled`.
- Optionally offer to load client names from `studio.invoice.clients` (reuse) — nice-to-have, not required.

## Tool `src/components/studio/retainer-tracker.tsx` ('use client')
- **Stats bar (top):** Total **MRR** (sum of `amount` for Active retainers, formatted ₹), Active count, and **Upcoming renewals** — count of Active retainers whose `billingDay` falls within the next 7 days (compute from today's date on the client; since `billingDay` is a day-of-month, compare against the current date's day-of-month wrapping to next month).
- **Table/list of retainers:** client, service badge, ₹ amount/mo, billing day (e.g. "Bills on the 5th"), status badge (Active=green, Paused=amber, Cancelled=gray), notes. Sort Active first.
- **Actions:** add (inline form: client + service + amount + billingDay + status + notes), edit, delete (confirm), quick status toggle.
- Reuse design system (Card, Button, Input, Select/RadioGroup, Badge, Textarea). Responsive.
- ₹ formatting: reuse `formatINR` from `src/lib/quote-pricing.ts` or inline.

## Constraints
- Client-side; localStorage; noindex + unlinked + not in sitemap; NO new deps; reuse UI components; additive; don't touch public pages; do NOT create/stage `organic_tasks`. Date math client-side only (fine — this is a client component, not SSR-computed).

## Acceptance criteria
- `npm run build` completes; `/studio/retainers` renders, noindex, not in sitemap; `/studio` dashboard links to it; add/edit/delete/status work + persist (localStorage); MRR + upcoming-renewals compute correctly.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-18: internal /studio retainers & MRR tracker (local-first)`. Do NOT push. `git status` — stage only intended SOURCE files (never `organic_tasks`).
- Report: files created/changed, stats logic (MRR + renewals), localStorage key, noindex + not-in-sitemap confirmation, build result, commit hash. Summaries only.
