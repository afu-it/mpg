# BACKLOG — operational queue

_2026-06-26 (rev 6)_

- [ ] Watch: stray vite deps cache keeps appearing in a source subdir (`src/content/gateways` before, `src/pages/` on 2026-06-26). Caused by `astro dev` + `CHOKIDAR_USEPOLLING` on the NTFS mount writing its cache relative to the wrong cwd. Gitignored so harmless to git, but pollutes the tree. If it recurs, pin vite `cacheDir` to a root path in `astro.config.mjs`.

- [ ] Custom domain `malaysiapg.com.my` (MYNIC Letter of Undertaking ready) → connect to the CF Pages project and switch Clerk to `pk_live` when going live.
- [ ] Decide: source **Payex** (payex.io, Maybank-owned)? Still unsourced (spec 04).
- [ ] Reconsider the deferred **Tier 2 international PSPs** (2C2P, Adyen, Omise, Worldpay, Global Payments, Fiserv, Ksher, Nomu Pay, Pine Labs) — all found + verified, skipped per AFU (kept Malaysian-focused). Full data in spec 04.
- [ ] Optional: per-entry `access` override — acquirer gateways (Fiuu, NTT DATA, local acquirers) are "apply first" but derive as "Integrate" from category.
- [ ] Phase 3: public submit-a-gateway, moderated (would need server + DB → curated `.md`). Spec: `context/feature-specs/02-submit-gateway.md`.
- [ ] Backfill `methods` for remaining gateways (asiapay, payhalal, xendit, bayarcash, …) when specific e-wallet lists are sourced (spec 03 follow-up).
- [x] Liveness + social-recency sweep on all gateways — done 2026-06-26 (removed dormant myIOU; all others live + active).
- [x] Deep discovery + add Tier 1/3/4 gateways — done 2026-06-26 (22 added, directory 59).
- [ ] Optional: tune `popularity` numbers if owner wants a different #1.
- [ ] Optional: collapsible "Filters" sidebar on mobile (currently stacks on top).
- [x] Build `/learn` section (spec 06) — done 2026-06-25 (commit 65e192b).
- [x] Upgrade several favicon-grade logos to real brand assets — done for NTT DATA, PayHalal, RinggitPay, Bizappay, AsiaPay, Revenue Monster (2026-06-25).
