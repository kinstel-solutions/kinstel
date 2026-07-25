# Phase 34 — Plan (AEO Case Study Teardowns & Review Engine)

**Phase:** 34  
**Target:** Case Study Teardowns (*Blissful Station*, *Chopra Retec*, *James Bond AU*) & Review Outreach System  
**Status:** Planned  

---

## 1. Objectives

1. **Publish 3 Deep Technical Case Study Teardowns (`/work/[slug]`):**
   - **The Blissful Station (SaaS Platform):** Full-stack architecture breakdown (Next.js, NestJS, Supabase, WebRTC video, slot availability engine, Razorpay integration).
   - **Chopra Retec Rubber (B2B Industrial):** 10-day rush delivery, RFQ system, PWA features, 95+ PageSpeed score, legacy domain migration.
   - **James Bond Cleaning (Australia):** 17-page custom build, local SEO, 100% ChatGPT AI traffic conversion proof (3 out of 3 converted), and ongoing brand migration protocol.

2. **Systematized Local Review Engine:**
   - Ready-to-send WhatsApp review templates tailored for past clients.
   - GBP primary category sync to `Web Designer`.

3. **Verification:**
   - Run `npm run build` locally in `cwd` to verify static page generation with 0 errors across all case studies.

---

## 2. Target Files to Modify
- `src/lib/case-studies.ts`
- `src/app/work/[slug]/page.tsx`
- `src/app/work/page.tsx`

---

## 3. Verification Plan
- Run `npm run build` to verify `/work/blissful-station`, `/work/chopra-retec`, and `/work/james-bond-cleaning` prerender statically without errors.
