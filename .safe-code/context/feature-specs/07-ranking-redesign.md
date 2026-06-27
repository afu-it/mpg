---
status: in-progress   # suggested | approved | in-progress | done | rejected
created: 2026-06-27
---

> **Built 2026-06-27 (AFU approved full A→D).** New default = lowest effective fee
> (gated). `src/lib/fees.ts` rewritten (parseFeeShape/effectiveCost/gatewayCost,
> TDD 28 tests). GatewayTable: "Est. fee / RM100" column + eligibility gating +
> On-request zone; table.ts: default Lowest fees + per-channel sorts (FPX/card/
> e-wallet) + popularity-by-attribute; gateways.astro copy/dropdown; compare.ts
> + detail page use effective cost; popularity corrected on 34 files (16 inserts).
> Ranked head 18/59; TNG/Revenue Monster/toyyibPay/eGHL now On-request; Stripe
> ranks on real RM3.80. Verified: vitest 28/28, astro check 0, build 68. Pending:
> AFU visual review + `/safe-code --save` (commit) + push to deploy. Not yet done:
> per-RM100 cells on /compare (optional); separate visual track for BNPL/bank/wallet (optional).
# Ranking redesign — trustworthy "Lowest fees" + corrected popularity

## Goal
AFU wants the default sort on `/gateways` to be **Lowest fees** instead of Popularity,
and asked to verify that BOTH rankings are actually correct. A 12-agent audit
(workflow `wf_95ee0b04-7d4`, web-researched + adversarially re-verified against all
59 live `.md` files) concluded: **do NOT flip the default as-is** — the current fee
metric is broken on 3 independent high-severity counts. Get to a real "Lowest fees"
default via a metric rework + popularity fix.

## Audit findings (verified)

### Fee metric (`src/lib/fees.ts` parseFee + `GatewayTable.astro` valueScore) — BROKEN
`valueScore` = arithmetic mean of `parseFee(fpx,card,ewallet)`. `parseFee` takes the
first `%` (else first `RM`, else Infinity). Three high-severity defects, each fatal as
a default sort (all reproduced to the decimal by an independent re-run):
1. **Dimensional error** — flat RM FPX (e.g. "RM1.00"→1.0) averaged with true % (e.g. "2%"→2.0) as if same unit. boost & eGHL both land at 1.400, a meaningless tie (one mixes ringgit-into-percent).
2. **Dropped `+ RMx` add-ons** — `parseFee("1.2% + RM1.00")`=1.2; HitPay scored 1.5 but real RM100 card cost = RM2.20; Stripe FPX real RM100 cost = RM4.00 (scored 3.0). Tests at `fees.test.ts:8-13` codify the bug as intended.
3. **Sparse-data + transparency inversion** — averaging only finite channels rewards opacity: **TNG eWallet ranks #1 (0.50) on a single 0.5% e-wallet figure** (no FPX/card — it's a wallet, not a gateway); Revenue Monster #2 (0.80) on one indicative `from 0.8% *`; fasspay #7 with no FPX; **Stripe (honest "3%+RM1" everywhere) ranks DEAD LAST #25**. Opaque "Contact sales" gateways escape scoring entirely.
- Also: "From X%"/ranges scored at cheapest end; indicative `*` weighted = official (violates AGENTS.md sourcing rule); equal fpx/card/ewallet weight ignores FPX-dominant MY mix; setup/monthly/duitnowqr/bnpl/intl excluded.
- **34 of 59 (58%) score Infinity** → collapse into an alphabetical block. A "Lowest fees" default would order most of the table by NAME under a fees header, with no cue.
- valueScore is **dormant today** (popularity-first default; it only tiebreaks equal-popularity rows) — promoting it is a bigger, unvalidated change than it looks.

### Real MY fee structure (research)
- **FPX = flat RM**, not %. PayNet floor RM0.50 (B2C)/RM1.00 (B2B); merchant-facing typically RM1.00–RM1.25 B2C. (Stripe is the outlier charging FPX as %.)
- **Card = % MDR**: local debit ~1.0–1.5%, local credit ~1.8–2.5%, intl ~3.0–3.8%. "%+RM" mainly global players (Stripe, Airwallex).
- **E-wallet = %**, ~1.3–1.5%. DuitNow QR 0–1.6%.
- Fixed component **dominates small tickets** (RM0.50 fixed = 72% of fee at RM10, 21% at RM100) → a **basket-based RM comparison is fairer than headline %**.

