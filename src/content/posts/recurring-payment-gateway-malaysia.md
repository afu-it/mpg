---
title: "Recurring payment gateways in Malaysia compared (2026)"
description: "Seven Malaysian payment gateways with recurring billing compared: card rates, subscription add-ons, setup fees and settlement, from official rate cards."
pubDate: "2026-10-20"
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
  - label: "Curlec official pricing"
    url: "https://curlec.com/pricing/"
  - label: "Stripe Malaysia official pricing"
    url: "https://stripe.com/en-my/pricing"
  - label: "Bayarcash official site"
    url: "https://bayarcash.com"
faq:
  - q: "Which payment gateway in Malaysia supports recurring payments?"
    a: "Many do, including CHIP, HitPay, Xendit, senangPay, Curlec, Stripe and Bayarcash. The directory flags recurring support on every gateway profile, and the recurring gateways list ranks all of them by estimated cost on published rates."
  - q: "What is the cheapest recurring payment gateway in Malaysia?"
    a: "It depends on your plan price and whether the provider adds subscription fees. Compare the estimated cost per RM100 in the table, then add any add-on: Xendit charges MYR1.50 per active subscription per month and HitPay adds 0.2% on its software tools."
  - q: "Do toyyibPay and Billplz support recurring billing?"
    a: "Neither is marked as recurring-capable in this directory. Both are built mainly for FPX collection and payment links. Billplz lists recurring payments only on its custom-priced Enterprise plan, so ask its sales team if you need it."
  - q: "Can I take recurring payments by bank account instead of card?"
    a: "Yes, through direct debit. Bayarcash lists direct debit as a channel for auto-debit recurring payments, priced per transaction. Standard FPX cannot do this because the payer approves each payment."
---

Plenty of Malaysian gateways claim recurring billing, but they do it in very
different ways and at very different prices. Some bundle it free, some add a
monthly fee per subscriber, one bills by bank account instead of card. Here are
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

**Curlec.** The Malaysian arm of Razorpay, with subscriptions inherited from that
platform. A one-time setup fee applies and the exact amount is not published, so
confirm it with sales.

**Stripe.** Stripe Billing handles subscriptions and metered usage. The trade-off
is higher local rates and a T+7 payout.

**Bayarcash.** The odd one out: direct debit (auto-debit) from a bank account,
priced per transaction, alongside card payments. Its quoted rates exclude SST.

## How to choose

Start with your plan price. On a low monthly price, a fixed per-subscriber fee
like Xendit's weighs heavily; on a high one, the card percentage matters more.
Then decide who runs the billing cycle: a dashboard feature (HitPay, senangPay),
a subscription API (Stripe, Xendit, Curlec) or your own code on top of saved
tokens (CHIP). The
[recurring billing guide](/blog/recurring-billing-malaysia/) covers what each
setup asks of you.

What this table cannot show: gateways that are popular for FPX but do not charge
saved cards. toyyibPay and Billplz are not marked recurring-capable in the
directory (Billplz lists recurring payments only on its custom-priced Enterprise
plan), so they fit one-off collection better. The
[toyyibPay pricing guide](/blog/toyyibpay-pricing-explained/) covers that side.

For two head-to-heads, see [CHIP vs Xendit](/vs/chip-vs-xendit/) and
[Curlec vs Stripe](/vs/curlec-vs-stripe-malaysia/). For every recurring-capable
provider ranked by cost, use the
[recurring gateways list](/best/payment-gateway-recurring/), or answer four
questions in [Help me choose](/choose/).
