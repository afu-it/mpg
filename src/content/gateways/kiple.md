---
name: Kiple
website: https://kiplepay.com
tagline: "Malaysian payment gateway with e-wallet and POS"
logo: /logos/kiple.svg
fees:
  fpx: "RM1.00 (B2C), RM1.50 (B2B)"
  card: "1.5% credit / 1.0% debit (local)"
  card_intl: "3.20%"
  ewallet: "1.2%–1.8%"
  duitnowqr: "1.5%"
  setup: "RM199 promo (normally RM500)"
  monthly: "RM29 (waived if GTV > RM8,000)"
settlement: "Contact sales"
min_txn: "—"
category: gateway
channels: [fpx, card, ewallet, duitnowqr]
features:
  no_code: true
  api: true
  recurring: false
webhooks: true
plugins:
  - WooCommerce
  - OpenCart
  - Magento
  - PrestaShop
dev_docs: "https://kiplebiz.com/documentation/"
verified_date: "2026-06-24"
source: "https://kiple.com/sme/"
notes: "Official Standard Package rate card. Rates vary by package (Starter/Standard/In-Store); UnionPay 2.80%, multicurrency 3.80%. Settlement period not published."
---

Kiple (operated by Kiplepay Sdn Bhd, a Bank Negara Malaysia-regulated e-money issuer and merchant acquirer) offers an online payment gateway plus in-store POS terminals, white-label e-wallet, and eWages payroll. Its SME "Standard Package" carries a one-time fee of RM199 (promotional, normally RM500), an RM500 annual fee, and an RM29 monthly fee that is waived when gross transaction value exceeds RM8,000.

Published transaction fees for the Standard Package are FPX at RM1.00 (B2C) / RM1.50 (B2B), local credit cards at 1.5%, local debit cards at 1.0%, foreign cards at 3.20%, UnionPay at 2.80%, and multicurrency at 3.80%. E-wallets and DuitNow QR fall in the roughly 1.2%–1.8% range depending on the channel. A cheaper Starter Package (RM0 setup) and an In-Store package are also offered.

Customers can pay via credit/debit cards, FPX, DuitNow QR, and e-wallets, with Google Pay priced off the underlying card rates. Kiple supports API integration and hosted online checkout; recurring/subscription billing is not advertised as a standard feature, so confirm with sales if needed.
