# Phase 22 — `/studio` Backup & Restore (export/import JSON)

**Branch:** `staging` (builds on `caee68f`). Local commits only; do NOT push.
**Goal:** Mitigate the known localStorage limitation (device-bound data, no cross-device sharing, loss risk) — safely, without a backend. Export all `/studio` data to a JSON file; import it back on any device/browser.
**Implementer:** Sonnet 5. **Design by:** Opus 4.8. (Autonomous loop.)

## Build
- New client component `src/components/studio/studio-backup.tsx` ('use client'):
  - **Export:** gathers all `/studio` localStorage keys → a single JSON object → downloads as a file (e.g. `kinstel-studio-backup-YYYYMMDD.json`) via a Blob + object URL. Include a small `version` + `exportedAt` wrapper.
  - **Import:** file input → parse JSON → **confirm dialog** ("This will overwrite your current Studio data on this device. Continue?") → write each key back to localStorage → toast success + advise reload (or trigger a reload).
  - Keys to include (exactly these; ignore unknown ones on import gracefully): `studio.invoice.business`, `studio.invoice.clients`, `studio.invoice.draft`, `studio.proposal.draft`, `studio.leads`, `studio.retainers`.
  - Validate imported JSON (try/catch; ensure it's an object; skip keys that aren't present). On malformed file → error toast, no changes.
- Mount `<StudioBackup />` on `src/app/studio/page.tsx` (below the tool cards, e.g. a "Data & Backup" section). Page stays a server component + noindex.

## Constraints
- Client-side only; no backend; no new deps. Reuse design system (Card, Button, useToast). Reads/writes ONLY the 6 known keys — do NOT alter the tools or their schemas. `/studio` stays noindex + unlinked + not in sitemap. Additive. Do NOT create/stage `organic_tasks`.
- Import must be non-destructive-by-default (explicit confirm before overwrite).

## Acceptance criteria
- `npm run build` completes; `/studio` shows Export + Import controls; export downloads a JSON with the 6 keys; import (with confirm) restores them; malformed import handled gracefully; still noindex.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-22: /studio backup & restore (export/import JSON)`. Do NOT push. `git status` — stage only intended SOURCE files (never `organic_tasks`).
- Report: files created/changed, export/import behavior + confirm/validation, keys covered, noindex confirmed, build result, commit hash. Summaries only.
