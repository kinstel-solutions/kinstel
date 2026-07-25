# Kinstel Solutions — Digital Presence Audit
## 02 · Issues Register

**Audit date:** 23 July 2026
Every issue found, categorised and prioritised. Severity = impact on visibility/trust/conversions. Effort = rough work to fix (S = <1h, M = a few hours, L = days/ongoing). Priority = Severity ÷ Effort judgement (P0 = do first).

**Legend:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## Priority snapshot (do-first order)

| # | Issue | Cat. | Sev | Effort | Priority |
|---|---|---|---|---|---|
| T1 | Every page canonicalises to homepage | Tech | 🔴 | S | **P0** |
| T2 | Zero structured data (no Organization/LocalBusiness/FAQ schema) | Tech/AEO | 🔴 | M | **P0** |
| L1 | Google Business Profile not surfacing in Maps/Search | Local | 🔴 | M | **P0** |
| B1 | Brand-name collision — Kinstel doesn't own its SERP | Brand/GEO | 🔴 | L | **P0** |
| O1 | Near-zero citations across all directories | Off-page | 🟠 | L | **P1** |
| O2 | Near-zero backlinks | Off-page | 🟠 | L | **P1** |
| O3 | Zero third-party reviews | Off-page/Trust | 🟠 | L | **P1** |
| C1 | Contradictory client stats (10+ vs 150+) | Content/Trust | 🟠 | S | **P1** |
| T3 | Generic Open Graph tags sitewide | Tech | 🟠 | S | **P1** |
| S1 | Empty/unverified social profiles | Social | 🟠 | M | **P1** |
| C2 | Premium-vs-₹9,999 positioning conflict | Content/Strategy | 🟠 | M | **P1** |
| A1 | No extractable FAQ / Q&A content for answer engines | AEO | 🟠 | M | **P1** |
| C3 | No blog / case studies / topical content | Content | 🟠 | L | **P1** |
| N1 | Full NAP published on Contact page only | Local | 🟡 | S | **P2** |
| T4 | Sitemap hygiene (fragment URLs, fake lastmod, apex host) | Tech | 🟡 | S | **P2** |
| T5 | Title template double-brands | Tech | 🟡 | S | **P2** |
| C4 | Thin content on key pages | Content | 🟡 | M | **P2** |
| C5 | Weak internal linking | Content/SEO | 🟡 | M | **P2** |
| T6 | DMARC unenforced (p=none) | Tech/Email | 🟡 | S | **P2** |
| T7 | Missing security headers | Tech/Sec | 🟡 | S | **P2** |
| E1 | Owner has no personal authority footprint | Brand/E-E-A-T | 🟡 | L | **P2** |
| D1 | Very young domain, 1-yr registration | Trust | 🟢 | S | **P3** |
| T8 | Core Web Vitals unmeasured / heavy HTML | Tech/Perf | 🟢 | M | **P3** |
| V1 | Unverified "DesignRush recognized" claim | Trust | 🟢 | S | **P3** |

---

## A. Technical / Crawl

### 🔴 T1 — Every page canonicalises to the homepage — **P0**
- **What:** All 10 pages emit `<link rel="canonical" href="https://kinstel.com">`. Subpages declare themselves duplicates of the root.
- **Impact:** Google may drop `/web-design-company-lucknow`, `/law-firm-marketing`, `/credentials`, `/contact`, and policy pages from the index and consolidate signals into the homepage. Directly suppresses the local + vertical pages the business depends on. Secondary: canonical points to apex, which 307-redirects to www.
- **Fix:** Emit a self-referencing canonical per page (`https://www.kinstel.com/<path>`). In Next.js, set `alternates.canonical` per route (or make the root layout compute it from the pathname). Pick ONE host (www) and make canonical + sitemap + `og:url` all use it. **Effort: S.**

### 🔴 T2 — Zero structured data sitewide — **P0**
- **What:** No JSON-LD on any page. No `Organization`, `LocalBusiness`, `Service`, `FAQPage`, `BreadcrumbList`, `Product`/`Offer`.
- **Impact:** Forfeits the strongest entity-clarity and rich-result lever; hurts local pack eligibility, AEO snippet eligibility, and GEO disambiguation. Especially wasteful given the hard NAP + registrations already available to feed schema.
- **Fix:** Add `Organization` + `LocalBusiness` (NAP, geo, hours, `sameAs` to socials, `identifier` for Udyam/IEC/D-U-N-S®) on home/contact; `Service` schema on service/vertical pages; `FAQPage` on the Lucknow page; `BreadcrumbList` sitewide. Validate in Google Rich Results Test. **Effort: M.**

