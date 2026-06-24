# Progress Tracker — MPG

last_synced_commit: 80d7247
context_synced_at: 2026-06-24
context_selftest: skipped (not first-run)

## Current Phase
Phase 2 (favourites) — **code complete**, awaiting live D1 provisioning. Public
directory + client Clerk auth live. Favourites/saved-comparisons backend (Pages
Functions + D1) and UI (♥ on table/detail, `/favourites`, save-on-compare) built;
inert until the owner provisions D1 + sets `CLERK_SECRET_KEY` on Cloudflare.

## What works now
- Landing `/`, `/gateways` (sidebar filter + sortable/searchable table), `/compare` (side-by-side, shareable `?ids=`), `/gateway/<slug>` detail, custom `404`.
- 38 entries (incl. 8 BNPL + PayNet infrastructure) with sourced fees; logos (favicons) + monogram fallback.
- Per-gateway **Other payment methods** (e-wallets) + **Supported banks (via FPX)** on detail + compare (spec 03, done). New: M1Pay, CardBizPay, Airwallex, PayNet.
- Auto-deploy: push master → GitHub Actions → Cloudflare Pages.
- Clerk sign up / sign in / UserButton (dark-themed modal), via `@clerk/clerk-js` CDN.

## Current Goal / Next Up
- Provision Phase 2 on live: `wrangler d1 create mpg-db`, run `schema.sql`, set the
  `DB` binding + `CLERK_SECRET_KEY` secret on the CF Pages project → flip spec 01 to `done`.
- Phase 3: Public "submit a gateway" (moderated → curated into `.md`).
- Switch Clerk to production keys (`pk_live`) before a real public launch.

## Open Questions
- Add **Payex** (payex.io, Maybank-owned) and/or **2C2P** (regional PSP)? Surfaced in the listicle rescan; awaiting AFU's go-ahead before sourcing + adding (spec 04).
- Backfill `methods` for the remaining gateways (asiapay, payhalal, xendit, bayarcash, etc.) once specific e-wallet lists are sourced (current sources were too generic).
- Phase 2/3 backend: confirm Cloudflare D1 (+ Pages Functions) as the data store.
- Switch Clerk to production keys (`pk_live`) before a real public launch.
- Whether to host full SVG wordmark logos (currently favicons + monogram).

## Decisions (safe summary)
- Stay on **Astro 7 static**; auth via Clerk **browser SDK (CDN)**, not `@clerk/astro` (incompatible with Astro 7). No SSR adapter.
- Phase 2 backend = **Cloudflare Pages Functions (`/functions`) + D1**, not an Astro SSR adapter — keeps the static build intact. Clerk verified server-side with `@clerk/backend`. Functions 503 when unconfigured so deploys never break pre-provisioning.
- Removed Split & Pace BNPL (defunct in MY).
- Fees never fabricated — `Contact sales` / `—` where unknown/not offered.
- FPX banks stored ONCE (`src/lib/fpx-banks.ts`, PayNet-sourced) and shown for any `fpx` gateway — not duplicated per file (national standard set).
- OnPay excluded from the directory — it's a sales-page SaaS that plugs in other gateways, not an acquirer. PayNet added as `category: infrastructure` (rails, not a merchant gateway).
