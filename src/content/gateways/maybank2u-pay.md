---
name: Maybank2u Pay
website: https://m2upay.maybank2u.com.my
dev_docs: https://m2upay.maybank2u.com.my/assets/sdk/index.html
tagline: "Maybank's bank-direct gateway: online banking, cards and DuitNow QR"
logo_round: true
category: bank
fees:
  fpx: "Contact sales"
  card: "Contact sales"
  ewallet: "—"
  duitnowqr: "RM0"
  setup: "RM0"
  monthly: "Contact sales"
settlement: "Next business day"
min_txn: "—"
channels: [fpx, card, duitnowqr]
methods:
  - Online banking (Maybank account debit)
  - Visa
  - Mastercard
  - American Express
  - DuitNow QR (QRPayBiz)
  - Instalment plans
features:
  no_code: true
  api: true
  recurring: false
webhooks: true
popularity: 50
verified_date: "2026-07-17"
source: "https://m2upay.maybank2u.com.my/assets/faq/index.html"
notes: "Bank-direct gateway by Maybank (Malayan Banking Berhad). Two online channels: an Online Banking Payment Gateway (customer debits a Maybank current/savings account, FPX-style, not full multi-bank FPX) and the Cards Payment Gateway branded Maybank eBPG (Visa/Mastercard/Amex, 3D-Secure). Requires a Maybank business current account; settled next business day. No setup fee (confirmed on the FAQ); card and online-banking Merchant Rate is quoted in the Letter of Offer after approval. DuitNow QR via QRPayBiz currently free until further notice. A widely cited RM0.50 online-banking figure is from a third-party guide, not Maybank, so it is not used. SDKs for Java/JavaScript/PHP plus WooCommerce and EasyStore plugins."
---

**Maybank2u Pay** is the bank-direct online payment gateway from **Maybank**,
Malaysia's largest bank. It accepts payments through an **Online Banking Payment
Gateway** (the customer debits a Maybank current or savings account) and a
**Cards Payment Gateway** branded Maybank eBPG (Visa, Mastercard and American
Express under 3D-Secure), plus DuitNow QR through the QRPayBiz app.

Application is fully online with **no setup fee**, and funds settle to the
merchant's Maybank business current account the **next business day**. Maybank
does not publish card or online-banking rates; the Merchant Rate is stated in the
Letter of Offer after approval. DuitNow QR via QRPayBiz is currently free until
further notice. Integration is supported by Java, JavaScript and PHP SDKs plus
WooCommerce and EasyStore plugins.
