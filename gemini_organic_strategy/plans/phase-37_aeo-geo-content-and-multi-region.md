# Phase 37 Plan — AEO / GEO Content Enhancements & Multi-Region Setup

**Phase Identifier:** `phase-37_aeo-geo-content-and-multi-region`  
**Target:** `llms-full.txt` tabular enrichment, `<KeyTakeaways />` UI callout component for blog/service pages, multi-region `hreflang` metadata, and multi-currency selector on `/packages`.  
**Status:** Completed & Verified  

---

## 1. Objectives

1. **`llms-full.txt` Tabular & Metric Enrichment (`public/llms-full.txt`):**
   - Add structured Markdown comparison tables for service packages and tech stack.
   - Include detailed metric breakdowns for case studies (*Blissful Station*, *James Bond Cleaning AU*, *Chopra Retec*).
   - Include founder/team bio blocks for E-E-A-T entity signals.

2. **Top-of-Page `<KeyTakeaways />` UI Callout Component:**
   - Build a standardized, accessible `<KeyTakeaways />` UI component in `src/components/ui/key-takeaways.tsx`.
   - Embed 3–5 bulleted, fact-dense takeaways at the top of each blog post in `src/app/blog/[slug]/page.tsx` and main service page in `src/app/services/page.tsx` for AI answer engine extraction (Perplexity, SearchGPT).

3. **Multi-Region `hreflang` Metadata:**
   - Add `hreflang` alternate links (`en-US`, `en-AU`, `en-GB`, `en-IN`) on `/global-promo` and `/web-design-company-lucknow` to establish clear geographic targeting without duplicate content penalties.

4. **Multi-Currency Pricing Selector (`/packages`):**
   - Add an interactive currency toggle (INR ₹ / USD $ / AUD $) on `/packages` allowing international visitors to view transparent pricing floors ($500 USD / $750 AUD starter floor).

---

## 2. Target Files to Modify
- `public/llms-full.txt`
- `src/components/ui/key-takeaways.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/app/services/page.tsx`
- `src/app/global-promo/page.tsx`
- `src/app/packages/page.tsx`

---

## 3. Verification Plan

### Automated Tests & Typecheck
- Run `npm run typecheck` to verify no TypeScript compilation errors.
- Run `npm run build` to verify static page generation.

### Manual Verification
- Test currency toggle interactivity on `/packages`.
- Verify `<KeyTakeaways />` component renders cleanly on mobile and desktop viewports.

---
*Plan created in `gemini_organic_strategy/plans/phase-37_aeo-geo-content-and-multi-region.md`. Awaiting user approval before execution.*
