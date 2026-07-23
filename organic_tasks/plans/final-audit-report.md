# Kinstel Solutions — Final Audit Report (Codebase-Verified)

**Date:** 23 July 2026
**Author:** Codebase audit pass (full source-level verification of the external `kinstel_audit/` report)
**Repo:** `kinstel` (Next.js 16 App Router, React 19, deployed on Vercel)
**Method:** The external audit (`kinstel_audit/01`–`05`) was produced *without codebase access* — via HTTP/DNS crawl of the live site. This report re-runs every technical finding against the **actual source code**, confirms/corrects the root cause down to `file:line`, and adds findings the crawl could not see.

---

## 0. How to read this document

- **§1 — Verdict table:** every external technical finding → confirmed / corrected / superseded, with the exact source location.
- **§2 — Root-cause detail:** the "why" in code for each P0/P1 technical issue, with the fix.
- **§3 — NEW findings** the external (crawl-only) audit missed because it had no source access.
- **§4 — Corrections** where the codebase contradicts the external audit's snapshot.
- **§5 — Prioritised codebase fix list** (dev-actionable, effort-tagged).

The external audit's **non-technical** conclusions (off-page/citations/GBP/reviews/brand-collision/strategy) are **not re-litigated here** — they are outside the codebase and remain valid as written in `kinstel_audit/`. This report is the *engineering* half of the same audit.

---

## 1. Verdict table — external technical findings vs. source

| # (ext) | Finding | Verdict | Source location (root cause) |
|---|---|---|---|
| **T1** | Every page canonicalises to homepage | ✅ **Confirmed** | `src/app/layout.tsx:15-17` — root `alternates.canonical: "/"`; **no page overrides it** (grep: only occurrence in repo). |
| **T1b** | Canonical points to apex, not www | ✅ **Confirmed** | `src/lib/site-config.ts:2` — `url: 'https://kinstel.com'` (apex). `metadataBase` uses it → canonical resolves to apex → 307 to www. |
| **T2** | Zero structured data (JSON-LD) | ✅ **Confirmed** | Zero matches for `ld+json` / `@context` / `schema.org` anywhere in `src/`. No `Organization`, `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`. |
| **T3** | Generic Open Graph sitewide | ⚠️ **Partially corrected** | Root OG is generic (`layout.tsx:35-50`, `og:title="Kinstel"`, `og:url` = apex). **But** `/global` & `/global-promo` now set per-page OG. All other pages still inherit the generic root OG. |
| **T3b** | `og:image` present | ❌ **Corrected → worse** | `site-config.ts:3` references `https://kinstel.com/og-image.png` **but the file does not exist in `public/`** and there is no `opengraph-image` route → **OG image 404s sitewide.** See §3.1. |
| **T4** | Sitemap hygiene (fragments, fake lastmod, apex) | ✅ **Confirmed** | `src/app/sitemap.ts` — `#services`/`#portfolio` fragments (l.27), `new Date().toISOString()` on every route → identical lastmod (l.24,29), apex host (l.5). |
| **T4b** | robots declares apex sitemap URL | ✅ **Confirmed** | `public/robots.txt` — `Sitemap: https://kinstel.com/sitemap.xml` (apex). |
| **T5** | Title template double-brands | ✅ **Confirmed** | `layout.tsx:18-21` — `template: "%s - Kinstel"` applied to titles that already contain "Kinstel" (e.g. `page.tsx:35`, `contact/page.tsx:14`). |
| **T6** | DMARC unenforced (`p=none`) | ⏹️ **Out of repo** | DNS-level; not verifiable from source. Trust the external finding. |
| **T7** | Missing security headers | ✅ **Confirmed** | `next.config.ts` has **no `headers()`**; no `vercel.json` in repo. Only HSTS (Vercel default). |
| **T8** | CWV unmeasured / heavy HTML | ⚠️ **Confirmed + new causes** | `@vercel/speed-insights` is wired (`layout.tsx:3,101`) so CWV *is* collectable. New perf causes in §3.3 (blocking dmca script, motion lib, raw external `<img>`). |
| **C1** | Contradictory client stats | ✅ **Confirmed (worse)** | "10+ Clients" (`page.tsx:50`, `offers/knsl…:146`) vs "150+ Law Firms" (`law-firm-marketing:34`); "98%" vs "95+" page-speed scattered across 6 pages. See §2.5. |
| **N1** | Full NAP on Contact page only | ✅ **Confirmed** | `components/layout/footer.tsx:26-38` — footer has email + phone but **no street address**. |
| **A1** | No extractable Q&A for answer engines | ⚠️ **Partially corrected** | FAQ blocks now exist on 4 pages (`web-design-company-lucknow`, `global`, `global-promo`, `offers/knsl052526`) — but stored as JS data arrays with **no `FAQPage` schema**, so still low extractability. |

