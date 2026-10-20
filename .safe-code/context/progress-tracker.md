# Progress Tracker — MPG

last_synced_commit: 3227262
context_synced_at: 2026-10-20
context_selftest: skipped (not first-run)

## Current Phase
Pure static directory of **74** Malaysian payment providers, polished, with a
**/learn** section for devs and a **Jalur Gemilang** dark theme. Categorised by
how a merchant accesses them (gateway = integrate, bank/e-wallet = merchant
account, plus BNPL + infrastructure). Sourced fees, popularity-ranked by default.
No server/DB. Deployed (push master → Cloudflare Pages).

## What works now
- Landing `/`, `/gateways` (sidebar filter + sortable/searchable table + **sort dropdown**, `?category=` deep-links), `/compare` (shareable `?ids=`), `/gateway/<slug>` detail, custom `404`.
- **Default sort = lowest estimated fee** (gated). `src/lib/fees.ts` computes a unit-correct effective cost on a RM100 basket (`parseFeeShape` → `{pct,fixed,floor}`, `effectiveCost`, `gatewayCost` weighted FPX/card/e-wallet 50/30/20). Only gateways publishing comparable official rates are ranked (18/59); single-channel / indicative-`*` / "Contact sales" gateways show **"On request"** below. Table has an **Est. fee / RM100** column (beside Fixed fee). Dropdown: Lowest fees · Popularity · Lowest FPX/card/e-wallet · Name A-Z/Z-A. (See spec 07.)
- **74 gateways** across categories: gateway 54, bank 10, ewallet 2 (TNG, ShopeePay Direct), bnpl 7, infrastructure 1 (PayNet). 11 added 2026-07-17 (Herepay + discovery round 3). Every entry sourced and **fully re-audited against official sources on 2026-07-02** (all verified_date = 2026-07-02; 26 corrected; 21 rankable). Discovery round 2 added BetterPay (rankable), BOLD.Pay, Share Commerce, Antom (official MCP).
- **Categories:** Gateways / Banks / E-wallet / BNPL / Infrastructure (sidebar radio, table/detail/compare badges at text-[8px]).
- **Access model** (`src/lib/access.ts`): each entry shows "Integrate (API/plugin)" or "Merchant account" (detail strip + compare row); /learn hub has a "Which type do you need?" explainer; category filter accepts `?category=` deep-links from /learn.
- **/learn** (spec 06): hub + glossary, integration-flow, ai-agents, checklist. Per-gateway "Copy prompt" from `skill:`.
- **Compare** list cells: short chips pair 2-per-row (lone one centered), long-name chips drop to a full-width centered row, and show-more toggles all providers at once.
- **Logos:** 59 real logos (no monograms). Square symbol-marks for wordmark brands, circle-crop (`logo_round`) for circular marks, all visible on dark (dark-on-transparent recoloured).
- Developer-experience (MCP/webhooks/plugins/dev_docs); Jalur Gemilang theme; Clerk auth (CDN). Auto-deploy: push master → GitHub Actions → Cloudflare Pages.
- **Branding (2026-07-02):** real logo (shield + growth arrow, flag colours) as `public/logo.svg` (vector-traced, source of truth); header brand mark + "Malaysia Payment Gateway"; favicon set (ico 48/32/16 + 96 png for Google + SVG), apple-touch-icon, og:image 512. Google search icon updates when Google recrawls (days to weeks). Dark-mode variants: header uses `logo-white.svg`; `favicon.svg` is adaptive (white on dark browser chrome via prefers-color-scheme, coloured on light); coloured logo reserved for future light mode.
- **Contribute (spec 11, 2026-07-02):** `/contribute` page — contribution rules (sourced fees only), 4-step flow, Clerk-gated apply form → prefilled email application (GitHub username + area + message). Repo stays private; AFU invites approved contributors on GitHub; deploy workflow is owner-gated so collaborator pushes never auto-deploy. Linked from footer + /learn.
- **"Help me choose" wizard (spec 09):** `/choose` — 4-question fit-first flow → ranked shortlist (cheapest first) with reasons + Compare deep link. Powered by `src/lib/recommend.ts` (pure, tested); linked from landing/footer/learn. `recommend()` is the shared engine the planned SEO pages (Spec B) reuse.
- **Data API (spec 08):** static `GET /api/gateways.json` + `/api/gateways/<slug>.json` (build-time, no server), documented at `/learn/api`. Each entry carries `est_fee_rm100`/`rankable` so the API matches the site ranking. **MCP server** in `mcp/` (standalone CF Worker, 4 tools over the JSON API) — built + dry-run verified, deployed separately by AFU (`cd mcp && npx wrangler login && npm run deploy`).
- **Programmatic SEO pages (spec 10):** `/best/<profile>` (12 curated need-profiles: cheapest, FPX, cards, e-wallet, DuitNow QR, recurring, no-code, API, online-store, BNPL, plugins, generic) + `/vs/<a>-vs-<b>` (69 curated same-category head-to-heads: top-12 gateways where a side publishes rates + top-4 BNPL). Registry + builders in `src/lib/seo-pages.ts` (pure, 22 vitest) over `recommend()`/`fees.ts`; ItemList + FAQPage JSON-LD; `@astrojs/sitemap` (`sitemap-index.xml`) + `robots.txt`; linked from /learn hub Guides block + footer. Build = 151 pages.

