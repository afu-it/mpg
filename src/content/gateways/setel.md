---
name: Setel
website: https://www.setel.com/business/payments
tagline: "Add Pay with Setel as an online checkout option for Setel app users"
category: ewallet
fees:
  fpx: "—"
  card: "Contact sales"
  ewallet: "Contact sales"
  duitnowqr: "—"
  setup: "Contact sales"
  monthly: "Contact sales"
settlement: "Contact sales"
min_txn: "—"
channels: [ewallet, card]
methods:
  - Setel Wallet
  - Setel CardTerus (credit / debit card in the Setel app)
features:
  no_code: false
  api: true
  recurring: false
webhooks: true
dev_docs: https://developer.setel.com/docs/pay-with-setel-online
popularity: 26
verified_date: "2026-10-21"
bnm:
  roles: [merchant-acquirer, emoney-issuer]
  entity: "Setel Ventures Sdn Bhd"
  checked: "2026-10-21"
  evidence: "https://www.setel.com/business/payments"
source: "https://www.setel.com/business/payments"
notes: "Verified 2026-10-21 on https://www.setel.com/business/payments and https://developer.setel.com/docs/pay-with-setel-online. Setel's online checkout ('Pay with Setel online') creates a checkout session that redirects the customer to the Setel Checkout page or opens the Setel app, and posts a webhook to the merchant on success. Supported online payment methods per the docs: Setel Wallet ('Pay with the balance in the Setel Wallet') and Setel CardTerus ('Pay with selected credit or debit cards directly'), so card payments happen inside the customer's Setel account, not as a general card gateway. No rates are published; the business page asks merchants to email commercial@setel.com. Setel also offers in-store Scan & Pay. Operated by Setel Ventures Sdn Bhd, Kuala Lumpur."
---

**Setel** is the Malaysian motoring and payments app from **Setel Ventures**.
Its business product lets merchants add **Pay with Setel** as a payment option
in their online store, so Setel app users can pay with their account. Setel also
handles in-store payments through Scan & Pay.

Online, customers pay with their **Setel Wallet** balance or with a credit or
debit card saved in Setel (**CardTerus**). Integration is through a checkout
session API with redirect or app deep links, and Setel sends a webhook when a
payment succeeds.

Setel does not publish its merchant rates; businesses are asked to email its
commercial team. It is an extra wallet option for reaching Setel's users, not a
full FPX or card gateway.