---

## 2. Root-cause detail (P0/P1 technical)

### 2.1 🔴 T1 — Sitewide homepage canonical *(P0, effort: S)*
**Root cause (single point):** `src/app/layout.tsx`
```ts
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),   // https://kinstel.com (apex)
  alternates: { canonical: "/" },          // ← inherited by EVERY page
  ...
}
```
In the Next.js App Router, `alternates` is inherited by any route that does not declare its own. A repo-wide grep confirms **no page sets `alternates.canonical`** — so all ~20 routes emit `<link rel="canonical" href="https://kinstel.com/">`. Only the homepage is coincidentally correct; every money page (`/web-design-company-lucknow`, `/law-firm-marketing`, `/services`, `/packages`, `/global`, `/credentials`, `/contact`, `/offers/lko`) tells Google it is a duplicate of the root.

**Compounding:** canonical resolves to the **apex**, which 307-redirects to `www` — a canonical pointing at a redirect.

**Fix:**
1. Change `site-config.ts` `url` to the chosen host (recommend `https://www.kinstel.com`) — this propagates to `metadataBase`, sitemap, robots, and OG in one edit *if* those are refactored to read from it (they currently hardcode apex — see §3.4).
2. Give every indexable page a self-referencing canonical. Two options:
   - Per-page: `export const metadata = { alternates: { canonical: "/web-design-company-lucknow" } }` (relative to `metadataBase`).
   - Central: a small `buildMetadata(path)` helper each page calls.
3. Keep the apex→www redirect.
**Verify:** `curl -s https://www.kinstel.com/web-design-company-lucknow | grep canonical` returns the page's own URL.

### 2.2 🔴 T2 — Zero structured data *(P0, effort: M)*
No JSON-LD exists anywhere. The irony (per `03-strategy-inputs.md` §1.5) is that Kinstel builds JSON-LD *for clients*. All the raw material is already in the repo, unused:
- NAP + contacts: `contact/page.tsx`, `footer.tsx`.
- Registrations for `Organization.identifier`: `footer.tsx:189` — Udyam `UDYAM-UP-50-0230220`, IEC `HLCPS8014Q`, D-U-N-S® `77-197-4415`.
- `sameAs` targets: `footer.tsx:168,176` — `x.com/Hi4mKinstel`, `linkedin.com/company/kinstel`.
- FAQ content for `FAQPage`: 4 pages already carry FAQ arrays.

**Fix:** Add a `<JsonLd>` server component (a `<script type="application/ld+json">` emitter):
- `Organization` + `LocalBusiness` (NAP, geo, `openingHours`, `priceRange`, `identifier[]`, `sameAs[]`) → root layout / home / contact.
- `Service` → services, law-firm, lucknow, global.
- `FAQPage` → the 4 pages that already have FAQ data (reuse the arrays).
- `BreadcrumbList` → sitewide.
Validate in Google Rich Results Test.

### 2.3 🟠 T3 / 🔴 T3b — Open Graph *(P1, effort: S)*
- Generic root OG (`layout.tsx:35-50`): `og:title="Kinstel"`, one shared description, `og:url` = apex. Inherited by every page except the two new `/global*` pages.
- **`og:image` is broken sitewide** — see §3.1 (this is the higher-severity part).
**Fix:** per-page `openGraph.title/description/url` (self-referencing www) on the money pages; ship a real OG image (or an `opengraph-image.tsx` route).

### 2.4 🟡 T4 — Sitemap *(P2, effort: S)* — plus a discoverability gap
`src/app/sitemap.ts` problems, all confirmed:
- Fragment "pages" `#services`, `#portfolio` built as `${siteUrl}/${route}` → `https://kinstel.com/#services` (invalid sitemap entries).
- `lastModified: new Date().toISOString()` → every URL shares one auto-generated timestamp (no real change signal).
- Apex host throughout.
- **Only 10 routes listed.** Missing real, indexable pages: `/services`, `/packages`, **`/global`** (the strategic premium page), `/offers/lko`, `/landing`. See §3.2 — this is the more important half.
**Fix:** drop fragments; list all indexable routes; per-route real `lastmod`; www host.

