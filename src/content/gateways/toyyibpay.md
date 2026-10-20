---
name: toyyibPay
website: https://toyyibpay.com
tagline: "Shariah-compliant FPX & DuitNow QR for SMEs, NGOs & government"
logo: /logos/toyyibpay.svg
fees:
  fpx: "RM1.00"
  card: "1.5%"
  card_intl: "3.5%"
  ewallet: "—"
  duitnowqr: "1% or RM1.00"
  setup: "RM100 (card onboarding)"
  monthly: "RM100/yr (card, from year 2)"
settlement: "1-4 business days (FPX)"
min_txn: "—"
channels: [fpx, card, duitnowqr]
features:
  no_code: true
  api: true
  recurring: false
skill: setup-toyyibpay
webhooks: true
plugins:
  - WooCommerce
  - OpenCart
  - PrestaShop
  - WHMCS
dev_docs: "https://toyyibpay.com/apireference/"
popularity: 72
plans:
  - name: "Santai"
    eligibility: "Non-profit organisations only"
    rows:
      - { label: "FPX (B2C)", value: "RM0.00 per transaction" }
      - { label: "FPX (B2B)", value: "RM2.00 per transaction" }
    settlement: "Next 10 business days"
    source: "https://www.toyyibpay.com/pricing-plans/"
  - name: "Standard"
    eligibility: "All users"
    rows:
      - { label: "FPX (B2C)", value: "RM1.00 per transaction" }
      - { label: "FPX (B2B)", value: "RM2.00 per transaction" }
    settlement: "Next 1-4 business days"
    source: "https://www.toyyibpay.com/pricing-plans/"
  - name: "Card Payments (via Partners)"
    eligibility: "RM100 onboarding + RM100/year from year 2"
    rows:
      - { label: "Local card", value: "1.50%" }
      - { label: "Foreign card", value: "3.5%" }
    settlement: "Next 4 business days"
    source: "https://www.toyyibpay.com/pricing-plans/"
  - name: "DuitNow QR"
    eligibility: "All users"
    rows:
      - { label: "Fee", value: "1.00% or RM1.00 per transaction" }
    settlement: "Next 2 business days"
    source: "https://www.toyyibpay.com/pricing-plans/"
verified_date: "2026-10-20"
source: "https://www.toyyibpay.com/pricing-plans/"
notes: "Flat RM1.00 per FPX B2C transaction (B2B RM2.00; free Santai plan for registered NPOs). Official pricing page now publishes card rates (local 1.50%, foreign 3.5%, via toyyibPay Partners; RM100 onboarding + RM100/yr from year 2) and DuitNow QR (1% or RM1.00). Settlement: FPX next 1-4 business days, DuitNow QR 2, card 4, Santai 10. Excludes SST."
---

toyyibPay is one of Malaysia's most popular low-cost payment gateways, known for a
flat **RM1.00 per FPX transaction** regardless of amount. It rebranded around a
Shariah-compliant, transparent positioning and is widely used by SMEs, NGOs and
government agencies.

Its strength is simple FPX collection and DuitNow QR, with payment links and QR
codes that need no website, auto-settlement (FPX funds in 1 to 4 business days),
split payments and a clear dashboard. Plugins and an API are available for
common platforms.

Pricing is FPX-centric: **RM1.00 (B2C)** / RM2.00 (B2B). Card payments (via
toyyibPay Partners) are now officially priced at **1.5% local** / 3.5% foreign,
with an RM100 onboarding fee and RM100/year from the second year; DuitNow QR is
**1% or RM1.00** per transaction. Registered NPOs can use the free "Santai" plan
(B2C FPX waived, slower settlement). FPX settles in the next 1 to 4 business days.
