# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-06-24
completed:
  - Default gateway table now ranks by value (mean of published FPX/card/e-wallet rates; unknowns sink)
  - Removed favourites (Phase 2) at owner's request: deleted /functions, D1 schema, FavButton, favourites client, /favourites page, save-comparison form; uninstalled @clerk/backend + @cloudflare/workers-types; reverted D1 binding + root tsconfig (spec 01 → rejected). Clerk sign-in/up kept.
  - Force-fetched logos for 9 logo-less gateways → all 38 entries now render a logo
  - Cleaned stray node_modules/.astro under src/content/gateways
  - Verified astro check 0 / build 42 pages / vitest 11/11; commits local-only (up to 049d08f + docs); NOT pushed
pending:
  - Decide: keep or remove Clerk sign-in/up (favourites was its only consumer)
  - Decide: add Payex (Maybank-owned) + 2C2P? (spec 04)
  - Backfill methods for remaining gateways when specific e-wallet sources found
  - Phase 3: public submit-a-gateway (would need server + DB)
next_action: Ask AFU — keep Clerk auth? add Payex + 2C2P? Then optionally push to deploy.