### 2.5 🟠 C1 — Contradictory stats *(P1, effort: S)* — full inventory from source
| Claim | Home | Law-firm | offers/knsl | global | lucknow | global-promo |
|---|---|---|---|---|---|---|
| Clients | **10+** | **150+ Law Firms** | 10+ | — | — | — |
| Page speed | **98%** | 98% | 98% | **95+** | **95+** | 98% |
| Conversion | 300% "Uplift" | 300% "Lead Increase" | 300% | — | — | 300% "More Conversions" |

The 10+ vs 150+ contradiction and the 98% vs 95+ split are both live in source. Reconcile to one honest set sitewide.

---

## 3. NEW findings (crawl-only audit could not see these)

### 3.1 🔴 Broken OG image sitewide *(NEW, effort: S)*
`site-config.ts:3` → `ogImage: 'https://kinstel.com/og-image.png'`, referenced by both `openGraph.images` and `twitter.images` in `layout.tsx:42-55`. **`public/og-image.png` does not exist** and there is no `opengraph-image` route. Every social/WhatsApp/LinkedIn share of any Kinstel URL renders **without a preview image** — directly undercuts the DesignRush/global inbound channel and any link-sharing. The external audit reported "OG image present" because it read the meta tag, not the (404ing) asset.

### 3.2 🟠 Strategic pages absent from sitemap / mis-indexed *(NEW, effort: S)*
- **`/global`** (the premium, USD-facing page that `04-strategy-pathways.md` and Phase 2 make the centerpiece of the global-ads push) is: **not in the sitemap**, and **inherits the homepage canonical** → Google is told it's a duplicate of the root and it isn't discoverable via sitemap. The single most strategically important page is the worst-hit by T1.
- `/services` and `/packages` are linked in the footer, indexable, but **absent from the sitemap**.
- `/landing` exists, is indexable, sets no canonical → likely a duplicate-content page. Confirm intent; noindex or canonicalize.
- **noindex is applied inconsistently:** ✅ policy pages + `/global-promo` + `/offers/knsl052526` are `index:false`. ❌ `/pay` and `/pay/success` (transactional) are **indexable** and should be noindexed.

### 3.3 🟠 Performance causes now visible in source *(NEW / expands T8)*
- `footer.tsx:193` loads `https://images.dmca.com/Badges/DMCABadgeHelper.min.js` via a **raw `<script>`** (not `next/script`) on **every page** — third-party, render-path, and a privacy/consent surface.
- `footer.tsx:64-68` — DMCA badge is a raw external `<img>` from `images.dmca.com` on every page (extra connection, no width/height beyond CSS, not `next/image`).
- `motion` (Framer Motion successor) is a dependency; heavy client animation components (`particles`, `border-beam`, `aurora-text`, `scroll-based-velocity`, `dynamic-island`) drive the "heavy HTML payload" the external audit measured. Audit for below-the-fold lazy-loading.
- `@vercel/speed-insights` **is** installed (`layout.tsx:101`), so real CWV data is already being collected — pull it rather than assuming.

### 3.4 🟡 Config / hygiene issues *(NEW)*
- `next.config.ts:5-7` — **`typescript.ignoreBuildErrors: true`**: type errors are suppressed at build. Combined with `"typecheck": "tsc --noEmit"` existing but not gating deploys, real type bugs can ship. Recommend removing once the tree is clean, or gate in CI (there are **no `.github/workflows`** — no CI at all).
- Site URL is **hardcoded to apex in 3 places** (`site-config.ts:2`, `sitemap.ts:5`, `robots.txt`) instead of read from `NEXT_PUBLIC_SITE_URL` (which *is* defined in `.env.example`). Centralize so the www migration is one edit.
- `site.webmanifest` description is **law-firm-specific** ("empowers lawyers and law firms…") while the brand positions as a general agency — inconsistent app metadata. `name` is "Kinstel" not "Kinstel Solutions".
- Brand name inconsistency in code: `siteConfig.name = 'Kinstel'` (used in title template, OG, author) vs legal "Kinstel Solutions" in footer/schema-source. This feeds the entity-collision problem (`B1`) at the metadata layer.

