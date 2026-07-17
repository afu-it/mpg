---
name: Billplz
website: https://www.billplz.com
logo_round: true
tagline: "Flat-rate FPX collection with fast, guaranteed payouts"
logo: /logos/billplz.svg
fees:
  fpx: "RM1.25"
  card: "1.8%"
  card_intl: "3.8%"
  ewallet: "1.5%"
  duitnowqr: "1.5%"
  bnpl: "6% - 6.5%"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+1 (T+2 cards)"
min_txn: "—"
channels: [fpx, card, ewallet, duitnowqr, bnpl]
methods:
  - Credit / debit card
  - Maybank QRPay
  - ShopeePay
  - Touch 'n Go eWallet
  - GrabPay
  - Boost
features:
  no_code: true
  api: true
  recurring: false
skill: setup-billplz
webhooks: true
plugins:
  - WooCommerce
  - OpenCart
  - PrestaShop
  - Magento
  - Shopify
  - WHMCS
dev_docs: "https://www.billplz.com/api"
popularity: 82
plans:
  - name: "Basic"
    eligibility: "Free plan"
    rows:
      - { label: "FPX", value: "RM1.25 B2C / RM3.00 B2B" }
      - { label: "Card", value: "1.8% MYR / 3.8% non-MYR" }
      - { label: "Wallets (DuitNow QR, TnG, Boost, GrabPay)", value: "1.5%" }
    settlement: "FPX next business day, cards T+2"
    source: "https://main.billplz.com/pricing"
  - name: "Standard"
    eligibility: "RM999/year"
    rows:
      - { label: "FPX", value: "RM0.75 B2C / RM2.00 B2B" }
      - { label: "Card", value: "1.5% MYR / 3.5% non-MYR" }
      - { label: "Wallets", value: "1.5%" }
    settlement: "FPX next business day, cards T+2"
    source: "https://main.billplz.com/pricing"
  - name: "Enterprise"
    eligibility: "Custom pricing, on request"
    rows:
      - { label: "Pricing", value: "Contact sales" }
      - { label: "Includes", value: "Dedicated account management, recurring payments" }
    settlement: "Real-time payouts (24/7)"
    source: "https://main.billplz.com/pricing"
verified_date: "2026-07-17"
source: "https://main.billplz.com/pricing"
notes: "BNPL re-verified 2026-07-17: Atome 6%, PayLater by Grab 6.5%, payouts Wednesday and Friday. Standard plan (RM999/yr) lowers FPX to RM0.75 B2C / RM2.00 B2B and cards to 1.5%/3.5%. Basic (free) plan rates: B2C FPX RM1.25, B2B FPX RM3.00. Premium annual membership lowers these to RM0.75 / RM2.00. Card (MYR) 1.8%, non-MYR 3.8% (T+2 payout). E-wallet 1.5%. BNPL 6–6.5%. FPX payout next business day, guaranteed."
---

Billplz is a long-running Malaysian gateway focused on **flat-rate FPX
collection** with guaranteed next-business-day payouts. The free **Basic** plan
charges RM1.25 per B2C FPX transaction (RM3.00 B2B); a paid Premium annual
membership drops this to RM0.75 / RM2.00.

Beyond FPX it supports cards (1.8% MYR, 3.8% non-MYR with T+2 payout), e-wallets
(1.5%) and BNPL (3–4 month plans at 6–6.5%). Every plan includes split payments,
full API access with 30+ plugins, account statements, and real-time payout
add-ons.

It is built for collection rather than card-on-file subscriptions, so recurring
auto-charging isn't its core. There's no setup or monthly fee on the Basic plan,
making it a popular default for Malaysian SMEs and organisations.
