---
name: Paydibs
website: https://paydibs.com
tagline: "Malaysian local payment gateway for online and in-store"
logo: /logos/paydibs.svg
fees:
  fpx: "Contact sales"
  card: "Contact sales"
  ewallet: "Contact sales"
  duitnowqr: "Contact sales"
  bnpl: "Contact sales"
  setup: "Free (local); USD120 (foreign)"
  monthly: "RM300/year (waived if prior-year sales ≥ RM360,000)"
settlement: "Contact sales"
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
dev_docs: "https://v3api-docs.paydibs.com/docs/introduction"
popularity: 42
plans:
  - name: "Nexus"
    eligibility: "Growing eCommerce businesses"
    rows:
      - { label: "Signup", value: "Free (local) / USD120 (foreign merchants)" }
      - { label: "Yearly maintenance", value: "RM300 (waived at RM360,000+ annual sales)" }
    source: "https://paydibs.com/pricing/"
  - name: "Payment Gateway Stack"
    eligibility: "Online businesses, Malaysia and overseas"
    rows:
      - { label: "Signup", value: "Free (local) / USD120 (foreign merchants)" }
      - { label: "Yearly maintenance", value: "RM300 (waived at RM360,000+ annual sales)" }
    source: "https://paydibs.com/pricing/"
verified_date: "2026-07-17"
source: "https://paydibs.com/pricing/"
notes: "Settlement schedule (previously 3x weekly Tue/Wed/Fri) no longer found anywhere on paydibs.com (re-verified 2026-07-17) so it is downgraded to Contact sales. Signup fee, RM300/year maintenance fee and T+1/T+2 settlement are confirmed on the official pricing page; per-transaction MDR rates are not publicly published, so contact sales."
---

Paydibs is a Malaysian payment service provider (Bank Negara-regulated, MSC status, PCI-DSS compliant) offering online and in-store payment acceptance through a single platform. It supports FPX, cards, e-wallets, DuitNow QR, BNPL and a range of international methods, with e-commerce plugins, APIs/SDKs, payment links and physical terminals.

It targets Malaysian businesses from startups and SMEs up to enterprises that want local support, broad local payment coverage and fast settlement.

The official pricing page confirms free signup for local merchants (USD120 for foreign), no monthly fee, a RM300/year maintenance fee (waived above RM360,000 annual sales), and T+1/T+2 settlement. Per-transaction rates for all channels are not publicly published, so contact sales.
