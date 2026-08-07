# Phase 2 Implementation Plan: Global Conversion & Site-Wide Trust Enhancements

This Phase 2 plan builds upon the `/payment-methods` portal to weave multi-currency payment capabilities, zero-SWIFT fee guarantees, and conversion trust badges directly into Kinstel's core user journey: `/pay`, `/global-promo`, `/packages`, `/faq`, and `footer`.

## Key Deliverables in Phase 2

1. **Payment Form UI Upgrade ([payment-form.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/app/pay/components/payment-form.tsx))**: Add payment method selector tabs (Card vs Local Bank Transfer) and a 2% ACH discount callout for invoices > $2,000.
2. **Visual Payment Badges in Footer ([footer.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/components/layout/footer.tsx))**: Add clean SVG/styled payment logos (`Visa`, `Mastercard`, `PayPal`, `US ACH Direct`, `EU SEPA`, `Razorpay Verified`).
3. **Global Promo Page Upgrade ([global-promo/page.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/app/global-promo/page.tsx))**: Add "Pay Like a Local" feature section and JSON-LD schema expansion for `currenciesAccepted` and `paymentAccepted`.
4. **Main FAQ Page Integration ([faq/page.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/app/faq/page.tsx))**: Add international billing Q&A accordion items for sitewide AEO ranking.
5. **Packages Page Multi-Currency Updates ([packages/page.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/app/packages/page.tsx))**: Display multi-currency badges (`$ USD`, `£ GBP`, `€ EUR`, `A$ AUD`) and bank transfer discount tags.
6. **Sales Outreach & Proposal Templates ([gemini_organic_strategy/sales_email_templates.md](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/gemini_organic_strategy/sales_email_templates.md))**: Provide ready-to-use email blurbs and proposal payment slides for sales outreach.

---

## Proposed Changes

### Component 1: Payment Checkout & Form

#### [MODIFY] [payment-form.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/app/pay/components/payment-form.tsx)
- Add payment method selector toggle:
  - 💳 **Online Card / PayPal Payment** (Existing Razorpay/PayPal flow)
  - 🏛️ **Local ACH / Wire Remittance** (Provides direct routing details & invoice reference instructions)
- Add discount callout: *"Save 2% on project invoices over $2,000 when paying via direct local ACH / Wire Transfer."*

---

### Component 2: Site Layout & Trust Badges

#### [MODIFY] [footer.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/components/layout/footer.tsx)
- Add visual payment method badges/icons row near the bottom legal area:
  `Visa` • `Mastercard` • `PayPal` • `US ACH` • `EU SEPA` • `Razorpay MoneySaver`

---

### Component 3: Landing Pages & Pricing

#### [MODIFY] [global-promo/page.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/app/global-promo/page.tsx)
- Insert a dedicated **"Zero-Friction Global Payments — Pay Like a Local"** feature card block.
- Update `metadata` JSON-LD schema with `currenciesAccepted` and `paymentAccepted`.

#### [MODIFY] [packages/page.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/app/packages/page.tsx)
- Add multi-currency tags (`$ USD`, `£ GBP`, `€ EUR`, `A$ AUD`) to pricing cards.
- Add local wire transfer incentive note on enterprise packages.

---

### Component 4: FAQ & Sales Documentation

#### [MODIFY] [faq/page.tsx](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/src/app/faq/page.tsx)
- Add international billing FAQs to the main site FAQ page with `FAQPage` schema.

#### [NEW] [sales_email_templates.md](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/gemini_organic_strategy/sales_email_templates.md)
- Create copy-paste proposal blurbs and email templates for pitch meetings with US/UK/AU/EU prospective clients.

---

## Verification Plan

### Automated Verification
- Verify TypeScript compilation across modified files:
  ```powershell
  npx tsc --noEmit
  ```

### Manual Verification
1. Inspect `/pay` form to test payment mode toggle and ACH discount banner.
2. Inspect `/global-promo` and `/packages` pages to ensure responsive layout and multi-currency badges display cleanly.
3. Check `/faq` page for new international payment FAQs.
4. Verify footer payment badges in desktop and mobile viewports.
