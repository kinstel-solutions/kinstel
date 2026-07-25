# Phase 1 — Structured Data (JSON-LD)

**Branch:** `staging` (worktree, builds on Phase 0 commit `686b91a`). Local commits only; do NOT push.
**Goal:** Add the schema the site currently has zero of — the biggest entity-clarity/AEO/local lever. No copy/positioning changes.
**Implementer:** Sonnet 5. **Planner/reviewer:** Opus 4.8.

## Approach
Create ONE reusable server component that emits `<script type="application/ld+json">`, then wire the right schema onto the right pages. Use the site's REAL data — do not invent numbers or addresses.

### 1. Reusable component
- `src/components/seo/json-ld.tsx` — a server component taking a `data` object (or array) prop and rendering `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />`. Must be safe to render multiple times per page.

### 2. Organization + WebSite (sitewide)
Add to `src/app/layout.tsx` (inside `<body>`, via the component) an `Organization` node:
- `@type: "Organization"`, `name: "Kinstel Solutions"`, `url: "https://www.kinstel.com"`, `logo: "https://www.kinstel.com/android-chrome-512x512.png"`.
- `sameAs`: `["https://www.linkedin.com/company/kinstel", "https://x.com/Hi4mKinstel"]`.
- `identifier`: array of `PropertyValue` for **Udyam** `UDYAM-UP-50-0230220`, **IEC** `HLCPS8014Q`, **D-U-N-S** `77-197-4415` (use `propertyID` + `value`).
- `contactPoint`: telephone `+91-98899-88408`, email `contact@kinstel.com`, `contactType: "customer service"`.
- Also add a `WebSite` node (`url`, `name`).

### 3. LocalBusiness (home + contact)
Add a `LocalBusiness` (or `ProfessionalService`) node on `src/app/page.tsx` and `src/app/contact/page.tsx`:
- **Read `src/app/contact/page.tsx` and `src/components/layout/footer.tsx` first and reuse the EXACT postal address / phone / email found there** (NAP consistency is the whole point — do not paraphrase). Registrations are in the footer.
- Include `address` (PostalAddress: street, locality Lucknow, region Uttar Pradesh, postalCode, country IN), `telephone`, `email`, `areaServed` (Lucknow + India), `priceRange: "₹₹"`, `url`, `image` (the OG route or logo).
- If you cannot find precise lat/long, OMIT `geo` rather than guessing.

### 4. Service (service/vertical pages)
Add a `Service` node on `services`, `web-design-company-lucknow`, `global`, `law-firm-marketing`:
- `serviceType` (e.g. "Web Design & Development", "Local SEO & Google Ads", "Law Firm Website Design"), `provider` referencing the Organization (`{"@type":"Organization","name":"Kinstel Solutions"}`), `areaServed`.

### 5. FAQPage (pages that already have FAQ data)
These pages have existing FAQ arrays — reuse them, don't rewrite: `web-design-company-lucknow`, `global`, `global-promo`, `offers/knsl052526`.
- Read each page's FAQ data array and emit a `FAQPage` node whose `mainEntity` maps each item to `{ "@type":"Question", name: <q>, acceptedAnswer: { "@type":"Answer", text: <a> } }`.
- Strip any HTML/JSX from answer text (plain text only).

### 6. (Optional, nice-to-have) BreadcrumbList
Only if low-risk: add `BreadcrumbList` on the money pages (`web-design-company-lucknow`, `services`, `packages`, `global`). Skip if it complicates client/server boundaries.

## Constraints
- **Real data only.** Reuse NAP/registrations/FAQ text already in the repo. No fabricated stats, addresses, or reviews.
- Do NOT add `AggregateRating`/`Review` schema (no verified reviews exist yet — would be false).
- Client-component pages (e.g. `packages`) can host JSON-LD via their `layout.tsx` server wrapper if needed.
- Do NOT touch: canonical/host/titles/OG (Phase 0, done), stats/law-page copy (Phase 2), analytics/headers (Phase 3).

## Acceptance criteria
- `npm run build` completes.
- View-source (or grep the built output) shows valid `Organization`, `LocalBusiness`, `Service`, and `FAQPage` JSON-LD on the relevant pages.
- JSON is valid (no trailing commas, proper escaping) — ideally note that it should be pasted into Google Rich Results Test post-merge.
- NAP in schema matches the on-site NAP exactly.

## Deliverable
- Implement, run build, then **commit to `staging`**:
  `phase-1: structured data (Organization, LocalBusiness, Service, FAQPage JSON-LD)`
  Do NOT push.
- Report back: files changed + which schema types on which pages, the exact NAP used (so it can be verified against the site), build result, anything skipped/uncertain, deviations, commit hash. Summaries only, no full file dumps.
