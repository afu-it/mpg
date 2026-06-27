# ACTIVE — resume point

## Last Session
status: completed
saved_at: 2026-06-27
completed:
  - Resumed (--continue); verified green; pushed the 6 prior local commits → CF Pages deploy (run 28278599282) → 59-gateway expansion + logos + Bank/E-wallet categories went LIVE.
  - Payex open question RESOLVED (rejected): payex.io is now Xendit Malaysia (verified page title "Payex is now Xendit"); Xendit already listed. Closed in spec 04 + progress-tracker.
  - Ranking audit (12-agent + adversarial workflow): proved the old "Lowest fees" valueScore was unit-broken (RM vs %, dropped add-ons, opacity reward); popularity had 16 silently-0 gateways + brand-halo errors. Captured as spec 07.
  - Ranking redesign A→D (AFU approved full scope), built + verified:
    - TDD rewrite src/lib/fees.ts (parseFeeShape/effectiveCost/gatewayCost) + 28 vitest.
    - Default sort = lowest effective fee (RM100 basket, 50/30/20), gated; "On request" zone for un-rankable gateways; Est. fee/RM100 column (beside Fixed fee); Lowest FPX/card/e-wallet sorts; detail + compare use effective cost.
    - Corrected editorial popularity on 34 .md files (filled 16 unset incl. RevPay/ManagePay; Fiuu up; Billplz/toyyibPay/senangPay/Stripe/Curlec/Boost down).
  - Verified: vitest 28/28, astro check 0 errors, build 68 pages. Committed (3 atomic) + pushed to deploy.
pending:
  - Custom domain malaysiapg.com.my (MYNIC Letter of Undertaking ready) → wire to CF Pages + Clerk pk_live when it lands.
  - Optional ranking follow-ups (spec 07): per-RM100 cells on /compare; separate visual track for BNPL/bank/wallet rows; decide if ranking should require FPX (Fasspay ranks #1 on card+e-wallet, has no FPX).
  - Reconsider deferred Tier 2 international PSPs (2C2P, Adyen, Omise, …) — kept Malaysian-focused per AFU.
  - Phase 3: public submit-a-gateway (needs server + DB).
next_action: When resuming, either wire the domain + Clerk pk_live for production, or pick up an optional spec-07 ranking follow-up. Tuning knobs (weights 50/30/20, basket RM100, gating rule) are in src/lib/fees.ts if AFU wants to adjust.
