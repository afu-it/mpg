---
name: Curlec (by Razorpay)
website: https://curlec.com
tagline: "Razorpay-backed gateway with a full payments suite"
logo: /logos/curlec.svg
fees:
  fpx: "1.5% / RM1.00"
  card: "2.40%"
  card_intl: "3.30%"
  ewallet: "1.50%"
  duitnowqr: "Contact sales"
  bnpl: "6.00%"
  setup: "RM0–RM999"
  monthly: "RM0"
settlement: "T+2"
min_txn: "—"
mcp: "official"
webhooks: true
plugins:
  - WooCommerce
  - Shopify
  - Magento
  - OpenCart
  - WHMCS
dev_docs: "https://curlec.com/docs/api/"
channels: [fpx, card, ewallet, bnpl]
features:
  no_code: true
  api: true
  recurring: true
skill: setup-curlec
popularity: 62
plans:
  - name: "Basic"
    eligibility: "Free setup"
    rows:
      - { label: "FPX", value: "1.50% or RM1.00, whichever is greater" }
      - { label: "Local cards", value: "2.40%" }
      - { label: "Foreign cards", value: "3.30%" }
      - { label: "E-wallets", value: "1.50%" }
      - { label: "BNPL (Atome)", value: "6.00%" }
    source: "https://curlec.com/pricing/"
  - name: "Premium"
    eligibility: "RM999 setup, optimised rates"
    rows:
      - { label: "FPX", value: "1.00% or RM1.00, whichever is greater" }
      - { label: "Local cards", value: "2.00%" }
      - { label: "Foreign cards", value: "3.10%" }
      - { label: "E-wallets", value: "1.30% (GrabPay 1.50%)" }
      - { label: "BNPL (Atome)", value: "5.00%" }
    source: "https://curlec.com/pricing/"
  - name: "Enterprise"
    eligibility: "Volume above RM1 million"
    rows:
      - { label: "All rates", value: "Personalised pricing, contact sales" }
    source: "https://curlec.com/pricing/"
verified_date: "2026-07-02"
source: "https://curlec.com/pricing/"
notes: "Basic-plan rates shown: FPX 1.50% (or RM1, whichever greater), credit/debit card 2.40%, foreign card 3.30%, e-wallet 1.50%, BNPL 6.00%. Premium plan lowers card to 2.00% / FPX to 1.00%. A one-time setup fee applies; Enterprise (>RM1M/month) is personalised. Applicable taxes (SST) extra."
---

Curlec is the Malaysian arm of **Razorpay**, offering a full payments suite:
hosted checkout, payment links, payment pages/buttons, subscriptions and a
developer-friendly API.

On the Basic plan: **FPX 1.50%** (or RM1, whichever is greater), credit/debit
cards **2.40%**, foreign cards **3.30%**, e-wallets **1.50%** and BNPL **6.00%**.
The Premium plan lowers card to 2.00% and FPX to 1.00%, and Enterprise (over
RM1M/month) is personalised. A one-time setup fee applies.

Because it inherits Razorpay's platform, recurring billing and no-code tools are
strong. Exact setup fee, settlement timing and DuitNow QR rate aren't published
on the pricing page, so confirm with Curlec sales.
