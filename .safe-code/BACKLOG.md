# BACKLOG — operational queue

_2026-10-20 (rev 26)_

- [ ] **AFU security actions (spec 13)**: (1) confirm 2FA on GitHub / Cloudflare / YeahHost / Clerk / Google (TM-002, highest-leverage control); (2) rotate the Google OAuth client secret (pending since 2026-07-02) — Google Cloud Console → credentials → paste new secret into Clerk dashboard. (Item 3 smoke: DONE 2026-07-17, clean.)
- [ ] **HIGH — AFU distribution round (2026-07-17)**: (1) GSC Request Indexing for /blog/ + pillar + 5 posts (URL list in LOG entry); (2) GSC Removals → prefix request for https://clerk.malaysiapg.com.my/ (indexed empty Clerk page, cosmetic); (3) Bing "AI Performance" checked 2026-07-17: 0 citations BECAUSE Bing had zero-indexed the site — fixed via IndexNow direct push (204 URLs, both endpoints 200); re-check Site Explorer in days, AI Performance mid-August; (4) post the Threads draft (PROJEK/SKILLS/THREADS/output/2026-07-17-mpg-guides-launch.md); (5) submit MCP registry listings (mcp.so / PulseMCP / Smithery / Glama) — full copy-paste text below.
- [ ] **MCP registry listing text** (for item above): Name "Malaysia Payment Gateway (MPG)" · Endpoint https://mpg-mcp.afuitdev.workers.dev/mcp (Streamable HTTP) · Homepage https://malaysiapg.com.my/learn/api/ · Description: "Live fee data for 74 Malaysian payment gateways (FPX, cards, e-wallets, DuitNow QR, BNPL). 4 read-only tools: list, get, compare, and recommend a gateway by needs. Fees verified from official sources." · Example prompt: "Find the cheapest Malaysian gateway that supports FPX and recurring billing."
- [ ] **Spec 15 remaining slices (D-G)**: posts for clusters 2-4 (recurring / fpx-duitnow / ewallet-bnpl; pillar page + `live: true` flip per cluster), inbound links from /gateway detail + /learn pages into posts, BM post subset wired into i18n-pages hreflang, GSC-hygiene leftovers (single 404 + redirect-error URLs — not found in our own links, likely stale/external; recheck in GSC UI after recrawl).
- [ ] Squirrel follow-ups (Medium, from 2026-07-17 baseline 80/B): thin-content copy for /calculator /choose /compare /contact (min 300 words), above-fold logo lazy-loading tuning (Logo.astro is loading=lazy everywhere; first rows should be eager), calculator table th/td association (a11y), muted-text contrast warnings (52 spots, review once), sub-processor/DPA disclosure line for /privacy (Info).
- [x] **Flip CSP Report-Only → enforcing** — DONE 2026-07-17 (AFU smoke clean; deployed same day). One-time re-check: sign in once on live with console open after the enforcing deploy.
- [x] **GSC Request Indexing** — done by AFU 2026-07-03 (8 top URLs incl /ms/ + /calculator). Favicon + AI Overview fix themselves on recrawl.
- [x] **SEO round 2 (spec 12)** — DONE 2026-07-03, all 8 slices: schema/citability, glossary URLs, calculator, fee-changes, fastest-settlement, alternatives x12, BM pages + hreflang (/ms/), how-to guides (FPX/WooCommerce/Shopify). Only item 10 (entity corroboration, AFU-driven, next line) remains.
- [~] **Entity corroboration** (AFU-driven): Bing/IndexNow DONE 2026-07-03. REMAINING (README backlink DONE 2026-07-17 via open-source release): repo Website field, MCP registry listings (drafted 2026-07-17, see HIGH item above), Wikidata, community posts (Threads draft ready 2026-07-17; Lowyat/r/malaysia later). Bing "AI Performance" check now DUE (see HIGH item).
- [x] Spec 07 follow-ups (per-RM100 on /compare, On-request divider, FPX-gating decision: keep) — done 2026-07-03.

