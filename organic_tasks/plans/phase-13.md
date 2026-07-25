# Phase 13 — Internal `/studio`: Invoice Generator (local-first)

**Branch:** `staging` (builds on `9eee814`). Local commits only; do NOT push.
**Goal:** First internal ADHD-helping tool (owner: "locked /studio in this repo, data persistence local, first tool = invoice/proposal generator"). A client-side invoice generator that outputs a branded PDF matching Kinstel's existing invoice format, with saved clients + reusable business details — zero re-typing.
**Implementer:** Sonnet 5. **Design by:** Opus 4.8.

## Location / access
- Route group `/studio` — **NOT public**: `robots: { index:false, follow:false }` on all `/studio` pages, do NOT add to sitemap, do NOT link from public header/footer. (Owner will add real auth/locking later — deferred; log it.)
- `src/app/studio/page.tsx` — a simple internal dashboard listing the studio tools (just "Invoice Generator" for now; leave room for more).
- `src/app/studio/invoice/page.tsx` — the invoice generator.

## Data & privacy
- **Local-first:** everything saved in `localStorage` (this browser/device only). No server, no DB, nothing leaves the browser.
- **Do NOT hardcode sensitive details (bank account / UPI) in source.** Provide a "Your business details" panel (saved to localStorage) where the user fills bank/UPI/account + signature name. Pre-fill only NON-sensitive fixed info as defaults: `Kinstel Solutions`, address `33 Shivdham, Shivlok Colony, Malhaur, Lucknow (U.P.) 226010`, emails `contact@kinstel.com`, PAN `HLCPS8014Q`, registrations `Udyam UDYAM-UP-50-0230220 · IEC HLCPS8014Q · D-U-N-S 77-197-4415`, pay link `https://www.kinstel.com/pay`.
- Saved **clients** in localStorage (name, address lines, phone) — pick a saved client to auto-fill "Billed To".

## The generator (`src/components/studio/invoice-generator.tsx`, 'use client')
Uses **`jspdf`** (already a dep) + **`to-words`** (already a dep) — no new deps.
- **Form fields:** Invoice No, Invoice Date, Due Date, Project ID; Billed To (client name, address, phone — with a "load saved client" dropdown + "save this client"); line items (repeatable rows: Service Description [+ optional multiline detail] + Amount ₹; add/remove; live **Grand Total**); optional Notes/Terms (default the standard terms: source-code handover on payment clearance; hosting = infra, content updates under AMC).
- **Amount in words** via `to-words` (INR).
- **Generate PDF** (download): lay out to approximate Kinstel's invoice format —
  - Header band: "KINSTEL SOLUTIONS" wordmark (text is fine; or use `/K-Logo.svg`→ skip image if complex, text header ok), title "INVOICE".
  - Invoice meta table (No/Date/Project ID/Due Date/Billed To block/Billed By block/PAN).
  - Line-items table (Service Description | Amount(₹)) with Grand Total row + "Amount in Words".
  - Payment Methods section (Online → pay link + "Enter Invoice No"; Bank Transfer → the user's saved bank/UPI details).
  - Terms & Conditions.
  - Signature line (user's signature name) + footer line with the registrations + contact.
- Colours: dark text on white (print-friendly), gold `#D4AF37` accents to match brand.
- A live on-screen preview is a nice-to-have; the must-have is the downloadable PDF.

## Constraints
- Client-side only; localStorage persistence; NO secrets/bank details in committed source; noindex + unlinked; reuse existing UI components where helpful; additive; don't touch public pages. No new deps (jspdf + to-words already present — verify in package.json).

## Acceptance criteria
- `npm run build` completes; `/studio` + `/studio/invoice` render, are `noindex`, and are NOT in sitemap or public nav.
- Filling the form + clicking Generate downloads a branded PDF with correct totals + amount-in-words; saved clients/business-details persist across reloads (localStorage).

## Deliverable
- Implement, build, **commit to `staging`**: `phase-13: internal /studio invoice generator (local-first, jspdf)`. Do NOT push. `git status` — stage only intended files.
- Log to `_PHASE-ENDGAME-inputs.md`: `/studio` currently has NO auth (noindex + unlinked only) — owner to add real locking before relying on it; and localStorage is device-bound (not synced across the 3 brothers) → Supabase sync is a future upgrade.
- Report: files created, PDF fields/layout, localStorage keys, build result, commit hash. Summaries only.
