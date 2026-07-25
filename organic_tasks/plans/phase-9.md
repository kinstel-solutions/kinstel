# Phase 9 — Depth: Internal Linking + Law-Page Reframe (final autonomous content phase)

**Branch:** `staging` (builds on `3db42da`). Local commits only; do NOT push.
**Goal:** Fix weak internal linking (audit C5) and reframe the law-firm page off its dead-niche "specialist" claim (strategy: retire/repurpose). Tasteful, additive, low-risk.
**Implementer:** Sonnet 5. **Copy/guidance by:** Opus 4.8.

## Part 1 — Internal linking (contextual, tasteful)
Add contextual in-body links between money pages. **Rule:** only where it reads naturally in existing copy; where it doesn't, add a subtle "Related:" line (small muted text with 2–3 links) at the end of a relevant section. Do NOT force links mid-sentence if awkward, and do NOT restructure layouts. Use Next `<Link>`.

Link map (add these connections):
- **`web-design-company-lucknow`** → links to `/services`, `/packages`, `/contact`.
- **`services`** → `/platforms` (for custom platforms/apps), `/work` (case studies), `/contact`.
- **`platforms`** → `/work/blissful-station` (flagship case study), `/services`.
- **`law-firm-marketing`** → `/services`, `/work`, `/contact`.
- **`about`** → `/work`, `/services`, `/platforms`.
- **`work/[slug]` (case study template)** → add a small "Related" area or in-copy links to `/services` and `/platforms` (applies to all studies via the template).
- **Blog post 1 (`how-much-should-a-website-cost-in-india`)** → within body, ensure it links to `/packages` and `/contact`. Blog post 2 (`nextjs-vs-wordpress`) → links to `/platforms` and `/services`. (If bodies are markdown strings in `src/lib/blog.ts`, add the links as markdown `[text](/path)` inside the existing sentences where natural — e.g. post 2's "Our take" can link "build in Next.js" context to `/platforms`; post 1's pricing paragraph to `/packages`. Keep wording, just add links.)

## Part 2 — Law-firm page reframe
Read `src/app/law-firm-marketing/page.tsx`. Reframe the HERO from a "premier specialist firm" claim to an honest "one industry we serve" vertical page. Replace the hero heading + subhead with:
- **H1:** `Websites & Marketing for Law Firms`
- **Subhead:** `We design conversion-focused websites and run the marketing that brings law firms qualified enquiries — part of the work we do for businesses across industries.`
- Remove/soften any remaining "Premier … Firm" / "specialist" overclaim language in the hero and intro ONLY. Keep the rest of the page (portfolio examples, sections) intact. (Stats were already corrected in Phase 2.)
- Keep the page indexed (it's a legit vertical page now); it already has canonical + Service schema.

## Constraints
- Additive/surgical. No layout-system changes, no new deps. Don't touch stat numbers (Phase 2), schema, canonical/OG.
- Keep all link text natural and short. If unsure whether a link placement is tasteful, prefer a small "Related:" line over forcing it into prose.

## Acceptance criteria
- `npm run build` completes; all routes still prerender.
- Money pages now cross-link contextually (verify a few links resolve to real routes).
- Law page hero reads as a vertical page, not a specialist-firm overclaim; no remaining "150+/premier specialist" overclaim in the hero.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-9: internal linking + law-page reframe`. Do NOT push. `git status` first — stage only intended source files.
- Report: files changed, which links added where, the law-page hero change, build result, commit hash, anything you judged too awkward to link (and why). Summaries only.
