# Reviews & Google Places API Integration Master Strategy

**Document Status:** Pending User Review  
**Root Path:** `gemini_organic_strategy/reviews-and-gmb-api-master-strategy.md`  

---

## Executive Overview

This strategy outlines the architecture for integrating live reviews, real-time Google Business Profile entity data (Google Places API New), and multi-directory review aggregation across **Google**, **Justdial**, **Clutch**, **TechBehemoths**, **GoodFirms**, and **DesignRush**.

By automating review synchronization, Kinstel Solutions will display verified 5-star social proof, customer review carousels, and dynamic Schema.org `AggregateRating` data without requiring manual code updates whenever new client reviews are published.

---

## 🎯 Strategic Objectives

1. **Automated Live Review Sync:**  
   Sync live Google reviews, star ratings, and review counts using Next.js Incremental Static Regeneration (ISR with 24h revalidation window).

2. **Multi-Directory Review Engine:**  
   Aggregate ratings and review tallies across Google, Justdial, Clutch, TechBehemoths, GoodFirms, and DesignRush into a unified data hub (`src/lib/reviews-engine.ts`).

3. **High-Converting UI Components:**  
   - Build a `<MultiPlatformTrustBar />` showcasing verified badges across all 6 B2B directories.
   - Build a `<GoogleReviewsCarousel />` ("Wall of Love") rendering real customer quotes, photos, and star ratings on key landing pages.

4. **Dynamic Schema.org Sync:**  
   Dynamically populate `aggregateRating` in `src/lib/schema.ts` based on real-time combined totals across verified directory profiles.

---

## 🗺️ Phased Roadmap

### Phase 39: Google Places API & Multi-Directory Engine Setup
- **Scope:**
  1. Set up Next.js API route (`src/app/api/google-places/route.ts`) to fetch live rating, total user review count, and top 5-star review snippets via Google Places API (New).
  2. Build `src/lib/reviews-engine.ts` to aggregate Google, Justdial, Clutch, TechBehemoths, GoodFirms, and DesignRush ratings into a weighted combined total.
  3. Wire dynamic ratings into `localBusinessJsonLd` in `src/lib/schema.ts`.
- **Target Files:**
  - `src/app/api/google-places/route.ts`
  - `src/lib/reviews-engine.ts`
  - `src/lib/schema.ts`

### Phase 40: Multi-Platform Trust Bar & Live Review Carousel Components
- **Scope:**
  1. Build accessible `<MultiPlatformTrustBar />` component in `src/components/ui/multi-platform-trust-bar.tsx` displaying live ratings for Google (5.0 ★), Justdial (5.0 ★), Clutch, TechBehemoths, DesignRush, and GoodFirms.
  2. Build `<GoogleReviewsCarousel />` component in `src/components/sections/google-reviews-carousel.tsx` with reviewer avatars, star badges, and text quotes.
  3. Embed components on `/` (Homepage), `/contact`, `/services`, and `/web-design-company-lucknow`.
- **Target Files:**
  - `src/components/ui/multi-platform-trust-bar.tsx`
  - `src/components/sections/google-reviews-carousel.tsx`
  - `src/app/page.tsx`
  - `src/app/contact/page.tsx`
  - `src/app/services/page.tsx`
  - `src/app/web-design-company-lucknow/page.tsx`

---

## 🔒 API Security & Rate Limits

- **Caching SLA:** Use Next.js 24-hour server-side caching (`next: { revalidate: 86400 }`) so Places API endpoints are only called once per day, staying well under Google Cloud's $200/month free tier credit.
- **API Key Masking:** Store `GOOGLE_PLACES_API_KEY` securely in `.env.local` / Vercel environment variables (never exposed in client-side JS bundles).

---
*Strategy file saved in `gemini_organic_strategy/reviews-and-gmb-api-master-strategy.md`. To be executed when user approves.*
