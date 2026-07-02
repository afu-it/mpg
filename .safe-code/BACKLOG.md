# BACKLOG — operational queue

_2026-07-02 (rev 14)_

- [x] Site logo + favicon + header brand — done 2026-07-02 (AFU's mark, vector-traced `public/logo.svg` source of truth + full icon set). Google search icon appears after recrawl. Dark-mode variants done same day (white header mark + adaptive favicon).
- [x] **Open for contribution (spec 11)** — done 2026-07-02: /contribute (Clerk-gated apply → email), private repo + invite model, owner-gated deploys.
- [ ] Light mode (AFU intent, 2026-07-02): coloured `logo.svg` already reserved for it; needs a theme toggle + light token set. Own spec when AFU asks.
- [ ] When the first contributor is approved: GitHub Settings → Collaborators → invite; brief them on branch + PR flow.

- [ ] Watch: stray vite deps cache keeps appearing in a source subdir (`src/content/gateways` before, `src/pages/` on 2026-06-26). Caused by `astro dev` + `CHOKIDAR_USEPOLLING` on the NTFS mount writing its cache relative to the wrong cwd. Gitignored so harmless to git, but pollutes the tree. If it recurs, pin vite `cacheDir` to a root path in `astro.config.mjs`.

- [x] **Custom domain `malaysiapg.com.my` + Clerk `pk_live`** — done 2026-07-02. Registered at YeahHost, DNS → Cloudflare, CF Pages custom domain + SSL, Clerk production instance live (Google + email sign-in), MCP redeployed at the new domain.
- [x] **Ranking redesign A→D (spec 07)** — done 2026-06-27 (effective-cost ranking + gating + Est. fee/RM100 column + per-channel sorts + corrected popularity). Live.
- [x] **Data API (spec 08, Phase 1)** — done 2026-06-27 (static `/api/gateways.json` + per-slug + `/learn/api` docs). Live on push.
- [x] **"Help me choose" wizard (spec 09)** — done 2026-06-27 (`/choose` + `recommend()` lib). Live on push.
- [x] **Spec B — programmatic SEO pages (spec 10)** — done 2026-07-02: `/best/*` (12 profiles) + `/vs/*` (69 curated pairs) via `src/lib/seo-pages.ts` over `recommend()`, sitemap-index.xml + robots.txt, /learn + footer links. Pushed → live on deploy.
- [x] Submit `sitemap-index.xml` in Google Search Console — done 2026-07-02 by AFU (property `malaysiapg.com.my` verified; sitemap status Success, index read same day). Discovered-pages count populates over days; check GSC "Pages" report in 1-2 weeks.
- [x] **Deploy the MCP Worker (spec 08, Phase 2)** — done 2026-06-27. Live at `https://mpg-mcp.afuitdev.workers.dev/mcp`, verified end-to-end (initialize + tools/list + recommend_gateway). Real URL wired into `/learn/api` + README. Re-deploy: `cd mcp && npm run deploy`.
- [x] Decide **Payex** — done 2026-06-27: REJECTED (payex.io is now Xendit Malaysia; already listed).
- [ ] Optional ranking follow-ups (spec 07): per-RM100 effective-cost cells on `/compare`; separate visual track for BNPL/bank/wallet rows; decide whether ranking should require FPX (Fasspay ranks #1 on card+e-wallet but has no FPX).
- [ ] Reconsider the deferred **Tier 2 international PSPs** (2C2P, Adyen, Omise, Worldpay, Global Payments, Fiserv, Ksher, Nomu Pay, Pine Labs) — all found + verified, skipped per AFU (kept Malaysian-focused). Full data in spec 04.
- [ ] Optional: per-entry `access` override — acquirer gateways (Fiuu, NTT DATA, local acquirers) are "apply first" but derive as "Integrate" from category.
- [ ] Phase 3: public submit-a-gateway, moderated (would need server + DB → curated `.md`). Spec: `context/feature-specs/02-submit-gateway.md`.
- [ ] Backfill `methods` for remaining gateways (asiapay, payhalal, xendit, bayarcash, …) when specific e-wallet lists are sourced (spec 03 follow-up).
- [x] Liveness + social-recency sweep on all gateways — done 2026-06-26 (removed dormant myIOU; all others live + active).
- [x] Deep discovery + add Tier 1/3/4 gateways — done 2026-06-26 (22 added, directory 59).
- [x] Tune `popularity` numbers — done 2026-06-27 (corrected all 59 from researched market audit; no longer any silently-0 gateways). Re-tune anytime; they are editorial estimates.
- [ ] Optional: collapsible "Filters" sidebar on mobile (currently stacks on top).
- [x] Build `/learn` section (spec 06) — done 2026-06-25 (commit 65e192b).
- [x] Upgrade several favicon-grade logos to real brand assets — done for NTT DATA, PayHalal, RinggitPay, Bizappay, AsiaPay, Revenue Monster (2026-06-25).
