---
name: Kiple
website: https://kiple.com
tagline: "Malaysian payment gateway with e-wallet and POS"
logo: /logos/kiple.svg
fees:
  fpx: "RM1.00 (B2C), RM1.50 (B2B)"
  card: "1.5% credit / 1.0% debit (local)"
  card_intl: "3.20%"
  ewallet: "1.5%–1.8%"
  duitnowqr: "1.2%"
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
popularity: 54
plans:
  - name: "Starter Package"
    eligibility: "RM0 one-time fee"
    rows:
      - { label: "FPX", value: "RM1.20 B2C / RM2.00 B2B" }
      - { label: "Local credit card", value: "2.00%" }
      - { label: "Foreign card", value: "3.70%" }
      - { label: "DuitNow QR", value: "1.50%" }
      - { label: "E-wallets", value: "1.7% - 2.0%" }
    source: "https://kiple.com/sme/"
  - name: "Standard Package"
    eligibility: "RM199 promo one-time (normally RM500) + RM29/month (waived above RM8,000 GTV)"
    rows:
      - { label: "FPX", value: "RM1.00 B2C / RM1.50 B2B" }
      - { label: "Local cards", value: "1.50% credit / 1.00% debit" }
      - { label: "Foreign card", value: "3.20%" }
      - { label: "DuitNow QR", value: "1.20%" }
      - { label: "E-wallets", value: "1.50% - 1.80%" }
    source: "https://kiple.com/sme/"
verified_date: "2026-07-17"
source: "https://kiple.com/sme/"
notes: "Re-verified 2026-07-17 via Firecrawl (Cloudflare bypass): Standard Package promo values confirmed; page also lists Annual Fee RM500 for Standard, and a Starter Package (RM0 one-time, FPX RM1.20/RM2.00, local credit 2.00%, foreign 3.70%, DNQR 1.50%, wallets 1.7%-2.0%). UnionPay 2.80%, multicurrency 3.80%. Standard Package (shown): FPX B2C RM1.00 / B2B RM1.50, local credit 1.50% / debit 1.00%, foreign cards 3.20%, e-wallets 1.70% (WeChat 1.50%, Alipay 1.80%), DuitNow QR 1.20%, UnionPay 2.80%. Setup RM199 (promo, from RM500); RM29/mo waived if monthly GTV > RM8,000. A new zero-setup Starter Package has higher rates (card 2.00%, DuitNow QR 1.50%). Settlement timing not published."
---

Kiple (operated by Kiplepay Sdn Bhd, a Bank Negara Malaysia-regulated e-money issuer and merchant acquirer) offers an online payment gateway plus in-store POS terminals, white-label e-wallet, and eWages payroll. Its SME "Standard Package" carries a one-time fee of RM199 (promotional, normally RM500), an RM500 annual fee, and an RM29 monthly fee that is waived when gross transaction value exceeds RM8,000.

Published transaction fees for the Standard Package are FPX at RM1.00 (B2C) / RM1.50 (B2B), local credit cards at 1.5%, local debit cards at 1.0%, foreign cards at 3.20%, UnionPay at 2.80%, and multicurrency at 3.80%. E-wallets run 1.5%–1.8% by channel (main Malaysian wallets 1.7%), and DuitNow QR is 1.2%. A cheaper Starter Package (RM0 setup) and an In-Store package are also offered.

Customers can pay via credit/debit cards, FPX, DuitNow QR, and e-wallets, with Google Pay priced off the underlying card rates. Kiple supports API integration and hosted online checkout; recurring/subscription billing is not advertised as a standard feature, so confirm with sales if needed.
