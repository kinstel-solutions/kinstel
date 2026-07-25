# Phase 16 — FAQ Page (`/faq`) + FAQPage schema (AEO)

**Branch:** `staging` (builds on `83021f3`). Local commits only; do NOT push.
**Goal:** A dedicated `/faq` page — honest, extractable Q&A + `FAQPage` JSON-LD. Closes audit finding A1 (no extractable Q&A for answer engines) and boosts AEO/GEO. Fully ownable content (no placeholders).
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8. (Autonomous loop.)

## Build
- `src/app/faq/page.tsx` (server component, metadata): title `"Frequently Asked Questions"`, description, `alternates:{canonical:"/faq"}`, indexed.
- Render the Q&A as an accessible accordion (reuse `src/components/ui/accordion.tsx`) OR clean styled sections. Include `FAQPage` JSON-LD via the existing `JsonLd` component (reuse the pattern from `src/app/web-design-company-lucknow/page.tsx`) mapping each Q→`Question`/`acceptedAnswer`.
- Reuse design system (Header/Footer, container, headings, accent gold). Contextual links inside answers where natural (to `/quote`, `/platforms`, `/services`, `/credentials`, the blog).
- Wire: add `/faq` to `sitemap.ts` (0.7, monthly) + a "FAQ" link in the footer (Company column).

## Q&A (verbatim — honest, on-brand)
1. **What does Kinstel Solutions do?** — We're a web design, development, and digital marketing studio. We build high-performing websites and custom web platforms, and run the SEO and Google Ads that grow them — design, development, and marketing under one roof.
2. **How much does a website cost?** — It depends on scope — pages, features, and complexity. Simple sites start low; custom, conversion-focused builds and platforms cost more. Use our [quote builder](/quote) for a ballpark, or read our honest [pricing breakdown](/blog/how-much-should-a-website-cost-in-india).
3. **How long does it take?** — Most standard websites go live in about 3–5 working days once content is ready. Larger sites and custom platforms take longer and are scoped up front so you always know the timeline.
4. **What technology do you build with?** — Modern, high-performance code — Next.js, React, and TypeScript — not templates. That means faster sites, better SEO, and a foundation that scales. See [Next.js vs WordPress](/blog/nextjs-vs-wordpress).
5. **Do you work with clients outside India?** — Yes. We've built and marketed sites for businesses in India and abroad (including Australia), and we can quote and invoice in your local currency.
6. **Do you only build websites, or marketing too?** — Both — and that's the point. A website converts; marketing drives the traffic. We do both, so your site doesn't just look good, it actually brings you customers.
7. **Can you build web apps, booking systems, or marketplaces?** — Yes. We build custom [platforms](/platforms) — booking systems, marketplaces, dashboards, and web apps — like the online consultation platform we built for The Blissful Station.
8. **Do you offer ongoing support and maintenance?** — Yes. We offer hosting, maintenance (AMC), and ongoing optimization, so your site keeps working and improving after launch.
9. **Do you provide SEO and Google Ads?** — Yes. We handle technical & on-page SEO, Google Business Profile, and Google Ads management — measured with proper conversion tracking so you see the return.
10. **What makes Kinstel different?** — We're an AI-native studio: a small, senior team that ships premium, custom work fast, handles both the build and the marketing, and backs it with verifiable [credentials](/credentials).
11. **Are you a registered business?** — Yes — a registered entity with verifiable credentials (Udyam MSME, IEC, D-U-N-S®). Rare for a studio our size, and there for your peace of mind.
12. **How do we get started?** — Tell us what you need via our [quote builder](/quote) or [contact page](/contact), and we'll scope it and share the fastest path to launch — the first consultation is free.

## Constraints
- Verbatim answers; honest (all claims true). Reuse accordion + JsonLd + design system; additive; don't touch other pages except footer/sitemap. Internal links as markdown/`<Link>` inside answers where they render cleanly (if using plain accordion text, render links as `<Link>` in JSX).

## Acceptance criteria
- `npm run build` completes; `/faq` prerenders with canonical + valid `FAQPage` JSON-LD (all 12 Q&A); in sitemap; footer links to it.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-16: FAQ page + FAQPage schema (AEO)`. Do NOT push. `git status` — stage only intended source files (never `organic_tasks`).
- Report: files created/changed, that all 12 Q&A + FAQPage schema render, build result, commit hash. Summaries only.
