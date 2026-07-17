---
name: KineticPay
website: https://kineticpay.my
dev_docs: https://docs.kineticpay.my/
logo: /logos/kineticpay.png
tagline: "Collection forms and FPX payments with fraud screening"
fees:
  fpx: "1% + RM1.50"
  card: "Contact sales"
  ewallet: "—"
  duitnowqr: "—"
  setup: "Contact sales"
  monthly: "Contact sales"
settlement: "T+1 (next working day)"
min_txn: "—"
channels: [fpx, card]
features:
  no_code: true
  api: true
  recurring: false
plugins:
  - WooCommerce
  - WHMCS
popularity: 34
plans:
  - name: "FPX"
    eligibility: "For businesses starting with online banking"
    rows:
      - { label: "FPX (all Malaysian banks)", value: "1% + RM1.50 per successful transaction" }
      - { label: "Includes", value: "Unlimited collection forms, FB/TikTok Pixel, GA4" }
    settlement: "Next working day"
    source: "https://kineticpay.my/"
  - name: "Credit Card + FPX"
    eligibility: "Rate on request"
    rows:
      - { label: "Card + FPX", value: "Undisclosed % + RM1.50 per successful transaction" }
    source: "https://kineticpay.my/"
verified_date: "2026-07-17"
source: "https://kineticpay.my/"
notes: "Re-verified 2026-07-17: no setup/annual figure published anywhere (site says pay only for successful transactions). Collection-form platform + gateway: unlimited payment forms/links, buyer fraud screening (worldwide/custom bans, mandatory buyer profiling at checkout), Facebook/TikTok Pixel + GA4 conversion tracking built in. Published FPX rate 1% + RM1.50; card plan advertised as x% + RM1.50 with the percentage undisclosed. E-wallet, BNPL and international cards listed as coming soon. Pay-per-successful-transaction, no hidden fees claimed. Previously marked restricted in this directory (2026-06-26 discovery round); site now openly onboards merchants via manage.kineticpay.my."
---

KineticPay is a Malaysian collection-form platform with its own payment
gateway, pitched at sellers who run campaigns: every plan includes unlimited
payment forms and links, Facebook and TikTok Pixel plus GA4 conversion
tracking, and an unusually aggressive anti-fraud layer (worldwide or custom
buyer bans and mandatory buyer profiling at checkout).

Published pricing is FPX-first: 1% + RM1.50 per successful transaction across
all Malaysian banks, settling the next working day. A card + FPX plan exists
but its percentage is not published, and e-wallet/BNPL acceptance is marked
coming soon. WooCommerce and WHMCS plugins ship with step-by-step tutorials,
plus a REST API for custom builds.
