---
name: LeanX
website: https://leanx.io
logo: /logos/leanx.png
logo_round: true
tagline: "Unified payment platform with billing, payouts and store"
fees:
  fpx: "RM1.50"
  card: "—"
  ewallet: "1.7%"
  duitnowqr: "—"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+1"
min_txn: "—"
channels: [fpx, card, ewallet]
features:
  no_code: true
  api: true
  recurring: false
plugins:
  - WooCommerce
  - OpenCart
dev_docs: "https://docs.leanx.io"
popularity: 36
plans:
  - name: "Lite"
    eligibility: "Free setup, free annual fee"
    rows:
      - { label: "FPX", value: "RM1.50 B2C / RM2.00 B2B" }
      - { label: "E-wallets (TnG, Boost, GrabPay, ShopeePay)", value: "1.7%" }
      - { label: "Cards", value: "Not available on Lite" }
    settlement: "T+1"
    source: "https://leanx.io/pricing"
  - name: "Growth"
    eligibility: "RM250 setup, free annual fee"
    rows:
      - { label: "FPX", value: "RM1.00 B2C / RM1.50 B2B" }
      - { label: "E-wallets", value: "1.5%" }
      - { label: "Cards (Visa/Mastercard)", value: "2.00%, subject to partner approval" }
      - { label: "Payout service", value: "Included" }
    settlement: "T+1"
    source: "https://leanx.io/pricing"
verified_date: "2026-07-17"
source: "https://leanx.io/pricing"
notes: "Two published memberships (Lite free / Growth RM250 setup), both with free annual fee and T+1 settlement on FPX and e-wallets. Card acceptance (2.00%) is Growth-only and subject to partner approval with extra documentation and an activation fee. Beyond the gateway: payout/disbursement service, free online store, payment forms, and SMS (RM0.50) / WhatsApp (RM0.50) / email (free) billing. Full API docs at docs.leanx.io incl WooCommerce and OpenCart plugins. Top-level fees here = Lite plan (default); Growth rates in the plans table."
---

LeanX positions itself as a unified payment platform rather than a bare
gateway: payment collection, payouts, an online store and multi-channel
billing (email free, SMS and WhatsApp at RM0.50 a message) under one
membership. Pricing is published for both tiers, which remains rare in
Malaysia.

The free Lite plan charges RM1.50 per B2C FPX transaction and 1.7% on the
major e-wallets with T+1 settlement. Growth (RM250 one-time) drops FPX to
RM1.00, e-wallets to 1.5%, and unlocks Visa/Mastercard at a flat 2.00%,
subject to partner approval. Developers get proper API documentation plus
WooCommerce and OpenCart plugins.
