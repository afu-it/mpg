---
name: Razorpay Curlec
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
  setup: "RM0"
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
      - { label: "DuitNow Pay", value: "1.20% or RM0.30, whichever is greater" }
      - { label: "Alipay+", value: "2.70%" }
      - { label: "BNPL", value: "6.00%" }
    source: "https://curlec.com/pricing/"
  - name: "Premium"
    eligibility: "RM999 setup, optimised rates"
    rows:
      - { label: "FPX", value: "1.00% or RM1.00, whichever is greater" }
      - { label: "Local cards", value: "2.00%" }
      - { label: "Foreign cards", value: "3.10%" }
      - { label: "E-wallets", value: "1.30% (GrabPay 1.50%)" }
      - { label: "DuitNow Pay", value: "1.00% or RM0.30, whichever is greater" }
      - { label: "Alipay+", value: "2.50%" }
      - { label: "BNPL", value: "5.00%" }
    source: "https://curlec.com/pricing/"
  - name: "Enterprise"
    eligibility: "Volume above RM1 million"
    rows:
      - { label: "All rates", value: "Personalised pricing, contact sales" }
    source: "https://curlec.com/pricing/"
verified_date: "2026-11-26"
source: "https://curlec.com/pricing/"
bnm:
  roles: [merchant-acquirer]
  entity: "Razorpay Curlec Sdn. Bhd."
  checked: "2026-10-21"
  evidence: "https://curlec.com"
notes: "Basic-plan rates shown, including RM0 setup and no annual fee. Premium has a separate RM999 one-time setup fee and no annual fee; local cards are 2.00%, FPX is 1.00% or RM1 (whichever is greater), TNG/Boost 1.30% and GrabPay 1.50%. Enterprise pricing is personalised. Checked 2026-11-26 against the rendered Payment Gateway and Subscriptions tabs: card subscriptions use standard domestic/international card pricing per transaction; Direct Debit pricing requires a quote. DuitNow Pay is distinct from DuitNow QR. The checked pricing table does not list UPI rates or a DuitNow QR rate. Confirm settlement timing and applicable taxes with sales."
---

Razorpay Curlec is the Malaysian arm of **Razorpay**, offering hosted checkout,
payment links, payment pages/buttons, subscriptions and a developer API.

The Basic payment gateway plan has **RM0 setup and no annual fee**: **FPX 1.50%**
(or RM1, whichever is greater), local cards **2.40%**, foreign cards **3.30%**,
e-wallets **1.50%** and BNPL **6.00%**. Premium has a separate **RM999 one-time
setup fee and no annual fee**, with local cards at 2.00% and FPX at 1.00%
(or RM1, whichever is greater). Enterprise pricing is personalised.

The official pricing page also lists subscriptions via **cards and Direct Debit**.
Card subscriptions use standard domestic/international card pricing per transaction.
Direct Debit pricing requires a quote; the payment gateway setup fees above should
not be treated as a Direct Debit quote. Confirm settlement timing, applicable taxes
and any unpublished DuitNow QR rate with Razorpay Curlec sales.
