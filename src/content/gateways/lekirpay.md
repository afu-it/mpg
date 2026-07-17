---
name: LekirPay
website: https://lekirpay.com
dev_docs: https://app.lekirpay.com/doc/payment/normal
logo: /logos/lekirpay.png
tagline: "SME payment platform with FPX from RM0.80 per transaction"
fees:
  fpx: "RM0.80 + RM0.10"
  card: "2.7%"
  ewallet: "—"
  duitnowqr: "—"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+0 (FPX same-day; cards bi-weekly)"
min_txn: "—"
channels: [fpx, card]
features:
  no_code: true
  api: true
  recurring: true
plugins:
  - GiveWP
popularity: 30
plans:
  - name: "Start Up"
    eligibility: "Free plan, FPX only"
    rows:
      - { label: "FPX", value: "RM0.80 per transaction + RM0.10 settlement fee" }
    source: "https://lekirpay.com"
  - name: "Enterprise"
    eligibility: "RM299 sign-up + RM199/year"
    rows:
      - { label: "FPX", value: "RM0.80 per transaction + RM0.10 settlement fee" }
      - { label: "Cards", value: "2.7%" }
    source: "https://lekirpay.com"
verified_date: "2026-07-17"
source: "https://lekirpay.com"
notes: "Re-verified 2026-07-17: same-day FPX settlement (T+0) published; card acceptance (2.7%, bi-weekly settlement) requires the Enterprises plan (RM299 sign-up + RM199/yr). Cyberjaya company (1381659-X) styling itself a commoditised payment platform for SMEs. Published: FPX RM0.80 per transaction plus RM0.10 settlement fee (effectively RM0.90 all-in, among the cheapest published FPX rates), cards 2.7%; Start Up plan free, Enterprise RM299 sign-up + RM199/year. Payment forms and QR, recurring billing supported, DuitNow Online Banking marked coming soon. API docs and live merchant portal (app.lekirpay.com); GiveWP donation plugin on WordPress.org. Settlement timing not published."
---

LekirPay sells itself as a commoditised payment platform: simple published
pricing, payment forms and QR out of the box, and recurring billing included.
FPX costs RM0.80 per transaction plus a RM0.10 settlement fee, which lands the
all-in cost at RM0.90, cheaper than toyyibPay's flat RM1.00; cards run at
2.7%.

The free Start Up plan covers standard use, while Enterprise (RM299 sign-up,
RM199 a year) targets higher-volume merchants. Developers get API
documentation and a live sandbox portal, and a GiveWP plugin serves the
donation/NGO niche. DuitNow Online Banking support is marked coming soon.
