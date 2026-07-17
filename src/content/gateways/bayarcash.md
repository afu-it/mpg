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
dev_docs: "https://docs.bayarcash.com/"
popularity: 52
plans:
  - name: "T+ Plan"
    eligibility: "Free annual fee"
    rows:
      - { label: "FPX", value: "RM1.00 B2C / RM2.00 B2B" }
      - { label: "Credit card", value: "RM1.00 + 1%" }
      - { label: "Direct debit", value: "RM1.50" }
      - { label: "Other channels", value: "1.60% (min RM0.15)" }
    settlement: "T+2"
    source: "https://bayarcash.com"
  - name: "Starter"
    eligibility: "RM189/year"
    rows:
      - { label: "FPX", value: "RM1.20" }
      - { label: "DuitNow QR", value: "RM0.50" }
      - { label: "SPayLater / Boost PayFlex", value: "RM0.50" }
    settlement: "Real-time settlement included"
    source: "https://bayarcash.com"
  - name: "Lite"
    eligibility: "RM2,899/year"
    rows:
      - { label: "FPX", value: "RM0.70" }
      - { label: "DuitNow QR", value: "RM0.50" }
    settlement: "Real-time settlement included"
    source: "https://bayarcash.com"
  - name: "Enterprise"
    eligibility: "RM12,000/year (incl 24,000 credits)"
    rows:
      - { label: "FPX", value: "RM0.20" }
      - { label: "DuitNow QR", value: "RM0.50" }
    settlement: "Real-time settlement included"
    source: "https://bayarcash.com"
verified_date: "2026-07-17"
source: "https://bayarcash.com"
notes: "Default free plan = T+ Plan (verified 2026-07-17): rates confirmed; plan table says T+2 payout while a site footnote grants T+1 for merchants without Public Bank/Bank Islam accounts. Direct debit RM1.50. All fees exclude 8% SST. Paid annual tiers (Starter RM189 / Lite RM2,899 / Enterprise RM12,000) buy lower FPX rates + realtime settlement. Free 'T+ Plan' shown: FPX B2C RM1.00 / B2B RM2.00, credit card RM1.00 + 1%, direct debit RM1.50, DuitNow QR 1.60% (min RM0.15); T+1 payout (off-day Friday). Paid annual plans (Starter RM189, Lite RM2,899, Enterprise RM12,000) unlock realtime settlement (Public Bank & Bank Islam) and lower online-banking rates (RM1.20 / RM0.70 / RM0.20) plus DuitNow QR RM0.50. Excludes SST 8%."
---

Bayarcash (by Web Impian) markets itself as Malaysia's first **realtime-settlement**
payment gateway. On the free **T+ Plan** you get FPX **RM1.00 (B2C)** / RM2.00
(B2B), credit card **RM1.00 + 1%**, direct debit RM1.50 and DuitNow QR **1.60%**
(min RM0.15), with T+1 payout.

Paid annual plans (Starter RM189, Lite RM2,899, Enterprise RM12,000) unlock
**realtime settlement** (currently Public Bank & Bank Islam), lower online-banking
rates (down to RM0.20) and DuitNow QR at RM0.50. Cross-border channels (QRIS
Indonesia, NETS Singapore, PromptPay Thailand) are supported too.

It includes a free payment link, WordPress/WooCommerce plugins, direct debit
(auto-debit for recurring), whitelabel options and detailed reporting. All quoted
rates exclude SST.
