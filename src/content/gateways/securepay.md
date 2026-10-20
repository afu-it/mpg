---
name: SecurePay
website: https://www.securepay.my
tagline: "FPX-first Malaysian gateway with no setup fee"
fees:
  fpx: "Contact sales"
  card: "Contact sales"
  card_intl: "Contact sales"
  ewallet: "Contact sales"
  duitnowqr: "Contact sales"
  setup: "RM0"
  monthly: "Contact sales"
settlement: "T+1"
min_txn: "—"
channels: [fpx, card, ewallet, duitnowqr]
methods:
  - FPX online banking
  - Visa
  - Mastercard
  - DuitNow QR
  - Touch 'n Go eWallet
  - GrabPay
  - Boost
  - ShopeePay
features:
  no_code: true
  api: true
  recurring: true
webhooks: true
plugins:
  - WooCommerce
dev_docs: "https://www.securepay.my/docs/"
popularity: 22
verified_date: "2026-10-20"
source: "https://www.securepay.my"
notes: "SecurePay Sdn Bhd, Shah Alam, Selangor; FPX-based MYR gateway. Advertises no registration fee. A widely cited RM1.00-per-FPX figure appears on third-party sites but could not be confirmed on SecurePay's own pricing, so all per-transaction rates are shown as Contact sales (not fabricated). WooCommerce plugin, documented API and webhooks; settles T+1. Dev docs re-checked 2026-10-20: the official docs hub (securepay.my/docs/) offers API v1 (docs.securepay.my, marked recommended for production) and API v2 preview (v2.docs.securepay.my, updated 2026). The v1 GitBook pages were last edited 2020 to 2022, so v1 docs are stable but not actively maintained; v2 is the maintained set. Home page still states no registration or setup fee and next-business-day (T+1) settlement."
---

**SecurePay** (SecurePay Sdn Bhd, Shah Alam) is a Malaysian FPX-first payment
gateway accepting online banking, cards, DuitNow QR and major e-wallets, settling
at **T+1**.

It advertises **no registration fee** and provides a WooCommerce plugin,
developer API and webhooks. A widely quoted RM1.00-per-FPX rate circulates on
third-party sites but is not confirmed on SecurePay's own pricing, so all
per-transaction fees here are "Contact sales".