### Popularity (editorial 0–100) — has real errors
- **16 gateways have no `popularity` field → default 0** (ahapay, asiapay, bcl, cardbizpay, commercepay, favepay-later, m1pay, managepay, moby, oxpay, paydee, payhalal, paynet, revpay, riipay, ringgitpay) → sunk alphabetically, mixing real listed companies (RevPay = Revenue Group Bhd KLSE, ManagePay = ACE-listed) with tiny BNPL apps.
- **Fiuu underrated** (86, but 70k merchants / RM44B-yr / 1.8M txns-day rivals iPay88) — ranked below Billplz/toyyibPay/senangPay.
- **Overrated by brand-halo**: Billplz 96→~82, toyyibPay 94→~72, senangPay 90→~70, Stripe 88→~68, Curlec 80→~62, Boost 72→~60.
- Corrected table (editorial estimates, NOT measured — treat as low/medium confidence) lives in workflow output `tasks/wo0qsb8rw.output` → `synthesis.correctedPopularity`. NB adversarial fixes: count is 16 not 17; ringgitpay oldPop=0 (its "1.4" was a fee-score); dedupe ManagePay.

## Scope (in / out)
IN (proposed, phased — see Approach):
- Fix popularity data (16 zeros + brand-halo corrections). Lowest-risk, highest-value.
- Per-channel sorts (Lowest FPX / card / e-wallet) — unit-consistent within a column, honest, low-risk interim.
- Effective-cost basket metric (RM50/100/200) + `{pct, fixed, floor}` parser + eligibility gating + UI split (ranked vs "Pricing on request").
OUT (for now): making blended "Lowest fees" the default BEFORE the rework + gating land; reclassifying BNPL/bank/wallet into separate tracks (optional later).

## Approach (phased)
**Phase A — Popularity fix (small, do first):** set the 16 zeros to defensible editorial values (BNPL/infra low-but-nonzero; RevPay/PayHalal/ManagePay/AsiaPay up), apply brand-halo corrections, add a `notRealMerchantGateway`/track signal. Keep Popularity as default. Label scores editorial.
**Phase B — Honest interim sorts:** add per-channel "Lowest FPX/card/e-wallet" sort options using unit-correct effective cost per column. Relabel any blended option "Lowest published rate (indicative)".
**Phase C — Effective-cost metric:** rewrite `parseFee`→normalizer returning `{pct, fixed, floor}` (match ALL components, "+", "or/whichever greater", "min"); rewrite `fees.test.ts`. Build-time `cost(ticket)=ticket*pct/100 + fixed` (max with floor); headline = mean effective RM across RM50/100/200; weight FPX 0.5/card 0.3/ewallet 0.2; range/"From" at midpoint not floor.
**Phase D — Gate + UI:** only rank gateways publishing official (non-`*`) rates for a min channel set; move single-channel/"Contact sales"/indicative rows into a distinct **"Pricing on request"** section below, never interleaved. Show per-RM100 effective cost in cells + a sortable "avg cost / RM100" column. ONLY THEN can "Lowest published rate" become default/co-default.

## Acceptance criteria
- No ranked row is a single-channel/indicative/"Contact sales" gateway (TNG, Revenue Monster, fasspay drop out of the ranked head).
- A transparent flat-rate pricer (Stripe) is no longer dead-last purely for disclosing; effective-cost reflects real RM100 cost.
- The 34 unscorable rows sit in an explicitly-labelled unranked section, not alphabetical-under-a-fees-header.
- 0 gateways silently at popularity 0; BNPL/infra distinguishable from "unscored".
- astro check 0, build green, vitest green (incl. rewritten parser tests). No fabricated fees; `*` discipline kept.

## Notes
- Risk: basket choice (RM50/100/200) is a value judgement biasing toward flat-FPX gateways → must be footnoted. Gating shrinks ranked set to ~10–15 of 59 → a gated default may feel sparse (reason to keep popularity default for now).
- Full audit detail: workflow `wf_95ee0b04-7d4`, output `tasks/wo0qsb8rw.output` (keys: popularity, feeLogic, feeReality, synthesis, adversarialCheck). Adversarial verdict: overallHolds=true.
- AFU's original ask was "default = lowest fees" — achievable as Phase C+D outcome, not a one-line default flip.
