---
title: "How payment gateway fees work in Malaysia (2026 guide)"
description: "MDR percentages, flat FPX fees, setup charges and settlement: how Malaysian payment gateway pricing is structured and how to compare providers fairly."
pubDate: "2026-07-17"
cluster: "fees-pricing"
image: "/blog/malaysia-payment-gateway-fees-comparison-table.webp"
imageAlt: "Malaysian payment gateway comparison table ranked by estimated fee per RM100"
tags: ["mdr", "fees", "fpx", "guide"]
gateways:
  - toyyibpay
  - billplz
  - hitpay
  - stripe-malaysia
sources:
  - label: "toyyibPay official pricing plans"
    url: "https://www.toyyibpay.com/pricing-plans/"
  - label: "Billplz official pricing page"
    url: "https://main.billplz.com/pricing"
  - label: "HitPay Malaysia official pricing"
    url: "https://www.hitpayapp.com/my/pricing"
  - label: "Stripe Malaysia official pricing"
    url: "https://stripe.com/en-my/pricing"
faq:
  - q: "What is MDR in payment gateway pricing?"
    a: "MDR (merchant discount rate) is the percentage a gateway deducts from each sale. A 1.5% MDR on a RM200 order costs RM3. Some channels use a flat ringgit fee instead of a percentage, and some combine both."
  - q: "What is the cheapest payment channel in Malaysia?"
    a: "Usually FPX via a flat-fee gateway on mid-size tickets, or DuitNow QR (typically around 1% to 1.5%) on small ones. Cards cost the most, commonly 1.2% to 3% locally."
  - q: "Why do gateways show 'Contact sales' instead of a price?"
    a: "Many acquirer-style providers negotiate MDR per merchant based on volume and risk. This directory never guesses those numbers: unpublished rates are labelled Contact sales, and only published official rates are ranked."
  - q: "Are payment gateway fees negotiable?"
    a: "Published SME rates are usually fixed, but volume merchants can often negotiate, especially with acquirer-backed providers. Always confirm the current rate card with the provider before committing."
---

Comparing Malaysian payment gateways looks simple until you notice one charges
"RM1.00 flat", another "1.5%", a third "1.2% + RM1.00", and a fourth will not
tell you without a sales call. This guide explains every fee shape you will
meet and a fair way to compare them.

## The four fee shapes

**Percentage (MDR).** The merchant discount rate is a cut of each sale: 1.5%
on RM200 is RM3. Cards and e-wallets are almost always priced this way. What a
[card rate really costs](/learn/glossary/mdr/) scales with your ticket size.

**Flat fee.** A fixed ringgit amount per transaction, common for
[FPX](/learn/glossary/fpx/): RM1.00 at toyyibPay, RM1.25 at Billplz. Flat fees
get cheaper (in percentage terms) as tickets grow and brutal as tickets shrink.

**Percent plus fixed.** Both at once, like HitPay's 1.2% + RM1.00 cards or
Stripe's 3% + RM1.00. The fixed part dominates small tickets; the percentage
dominates big ones.

**Setup and recurring platform fees.** Most SME gateways charge RM0 upfront,
but exceptions exist (toyyibPay's card onboarding is RM100, some acquirers
charge annual fees). A "free" gateway with a higher MDR can cost more than a
paid one within months.

## Channels are priced differently

The same gateway charges differently per channel, and the spread is wide:

- **FPX**: the workhorse. Flat RM1.00 to RM1.25 at the cheapest providers,
  percentage-based (1.8% or more) elsewhere.
- **Cards**: the expensive lane, roughly 1.2% to 3% for local cards, more for
  international.
- **E-wallets**: typically 1.5% to 2.2%, sometimes priced per wallet.
- **DuitNow QR**: usually the cheapest percentage channel, around 1% to 1.5%.
- **BNPL**: the priciest, commonly 2% to 6.5%, because the provider carries
  instalment risk.

## How to compare fairly: one basket, one number

Headline rates mislead because they hide the shapes above. The method this
site uses (and publishes) is a **blended cost on a RM100 basket**, weighted
50% FPX, 30% card, 20% e-wallet, using each gateway's published official
rates. That single number is the "Est. fee / RM100" column in the
[directory](/gateways/) and the ranking behind the
[cheapest-gateway list](/best/cheapest-payment-gateway-malaysia/).

The table below shows four popular gateways side by side, rendered live from
the verified dataset. Two things to remember when reading it: providers that
publish nothing are ranked nowhere (we never guess), and settlement speed is a
real cost too; T+1 versus T+7 is a week of cash flow. Test your own numbers in
the [fee calculator](/calculator/) or answer four questions in
[Help me choose](/choose/).
