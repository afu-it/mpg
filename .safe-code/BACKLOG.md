# BACKLOG — operational queue

_2026-06-24_

- [~] Phase 2: save favourites + saved comparisons — **code complete**. Remaining = owner CF account steps to go live: `wrangler d1 create mpg-db` → paste id + uncomment `[[d1_databases]]` in `wrangler.toml`; `wrangler d1 execute mpg-db --remote --file=schema.sql`; set CF Pages D1 binding `DB` + secret `CLERK_SECRET_KEY`; then flip spec 01 → `done`. Spec: `context/feature-specs/01-save-favourites.md`.
- [ ] Phase 3: public submit-a-gateway, moderated (D1 pending → curated `.md`). Spec: `context/feature-specs/02-submit-gateway.md`.
- [ ] Switch Clerk to production keys (`pk_live`) + production instance before public launch.
- [ ] Decide: add **Payex** (payex.io, Maybank-owned) + **2C2P** (regional PSP)? Surfaced in listicle rescan; awaiting AFU before sourcing + adding (spec 04). StoreHub = POS (skip); crypto/NOWPayments not selected.
- [ ] Backfill `methods` for remaining gateways (asiapay, payhalal, xendit, bayarcash, etc.) when specific e-wallet lists are sourced (spec 03 follow-up).
- [ ] Logos for new gateways (m1pay, cardbizpay, airwallex, paynet) — currently monogram fallback.
- [ ] Optional: source full SVG wordmark logos (currently favicons + monogram fallback).
- [ ] Optional: collapsible "Filters" sidebar on mobile (currently stacks on top).
