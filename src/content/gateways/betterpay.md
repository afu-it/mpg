---
name: BetterPay
website: https://www.betterpay.me
tagline: "Instant-settlement Malaysian gateway with 150+ payment channels"
fees:
  fpx: "RM1.00"
  card: "1.9%"
  card_intl: "4%"
  ewallet: "1.5%"
  duitnowqr: "1.2%"
  bnpl: "5% - 6.5%"
  setup: "RM0 (FPX) - RM500 (by plan)"
  monthly: "RM0"
settlement: "T+1 (FPX) / T+2; instant on Pro"
min_txn: "—"
channels: [fpx, card, ewallet, duitnowqr, bnpl]
methods:
  - Credit / debit card
  - Touch 'n Go eWallet
  - Boost
  - GrabPay
  - ShopeePay
  - WeChat Pay
  - Alipay
  - Apple Pay
  - Google Pay
  - e-Mandate direct debit
features:
  no_code: true
  api: true
  recurring: true
webhooks: true
plugins:
  - WooCommerce
  - OpenCart
  - PrestaShop
  - Magento
  - Ecwid
  - Shopify
  - EasyStore
dev_docs: "https://www.betterpay.me/docs/"
popularity: 35
verified_date: "2026-07-02"
source: "https://www.betterpay.me/v2/pricing.html"
notes: "Pay Direct Technology Sdn Bhd. Plans: Starter (RM0 setup, FPX-only), Lite (RM300 setup), Pro (RM500 setup, instant bank-transfer settlement, FPX B2B RM2.00, DuitNow QR 1.00%). Values shown are the published Lite-tier rates: FPX RM1.00 B2C, local cards 1.90%, international 4.00%, main e-wallets 1.50% (WeChat 1.20%, Alipay 2.70%), DuitNow QR 1.20%, BNPL Atome 5.50% / GrabPayLater 5.00%-6.50%. Shopify adds a 0.50% surcharge. No monthly fee."
---

BetterPay (Pay Direct Technology Sdn Bhd) is a Malaysian gateway whose pitch is
**settlement speed**: FPX settles T+1 on the standard plans, and the Pro plan
advertises **instant bank-transfer settlement**, ahead of the industry's usual
T+1 to T+2. It claims over RM9 billion processed a year across 150+ payment
channels behind a single API.

The published rate card is genuinely complete: FPX at a flat **RM1.00** (B2C),
local cards **1.9%**, main Malaysian e-wallets **1.5%**, DuitNow QR from 1.0 to
1.2%, and BNPL via Atome and GrabPayLater. Entry plans differ by one-time setup
(RM0 FPX-only Starter up to RM500 Pro) with no monthly fee on any plan.

Beyond the API it covers payment links, e-invoicing with reminders, a virtual
terminal, recurring cards plus e-Mandate direct debit, and plugins for most
major carts (Shopify carries a 0.5% surcharge). Its API stack is shared with
QlicknPay, using Merchant ID + API key authentication and signed callbacks.
