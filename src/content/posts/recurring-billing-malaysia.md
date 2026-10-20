---
title: "Recurring billing in Malaysia: how auto-charging works"
description: "How recurring billing works for Malaysian merchants: subscription APIs vs scheduling your own charges, failed payments, retries and what each setup costs you."
pubDate: "2026-10-20"
cluster: "recurring-payments"
tags: ["recurring", "subscription", "billing", "how-to"]
gateways:
  - hitpay
  - xendit
  - stripe-malaysia
sources:
  - label: "HitPay Malaysia official pricing"
    url: "https://www.hitpayapp.com/my/pricing"
  - label: "Xendit Malaysia official pricing"
    url: "https://www.xendit.co/en-my/pricing/"
  - label: "Stripe Malaysia official pricing"
    url: "https://stripe.com/en-my/pricing"
faq:
  - q: "Do I need to code to set up recurring billing?"
    a: "Not always. Some gateways bundle recurring billing into the dashboard, so you can set up a plan and share a sign-up link without code. Others give you a subscription API or a plain charge API, and your developer handles the schedule, retries and cancellations."
  - q: "Does recurring billing cost more than one-off payments?"
    a: "It can. Some providers add a charge on top of the normal card rate for subscription features. Xendit lists MYR1.50 per active subscription per month, and HitPay adds a 0.2% surcharge when you use its software tools, recurring billing included. Check the add-ons, not just the headline rate."
  - q: "What happens when a recurring card charge fails?"
    a: "The charge is declined and the customer is not billed. A good setup retries on a schedule, emails the customer to update their card, and pauses or cancels the plan after a set number of failures. Subscription APIs usually handle this; with a bare charge API you build it yourself."
  - q: "Which settlement speed matters for subscriptions?"
    a: "Settlement is how long the gateway holds your money before paying it out. On subscriptions the gap repeats every cycle, so a T+7 provider holds a week of revenue at all times. Compare settlement alongside fees."
---

Recurring billing is the machinery behind a recurring payment: who stores the
customer's payment method, who decides when to charge it, and what happens when
the charge fails. Malaysian gateways split into three setups, and the one you
pick decides how much work you do and how much you pay.

## Three ways to run recurring billing

**1. Built-in recurring billing (no code).** The gateway's dashboard lets you
create a plan and share a sign-up link. The gateway stores the card, runs the
schedule and sends receipts. HitPay works this way, with recurring billing
bundled into the same account as checkout, invoicing and POS.

**2. A subscription API.** You create customers and plans through the API and
the gateway runs the billing cycle for you. Stripe Billing is the
best-known example: it handles subscriptions and metered usage. Xendit and
Curlec also offer subscription products.

**3. A charge API plus saved tokens.** The gateway stores a
[card token](/learn/glossary/tokenisation/), and your own system decides when to
charge it. You get full control and full responsibility: scheduling, retries and
dunning emails are your code.

Most SMEs are best served by option 1 or 2. Option 3 is for teams that already
run their own billing logic.

## The part that breaks: failed charges

Cards expire, get replaced after fraud, or hit their limit. A recurring setup
that only handles the happy path will quietly lose customers. The essentials, as
covered in the [recurring payments glossary entry](/learn/glossary/recurring-payments/):

- **Retries** on a schedule, not just one attempt.
- **Card-update flows** so the customer can fix an expired card in a click.
- **Clear cancellation** so a customer who leaves is not charged again.
- **[Webhooks](/learn/glossary/webhook/)** so your system knows when a charge
  succeeds or fails and can grant or pause access.

Subscription APIs usually cover the first three. With a bare charge API, budget
developer time for all four.

## What recurring billing costs

Your per-charge cost is normally the gateway's card rate, but watch for
subscription add-ons. Xendit charges MYR1.50 per active subscription per month
on top of the card rate. HitPay adds 0.2% when you use its software tools,
recurring billing among them. Stripe has no setup or monthly fee, but its
Malaysian card rate is on the higher side and payouts run T+7.

The live table below compares these three from the verified dataset. Run your
own monthly plan price through the [fee calculator](/calculator/), then see
every option ranked on the
[recurring gateways list](/best/payment-gateway-recurring/) or, if you are
building software, the [SaaS gateways list](/best/payment-gateway-saas/). For a
wider side-by-side, read
[recurring payment gateways in Malaysia compared](/blog/recurring-payment-gateway-malaysia/).
