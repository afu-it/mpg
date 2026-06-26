# ACTIVE — resume point

## Last Session
status: completed
saved_at: 2026-06-26
completed:
  - Liveness + social-recency sweep on all 38 gateways (multi-agent workflows). Removed dormant myIOU. senangPay noted as "A DOKU Company"; ipay88/NTT DATA confirmed.
  - Deep discovery (363 raw → 185 deduped, BNM-corroborated). Added 22 gateways: Tier 1 local acquirers (11), Tier 3 TNG eWallet (1), Tier 4 bank gateways (10). Directory 38 → 59. Skipped Tier 2 international PSPs per AFU.
  - New Bank + E-wallet categories (schema, sidebar, badges, compare). Badges shrunk to text-[8px].
  - Access model (lib/access.ts): per-entry Integrate-vs-Merchant-account indicator (detail + compare) + /learn "Which type do you need?" block + ?category= deep-links.
  - Sort dropdown on /gateways (Popularity / Lowest fees / Name A-Z / Name Z-A).
  - Compare list cells: lone-badge centering, long-name chips to full-width row, global show-more across providers.
  - Logo overhaul: QA'd all 59 on dark; fixed/replaced 30+ (recolour dark-on-transparent, replace tiny favicons, remove banners, square wide wordmarks to symbol marks), 8 circle-crops. Official art for J&C/Fasspay/RHB/Public Bank/HLB. 59 real logos, 0 monograms.
  - Verified: astro check 0, build 68 pages, vitest 11/11.
pending:
  - Custom domain malaysiapg.com.my (MYNIC Letter of Undertaking ready) → wire to CF Pages + Clerk pk_live when it lands.
  - Decide: add Payex (payex.io, Maybank-owned)? Still unsourced (spec 04). 2C2P + other international PSPs were deferred (Tier 2 skipped) — revisit if AFU wants foreign PSPs.
  - Phase 3: public submit-a-gateway (needs server + DB).
  - Optional: per-entry access override (some acquirer gateways are "apply first" but derive as "Integrate" from category).
next_action: When resuming, either wire the domain + Clerk pk_live for production, or source Payex / reconsider the Tier 2 international PSPs.
