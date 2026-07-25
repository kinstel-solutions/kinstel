# Phase 10 — Free Website Audit Tool (`/website-audit`)

**Branch:** `staging` (builds on `0f1e492`). Local commits only; do NOT push.
**Goal:** A free, gated "Instant Website Audit" — enter URL → real scores via Google PageSpeed Insights API → scored report on-page → captured lead. The flagship lead magnet (idea #1). Must work NOW keyless (rate-limited) and better once the owner adds an API key.
**Implementer:** Sonnet 5. **Design/spec by:** Opus 4.8.

## Pieces to build

### 1. Server route — `src/app/api/audit/route.ts` (POST)
- Accepts `{ url }`. Validate/normalise the URL (prepend `https://` if missing; reject obviously invalid).
- Calls PageSpeed Insights v5:
  `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<encoded>&category=performance&category=seo&category=accessibility&category=best-practices&strategy=mobile`
  - If `process.env.PAGESPEED_API_KEY` is set, append `&key=...`. **If not set, call WITHOUT the key** (PSI works keyless at low volume) — the tool must still function today.
- Parse and return a compact JSON: the 4 category scores (0–100), Core Web Vitals (LCP, CLS, INP/TBT, FCP) from lighthouseResult audits, and the top 3–5 "opportunities"/failed audits (title + short description). Handle PSI errors/timeouts gracefully → return a clean error the UI can show.
- Server-side only (hides key, avoids CORS). Reasonable timeout.

### 2. The page — `src/app/website-audit/page.tsx` (server component, metadata)
- title: `"Free Website Audit — Speed, SEO & Performance Checker"`; description: `"Get a free instant audit of your website's speed, SEO, accessibility, and best practices — powered by Google. See what's costing you customers, in seconds."`; `alternates:{canonical:"/website-audit"}`. **Indexed** (this is a lead/SEO asset).
- Hero + intro + the tool component + a "what we check / why it matters" section + CTA ("Want us to fix these? Book a call").

### 3. The tool — `src/components/tools/audit-tool.tsx` (client component)
- Input: website URL + email (email required to run — this is the lead gate) + optional "how did you find us". A "Run Free Audit" button.
- On submit: fire the lead (see #4), then POST to `/api/audit`, show a loading state (PSI can take ~10–20s — show a friendly progress message), then render the report.
- **Report UI:** 4 score gauges/rings (Performance, SEO, Accessibility, Best Practices) colour-coded (red <50, amber 50–89, green 90+); Core Web Vitals values; a short "Top opportunities" list. Reuse existing UI (recharts is available for gauges, or simple styled rings) + the site's design system (Cards, Badge, accent gold). Add a strong CTA under the report: "These are fixable — book a free strategy call" → SmartCtaButton.
- Graceful error state if the API fails (e.g., "Couldn't reach that URL — check it and try again").

### 4. Lead capture
- On run, send a lead notification email via the EXISTING Resend setup — study `src/app/actions.ts` and the inquiry-form flow + `src/emails/` templates and reuse that pattern (a server action `submitAuditLead({url,email,source})` or reuse the inquiry action). Include the audited URL + email.
- Fire GA `event({action:'generate_lead', category:'tool', label:'website-audit'})` on run.
- Do not block the audit if the email send fails (log + continue) — the lead email is best-effort.

### 5. API key guide + env
- Add to `.env.example`: `# Google PageSpeed Insights API key (optional — audit tool works without it but is rate-limited). See docs/pagespeed-api-setup.md\nPAGESPEED_API_KEY=`
- Create `docs/pagespeed-api-setup.md`: short step-by-step — go to Google Cloud Console → enable "PageSpeed Insights API" → Credentials → Create API key → copy → set `PAGESPEED_API_KEY` as an environment variable (locally in `.env.local`, and on Vercel as a project env var). Note it's free and no redeploy needed for a Vercel env var (just redeploy/restart to pick it up).

### 6. Wiring
- Add `/website-audit` to `sitemap.ts` (priority 0.8, monthly).
- Add a **"Free Audit"** link in the footer (and header nav if it fits without crowding — your judgment). A hero CTA on the home or services page is optional (skip if risky).

## Constraints
- Must build + run WITHOUT the API key present (keyless PSI). No secrets committed. Reuse existing email/UI patterns; recharts ok (already a dep). Additive — don't break other pages.
- Keep the report honest (show real PSI numbers, whatever they are).

## Acceptance criteria
- `npm run build` completes; `/website-audit` prerenders; `/api/audit` route exists.
- Submitting a real URL returns real scores (test with e.g. `https://example.com` if network allows; if the sandbox blocks external calls, note that and confirm the code path is correct).
- Lead event + email wired; graceful errors; guide doc + `.env.example` present.

## Deliverable
- Implement, build, **commit to `staging`**: `phase-10: free website audit tool (PageSpeed Insights) + lead capture + API key guide`. Do NOT push. `git status` — stage only intended source files.
- Report: files created/changed, whether external PSI call succeeded in-sandbox (or was blocked), how lead capture was wired, build result, commit hash. Summaries only.
