# Progress Tracker — MPG

last_synced_commit: 24f513f
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
- Compare "Other methods" cell: 2 chips/row grid + `+N more` toggle. "FPX online banking" dropped from methods (Banks row covers it).
- Fees deep-sourced: filled many from provider rate cards/docs; third-party/indicative values carry a `*` marker with a legend (table/compare/detail). Genuinely-private gateways stay "Contact sales".
- **Developer experience** dimension (spec 05, done): schema `mcp`/`webhooks`/`plugins`/`dev_docs`. MCP official = Stripe, Curlec, HitPay, Airwallex; community = Xendit, Bayarcash. Detail section + table MCP badge + compare rows.
- Auto-deploy: push master → GitHub Actions → Cloudflare Pages.
- Clerk sign up / sign in / UserButton (CDN) — **kept** (owner's call); currently gates no feature, reserved for a future account feature. Switch to `pk_live` at real deploy.

## Current Goal / Next Up
- Real deploy: owner bought a domain → wire it to the CF Pages project + switch Clerk to `pk_live` (production instance) when going live.
- Decide whether to add Payex + 2C2P (spec 04).
- Build the `/learn` section for devs/vibe-coders (spec 06, planned — owner said plan only for now): glossary, safe integration flow, AFU's skills + copy-paste agent prompts, MCP/API explainer, production checklist.
- Phase 3: Public "submit a gateway" (would need a server + DB; revisit then).

## Open Questions
- Add **Payex** (payex.io, Maybank-owned) and/or **2C2P** (regional PSP)? Surfaced in the listicle rescan; awaiting AFU's go-ahead before sourcing + adding (spec 04).
- Backfill `methods` for the remaining gateways (asiapay, payhalal, xendit, bayarcash, etc.) once specific e-wallet lists are sourced.
- Remaining all-"Contact sales" gateways (OxPay, RevPay, Paydee, M1Pay MDR, CommercePay MDR, AsiaPay rates) are genuinely quote-only — no official OR third-party figures exist. Leave unless they publish later.
- Whether to upgrade favicon-grade logos to real SVG wordmarks.

## Reference
- Owner's agent-skills repo: https://github.com/afu-it/malaysia-payment-gateway — gateway-agnostic `malaysia-payment-gateway` skill + `setup-<gateway>` skills (chip, curlec, xendit, bayarcash, bcl, toyyibpay, billplz, fiuu, senangpay, hitpay, stripe-malaysia). Maps to our `skill:` field. Has ready agent prompts + security rules + production checklist → backbone for the planned `/learn` section (spec 06).

## Decisions (safe summary)
- Stay on **Astro 7 static**; auth via Clerk **browser SDK (CDN)**, not `@clerk/astro` (incompatible with Astro 7). No SSR adapter.
- Favourites (Phase 2: Pages Functions + D1 + Clerk) was built then **removed** at the owner's request — keep the site pure static. Spec 01 = rejected; do not re-suggest.
- Default table order = **popularity** (curated `popularity` field, most-used in MY first), then best value, then name. (Superseded the earlier value-first default at the owner's request.) Top: iPay88, Billplz, toyyibPay, senangPay, Stripe, Fiuu, eGHL, Curlec, CHIP, Xendit. Editorial — tweak the numbers freely.
- Removed Split & Pace BNPL (defunct in MY).
- Fees never fabricated — `Contact sales` / `—` where unknown/not offered. **Third-party/indicative values are allowed but MUST carry a trailing `*`** (e.g. `"6% *"`); official values have no marker. `parseFee` ignores the `*`, so sorting still works. Legend explains it on table/compare/detail.
- FPX banks stored ONCE (`src/lib/fpx-banks.ts`, PayNet-sourced) and shown for any `fpx` gateway — not duplicated per file (national standard set).
- OnPay excluded from the directory — it's a sales-page SaaS that plugs in other gateways, not an acquirer. PayNet added as `category: infrastructure` (rails, not a merchant gateway).
