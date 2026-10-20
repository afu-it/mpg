---
name: SMAP Pay
website: https://smappay.com
logo: /logos/smap-pay.png
logo_round: true
tagline: "School fee collection gateway with flat RM1 FPX"
fees:
  fpx: "RM1.00"
  card: "—"
  ewallet: "—"
  duitnowqr: "—"
  setup: "RM0"
  monthly: "RM0"
settlement: "T+1 (incl weekends, before 10:30am)"
min_txn: "—"
channels: [fpx]
features:
  no_code: true
  api: true
  recurring: false
popularity: 28
webhooks: true
verified_date: "2026-10-20"
source: "https://blog.smap.my/smap-pay/"
notes: "Re-verified 2026-10-20. Official SMAP Pay guide (blog.smap.my/smap-pay): free registration, RM1 per successful FPX transaction (borne by the organisation or added to the payer), settlement next day INCLUDING weekends and public holidays, paid before 10:30am. SMAP Pay now also runs as a standalone gateway at smappay.com, operated by SMAP Pay Sdn Bhd (SSM 202501038016, Dengkil): FPX B2C and B2B, a REST API (createBill) with callback and redirect URLs, sandbox keys and hosted checkout. A prepaid wallet option charges RM1 per manual top-up. PayNet status: neither site states that SMAP Pay is a PayNet FPX acquirer, and its terms say it integrates with third-party payment processors and banks; acquirer status unverified. smappay.com does not publish a price list; the RM1 fee comes from the SMAP guide."
---

SMAP Pay is the payments half of SMAP, a Malaysian student-information system
used by sekolah, tadika, taska and tuisyen operators. Instead of integrating a
third-party gateway, SMAP Solutions built its own FPX gateway and prices it at a
flat RM1.00 per transaction with free gateway registration.

SMAP Pay has since been spun out as a standalone FPX gateway at smappay.com,
with B2C and B2B online banking, a simple REST API with callbacks and hosted
checkout. Settlement is next day including weekends and public holidays. It is
still FPX-only, so it fits schools, education operators and simple collections
better than full e-commerce, and it competes with Herepay and toyyibPay on
price.
