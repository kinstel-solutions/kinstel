# Phase 36 — Observations & Enhancement Notes

**Phase Identifier:** `phase-36_schema-structured-data-and-local-geo`  
**Execution Date:** August 3, 2026  

---

## Observations Recorded During Phase 36 Execution

1. **`WebApplication` Helper Function Reusability:**
   - *Observation:* Created `createWebApplicationJsonLd` helper function in `src/lib/schema.ts`. This standardizes `browserRequirements`, `offers` (free/tiered), and schema attributes across all current and future lead tools.
   - *Opportunity:* Any future tool built under `/tools/*` can automatically reuse `createWebApplicationJsonLd` in 3 lines of code.

2. **`OfferCatalog` Schema Structure on `/packages`:**
   - *Observation:* Implemented `Service` schema with `hasOfferCatalog` containing structured `Offer` items for Starter Web Suite (₹25,000), Growth Funnel Suite (₹54,000), and Custom SaaS Platform (₹250,000+).
   - *Opportunity:* When multi-currency selector is added in Phase 37, we can dynamically expose USD/AUD price specifications within the JSON-LD schema array.

3. **Google Map Iframe Lazy Loading:**
   - *Observation:* Embedded Google Map iframe uses `loading="lazy"` and `referrerPolicy="no-referrer-when-downgrade"` to prevent LCP/CLS degradation on mobile devices.

---
*Observations file created during Phase 36 execution. To be reviewed after all phases finish.*
