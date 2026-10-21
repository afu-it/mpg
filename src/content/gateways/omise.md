---
name: Omise
website: https://www.omise.co
tagline: "Regional gateway with flat-rate FPX, DuitNow QR and Malaysian e-wallets"
fees:
  fpx: "RM1.50"
  card: "2.5%"
  card_intl: "3.8%"
  ewallet: "1.5%"
  duitnowqr: "1.5%"
  bnpl: "6% - 8%"
  setup: "RM0"
  monthly: "RM0"
settlement: "3-day hold, then transfer (3 business days)"
min_txn: "—"
channels: [fpx, card, ewallet, duitnowqr, bnpl]
methods:
  - Visa
  - Mastercard
  - American Express
  - Touch 'n Go eWallet
  - Boost
  - GrabPay
  - ShopeePay
  - Maybank QR
  - Google Pay
  - Atome
  - Grab PayLater
features:
  no_code: true
  api: true
  recurring: true
mcp: "none"
webhooks: true
plugins:
  - WooCommerce
  - Magento
  - Shopify
  - OpenCart
  - PrestaShop
dev_docs: "https://docs.omise.co/"
popularity: 26
verified_date: "2026-10-21"
source: "https://www.omise.co/en/pricing/malaysia"
bnm:
  roles: [merchant-acquirer]
  entity: "Omise Payment Malaysia Sdn Bhd"
  checked: "2026-10-21"
  evidence: "https://www.bnm.gov.my/regulations/fsp-directory?p_p_id=com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_jXC730NRlqU0&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_r_p_tag=merchant-acquirer-nonbank"
notes: "Verified 2026-10-21 on https://www.omise.co/en/pricing/malaysia. Cards (Visa, Mastercard, American Express) 2.50% domestic, 3.80% international, plus RM0.50 on amounts below RM40.00. DuitNow QR 1.50%. Online banking (DuitNow and FPX) RM1.50 per transaction. E-wallets: Touch 'n Go, Boost, GrabPay, ShopeePay and Maybank QR 1.50%, Google Pay 2.50%. BNPL: Atome 6.00% + RM1.20, Grab PayLater Post-Paid 7.00%, Grab PayLater Installment 8.00%. Custom pricing for large businesses via sales. No upfront fees, fixed costs or monthly minimums (docs.omise.co/how-much-does-omise-cost, international version). Payouts (docs.omise.co/how-do-i-transfer-withdraw-my-balance/malaysia, updated 2026-03-19): payments are held 3 days, transfers are batched once a business day and reach the bank in 3 business days; transfers under RM300 cost RM1.00, RM300 or more free; minimum RM1.00 transferable balance. Recurring charges via the Schedules API, payment links from the dashboard, and webhooks are documented. The company traded as Opn Payments for a period and is now back to the Omise brand."
---

Omise is a Southeast Asian payment gateway, best known in Thailand, that also
serves Malaysian merchants through Omise Payment Malaysia. It suits businesses
that want one API and dashboard across several Asian markets, with plugins for
WooCommerce, Magento and Shopify, payment links, and scheduled recurring
charges.

Its Malaysian rate card is published and simple: **FPX at a flat RM1.50**,
DuitNow QR and the main e-wallets (Touch 'n Go, Boost, GrabPay, ShopeePay,
Maybank QR) at 1.50%, and cards at 2.50% domestic or 3.80% international, with
an extra RM0.50 on card payments under RM40. BNPL runs from 6.00% + RM1.20
(Atome) to 8.00% (Grab PayLater instalments). There are no upfront fees or
monthly minimums.

Payouts are slower than most local gateways: payments are held for 3 days, then
transfers take 3 business days to reach your bank, and transfers under RM300
cost RM1.00 each.
