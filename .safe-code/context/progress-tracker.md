# Progress Tracker — MPG

last_synced_commit: pending
context_synced_at: 2026-06-24
context_selftest: skipped (first save)

## Current Phase
Live MVP + auth foundation. Public directory works (34 gateways, table, compare,
landing). Clerk auth (sign up / user button) just added, client-side.

## What works now
- Landing `/`, `/gateways` (sidebar filter + sortable/searchable table), `/compare` (side-by-side, shareable `?ids=`), `/gateway/<slug>` detail, custom `404`.
- 34 gateways (incl. 8 BNPL) with sourced fees; logos (favicons) + monogram fallback.
- Auto-deploy: push master → GitHub Actions → Cloudflare Pages.
- Clerk sign up / sign in / UserButton (dark-themed modal), via `@clerk/clerk-js` CDN.

## Current Goal / Next Up
- Confirm Clerk auth on live (publishable key now wired into the GH Action build).
- Phase 2: Save favourites / saved comparisons (needs accounts + DB).
- Phase 3: Public "submit a gateway" (moderated → curated into `.md`).

## Open Questions
- Phase 2/3 backend: confirm Cloudflare D1 (+ Pages Functions) as the data store.
- Switch Clerk to production keys (`pk_live`) before a real public launch.
- Whether to host full SVG wordmark logos (currently favicons + monogram).

## Decisions (safe summary)
- Stay on **Astro 7 static**; auth via Clerk **browser SDK (CDN)**, not `@clerk/astro` (incompatible with Astro 7). No SSR adapter.
- Removed Split & Pace BNPL (defunct in MY).
- Fees never fabricated — `Contact sales` / `—` where unknown/not offered.