## Current Goal / Next Up
- **Spec B / spec 10 (programmatic SEO pages) DONE 2026-07-02** — see What works. Next options: spec-07 ranking follow-ups (per-RM100 cells on /compare, visual track for BNPL/bank/wallet, FPX-required gating decision); Tier 2 PSP reconsideration; Phase 3 submit-a-gateway.
- API + MCP (spec 08) DONE + live: JSON API at `/api/gateways.json`; MCP Worker deployed at `https://mpg-mcp.afuitdev.workers.dev/mcp` (re-deploy: `cd mcp && npm run deploy`).
- Ranking redesign (spec 07) shipped A→D (default lowest-fee + gating + corrected popularity); **live as of 2026-06-27**. Optional follow-ups: per-RM100 cells on `/compare`; a separate visual track for BNPL/bank/wallet rows.
- Custom domain `malaysiapg.com.my` **LIVE** (2026-07-02): registered at YeahHost → nameservers moved to Cloudflare → CF Pages custom domain + SSL. Clerk **production** live too (`pk_live`, Google + email sign-in). MCP redeployed at the new domain.
- Phase 3: public "submit a gateway" (needs server + DB).

## Open Questions
- Reconsider the deferred Tier 2 international PSPs (2C2P, Adyen, Omise, Worldpay, Global Payments, Fiserv, Ksher, Nomu Pay, Pine Labs)? Found + deferred per AFU (Malaysian-focused).
- Tune the ranking knobs if AFU wants: channel weighting (50/30/20), basket size (RM100). Gating question CLOSED 2026-07-03: AFU keeps the current gate (FPX+1 OR card+e-wallet); Fasspay stays ranked without FPX.
- Per-entry access override for acquirer gateways that are "apply first" (currently derived as "Integrate" from category)?
- Backfill `methods` for remaining all-"Contact sales" gateways if/when sourced.

## Reference
- Owner's agent-skills repo: https://github.com/afu-it/malaysia-payment-gateway — maps 1:1 to the `skill:` field; backbone of /learn.
- Discovery research (2026-06-26): full candidate data in spec `context/feature-specs/04-expand-gateways.md`.

