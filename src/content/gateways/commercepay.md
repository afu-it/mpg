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
  bnpl: "From 3.5% (0% IPP)"
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
plans:
  - name: "Credit Card Instalment Payment Plan (0% IPP)"
    eligibility: "RM500 one-time setup; 9 banks; per-bank minimum amounts RM300 to RM3,000"
    rows:
      - { label: "3 months", value: "3.50% MDR" }
      - { label: "6 months", value: "4.00% MDR" }
      - { label: "12 months", value: "5.00% MDR" }
      - { label: "24 months", value: "7.50% MDR" }
      - { label: "36 months", value: "9.70% MDR" }
    settlement: "T+1 (full amount, any tenure)"
    source: "https://www.commercepay.asia/credit-card-ipp"
verified_date: "2026-10-20"
source: "https://www.commercepay.asia/faq"
notes: "Re-verified 2026-10-20. Gateway: no setup or annual maintenance fee (FAQ); per-transaction fee (fixed or %) is not published, so channel rates are Contact sales. Settlement 1-2 business days (features section; the homepage hero says 1-3). IPP (credit-card-ipp page): 0% instalment MDR 3.50% (3-month), 4.00% (6), 5.00% (12), 7.50% (24), 9.70% (36), 9 banks, T+1 settlement; the homepage states a one-time IPP setup fee of RM500 (this corrects the July note that said RM500 was gone). RM300-RM3,000 figures are per-bank minimum transaction amounts. New since May 2026: BInfinite loyalty (earn/redeem BPoints at checkout, no setup fee). BNM-licensed merchant acquirer."
---

CommercePay (Commerce DotAsia Payments Sdn Bhd) is licensed by Bank Negara Malaysia for online merchant acquiring. It supports FPX/DuitNow online banking, local and international credit/debit cards, e-wallets, recurring payments and an Instalment Payment Plan (IPP / "InstallmentPay Plus").

The company confirms there are no setup or annual maintenance fees and that it charges only per transaction, offering either a fixed fee or a percentage fee, but the actual gateway rates are not published and require a quote. Earnings are settled within 1-2 business days.

The one published rate is for instalments: IPP carries a one-time RM500 setup fee with transaction fees "as low as 3.5%" over 3-36 month tenures. Integration is via ready-made plugins (SiteGiant, WooCommerce, OpenCart, NopCommerce), an API, shareable payment links and integrated forms, with a merchant back-office for reporting.
