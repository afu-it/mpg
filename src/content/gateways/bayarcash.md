---
name: Bayarcash
website: https://bayarcash.com
tagline: "Realtime-settlement FPX, QR & direct debit gateway"
logo: /logos/bayarcash.svg
fees:
  fpx: "RM1.00"
  card: "RM1.00 + 1%"
  ewallet: "—"
  duitnowqr: "1.6% / RM0.15"
  bnpl: "1.6% / RM0.15"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+2 (T+1 for some banks)"
min_txn: "—"
channels: [fpx, card, duitnowqr, bnpl]
features:
  no_code: true
  api: true
  recurring: true
skill: setup-bayarcash
mcp: "community"
webhooks: true
plugins:
  - WooCommerce
  - GiveWP
  - Fluent Forms
  - Gravity Forms
  - EasyStore
dev_docs: https://api.webimpian.support/bayarcash
popularity: 52
plans:
  - name: "T+ Plan"
    eligibility: "Free annual fee"
    rows:
      - { label: "FPX", value: "RM1.00 B2C / RM2.00 B2B" }
      - { label: "Credit card", value: "RM1.00 + 1%" }
      - { label: "Direct debit", value: "RM1.50" }
      - { label: "DuitNow QR / Boost PayFlex", value: "1.60% (min RM0.15)" }
      - { label: "QRIS / NETS / PromptPay", value: "1.60% (min RM0.15)" }
    settlement: "T+2"
    source: "https://bayarcash.com"
  - name: "Starter"
    eligibility: "RM189/year"
    rows:
      - { label: "Online banking", value: "RM1.20 + bank fees" }
      - { label: "DuitNow QR", value: "RM0.50 + bank fees" }
      - { label: "SPayLater / Boost PayFlex", value: "RM0.50 + bank fees" }
      - { label: "QRIS / NETS / PromptPay", value: "RM0.50 + bank fees" }
    settlement: "Real-time settlement included"
    source: "https://bayarcash.com"
  - name: "Lite"
    eligibility: "RM2,899/year"
    rows:
      - { label: "Online banking", value: "RM0.70 + bank fees" }
      - { label: "DuitNow QR", value: "RM0.50 + bank fees" }
      - { label: "SPayLater / Boost PayFlex", value: "RM0.50 + bank fees" }
      - { label: "QRIS / NETS / PromptPay", value: "RM0.50 + bank fees" }
    settlement: "Real-time settlement included"
    source: "https://bayarcash.com"
  - name: "Enterprise"
    eligibility: "RM12,000/year (incl 24,000 credits)"
    rows:
      - { label: "Online banking", value: "RM0.20 + bank fees" }
      - { label: "DuitNow QR", value: "RM0.50 + bank fees" }
      - { label: "SPayLater / Boost PayFlex", value: "RM0.50 + bank fees" }
      - { label: "QRIS / NETS / PromptPay", value: "RM0.50 + bank fees" }
    settlement: "Real-time settlement included"
    source: "https://bayarcash.com"
verified_date: "2026-10-20"
source: "https://bayarcash.com"
notes: "Re-verified 2026-10-20 on the official pricing table. Default free plan = T+ Plan: FPX B2C RM1.00 / B2B RM2.00, credit card RM1.00 + 1%, direct debit RM1.50, DuitNow QR, Boost PayFlex and cross-border QR (QRIS, NETS, PromptPay) 1.60% (min RM0.15), T+2 payout per the plan table; a footnote gives merchants without Public Bank or Bank Islam accounts a T+1 payout (off-day Friday) on T+ Plan pricing. Paid annual plans (Starter RM189, Lite RM2,899, Enterprise RM12,000) unlock realtime settlement (Public Bank and Bank Islam only) and charge a Bayarcash fee per channel on top of bank fees: online banking RM1.20 / RM0.70 / RM0.20, DuitNow QR, SPayLater, Boost PayFlex and cross-border QR RM0.50 each. Bayarcash says bank fees vary by merchant (online banking usually from RM0.70) and DuitNow QR bank fees are free until further notice except for credit card accounts. Enterprise includes 24,000 credits (the page states both RM1.00 and RM0.20 per credit) and a RM5,000 Web Impian voucher. All fees exclude 8% SST."
---

Bayarcash (by Web Impian) markets itself as Malaysia's first **realtime-settlement**
payment gateway. On the free **T+ Plan** you get FPX **RM1.00 (B2C)** / RM2.00
(B2B), credit card **RM1.00 + 1%**, direct debit RM1.50 and DuitNow QR **1.60%**
(min RM0.15), with T+2 payout per the plan table (a footnote gives T+1 to merchants
without Public Bank or Bank Islam accounts).

Paid annual plans (Starter RM189, Lite RM2,899, Enterprise RM12,000) unlock
**realtime settlement** (currently Public Bank & Bank Islam), lower online-banking
rates (down to RM0.20) and DuitNow QR at RM0.50. On the paid plans these are
Bayarcash's own fees, charged on top of bank fees that vary by merchant. Cross-border channels (QRIS
Indonesia, NETS Singapore, PromptPay Thailand) are supported too.

It includes a free payment link, WordPress/WooCommerce plugins, direct debit
(auto-debit for recurring), whitelabel options and detailed reporting. All quoted
rates exclude SST.
