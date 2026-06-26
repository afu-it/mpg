---
status: in-progress
created: 2026-06-24
---
> 2026-06-24: Added M1Pay, CardBizPay, Airwallex (sourced) + PayNet (infrastructure).
> OnPay EXCLUDED — it is a sales-page SaaS that plugs in other gateways, not an acquirer
> (revisit only if we add a "platform" category). Listicle rescan surfaced two more
> candidates pending the owner's go-ahead: **Payex** (payex.io, Maybank-owned) and
> **2C2P** (regional PSP). StoreHub = POS platform → skip. Crypto (NOWPayments) not selected.
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
- **Payex** (payex.io, Maybank-owned) — flagged 2026-06-24, not yet sourced.
- senangPay now "A DOKU Company" (note added; fees unchanged).
- Logo polish: boost, jc-pacific (favicon-size 32px); public-bank, rhb (monogram).
