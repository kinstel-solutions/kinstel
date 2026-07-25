# Phase 3 — Measurement & Hardening (tone-independent; moved up)

**Branch:** `staging` (builds on `fe29dff`). Local commits only; do NOT push.
**Why now:** This phase is 100% independent of the stat/tone decision, so it runs while that's pending. Purely technical.
**Implementer:** Sonnet 5. **Planner:** Opus 4.8.

## Scope

### 1. Fix GA pageview over-counting (`src/components/GA-analytics.tsx`)
Currently the initial pageview fires up to 3×: the inline `gtag-init` `config` call, the `useEffect([])`, AND the `useEffect([pathname])` (which also runs on mount). Fix to fire exactly once per navigation:
- In the inline `gtag-init` script, set the config to NOT auto-send the initial page_view (add `send_page_view: false` to the `gtag('config', ID, { ... })` call).
- REMOVE the `useEffect([])` initial-pageview effect entirely.
- Keep a single `useEffect([pathname])` that calls `pageview(pathname + search)` — this now handles both the initial load and route changes, exactly once each.
- Verify `src/lib/gtag.ts` `pageview()` still does the `gtag('config', ID, { page_path })` call (that's the single source of pageviews now).

### 2. Add conversion event tracking (use the existing `event()` helper in `src/lib/gtag.ts`)
Wire `gtag` events for the key conversions (fire on user action, client components only):
- **Form submit success** — in the inquiry/lead forms (`src/components/sections/inquiry-form.tsx`, `src/app/global-promo/promo-inquiry-form.tsx`, and the pay/packages forms if straightforward): on successful submit, `event({ action: 'generate_lead', category: 'form', label: <which form> })`.
- **`tel:` click** — in `src/components/ui/click-to-call-link.tsx` and `time-based-call-button.tsx`: `event({ action: 'click_to_call', category: 'contact' })`.
- **WhatsApp click** — in `src/components/ui/whatsapp-widget.tsx`: `event({ action: 'click_whatsapp', category: 'contact' })`.
- Keep it minimal and safe; don't refactor the components, just add the event call in the existing click/submit handlers. If a component is a server component, skip it and note it.

### 3. Security headers (`next.config.ts`)
Add an async `headers()` returning these on all routes:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- **Do NOT add a Content-Security-Policy** — a strict CSP would break GA/Razorpay/DMCA/Vercel embeds. Leave CSP for careful later work (it's logged for endgame).

### 4. Do NOT touch (leave for endgame — will be logged)
- `typescript.ignoreBuildErrors: true` — do NOT remove it (there may be latent type errors that would break the build). Instead, run `npx tsc --noEmit` and REPORT the count/first few errors so we know the scope. Leave the flag as-is.
- No CI/GitHub Actions workflow (repo/ops decision for the owner).

## Constraints
- Tone-independent only. Do NOT touch stats, copy, positioning, schema, canonical/OG.
- Keep changes surgical; don't refactor components.

## Acceptance criteria
- `npm run build` completes.
- GA: exactly one pageview per navigation (inline config has `send_page_view:false`; only the `[pathname]` effect sends pageviews; the `[]` effect is gone).
- Security headers present in `next.config.ts`.
- Conversion events added to the reachable client handlers.
- `npx tsc --noEmit` error count reported (flag only; flag NOT fixed).

## Deliverable
- Implement, build, **commit to `staging`**: `phase-3: measurement & hardening (GA pageview fix, conversion events, security headers)`. Do NOT push.
- Report: files changed + what changed, GA fire-count reasoning, which conversion events wired (and any skipped server components), `tsc --noEmit` error count + first few, build result, commit hash. Summaries only.
