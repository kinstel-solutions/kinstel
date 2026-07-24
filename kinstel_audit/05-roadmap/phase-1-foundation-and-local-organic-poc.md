# 05 · Roadmap — Phase 1
# Foundation & Local Organic Proof-of-Concept
### "Prove organic works — and how — while arming the global ads launch"

**Timeframe:** Weeks 0–6
**Goal:** Fix the technical sabotage, make the Lucknow page + GBP actually rank, and generate the **first repeatable organic (non-Ads) local leads** — a measurable POC that organic works. Simultaneously lay the tracking/landing foundation that the planned global ads (2–3 months out) will need.
**Owner:** Raj (dev + setup), lean spend.
**Definition of done:** Lucknow page indexed & ranking; GBP surfacing in the local pack; ≥1 organic non-Ads enquiry; organic traffic & conversions visibly measured in GA4 + Search Console.

> **Why this order:** Every growth tactic is currently blocked by the canonical bug + invisible GBP + zero measurement. Fix plumbing → open one tap (local organic) → prove it with data.

---

## Workstream 1 — Kill the technical sabotage (Week 1) 🔴 highest priority

### Step 1.1 — Fix the sitewide canonical bug
- **Problem:** every page emits `<link rel="canonical" href="https://kinstel.com">` → all pages self-canonicalize to the homepage.
- **Do:** In Next.js, set a **self-referencing canonical per route** using the full `www` URL. Use the App Router `metadata.alternates.canonical` per page (or compute from pathname in the root layout), so `/web-design-company-lucknow` → `https://www.kinstel.com/web-design-company-lucknow`, etc.
- **Pick ONE host:** standardize on `https://www.kinstel.com` everywhere (canonical, sitemap, `og:url`, internal links). Keep the apex→www 301/307 redirect.
- **Verify:** `curl -s https://www.kinstel.com/web-design-company-lucknow | grep canonical` shows the page's own URL. Re-check all 10 pages.

### Step 1.2 — Fix Open Graph + titles + sitemap
- **OG:** per-page `og:title`, `og:description`, `og:url` (self-referencing www); per-page `og:image` where possible.
- **Titles:** stop the double-brand ("… - Kinstel" on titles already containing "Kinstel"). Standardize to `Primary Keyword | Kinstel`.
- **Sitemap:** remove the invalid fragment URLs (`/#services`, `/#portfolio`); emit **real `lastmod`** per page; use the `www` host; update robots.txt sitemap line to the www URL.

### Step 1.3 — Ship structured data (JSON-LD) — you build this for clients; build it for yourself
- **Sitewide:** `Organization` (name "Kinstel Solutions", url, logo, `sameAs` [LinkedIn, X], and `identifier` entries for Udyam `UDYAM-UP-50-0230220`, IEC `HLCPS8014Q`, D-U-N-S® `77-197-4415`).
- **Home + Contact:** `LocalBusiness` (legalName, full NAP, `geo` lat/long, `areaServed` Lucknow/UP, `telephone`, `openingHours`, `priceRange`).
- **Service/vertical pages:** `Service` schema (serviceType, provider, areaServed).
- **Lucknow page:** `FAQPage` from the existing FAQ (write clean, extractable answers).
- **Sitewide:** `BreadcrumbList`.
- **Verify:** Google **Rich Results Test** + Schema.org validator on every template.

### Step 1.4 — Extend domain registration
- Renew **kinstel.com for 3–5 years** (currently a 1-year reg expiring 2026-09-28). Cheap, permanent trust signal.

---

## Workstream 2 — Make the measurement airtight (Week 1, parallel) 📊 the POC depends on this

> You can't prove "organic works" without clean attribution. Set this up *before* results arrive.

### Step 2.1 — Search Console
- Confirm the verified property (you already have `google-site-verification`). Add both `https://www.kinstel.com` and a Domain property.
- **Submit the corrected sitemap.** Use **URL Inspection → Request Indexing** on the Lucknow page and all money pages after the canonical fix.
- Track: impressions, clicks, average position for "web design Lucknow" cluster.

### Step 2.2 — GA4 + conversion events
- Confirm GA4 is firing (you run GTM/GA4 for clients — apply it here).
- Define **conversion events**: form submit, WhatsApp click, phone-number (`tel:`) click, "Get a Quote" click.
- Build a **Landing-page + Session-default-channel report** so you can isolate **Organic Search** vs **Paid** vs **Referral (DesignRush)** vs **Direct**.

