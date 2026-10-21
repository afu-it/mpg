---
name: M1Pay
website: https://www.m1pay.com.my
tagline: "Malaysian payment gateway by MobilityOne: FPX, cards, e-wallets, DuitNow QR"
fees:
  fpx: "RM0.80"
  card: "1.8%"
  card_intl: "2.8%"
  ewallet: "1% - 1.2%"
  duitnowqr: "Contact sales"
  setup: "Contact sales"
  monthly: "Contact sales"
settlement: "T+1 (FPX, DuitNow QR, MyDebit) / T+2 (cards, e-wallets)"
min_txn: "—"
channels: [fpx, card, ewallet, duitnowqr]
methods:
  - Credit / debit card
  - MyDebit
  - eM-ONEi wallet
  - DuitNow QR
features:
  no_code: true
  api: true
  recurring: false
webhooks: true
dev_docs: "https://www.m1pay.com.my/assets/documents/M1Pay_IntegrationGuideline.pdf"
popularity: 18
verified_date: "2026-10-20"
source: "https://www.m1pay.com.my/assets/documents/Form-A1M1Pay.pdf"
bnm:
  roles: [merchant-acquirer, emoney-issuer]
  entity: "MobilityOne Sdn Bhd"
  checked: "2026-10-21"
  evidence: "https://www.mobilityone.com.my/v7/payment-gateway.html"
notes: "MDR table from the official application form PDF, Schedule 3 Appendix C (re-verified 2026-10-20; PDF dated May 2023, unchanged): FPX B2C RM0.80 / B2B RM1.30 per transaction; domestic credit card 1.8% eCom (1.7% POS), foreign card 2.8%; MyDebit 1% (POS only); e-wallets eCom: eM-ONEi 1%, Boost 1.2%, Touch n Go 1.2%, ShopeePay 1.2%, WeChat Pay 1.2%, Maybank QRPay 1%, Alipay 2%; the DuitNow QR rate is left blank in the PDF. RM8/month inactive fee if no credit card transaction in a calendar month. Payout terms: FPX, MyDebit and DuitNow QR T+1 business day; credit card and e-wallets T+2 business days. Setup and maintenance fee fields are blank in the PDF, and the redesigned m1pay.com.my homepage (checked 2026-10-20) no longer shows the RM399 setup / RM100 per year plan seen on 2026-07-17, so both are now Contact sales. Operated by MobilityOne Sdn Bhd, a KL-based fintech."
no_ssm:
  detail: "Its application form lets individuals use their MyKad or passport number in place of a business registration number; approval is case by case."
  detail_ms: "Borang permohonan mereka benarkan individu guna nombor MyKad atau pasport di tempat nombor pendaftaran perniagaan; kelulusan ikut kes."
  quote: "For individuals fill in Name for \"Registered Business\" and NRIC/Passport number for \"Business Registration No\""
  source: https://www.m1pay.com.my/assets/documents/Form-A1M1Pay.pdf
  checked: "2026-10-21"
---

M1Pay is a Malaysian payment gateway by **MobilityOne Sdn Bhd**, offering FPX
online banking, credit/debit cards, MyDebit, e-wallets (including MobilityOne's
own eM-ONEi) and DuitNow QR through a merchant portal with invoicing.

It targets SMEs, enterprises and social-media sellers. Its merchant application
form publishes a full MDR table: FPX **RM0.80** (B2C), domestic cards **1.8%**
online, foreign cards 2.8% and most e-wallets 1% to 1.2%. Setup, maintenance and
DuitNow QR pricing are not published, so those are "Contact sales". Payouts run
T+1 for FPX and DuitNow QR and T+2 for cards and e-wallets.
