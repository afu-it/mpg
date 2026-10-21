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
banks:
  - MBSB Bank
features:
  no_code: true
  api: true
  recurring: true
webhooks: true
plugins:
  - WooCommerce
  - OpenCart
  - Magento
  - PrestaShop
popularity: 54
plans:
  - name: "Starter Package"
    eligibility: "RM0 one-time fee + RM29/month (waived above RM8,000 GTV)"
    rows:
      - { label: "FPX", value: "RM1.20 B2C / RM2.00 B2B" }
      - { label: "Local credit card", value: "2.00%" }
      - { label: "Local debit card", value: "1.50%" }
      - { label: "Foreign card", value: "3.70%" }
      - { label: "UnionPay", value: "3.50%" }
      - { label: "Multicurrency", value: "4.00%" }
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
verified_date: "2026-10-20"
source: "https://kiple.com/sme/"
bnm:
  roles: [merchant-acquirer, emoney-issuer]
  entity: "Kiplepay Sdn Bhd (formerly known as Webonline Dot Com Sdn Bhd)"
  checked: "2026-10-21"
  evidence: "https://www.bnm.gov.my/regulations/fsp-directory?p_p_id=com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_jXC730NRlqU0&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_r_p_tag=merchant-acquirer-nonbank"
notes: "Re-verified 2026-10-20 via a real browser (plain fetch is 403-blocked): Standard Package rates unchanged; Starter Package now also shows local debit 1.50%, UnionPay 3.50%, multicurrency 4.00% and an RM29 monthly fee waived above RM8,000 GTV. DuitNow QR and e-wallet rows are logo-only on the page, so those values carry over from the earlier read. Recurring payments: the official payments page (kiple.com/payments) lists Recurring Payments and Tokenization as gateway features. MBSB Bank as a supported FPX bank, and recurring support: Vendor confirmation via email to MPG, 2026-10-12 (MBSB not shown on any public Kiple page). Earlier: re-verified 2026-07-17 via Firecrawl (Cloudflare bypass): Standard Package promo values confirmed; page also lists Annual Fee RM500 for Standard, and a Starter Package (RM0 one-time, FPX RM1.20/RM2.00, local credit 2.00%, foreign 3.70%, DNQR 1.50%, wallets 1.7%-2.0%). UnionPay 2.80%, multicurrency 3.80%. Standard Package (shown): FPX B2C RM1.00 / B2B RM1.50, local credit 1.50% / debit 1.00%, foreign cards 3.20%, e-wallets 1.70% (WeChat 1.50%, Alipay 1.80%), DuitNow QR 1.20%, UnionPay 2.80%. Setup RM199 (promo, from RM500); RM29/mo waived if monthly GTV > RM8,000. A new zero-setup Starter Package has higher rates (card 2.00%, DuitNow QR 1.50%). Settlement timing not published."
---

Kiple (operated by Kiplepay Sdn Bhd, a Bank Negara Malaysia-regulated e-money issuer and merchant acquirer) offers an online payment gateway plus in-store POS terminals, white-label e-wallet, and eWages payroll. Its SME "Standard Package" carries a one-time fee of RM199 (promotional, normally RM500), an RM500 annual fee, and an RM29 monthly fee that is waived when gross transaction value exceeds RM8,000.

Published transaction fees for the Standard Package are FPX at RM1.00 (B2C) / RM1.50 (B2B), local credit cards at 1.5%, local debit cards at 1.0%, foreign cards at 3.20%, UnionPay at 2.80%, and multicurrency at 3.80%. E-wallets run 1.5%–1.8% by channel (main Malaysian wallets 1.7%), and DuitNow QR is 1.2%. A cheaper Starter Package (RM0 setup) and an In-Store package are also offered.

Customers can pay via credit/debit cards, FPX, DuitNow QR, and e-wallets, with Google Pay priced off the underlying card rates. Kiple supports API integration, hosted online checkout, payment links, tokenization and recurring payments (listed on its payments page and confirmed by Kiple to MPG). Kiple also confirmed MBSB Bank as a supported online-banking bank.
