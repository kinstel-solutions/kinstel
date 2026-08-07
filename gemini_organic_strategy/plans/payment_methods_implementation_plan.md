# Implementation Plan: `/payment-methods` Dedicated Page

Create a high-converting, SEO/AEO/GEO-optimized `/payment-methods` page for Kinstel Solutions. This page displays all regional payment options (USD, GBP, EUR, AUD, CAD, INR) directly in the DOM for full search engine & AI bot indexability, with smooth anchor navigation and 1-click copy functionality for clients.

## Key Architectural Decisions

1. **Native URL Routing (`/payment-methods`)**: Feels local to clients in Australia, US, UK, EU, or Canada without signaling offshore distance.
2. **Full DOM Crawlable Architecture (SEO/AEO/GEO)**: All country cards and FAQs are rendered directly in static HTML (no hidden tabs or client-only rendering) so Google, Bing, Perplexity, ChatGPT, and Claude can crawl every detail.
3. **Smooth Scroll & Sticky Region Bar**: Top region pills (`🇺🇸 USD (US)`, `🇬🇧 GBP (UK)`, `🇪🇺 EUR (EU)`, `🇦🇺 AUD (AU)`, `🇨🇦 CAD`, `🇮🇳 INR`) smoothly scroll the user to the exact country card.
4. **Interactive 1-Click Copy Buttons**: Each bank detail field (Routing, Account, IBAN, Sort Code, BSB) includes a 1-click copy button with instant visual confirmation ("Copied!").

---

## Task List & Execution Progress

- [x] Task 1: Create `src/app/payment-methods/components/bank-details-cards.tsx` (Interactive Region Pills & Bank Cards)
- [x] Task 2: Create `src/app/payment-methods/page.tsx` (Server Page with Hero, Security Grid, FAQ & Schema)
- [x] Task 3: Update `src/app/sitemap.ts` to include `/payment-methods`
- [x] Task 4: Update `src/app/pay/page.tsx` with callout link to `/payment-methods`
- [x] Task 5: Update `src/components/layout/footer.tsx` with link to `/payment-methods`
- [x] Task 6: TypeScript & Verification Complete
