# Phase 35 — Observations & Enhancement Notes

**Phase:** `phase-35_technical-seo-sanitation-and-indexing`  
**Execution Date:** August 3, 2026  

---

## Observations Recorded During Phase 35 Execution

1. **`CaseStudy` Interface Missing Date Field:**
   - *Observation:* While `posts` in `src/lib/blog.ts` has a `date` string (allowing `new Date(post.date)` in `sitemap.ts`), `CaseStudy` objects in `src/lib/case-studies.ts` lack `publishedAt` / `updatedAt` date fields.
   - *Opportunity:* Add `publishedAt` and `updatedAt` fields to `CaseStudy` interface in `src/lib/case-studies.ts` so dynamic sitemap timestamps for portfolio items are also 100% accurate down to the date of launch.

2. **Next.js `<Script>` Strategy in Footer:**
   - *Observation:* DMCA badge script uses `strategy="lazyOnload"`. Lazy loading non-critical external scripts prevents main-thread blocking during initial layout render.

3. **Robots AI User-Agents Coverage:**
   - *Observation:* Added `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Bytespider`, `CCBot` explicit allow rules pointing to `/llms.txt`.

---
*Observations file created during Phase 35 execution. To be reviewed after all phases finish.*
