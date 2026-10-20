---
title: "What is a recurring payment? Meaning and examples in Malaysia"
description: "Recurring payment meaning, explained for Malaysian merchants: how automatic repeat charges work, card tokens vs direct debit, and when your business needs it."
pubDate: "2026-10-20"
cluster: "recurring-payments"
tags: ["recurring", "subscription", "definition", "guide"]
gateways:
  - chip
  - senangpay
  - bayarcash
sources:
  - label: "CHIP Collect official page"
    url: "https://www.chip-in.asia/collect"
  - label: "senangPay official pricing"
    url: "https://senangpay.com/pricing/"
  - label: "Bayarcash official site"
    url: "https://bayarcash.com"
faq:
  - q: "What does recurring payment mean?"
    a: "A recurring payment is a charge that repeats on a schedule, such as monthly or yearly, after the customer agrees once. The merchant's gateway collects each payment automatically, so the customer does not have to pay manually every cycle."
  - q: "Is a recurring payment the same as a subscription?"
    a: "Nearly. A subscription is the business model (an ongoing plan the customer signs up for), and recurring payments are how you collect for it. Instalment plans and membership dues also use recurring payments without being called subscriptions."
  - q: "Can FPX be used for recurring payments?"
    a: "Not by itself. Standard FPX asks the payer to log in and approve every single payment, so it suits one-off checkouts and payment links. For automatic repeat charges, Malaysian gateways use saved card tokens or a direct debit mandate instead."
  - q: "How do I know if a gateway supports recurring payments?"
    a: "Check the Recurring billing flag on its profile in this directory, or filter the ranked list of recurring-capable gateways. Then confirm the exact mechanism (card tokens, subscription API or direct debit) with the provider before you build on it."
---

A recurring payment is a charge that repeats on a schedule after the customer
agrees to it once. Your gym membership, a monthly software plan, a yearly domain
renewal: the customer signs up, and from then on the payment is collected for
them every cycle. In Malay you will often see it described as *bayaran
berulang* or auto-debit.

## How a recurring payment works

Three things have to exist for a payment to repeat without the customer:

1. **Consent, once.** The customer agrees to be charged a set amount (or a
   usage-based amount) on a set schedule.
2. **A stored way to pay.** The gateway keeps something it can charge later. For
   cards that is a token, a stand-in for the card number that is useless outside
   your gateway account. See [tokenisation](/learn/glossary/tokenisation/) for
   how that works.
3. **A schedule.** Either the gateway runs it for you (a subscription feature or
   API) or your own system triggers each charge.

When any of those is missing, you are back to sending a payment link every
month and hoping the customer clicks it.

## Card tokens vs direct debit

In Malaysia, recurring payments run on two main rails.

**Saved card tokens.** The customer pays once by card, the gateway stores a
token, and later charges go through without the customer present. CHIP, for
example, supports recurring charges via saved tokens, and senangPay advertises
built-in recurring billing with card tokenisation.

**Direct debit from a bank account.** The customer authorises a mandate and the
amount is pulled from their bank account each cycle. Bayarcash lists direct
debit (auto-debit for recurring) as a channel, priced per transaction.

Standard [FPX](/learn/glossary/fpx/) is not a recurring rail. It redirects the
payer to their bank to approve each payment, which is great for one-off checkout
and useless for charging someone while they sleep.

## When your business needs it

You need recurring payments if revenue arrives on a cycle: memberships,
tuition, SaaS plans, subscription boxes, maintenance retainers, donations
pledged monthly. If your customers pay once per order, you do not, and a
cheaper flat-fee FPX gateway may suit you better.

The catch is that recurring support narrows your choice of gateway. Some of the
most popular low-cost FPX gateways in Malaysia are built for one-off collection
and do not charge saved cards. Before you pick, filter for it: the
[recurring-capable gateways](/best/payment-gateway-recurring/) list ranks only
providers that support it, by estimated cost on published rates. The live table
below shows three examples with different approaches. For the full mechanics,
including failed charges and retries, read
[how recurring billing works in Malaysia](/blog/recurring-billing-malaysia/).
