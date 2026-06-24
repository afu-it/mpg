# BACKLOG — operational queue

_2026-06-24_

- [ ] Phase 3: public submit-a-gateway, moderated (would need server + DB → curated `.md`). Spec: `context/feature-specs/02-submit-gateway.md`.
- [ ] Decide: does Clerk sign-in/up stay? Favourites (its only consumer) was removed — login now gates nothing. Remove auth, or keep for a future account feature?
- [ ] Switch Clerk to production keys (`pk_live`) before public launch (only if auth is kept).
- [ ] Decide: add **Payex** (payex.io, Maybank-owned) + **2C2P** (regional PSP)? Surfaced in listicle rescan; awaiting AFU before sourcing + adding (spec 04). StoreHub = POS (skip); crypto/NOWPayments not selected.
- [ ] Backfill `methods` for remaining gateways (asiapay, payhalal, xendit, bayarcash, etc.) when specific e-wallet lists are sourced (spec 03 follow-up).
- [ ] Optional: upgrade favicon-grade logos to real SVG wordmarks (a few are low-res Google favicons).
- [ ] Optional: collapsible "Filters" sidebar on mobile (currently stacks on top).
