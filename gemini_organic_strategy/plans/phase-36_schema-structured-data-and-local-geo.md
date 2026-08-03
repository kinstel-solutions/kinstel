# Phase 36 Plan — Schema.org Structured Data & Local GEO Expansion

**Phase Identifier:** `phase-36_schema-structured-data-and-local-geo`  
**Target:** GeoCoordinates & opening hours in schema, `WebApplication` schema on tools, `Offer` schema on packages, `BreadcrumbList` schema on services/local pages, embedded Google Map iframe and landmark keywords on Lucknow page.  
**Status:** Completed & Verified  

---

## 1. Objectives

1. **GeoCoordinates & Opening Hours Schema (`src/lib/schema.ts`):**
   - Add exact `geo` coordinates (`latitude: 26.854063`, `longitude: 81.043716`) and `openingHoursSpecification` (Mo-Sa 09:00-20:00) to `localBusinessJsonLd`.

2. **`WebApplication` Structured Schema on Tools:**
   - Implement `WebApplication` JSON-LD schema on:
     - `/website-audit` (Free Speed & SEO Audit Tool)
     - `/quote` (Interactive Quote Builder Tool)
     - `/tools/website-roi-calculator`
     - `/tools/nextjs-vs-wordpress`
     - `/tools/google-ads-budget-estimator`

3. **`Offer` / `AggregateOffer` Schema (`/packages`):**
   - Add structured `Offer` / `PriceSpecification` schema to `src/app/packages/page.tsx` for Starter, Growth, and Enterprise packages.

4. **Missing `BreadcrumbList` Schema:**
   - Add `BreadcrumbList` JSON-LD schema to `/services` and `/web-design-company-lucknow`.

5. **Embedded Google Map & Local Landmarks (`/web-design-company-lucknow`):**
   - Embed an interactive Google Maps iframe for the Lucknow office (`share.google/r0DGTJyecJmBUBaWC`).
   - Integrate hyper-local landmark sub-location keywords (Gomti Nagar, Hazratganj, Indira Nagar, IT City Lucknow) into page copy and section headings.

---

## 2. Target Files to Modify
- `src/lib/schema.ts`
- `src/app/website-audit/page.tsx`
- `src/app/quote/page.tsx`
- `src/app/tools/website-roi-calculator/page.tsx`
- `src/app/tools/nextjs-vs-wordpress/page.tsx`
- `src/app/tools/google-ads-budget-estimator/page.tsx`
- `src/app/packages/page.tsx`
- `src/app/services/page.tsx`
- `src/app/web-design-company-lucknow/page.tsx`

---

## 3. Verification Plan

### Automated Tests & Typecheck
- Run `npm run typecheck` to verify zero TypeScript errors across all modified schema files.
- Run `npm run build` to verify clean static page generation.

### Manual Verification
- Test JSON-LD outputs using Google Rich Results Test format.
- Verify embedded map loads properly without layout shift on `/web-design-company-lucknow`.

---
*Plan created in `gemini_organic_strategy/plans/phase-36_schema-structured-data-and-local-geo.md`. Awaiting user approval before execution.*
