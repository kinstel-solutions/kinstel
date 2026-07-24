# Phase 14 — Internal `/studio`: Proposal Generator (local-first)

**Branch:** `staging` (builds on `e5d7be7`). Local commits only; do NOT push.
**Goal:** Second `/studio` tool — a proposal generator pairing with the invoice generator. Builds a branded multi-page proposal PDF matching Kinstel's proposal format (per their Edgrowth/Blissful proposals). Local-first; **shares saved clients + business details with the invoice tool** (zero re-entry — ADHD win).
**Implementer:** Sonnet 5. **Design by:** Opus 4.8. (Autonomous loop — my default choices.)

## Location / access (same as invoice tool)
- `src/app/studio/proposal/page.tsx` — `robots:{index:false,follow:false}`; NOT in sitemap; NOT linked from public header/footer.
- Add a "Proposal Generator" card to the existing `src/app/studio/page.tsx` dashboard.

## Shared data (reuse invoice tool's localStorage)
- Reuse `studio.invoice.business` (business/signature — bank not needed for proposals) and `studio.invoice.clients` (saved clients) so business info + clients carry over from the invoice tool. Add `studio.proposal.draft` for autosave.
- No new deps (jspdf already present). No sensitive data in source.

## Generator `src/components/studio/proposal-generator.tsx` ('use client')
Fields (with sensible defaults):
- **Cover:** Proposal title (default "Website Development Proposal"), Client/Company name (load saved client), Project name, Project ID, Date.
- **Executive Summary** (textarea).
- **Objectives** (repeatable bullets).
- **Scope of Work** (repeatable sections: heading + repeatable bullet points).
- **Tech Stack** (text, default "Next.js 16, React 19, TypeScript, Tailwind CSS").
- **Timeline** (repeatable phases: Phase name + Deliverable + Timeline).
- **Investment** (repeatable line items: description + amount ₹; live Total; optional milestone schedule note).
- **Terms & Conditions** (default text: scope changes quoted separately; client provides content; IP transfers on full payment (Kinstel may showcase in portfolio); hosting/domain quoted separately; 2 revision rounds; 24h comms).
- **Next Steps** (repeatable, default: review & approve → 50% advance → provide content → we begin).
- **Validity** (default "15 days").

**Generate → download multi-page PDF** approximating their proposal format: branded cover (KINSTEL SOLUTIONS wordmark + title + client/project/date), then sections (Executive Summary, Project Overview/Objectives, Scope of Work, Tech Stack, Timeline table, Investment Breakdown + Total, Terms, Next Steps), with proper **page breaks** (add pages as content overflows), gold `#D4AF37` accents, registrations footer. Client-side only.

## Constraints
- Client-side; localStorage; noindex + unlinked + not in sitemap; reuse invoice tool's client/business store; reuse UI components; additive; no new deps; no secrets in source; don't touch public pages.

## Acceptance criteria
- `npm run build` completes; `/studio/proposal` renders + noindex + not in sitemap; `/studio` dashboard links to it; filling the form + Generate downloads a multi-page branded proposal PDF with correct investment total; saved clients/business shared with the invoice tool; drafts persist.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-14: internal /studio proposal generator (local-first, jspdf, shares client store)`. Do NOT push. `git status` — stage only intended source files (do NOT create/stage `organic_tasks`).
- Report: files created/changed, PDF sections/page-break handling, localStorage keys (confirm reuse of invoice store), noindex + not-in-sitemap confirmation, build result, commit hash. Summaries only.