### 3.5 🟠 Analytics integrity — pageview over-counting *(NEW, matters for the POC)*
`components/GA-analytics.tsx` fires the initial pageview **up to 3×** on first load:
1. inline `gtag-init` script → `gtag('config', ID, {page_path})` (a pageview),
2. `useEffect([])` → `pageview(...)` (another `config` call),
3. `useEffect([pathname])` → `pageview(pathname)` (fires on mount too).
Phase 1 Workstream 2 makes "clean attribution" the precondition for proving organic works — **this bug inflates Organic/Direct sessions and pageviews and must be fixed before the POC baseline.** Also: gtag loads `strategy="lazyOnload"` (late — can miss fast bounces), it's **gtag.js only** (no GTM container, no enhanced conversions, no consent mode) despite the strategy doc claiming GTM/enhanced-conversions as a Kinstel competency (cobbler's-children gap #2), and there are **no defined conversion events** for form-submit / `tel:` click / WhatsApp click in code.

### 3.6 ✅ Security positives verified
- **No secret leak:** `.env.local` is present locally but **not git-tracked** (`.gitignore` has `.env*`). `git ls-files` shows no env files. Good.
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` (`next.config.ts:30-33`) exposes only the Razorpay **key_id** (publishable by design) — not the secret. Acceptable.

---

## 4. Corrections to the external audit

1. **Page count:** external audit says "10 real pages" (matches the sitemap exactly). The codebase has **~20 routes** — including `/services`, `/packages`, `/global`, `/global-promo`, `/landing`, `/offers/lko`, `/offers/knsl052526`, `/pay`. The crawl only saw what the sitemap advertised; several money pages are invisible to it *and* to Google.
2. **OG per-page:** the newest pages (`/global`, `/global-promo`) already have per-page OG + intentional `noindex` on ad landers — evidence the premium-positioning work from `04`/Phase 2 has **already begun** in code. The external snapshot predates them.
3. **FAQ:** "only one FAQ (Lucknow)" is now **four** FAQ blocks — but still schema-less.
4. **OG image "present"** → actually **broken/404** (§3.1).
5. **"DesignRush recognized" is real** (per `03-strategy-inputs.md`) and the footer links to it (`footer.tsx:44-57`) — treat as a live asset, not an unverified boast (`V1` downgraded).

---

## 5. Prioritised codebase fix list (dev-actionable)

**P0 — do first (all small/medium, high impact):**
1. **Self-referencing canonicals** + pick `www` host (`site-config.ts` + per-page `alternates`). *(S)* → fixes T1, T1b.
2. **Add JSON-LD** (`Organization`+`LocalBusiness`+`Service`+`FAQPage`+`BreadcrumbList`) via a reusable component; feed existing NAP/registrations/FAQ arrays. *(M)* → fixes T2, A1.
3. **Ship a real OG image** (static `og-image.png` or `opengraph-image.tsx`) + per-page OG. *(S)* → fixes T3b, T3.
4. **Fix sitemap:** drop fragments, add all indexable routes incl. `/global`, real `lastmod`, www host; noindex `/pay*`. *(S)* → fixes T4 + §3.2.

**P1 — next:**
5. **Reconcile stats** (10+ vs 150+, 98% vs 95+) to one honest set. *(S)* → C1.
6. **Fix GA pageview triple-fire** + add conversion events (form/tel/WhatsApp); consider GTM + enhanced conversions to match the sales claim. *(M)* → §3.5.
7. **Footer NAP** (add street address; keep billing number out) + `LocalBusiness` schema. *(S)* → N1.
8. **Security headers** via `next.config.ts` `headers()` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). *(S)* → T7.

**P2 — hygiene:**
9. Centralize site URL to `NEXT_PUBLIC_SITE_URL`; remove apex hardcodes. *(S)*
10. Fix title double-brand (`layout.tsx` template). *(S)* → T5.
11. Move dmca script to `next/script`; audit motion/animation lazy-loading; pull real CWV from Speed Insights. *(M)* → T8/§3.3.
12. Fix `site.webmanifest` description + brand name consistency (`Kinstel` → `Kinstel Solutions` where it's the entity). *(S)*
13. Remove `typescript.ignoreBuildErrors` once clean; add a CI workflow (typecheck + lint + build). *(M)*

---

## Appendix — files inspected
`layout.tsx`, `site-config.ts`, `sitemap.ts`, `next.config.ts`, `robots.txt`, `site.webmanifest`, `page.tsx` (home), `contact/`, `credentials/`, `law-firm-marketing/`, `web-design-company-lucknow/`, `services/`, `packages/`, `global/`, `global-promo/`, `landing/`, `offers/*`, `pay/*`, `components/layout/footer.tsx`, `components/GA-analytics.tsx`, `lib/gtag.ts`, `lib/placeholder-images.ts`, `.env.example`, `.gitignore`, `public/`. Cross-referenced against `kinstel_audit/01`–`05`.