### 🟠 T3 — Generic Open Graph tags sitewide — **P1**
- **What:** Every page has `og:title="Kinstel"`, identical `og:description`, `og:url="https://kinstel.com"`.
- **Impact:** All social shares look identical; `og:url` reinforces the canonical-to-home bug; weakens click-through from shares.
- **Fix:** Per-page `og:title`, `og:description`, `og:url` (self-referencing www), and ideally per-page `og:image`. **Effort: S.**

### 🟡 T4 — Sitemap hygiene — **P2**
- **What:** Sitemap includes invalid fragment URLs (`/#services`, `/#portfolio`); all `lastmod` identical/auto-generated; sitemap + entries use apex host while site serves www; robots declares apex sitemap URL.
- **Fix:** Remove fragment URLs; emit real `lastmod`; use www host consistently. **Effort: S.**

### 🟡 T5 — Title template double-brands — **P2**
- **What:** Suffix " - Kinstel" appended to titles that already contain the brand (e.g. "…Legal Growth - Kinstel").
- **Fix:** Only append brand when not already present; standardise to `Primary Keyword | Kinstel`. **Effort: S.**

### 🟡 T6 — DMARC unenforced (`p=none`) — **P2**
- **What:** `v=DMARC1; p=none;` — monitoring only, no `rua`/`ruf`.
- **Impact:** No protection against brand spoofing; sends via Amazon SES + Zoho so alignment matters.
- **Fix:** Add `rua` reporting, confirm DKIM for Zoho + SES, then move to `p=quarantine` → `p=reject`. **Effort: S.**

### 🟡 T7 — Missing security headers — **P2**
- **What:** No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy (only HSTS).
- **Impact:** Hygiene/credibility gap for a web-services vendor; minor best-practices dings.
- **Fix:** Add headers via `next.config` / `vercel.json`. **Effort: S.**

### 🟢 T8 — Core Web Vitals unmeasured / heavy HTML — **P3**
- **What:** HTML payloads large (home 126 KB, Lucknow 190 KB); Lighthouse not run (PSI quota).
- **Fix:** Run Lighthouse/PSI + CrUX; trim payload, lazy-load below-fold, verify LCP/CLS/INP. **Effort: M.**

---

## B. Local SEO

### 🔴 L1 — Google Business Profile not surfacing — **P0**
- **What:** A GBP share link exists, but the listing does not appear in Maps or Search; category/reviews/photos/hours are publicly invisible.
- **Impact:** No local pack presence — the single highest-ROI local channel is dark. Blocks map-based discovery entirely.
- **Fix:** Verify/claim the GBP; complete every field (category = "Website designer" + secondary "Marketing agency", service areas, hours, services, description, 10+ photos, products with ₹ pricing); ensure it's public; start collecting reviews (see O3). **Effort: M.** *(Owner: please share the live listing URL so this can be confirmed.)*

### 🟡 N1 — Full NAP on Contact page only — **P2**
- **What:** Registered address appears only on `/contact`; other pages show phone/email but no address.
- **Fix:** Add consistent NAP to the site footer sitewide + `LocalBusiness` schema. Keep the billing/admin number out of primary NAP citations. **Effort: S.**

---

## C. Off-Page / Authority

### 🟠 O1 — Near-zero citations — **P1**
- **What:** Not found on JustDial, Sulekha, IndiaMART, TradeIndia, Yellow Pages India, Clutch, GoodFirms, DesignRush, Crunchbase, Yelp, Bing Places, Apple Maps.
- **Impact:** No NAP corroboration for local SEO; no discovery surface; weak entity trust.
- **Fix:** Build foundational citations with identical NAP (start: Google, Bing Places, Apple Business Connect, JustDial, Sulekha, IndiaMART, Clutch, GoodFirms, Sortlist). **Effort: L (ongoing).**

### 🟠 O2 — Near-zero backlinks — **P1**
- **What:** No genuine referring domains found for kinstel.com.
- **Impact:** Little authority to rank with, compounding the young domain.
- **Fix:** Client "site by Kinstel" footer credits, directory profiles, local press/roundups, guest posts, Behance/Dribbble portfolio links. **Effort: L (ongoing).**

### 🟠 O3 — Zero third-party reviews — **P1**
- **What:** No reviews on Google, Clutch, GoodFirms, G2, Trustpilot.
- **Impact:** All social proof is self-asserted; hurts conversion, local ranking, and trust.
- **Fix:** Systematic review-collection from existing clients (Google first, then Clutch/GoodFirms); add on-site testimonials with schema. **Effort: L (ongoing).**

---

## D. Social

