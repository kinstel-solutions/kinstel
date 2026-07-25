# Phase 0 — Log (Technical SEO Foundation)

**Status:** ✅ Complete · **Branch:** `staging` · **Commit:** `686b91a` (local only, not pushed)
**Implemented by:** Sonnet 5 · **Planned/verified by:** Opus 4.8 · **Date:** 24 Jul 2026

## What was done (15 files)
- **`src/app/layout.tsx`** — removed the inherited sitewide `alternates.canonical: "/"` (root cause of the de-indexing bug); title template → `"%s | Kinstel Solutions"`; removed hardcoded `openGraph.images`/`twitter.images` pointing at the missing `/og-image.png`.
- **`src/lib/site-config.ts`** — `url` → `https://www.kinstel.com`; removed unused `ogImage`.
- **`src/app/opengraph-image.tsx`** (new) — dynamic 1200×630 OG image via `next/og ImageResponse` (dark `#102A43` + gold `#D4AF37`, "Kinstel Solutions" + tagline).
- **`src/app/twitter-image.tsx`** (new) — re-exports the OG image.
- **`src/app/sitemap.ts`** — rewritten: www host, `#services`/`#portfolio` fragments removed, 9 indexable routes with priorities + changeFrequency.
- **`public/robots.txt`** — sitemap URL → www.
- **Per-page canonicals + title de-brand:** `page.tsx` (`/`), `contact`, `credentials`, `web-design-company-lucknow`, `services`, `global`, `offers/lko`, `law-firm-marketing`, and new `packages/layout.tsx` (packages page is a client component, so a minimal server layout carries its metadata).

## Verification (Opus)
- `grep` confirms: no canonical in `layout.tsx`; 9 self-referencing canonicals present; `site-config.url` = www; title template fixed; sitemap uses www with no fragments; `opengraph-image.tsx` exports valid `ImageResponse`/`size`/`contentType`/`alt`.
- Sonnet ran `npm run build` → succeeded, 24 routes incl. `/opengraph-image`, `/twitter-image`, `/sitemap.xml`.

## Known follow-ups (deferred, not blockers)
- `/global` and `/global-promo` still have page-level hardcoded **apex** `openGraph.url` — left untouched to stay surgical; fold into a later polish.
- `lastModified` in sitemap uses build-time `new Date()` (P2 realism — acceptable).

## Deviations from plan
- Added `src/app/packages/layout.tsx` (not in original file list) — required because `packages/page.tsx` is `"use client"` and cannot export `metadata`. Minimal-footprint workaround.
- Chose descriptive titles for `services` ("Services | Web Design & Digital Marketing") and `packages` ("Packages & Pricing") where the plan gave no exact string — kept keywords, removed brand duplication.

## Next
→ Phase 1: Structured data (JSON-LD).
