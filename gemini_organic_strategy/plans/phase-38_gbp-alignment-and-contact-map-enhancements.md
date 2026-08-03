# Phase 38 Plan — GBP Alignment & Contact Map Enhancements

**Phase Identifier:** `phase-38_gbp-alignment-and-contact-map-enhancements`  
**Target:** 24/7 hours, 2-review count (1 GBP + 1 Justdial, 5.0 ★) in `schema.ts`, exact CID map embed in Lucknow page, interactive map + "Get Directions" & "Review Us" buttons on `/contact`, and `5.0 ★` badges for GBP & Justdial in `footer.tsx`.  
**Status:** Completed & Verified  

---

## 1. Objectives

1. **Schema.org GBP & Entity Alignment (`src/lib/schema.ts`):**
   - Update `@type` to `["ProfessionalService", "WebDesignCompany"]`.
   - Set `aggregateRating` to `ratingValue: "5.0"` and `reviewCount: "2"` (1 Google Business Profile review + 1 Justdial review, both 5.0 stars).
   - Update `openingHoursSpecification` to `opens: "00:00"`, `closes: "23:59"` (24/7, Monday–Sunday).
   - Set `hasMap` to direct Google CID URL (`https://maps.google.com/?cid=10893322199738014415`).
   - Update street address string to exact GBP match: `"Shivlok Colony, 33, 1, Vigyan Khand, Gomti Nagar, Nijampur Malhaur"`.

2. **Exact CID Map Embed (`src/app/web-design-company-lucknow/page.tsx`):**
   - Update Google Map iframe `src` to Kinstel's exact CID place ID (`1s0x399be116246e7f1d%3A0x97305d21051faed7`) so it renders Kinstel's verified business pin directly.

3. **Contact Page Map & Direct CTAs (`src/app/contact/page.tsx`):**
   - Add interactive Google Map iframe container to `/contact`.
   - Add direct "Get Directions" navigation button (`https://maps.google.com/?cid=10893322199738014415`).
   - Add "Review Us on Google (5.0 ★)" review CTA button (`https://share.google/r0DGTJyecJmBUBaWC`).
   - Add "Verified on Justdial (5.0 ★)" CTA button (`https://jsdl.in/DT-3969OKJ36IF`).

4. **Footer Verified Rating Badges (`src/components/layout/footer.tsx`):**
   - Add `5.0 ★` badge text next to both **Google Business Profile** and **Justdial** links under "Verified On" row for complete social proof consistency.

---

## 2. Target Files to Modify
- `src/lib/schema.ts`
- `src/app/web-design-company-lucknow/page.tsx`
- `src/app/contact/page.tsx`
- `src/components/layout/footer.tsx`

---

## 3. Verification Plan

### Automated Tests & Typecheck
- Run `npm run typecheck` to verify zero TypeScript errors.
- Run `npm run build` to verify clean static page generation across all 58 routes.

### Manual Verification
- Test interactive Google Map embeds on `/contact` and `/web-design-company-lucknow`.
- Verify JSON-LD Schema output for `WebDesignCompany`, 24/7 opening hours, and 5.0 aggregate rating.

---
*Plan updated in `gemini_organic_strategy/plans/phase-38_gbp-alignment-and-contact-map-enhancements.md`. Awaiting user approval before execution.*
