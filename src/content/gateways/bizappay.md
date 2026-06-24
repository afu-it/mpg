---
name: Bizappay
website: https://www.bizappay.my
tagline: "No-fuss Malaysian gateway with payment links"
logo: /logos/bizappay.svg
fees:
  fpx: "RM1.00"
  card: "1.75% (local debit/credit)"
  card_intl: "2.4%"
  ewallet: "1.5%"
  duitnowqr: "Contact sales"
  bnpl: "1.5% (PayLater by Grab)"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+1 (FPX); T+3 (card/e-wallet/BNPL)"
min_txn: "—"
category: gateway
channels: [fpx, card, ewallet, duitnowqr, bnpl]
features:
  no_code: true
  api: true
  recurring: true
webhooks: true
plugins:
  - WooCommerce
  - GiveWP
  - Easy Digital Downloads
dev_docs: "https://documenter.getpostman.com/view/6258355/SzmZdLp3"
verified_date: "2026-06-24"
source: "https://www.bizappay.my/main/"
notes: "Official rate card. Pay-as-you-use: no setup, monthly, or annual fees. DuitNow QR offered but rate not separately published."
---

Bizappay is a Malaysian payment gateway built for simplicity, aimed at SMEs, freelancers, consultants, and service businesses that rely on invoices, subscriptions, and payment links. It supports FPX across 40+ banks, locally and foreign-issued Visa/Mastercard, major e-wallets (GrabPay, ShopeePay, Touch 'n Go, Boost), DuitNow QR, Apple Pay, and Google Pay, with no technical background required to start collecting payments.

Pricing is pay-as-you-use with no yearly, monthly, or setup fees and no hidden charges. Published per-transaction rates are FPX at RM1.00, e-wallets at 1.5%, domestic debit/credit cards at 1.75%, international cards at 2.4%, and Buy Now Pay Later (PayLater by Grab) at 1.5%. FPX settles the next business day (T+1, 7 days a week), while card, e-wallet, and BNPL transactions settle in about 3 business days (T+3).

Merchants get dedicated payment links and QR codes for bill collection, plus API integration, custom billing fields, and webhook automation for those who want to build deeper integrations and recurring/subscription collections. A DuitNow QR option is offered but its specific rate is not separately published.
