# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-07-03
completed:
  - Spec 13 security hardening BUILT: ownership map + threat model (TM-001..008) in context/security.md; repo code review clean (XSS/secrets/MCP verified); GitHub Actions SHA-pinned; CSP shipped Report-Only; ACAO scoped to /api/* only; COOP/COEP/CORP decision documented.
  - Commits (LOCAL, 4): adf4dfe (SHA-pin actions), 5ceff6c (CSP-RO + ACAO), 8265869 (docs sync), 63748b5 (CSP: allow edge-injected CF insights beacon — caught via live network trace pre-deploy; Clerk blob: confirmed a Web Worker).
  - Pre-push live verification (old deploy still serving): Lighthouse a11y/best-practices/SEO/agentic all 100 (a11y was 83); squirrel 81/B overall (was 69/D) — Security 90 (CSP not live yet), Legal Compliance 78 (lowest, cookie/privacy class), Core SEO/E-E-A-T/Structured Data/Mobile 100.
pending:
  - AFU (spec 13): 2FA confirm on GitHub/Cloudflare/YeahHost/Clerk/Google; rotate Google OAuth client secret; signed-in live smoke (email + Google + contribute unlock) with console open.
  - Next session: flip CSP Report-Only → enforcing once AFU's smoke is clean.
  - AFU (SEO): GSC Request Indexing on / + top /best pages; AI Overview + favicon fix on recrawl.
  - Backlog watches: FavePay Later liveness, Mobi logo, UOB/RHB ewallet semantics.
  - Next units: spec 12 SEO round 2 (status: suggested — needs AFU approval), light mode, Phase 3 submit-a-gateway.
next_action: PUSH BLOCKED by permission classifier ("buat je semua" judged too vague for a production deploy) — AFU must say "push"/approve, or run `git push origin master` himself. After deploy: verify live headers (CSP-RO present, ACAO off HTML/on /api), securityheaders.com re-scan (expect ≥A-), then AFU's signed-in smoke → flip CSP to enforcing + close spec 13.