- [x] **Logo round for 11 new gateways** — DONE 2026-07-17 (official marks, house-style processing, playwright-verified).
- [x] **Spec 16 rollout** — DONE 2026-07-17 sitting 3 (compare/choose/best/vs/alternatives + learn/blog typographic pass; 0 word-count losses).
- [ ] **HIGH — AFU: revoke old Cloudflare deploy API token** at dash.cloudflare.com/profile/api-tokens (GH secrets already deleted; token also lives in the machine's shell env — remove there too).
- [x] (2026-10-20: spam gone, kept with dormancy warning; re-check ~2027-01, delist if still dormant) **HIGH — SwiF site (swifs.io) looks compromised** (homepage noindex + pirated-software spam posts, likely hacked WordPress; found 2026-07-17 dev-verification round). AFU decide: keep listed with a warning or delist until clean. We currently link to it.
- [ ] Delete old direct-upload Pages project `mpg` (domain-less rollback) after a few stable days on `mpg-site`.
- [x] (2026-10-20: RinggitPay api kept, plugin evidence; SecurePay dev_docs to /docs/; eGHL unchanged) MED dev-data follow-ups (2026-07-17 round): RinggitPay api:true evidence weak (no docs anywhere) — revisit; SecurePay GitBook says "last updated 5 years ago" — staleness check; eGHL public docs = Bitbucket PHP SDK only (full spec is merchant-only PDF).
- [ ] Announce open-source (Website field DONE 2026-10-20): Threads post (repo + CC BY story), submit to Google Dataset Search-adjacent lists once indexed.
- [x] (2026-10-20 refresh round, commit c82ec21) Fee-refresh candidates from 2026-07-17 sweeps: ahapay (6% MDR + SST), moby (full txn rates now published: FPX B2C RM2.00, cards 0.99%, DNQR 0.8%+RM0.10), bayarcash (revamped annual-fee plans — top-level fees likely stale), m1pay (full MDR card in application PDF), airwallex MY (unified card: local methods 1.4%+RM0.50), chip (stablecoin 1.5% channel), boost (RM2,000 per-txn limit note), fiuu (RM99 promo signup vs RM999). Also: KineticPay card %, AffanPay rate card, Qashier MY pricing (browser verify), SMAP Pay PayNet status + settlement.
- [x] (2026-10-20) Re-verify **HLB + Kiple** pricing from another network (geo/Cloudflare-blocked from this one, 2026-07-17).
- [ ] Spec 04 history update: record round-3 disqualified list (resellers/zombies/foreign, in SESSION 2026-07-17 log) + KineticPay reject reversal.
- [ ] Watch: **FavePay Later** liveness — product fading (not promoted on myfave.com homepage, help section behind login; fee article still live). Re-check on the next liveness sweep; remove if it goes myIOU-pattern dormant.
- [ ] **Mobi (ex-gomobi) logo** may need a brand refresh to match mobi.xyz branding (current logo is the old gomobi mark).
- [ ] Revisit UOB/RHB `ewallet: "—"` semantics — both accept e-wallets (unpriced); kept "—" conservatively since acceptance skews in-store/POS.
- [x] **Full official-source fee audit (all 59)** — done 2026-07-02 (26 corrected; verified_date bumped on all).
- [x] **Discovery round 2 (+4 gateways, 59→63)** — done 2026-07-02 (BetterPay, BOLD.Pay, Share Commerce, Antom; rejects in spec 04).

- [x] Site logo + favicon + header brand — done 2026-07-02 (AFU's mark, vector-traced `public/logo.svg` source of truth + full icon set). Google search icon appears after recrawl. Dark-mode variants done same day (white header mark + adaptive favicon).
- [x] **Open for contribution (spec 11)** — done 2026-07-02: /contribute (Clerk-gated apply → email), private repo + invite model, owner-gated deploys.
- [ ] Light mode (AFU intent, 2026-07-02): coloured `logo.svg` already reserved for it; needs a theme toggle + light token set. Own spec when AFU asks.
- [x] **TM-001 mitigation** — CLOSED 2026-07-17 (spec 19): deploys on Cloudflare Pages Git integration, deploy.yml + all GH secrets deleted; repo public, contributions via fork+PR (no write access needed, no secrets exist).

- [ ] Watch: stray vite deps cache keeps appearing in a source subdir (`src/content/gateways` before, `src/pages/` on 2026-06-26). Caused by `astro dev` + `CHOKIDAR_USEPOLLING` on the NTFS mount writing its cache relative to the wrong cwd. Gitignored so harmless to git, but pollutes the tree. If it recurs, pin vite `cacheDir` to a root path in `astro.config.mjs`.

- [x] **Custom domain `malaysiapg.com.my` + Clerk `pk_live`** — done 2026-07-02. Registered at YeahHost, DNS → Cloudflare, CF Pages custom domain + SSL, Clerk production instance live (Google + email sign-in), MCP redeployed at the new domain.
- [x] **Ranking redesign A→D (spec 07)** — done 2026-06-27 (effective-cost ranking + gating + Est. fee/RM100 column + per-channel sorts + corrected popularity). Live.
- [x] **Data API (spec 08, Phase 1)** — done 2026-06-27 (static `/api/gateways.json` + per-slug + `/learn/api` docs). Live on push.
- [x] **"Help me choose" wizard (spec 09)** — done 2026-06-27 (`/choose` + `recommend()` lib). Live on push.
- [x] **Spec B — programmatic SEO pages (spec 10)** — done 2026-07-02: `/best/*` (12 profiles) + `/vs/*` (69 curated pairs) via `src/lib/seo-pages.ts` over `recommend()`, sitemap-index.xml + robots.txt, /learn + footer links. Pushed → live on deploy.
- [x] Submit `sitemap-index.xml` in Google Search Console — done 2026-07-02 by AFU (property `malaysiapg.com.my` verified; sitemap status Success, index read same day). Discovered-pages count populates over days; check GSC "Pages" report in 1-2 weeks.
- [x] **Deploy the MCP Worker (spec 08, Phase 2)** — done 2026-06-27. Live at `https://mpg-mcp.afuitdev.workers.dev/mcp`, verified end-to-end (initialize + tools/list + recommend_gateway). Real URL wired into `/learn/api` + README. Re-deploy: `cd mcp && npm run deploy`.
- [x] Decide **Payex** — done 2026-06-27: REJECTED (payex.io is now Xendit Malaysia; already listed).
- [x] Optional ranking follow-ups (spec 07) — done 2026-07-03: per-RM100 cells on `/compare`, "Pricing on request" divider on /gateways; FPX-gating decided (keep current gate).
- [ ] Reconsider the deferred **Tier 2 international PSPs** (2C2P, Adyen, Omise, Worldpay, Global Payments, Fiserv, Ksher, Nomu Pay, Pine Labs) — all found + verified, skipped per AFU (kept Malaysian-focused). Full data in spec 04.
- [ ] Optional: per-entry `access` override — acquirer gateways (Fiuu, NTT DATA, local acquirers) are "apply first" but derive as "Integrate" from category.
- [ ] Phase 3: public submit-a-gateway, moderated (would need server + DB → curated `.md`). Spec: `context/feature-specs/02-submit-gateway.md`.
- [ ] Backfill `methods` for remaining gateways (asiapay, payhalal, xendit, bayarcash, …) when specific e-wallet lists are sourced (spec 03 follow-up).
- [x] Liveness + social-recency sweep on all gateways — done 2026-06-26 (removed dormant myIOU; all others live + active).
- [x] Deep discovery + add Tier 1/3/4 gateways — done 2026-06-26 (22 added, directory 59).
- [x] Tune `popularity` numbers — done 2026-06-27 (corrected all 59 from researched market audit; no longer any silently-0 gateways). Re-tune anytime; they are editorial estimates.
- [x] Collapsible Filters sidebar on mobile — done 2026-07-03 (spec 14: left drawer + card-list table + nav drawer).
- [x] Build `/learn` section (spec 06) — done 2026-06-25 (commit 65e192b).
- [x] Upgrade several favicon-grade logos to real brand assets — done for NTT DATA, PayHalal, RinggitPay, Bizappay, AsiaPay, Revenue Monster (2026-06-25).

- [ ] **eGHL rebrand pass** (2026-10-20): eghl.my 301s to my.nttdatapay.com (ADAPTIS e-commerce); update website/source/notes and re-check fees.
- [ ] MOBY `channels` still `[bnpl]` but it now publishes FPX/card/e-wallet/DuitNow QR rates; widen channels + methods.
- [ ] Kiple pricing page shows QR/e-wallet rows as logos only; confirm which rate maps to which logo. Fiuu BNPL in channels but unpriced on Aug 2026 card.
- [ ] **Kiple affiliate / Master Merchant Program**: AFU asked; decide disclosure policy first (/about says no affiliate links, not paid by any provider).
- [ ] Old Cloudflare API token revoke: AFU in dashboard (MCP + wrangler OAuth lack token permissions).
- [ ] retro: tool economy — shared checkout node_modules installed on another OS (broken .bin, wrong native bindings); every agent had to build its own fresh copy. Run `npm ci` once on this Mac or document it in AGENTS.md.
- [ ] retro: information access — gh default account is red-eagle-digital, repo is afu-it; first `gh repo edit` 404'd.
