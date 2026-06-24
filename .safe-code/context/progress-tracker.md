# Progress Tracker — MPG

last_synced_commit: 049d08f
context_synced_at: 2026-06-24
context_selftest: skipped (not first-run)

## Current Phase
Pure static directory, polished. 38 entries with sourced fees + e-wallet methods +
FPX banks; table defaults to value rank; every entry has a logo. Favourites (Phase 2)
was built then **removed** at the owner's request — no server/DB in the repo.

## What works now
- Landing `/`, `/gateways` (sidebar filter + sortable/searchable table, **value-ranked by default**), `/compare` (side-by-side, shareable `?ids=`), `/gateway/<slug>` detail, custom `404`.
- 38 entries (incl. 8 BNPL + PayNet infrastructure) with sourced fees; every entry has a logo (favicon-grade PNG; monogram fallback).
- Per-gateway **Other payment methods** (e-wallets) + **Supported banks (via FPX)** on detail + compare (spec 03, done). Recent adds: M1Pay, CardBizPay, Airwallex, PayNet.
- Auto-deploy: push master → GitHub Actions → Cloudflare Pages.
- Clerk sign up / sign in / UserButton (CDN) — kept, but currently gates no feature.

## Current Goal / Next Up
- Decide whether Clerk auth stays (favourites, its only consumer, was removed).
- Decide whether to add Payex + 2C2P (spec 04).
- Phase 3: Public "submit a gateway" (would need a server + DB; revisit then).

## Open Questions
- Add **Payex** (payex.io, Maybank-owned) and/or **2C2P** (regional PSP)? Surfaced in the listicle rescan; awaiting AFU's go-ahead before sourcing + adding (spec 04).
- Backfill `methods` for the remaining gateways (asiapay, payhalal, xendit, bayarcash, etc.) once specific e-wallet lists are sourced (current sources were too generic).
- Keep or remove Clerk sign-in/up now that favourites is gone?
- Whether to upgrade favicon-grade logos to real SVG wordmarks.

## Decisions (safe summary)
- Stay on **Astro 7 static**; auth via Clerk **browser SDK (CDN)**, not `@clerk/astro` (incompatible with Astro 7). No SSR adapter.
- Favourites (Phase 2: Pages Functions + D1 + Clerk) was built then **removed** at the owner's request — keep the site pure static. Spec 01 = rejected; do not re-suggest.
- Default table order = **value rank** (mean of published FPX/card/e-wallet rates; unknowns sink), not alphabetical.
- Removed Split & Pace BNPL (defunct in MY).
- Fees never fabricated — `Contact sales` / `—` where unknown/not offered.
- FPX banks stored ONCE (`src/lib/fpx-banks.ts`, PayNet-sourced) and shown for any `fpx` gateway — not duplicated per file (national standard set).
- OnPay excluded from the directory — it's a sales-page SaaS that plugs in other gateways, not an acquirer. PayNet added as `category: infrastructure` (rails, not a merchant gateway).
