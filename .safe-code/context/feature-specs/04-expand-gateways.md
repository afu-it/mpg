---
status: in-progress
created: 2026-06-24
---
> 2026-06-24: Added M1Pay, CardBizPay, Airwallex (sourced) + PayNet (infrastructure).
> OnPay EXCLUDED — it is a sales-page SaaS that plugs in other gateways, not an acquirer
> (revisit only if we add a "platform" category). Listicle rescan surfaced two more
> candidates pending the owner's go-ahead: **Payex** (payex.io, Maybank-owned) and
> **2C2P** (regional PSP). StoreHub = POS platform → skip. Crypto (NOWPayments) not selected.

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