## SEO layer (2026-07-03 session)
- Trust pages live: /about (methodology + independence + contact), /privacy, /contact; footer links. E-E-A-T audit score 44 → 100.
- /vs/ hub page lists all 71 head-to-heads + homepage "Popular comparisons" block; internal links to /best //vs all trailing-slash (no 308 hops).
- Structured data: BreadcrumbList on 8 page types; WebPage + about:FinancialService + dateModified(=verified_date) on all 63 detail pages; ItemList/FAQPage on /best (urls trailing-slash); WebSite+Organization on home. NEVER add Offer/Rating schema to fees (spam risk, recorded in spec 12 + safe-refactor guardrails).
- AI-crawler access: Cloudflare "Managed robots.txt" (which blocked GPTBot/ClaudeBot/CCBot/Google-Extended) DISABLED by AFU 2026-07-03; public/robots.txt now explicitly allows 13 AI bots; public/llms.txt ships the AI-facing site guide. AFU's decision: full access including training.
- All 162 pages inside SERP windows (title 30-65, description 110-160), scan-enforced; canonical https+trailing-slash sitewide; footer "Last updated" = max verified_date (data-driven).
- public/_headers: HSTS, XFO, nosniff, Referrer-Policy, Permissions-Policy, immutable /_astro, HTML must-revalidate. CSP deliberately omitted (Clerk breakage risk).
- Astro whitespace trap: inline links on their own source line glue to surrounding text; fixed sitewide with {" "}; scan showed 0 gluings across a/code/em/strong.
- Round-2 backlog (BM content, glossary URLs, calculator, Wikidata, IndexNow, Dataset schema) lives in spec 12 (suggested).

## SEO round 2 + mobile (2026-07-03, specs 12 + 14)
- **191 pages** (was 162). New this session: /learn/glossary/<term>/ x14 (DefinedTerm LD, registry `src/lib/glossary.ts`), /calculator (fees.ts engine), /fee-changes (append-only `src/lib/fee-changes.ts`, audit-backed), /best/fastest-settlement/ (`src/lib/settlement.ts`, worst-case parsing), /alternatives/<slug>/ x12 (top-12 popular, recommend()-ranked), /llms-full.txt. Dated answer lines on /best; Dataset+WebAPI LD on /learn/api; TechArticle on guides; sitewide Organization @id.
- **Spec 12 DONE** (slices A-H): adds /ms/ BM set (hub, murah, cara-pilih, bisnes-online; reciprocal hreflang via src/lib/i18n-pages.ts read by Base.astro, html lang prop) + /learn how-to guides (how-to-accept-fpx, woocommerce-payment-gateways, shopify-payment-gateways-malaysia via src/lib/platform-guides.ts). 198 pages. Item 10 (entity corroboration) stays AFU-driven.
- **Mobile (spec 14)**: hamburger nav drawer sitewide; /gateways filter drawer + CSS card-list transform of the same table DOM (table.ts untouched); compare sticky labels; 44px drawer targets. Verified by chrome-devtools emulation (390x844 + 1280 desktop-unchanged); AFU real-device smoke pending.

## Security layer (2026-07-03, spec 13)
- Canonical security doc: `context/security.md` (ownership map + threat model TM-001..TM-008 + header decisions). Read it before touching auth, deploy, headers, or inviting collaborators.
- Headers: HSTS/XFO/nosniff/Referrer/Permissions live; **CSP ENFORCING since 2026-07-17** (AFU smoke clean; specs 13+14 closed). ACAO detached from HTML, `/api/*` only. COOP/COEP/CORP deliberately not enabled.
- Deploy actions SHA-pinned. **TM-001 trigger**: before inviting ANY collaborator, remove `CLOUDFLARE_API_TOKEN` from GH secrets (switch to Pages direct Git integration) or use fork+PR only — any workflow file on any branch can read repo secrets.
- AFU open: 2FA confirmation on GitHub/Cloudflare/YeahHost/Clerk/Google; Google OAuth secret rotation (pending since 2026-07-02).

