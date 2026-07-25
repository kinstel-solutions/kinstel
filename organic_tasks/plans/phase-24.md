# Phase 24 — Per-Post OG Images for the Blog

**Branch:** `staging` (builds on `2f481b0`). Local commits only; do NOT push.
**Goal:** Give each blog post its own branded social-share image (post title on the navy/gold brand) instead of the generic sitewide OG — better share CTR + "eat our own cooking" craft. Safe/additive via a dynamic `opengraph-image` route.
**Implementer:** Sonnet 5. **Design by:** Opus 4.8. (Autonomous loop.)

## Build
- `src/app/blog/[slug]/opengraph-image.tsx` — dynamic OG image per post using `ImageResponse` from `next/og`:
  - Export `size = { width:1200, height:630 }`, `contentType = "image/png"`, and `alt` (can be generic or per-post).
  - Export `generateStaticParams()` returning `posts.map(p => ({ slug: p.slug }))` (import `posts` from `src/lib/blog.ts`) so each post's image is statically generated.
  - Default `async function Image({ params }) { ... }`: look up the post by `params.slug` from `posts`; render an `ImageResponse` with the SAME brand style as `src/app/opengraph-image.tsx` (dark bg `#102A43`, gold `#D4AF37` accent) — show the **post title** (large, wrapped), a small "KINSTEL SOLUTIONS" wordmark, and optionally the first tag or "Blog". If the slug isn't found, fall back to a generic title ("Kinstel Blog").
- (Optional) `src/app/blog/[slug]/twitter-image.tsx` re-exporting the same, so Twitter/X uses the per-post image too.
- Next.js auto-wires the per-post `og:image`/`twitter:image` for these routes (overriding the inherited root OG image on blog posts).

## Constraints
- Reuse `next/og` (already used by root OG) — no new deps. Match the existing brand OG style. Additive — only the new file(s) under `blog/[slug]/`; do NOT modify the posts, blog pages, or other routes. Do NOT create/stage `organic_tasks`. Keep text safe for the ImageResponse (basic layout; avoid unsupported CSS).

## Acceptance criteria
- `npm run build` completes; each blog post has its own generated OG image at `/blog/<slug>/opengraph-image` (verify the routes appear in build output / images generate for all 4 posts); root pages still use the sitewide OG.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-24: per-post OG images for blog`. Do NOT push. `git status` — stage only intended source files (never `organic_tasks`).
- Report: files created, how per-post title is rendered, that all 4 posts' images generate, build result, commit hash. Summaries only.
