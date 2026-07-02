---
status: in-progress
created: 2026-06-24
---
> 2026-06-24: Added M1Pay, CardBizPay, Airwallex (sourced) + PayNet (infrastructure).
> OnPay EXCLUDED — it is a sales-page SaaS that plugs in other gateways, not an acquirer
> (revisit only if we add a "platform" category). Listicle rescan surfaced two more
> candidate pending the owner's go-ahead: **2C2P** (regional PSP). StoreHub = POS
> platform → skip. Crypto (NOWPayments) not selected. **Payex REJECTED 2026-06-27**
> (payex.io now redirects/rebrands to Xendit Malaysia — page title "Payex is now
> Xendit"; Xendit already listed; the earlier "Maybank-owned" note was inaccurate).
>
> 2026-06-26: Deep multi-agent discovery + liveness/social sweep (see "Discovery
> 2026-06-26" below). Removed dormant **myIOU**. Added **22** new gateways across
> Tier 1 (local acquirers), Tier 3 (TNG eWallet) and Tier 4 (bank gateways). AFU
> SKIPPED Tier 2 international PSPs. Directory: 38 → 59.

# Expand the gateway directory

## Goal
Add Malaysian merchant gateways currently missing from the directory, plus a clearly
labelled infrastructure entry, all with sourced fees/facts.

## Scope
- Add (merchant gateways, one `.md` each, sourced): **OnPay** (onpay.my), **M1Pay**
  (m1pay.com.my), **CardbizPay** (cardbiz.com.my), **Airwallex (Malaysia)**.
- Add **PayNet / DuitNow** as `category: infrastructure` — the national rails operator,
  NOT a merchant gateway. Clear note that merchants don't "sign up" with it directly.
- Re-scan the listicles (sitegiant, easystore, justsimple, rebrand, myadvisory, veecotech,
  paydibs blog, muralpay, nowpayments) for any other MY gateway still missing → propose
  before adding.
- Out (for now): crypto gateways (NOWPayments) — user did not select; revisit later.

## Approach
- New `category` enum value `infrastructure` (schema + table filter copy).
- Each new `.md` follows the existing Zod schema; fees `"Contact sales"` when unpublished,
  `"—"` when not offered. `source` = official site; `verified_date` = today.
- Cross-check against existing slugs to avoid duplicates (Revenue Monster, PayDIBS, Fiuu
  = Razer/MOLPay already present).

## Hard rule
Never fabricate a fee. Only publish numbers cited from the provider's own pricing/site.

## Acceptance
- New gateways appear in table/compare with sourced data and a verifiable `source`.
- PayNet shows as infrastructure with a note; no fake merchant fees.
- Listicle re-scan results recorded (added or "no new gateways found").

## Discovery 2026-06-26 (multi-agent sweep)
Method: liveness sweep (38 sites) + social-recency sweep (37) + deep discovery
(8 search angles, BNM-corroborated, verify + completeness critic). Raw 363 →
185 fresh after dedup → verified. Fee-verify stage downgraded any unconfirmed
published number to "Contact sales" (e.g. SecurePay RM1 FPX, Maybank RM0.50).

### Removed
- **myIOU** — site myiou.com.my is NXDOMAIN; socials dead since ~Jun 2023
  (operator IOUpay app-first only). Dormant business; AFU said remove. Also
  dropped "MyIOU (BNPL)" from senangPay methods.

### Added — Tier 1 (local acquirers, 11)
boost (PUBLISHED rates), ampersand-pay, axaipay, fasspay, paycools, gomobi
(Mobi Asia, distinct from MOBY BNPL), securepay, swif, bayarlah, jc-pacific,
finexus. Mostly BNM Registered Merchant Acquirers; mostly quote-only.

### Added — Tier 3 (1)
tng-ewallet (Touch 'n Go eWallet merchant acceptance, 0.5% MDR published).

### Added — Tier 4 (bank gateways, 10)
maybank2u-pay, cimb (PUBLISHED card rates 1.50-1.80% / 2.80-3.00%), public-bank,
rhb, hong-leong-bank, ambank, alliance-bank, uob-malaysia, ocbc-malaysia,
hsbc-omni-collect. All require a bank business account; mostly quote-only.
Excluded banks (no distinct online gateway, POS/third-party only): **Affin,
Bank Islam, Bank Rakyat**.

### Skipped — Tier 2 (international PSPs) — AFU scope choice, kept as history
2C2P (BNM acquirer, Ant/Antom), Adyen (partial public fees), Omise/Opn (public
MY fees), Worldpay, Global Payments, Fiserv/First Data MY, Ksher, Nomu Pay
(ex-Wirecard MY), Pine Labs. Revisit if AFU wants foreign PSPs later.

### Excluded — not online-checkout gateways
EOS Systems (POS/HLB partner), Infinitium (3DS infra), Sinopay (UnionPay POS),
Presto Pay (e-wallet, tied to Revenue Monster), Merchantrade (remittance).

### Still pending
- **Payex** — REJECTED 2026-06-27: payex.io is now Xendit Malaysia (page title "Payex is now Xendit"). Xendit already listed; do not re-add. Earlier "Maybank-owned" note was wrong.
- senangPay now "A DOKU Company" (note added; fees unchanged).
- Logo polish: boost, jc-pacific (favicon-size 32px); public-bank, rhb (monogram).

## Discovery round 2 (2026-07-02)

4-modal sweep (BNM FSP directory read in full: 68 non-bank + 22 bank acquirers;
market articles 2025-2026; plugin ecosystems; BM/community). Results archive:
session scratchpad discovery-2/*.txt (summaries below are the durable record).

**ADDED (AFU-approved):** BetterPay (Pay Direct Technology; published rate card,
rankable), BOLD.Pay (MACROKIOSK; quote-based, carrier billing angle), Share
Commerce (BNM-registered acquirer; quote-based, white-label + terminal side),
Antom (Ant International; quote-based, Alipay+ network, official MCP server).
Directory 59 -> 63.

**Explicitly SKIPPED by AFU this round:** Straight2Bank Pay (StanChart corporate
collect), PayPal (active for MY merchants but no FPX/DNQR; international class).

**REJECTED this round (do not re-suggest):**
- Tekkis / T-Pay — site live but no dated life since Aug 2023 (myIOU pattern).
- KineticPay — onboarding reportedly limited to omg-host customers; no 2025+ news.
- Aleta Planet — BNM-licensed but China-corridor B2B acquiring, not an SME gateway.
- UniPin — games/digital-content vertical aggregator only.
- MG Group — likely ISO/reseller, stale site assets.
- SHOPLINE Payments — platform-locked to SHOPLINE stores.
- ADAPTIS — NTT DATA brand consolidating already-listed iPay88 + eGHL (rebrand,
  not net-new; watch for eGHL brand retirement).
- Registry names resolving to existing entries: Simplepay Gateway=senangPay,
  Beez Fintech=bayarlah, Micro Bluetech=PayCools, Syntrino=SwiF, Mobiedge=HitPay,
  Commerce DotAsia=CommercePay, Axai Digital=Axaipay, Revenue Harvest=RevPay,
  Souqa=PayHalal, Fass=Fasspay, AiraPay=Moby Islamic.
- Dead/dormant confirmed: RaudhahPay (deadpooled), UPay/i-Serve (unreachable),
  ShopBack PayLater/Pay (discontinued; MY shutdown 25 Mar 2026), WavPay (wallet,
  dormant news), Ozopay (Merchantrade; origin down).
