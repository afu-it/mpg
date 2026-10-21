---
name: UOB Malaysia
website: https://www.uob.com.my
tagline: "UOB merchant services with hosted checkout and tokenisation"
category: bank
fees:
  fpx: "—"
  card: "Contact sales"
  card_intl: "Contact sales"
  ewallet: "—"
  duitnowqr: "RM0"
  setup: "Contact sales"
  monthly: "Contact sales"
settlement: "Contact sales"
min_txn: "—"
channels: [card, duitnowqr]
methods:
  - Visa
  - Mastercard
  - UnionPay
  - DuitNow QR
  - Hosted checkout
  - Tokenisation
features:
  no_code: true
  api: false
  recurring: true
webhooks: false
popularity: 42
plans:
  - name: "DuitNow QR (UOB business current account)"
    eligibility: "Malaysian merchants with a UOB business current account, MYR only"
    rows:
      - { label: "Subscription", value: "RM0" }
      - { label: "DuitNow QR (CASA / e-wallet)", value: "No fee until 31 December 2026" }
      - { label: "DuitNow QR (credit card)", value: "0.25% until 31 December 2026" }
    settlement: "Credited immediately"
    source: "https://www.uob.com.my/business/transact/payments/duitnow-qr.page"
verified_date: "2026-10-20"
source: "https://www.uob.com.my/personal/cards/merchant-services.page"
bnm:
  roles: [bank]
  entity: "United Overseas Bank (Malaysia) Berhad"
  checked: "2026-10-21"
  evidence: "https://www.bnm.gov.my/regulations/fsp-directory?p_p_id=com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_jXC730NRlqU0&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_r_p_tag=merchant-acquirer"
notes: "Re-verified 2026-10-20. DuitNow QR pricing is now published on the official UOB DuitNow QR page (https://www.uob.com.my/business/transact/payments/duitnow-qr.page): no subscription charge, no fee for CASA or e-wallet funded payments and 0.25% for credit-card funded payments, both until 31 December 2026 (the page does not say what applies after that), static and dynamic QR, cross-border QR on by default, funds credited immediately; requires a UOB business current account. The duitnowqr value is the CASA/e-wallet rate. Online card gateway (hosted checkout, tokenisation, recurring collections) and POS terminals (cards, e-wallets, BNPL, UOB 0% Instalment Payment Plan) remain quote-only; no MDR, setup or monthly fee published. UOB's developer portal returned an error (503) on 2026-10-20. Earlier: UOB Malaysia's merchant services include online card acceptance with hosted checkout, 3D-Secure, tokenisation and recurring billing, plus DuitNow QR, with API services available."
instant_settlement:
  detail: "DuitNow QR payments are credited to your UOB account immediately. Card payout times are not published."
  detail_ms: "Bayaran DuitNow QR masuk ke akaun UOB anda serta-merta. Tempoh duit kad tak disiarkan."
  quote: "Payments will be processed to be credited to your account immediately."
  source: https://www.uob.com.my/business/transact/payments/duitnow-qr.page
  checked: "2026-10-21"
---

**UOB Malaysia** provides bank merchant services with an online card-acceptance
gateway, offering hosted checkout, 3D-Secure, tokenisation and recurring billing,
plus DuitNow QR. UOB publishes no public integration docs for taking payments;
the specs are shared after a merchant is approved.

Merchants apply with a UOB business account. Card and setup rates are quoted on
approval rather than published, so they stay "Contact sales". DuitNow QR is the
exception: UOB publishes no fee for bank-account and e-wallet payments and 0.25%
for credit-card payments, both until 31 December 2026.
