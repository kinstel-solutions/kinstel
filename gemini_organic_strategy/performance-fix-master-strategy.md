# Kinstel Solutions — Performance Fix Master Strategy (Placeholder)

**Location:** `gemini_organic_strategy/performance-fix-master-strategy.md`  
**Status:** Inactive Placeholder (Activation Trigger: User says `perfOn`)  
**Basis:** Core Web Vitals, Image Compression, and Speed Optimization

---

## Executive Overview

This strategy document is a placeholder for all performance, asset compression, font loading, critical CSS, and Core Web Vitals optimizations. Execution of tasks in this file is paused until the user explicitly issues the command **`perfOn`**.

---

## Performance Backlog & Future Tasks

### 1. Asset & Image Compression
- **Raw PNG Compression in `/public/`:**
  - `public/Enviro-ProductListing page.png` (**4.4 MB**) → Compress & convert to `.webp` / `.avif`.
  - `public/Photography-Service Page.png` (**2.4 MB**) → Compress & convert to `.webp` / `.avif`.
  - `public/Singh-Ass-hero.png` (**336 KB**) → Convert to optimized `.webp`.
  - `public/Singh-Ass-thumb.png` (**808 KB**) → Convert to optimized `.webp`.
- **`<Image />` Component Tuning:**
  - Audit `priority` attribute usage on above-the-fold hero images to optimize Largest Contentful Paint (LCP).
  - Verify explicit `sizes` property on responsive image grid items to eliminate layout shifts (CLS).

### 2. Script & Component Optimization
- **Critters CSS Inlining Review:** Inspect inline CSS payload generation and Critters build metrics.
- **Third-Party Script Lazy Loading:** Verify all non-critical third-party widgets (e.g., DMCA badge, analytics) load asynchronously without blocking main-thread execution.

### 3. Font & Bundle Optimization
- **Google Fonts Loading:** Verify Next.js `next/font` configuration for zero FOIT/FOUT font loading.
- **Tree-Shaking & Bundle Splitting:** Review chunk sizes for Lucide icon imports and Shadcn UI primitives.

---
*Placeholder document for performance optimizations. Activates when user says `perfOn`.*
