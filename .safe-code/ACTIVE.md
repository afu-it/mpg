# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-07-02
completed:
  - Custom domain go-live: registered malaysiapg.com.my at YeahHost → nameservers moved to Cloudflare → zone Active → CF Pages custom domain (+ SSL). Repo pointed at the domain (Astro `site` + 5 URL swaps), committed 014feb8, pushed, deployed, verified live.
  - Clerk PRODUCTION: prod instance + domain malaysiapg.com.my verified (dns/ssl/mail); added 5 Clerk CNAMEs to Cloudflare. GH secret → pk_live, redeployed; live site confirmed serving pk_live. Disabled GitHub, kept Google; Google prod OAuth credentials added (AFU-created app). Google + email sign-in verified working end-to-end by AFU.
  - MCP Worker redeployed (MPG_API_BASE = https://malaysiapg.com.my).
  - Docs finalized via /safe-code --save (this bookkeeping commit).
pending:
  - Spec B — programmatic SEO pages (reuses recommend()): not yet specced. Own spec → plan → build.
  - Optional ranking follow-ups (spec 07): per-RM100 cells on /compare; separate visual track for BNPL/bank/wallet; decide if ranking should require FPX.
  - Reconsider deferred Tier 2 international PSPs; Phase 3 submit-a-gateway.
  - Optional: rotate the Google OAuth client secret (it appeared in a terminal paste during setup); re-run set-google-oauth if rotated.
next_action: Go-live complete (custom domain + production Clerk auth live and verified end-to-end). Next options: Spec B (programmatic SEO pages, reuses recommend()); optional spec-07 ranking follow-ups; or reconsider the deferred Tier 2 PSPs.
