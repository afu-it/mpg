---
name: Stripe Malaysia
website: https://stripe.com/en-my
tagline: "Global developer-first payments with FPX & cards"
logo: /logos/stripe.svg
fees:
  fpx: "3% + RM1.00"
  card: "3% + RM1.00"
  card_intl: "4% + RM1.00"
  ewallet: "3%"
  duitnowqr: "—"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+7"
min_txn: "RM2.00"
channels: [fpx, card, ewallet]
methods:
  - Visa
  - Mastercard
  - American Express
  - Alipay
  - GrabPay
features:
  no_code: true
  api: true
  recurring: true
skill: setup-stripe-malaysia
mcp: "official"
webhooks: true
plugins:
  - WooCommerce
  - Magento
  - PrestaShop
dev_docs: "https://docs.stripe.com/api"
popularity: 68
verified_date: "2026-10-20"
source: "https://stripe.com/en-my/pricing"
bnm:
  roles: [merchant-acquirer]
  entity: "Stripe Payments Malaysia Sdn Bhd"
  checked: "2026-10-21"
  evidence: "https://stripe.com/en-my/legal/ssa"
notes: "Domestic cards and FPX both 3% + RM1.00. International cards add +1% (so ~4% + RM1.00), plus 2% if currency conversion is needed. GrabPay 3%, Alipay 2.9% + RM1.00. No setup or monthly fee. Powerful APIs and Stripe Billing for subscriptions. DuitNow QR not listed."
no_ssm:
  detail: "Individuals and sole owners can sign up with MyKad instead of an SSM business registration number."
  detail_ms: "Individu dan pemilik tunggal boleh daftar guna MyKad, bukan nombor pendaftaran SSM."
  quote: "you'll need to provide your Tax Identification Number (MY TIN) and Business Registration Number (BRN) or MyKad"
  source: https://support.stripe.com/questions/understanding-e-invoicing-requirements-for-malaysia
  checked: "2026-10-21"
instant_settlement:
  detail: "Instant Payouts is a paid extra (a small % per payout); the standard payout schedule is slower."
  detail_ms: "Instant Payouts ialah tambahan berbayar (sedikit % setiap kali keluarkan duit); jadual biasa lebih lambat."
  quote: "Access funds within minutes through an eligible debit card or bank account."
  source: https://stripe.com/en-my/pricing
  checked: "2026-10-21"
---

Stripe is the global, **developer-first** payments platform, available in
Malaysia with FPX, cards and selected e-wallets. It's the strongest choice if you
want world-class APIs, documentation and products like Billing, Connect and
Payment Links.

Malaysia pricing is simple but on the higher side for local methods: **FPX and
domestic cards are both 3% + RM1.00**. International cards add +1% (≈4% + RM1.00),
with a further 2% if currency conversion is required. GrabPay is 3% and Alipay
2.9% + RM1.00. There's no setup or monthly fee.

Stripe Billing handles subscriptions and metered usage well, and Payment Links
give a no-code option. DuitNow QR isn't listed in standard pricing. Best for
developer-heavy or cross-border businesses that value the platform over the
lowest local FPX rate.
