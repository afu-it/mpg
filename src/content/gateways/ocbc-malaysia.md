---
name: OCBC OneCollect
website: https://www.ocbc.com.my/business-banking/go-digital/one-collect
logo_round: true
tagline: "OCBC's unified QR and online banking collection for merchants"
category: bank
fees:
  fpx: "Contact sales"
  card: "Contact sales"
  card_intl: "Contact sales"
  ewallet: "Contact sales"
  duitnowqr: "0.6%"
  setup: "Contact sales"
  monthly: "Contact sales"
settlement: "Contact sales"
min_txn: "—"
channels: [duitnowqr, fpx, card, ewallet]
methods:
  - DuitNow QR
  - FPX online banking
  - Alipay
  - UnionPay
  - NETS
  - QRIS
  - PromptPay
  - PayNow QR
  - Credit card via DuitNow QR
features:
  no_code: true
  api: false
  recurring: false
popularity: 35
verified_date: "2026-10-20"
source: "https://www.ocbc.com.my/iwov-resources/my/ocbc/personal/pdf/help-and-support/general/Fees_Charges_EN.pdf"
bnm:
  roles: [bank]
  entity: "OCBC Bank (Malaysia) Berhad"
  checked: "2026-10-21"
  evidence: "https://www.bnm.gov.my/regulations/fsp-directory?p_p_id=com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_jXC730NRlqU0&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_r_p_tag=merchant-acquirer"
notes: "Re-verified 2026-10-20 against OCBC Malaysia Fees & Charges (v.250926, section 15): OneCollect DuitNow QR MDR is 0.6% for both CASA-funded and credit-card-funded payments, on-us and off-us, excluding 8% service tax. That fee was waived until 30 Sept 2026, so it now applies. PayNow QR (CASA) stays waived until further notice; corporate DuitNow QR packages are by commercial arrangement. FPX is a separate OCBC FPX Collection product at commercial arrangement (Contact sales). Product page lists cross-border DuitNow QR acceptance via Alipay, UnionPay, NETS, QRIS and PromptPay; WeChat Pay is no longer named. Requires an existing OCBC MYR business account; DuitNow QR proceeds credit immediately, PayNow QR within 2 business days. API available."
instant_settlement:
  detail: "OneCollect DuitNow QR payments arrive instantly in your OCBC business account (QR only, not cards)."
  detail_ms: "Bayaran DuitNow QR OneCollect masuk serta-merta ke akaun perniagaan OCBC anda (QR sahaja, bukan kad)."
  quote: "Start receiving touch-free payments instantly to your business account"
  source: https://www.ocbc.com.my/business-banking/go-digital/one-collect
  checked: "2026-10-21"
---

**OCBC OneCollect** is OCBC Malaysia's unified merchant collection product,
accepting **DuitNow QR**, FPX online banking, and cross-border QR payments via
Alipay, UnionPay, NETS, QRIS, PromptPay and PayNow.

Funds settle automatically to an OCBC MYR business account. OCBC's public API
store covers outgoing payments only; there is no public API for collecting
payments in Malaysia. OCBC publishes a 0.6% merchant discount rate on
DuitNow QR (bank-account or credit-card funded), which applies since the waiver
ended on 30 September 2026. Other rates are quoted on application.
