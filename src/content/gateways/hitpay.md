---
name: HitPay
website: https://www.hitpayapp.com
logo_round: true
tagline: "No setup or monthly fee, with built-in recurring billing"
logo: /logos/hitpay.svg
fees:
  fpx: "1.8% + RM0.40"
  card: "1.2% + RM1.00"
  card_intl: "3% + RM1.00"
  ewallet: "1.9% - 2.2%"
  duitnowqr: "1.2%"
  bnpl: "2.2% - 6.5%"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+2 (T+3 cards)"
min_txn: "—"
channels: [fpx, card, ewallet, duitnowqr, bnpl]
methods:
  - Visa
  - Mastercard
  - Apple Pay
  - Google Pay
  - DuitNow QR
features:
  no_code: true
  api: true
  recurring: true
skill: setup-hitpay
mcp: "official"
webhooks: true
plugins:
  - Shopify
  - WooCommerce
  - Wix
  - OpenCart
  - EasyStore
dev_docs: "https://docs.hitpayapp.com/apis/overview"
popularity: 70
verified_date: "2026-07-02"
source: "https://www.hitpayapp.com/my/pricing"
notes: "Official per-wallet rates: TNG 1.9%, GrabPay 2%, Boost 2.1%, Maybank QRPay 2.1%, ShopeePay 2.2%. BNPL: SPayLater 2.2%, Atome 5.5% + RM1, PayLater by Grab 6.5%. A platform fee applies on top for some products (0.2% payment links/invoicing/store; 0.5% Shopify app). Payouts T+2 business days (cards from T+3, processed by Stripe). International cards +2% on foreign-currency transactions."
---

HitPay is a Singapore-headquartered, MAS-licensed platform that operates in
Malaysia with a **pay-per-transaction, no-monthly-fee** model. It bundles a lot
into one account: checkout, payment links, invoicing, online store, POS and
**recurring billing**.

Malaysia online rates: domestic cards **1.2% + RM1.00**, FPX **1.8% + RM0.40**,
DuitNow **1.2%**, and international cards **3% + RM1.00** (plus 2% on
foreign-currency transactions). There are no setup or subscription fees; you only
pay on successful payments.

Note a small **+0.2%** surcharge when you use its software tools (payment links,
invoicing, store, POS, recurring billing), and +0.5% via the Shopify app. Payouts
are T+1. A good all-rounder if you want software + payments together.
