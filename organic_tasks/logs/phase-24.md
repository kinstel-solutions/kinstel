# Phase 24 — Log (Per-Post Blog OG Images)

**Status:** ✅ Complete · **Branch:** `staging` · **Commit:** `2893a9e` (local only)
**Design by:** Opus 4.8 · **Implemented by:** Sonnet 5 (loop) · **Date:** 24 Jul 2026 · builds on `2f481b0`

## What was built (2 files, +108 lines)
- `src/app/blog/[slug]/opengraph-image.tsx` (new) — dynamic 1200×630 per-post OG via `next/og ImageResponse`: brand style (navy `#102A43` + gold `#D4AF37`), post title (font steps down for long titles), "Blog · <tag>" label, KINSTEL wordmark; `generateStaticParams` from `posts`; fallback "Kinstel Blog".
- `src/app/blog/[slug]/twitter-image.tsx` (new) — re-exports the OG image for X.

## Why
Each shared blog post now gets a branded, title-specific preview image (better share CTR) instead of the generic sitewide OG — and it showcases the craft.

## Verification (Opus)
- Build generated per-post `opengraph-image`/`twitter-image` for all 4 posts; no new deps; build succeeded (all routes); 25 commits; clean tree.

## Next (loop)
Candidates: another SEO/AEO blog post, a proof/trust strip (true assets), accessibility/perf polish, RSS feed for blog.
