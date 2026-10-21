---
name: Fiuu (formerly Razer Merchant Services)
website: https://fiuu.com
tagline: "Enterprise SEA gateway with 110+ payment methods"
logo: /logos/fiuu.svg
fees:
  fpx: "1% / RM1.20 (max RM2.00)"
  card: "2.00% + RM0.45"
  card_intl: "4.01% + RM0.84"
  ewallet: "1.3% - 1.5%"
  duitnowqr: "1.05%"
  bnpl: "Contact sales"
  setup: "RM0 (RM999 waived)"
  monthly: "RM99/year (1st year waived)"
settlement: "Weekly (Thu); e-wallets T+2"
min_txn: "—"
channels: [fpx, card, ewallet, duitnowqr, bnpl]
methods:
  - Credit / debit card
  - Touch 'n Go eWallet
  - GrabPay
  - Maybank QRPay
  - Boost
  - ShopeePay
  - WeChat Pay
  - Alipay
  - DuitNow QR
  - Atome
  - GrabPay Later
features:
  no_code: true
  api: true
  recurring: true
skill: setup-fiuu
webhooks: true
plugins:
  - WooCommerce
  - Shopify
  - Magento
  - OpenCart
  - WHMCS
dev_docs: https://github.com/FiuuPayment/Documentation-Fiuu_API_Spec
popularity: 90
verified_date: "2026-10-20"
source: "https://booster.fiuu.com/assets/Appendix_20260817.pdf"
bnm:
  roles: [merchant-acquirer]
  entity: "Razer Merchant Services Sdn Bhd (formerly known as MOLPay Sdn Bhd)"
  checked: "2026-10-21"
  evidence: "https://fiuu.com/terms-of-services/"
notes: "Official Booster (self-serve) appendix dated 2026-08-17, linked from booster.fiuu.com (replaces the April 2024 card). One-time signup fee RM999 waived (the earlier RM99 promo is gone); yearly maintenance RM99, first year waived. Online banking B2C 1.00% (min RM1.20, max RM2.00), B2B 1.00% (min RM1.70, max RM2.50). Online DuitNow QR 1.05% (CASA, wallet) or 1.40% (linked credit account). Online e-wallets: TNG 1.50%, GrabPay 1.40%, Boost 1.40%, ShopeePay 1.30%. Online Visa/Mastercard domestic credit 2.00% + RM0.45, debit 1.79% + RM0.45, prepaid 1.91% + RM0.45, charge card 3.37% + RM0.45; foreign 4.01% + RM0.84 plus scheme surcharges; MyDebit 0.90% (min RM1.20); UnionPay 3.00%; Diners/Discover 3.20%. BNPL (Atome, GrabPay PayLater) no longer appears on the appendix, so BNPL is Contact sales (April 2024 card listed 5.5% to 6%). Settled weekly every Thursday; domestic e-wallets T+2. Minimum settlement RM100. FPX refund RM0.60, chargeback RM50. Shopify merchants +0.25% MDR. Enterprise rates negotiable."
---

Fiuu is an established **enterprise** payment gateway operating since 2005
(formerly Razer Merchant Services / MOLPay). It powers high-volume merchants
across Southeast Asia with **110+ payment methods** and both online and in-person
(retail outlet) networks.

Its feature set is broad: seamless/in-page integration, tokenisation, recurring
payments, instalment plans, marketplace/split payments, mass payouts, payment
links and a mobile XDK. This makes it a fit for larger or regional businesses.

The fees shown come from Fiuu's own **merchant base-rate appendix** (August 2026)
and are a negotiable starting point; actual rates vary by volume and channel, so
confirm a tailored quote with Fiuu. The RM999 signup fee is currently waived and
the RM99 yearly fee is waived for the first year.
