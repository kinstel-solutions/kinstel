# Phase 26 — Blog RSS Feed (`/feed.xml`)

**Branch:** `staging` (builds on `f5bf34d`). Local commits only; do NOT push.
**Goal:** Standard RSS 2.0 feed for the blog — distribution/followability + a minor SEO signal. Auto-generated from `posts`. Safe/additive, no deps.
**Implementer:** Sonnet 5. **Design by:** Opus 4.8. (Autonomous loop.)

## Build
- `src/app/feed.xml/route.ts` — a `GET` route handler returning an RSS 2.0 XML string with `Content-Type: application/rss+xml; charset=utf-8`.
  - Import `posts` from `@/lib/blog` and `siteConfig` from `@/lib/site-config` (url = `https://www.kinstel.com`).
  - `<channel>`: title `Kinstel Blog`, link `${siteConfig.url}/blog`, description (from siteConfig or a sensible one), language `en`, `lastBuildDate`.
  - One `<item>` per post (sorted newest first by `date`): `<title>`, `<link>${siteConfig.url}/blog/${slug}</link>`, `<guid isPermaLink="true">…same…</guid>`, `<pubDate>` (convert ISO `date` to RFC-822/UTC string), `<description>` (post.description).
  - **XML-escape** all dynamic text (`& < > " '`). Build the string manually (no new deps).
  - Since `posts` is static and `date` values are fixed strings, this can be a static route (fine if it's dynamic too). Avoid `new Date()`-at-request only where needed for `lastBuildDate` (a fixed build-time value is fine).
- Discoverability: add an alternate link so feed readers/Google find it — add to the blog index page metadata (`src/app/blog/page.tsx`) `alternates: { types: { 'application/rss+xml': '/feed.xml' } }`, and add a subtle "RSS" link in the footer (or on the blog index).

## Constraints
- No new deps (hand-build XML). Escape entities properly. Additive — only the new route + blog page metadata + footer link; don't touch posts or other pages. Do NOT create/stage `organic_tasks`.

## Acceptance criteria
- `npm run build` completes; hitting `/feed.xml` returns valid RSS 2.0 with all 5 posts (correct links + escaped text + valid pubDates); alternate link present on the blog page; footer has an RSS link.

## Deliverable
- Implement, build (and if feasible, sanity-check the XML is well-formed), **commit to `staging`**: `phase-26: blog RSS feed (/feed.xml)`. Do NOT push. `git status` — stage only intended source files (never `organic_tasks`).
- Report: files created/changed, feed structure + escaping + how many items, build result, commit hash. Summaries only.
