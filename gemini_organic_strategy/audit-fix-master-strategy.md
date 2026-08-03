# Kinstel Solutions — Audit Fix Master Strategy & Roadmap

**Location:** `gemini_organic_strategy/audit-fix-master-strategy.md`  
**Status:** Active Focus  
**Basis:** Consolidated SEO, GEO, and Content Audit (`seo-geo-content-audit-report-03082026.md`)

---

## Executive Overview

This document defines the master strategy and phased execution roadmap for resolving all technical SEO, Schema.org structured data, GEO (Generative Engine Optimization), AEO (Answer Engine Optimization), Local SEO, and Global B2B expansion recommendations. 

All performance-related tasks (image compression, font loading, critical CSS, bundle optimization) are deferred until the user explicitly activates `perfOn`, and are tracked in `gemini_organic_strategy/performance-fix-master-strategy.md`.

---

## Phased Master Execution Plan

### Phase 35: Technical SEO Sanitation & Indexing Alignment
- **File:** `gemini_organic_strategy/plans/phase-35_technical-seo-sanitation-and-indexing.md`
- **Focus:** Crawlability, indexing alignment, DMCA script sanitation, AI bot crawler rules in `robots.txt`, HTML `<head>` LLM autodiscovery, and dynamic sitemap timestamping.
- **Target Files:**
  - `src/components/layout/footer.tsx`
  - `src/app/pay/page.tsx`
  - `public/robots.txt`
  - `src/app/layout.tsx`
  - `src/app/sitemap.ts`

### Phase 36: Schema.org Structured Data & Local GEO Expansion
- **File:** `gemini_organic_strategy/plans/phase-36_schema-structured-data-and-local-geo.md`
- **Focus:** Adding `GeoCoordinates` (`latitude: 26.854063`, `longitude: 81.043716`) & `openingHoursSpecification` to `LocalBusiness` schema, `WebApplication` schema on interactive tools, `Offer` schema on packages, `BreadcrumbList` schema on services/local pages, embedded Google Map iframe and landmark keywords on `/web-design-company-lucknow`.
- **Target Files:**
  - `src/lib/schema.ts`
  - `src/app/website-audit/page.tsx`
  - `src/app/quote/page.tsx`
  - `src/app/tools/website-roi-calculator/page.tsx`
  - `src/app/tools/nextjs-vs-wordpress/page.tsx`
  - `src/app/tools/google-ads-budget-estimator/page.tsx`
  - `src/app/packages/page.tsx`
  - `src/app/services/page.tsx`
  - `src/app/web-design-company-lucknow/page.tsx`

### Phase 37: AEO / GEO Content Enhancements & Multi-Region Setup
- **File:** `gemini_organic_strategy/plans/phase-37_aeo-geo-content-and-multi-region.md`
- **Focus:** Updating `public/llms-full.txt` with structured comparison tables & case study metrics, creating a standardized `<KeyTakeaways />` UI callout component for blog posts and service pages, adding multi-region `hreflang` metadata (`en-US`, `en-AU`, `en-GB`, `en-IN`), and adding dynamic USD / AUD / INR multi-currency display on `/packages`.
- **Target Files:**
  - `public/llms-full.txt`
  - `src/components/ui/key-takeaways.tsx`
  - `src/app/blog/[slug]/page.tsx`
  - `src/app/services/page.tsx`
  - `src/app/global-promo/page.tsx`
### Phase 38: GBP Alignment & Contact Map Enhancements
- **File:** `gemini_organic_strategy/plans/phase-38_gbp-alignment-and-contact-map-enhancements.md`
- **Focus:** 24/7 hours & 1-review count alignment in `schema.ts`, exact CID map embed in Lucknow page, interactive map + "Get Directions" & "Review Us" buttons on `/contact`, and `5.0 ★` badge in `footer.tsx`.
- **Target Files:**
  - `src/lib/schema.ts`
  - `src/app/web-design-company-lucknow/page.tsx`
  - `src/app/contact/page.tsx`
  - `src/components/layout/footer.tsx`

### Phase 42: Brand Name & Meta Consistency Audit
- **File:** `gemini_organic_strategy/plans/phase-42_brand-name-and-meta-consistency-audit.md`
- **Focus:** Adding "Kinstel Solutions" / "Kinstel" to all meta descriptions, OpenGraph tags, and tool metadata where it was missing.
- **Target Files:**
  - `src/app/website-audit/page.tsx`
  - `src/app/services/page.tsx`
  - `src/app/tools/page.tsx`
  - `src/app/tools/google-ads-budget-estimator/page.tsx`
  - `src/app/tools/nextjs-vs-wordpress/page.tsx`
  - `src/app/tools/website-roi-calculator/page.tsx`
  - `src/app/blog/[slug]/page.tsx`

---
*Strategy managed in `gemini_organic_strategy`.*

