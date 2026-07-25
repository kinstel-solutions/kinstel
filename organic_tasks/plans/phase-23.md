# Phase 23 — "How to Choose / Compare Your Options" page (`/compare`)

**Branch:** `staging` (builds on `8c38243`). Local commits only; do NOT push.
**Goal:** An honest, balanced comparison page for high-intent buyers deciding how to get a website built. Factual (not trashing alternatives — acknowledges when DIY/freelancer is the right call). Conversion + SEO asset.
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8. (Autonomous loop.)

## Build
- `src/app/compare/page.tsx` (server component, metadata): title `"How to Choose a Web Design Partner — Compare Your Options"`, description, `alternates:{canonical:"/compare"}`, indexed. Header, hero, the comparison table, a "which is right for you" guide, honest closing note, CTA, Footer. Reuse `src/components/ui/table.tsx` + design system.
- Wire: add `/compare` to `sitemap.ts` (0.6, monthly) + a "Compare Options" link in the footer.

## Hero
- H1: `How to Choose the Right Way to Build Your Website`
- Sub: `Template, freelancer, agency, or a studio like us? Here's an honest comparison to help you pick what actually fits your goals and budget — even if that isn't us.`

## Comparison table (columns: DIY / Template · Freelancer · Typical Agency · Kinstel)
Rows (keep cells short, factual, fair):
- **Upfront cost** — DIY: Lowest · Freelancer: Low · Agency: High · Kinstel: Mid (value)
- **Design & code** — DIY: Generic template · Freelancer: Varies widely · Agency: Custom · Kinstel: Custom, modern code (Next.js/React)
- **Performance & SEO** — DIY: Often weak · Freelancer: Varies · Agency: Usually good · Kinstel: Strong, built-in
- **Marketing (SEO/Ads) included** — DIY: No · Freelancer: Rarely · Agency: Sometimes (separate team) · Kinstel: Yes — same team builds & markets
- **Turnaround** — DIY: Instant (you do it) · Freelancer: Varies · Agency: Often slow · Kinstel: Fast (days for standard sites)
- **Ongoing support** — DIY: You handle it · Freelancer: Depends · Agency: Yes (premium) · Kinstel: Yes (hosting + AMC)
- **Accountability** — DIY: You · Freelancer: One individual · Agency: Company · Kinstel: Registered business + verifiable credentials

## "Which is right for you?" (honest guide — cards or list)
- **A template/DIY builder** if it's a hobby, a temporary page, or the budget is near-zero and you'll maintain it yourself.
- **A freelancer** if you need a simple site cheaply and can manage the project and follow-ups yourself.
- **A large agency** if you're an enterprise with the budget and process for it.
- **A studio like Kinstel** if you want custom, high-performing work *and* the marketing to grow it — delivered fast by one accountable team, at fair value.

## Closing note + CTA
- Note: `The best choice depends on your goals and budget — and sometimes a simpler option genuinely is enough. If you want a straight recommendation for your situation, just ask.`
- CTA: SmartCtaButton (phone `+919889988408`, email `contact@kinstel.com`, label "Get an Honest Recommendation") + a link to the [quote builder](/quote).

## Constraints
- Honest/fair (no unfair claims about competitors; acknowledge alternatives). Reuse Table + design system; additive (only new page + footer + sitemap); no new deps; do NOT create/stage `organic_tasks`. Make the table responsive (horizontal scroll on mobile).

## Acceptance criteria
- `npm run build` completes; `/compare` prerenders (canonical); table + guide render; responsive; in sitemap; footer links to it.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-23: compare/how-to-choose page`. Do NOT push. `git status` — stage only intended source files.
- Report: files created/changed, build result, commit hash. Summaries only.
