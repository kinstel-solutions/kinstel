# Phase 20 — Blog Post: "Local SEO for Lucknow Businesses"

**Branch:** `staging` (builds on `51a4b81`). Local commits only; do NOT push.
**Goal:** Add a 4th blog post targeting the core local market (Lucknow) — supports the local-organic strategy + GBP/SEO service, funnels to the audit tool + services. Minimal: append one entry to `src/lib/blog.ts` (route + sitemap auto-generate).
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8. (Autonomous loop.)

## Task
Append ONE `BlogPost` to the `posts` array in `src/lib/blog.ts`, matching the existing shape. Verbatim body below. Touch ONLY `src/lib/blog.ts`. Do not modify other posts or the blog pages/sitemap (they map over `posts`).

- slug: `local-seo-for-lucknow-businesses`
- title: `Local SEO for Lucknow Businesses: How to Actually Get Found on Google`
- description: `A practical local-SEO guide for Lucknow businesses — how to show up on Google Search and Maps when nearby customers are searching for what you offer.`
- date: `2026-07-24`
- author: `Kinstel Solutions`
- tags: `["Local SEO", "Lucknow", "Google Business Profile"]`
- body (verbatim markdown):
```
When someone in Lucknow searches "near me" or "in Lucknow" for what you sell, do you show up? If not, you're handing those customers to competitors. Local SEO is how you fix that — and most of it is within your control. Here's the practical version.

## 1. Claim and complete your Google Business Profile
This is the single highest-impact thing you can do. A complete, verified Google Business Profile is what puts you on Google Maps and in the local "3-pack" at the top of search. Fill in everything: correct category, hours, service areas, phone, website, photos, and services with prices. An empty or unclaimed profile is invisible.

## 2. Get reviews — and reply to them
Reviews are one of the strongest local ranking signals, and they're what convince a stranger to call you instead of the next listing. Ask every happy customer for a Google review, make it easy with a direct link, and reply to each one. Even a handful of genuine reviews beats a profile with none.

## 3. Make your website say where you are
Put your business name, address, and phone (NAP) in a consistent format on your site — ideally in the footer on every page — and add `LocalBusiness` structured data so search engines understand your location. A dedicated local page (like our own [Lucknow page](/web-design-company-lucknow)) that names your areas and services helps you rank for local terms.

## 4. Target what people actually search
In India, most people search generically — "website designer in Lucknow," "dentist in Gomti Nagar" — not by fancy niche terms. Build pages around the plain, high-intent phrases your customers really type, and answer their real questions.

## 5. Build local citations
Get listed — with identical NAP — on the directories that matter (Google, Bing Places, JustDial, Sulekha, IndiaMART). Consistent listings across the web reinforce to Google that you're a real, local business.

## 6. Measure what's working
Track calls, direction requests, and website clicks in your Google Business Profile insights, and set up conversion tracking on your site. If you don't measure, you're guessing.

## Want a shortcut?
Local SEO compounds — the earlier you start, the bigger the lead. If you'd rather have it done right, [see our SEO & marketing services](/services), or [run a free audit](/website-audit) to see where your site stands today. Questions? [Get in touch](/contact) — the first consultation is free.
```

## Constraints
- Verbatim body; honest; touch ONLY `src/lib/blog.ts`; match existing shape; no new deps; do NOT create/stage `organic_tasks`.

## Acceptance criteria
- `npm run build` completes; `/blog/local-seo-for-lucknow-businesses` prerenders; appears on `/blog` + sitemap (auto); existing posts unchanged.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-20: blog post — local SEO for Lucknow businesses`. Do NOT push. Stage only `src/lib/blog.ts`.
- Report: confirm appended + route prerenders + others unchanged, build result, commit hash. Summaries only.
