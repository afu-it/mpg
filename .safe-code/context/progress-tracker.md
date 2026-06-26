# Progress Tracker — MPG

last_synced_commit: dbda774
context_synced_at: 2026-06-26
context_selftest: skipped (not first-run)

## Current Phase
Pure static directory of **59** Malaysian payment providers, polished, with a
**/learn** section for devs and a **Jalur Gemilang** dark theme. Categorised by
how a merchant accesses them (gateway = integrate, bank/e-wallet = merchant
account, plus BNPL + infrastructure). Sourced fees, popularity-ranked by default.
No server/DB. Deployed (push master → Cloudflare Pages).

## What works now
- Landing `/`, `/gateways` (sidebar filter + sortable/searchable table + **sort dropdown**, popularity-ranked, `?category=` deep-links), `/compare` (shareable `?ids=`), `/gateway/<slug>` detail, custom `404`.
- **59 gateways** across categories: gateway 40, bank 10, ewallet 1 (TNG), bnpl 7, infrastructure 1 (PayNet). Every entry sourced; Boost + CIMB publish rates, most banks/acquirers are "Contact sales".
- **Categories:** Gateways / Banks / E-wallet / BNPL / Infrastructure (sidebar radio, table/detail/compare badges at text-[8px]).
- **Access model** (`src/lib/access.ts`): each entry shows "Integrate (API/plugin)" or "Merchant account" (detail strip + compare row); /learn hub has a "Which type do you need?" explainer; category filter accepts `?category=` deep-links from /learn.
- **/learn** (spec 06): hub + glossary, integration-flow, ai-agents, checklist. Per-gateway "Copy prompt" from `skill:`.
- **Compare** list cells: short chips pair 2-per-row (lone one centered), long-name chips drop to a full-width centered row, and show-more toggles all providers at once.
- **Logos:** 59 real logos (no monograms). Square symbol-marks for wordmark brands, circle-crop (`logo_round`) for circular marks, all visible on dark (dark-on-transparent recoloured).
- Developer-experience (MCP/webhooks/plugins/dev_docs); Jalur Gemilang theme; Clerk auth (CDN). Auto-deploy: push master → GitHub Actions → Cloudflare Pages.

## Current Goal / Next Up
- Custom domain `malaysiapg.com.my` (MYNIC Letter of Undertaking ready) → CF Pages + Clerk `pk_live` when it lands.
- Decide whether to source **Payex** (Maybank-owned). Tier 2 international PSPs (2C2P, Adyen, Omise, Worldpay, Global Payments, Fiserv, Ksher, Nomu Pay, Pine Labs) were found + deferred per AFU — revisit if wanted.
- Phase 3: public "submit a gateway" (needs server + DB).

## Open Questions
- Add Payex and/or the deferred Tier 2 international PSPs?
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
- Logos: square symbol-marks for consistency; recolour dark logos rather than a global white plate (keeps the floating aesthetic).
- Default table order = popularity, then value, then name. Fees never fabricated; third-party values carry trailing `*`; fee-verify stage downgrades unconfirmed numbers to "Contact sales".
