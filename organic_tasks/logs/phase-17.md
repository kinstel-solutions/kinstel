# Phase 17 — Log (Blog Post: "5 Signs Your Website Is Costing You Customers")

**Status:** ✅ Complete · **Branch:** `staging` · **Commit:** `8e6d998` (local only)
**Copy by:** Opus 4.8 · **Implemented by:** Sonnet 5 (loop) · **Date:** 24 Jul 2026 · builds on `eaa91dc`

## What was done
- Appended a 3rd `BlogPost` to `src/lib/blog.ts` (slug `5-signs-your-website-is-costing-you-customers`). Route + sitemap auto-generate from the `posts` array — only `blog.ts` changed. Existing 2 posts untouched.
- Post funnels readers to the free Audit tool (`/website-audit`), the ROI calculator (`/tools/website-roi-calculator`), `/services`, and `/contact` — content → lead flow.

## Why
Grows the content hub (audit gap C3) + AEO, and connects blog traffic to the lead-gen tools built in Phases 10–12.

## Verification (Opus)
- `/blog/5-signs-your-website-is-costing-you-customers.html` prerendered; commit touches only `src/lib/blog.ts`; 3 posts total; build succeeded; 18 commits; clean tree.

## Next (loop)
Candidates: testimonials/proof section (true assets only), local-SEO blog post, /studio dashboard stats, a persistent "book a call" CTA.
