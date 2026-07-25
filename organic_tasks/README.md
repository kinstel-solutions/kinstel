# Kinstel Organic Growth — Review Guide (start here) ☕

**Status:** 30 commits on the local **`staging`** branch — **nothing pushed**; your `cwd`/`main` and working copy are untouched. Full `npm run build` passes across the whole branch. Review, then sync to cloud yourself when happy.

---

## What's on `staging` now

### Public site
- **Foundation fixes:** self-referencing canonicals + `www` host, real OG image, clean sitemap, de-duplicated titles, full JSON-LD schema (Organization/LocalBusiness/Service/FAQPage), stat honesty (killed the 150+/300%/98% contradictions), security headers, GA pageview fix + conversion events.
- **Repositioning:** home + site voice → "studio that designs, builds & grows" (keyword-safe, honest).
- **New pages:** `/about` (faceless, credential-anchored), `/platforms`, `/work` + 4 case studies, `/industries`, `/compare` (honest how-to-choose), `/faq` (with FAQPage schema).
- **Content hub:** `/blog` with **5 posts** (pricing, Next-vs-WordPress, "5 signs", local SEO, Google Ads) + **per-post OG images** + **RSS feed** (`/feed.xml`).
- **Conversion:** homepage "Free Tools" section surfacing the lead magnets; custom on-brand 404.

### Public tools (lead-gen)
- **`/website-audit`** — free PageSpeed-Insights audit, email-gated (needs your API key for volume — works keyless meanwhile).
- **`/quote`** — guided quote builder → soft "starting from" range (from your à-la-carte pricing; never shows the line items).
- **`/tools`** — hub + 3 calculators: Website ROI, Google Ads Budget, Next.js-vs-WordPress picker.

### Internal `/studio` (locked: noindex + unlinked; local-first, no auth yet)
- **Invoice generator**, **Proposal generator** (branded PDFs in your format, jspdf; shared saved clients/business details)
- **Lead tracker** (kanban), **Retainers & MRR tracker**, **dashboard command-center rollup**, **backup/restore** (export/import JSON)

---

## How to review
- **Read the changes:** `git -C "<repo>" log --oneline cwd..staging` and `git diff cwd..staging`.
- **Run it:** the `staging` worktree is at `.claude/worktrees/staging`. `cd` there → `npm install` (one dep added: `react-markdown`) → `npm run dev` → click through `/`, `/about`, `/platforms`, `/work`, `/blog`, `/tools`, `/website-audit`, `/quote`, and `/studio`.
- **Merge when happy:** from your normal checkout, `git merge staging` (or cherry-pick individual `phase-*` commits — each is one clean commit) and push.

## What needs YOU
`organic_tasks/logs/_PHASE-ENDGAME-inputs.md` is the running to-do (all marked 🟥/🟨/🟩):
- 🟥 **PageSpeed Insights API key** (for the audit tool) — guide at `docs/pagespeed-api-setup.md`.
- 🟥 Real **case-study metrics + testimonials** (placeholders shown as "coming soon"; no fake data).
- 🟥 **`/studio` access control** before relying on it (currently noindex + unlinked only).
- 🟨 Live **GBP address + geo** for LocalBusiness schema; a real results stat if you have one; Supabase sync for shared `/studio` data.
- 🟨 Revisit the parked **"go bolder on stats/tone"** decision.

## Folder map
- `organic_tasks/plans/` — strategy, codebase audit, per-phase plans (`phase-0`…`phase-29`), `enhancements-backlog.md`.
- `organic_tasks/logs/` — a log per phase + `_PHASE-ENDGAME-inputs.md` (your to-do) + this guide.

## About the autonomous loop
A 30-min loop has been adding safe, documented features/polish (local commits only). The **high-impact work is complete** — this is now polish territory. **To stop it:** reply "stop the loop." Otherwise it continues (session-only; 7-day cap).
