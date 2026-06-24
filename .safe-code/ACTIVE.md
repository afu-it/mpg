# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-06-24
completed:
  - Phase 2 (favourites) code-complete (Pages Functions + D1 + client); awaiting live provisioning
  - Banks + Other-Methods dimension (spec 03, done): banks/methods schema, src/lib/fpx-banks.ts (shared PayNet list), detail + /compare UI
  - Directory expanded (spec 04): +M1Pay, +CardBizPay, +Airwallex, +PayNet (infrastructure); methods backfilled for 8 gateways; all sourced via 4 research agents
  - OnPay excluded (not an acquirer); verified astro check 0 / build 43 pages / vitest 11/11
  - Commits local-only (up to 80d7247 + docs); NOT pushed
pending:
  - Provision Phase 2 D1 on live (owner CF account): wrangler d1 create mpg-db → paste id + uncomment [[d1_databases]]; wrangler d1 execute mpg-db --remote --file=schema.sql; set CF Pages D1 binding DB + secret CLERK_SECRET_KEY; flip spec 01 → done
  - Decide: add Payex (Maybank-owned) + 2C2P? (spec 04 / BACKLOG)
  - Backfill methods for remaining gateways when specific e-wallet sources found
  - Phase 3: public submit-a-gateway; switch Clerk to pk_live before launch
next_action: Ask AFU whether to add Payex + 2C2P; meanwhile provision Phase 2 D1 on Cloudflare to take favourites live
