# Phase 6 — New Page: Product / Platform Capability (`/platforms`)

**Branch:** `staging` (builds on `64a9550`). Local commits only; do NOT push.
**Goal:** A page that sells the "we build custom platforms/SaaS" capability in **BUYER language** (buyers search "custom website / web app / booking website / marketplace" — NOT "SaaS"). Showcases the consultation-marketplace DNA (Blissful) as proof. Honest + confident.
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8.

## Build `src/app/platforms/page.tsx` (server component, metadata)
Reuse the existing design system (study `about/page.tsx`, `global/page.tsx`, `page.tsx`). `Header`/`Footer`, container/heading patterns, Cards/Badge/lucide/SmartCtaButton, dark theme + gold accent. No new deps. Add a `Service` JsonLd node (via `JsonLd` component) with `serviceType: "Custom Web Platform & Application Development"`, `provider: {"@type":"Organization","name":"Kinstel Solutions"}`, `areaServed: ["India","Worldwide"]`.

### metadata
- title: `"Custom Web Platforms & Applications"`
- description: `"Kinstel builds custom web platforms — booking systems, multi-vendor marketplaces, dashboards, and web apps — engineered in modern code (Next.js, React). From MVP to scale."`
- `alternates: { canonical: "/platforms" }`

### Sections & copy (verbatim)

**Hero** — eyebrow `BEYOND WEBSITES`; H1 `When a website isn't enough, we build the platform.`; sub `Booking systems, marketplaces, dashboards, member portals, and full web apps — engineered in modern code, built to scale, and designed to convert. If you can describe it, we can build it.`

**What we build** (6 tiles/cards, icon + title + text)
1. **Booking & Appointment Platforms** — `Slot-based scheduling, payments, reminders, and admin control — for clinics, studios, and service businesses.`
2. **Multi-Vendor Marketplaces** — `Vendor onboarding, listings, bookings, payments, and payouts — a complete two-sided platform.`
3. **Customer & Admin Dashboards** — `Secure logins, role-based access, and the data views your team actually needs.`
4. **Member Portals & Subscriptions** — `Gated content, memberships, and recurring billing.`
5. **Web Apps & Custom Software** — `The workflows your business runs on — built to fit, not off-the-shelf compromises.`
6. **Integrations & Automation** — `Payments, CRMs, email, calendars, and the APIs that tie it all together.`

**Flagship proof** (highlight card — buyer language)
- Eyebrow `FLAGSHIP BUILD`; title `The Blissful Station — an online consultation & booking platform`.
- Text: `A complete platform for a mental-health practice — built end to end by Kinstel.`
- Bullets: `Practitioner profiles & discovery`, `Slot-based online + in-clinic booking with pre-payment`, `Secure in-platform video consultations`, `Client & practitioner dashboards`, `Admin panel with verification & financial tracking`.
- (Placeholder for now; real screenshots/metrics logged for endgame.) Link "Visit the live platform →" to `https://www.theblissfulstation.com/`.

**How we build** (light tech + process)
- Heading `Modern stack. Scoped to ship.`
- Text: `We build on a modern, scalable stack (Next.js, React, Node, cloud infrastructure) — secure by design. We start with a focused MVP that proves the concept, then grow it feature by feature.`
- 3 steps: **Discovery & Scoping** — `We turn your idea into a clear, buildable plan.` · **MVP Build** — `A working first version, fast — so you can test with real users.` · **Iterate & Scale** — `We add features, harden, and grow it as you do.`

**Why Kinstel** (short row/cards)
- **AI-native speed** — `We ship platforms faster and leaner than a traditional dev shop.`
- **Senior engineering** — `Real code, real architecture — built to scale and secure.`
- **Build + grow, one team** — `The team that builds your platform can also drive the traffic and conversions that fill it.`

**CTA** — H2 `Have a platform in mind?`; text `Tell us what you're building — we'll scope it and show you the fastest path to launch.`; `SmartCtaButton` (phone `+919889988408`, email `contact@kinstel.com`) label `Book a Discovery Call`.

## Navigation & sitemap
- Add **"Platforms"** to header nav (`header.tsx`) and footer **Services** column (`footer.tsx`).
- Add `/platforms` to `sitemap.ts` (priority 0.8, monthly).

## Constraints
- Buyer language: headline capability is "custom web platforms / web apps / booking & marketplace" — you MAY use "SaaS" once as a keyword but not as the primary framing.
- Honest: describe Blissful accurately (it's real). No invented metrics — the flagship card is qualitative for now.
- Reuse components; no new UI libs; don't alter other pages' content (only header/footer/sitemap links).

## Acceptance criteria
- `npm run build` completes; `/platforms` renders, in sitemap, linked from nav + footer; Service JsonLd present.
- Visually consistent with the site.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-6: add Platforms capability page (buyer language) + Service schema + nav/footer/sitemap`. Do NOT push. Before commit, `git status` — stage ONLY intended source files (no `organic_tasks/`/`kinstel_audit/`).
- Report: files created/changed, build result, commit hash, improvisation notes. Summaries only.
