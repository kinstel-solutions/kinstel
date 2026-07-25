# Kinstel Solutions — Comprehensive Codebase & Website Audit (`gemini_audit.md`)

**Date:** 25 July 2026  
**Audited Target:** `kinstel` (Next.js App Router, React 19, Tailwind CSS)  
**Basis:** Source-level audit of `src/` (main branch `cwd`) and `.claude/worktrees/staging/src` (`staging` branch).

---

## 1. Executive Summary & Audit Scorecard

| Area | Current Status (cwd) | Staging Branch Status | Target Requirement | Action Priority |
|---|---|---|---|---|
| **Canonical & Domain Unification** | 🔴 `kinstel.com` apex vs `www.kinstel.com` split | 🟨 Partial fix (`www.kinstel.com`) | 🟢 Unify on `https://www.kinstel.com` | **P0 (Critical)** |
| **JSON-LD Structured Schema** | 🔴 Missing completely | 🟨 Basic Org schema | 🟢 Complete Org + LocalBusiness + Service + FAQPage Schema | **P0 (Critical)** |
| **Studio Positioning & Voice** | 🔴 Generic web design agency | 🟢 AI-Native Growth & Product Studio | 🟢 Productized offers ("3–5 Day Builds") | **P1 (High)** |
| **International B2B Trust Stack** | 🔴 Missing completely | 🔴 Missing Clutch & D-U-N-S badges | 🟢 Clutch.co badge, D-U-N-S® `77-197-4415`, UDYAM seal | **P1 (High)** |
| **Lead Magnet Surface (CRO)** | 🔴 Missing tools | 🟢 Built (`/website-audit`, `/quote`) | 🟢 Hero integration ("Get Free Instant Audit") | **P1 (High)** |
| **Global Pricing Floors** | 🔴 Missing AUD/USD | 🟨 INR only | 🟢 AUD $750 / USD $500 entry build floor | **P1 (High)** |
| **AEO (AI Search Readiness)** | 🔴 No markdown tables / schema | 🟨 Basic blog posts | 🟢 Deep case study teardowns & comparison tables | **P2 (Medium)** |

---

## 2. Detailed Technical Audit Findings (File-by-File)

### A. Root Layout & Metadata (`src/app/layout.tsx` & `src/lib/site-config.ts`)
- 🔴 **Domain Split Bug:** `site-config.ts` currently references `https://kinstel.com` or `https://www.kinstel.com`. The primary production domain is `https://www.kinstelsolutions.com`. This causes split indexation and broken OpenGraph metadata.
- 🔴 **Broken OG Image:** `site-config.ts` points to `og-image.png` which does not exist in `public/`. Social shares (WhatsApp, LinkedIn, Twitter) display zero preview image.
- 🔴 **Missing Rich Schema:** Root layout lacks LocalBusiness, Service, and FAQPage JSON-LD schemas required for Google Maps 3-Pack and ChatGPT/Perplexity citations.

### B. Navigation & Information Architecture (`src/components/layout/navbar.tsx` & `footer.tsx`)
- 🔴 **Missing Tools Dropdown:** Header navigation lacks links to interactive lead tools (`/website-audit`, `/quote`, `/tools`, `/compare`).
- 🔴 **Missing Trust Badges in Footer:** Footer currently lists phone/email but omits the **D-U-N-S® badge (`77-197-4415`)**, **UDYAM registration badge**, and **Clutch.co verified agency seal**.

### C. Homepage Hero & Conversion Flow (`src/app/page.tsx`)
- 🟨 **Positioning Friction:** Homepage copy uses generic agency language (*"Premier Web Design & Digital Marketing"*). It needs to lead with your unique moat: **"AI-Native Growth & Product Studio — Sub-Second Next.js Websites & Custom Platforms in 3 to 5 Days."**
- 🟨 **Sub-optimal CTA:** Hero CTA button points to standard contact form rather than your viral lead magnet ([/website-audit](file:///c:/Users/alexr/Desktop/kinstel%20work/kinstel/organic_tasks/site-content_etc-updates.md#f-interactive-lead-magnets--tools-website-audit-quote-tools)).

### D. Global Page & Currency System (`src/app/global/page.tsx`)
- 🟨 **Pricing Alignment:** Global page needs explicit entry pricing floors (**AUD $750 / USD $500**) for starter builds, with clear upsell paths into recurring retainers (AUD $600/mo).

---

## 3. Structural, Layout & Content Recommendations

```
                               ┌─────────────────────────┐
                               │   HEADER & MAIN NAV     │
                               └────────────┬────────────┘
                                            │
   ┌───────────────┬───────────────┬────────┴──────┬───────────────┬───────────────┐
   │               │               │               │               │               │
┌──┴──┐         ┌──┴──┐         ┌──┴──┐         ┌──┴──┐         ┌──┴──┐         ┌──┴──┐
│  /  │         │/about│        │/plat│         │/work│         │/tools│        │/quote│
│Home │         │Studio│        │Proof │       │ Audit │       │ Build │
└─────┘         └──────┘        └─────┘         └─────┘         └──────┘        └──────┘
```

1. **Merge `staging` into `main` (`cwd`):** Bring over all 32 completed phases (`/about`, `/blog`, `/compare`, `/faq`, `/tools`, `/website-audit`, `/quote`, `/studio`, `/platforms`, `/work`, `/feed.xml`).
2. **Domain Unification:** Enforce `https://www.kinstelsolutions.com` as canonical sitewide.
3. **Hero CRO Optimization:** Set `/website-audit` as primary Hero CTA button and `/quote` as secondary.
4. **Footer B2B Trust Stack:** Embed Clutch.co badge, D-U-N-S® `77-197-4415`, and UDYAM seals.
5. **AEO Content Teardowns:** Add technical engineering teardowns for *The Blissful Station* (SaaS platform architecture) and *Chopra Retec* (Next.js performance).

---

*File generated for roadmap formulation.*
