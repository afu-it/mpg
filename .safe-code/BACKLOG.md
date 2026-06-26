# BACKLOG — operational queue

_2026-06-26 (rev 5)_

- [ ] Watch: stray vite deps cache keeps appearing in a source subdir (`src/content/gateways` before, `src/pages/` on 2026-06-26). Caused by `astro dev` + `CHOKIDAR_USEPOLLING` on the NTFS mount writing its cache relative to the wrong cwd. Gitignored so harmless to git, but pollutes the tree. If it recurs, pin vite `cacheDir` to a root path in `astro.config.mjs`.

- [ ] Custom domain: owner bought a domain → connect to the CF Pages project and switch Clerk to `pk_live` (production instance) when going live.
- [ ] Decide: add **Payex** (payex.io, Maybank-owned) + **2C2P** (regional PSP)? Awaiting AFU before sourcing + adding (spec 04). StoreHub = POS (skip); crypto/NOWPayments not selected.
- [ ] Phase 3: public submit-a-gateway, moderated (would need server + DB → curated `.md`). Spec: `context/feature-specs/02-submit-gateway.md`.
- [ ] Liveness pass on all gateway websites — iPay88 was found dead (→ NTT DATA); check the rest for dead/rebranded sites.
- [ ] Backfill `methods` for remaining gateways (asiapay, payhalal, xendit, bayarcash, …) when specific e-wallet lists are sourced (spec 03 follow-up).
- [ ] Optional: tune `popularity` numbers if owner wants a different #1.
- [ ] Optional: collapsible "Filters" sidebar on mobile (currently stacks on top).
- [x] Build `/learn` section (spec 06) — done 2026-06-25 (commit 65e192b).
- [x] Upgrade several favicon-grade logos to real brand assets — done for NTT DATA, PayHalal, RinggitPay, Bizappay, AsiaPay, Revenue Monster (2026-06-25).
