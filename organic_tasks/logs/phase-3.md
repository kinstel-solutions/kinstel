# Phase 3 — Log (Measurement & Hardening)

**Status:** ✅ Complete · **Branch:** `staging` · **Commit:** `8123580` (local only)
**Implemented by:** Sonnet 5 · **Planned/verified by:** Opus 4.8 · **Date:** 24 Jul 2026 · builds on `fe29dff`
*(Moved up ahead of content phases because it's tone-independent — ran while the stat/tone decision is pending.)*

## What was done
- **`src/components/GA-analytics.tsx`** — fixed pageview over-counting (was firing up to 3× on load). Inline config now `send_page_view: false`; removed the `useEffect([])` mount effect; single `useEffect([pathname])` sends exactly one pageview per navigation.
- **`next.config.ts`** — added `headers()` on all routes: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`. No CSP (would break GA/Razorpay/DMCA — deferred).
- **Conversion events** — added `click_to_call` (`click-to-call-link.tsx`, `time-based-call-button.tsx`) and `generate_lead` on the pay/packages flows (`payment-form.tsx`, `direct-pay-section.tsx`, `signature-packages-section.tsx`). Left EXISTING tracking untouched to avoid double-counting.

## Correction to the audit
The site **already had** PMax/GTM conversion events (`pmax_lead`, `pmax_whatsapp_click`, `whatsapp_contact`, `inquiry_submission`) — a deliberate prior PMax conversion setup. My Phase-audit note ("gtag-only, no conversion events") was too harsh. Sonnet correctly did NOT duplicate these.

## Verification (Opus)
- `next.config.ts` shows all 4 headers; `GA-analytics.tsx` shows `send_page_view:false` + a single `useEffect`. Build succeeded (24 routes, 6.6s).

## Flags (added to _PHASE-ENDGAME-inputs.md)
- **Pre-existing TS error**: `src/app/global-promo/actions.ts:79` TS2322 (unknown → string|undefined). Unrelated to this phase; it's why `typescript.ignoreBuildErrors:true` is set. Left as-is per plan.
- **CSP** deferred (needs careful allow-listing for GA/Razorpay/DMCA/Vercel).
- **CI** (GitHub Actions) not added — owner's repo/ops decision.

## Next
All tone-independent work (Phases 0–3) is DONE. Remaining phases (repositioning, new pages, blog, depth) are ALL content — **HELD pending the owner's stat/tone decision.**
