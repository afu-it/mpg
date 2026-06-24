# Progress Tracker — MPG

last_synced_commit: 7ad305a
context_synced_at: 2026-06-24
context_selftest: skipped (not first-run)

## Current Phase
Phase 2 (favourites) — **code complete**, awaiting live D1 provisioning. Public
directory + client Clerk auth live. Favourites/saved-comparisons backend (Pages
Functions + D1) and UI (♥ on table/detail, `/favourites`, save-on-compare) built;
inert until the owner provisions D1 + sets `CLERK_SECRET_KEY` on Cloudflare.

## What works now
- Landing `/`, `/gateways` (sidebar filter + sortable/searchable table), `/compare` (side-by-side, shareable `?ids=`), `/gateway/<slug>` detail, custom `404`.
- 34 gateways (incl. 8 BNPL) with sourced fees; logos (favicons) + monogram fallback.
- Auto-deploy: push master → GitHub Actions → Cloudflare Pages.
- Clerk sign up / sign in / UserButton (dark-themed modal), via `@clerk/clerk-js` CDN.

## Current Goal / Next Up
- Provision Phase 2 on live: `wrangler d1 create mpg-db`, run `schema.sql`, set the
  `DB` binding + `CLERK_SECRET_KEY` secret on the CF Pages project → flip spec 01 to `done`.
- Phase 3: Public "submit a gateway" (moderated → curated into `.md`).
- Switch Clerk to production keys (`pk_live`) before a real public launch.

## Open Questions
- Phase 2/3 backend: confirm Cloudflare D1 (+ Pages Functions) as the data store.
- Switch Clerk to production keys (`pk_live`) before a real public launch.
- Whether to host full SVG wordmark logos (currently favicons + monogram).

## Decisions (safe summary)
- Stay on **Astro 7 static**; auth via Clerk **browser SDK (CDN)**, not `@clerk/astro` (incompatible with Astro 7). No SSR adapter.
- Phase 2 backend = **Cloudflare Pages Functions (`/functions`) + D1**, not an Astro SSR adapter — keeps the static build intact. Clerk verified server-side with `@clerk/backend`. Functions 503 when unconfigured so deploys never break pre-provisioning.
- Removed Split & Pace BNPL (defunct in MY).
- Fees never fabricated — `Contact sales` / `—` where unknown/not offered.