### Step 2.3 — Lead-source truth
- Add a **"How did you find us?"** field to all forms (Google / Google Maps / DesignRush / Referral / Ad / Other).
- **UTM discipline:** tag every Ad + marketplace + social link so GA4 attributes correctly.
- Keep a simple **lead log** (date, source, geo, value, status) — this *is* your POC evidence.

---

## Workstream 3 — Turn on local organic discovery (Weeks 1–4)

### Step 3.1 — Google Business Profile (highest local ROI)
- **Claim/verify** the GBP; confirm it's **public** and appears in Maps for "Kinstel Solutions". *(Share the live listing URL so state can be confirmed.)*
- Complete **every** field: primary category **"Website designer"**, secondary **"Marketing agency" / "Internet marketing service"**; service areas (Lucknow, Gomti Nagar, Hazratganj, UP); hours; full NAP matching the site exactly; services list with descriptions; **Products with ₹ pricing**; 10+ photos (work, team, office); a keyword-honest business description.
- Enable **messaging**; add the **website + booking** links (UTM-tagged).

### Step 3.2 — Reviews sprint (this powers local pack AND global marketplaces later)
- You have delighted clients (₹7k/₹18k/₹24k/₹54k + the ₹3L SaaS). **Ask each for a Google review** with a direct review link.
- Target **5–10 Google reviews in Phase 1.** Respond to every one.
- Save the same clients for Clutch/GoodFirms reviews in Phase 2.

### Step 3.3 — Footer NAP + on-site local signals
- Add **consistent NAP to the sitewide footer** (keep the billing/admin number out of the primary NAP).
- Ensure the Lucknow page links contextually to Contact/Pricing and vice-versa (fix weak internal linking).

### Step 3.4 — Foundational local citations (identical NAP)
- Create/claim with **byte-identical NAP**: **Bing Places, Apple Business Connect, JustDial, Sulekha, IndiaMART**. (More in Phase 2.)
- This corroborates your entity for local SEO and starts fixing the name-collision problem.

---

## Workstream 4 — Fix the story (Week 2)

### Step 4.1 — Reconcile the contradictory stats
- Replace conflicting numbers ("10+ clients" vs "150+ law firms", "98%" vs "95+") with **one honest, consistent set** sitewide. Credibility > inflated claims — LLMs and humans both punish contradictions.

### Step 4.2 — Stop the positioning bleed (light touch now, full segmentation in Phase 2)
- Keep the local ₹9,999 entry where it drives local volume, but **frame it as a tier** ("Starter") alongside higher tiers, so it doesn't read as "we are cheap." Full premium/USD global face comes in Phase 2.

---

## Workstream 5 — Security/email hygiene (Week 2, quick) 🟡

- Add **security headers** (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) via `next.config`/`vercel.json`.
- **DMARC:** add `rua` reporting, confirm DKIM for Zoho + Amazon SES, then move `p=none → p=quarantine`.

---

## Phase 1 checklist

- [ ] Self-referencing canonical on all pages (www) — verified
- [ ] OG/titles/sitemap fixed; fragment URLs removed; real lastmod
- [ ] JSON-LD live (Organization/LocalBusiness/Service/FAQ/Breadcrumb) — passes Rich Results Test
- [ ] Domain renewed 3–5 yrs
- [ ] Search Console: sitemap submitted, money pages re-indexed
- [ ] GA4 conversion events + channel report live; lead-source field + UTM discipline
- [ ] GBP claimed, completed, public, surfacing in Maps
- [ ] 5–10 Google reviews collected
- [ ] Footer NAP sitewide; internal links improved
- [ ] Foundational citations (Bing, Apple, JustDial, Sulekha, IndiaMART) with identical NAP
- [ ] Stats reconciled; ₹9,999 reframed as a tier
- [ ] Security headers + DMARC hardening

## Success metrics (the POC)
- **Primary:** ≥1 **organic (non-Ads) local enquiry**, attributable in GA4/lead log.
- Lucknow page **indexed** and ranking (Search Console shows impressions/clicks for local terms).
- **GBP surfacing** in the local pack (GBP Insights shows Maps views, calls, direction/website clicks).
- Organic Search sessions **trending up** week over week.
- **Interpretation:** if organic + GBP produce even a couple of qualified leads at ~zero marginal cost, the POC is proven — and Phase 2 scales it while launching global.

## Rough cost/effort
- **Cost:** near-zero (domain renewal + optional citation time). Reviews/citations are free.
- **Effort:** ~2–4 focused dev/setup days for technical + schema; ongoing light work for GBP/reviews/citations.

➡️ **Next:** `phase-2-amplify-local-and-launch-validate-global.md`
