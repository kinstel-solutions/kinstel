# Phase 5 — New Page: About (faceless, credential-anchored)

**Branch:** `staging` (builds on `56f748e`). Local commits only; do NOT push.
**Goal:** Create an `/about` page — the site currently has none (E-E-A-T gap). **Faceless + nameless** per owner: NO personal names, NO team photos, NO "3 brothers". Anchor trust in the verifiable ENTITY (registrations) + real work. Tone: honest + confident. Present Kinstel as "a small, senior, AI-native studio."
**Implementer:** Sonnet 5. **Copy by:** Opus 4.8.

## Build
Create `src/app/about/page.tsx` (server component with `metadata`). **Reuse the existing design system and match other pages' section styling** (import `Header`, `Footer`; use `container mx-auto px-4 md:px-6`, the `Card`/`CardHeader`/`CardContent`, `Badge`, `CheckCircle` from lucide, `SmartCtaButton`, the same heading classes/`font-headline` as `page.tsx`). Dark theme, accent = existing `text-accent` gold. No new dependencies. Add the `Organization` isn't needed (already sitewide); you MAY add a `BreadcrumbList` JsonLd if trivial.

### metadata
- `title`: `"About Kinstel Solutions"`  (template appends "| Kinstel Solutions")
- `description`: `"Kinstel Solutions is an AI-native web design, development, and marketing studio in Lucknow, serving businesses across India and worldwide. Verified, credentialed, and built for results."`
- `alternates: { canonical: "/about" }`

### Copy & sections (use verbatim; keep layout tasteful)

**Hero**
- Eyebrow: `WHO WE ARE`
- H1: `A studio that builds — and grows — your digital presence.`
- Sub: `Kinstel Solutions is an AI-native web design, development, and marketing studio based in Lucknow, working with businesses across India and around the world. We design and build high-performing websites and custom platforms — then run the marketing that grows them.`

**"What we do" (3 short cards or a simple grid)**
1. **Design & Build** — `High-performing websites, custom platforms, and SaaS — engineered in modern code (Next.js, React), not templates.`
2. **Grow** — `SEO, Google Ads, and conversion optimization that turn traffic into customers — and every rupee into a measurable return.`
3. **Support** — `Hosting, maintenance, and ongoing optimization, so what we build keeps working and keeps improving.`

**"Why Kinstel" (4 feature cards, icon + title + text)**
1. **AI-native & senior** — `A small, senior team amplified by AI. That means enterprise-grade craft with turnaround measured in days, not months.`
2. **Full-funnel, not just a handoff** — `We don't just deliver a website and disappear. We build the conversion machine and run the traffic that fills it.`
3. **Real engineering** — `From marketing sites to booking platforms and SaaS, we build in modern code — fast, secure, and scalable.`
4. **Measured by results** — `Every build is wired for analytics and conversion tracking, so you see exactly what your investment returns.`

**"Verified & compliant" (trust block — the faceless trust anchor)**
- Heading: `Verified. Credentialed. Accountable.`
- Text: `We're a registered business with verifiable credentials — rare for a studio our size. When you work with Kinstel, you're working with a real, accountable entity.`
- Badges/list (reuse the values already on the site's footer/credentials page): `Udyam MSME: UDYAM-UP-50-0230220` · `IEC: HLCPS8014Q` · `D-U-N-S®: 77-197-4415` · `Recognized by DesignRush`
- Link: "See our full credentials →" → `/credentials`.

**"How we work" (process, 4 steps — reuse the same wording pattern as the process on other pages if present)**
1. **Discovery** — `We learn your business, goals, and audience, and map the fastest path to results.`
2. **Design** — `A bespoke design built around your brand and conversion science.`
3. **Build** — `Engineered in modern code with obsessive attention to speed and detail.`
4. **Grow** — `We launch, measure, and optimize — turning your site into a growth engine.`

**CTA**
- H2: `Ready to grow?`
- Text: `Tell us what you're building. We'll show you the fastest path there.`
- `SmartCtaButton` (phone `+919889988408`, email `contact@kinstel.com`), label `Get a Free Consultation`.

## Navigation
- Add an **"About"** link to the header nav (`src/components/layout/header.tsx`) and to the footer's **Company** column (`src/components/layout/footer.tsx`), matching existing link patterns.
- Add `/about` to `src/app/sitemap.ts` (priority 0.6, monthly).

## Constraints
- Faceless/nameless: no names, no photos of people, no team headcount specifics beyond "small, senior team." No invented stats.
- Reuse existing components/classes; do NOT introduce new UI libraries or restructure the layout system.
- Don't touch other pages' content (only header/footer/sitemap get the new link).

## Acceptance criteria
- `npm run build` completes; `/about` renders and is in the sitemap; nav + footer link to it.
- Page visually consistent with the rest of the site (dark theme, gold accent, container widths, headings).

## Deliverable
- Implement, build, **commit to `staging`**: `phase-5: add About page (faceless, credential-anchored) + nav/footer/sitemap links`. Do NOT push.
- Report: files created/changed, build result, commit hash, anything you had to improvise (e.g., icon choices), and note it's faceless/nameless as required. Summaries only.
