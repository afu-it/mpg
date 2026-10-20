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
settlement: "T+2 (FPX T+1, cards from T+1)"
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
verified_date: "2026-10-20"
source: "https://www.hitpayapp.com/my/pricing"
notes: "Official online per-wallet rates: TNG 1.9%, GrabPay 2%, Maybank QRPay 2.1%, ShopeePay 2.2% (Boost no longer listed on the pricing page as of 2026-10-20). BNPL: SPayLater 2.2%, Atome 5.5% + RM1, PayLater by Grab 6.5%. Cross-border wallets AliPay 2.7%, WeChat Pay 1.5%. A platform fee applies on top for some products (0.2% business software such as invoicing/online store; 0.5% Shopify Payments App). Payout schedule: non-card balance T+2 business days (FPX T+1), card balance from T+1 business days processed by Stripe (final schedule set by Compliance case by case). International cards +2% on foreign-currency transactions."
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
invoicing, store), and +0.5% via the Shopify app. Payouts are T+2 business days
for non-card payments (FPX T+1) and from T+1 for cards. A good all-rounder if you want software + payments together.
