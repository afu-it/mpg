# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-07-03
completed:
  - Spec 13 security hardening BUILT: ownership map + threat model (TM-001..008) in context/security.md; repo code review clean (XSS/secrets/MCP verified); GitHub Actions SHA-pinned; CSP shipped Report-Only; ACAO scoped to /api/* only; COOP/COEP/CORP decision documented.
  - Commits: adf4dfe (chore: SHA-pin actions), 5ceff6c (chore: CSP-RO + ACAO), + docs commit. Pushed at AFU's "buat je semua" → deploy + live verification run by JARVIS same session (see LOG verify entry if present).
pending:
  - AFU (spec 13): 2FA confirm on GitHub/Cloudflare/YeahHost/Clerk/Google; rotate Google OAuth client secret; signed-in live smoke (email + Google + contribute unlock) with console open.
  - Next session: flip CSP Report-Only → enforcing once AFU's smoke is clean.
  - AFU (SEO): GSC Request Indexing on / + top /best pages; AI Overview + favicon fix on recrawl.
  - Backlog watches: FavePay Later liveness, Mobi logo, UOB/RHB ewallet semantics.
  - Next units: spec 12 SEO round 2 (status: suggested — needs AFU approval), light mode, Phase 3 submit-a-gateway.
next_action: If AFU reports a clean signed-in smoke → flip CSP to enforcing (public/_headers, rename Report-Only header) + verify live + close spec 13 as done. Otherwise AFU picks the next unit (spec 12 is warmest but still suggested).
