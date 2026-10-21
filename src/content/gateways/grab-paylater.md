---
name: GrabPay & PayLater
website: https://www.grab.com/my/merchant/checkout-solutions/
dev_docs: https://developer.grab.com/docs/paylater-integrations-launchpad-v2
tagline: "GrabPay wallet checkout plus pay later or in 4, 8 or 12 instalments"
logo: /logos/grab-paylater.svg
fees:
  fpx: "—"
  card: "—"
  ewallet: "Contact sales"
  duitnowqr: "—"
  bnpl: "Contact sales"
  setup: "Contact sales"
  monthly: "Contact sales"
settlement: "Within 5 working days"
min_txn: "—"
category: bnpl
channels: [ewallet, bnpl]
methods:
  - GrabPay
  - PayLater by Grab
plugins: [Shopify, WooCommerce, Magento, EasyStore]
features:
  no_code: true
  api: true
  recurring: true
popularity: 66
verified_date: "2026-10-21"
bnm:
  roles: [merchant-acquirer, emoney-issuer]
  entity: "GPay Network (M) Sdn Bhd"
  checked: "2026-10-21"
  evidence: "https://www.grab.com/my/terms-policies/grabpay-wallet-product-disclosure-sheet-risalah-pendedahan-produk-dompet-grabpay/"
source: "https://www.grab.com/my/merchant/checkout-solutions/"
notes: "Verified 2026-10-21 on https://www.grab.com/my/merchant/checkout-solutions/ (the /my/merchant/pay/ link redirects there). One sign-up covers both: \"Sign Up as a GrabPay and PayLater Merchant\", for \"Merchants who have an online web store and want to add GrabPay and/or PayLater as checkout options.\" Customers can \"pay today with GrabPay, pay next month or over 4, 8 or 12 installments with PayLater by Grab.\" Plugins: Shopify, WooCommerce, Magento, EasyStore, with Wix listed as coming soon; also via payments partners or the Direct API. \"Tokenisation allows for seamless repeat purchases and subscription payments.\" Settlement: \"Settlement is made to you within 5 working days with no risk involved\" (T+5). Grab does not publish a merchant rate for GrabPay or PayLater, so the ewallet and bnpl values are Contact sales. The bnpl value is the merchant fee (MDR), not the shopper instalment terms. Grab does not publish the PayLater merchant MDR officially; merchants apply for a rate, so it is Contact sales (an earlier unofficial third-party estimate of about 3% to 4% was removed from the fee field on 2026-10-20). Shopper-side fees changed from 1 June 2026: 4 instalments interest-free for VIP brands, otherwise 1.5% per instalment; 8 and 12 instalments 1.5% per instalment. From August 2026 Grab is trialling PayLater at any DuitNow QR merchant for whitelisted users."
---

GrabPay & PayLater is Grab's online checkout for Malaysian merchants. One sign-up lets
a web store add the GrabPay wallet, PayLater by Grab, or both. Shoppers can pay today
with GrabPay, pay in full next month (interest-free), or split a purchase into 4, 8 or
12 instalments (the 4-instalment plan is interest-free for VIP brands; other plans carry
1.5% per instalment from 1 June 2026).

For merchants, Grab charges a per-transaction fee, but it does not publish the merchant
rate for GrabPay or PayLater anywhere on its official Malaysian site. Businesses apply
via the merchant form, after which a Grab representative provides pricing, so both are
shown as "Contact sales". Grab does officially state that merchants are settled within
5 working days (T+5) with no risk involved.

Integration is merchant-friendly: Grab offers pre-built plugins for Shopify, WooCommerce,
Magento and EasyStore (Wix coming soon), payments partners, and a Direct API, and its
tokenisation supports repeat and subscription payments. Since August 2026 Grab has been
trialling PayLater payments at any DuitNow QR merchant for selected users.
