# Phase 8 — Blog (infrastructure + first 2 posts)

**Branch:** `staging` (builds on `c738e14`). Local commits only; do NOT push.
**Goal:** Stand up a real blog (site has none — topical-authority + AEO gap) and publish 2 honest, useful, on-strategy posts. Owner said "blog now"; topics are Opus's call.
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8 (post bodies below are verbatim — implement the words, don't rewrite them).

## Build
1. **`src/lib/blog.ts`** — `BlogPost` type + `posts` array. Fields: `slug, title, description, date (ISO), author ("Kinstel Solutions"), tags[], body (markdown string)`. Use the 2 posts below verbatim.
2. **`src/app/blog/page.tsx`** — index: hero + list of post cards (title, date, description, tags, "Read →" → `/blog/<slug>`). metadata title `"Blog"`, description, `canonical: "/blog"`.
3. **`src/app/blog/[slug]/page.tsx`** — dynamic post: `generateStaticParams`; `generateMetadata` (title = post title, description, `canonical: /blog/<slug>`); render title/date/author + the markdown body; `BlogPosting` JSON-LD (headline, datePublished, author Organization, description). 
   - To render markdown: you MAY add `react-markdown` (+ `remark-gfm`) — that's an acceptable dependency — OR use a minimal safe renderer. Either way, render my copy faithfully; do NOT alter the words.
4. Reuse the existing design system (study `about/page.tsx`, `work/[slug]/page.tsx`). Prose should be readable (constrain width, spacing). No layout-system changes.
5. Wire nav/footer/sitemap: add **"Blog"** to `header.tsx` nav + `footer.tsx` (Company column); add `/blog` (0.7) + each `/blog/<slug>` (0.6), monthly, to `sitemap.ts`.

## Posts (verbatim body — markdown)

### Post 1
- slug: `how-much-should-a-website-cost-in-india`
- title: `How Much Should a Website Cost in India? An Honest Breakdown`
- description: `A transparent look at what websites actually cost in India in 2026 — the price bands, what drives them, and why the cheapest option often costs the most.`
- date: `2026-07-24` · tags: [`Pricing`, `Web Design`, `India`]
- body:
```
Ask three agencies for a website quote and you'll get three wildly different numbers — ₹8,000, ₹40,000, ₹2,00,000. So what's the *real* price of a website in India? The honest answer: it depends entirely on what you're actually buying. Here's a transparent breakdown.

## You're not paying for "pages"
Two five-page websites can differ 20× in price and value. What you're really paying for is **design quality, how it's built, how fast it loads, and whether it's engineered to convert visitors into customers**. A cheap template and a hand-coded, conversion-optimised site can look similar in a screenshot — and perform nothing alike.

## Rough price bands (India, 2026)
- **DIY / template (₹0 – 10,000):** Website builders and marketplace templates. Fine for a hobby or a quick placeholder. Slow, generic, hard to rank, and rarely built to convert.
- **Freelancer / small shop (₹10,000 – 30,000):** Usually WordPress + a theme. Gets you online. Quality and support vary widely; performance and SEO are often afterthoughts.
- **Custom, conversion-focused (₹30,000 – 1,00,000+):** Hand-built (modern frameworks like Next.js), fast, mobile-first, tracked, and designed around turning traffic into leads. This is where a website starts paying for itself.
- **Web platforms & apps (₹1,00,000+):** Booking systems, marketplaces, dashboards, custom software — priced by complexity, not pages.

## Why the cheapest option usually costs more
A ₹9,000 site that loads slowly, doesn't rank, and doesn't convert isn't cheap — it's expensive, because it earns you nothing. The real cost of a website isn't the invoice; it's the customers it wins or loses every month. A site that converts even a few extra leads pays for itself many times over.

## What actually drives ROI
- **Speed** — every second of load time costs you visitors.
- **Clarity & conversion design** — does the page guide a visitor to act, or just look pretty?
- **Findability** — technical SEO, structured data, and a Google Business Profile.
- **Measurement** — if you're not tracking leads, you're guessing.

A website is a **conversion tool, not a brochure.** Priced right, it's the cheapest salesperson you'll ever hire.

## How we think about pricing
We price by outcome, not page count — and we're upfront about it. Many clients start with a focused build and grow into ongoing marketing (SEO, Google Ads) once the site proves itself. If you want a straight answer for your specific project, tell us what you're building and we'll scope it honestly.
```

### Post 2
- slug: `nextjs-vs-wordpress`
- title: `Next.js vs WordPress: Which Is Right for Your Business?`
- description: `A practical, no-hype comparison of Next.js and WordPress — the strengths, the trade-offs, and how to choose the right one for your business.`
- date: `2026-07-24` · tags: [`Next.js`, `WordPress`, `Web Development`]
- body:
```
WordPress powers a huge share of the web. Next.js is what a lot of modern, high-performance sites are built on today. Both are good tools — for different jobs. Here's a practical comparison, minus the hype.

## The quick answer
Choose **WordPress** if you need a content-heavy site you'll update daily yourself, on a tight budget, with a plugin for everything. Choose **Next.js** if performance, a premium custom experience, or a real web application matters — and you want a site that's fast and built to last.

## WordPress — strengths & trade-offs
**Strengths:** enormous plugin ecosystem, familiar dashboard, cheap to start, easy to find people who know it, great for blogs and simple brochure sites.
**Trade-offs:** performance often suffers under plugin bloat; security and maintenance are ongoing chores; truly custom design/functionality means fighting the theme system; page speed (a real ranking and conversion factor) can be hard to keep high.

## Next.js — strengths & trade-offs
**Strengths:** exceptional performance (server-rendered, edge-delivered), fully custom design with no theme constraints, first-class for interactive apps and platforms, excellent SEO fundamentals, modern security posture.
**Trade-offs:** needs developers to build and change (not a click-together dashboard); higher upfront craft; overkill for a simple site you'll edit hourly yourself.

## How to choose
- **Pick WordPress if:** you publish content constantly and want to self-edit, budget is the top constraint, and off-the-shelf features are enough.
- **Pick Next.js if:** speed and a premium, on-brand experience matter; you're building something interactive (booking, marketplace, dashboard); or you want a site engineered to convert and to last.

## Our take
We build in Next.js because most businesses we work with want speed, a distinctive experience, and something that can grow into a real platform — not a template everyone else is using. But the right answer is the one that fits *your* goals, budget, and how you'll run the site. If you're not sure, that's exactly the conversation to have before anyone writes a line of code.
```

## Constraints
- Bodies are verbatim (my copy). Render faithfully. No invented stats/claims beyond what's written.
- Reuse components; additive only (other pages untouched apart from header/footer/sitemap). If adding `react-markdown`, keep it minimal.

## Acceptance criteria
- `npm run build` completes; `/blog` + both `/blog/<slug>` prerender; each has canonical + `BlogPosting` JSON-LD; nav/footer/sitemap updated.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-8: add blog (infra + first 2 posts)`. Do NOT push. `git status` first — stage only intended source files (+ package.json/lock if you added react-markdown).
- Report: files created/changed, whether you added a markdown dep, routes generated, build result, commit hash. Summaries only.
