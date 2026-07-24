# ⭐ PHASE-ENDGAME — Things That Need YOUR Input

> This file is intentionally kept SEPARATE from the phase logs. It's the running list of everything I built with placeholders / my-best-guess that you should review and replace with real data during phase-endgame. I'll keep appending as phases run. Nothing here blocks progress — it's all "swap in later."

**Legend:** 🟥 needed to be truthful before going live · 🟨 improves quality · 🟩 optional polish

---

## Stats & claims (Phase 2)
- 🟥 **Real results metric.** I removed the unverified "300% conversion/lead increase" and "150+ law firms" claims and unified the homepage stats to defensible ones (`10+ Clients Served`, `95+ PageSpeed Score`, `3–5 Day Delivery`). **If you have real client outcome data** (lead lift, traffic growth, conversion rate, ad ROI like your ₹15k→₹4L), give it to me and I'll add a substantiated results stat.
- 🟨 **Confirm exact client count** — I used "10+". If it's higher, say so.

## Case studies (Phase 4) — you gave full permission for all clients
For each, I'll write the narrative now using **placeholder metrics + whatever images exist in `public/`**. Please later provide:
- 🟥 **Blissful Station** (₹3L telehealth platform): real screenshots (dashboards, booking, video UI), any usage numbers (therapists onboarded, bookings), go-live status, a testimonial quote.
- 🟨 **James Bond Cleaning** (AU): live site URL, before/after, any lead/ranking results from the ₹25k/mo SEO, testimonial.
- 🟨 **Chopra Retec Rubber** (₹54k B2B): live URL, screenshots, testimonial.
- 🟨 **EdGrowth Consultants** (ads client): live URL, ad results (leads/CPL), testimonial.
- 🟩 **TBSPL / Fehmifarz**: anything usable.
- 🟩 Note: you said you can write testimonials on clients' behalf — I'll draft placeholder quotes; you approve/replace.

## About page (Phase 4)
- 🟨 Confirm the **faceless + nameless "AI-native studio"** framing is what you want (my recommendation). If you ever want the 3-brothers/ADHD/AI story public, tell me and I'll add it.
- 🟩 Any **real founding date / origin detail** I can use truthfully (domain reg is Sept 2025).

## NAP / Local (from Phase 1, carried forward)
- 🟥 **Live GBP listing URL** + confirm the **exact address** (the "Gomtinagar" bit was ambiguous in the source; I need the canonical GBP-matching NAP).
- 🟨 **Geo coordinates** (lat/long) for LocalBusiness schema — omitted for now (didn't guess).

## Brand assets
- 🟨 A proper **social/OG image** if you want a designed one (I generated a clean text-based one).
- 🟩 Any **real portfolio screenshots** beyond what's in `public/` to enrich pages.

## Blog (Phase 5)
- 🟨 I'll draft initial posts on topics I choose (honest, in your voice-guess). Flag any **topics you want / don't want**, or facts to correct.

---
*(more items will appear here as later phases run)*

## Technical debt (Phase 3)
- 🟨 **Pre-existing type error** `src/app/global-promo/actions.ts:79` (TS2322). Fixing it is the prerequisite to removing `typescript.ignoreBuildErrors:true` and adding CI. Small fix — flag for endgame.
- 🟩 **Content-Security-Policy** — deferred; needs careful allow-listing (GA, Razorpay, DMCA, Vercel) so it doesn't break embeds/payments.
- 🟩 **CI (GitHub Actions)** — not added; your repo/ops call (typecheck + build on push).

## 🔔 REMINDER — revisit later (owner asked)
- 🟨 **Stat/tone aggressiveness.** Owner chose "honest + confident" (option 1) FOR NOW but wants to **revisit whether to go bolder** — e.g. leading with the real jaw-droppers (27× ad ROI, ₹3L telehealth platform, 3–5 day builds) or a more aggressive posture. Bring this up in endgame review. All content is currently written honest-confident; dialing it up later is a copy pass, not a rebuild.

## Feature tools (built Phase 10–12)
- 🟥 **PageSpeed Insights API key** — the free Audit tool works keyless (rate-limited) but needs your key for reliable volume. Guide: `docs/pagespeed-api-setup.md`. Add it as `PAGESPEED_API_KEY` in your env (Vercel env var) — no redeploy of code needed, just set the var.
- 🟨 **Quote builder** — built from your à-la-carte pricing card; outputs a soft "starting from" RANGE (not the full itemized list, per your "don't scare them upfront" note). Review the ranges/labels and adjust if any feel off.
- 🟩 **USD/AUD mode** for the quote builder (for the global page / overseas clients) — not built yet; ₹ only for now. Flag if you want it.

## Internal /studio (Phase 13)
- 🟥 **/studio has NO auth yet** — only `noindex,nofollow` + unlinked (security-through-obscurity). Add real access control before relying on it (Basic Auth via middleware, a password gate, or a private deploy).
- 🟨 **Invoice data is localStorage (device-bound)** — not shared across the 3 of you; each browser has its own saved clients/drafts. Supabase (or similar) sync is the future upgrade for a shared source of truth.
