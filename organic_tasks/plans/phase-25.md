# Phase 25 — Blog Post: "Google Ads for Small Businesses in India"

**Branch:** `staging` (builds on `2893a9e`). Local commits only; do NOT push.
**Goal:** 5th blog post tied to Kinstel's ads-management revenue engine. Funnels to the Ads Budget Estimator tool + services. Minimal: append one entry to `src/lib/blog.ts`.
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8. (Autonomous loop.)

## Task
Append ONE `BlogPost` to the `posts` array in `src/lib/blog.ts` (match existing shape). Touch ONLY `src/lib/blog.ts`. Verbatim body.

- slug: `google-ads-for-small-businesses-india`
- title: `Google Ads for Small Businesses in India: A Practical Starter Guide`
- description: `How small businesses in India can use Google Ads to get real leads without wasting money — budgets, targeting, landing pages, and the mistakes to avoid.`
- date: `2026-07-24`
- author: `Kinstel Solutions`
- tags: `["Google Ads", "PPC", "Small Business"]`
- body (verbatim markdown):
```
Done right, Google Ads is one of the fastest ways for a small business in India to get in front of people actively searching for what you sell. Done wrong, it's one of the fastest ways to burn cash. Here's the practical starter guide.

## Why Google Ads works for small businesses
Unlike social ads that interrupt people, Search ads reach people at the exact moment they're *looking* — "web designer in Lucknow," "AC repair near me," "CA for GST filing." That intent is why a well-run search campaign can convert far better than most other channels.

## Start with intent, not reach
Begin with **Search** campaigns (not Display or broad awareness). Target the specific, high-intent phrases your customers actually type, use tight match types, and add negative keywords aggressively so you don't pay for irrelevant clicks. Reach and "impressions" feel nice; qualified clicks pay the bills.

## Budget: start small, measure, scale
You don't need a big budget to start — you need a *measured* one. Begin modestly, run for a couple of weeks, and look at cost per lead, not just cost per click. Scale what works; cut what doesn't. Not sure what to budget? Our [Ads Budget Estimator](/tools/google-ads-budget-estimator) gives you a ballpark for your city and goal.

## The landing page matters more than the ad
Most wasted ad spend isn't the ad — it's where it sends people. A fast, focused landing page with one clear action converts a far higher share of the clicks you already paid for. This is exactly why we build the conversion page *and* run the traffic: the two only work together. (On tuned funnels we regularly see 15–40% of clicks convert.)

## Track conversions — or you're guessing
Before you spend a rupee, set up conversion tracking (form submits, calls, WhatsApp clicks). Without it you can't tell which keywords make money, so you optimise blind and waste budget. With it, every rupee teaches you something.

## Common mistakes that waste money
- Sending ads to your homepage instead of a focused landing page.
- No negative keywords (paying for "free," "jobs," "salary" searches).
- Judging by clicks instead of leads/sales.
- Turning campaigns off too soon — before there's enough data to learn from.

## Want it run for you?
Google Ads rewards steady, measured management. If you'd rather not learn it the expensive way, [see our marketing services](/services) — we handle campaigns end to end (from ₹10,000/mo), or [get in touch](/contact) for a quick, honest assessment.
```

## Constraints
- Verbatim body; honest (the 15–40% is Kinstel's real figure); touch ONLY `src/lib/blog.ts`; match existing shape; no new deps; do NOT create/stage `organic_tasks`.

## Acceptance criteria
- `npm run build` completes; `/blog/google-ads-for-small-businesses-india` prerenders (+ its per-post OG auto-generates); appears on `/blog` + sitemap; existing posts unchanged.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-25: blog post — Google Ads for small businesses in India`. Do NOT push. Stage only `src/lib/blog.ts`.
- Report: confirm appended + route prerenders + others unchanged, build result, commit hash. Summaries only.
