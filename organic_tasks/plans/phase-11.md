# Phase 11 — Interactive Quote Builder (`/quote`)

**Branch:** `staging` (builds on `876d377`). Local commits only; do NOT push.
**Goal:** A guided, low-friction quote flow. Behind the scenes it uses the à-la-carte rates to compute an estimate, but it presents a **soft "starting from" RANGE** (never the full itemized price list — owner: "too much upfront drives them away; we upsell later"). Captures the lead → book a call. Idea #2.
**Implementer:** Sonnet 5. **Design/pricing by:** Opus 4.8.

## Build
- `src/app/quote/page.tsx` (server component, metadata): title `"Get a Quote — Website & Growth Pricing"`, description, `canonical:"/quote"`. Indexed. Header, short hero, `<QuoteBuilder/>`, Footer.
- `src/components/tools/quote-builder.tsx` ('use client'): a multi-step wizard. Reuse the design system (Cards, Badge, Button, RadioGroup/Checkbox from `src/components/ui`, accent gold). Progress indicator. Minimal fields per step.
- `src/lib/quote-pricing.ts`: the pricing map + estimate function (below).
- Lead: new `submitQuoteLead` action in `src/app/actions.ts` (reuse the Resend pattern from `submitAuditLead`/`submitInquiryAction`) + a `src/emails/quote-lead-notification-email.tsx` template (include all selections + computed range). Fire `event({action:'generate_lead', category:'tool', label:'quote-builder'})`.
- Wire: add `/quote` to `sitemap.ts` (0.8, monthly) + a "Get a Quote" link in the footer (header CTA optional — your judgment, don't crowd).

## Flow (keep it to ~3–4 short steps)
**Step 1 — "What do you need?"** (cards, single-select): `A new website` · `A web platform or app` (booking / marketplace / dashboard) · `Marketing & growth` (SEO / Google Ads) · `Not sure — a mix`.

**Step 2 — scope (branches on Step 1):**
- *Website:* size (single-select): `Landing page` · `Small (3–5 pages)` · `Standard (6–10 pages)` · `Large (10+ pages)`. Add-ons (multi toggle, NO prices shown): `Logo & branding`, `Blog`, `Booking / enquiry form`, `E-commerce`, `Custom animations`, `Video`, `SEO setup`, `Hosting`. Timeline: `Standard` · `Rush (10-day)`.
- *Platform/app:* type (booking / marketplace / dashboard / other) + a note that platforms are scoped individually. (No slider — goes to a "let's scope it" result.)
- *Marketing:* which (SEO+GBP / Google Ads / both).
- *Not sure:* skip to contact; result = "let's talk".

**Step 3 — Contact:** name, business name, email, WhatsApp/phone (optional), "How did you find us?".

**Result screen:**
- *Website:* show **"Estimated starting range: ₹{low} – ₹{high}"** (computed per below), a one-line reassurance (`This is a ballpark to set expectations — your exact quote depends on scope. Book a free call and we'll tailor it.`), and a primary CTA (SmartCtaButton → call/booking). Optionally a subtle collapsed "What shapes your quote?" expander listing the *categories* chosen (NOT itemized prices).
- *Platform:* `Custom platforms start around ₹1,00,000+ and are scoped individually.` → book a call.
- *Marketing:* `SEO & Google Business management from ₹20,000/mo · Google Ads management from ₹10,000/mo (or 20% of ad spend).` → book a call.
- All results also submit the lead (with selections + range) via `submitQuoteLead`.

## Pricing map (`src/lib/quote-pricing.ts`) — à-la-carte, ₹
```
sizeBase: { landing: 8000, small: 18000, standard: 30000, large: 45000 }
addOns:   { logo: 8000, blog: 6000, form: 8000, ecommerce: 15000, animations: 3000, video: 5000, seo: 5500, hosting: 4000 }
rushMultiplier: 1.25   // applied to subtotal if Rush
```
**Estimate → range:** `subtotal = sizeBase[size] + sum(selected addOns)`; if Rush, `subtotal *= 1.25`. Then `low = roundTo1000(subtotal)`, `high = roundTo1000(subtotal * 1.3)`. Present as the range. (These map to the real à-la-carte card — landing ₹8k, standard page ₹3k, RFQ form ₹8k, logo ₹8k, tech SEO+GSC ≈ ₹5.5k, video ₹5k, hosting ₹4k, rush +25% — but the UI shows only the RANGE, never the line items.)

## Constraints
- NEVER show the full itemized price list or the à-la-carte card. Only the soft range + categories. Emphasise the low end + the free call.
- Real, honest numbers (from the card); no fabrication. Reuse components/email/analytics patterns; additive; don't break other pages.
- Client-side wizard; the estimate can compute client-side (pricing map is not secret). Lead send is server action.

## Acceptance criteria
- `npm run build` completes; `/quote` prerenders; wizard advances through steps; website path shows a computed range; platform/marketing paths show their soft copy; lead action + GA event wired; `/quote` in sitemap + footer.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-11: interactive quote builder (soft range from a-la-carte pricing) + lead capture`. Do NOT push. `git status` — stage only intended files.
- Report: files created/changed, the flow, how the range is computed/presented, lead wiring, build result, commit hash. Summaries only.
