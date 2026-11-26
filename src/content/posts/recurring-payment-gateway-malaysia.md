---
title: "Recurring payment gateways in Malaysia compared (2026)"
description: "Seven Malaysian payment gateways with recurring billing compared: card rates, subscription add-ons, setup fees and settlement, from official rate cards."
pubDate: "2026-10-20"
updatedDate: "2026-11-26"
cluster: "recurring-payments"
tags: ["recurring", "subscription", "comparison"]
gateways:
  - chip
  - hitpay
  - xendit
  - senangpay
  - curlec
  - stripe-malaysia
  - bayarcash
sources:
  - label: "CHIP Collect official page"
    url: "https://www.chip-in.asia/collect"
  - label: "HitPay Malaysia official pricing"
    url: "https://www.hitpayapp.com/my/pricing"
  - label: "Xendit Malaysia official pricing"
    url: "https://www.xendit.co/en-my/pricing/"
  - label: "senangPay official pricing"
    url: "https://senangpay.com/pricing/"
  - label: "Billplz official pricing"
    url: "https://main.billplz.com/pricing"
  - label: "Razorpay Curlec official pricing"
    url: "https://curlec.com/pricing/"
  - label: "Stripe Malaysia official pricing"
    url: "https://stripe.com/en-my/pricing"
  - label: "Bayarcash official site"
    url: "https://bayarcash.com"
faq:
  - q: "Which payment gateway in Malaysia supports recurring payments?"
    a: "Many do, including CHIP, HitPay, Xendit, senangPay, Razorpay Curlec, Stripe and Bayarcash. The directory flags recurring support on every gateway profile, and the recurring gateways list ranks all of them by estimated cost on published rates."
  - q: "What is the cheapest recurring payment gateway in Malaysia?"
    a: "It depends on the recurring-payment method, transaction amount and any subscription charges. The table blends ordinary FPX, card and e-wallet fees, so it is not a recurring-payment quote. Compare the applicable card or Direct Debit rate and add-ons: Xendit charges MYR1.50 per active subscription per month and HitPay adds 0.2% on its software tools."
  - q: "Do toyyibPay and Billplz support recurring billing?"
    a: "Billplz publishes Card Auto-Deduct pricing under Basic and Standard, subject to a separate application; it is not limited to Enterprise. This directory does not mark toyyibPay as recurring-capable. Confirm each product and its terms with the provider."
  - q: "Can I take recurring payments by bank account instead of card?"
    a: "Yes, through direct debit. Razorpay Curlec lists Direct Debit under Subscriptions, with pricing available from sales. Bayarcash also lists direct debit, priced per transaction. Standard FPX requires the payer to approve each payment and is not an automatic recurring debit."
---

Plenty of Malaysian gateways claim recurring billing, but they do it in very
different ways and at very different prices. Some bundle it free, some add a
monthly fee per subscriber, and some support bank-account direct debit. Here are
seven worth shortlisting, with live rates in the table below.

## The seven, by how they do recurring

**CHIP.** Recurring charges via saved card tokens, plus payment links and a
developer API. No setup or monthly fee. A fit if you are happy to drive charges
from your own system.

**HitPay.** Recurring billing is built into the dashboard, alongside checkout,
invoicing, store and POS, with no setup or monthly fee. Note the 0.2% surcharge
on its software tools, recurring billing included.

**Xendit.** Subscriptions are a dedicated product, charged at MYR1.50 per active
subscription per month on top of the card rate. Strong payout tooling and
multi-country reach make it a fit for scaling businesses.

**senangPay.** SME gateway with built-in recurring billing and card
tokenisation. It carries an annual subscription, starting from around RM199 a
year, and a RM100 minimum settlement amount.

**Razorpay Curlec.** Supports subscriptions through cards and Direct Debit.
Its Subscriptions pricing tab lists standard domestic/international card pricing
per transaction, while Direct Debit pricing requires a quote. The separate
payment gateway plans publish RM0 setup for Basic and RM999 for Premium, with
no annual fee for either; these setup prices are not a Direct Debit quote.

**Stripe.** Stripe Billing handles subscriptions and metered usage. The trade-off
is higher local rates and a T+7 payout.

**Bayarcash.** Offers direct debit (auto-debit) from a bank account,
priced per transaction, alongside card payments. Its quoted rates exclude SST.

## How to choose

Start with your plan price. On a low monthly price, a fixed per-subscriber fee
like Xendit's weighs heavily; on a high one, the card percentage matters more.
Then decide who runs the billing cycle: a dashboard feature (HitPay, senangPay),
a subscription API (Stripe, Xendit, Razorpay Curlec) or your own code on top of saved
tokens (CHIP). The
[recurring billing guide](/blog/recurring-billing-malaysia/) covers what each
setup asks of you.

The table's RM100 estimate blends FPX, card and e-wallet fees; it is not a
subscription or Direct Debit quote. Compare the relevant recurring-payment
method and any additional charges for your use case.

Billplz also publishes Card Auto-Deduct pricing under Basic and Standard,
subject to a separate application. It is not limited to Enterprise. toyyibPay
is not marked recurring-capable in this directory; the
[toyyibPay pricing guide](/blog/toyyibpay-pricing-explained/) covers its pricing.

For two head-to-heads, see [CHIP vs Xendit](/vs/chip-vs-xendit/) and
[Razorpay Curlec vs Stripe](/vs/curlec-vs-stripe-malaysia/). For every recurring-capable
provider ranked by cost, use the
[recurring gateways list](/best/payment-gateway-recurring/), or answer four
questions in [Help me choose](/choose/).
