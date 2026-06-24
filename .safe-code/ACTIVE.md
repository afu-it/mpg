# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-06-24
completed:
  - Phase 2 (favourites) code-complete: Pages Functions (/api/favourites, /api/compares) + D1 schema
  - Clerk session verified server-side via @clerk/backend; 503 graceful degrade when unprovisioned
  - Client: ♥ on table/detail, /favourites page, save-comparison on /compare
  - Scoped functions/tsconfig.json (Workers types) vs Astro/DOM root tsconfig
  - Verified: astro check 0 errors · functions tsc clean · build 39 pages · vitest 11/11
  - 4 local commits (up to docs sync); NOT pushed
pending:
  - Provision Phase 2 on live (owner Cloudflare account): wrangler d1 create mpg-db → paste id + uncomment [[d1_databases]] in wrangler.toml; wrangler d1 execute mpg-db --remote --file=schema.sql; set CF Pages D1 binding `DB` + secret CLERK_SECRET_KEY; flip spec 01 → done
  - Phase 3: public submit-a-gateway (moderated → curated .md)
  - Switch Clerk to production keys (pk_live) before public launch
next_action: Provision Phase 2 D1 on Cloudflare (3 steps above), then verify favourites persist on live and flip spec 01 → done