### 🟠 S1 — Empty / unverified social profiles — **P1**
- **What:** LinkedIn company page 404/not-indexed; X (@Hi4mKinstel) not surfacing; no Facebook/Instagram/YouTube/Behance/Dribbble agency presence.
- **Impact:** No `sameAs` corroboration for entity/knowledge-graph; missed discovery; Behance/Dribbble absence unusual for a design agency.
- **Fix:** Stand up and populate LinkedIn + X; add Behance/Dribbble portfolio; make all indexable; link via `sameAs` schema. **Effort: M → L.**

---

## E. Content / On-Page

### 🟠 C1 — Contradictory client stats — **P1**
- **What:** "10+ Clients Served" (home) vs "150+ Law Firms Served" + "300% Avg. Lead Increase" (law-firm page); page speed "98%" vs "95+".
- **Impact:** Destroys credibility of all stats for both humans and LLMs.
- **Fix:** Reconcile to one honest, consistent set of numbers sitewide. **Effort: S.**

### 🟠 C2 — Premium-vs-budget positioning conflict — **P1**
- **What:** "Premium/Premier" (home, law) vs "Affordable / ₹9,999" (Lucknow).
- **Impact:** Split brand identity; dilutes pricing power and trust; confuses targeting.
- **Fix:** Decide the core position (premium, value, or good-better-best tiers) — resolved in the strategy phase. **Effort: M.**

### 🟠 C3 — No blog / case studies / topical content — **P1**
- **What:** No blog, articles, resources, or written case studies in the sitemap.
- **Impact:** No topical authority for SEO, no citable material for GEO, no long-tail capture.
- **Fix:** Launch a content hub (service-area + vertical + educational posts) and written case studies. **Effort: L (ongoing).**

### 🟡 C4 — Thin content on key pages — **P2**
- **What:** Credentials/Contact <200 words; law-firm ~300 words.
- **Fix:** Expand law-firm and any future vertical/service pages to genuine depth. **Effort: M.**

### 🟡 C5 — Weak internal linking — **P2**
- **What:** Mostly footer links; money pages don't cross-link contextually.
- **Fix:** Add in-body contextual links between service/vertical/local/pricing pages and future blog. **Effort: M.**

---

## F. AEO / GEO / Entity

### 🔴 B1 — Brand-name collision — **P0**
- **What:** "Kinstel" SERP dominated by Kinsteel Bhd (Malaysia steel), Kinstel Company Ltd (Ghana), and **Kinstel Technology LLP (Gujarat)** — a different Indian entity.
- **Impact:** Answer engines cannot reliably identify Kinstel Solutions; registry confusion with the Gujarat LLP.
- **Fix:** Aggressive entity disambiguation — consistent full legal name "Kinstel Solutions" + Lucknow + owner in schema/`sameAs`; build corroborating citations; consider a Wikidata entry; use `Organization.identifier` (Udyam/IEC/D-U-N-S®) to hard-anchor identity. **Effort: L.**

### 🟠 A1 — No extractable Q&A for answer engines — **P1**
- **What:** Only one FAQ (Lucknow) with non-extractable answers; almost no declarative/definitional statements; pricing buried in a question.
- **Fix:** Add clean FAQ blocks + `FAQPage` schema across pages; write declarative "Kinstel is…/ X is…" statements; state pricing as facts. **Effort: M.**

### 🟡 E1 — No owner/founder authority footprint — **P2**
- **What:** Raj Shekhar Singh has no public profile tied to Kinstel; no about/team page.
- **Impact:** Weak E-E-A-T; no personal brand to transfer trust from.
- **Fix:** Founder LinkedIn + about/team page + authorship on blog content. **Effort: L.**

---

## G. Trust / Reputation

### 🟢 D1 — Very young domain, 1-year registration — **P3**
- **What:** Registered 2025-09-28; expires 2026-09-28.
- **Fix:** Extend registration to 3–5 years (cheap trust signal); time will build history. **Effort: S.**

### 🟢 V1 — Unverified "DesignRush recognized" claim — **P3**
- **What:** Site claims DesignRush recognition, but no public DesignRush profile is indexed.
- **Fix:** Create an actual DesignRush profile to substantiate, or remove the claim. **Effort: S.**

---

## How the fixes cluster (preview of the roadmap)
- **Phase 1 — Foundation & technical fixes (P0/P1 quick wins):** T1, T2, T3, T4, T5, C1, N1, L1 (claim/complete GBP), D1, T6, T7. Mostly S/M effort, high impact — unblocks everything else.
- **Phase 2 — Visibility & authority (P1 ongoing):** O1 citations, O3 reviews, S1 socials, A1 AEO content, B1 entity disambiguation, C2 positioning decision.
- **Phase 3 — Growth & moat (P1/P2 compounding):** O2 backlinks, C3 content hub + case studies, C4/C5 depth & internal links, E1 founder authority, T8 performance.

*Full step-by-step execution in **05-roadmap/** after the strategy interview (**03**) and pathway selection (**04**).*
