# Progress Tracker — MPG

last_synced_commit: 6092b3e
context_synced_at: 2026-06-27
context_selftest: skipped (not first-run)

## Current Phase
Pure static directory of **59** Malaysian payment providers, polished, with a
**/learn** section for devs and a **Jalur Gemilang** dark theme. Categorised by
how a merchant accesses them (gateway = integrate, bank/e-wallet = merchant
account, plus BNPL + infrastructure). Sourced fees, popularity-ranked by default.
No server/DB. Deployed (push master → Cloudflare Pages).

## What works now
- Landing `/`, `/gateways` (sidebar filter + sortable/searchable table + **sort dropdown**, `?category=` deep-links), `/compare` (shareable `?ids=`), `/gateway/<slug>` detail, custom `404`.
- **Default sort = lowest estimated fee** (gated). `src/lib/fees.ts` computes a unit-correct effective cost on a RM100 basket (`parseFeeShape` → `{pct,fixed,floor}`, `effectiveCost`, `gatewayCost` weighted FPX/card/e-wallet 50/30/20). Only gateways publishing comparable official rates are ranked (18/59); single-channel / indicative-`*` / "Contact sales" gateways show **"On request"** below. Table has an **Est. fee / RM100** column (beside Fixed fee). Dropdown: Lowest fees · Popularity · Lowest FPX/card/e-wallet · Name A-Z/Z-A. (See spec 07.)
- **59 gateways** across categories: gateway 40, bank 10, ewallet 1 (TNG), bnpl 7, infrastructure 1 (PayNet). Every entry sourced; Boost + CIMB publish rates, most banks/acquirers are "Contact sales".
- **Categories:** Gateways / Banks / E-wallet / BNPL / Infrastructure (sidebar radio, table/detail/compare badges at text-[8px]).
- **Access model** (`src/lib/access.ts`): each entry shows "Integrate (API/plugin)" or "Merchant account" (detail strip + compare row); /learn hub has a "Which type do you need?" explainer; category filter accepts `?category=` deep-links from /learn.
- **/learn** (spec 06): hub + glossary, integration-flow, ai-agents, checklist. Per-gateway "Copy prompt" from `skill:`.
- **Compare** list cells: short chips pair 2-per-row (lone one centered), long-name chips drop to a full-width centered row, and show-more toggles all providers at once.
- **Logos:** 59 real logos (no monograms). Square symbol-marks for wordmark brands, circle-crop (`logo_round`) for circular marks, all visible on dark (dark-on-transparent recoloured).
- Developer-experience (MCP/webhooks/plugins/dev_docs); Jalur Gemilang theme; Clerk auth (CDN). Auto-deploy: push master → GitHub Actions → Cloudflare Pages.

## Current Goal / Next Up
- Ranking redesign (spec 07) shipped A→D (default lowest-fee + gating + corrected popularity); **live as of 2026-06-27**. Optional follow-ups: per-RM100 cells on `/compare`; a separate visual track for BNPL/bank/wallet rows.
- Custom domain `malaysiapg.com.my` (MYNIC Letter of Undertaking ready) → CF Pages + Clerk `pk_live` when it lands.
- Phase 3: public "submit a gateway" (needs server + DB).

## Open Questions
- Reconsider the deferred Tier 2 international PSPs (2C2P, Adyen, Omise, Worldpay, Global Payments, Fiserv, Ksher, Nomu Pay, Pine Labs)? Found + deferred per AFU (Malaysian-focused).
- Tune the ranking knobs if AFU wants: channel weighting (50/30/20), basket size (RM100), or gating rule (currently FPX + card/e-wallet, OR card+e-wallet). Should ranking require FPX (e.g. Fasspay ranks #1 on card+e-wallet but has no FPX)?
- Per-entry access override for acquirer gateways that are "apply first" (currently derived as "Integrate" from category)?
- Backfill `methods` for remaining all-"Contact sales" gateways if/when sourced.

## Reference
- Owner's agent-skills repo: https://github.com/afu-it/malaysia-payment-gateway — maps 1:1 to the `skill:` field; backbone of /learn.
- Discovery research (2026-06-26): full candidate data in spec `context/feature-specs/04-expand-gateways.md`.

## Decisions (safe summary)
- Stay **Astro 7 static**; Clerk via CDN. No SSR adapter.
- Keep the whole MY payment landscape: gateways (integrate), banks (merchant account), e-wallets, BNPL. Distinguish purpose via categories + access model rather than excluding any.
- Tier 2 international PSPs SKIPPED (AFU: keep Malaysian-focused); kept as history in spec 04.
- Excluded as non-gateways: EOS Systems, Infinitium, Sinopay, Presto Pay, Merchantrade. Excluded banks (no distinct online gateway): Affin, Bank Islam, Bank Rakyat.
- myIOU removed (dormant). senangPay = "A DOKU Company" (same brand/URL).
- **Payex REJECTED (2026-06-27)** — payex.io is now Xendit Malaysia; Xendit already listed. Do not re-add.
- Logos: square symbol-marks for consistency; recolour dark logos rather than a global white plate (keeps the floating aesthetic).
- **Default table order = lowest estimated effective fee (gated), then On-request rows by popularity** (changed 2026-06-27 from popularity-first; the old `valueScore` mean was unit-broken — see spec 07 audit). Fees never fabricated; third-party values carry trailing `*` and are excluded from the ranking; unconfirmed numbers stay "Contact sales".
- Ranking redesign (spec 07) chosen over a one-line default flip because a 12-agent + adversarial audit proved the old "Lowest fees" mean mixed RM with %, dropped add-ons, and rewarded opacity. Editorial popularity corrected from researched market signals (estimates, not measured).
