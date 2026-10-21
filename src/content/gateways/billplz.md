---
name: Billplz
website: https://www.billplz.com
mcp: community
logo_round: true
tagline: "Flat-rate FPX collection with fast, guaranteed payouts"
logo: /logos/billplz.svg
fees:
  fpx: "RM1.25"
  card: "1.8%"
  card_intl: "3.8%"
  ewallet: "1.5%"
  duitnowqr: "1.5%"
  bnpl: "6%"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+1 (T+2 cards)"
min_txn: "—"
channels: [fpx, card, ewallet, duitnowqr, bnpl]
methods:
  - Credit / debit card
  - ShopeePay
  - Touch 'n Go eWallet
  - GrabPay
  - Boost
  - Atome
  - PayLater by Grab
features:
  no_code: true
  api: true
  recurring: true
skill: setup-billplz
webhooks: true
plugins:
  - WooCommerce
  - OpenCart
  - PrestaShop
  - Magento
  - Shopify
  - WHMCS
dev_docs: https://support.billplz.com/api
popularity: 82
plans:
  - name: "Basic"
    eligibility: "Free plan"
    rows:
      - { label: "FPX", value: "RM1.25 B2C / RM3.00 B2B" }
      - { label: "Card", value: "1.8% MYR / 3.8% non-MYR" }
      - { label: "Wallets (DuitNow QR, TnG, Boost, GrabPay)", value: "1.5%" }
      - { label: "Card Auto-Deduct (recurring)", value: "2.3% + RM1.25 MYR / 4.2% + RM1.25 non-MYR" }
      - { label: "BNPL (Atome, 3-month)", value: "6%" }
    settlement: "FPX next business day, cards T+2"
    source: "https://main.billplz.com/pricing"
  - name: "Standard"
    eligibility: "RM999/year"
    rows:
      - { label: "FPX", value: "RM0.75 B2C / RM2.00 B2B" }
      - { label: "Card", value: "1.5% MYR / 3.5% non-MYR" }
      - { label: "Wallets", value: "1.5%" }
      - { label: "Card Auto-Deduct (recurring)", value: "2% + RM0.75 MYR / 4% + RM0.75 non-MYR" }
      - { label: "BNPL (Atome, 3-month)", value: "6%" }
    settlement: "FPX next business day, cards T+2"
    source: "https://main.billplz.com/pricing"
  - name: "Enterprise"
    eligibility: "Custom pricing, on request"
    rows:
      - { label: "Pricing", value: "Contact sales" }
      - { label: "Includes", value: "Dedicated account management, recurring payments" }
    settlement: "Real-time payouts (24/7)"
    source: "https://main.billplz.com/pricing"
verified_date: "2026-10-20"
source: "https://main.billplz.com/pricing"
notes: "Re-verified 2026-10-20: the pricing page now lists only Atome (6%, 3-month, payouts Wednesday and Friday) under instalments; the PayLater by Grab 6.5% rate is no longer published (Grab is still listed on the payment-methods page, rate unpublished). New Card Auto-Deduct (recurring card charging, separate application): Basic 2.3% + RM1.25 MYR / 4.2% + RM1.25 non-MYR, Standard 2% + RM0.75 / 4% + RM0.75. Wallet payout next day. DuitNow Transfer payment orders RM1.25 (Basic) / RM0.75 (Standard), real-time. Shopify adds 0.3%. Standard plan (RM999/yr) lowers FPX to RM0.75 B2C / RM2.00 B2B and cards to 1.5%/3.5%. Basic (free) plan rates: B2C FPX RM1.25, B2B FPX RM3.00. Card (MYR) 1.8%, non-MYR 3.8% (T+2 payout). E-wallet 1.5%. BNPL (Atome) 6%. FPX payout next business day, guaranteed."
instant_settlement:
  detail: "Real-time payout, 24/7, on the Enterprise plan only. Other plans: FPX next business day, cards two business days."
  detail_ms: "Duit masuk serta-merta, 24 jam, untuk pelan Enterprise sahaja. Pelan lain: FPX hari bekerja berikutnya, kad dua hari bekerja."
  quote: "Real-time payout Get your money instantly in your bank account, 24/7"
  source: https://main.billplz.com/pricing
  checked: "2026-10-21"
---

Billplz is a long-running Malaysian gateway focused on **flat-rate FPX
collection** with guaranteed next-business-day payouts. The free **Basic** plan
charges RM1.25 per B2C FPX transaction (RM3.00 B2B); the paid Standard plan
(RM999/year) drops this to RM0.75 / RM2.00.

Beyond FPX it supports cards (1.8% MYR, 3.8% non-MYR with T+2 payout), e-wallets
(1.5%) and Atome BNPL (3-month plans at 6%). Every plan includes split payments,
full API access with 30+ plugins, account statements, and real-time payout
add-ons.

It is built mainly for collection, but now also lists a card **Auto-Deduct**
product for recurring charges (2.3% + RM1.25 on Basic, separate application).
There's no setup or monthly fee on the Basic plan,
making it a popular default for Malaysian SMEs and organisations.
