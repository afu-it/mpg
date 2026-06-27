---
name: Boost
website: https://myboost.co/business
tagline: "Axiata fintech gateway with fully published online rates"
fees:
  fpx: "RM1.00"
  card: "2.00%"
  card_intl: "4.00%"
  ewallet: "1.20%"
  duitnowqr: "0.85%"
  setup: "RM499 (waived)"
  monthly: "RM499/yr"
settlement: "T+2 (QR T+1)"
min_txn: "—"
channels: [fpx, card, ewallet, duitnowqr]
methods:
  - FPX online banking
  - Visa
  - Mastercard
  - MyDebit
  - DuitNow QR
  - Boost eWallet
  - GrabPay
  - Touch 'n Go eWallet
  - ShopeePay
features:
  no_code: true
  api: true
  recurring: true
webhooks: false
popularity: 60
verified_date: "2026-06-26"
source: "https://myboost.co/business/payment-gateway"
notes: "Operated by Boost Connect Sdn Bhd (1259684-W, formerly Apigate), an Axiata fintech and BNM Registered Merchant Acquirer (Non-bank). Published online rate card: FPX CASA B2C RM1.00 (B2B RM2.00), local credit card 2.00% (local debit 1.25%), foreign card 4.00%, DuitNow QR 0.85%, Boost e-wallet 1.20% (GrabPay/TNG/ShopeePay 1.30%). Setup RM499 waived during introductory period, RM499 annual fee. Refund RM0.70 (online banking), chargeback RM50, per-transaction limit RM2,000 on banking and cards, minimum settlement RM100."
---

**Boost** is the Axiata-owned Malaysian fintech, and its online payment gateway
runs through **Boost Connect Sdn Bhd** (formerly Apigate), a **Bank Negara
Malaysia Registered Merchant Acquirer**. One integration covers cards, FPX online
banking, DuitNow QR and e-wallets on a PCI DSS Level 1 stack.

Unusually for a Malaysian acquirer, Boost publishes its full rate card. **DuitNow
QR is 0.85%**, **FPX a flat RM1.00**, **local credit card 2.00%** (local debit
1.25%) and **foreign cards 4.00%**, with e-wallets at 1.20% (Boost) or 1.30%
(GrabPay, Touch 'n Go, ShopeePay). The **RM499 setup fee is currently waived**,
with a RM499 annual fee. It offers payment links, tokenisation and recurring
billing, settling QR at T+1 and other methods at T+2.
