# Phase 7 — Case Studies (`/work` index + `/work/[slug]`)

**Branch:** `staging` (builds on `5fdfed9`). Local commits only; do NOT push.
**Goal:** Real, credible case studies from actual clients. Narratives are HONEST/qualitative (true from the project scope); quantitative metrics are clearly-placeholder pending real data (owner will supply). Reuse existing images in `public/portfolio-imgs/`.
**Implementer:** Sonnet 5. **Copy/data by:** Opus 4.8.

## Build
1. **`src/lib/case-studies.ts`** — export an array `caseStudies` of objects with fields: `slug, client, industry, location, image, liveUrl, summary, challenge, approach[] , results[], tech[], testimonial{quote, author}`. Data below (use verbatim).
2. **`src/app/work/page.tsx`** — index page: hero + a grid of case-study cards (image, client, industry, summary, "Read case study →" linking to `/work/<slug>`). `metadata` title `"Case Studies"`, description, `canonical: "/work"`.
3. **`src/app/work/[slug]/page.tsx`** — dynamic case-study page. `generateStaticParams()` from `caseStudies`; `generateMetadata()` per study (title = `<client> Case Study`, description = summary, `canonical: "/work/<slug>"`). Layout: Header, hero (client + industry + location + summary + live-site link), Challenge, Our Approach (checklist), Results (list; render placeholder items plainly), Tech (badges), testimonial (if present), CTA, Footer. Add a `Service`-or-`CreativeWork` JsonLd is optional — a simple `BreadcrumbList` is fine.
4. Reuse the existing design system (study `about/page.tsx`, `platforms/page.tsx`). No new deps.
5. Wire nav + footer + sitemap: add **"Work"** (or "Case Studies") to header nav + footer; add `/work` and each `/work/<slug>` to `sitemap.ts` (index 0.7, studies 0.6, monthly).

## Case-study data (verbatim; 4 studies)

### 1) slug: `blissful-station`
- client: `The Blissful Station` · industry: `Mental Health / Telehealth` · location: `India`
- image: `/portfolio-imgs/blissfulStation.webp` · liveUrl: `https://www.theblissfulstation.com/`
- summary: `A complete online consultation & booking platform for a mental-health practice — designed and built end to end.`
- challenge: `A growing mental-health practice needed to move online — letting clients discover practitioners, book online or in-clinic, pay upfront, and consult securely — without stitching together a dozen third-party tools.`
- approach: [`Practitioner profiles, discovery & category filtering`, `Slot-based online + in-clinic booking with pre-payment`, `Secure in-platform video consultations (no third-party redirects)`, `Client & practitioner dashboards`, `Admin panel with verification & financial tracking`]
- results: [`Launched as a full custom platform — engineered, not templated`, `Built on a modern, scalable stack ready for marketplace growth`, `[Metrics pending — practitioners onboarded / bookings to be added]`]
- tech: [`Next.js`, `React`, `Node / NestJS`, `Supabase`, `Secure Video`]
- testimonial: { quote: `[Client testimonial to be added]`, author: `The Blissful Station` }

### 2) slug: `james-bond-cleaning`
- client: `James Bond Cleaning` · industry: `Service Business (Cleaning)` · location: `Queensland, Australia`
- image: `/portfolio-imgs/jamesbond.webp` · liveUrl: `https://jamesbondcleaning.au`
- summary: `A conversion-focused website plus ongoing SEO for an Australian cleaning business.`
- challenge: `An Australian cleaning business needed a professional, lead-generating website and organic visibility in a competitive local market.`
- approach: [`17-page conversion-focused site (services, service areas, booking, blog)`, `Two-stage RFQ lead form + WhatsApp & call widgets`, `Custom logo design and hero video`, `Ongoing SEO & Google Business Profile management`]
- results: [`Full lead-generation site live`, `Ongoing monthly SEO + GBP retainer`, `[Metrics pending — ranking & lead growth to be added]`]
- tech: [`Next.js`, `React`, `Technical SEO`, `GBP`]
- testimonial: { quote: `[Client testimonial to be added]`, author: `James Bond Cleaning` }

### 3) slug: `chopra-retec`
- client: `Chopra Retec Rubber Products` · industry: `B2B Manufacturing` · location: `Lucknow, India`
- image: `/portfolio-imgs/chopraretec.webp` · liveUrl: `https://chopraretec.com`
- summary: `A premium B2B web presence for an established rubber-products manufacturer.`
- challenge: `An established manufacturer needed an enterprise-grade B2B presence to match its scale — with a proper enquiry pipeline and a clean migration off a legacy domain.`
- approach: [`Multi-page B2B site with 24+ content sections`, `Advanced RFQ (request-for-quote) system`, `Progressive Web App`, `Global edge deployment + legacy domain & SSL migration`, `Technical SEO`]
- results: [`Premium, enterprise-scale B2B presence live`, `Recurring managed hosting & maintenance`, `[Metrics pending — enquiry & traffic data to be added]`]
- tech: [`Next.js`, `PWA`, `Edge Deployment`]
- testimonial: { quote: `[Client testimonial to be added]`, author: `Chopra Retec` }

### 4) slug: `edgrowth`
- client: `EdGrowth Consultants` · industry: `Education Consulting` · location: `Lucknow, India`
- image: `/portfolio-imgs/edgrowth.webp` · liveUrl: `https://www.edgrowth.info/`
- summary: `A fast, modern website plus a Google Ads engine for an education consultancy.`
- challenge: `An education consultancy needed a credible online presence and a steady flow of qualified student enquiries.`
- approach: [`Fast, modern Next.js site with light/dark themes`, `Custom enquiry form`, `Google Ads management (rolling monthly retainer)`, `Conversion tracking & analytics`]
- results: [`Live site + active Google Ads lead engine`, `Ongoing ads-management retainer`, `[Metrics pending — leads & cost-per-lead to be added]`]
- tech: [`Next.js`, `GA4`, `Google Ads`]
- testimonial: { quote: `[Client testimonial to be added]`, author: `EdGrowth Consultants` }

## Constraints
- Narratives above are HONEST (true to project scope). Do NOT invent specific numbers — the `[... pending]` results items stay as written (owner supplies real metrics at endgame). Render them as normal list items (they read as "coming soon" honestly, not as fake stats).
- Testimonial placeholders render only if you make them visually clearly a placeholder OR simply omit the testimonial block when the quote starts with `[`. **Prefer: omit/hide the testimonial block when quote starts with `[`** so no fake quote shows.
- Reuse components; no new UI libs; additive only (other pages untouched apart from header/footer/sitemap).

## Acceptance criteria
- `npm run build` completes; `/work` + all 4 `/work/<slug>` prerender (generateStaticParams); each has its own canonical + title; all in sitemap; nav + footer link to `/work`.
- Placeholder metrics render honestly; no fake testimonial quotes shown.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-7: add case studies (/work index + dynamic studies) + nav/footer/sitemap`. Do NOT push. `git status` first — stage only intended source files.
- Report: files created/changed, routes generated, build result, commit hash, how placeholder metrics/testimonials were handled. Summaries only.
