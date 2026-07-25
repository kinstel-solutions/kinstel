# Phase 32 — Harden robots.txt (plan)
Disallow `/studio`, `/pay`, `/api/` in `public/robots.txt` (keep Allow / + www sitemap). Defense-in-depth for the auth-less internal `/studio` + transactional/api routes. Done inline by Opus (trivial static file — no Sonnet subagent, to conserve resources).
