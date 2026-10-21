---
name: Revenue Monster
website: https://revenuemonster.my
tagline: "Unified payment, loyalty and SuperApp solutions for businesses"
logo: /logos/revenue-monster.svg
fees:
  fpx: "Contact sales"
  card: "Contact sales"
  ewallet: "Contact sales"
  duitnowqr: "Contact sales"
  bnpl: "Contact sales"
  setup: "RM499 (one-time)"
  monthly: "—"
settlement: "T+2"
min_txn: "—"
category: gateway
channels: [fpx, card, ewallet, duitnowqr, bnpl]
features:
  no_code: true
  api: true
  recurring: true
webhooks: true
plugins:
  - WooCommerce
  - OpenCart
dev_docs: "https://doc.revenuemonster.my/"
popularity: 60
plans:
  - name: "Advanced Plan"
    eligibility: "SMEs and growing businesses"
    rows:
      - { label: "Setup", value: "RM499 one-time" }
      - { label: "Transaction rates", value: "Not published (contact sales)" }
      - { label: "Extra settlement account", value: "RM99 one-time per account" }
    settlement: "Typically T+2 business days"
    source: "https://revenuemonster.my/pricing"
  - name: "Corporate+ Plan"
    eligibility: "High-volume merchants"
    rows:
      - { label: "All fees", value: "Personalised pricing, contact sales" }
    source: "https://revenuemonster.my/pricing"
verified_date: "2026-10-20"
source: "https://revenuemonster.my/pricing"
bnm:
  roles: [merchant-acquirer]
  entity: "Revenue Monster Sdn Bhd"
  checked: "2026-10-21"
  evidence: "https://revenuemonster.my"
notes: "The previously indicative from-0.8% e-wallet/DuitNow figures are no longer on /pricing (re-verified 2026-07-17) so both are downgraded to Contact sales. Setup fee (RM499 one-time) and T+2 settlement are from the official pricing page; per-transaction rates are described only as 'competitive rates' and are not publicly published, so contact sales."
---

Revenue Monster is a Bank Negara Malaysia-certified payment gateway and fintech platform serving Malaysia, Singapore and Southeast Asia. It offers unified online and in-store payments (FPX, cards, e-wallets including Alipay/WeChat Pay, DuitNow QR, BNPL) alongside loyalty, gamification and SuperApp/Mini-Program tools, plus open REST APIs and SDKs.

It targets SMEs in F&B, retail and services as well as corporate clients, and is especially strong for QR/e-wallet-heavy merchants who want payments bundled with loyalty and white-label digital tools.

The official pricing page lists a one-time RM499 application/setup fee (Advanced plan) and T+2 settlement, with no published monthly platform fee. Per-transaction rates (FPX, card MDR, e-wallet, DuitNow QR, BNPL) are described only as "competitive rates" and are not published, so contact sales.
