# Phase 0 — Technical SEO Foundation (metadata plumbing)

**Branch:** `staging` (worktree). Local commits only; do NOT push.
**Goal:** Stop the site de-indexing itself and fix broken/inconsistent metadata. No copy/positioning changes (that's later phases).
**Implementer:** Sonnet 5. **Planner/reviewer:** Opus 4.8.

## Scope (do all; keep changes surgical)

### 1. Unify host to `www` + self-referencing canonicals
- `src/lib/site-config.ts`: change `url` from `https://kinstel.com` → `https://www.kinstel.com`. Update `ogImage` handling per §3.
- `src/app/layout.tsx`: **remove** the `alternates: { canonical: "/" }` block from root metadata (it's inherited by every page = the bug). Keep `metadataBase: new URL(siteConfig.url)`.
- Add a **self-referencing canonical to every indexable page's** `metadata` via `alternates: { canonical: "<path>" }` (relative — resolves against `metadataBase` www):
  - `/` (home, `src/app/page.tsx`) → `canonical: "/"`
  - `/contact`, `/credentials`, `/web-design-company-lucknow`, `/services`, `/packages`, `/global`, `/offers/lko`, `/law-firm-marketing`
  - Policy pages (privacy, terms, refund, delivery, shipping) are `noindex` — canonical optional, skip.
  - Ad landers already `noindex` (`/global-promo`, `/offers/knsl052526`) — skip.

### 2. Fix title double-brand
- `src/app/layout.tsx`: keep `title.default = siteConfig.title`, change `title.template` to `"%s | Kinstel Solutions"`.
- For each page whose `title` currently embeds the brand (e.g. `"Kinstel Solutions | Contact Us"`, `"Kinstel | ..."`), change the page `title` to the **descriptive part only** (template adds the brand). Examples:
  - contact → `"Contact Us"`
  - credentials → `"Credentials & Compliance"`
  - law-firm-marketing → `"Law Firm Website Design & Marketing"`
  - web-design-company-lucknow → keep its keyword-rich title but strip a trailing `- Kinstel`/duplicate brand
  - home stays `title.default` (unchanged text).
- Do NOT change keyword-bearing words (SEO); only remove the duplicated brand suffix/prefix.

### 3. Fix the broken OG image (currently 404s sitewide)
- Create `src/app/opengraph-image.tsx` using `ImageResponse` from `next/og` (1200×630). Brand: dark bg `#102A43`, gold accent `#D4AF37`, text "Kinstel Solutions" + tagline "Web Design, Development & Digital Marketing". Export `size`, `contentType = 'image/png'`, `alt`.
- Create `src/app/twitter-image.tsx` re-exporting the same (or a thin variant).
- In `src/app/layout.tsx`: **remove the hardcoded `openGraph.images` and `twitter.images`** that point to the missing `/og-image.png` (the file-convention images above auto-inject correct tags). Leave the rest of OG/twitter metadata.
- Remove now-unused `ogImage` from `site-config.ts` if nothing else references it (grep first).

### 4. Rewrite `src/app/sitemap.ts`
- Host = `https://www.kinstel.com`.
- **Remove** the `#services` / `#portfolio` fragment entries entirely.
- Include all indexable routes: `/`, `/contact`, `/credentials`, `/web-design-company-lucknow`, `/law-firm-marketing`, `/services`, `/packages`, `/global`, `/offers/lko`. (Exclude noindex policy/ad-lander pages.)
- Give home + money pages higher `priority` and a `changeFrequency`. For `lastModified`, use a single build-time `new Date()` is acceptable OR omit — but set distinct sensible `priority` (home 1.0, money pages 0.8, others 0.6). (lastmod realism is P2; don't over-engineer.)
- `public/robots.txt`: change `Sitemap:` line to `https://www.kinstel.com/sitemap.xml`.

## Out of scope (later phases — do NOT touch)
- JSON-LD / schema (Phase 1)
- Stat reconciliation, law-page retirement copy (Phase 2)
- GA/analytics, security headers (Phase 3)
- Any positioning/copy rewrite

## Acceptance criteria
- `npm run build` completes (report output; if the sandbox can't build, say so and at least confirm files compile logically).
- Root layout no longer emits a sitewide canonical; each indexable page has its own www canonical.
- No page title contains "Kinstel" twice.
- `opengraph-image` route exists; no metadata references the missing `/og-image.png`.
- `sitemap.ts` has no `#` fragment URLs, uses www, lists the indexable pages.

## Deliverable
- Make the edits, run the build, then **commit to `staging`** with message:
  `phase-0: technical SEO foundation (canonical, host, OG image, sitemap, titles)`
  Do NOT push.
- Report back: files changed, build result, anything skipped/uncertain, and any deviations from this plan. (This report becomes the Phase 0 log.)