## Blog layer (2026-07-17, spec 15 in-progress)
- **205 pages.** New: `/blog/` hub + `/blog/fees-pricing/` pillar + 5 posts (billplz/toyyibpay/hitpay/stripe pricing + fees-anchor) as content collection `src/content/posts/` (Zod). Registry `src/lib/blog.ts` (4 clusters, 1 live; AUTHOR entity + articleLd/authorLd), template `src/pages/blog/[slug].astro` (dated auto answer box + PostFeeBox render LIVE fees via toApiGateway — prose stays evergreen, numbers can't drift), FAQPage/Article/Person/ImageObject LD, PostAuthor bio (EEAT: Afu, GitHub+Threads sameAs, honest claims only), hero/OG webp screenshots of our own pages in `public/blog/`. Footer lists live pillars; "Guides" in top nav + drawer. Literal pillar routes beat the dynamic [slug] route — a cluster flips `live: true` only when its pillar page ships.
- **Editorial pipeline** (spec 15): keyword backlog = real GSC queries only; intent classification; product truth = the gateways collection (never claim what data doesn't hold); anti-slop passes; SERP windows + em-dash ban + internal-link + sources checks are vitest-enforced (blog.test.ts).
- **Sitewide trailing-slash fix (2026-07-17)**: all internal links now end with `/` (was: 78 paths × thousands of instances causing a 308 per click — the GSC "Page with redirect 104" source). Codemod over 32 files incl client scripts; dist scan = 0. Also: alt text on decorative logos, moby/paycools taglines lengthened, PayNet + fastest-settlement de-orphaned via glossary related-links, gateway title dedupe (Stripe/OxPay/UOB "Malaysia Malaysia").
- Baseline squirrel audit 2026-07-17: 80/100 (B); Core SEO/EEAT/Schema/Mobile/i18n/Social/URL = 100. Report: session scratchpad.

## Bing / IndexNow (2026-07-17)
- Bing had NOT indexed the site as of 2026-07-17 (Site Explorer empty, 0 impressions) despite Crawler Hints since 2026-07-03. Fixed: IndexNow API key hosted at `public/be9f66171aa84e118c136908bf9bedd2.txt` (public by spec); full sitemap (204 URLs) POSTed to api.indexnow.org + www.bing.com/indexnow, both 200. **Capability: after any deploy, changed URLs can be pinged directly** (payload shape in LOG 2026-07-17 chore entry; key + keyLocation from the hosted file). First 403 = key-file propagation, retry after a minute.

## Plans layer + redesign + discovery round 3 (2026-07-17, sitting 2)
- **Spec 17 per-plan pricing DONE**: optional `plans[]` on the gateways schema (name/eligibility/rows/settlement/source) + Plans section on detail pages. 16 gateways carry 46 sourced plans (toyyibpay 4, bayarcash 4, swif 4, payhalal 4, billplz/curlec/senangpay/bcl/betterpay/moby 3, others 2). Data from a 7-subagent official-source sweep of all gateways; HLB + Kiple unreachable from this network (re-verify). Ranking still uses top-level fees (= default plan).
- **Minimalist redesign (spec 16 + AFU "dark sparse" direction)**: oversized-type hero homepage w/ cheapest-5 live list + folded SEO definition; detail page = giant est-fee number, borderless fee list, lg 2-col grid (data left / features+dev rail right), folded banks/methods/AI-prompt; grouped 3-col footer; collapsed /gateways sidebar groups; MethodologyNote shared fine-print; short chips on /learn. Rollout of the same rhythm to /compare /choose /best /vs /learn-subpages/blog still pending.
- **Spec 18 (business-type profiles) DONE + Developer filter (API/MCP) on /gateways + logo round complete for all 11 new gateways (2026-07-17 evening). 219 pages.**
- **Spec 16 rollout DONE (2026-07-17 sitting 3)**: sparse rhythm on /compare /choose /best/* /vs/* /alternatives/* (borderless divide-y lists, focal H1s, folded SEO copy — 0 word-count losses) + light typographic pass on /learn subpages, glossary, blog. Spec 16 = done.
- **Dev-claims verification round (2026-07-17)**: 8 Firecrawl subagents checked all 74 gateways' api/dev_docs/mcp against official sources. MCP 7→9 (official: stripe/curlec/hitpay/airwallex/antom; community: bayarcash/xendit/billplz/ipay88), 27 dev_docs added/fixed, api flips: paynet+qashier→true, edxapay+jc-pacific→false. /gateways rows now badge API (api + public docs, 53) and MCP (blue accent, 9; official vs community in tooltip).
- **OPEN SOURCE + deploy migration (2026-07-17, spec 19 DONE)**: repo afu-it/mpg PUBLIC (149-commit secret scan clean first). MIT code / CC BY 4.0 data / logo trademark notice; README + CONTRIBUTING + issue templates; /contribute reworked to fork+PR. Branch protection on master. Deploys moved to Cloudflare Pages Git integration (`mpg-site`), GH Actions + all GH secrets deleted, TM-001 CLOSED. SEO wins live: Dataset LD real CC BY license URL, Organization sameAs GitHub, footer GitHub link, /about licence section, llms.txt open-source note; IndexNow pinged.
- **Discovery round 3 (2026-07-17)**: 4 subagent lenses + AFU finds + Firecrawl sweep → **11 new gateways** (herepay #1 ranking RM1.07; kineticpay [round-2 "restricted" reject REVERSED, now open], leanx, smap-pay, payright, lekirpay published fees; affanpay, edxapay, tulus, qashier, shopeepay-gateway contact-sales). BNM RMA registry (68 entities) fully reconciled vs directory. 30+ disqualified names recorded in spec-04 history territory (resellers of known gateways, zombies, foreign PSPs). All 11 carry official logos (done same day).
- Rankable 18 → 27 (after the 2026-07-17 full fee re-verification: M1Pay + AffanPay + LeanX + LekirPay + Payright + Moby entered; RinggitPay left after de-publishing its rates). Cheapest: herepay RM1.07, fasspay RM1.12, m1pay RM1.16, toyyibpay/cardbizpay RM1.19.
- **Full fee re-verification 2026-07-17**: all 74 entries checked field-by-field against official sources by 7 Firecrawl subagents (never-truncate rule after the AffanPay miss); ~20 corrected, 9 /fee-changes entries, verified_date=2026-07-17 sitewide.

## Decisions (safe summary)
- **Contribution model (2026-07-02, spec 11):** repo stays PRIVATE; approved applicants get a GitHub collaborator invite; applications arrive via prefilled email (not a backend form). GitHub free gives no branch protection on private repos, so the deploy job is actor-gated (owner-only) as the production safety net. Public-repo fork+PR was offered and declined.
- Stay **Astro 7 static**; Clerk via CDN. No SSR adapter.
- Keep the whole MY payment landscape: gateways (integrate), banks (merchant account), e-wallets, BNPL. Distinguish purpose via categories + access model rather than excluding any.
- Tier 2 international PSPs SKIPPED (AFU: keep Malaysian-focused); kept as history in spec 04.
- Excluded as non-gateways: EOS Systems, Infinitium, Sinopay, Presto Pay, Merchantrade. Excluded banks (no distinct online gateway): Affin, Bank Islam, Bank Rakyat.
- myIOU removed (dormant). senangPay = "A DOKU Company" (same brand/URL).
- **Payex REJECTED (2026-06-27)** — payex.io is now Xendit Malaysia; Xendit already listed. Do not re-add.
- Logos: square symbol-marks for consistency; recolour dark logos rather than a global white plate (keeps the floating aesthetic).
- **Default table order = lowest estimated effective fee (gated), then On-request rows by popularity** (changed 2026-06-27 from popularity-first; the old `valueScore` mean was unit-broken — see spec 07 audit). Fees never fabricated; third-party values carry trailing `*` and are excluded from the ranking; unconfirmed numbers stay "Contact sales".
- Ranking redesign (spec 07) chosen over a one-line default flip because a 12-agent + adversarial audit proved the old "Lowest fees" mean mixed RM with %, dropped add-ons, and rewarded opacity. Editorial popularity corrected from researched market signals (estimates, not measured).
- **Custom domain + production auth go-live (2026-07-02):** malaysiapg.com.my registered at YeahHost, DNS moved to Cloudflare, connected to CF Pages (SSL). Clerk production instance on `clerk.malaysiapg.com.my` (`pk_live`); sign-in = email code + password + Google (GitHub disabled). GH secret `PUBLIC_CLERK_PUBLISHABLE_KEY` holds `pk_live` for the prod build; local `.env` stays `pk_test` for `npm run dev`. Clerk instance config changes apply at runtime (no site rebuild needed). App `app_3FZd3mHzTBeSp0ufdwueJaORgP2`, prod instance `ins_3FvlB7gGDEHgTNV12mP6YFQQqBM`.
