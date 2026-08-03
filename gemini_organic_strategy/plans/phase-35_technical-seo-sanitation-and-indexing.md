# Phase 35 Plan — Technical SEO Sanitation & Indexing Alignment

**Phase Identifier:** `phase-35_technical-seo-sanitation-and-indexing`  
**Target:** DMCA script sanitation, `/pay` indexing metadata alignment, AI crawler rules in `robots.txt`, HTML `<head>` LLM autodiscovery link, and dynamic sitemap `lastModified` timestamps.  
**Status:** Completed & Verified  

---

## 1. Objectives

1. **DMCA Script Sanitation (`src/components/layout/footer.tsx`):**
   - Replace raw HTML `<script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>` in React JSX with Next.js `<Script src="..." strategy="lazyOnload" />` to eliminate hydration warnings and main-thread blocking.

2. **Indexing Metadata Alignment (`src/app/pay/page.tsx`):**
   - Change `robots` metadata in `src/app/pay/page.tsx` to `{ index: false, follow: false }` to strictly match the `Disallow: /pay` rule in `public/robots.txt`.

3. **AI Bot Crawler Directives (`public/robots.txt`):**
   - Add explicit crawler directives for AI search engines: `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Bytespider`, `CCBot`.
   - Set `Allow: /`, `Disallow: /studio`, `Disallow: /pay`, `Disallow: /api/`, and add explicit pointer to `https://www.kinstel.com/llms.txt`.

4. **HTML `<head>` LLM Autodiscovery (`src/app/layout.tsx`):**
   - Add `<link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Site Summary" />` to root layout metadata so AI crawlers automatically detect site capabilities.

5. **Dynamic Sitemap Timestamps (`src/app/sitemap.ts`):**
   - Update `sitemap.ts` to output actual content modification timestamps (`post.date` for blog posts, case study publication/update dates) instead of static `new Date()` for all entries.

---

## 2. Target Files to Modify
- `src/components/layout/footer.tsx`
- `src/app/pay/page.tsx`
- `public/robots.txt`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`

---

## 3. Verification Plan

### Automated Tests & Typecheck
- Run `npm run typecheck` to verify no TypeScript compilation errors.
- Run `npm run build` to verify clean static site generation and zero sitemap/metadata build errors.

### Manual Verification
- Verify `public/robots.txt` output in browser (`http://localhost:3000/robots.txt`).
- Verify `sitemap.xml` output in browser (`http://localhost:3000/sitemap.xml`).
- Check browser console on footer render for zero hydration warnings.

---
*Plan created in `gemini_organic_strategy/plans/phase-35_technical-seo-sanitation-and-indexing.md`. Awaiting user approval before execution.*
