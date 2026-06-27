---
name: CommercePay
website: https://www.commercepay.asia
tagline: "BNM-licensed acquirer with no setup or monthly fees"
logo: /logos/commercepay.svg
fees:
  fpx: "Contact sales"
  card: "Contact sales"
  card_intl: "Contact sales"
  ewallet: "Contact sales"
  duitnowqr: "Contact sales"
  bnpl: "From 3.5% (IPP, RM500 setup)"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+1 to T+2 (1-2 business days)"
min_txn: "—"
category: gateway
channels: [fpx, card, ewallet, duitnowqr, bnpl]
methods:
  - Credit / debit card
  - Touch 'n Go eWallet
  - GrabPay
  - Boost
  - ShopeePay
  - Alipay
  - WeChat Pay
  - DuitNow QR
  - Atome
  - GrabPay Later
features:
  no_code: true
  api: true
  recurring: true
webhooks: true
plugins:
  - WooCommerce
  - OpenCart
  - WHMCS
  - SiteGiant
dev_docs: "https://docs.commercepay.asia"
popularity: 26
verified_date: "2026-06-24"
source: "https://www.commercepay.asia/faq"
notes: "Indicative. Gateway fee is per-transaction (fixed or %) but not published; only the Instalment (IPP) rate of 'as low as 3.5%' + RM500 setup is public."
---

CommercePay (Commerce DotAsia Payments Sdn Bhd) is licensed by Bank Negara Malaysia for online merchant acquiring. It supports FPX/DuitNow online banking, local and international credit/debit cards, e-wallets, recurring payments and an Instalment Payment Plan (IPP / "InstallmentPay Plus").

The company confirms there are no setup or annual maintenance fees and that it charges only per transaction, offering either a fixed fee or a percentage fee, but the actual gateway rates are not published and require a quote. Earnings are settled within 1-2 business days.

The one published rate is for instalments: IPP carries a one-time RM500 setup fee with transaction fees "as low as 3.5%" over 3-36 month tenures. Integration is via ready-made plugins (SiteGiant, WooCommerce, OpenCart, NopCommerce), an API, shareable payment links and integrated forms, with a merchant back-office for reporting.
