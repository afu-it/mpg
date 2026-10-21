---
name: PayPal
website: https://www.paypal.com/my/business
tagline: "Global PayPal checkout for selling to overseas buyers"
fees:
  fpx: "—"
  card: "3.9% + RM2.00"
  card_intl: "4.4% + RM2.00"
  ewallet: "—"
  duitnowqr: "—"
  setup: "RM0"
  monthly: "RM0"
settlement: "Contact sales"
min_txn: "—"
channels: [card]
features:
  no_code: true
  api: true
  recurring: true
mcp: "official"
webhooks: true
dev_docs: "https://developer.paypal.com/api/rest/"
popularity: 40
verified_date: "2026-10-21"
source: "https://www.paypal.com/my/business/paypal-business-fees"
bnm:
  roles: [emoney-issuer]
  entity: "PayPal Pte Ltd"
  checked: "2026-10-21"
  evidence: "https://www.paypal.com/my/legalhub/paypal/useragreement-full"
notes: "Verified 2026-10-21 on https://www.paypal.com/my/business/paypal-business-fees (page last updated 28 September 2026). Standard commercial transaction rate for a Malaysia-registered seller: domestic (buyer in MY or SG) 3.90% + fixed fee; international 4.40% + fixed fee. Fixed fee is RM2.00 when the payment is received in MYR. These rates cover PayPal checkout payments (PayPal balance or a card funding the PayPal payment); PayPal's separate Online Card Payment Services card rates are listed for Singapore only, not Malaysia. A lower merchant rate is available on application based on monthly volume. Currency conversion: 2.5% above the base rate when converting balances or payments received (Malaysia), 4.00% on sending payments or refunds after 1 day. Withdrawal to a Malaysian bank: free above RM400 (no conversion), RM3.00 below RM400. Chargeback fee RM40.00. Micropayments (pre-approval): 5.50% domestic / 6.00% international + RM0.20. FPX, local e-wallets and DuitNow QR are not listed. Money lands in your PayPal balance and is withdrawn to a bank; bank payout timing is not published on the fee page. No setup or monthly fee listed. PayPal Pte Ltd is on Bank Negara Malaysia's list of licensed non-bank e-money issuers."
no_ssm:
  detail: "A PayPal Personal account can receive payments as a casual seller; a Business account asks for business registration."
  detail_ms: "Akaun PayPal Personal boleh terima bayaran sebagai penjual kecil-kecilan; akaun Business minta pendaftaran perniagaan."
  quote: "Personal: Recommended for individuals who shop and pay online, or who wish to send or receive personal payments for shared expenses like dinner bills or rental charges; for casual sellers or non-businesses who wish to get paid online, and who also make online purchases."
  source: https://www.paypal.com/my/business/open-business-account
  checked: "2026-10-21"
---

PayPal is the global online wallet and checkout, used by Malaysian sellers, freelancers
and exporters who want to be paid by overseas buyers who already have a PayPal account.
It offers PayPal Checkout, no-code payment links and buttons, invoicing and recurring
payments, plus REST APIs with webhooks.

Pricing for a Malaysian business account is a flat commercial rate: **3.90% + RM2.00**
for domestic payments (buyer in Malaysia or Singapore) and **4.40% + RM2.00** for
international payments. Converting a received foreign-currency payment costs 2.5% above
the base exchange rate. There is no setup or monthly fee.

PayPal does not offer FPX, local e-wallets or DuitNow QR, so it is rarely the right
choice for selling to Malaysian customers. Funds arrive in your PayPal balance; withdrawing
to a Malaysian bank is free above RM400 and RM3.00 below that. Best as an add-on for
cross-border sales, not as your main local gateway.
