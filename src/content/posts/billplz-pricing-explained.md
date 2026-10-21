---
title: "Billplz pricing 2026: FPX, card and e-wallet fees explained"
description: "Billplz pricing in Malaysia, checked October 2026: RM1.25 FPX on the free Basic plan, RM0.75 on Standard (RM999/yr), 1.8% cards and 1.5% e-wallets."
pubDate: "2026-07-17"
updatedDate: "2026-10-21"
cluster: "fees-pricing"
image: "/blog/billplz-pricing-fees-malaysia.webp"
imageAlt: "Billplz fee card on MPG showing FPX, card and e-wallet rates"
tags: ["billplz", "fpx", "pricing"]
gateways:
  - billplz
sources:
  - label: "Billplz official pricing page"
    url: "https://main.billplz.com/pricing"
faq:
  - q: "How much does Billplz charge for FPX?"
    a: "On the free Basic plan, RM1.25 per B2C FPX transaction and RM3.00 per B2B (corporate banking) transaction. The paid Standard plan (RM999 a year) lowers that to RM0.75 B2C and RM2.00 B2B. It is a flat fee, not a percentage, so it does not grow with the sale."
  - q: "Does Billplz have a setup or monthly fee?"
    a: "No. The Basic plan has no setup fee and no monthly fee; you only pay per transaction. Standard is an optional RM999 yearly membership that lowers FPX to RM0.75 and local cards to 1.5%. Enterprise pricing is on request."
  - q: "How fast does Billplz pay out?"
    a: "FPX collections settle the next business day, and Billplz markets the payout as guaranteed. E-wallet payouts also arrive the next day, while card payments take T+2. The Enterprise plan advertises real-time payouts."
  - q: "Is Billplz cheaper than toyyibPay?"
    a: "For FPX on the free plans, toyyibPay's flat RM1.00 undercuts Billplz's RM1.25. Billplz Standard (RM0.75 per B2C transaction) flips that, but the RM999 yearly fee only pays for itself on FPX at about 2,000 B2C FPX sales a year (roughly 170 a month). Compare both against your real volume before deciding."
  - q: "Does Billplz support recurring billing?"
    a: "Yes, through Card Auto-Deduct, which needs a separate application. It costs 2.3% + RM1.25 per MYR card charge on Basic (4.2% + RM1.25 non-MYR), or 2% + RM0.75 on Standard. That is pricier than a one-off card payment, so price your subscription with it in mind."
---

Billplz is one of the names Malaysian SMEs reach for first, and its pricing is
genuinely simple: a flat ringgit fee for FPX, a percentage for everything else,
and nothing upfront. Here is the whole structure, and where it does and does not
make sense.

## How Billplz pricing works

Billplz runs three plans. **Basic is free**: no setup fee, no monthly fee, you
pay per transaction only. **Standard** is a paid membership at RM999 a year that
lowers your FPX and card rates. **Enterprise** is priced on request.

The rates that matter, from the official pricing page (Basic, then Standard):

- **FPX (B2C)**: RM1.25 flat per transaction on Basic, RM0.75 on Standard.
- **FPX (B2B)**: RM3.00 on Basic, RM2.00 on Standard. B2B means the payer uses a
  corporate banking account, and most stores never see these.
- **Local cards (MYR)**: 1.8% on Basic, 1.5% on Standard.
- **Non-MYR cards**: 3.8% on Basic, 3.5% on Standard, with payout at T+2.
- **E-wallets and DuitNow QR** (Touch 'n Go, Boost, GrabPay): 1.5% on both plans.
- **Card Auto-Deduct** (recurring card charges): 2.3% + RM1.25 on Basic, 2% +
  RM0.75 on Standard.
- **BNPL** (Atome, 3-month plan): 6%.

The flat FPX fee is the headline. A percentage-based gateway gets more expensive
as your ticket grows; RM1.25 on a RM500 invoice is 0.25%. On small tickets the
logic flips: RM1.25 on a RM15 sale is over 8%, and a percentage-based rival wins.
You can test your own ticket size in the [fee calculator](/calculator/), or see
who is cheapest at each sale size on the
[cheapest payment gateway](/best/cheapest-payment-gateway-malaysia/) page.

## Is the Standard plan worth RM999?

On FPX alone, Standard saves RM0.50 per B2C transaction, so the yearly fee pays
for itself at about 2,000 B2C FPX sales a year, roughly 170 a month. Card-heavy
stores reach that point sooner, because Standard also takes 0.3 percentage points
off every local card payment. Below that volume, stay on Basic.

## When the flat rate wins

Billplz suits invoice-style collection with meaningful ticket sizes: tuition
fees, club memberships, agency invoices, event registrations. That is also why
its tooling leans toward bills and payment links rather than storefront
checkouts, with plugins for WooCommerce, Shopify, OpenCart, Magento, PrestaShop
and WHMCS when you do run a store. If you sell on Shopify, note that Billplz
lists a 0.3% add-on for Shopify payments; the
[Shopify gateway guide](/learn/shopify-payment-gateways-malaysia/) compares the
alternatives.

Two honest caveats. First, recurring billing exists but costs more: Card
Auto-Deduct needs its own application and adds a flat fee on top of the
percentage, so subscription businesses should also compare the
[recurring-capable gateways](/best/payment-gateway-recurring/). Second, the
BNPL rate is on the high side; if instalments matter to you, compare the
[BNPL providers](/best/bnpl-malaysia/) directly.

## Settlement and the fine print

FPX money lands the next business day, and Billplz markets that payout as
guaranteed. E-wallet payouts also arrive the next day, and cards take T+2. There
is no minimum transaction amount.

The numbers in the box above render from the same verified dataset as the whole
[directory](/gateways/), so if Billplz changes its rate card, this page changes
with it. For the side-by-side view, see
[Billplz vs toyyibPay](/vs/billplz-vs-toyyibpay/) or the full
[Billplz profile](/gateway/billplz/).
