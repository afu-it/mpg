---
name: Herepay
website: https://www.herepay.org
logo: /logos/herepay.png
tagline: "Community and business collections with flat RM0.70 FPX"
fees:
  fpx: "RM0.70"
  card: "RM0.70 + 1%"
  ewallet: "—"
  duitnowqr: "—"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+1 (next business day)"
min_txn: "—"
channels: [fpx, card]
features:
  no_code: true
  api: true
  recurring: true
webhooks: true
plugins:
  - WooCommerce
dev_docs: "https://herepay.readme.io/reference/integrating-with-herepay-api-payment"
popularity: 40
plans:
  - name: "Percuma"
    eligibility: "No platform charge, ever"
    rows:
      - { label: "Platform charge", value: "RM0 per transaction" }
      - { label: "Includes", value: "Unlimited payment forms, infaq and donations, invoices and reports" }
    source: "https://www.herepay.org/harga/"
  - name: "Pro"
    eligibility: "Pay per use, capped RM1,999/year"
    rows:
      - { label: "Platform charge", value: "RM1 per transaction" }
      - { label: "Includes", value: "Fee and fund management, online store, sales platform and marketplace" }
    source: "https://www.herepay.org/harga/"
verified_date: "2026-10-20"
source: "https://www.herepay.org/harga/"
notes: "Fee-collection platform (school/PIBG fees, infaq, zakat) with a payment gateway: FPX B2C RM0.70 flat (B2B RM2.00), local Visa/Mastercard RM0.70 + 1%. RM0 setup, RM0 monthly, no contract; settlement processed every business day (next-business-day transfer); real-time settlement available as a custom plan (RM2,000/year). Platform charge (Percuma RM0 / Pro RM1 per transaction, capped RM1,999/year) applies on top for its forms product; gateway activation itself is free. E-wallet via strategic partners (unpriced). WooCommerce plugin v1.0.1 supports FPX, DuitNow and Direct Debit, one-off and recurring; Shopify listed as coming soon. Herepay Sdn. Bhd. (1455640-T), Bangsar South KL; site states regulated by PayNet, supported by Cradle and MOSTI."
instant_settlement:
  detail: "Real-time payout is a paid add-on (yearly fee). Standard is next working day."
  detail_ms: "Duit masuk serta-merta ialah tambahan berbayar (fee tahunan). Biasa ialah hari bekerja berikutnya."
  quote: "Real Time Settlement Herepay ✔ Tersedia (RM2,000 setahun)"
  source: https://www.herepay.org/gerbang-bayaran/
  checked: "2026-10-21"
---

Herepay is a Malaysian collection platform built for communities and small
organisations: PIBG and school fees, infaq, zakat and product sales. Its claim
to fame is price: a flat **RM0.70 per B2C FPX transaction**, the lowest flat
FPX rate published in this directory, with RM0 setup and RM0 monthly fees.

The platform side gives non-technical users unlimited payment forms, automatic
receipts, student databases and collection reports; the Percuma plan carries no
platform charge, while Pro adds fee-management and store features at RM1 per
transaction, capped at RM1,999 a year. Sekolah harian and MRSM adoption is its
main track record, and it is an authorised zakat collection agent.

For developers there is a REST API with documentation, plus a WooCommerce
plugin that supports FPX, DuitNow and Direct Debit including recurring
payments. Local cards (Visa/Mastercard) are priced at RM0.70 + 1%; e-wallets
run through partner integrations without published rates. Settlement is
processed every business day with next-business-day transfers.
