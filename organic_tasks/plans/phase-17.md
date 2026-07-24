# Phase 17 — Blog Post: "5 Signs Your Website Is Costing You Customers"

**Branch:** `staging` (builds on `eaa91dc`). Local commits only; do NOT push.
**Goal:** Add a 3rd blog post — builds topical authority (audit gap C3) and funnels readers into the free Audit tool + ROI calculator. Fully ownable, honest. Minimal change: append one entry to `src/lib/blog.ts` (the dynamic route + sitemap auto-generate from the `posts` array).
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8. (Autonomous loop.)

## Task
Append ONE `BlogPost` object to the `posts` array in `src/lib/blog.ts`, matching the existing shape (`slug, title, description, date, author, tags, body`). Body is verbatim markdown (below). Do NOT modify the other posts, the blog pages, sitemap, or nav — they already map over `posts`.

- slug: `5-signs-your-website-is-costing-you-customers`
- title: `5 Signs Your Website Is Costing You Customers`
- description: `Your website is either winning customers or quietly losing them. Here are 5 warning signs it's the latter — and how to fix each one.`
- date: `2026-07-24`
- author: `Kinstel Solutions`
- tags: `["Conversion", "Web Design", "SEO"]`
- body (verbatim markdown):
```
Your website is either winning you customers or quietly losing them — there's no neutral. If enquiries are thin even though people visit, one of these five things is usually the culprit.

## 1. It loads slowly
Nearly half of visitors abandon a site that takes more than three seconds to load, and every extra second drops conversions further. Slow sites also rank lower on Google. If yours feels sluggish on mobile data, you're paying for it in lost leads. [Run a free audit](/website-audit) to see your real speed score.

## 2. It doesn't work well on phones
Most of your visitors are on a phone. If they have to pinch, zoom, or squint — or a button is hard to tap — they leave. A site that isn't genuinely mobile-first turns away the majority of its traffic before you ever hear from them.

## 3. It's a brochure, not a conversion tool
A pretty site that just *describes* your business isn't enough. Every page should guide the visitor toward one clear action — call, enquire, book, or buy. No obvious next step, buried contact details, or five competing buttons all lead to the same outcome: a visitor who was ready to act, didn't. [See what a conversion-focused build looks like](/services).

## 4. Nobody can find it
The best website in the world earns nothing if it's invisible. If you don't show up when people search for what you do — or your Google Business Profile isn't set up and optimised — you're relying on luck. Technical SEO, structured data, and local search are what turn a hidden site into a discoverable one.

## 5. You're not measuring anything
If you can't answer "how many leads did the website bring last month, and from where?", you're flying blind. Without conversion tracking you can't tell what's working, what's wasting money, or where visitors drop off. What gets measured gets improved.

## The good news
Every one of these is fixable — usually faster and cheaper than you'd expect. Start by seeing where you stand: [run a free website audit](/website-audit), or [estimate what better conversion is worth to you](/tools/website-roi-calculator). Then, if you want a hand, [book a free consultation](/contact) — we'll show you the fastest path to a site that actually earns.
```

## Constraints
- Verbatim body; honest (no invented stats — the "3 seconds / nearly half" is well-established general UX research, stated generally, not as a Kinstel-specific metric). Match the existing `BlogPost` shape exactly. Additive only — touch ONLY `src/lib/blog.ts`. No new deps. Do NOT create/stage `organic_tasks`.

## Acceptance criteria
- `npm run build` completes; `/blog/5-signs-your-website-is-costing-you-customers` prerenders (auto from the array); it appears on `/blog` index and in the sitemap (auto). Existing posts unchanged.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-17: blog post — 5 signs your website is costing you customers`. Do NOT push. `git status` — stage only `src/lib/blog.ts`.
- Report: confirm the post was appended + new route prerenders + existing posts untouched, build result, commit hash. Summaries only.
