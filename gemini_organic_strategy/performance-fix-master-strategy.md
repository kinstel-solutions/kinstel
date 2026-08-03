# Kinstel Solutions — Performance Fix Master Strategy (Placeholder)

**Location:** `gemini_organic_strategy/performance-fix-master-strategy.md`  
**Status:** Active Execution (Triggered by User)  
**Basis:** Core Web Vitals, Image Compression, and Speed Optimization

---

## Executive Overview

This strategy document tracks all performance, asset compression, font loading, critical CSS, and Core Web Vitals optimizations.

---

## Active Phase

### Phase 41: Public Assets Image Optimization (WebP / AVIF Compression)
- **File:** `gemini_organic_strategy/plans/phase-41_public-assets-image-optimization.md`
- **Focus:** Converting and compressing 20+ raw PNG files in `public/` (>20 MB total) into high-quality WebP images (~85% quality), reducing total asset payload by 80–90%.
- **Target Files:** `public/Enviro-ProductListing page.png`, `public/Photography-Service Page.png`, `public/social-assets/marketing-creatives/*.png`, `public/Singh-Ass-thumb.png`, `public/social-assets/home-og-image.png`, `public/ababneh-law.png`, `public/advratnasingh.png`, `public/Singh-Ass-hero.png`, `public/advonex.png`, `public/singhLawFirmSiteHome.png`.

---

## Performance Backlog & Future Tasks

### 1. Asset & Image Compression
- **`<Image />` Component Tuning:**
  - Audit `priority` attribute usage on above-the-fold hero images to optimize Largest Contentful Paint (LCP).
  - Verify explicit `sizes` property on responsive image grid items to eliminate layout shifts (CLS).

### 2. Script & Component Optimization
- **Third-Party Script Lazy Loading:** Verify all non-critical third-party widgets load asynchronously without blocking main-thread execution.

### 3. Font & Bundle Optimization
- **Google Fonts Loading:** Verify Next.js `next/font` configuration for zero FOIT/FOUT font loading.
- **Tree-Shaking & Bundle Splitting:** Review chunk sizes for Lucide icon imports and Shadcn UI primitives.

---
*Managed in `gemini_organic_strategy`.*
