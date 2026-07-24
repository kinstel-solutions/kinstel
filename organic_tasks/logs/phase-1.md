# Phase 1 — Log (Structured Data / JSON-LD)

**Status:** ✅ Complete · **Branch:** `staging` · **Commit:** `65ad000` (local only, not pushed)
**Implemented by:** Sonnet 5 · **Planned/verified by:** Opus 4.8 · **Date:** 24 Jul 2026 · builds on Phase 0 `686b91a`

## What was done (11 files, +235 lines)
- **`src/components/seo/json-ld.tsx`** (new) — reusable server component emitting `<script type="application/ld+json">`.
- **`src/lib/schema.ts`** (new) — single source of truth for the `ProfessionalService`/LocalBusiness node (NAP defined once, used by home + contact → no drift).
- **`src/app/layout.tsx`** — sitewide `Organization` + `WebSite` (rendered once, every page). Organization carries `sameAs` (LinkedIn, X), `identifier[]` (Udyam/IEC/D-U-N-S®), `contactPoint`.
- **Home + contact** — `ProfessionalService` (LocalBusiness) from the shared lib.
- **`services`, `web-design-company-lucknow`, `global`, `law-firm-marketing`** — `Service` nodes (areaServed tuned per page: Lucknow / India / Worldwide).
- **`web-design-company-lucknow`, `global`, `global-promo`, `offers/knsl052526`** — `FAQPage` built from each page's existing FAQ arrays (JSX answers mirrored to plain text using the real numbers already in the source props — no invented content).

## Verification (Opus)
- `git show` confirms 11 files. Schema-type census across source: Organization×5, WebSite, ProfessionalService, PostalAddress, ContactPoint, PropertyValue×3 (the 3 registrations), Service×4, FAQPage×4, Question/Answer×4. All expected types present.
- NAP confirmed single-sourced in `src/lib/schema.ts`.
- Sonnet ran `npm run build` (24 routes, no errors) and parsed the generated HTML — every JSON-LD block parsed as valid JSON.

## NAP used (verbatim from contact page, cross-checked vs footer)
Kinstel Solutions · H. No. 33, Shivdham, Shivlok Colony, Nijampur, Malhaur, Vigyan Khand-1, Lucknow, Uttar Pradesh 226010, IN · +91-98899-88408 · contact@kinstel.com · Udyam UDYAM-UP-50-0230220 · IEC HLCPS8014Q · D-U-N-S 77-197-4415.

## Known follow-ups (deferred, not blockers)
- `geo` (lat/long) omitted — none in repo. Add real coords when GBP is confirmed.
- "Gomtinagar" dropped from structured `streetAddress` (ambiguous placement in source line) — verify against the live GBP address for exact NAP match.
- FAQPage added to the two noindex pages (`global-promo`, `offers/knsl052526`) per plan — currently no search benefit while noindex.
- Post-merge: paste key pages into Google Rich Results Test to confirm eligibility.

## Deviations from plan
- Added `src/lib/schema.ts` (not in original file list) to single-source the NAP — within the plan's "reuse, don't duplicate" spirit.
- Mirrored JSX FAQ answers to plain-text arrays (real numbers from existing `amount` props) rather than rewriting FAQ copy.

## Next
→ Phase 2 (content honesty: reconcile 10+/150+ & 98%/95+ stats, retire/repurpose law-firm page) is queued — **held pending creative-direction decisions** (free-audit tool, own-SaaS bet, About page, content approach).
