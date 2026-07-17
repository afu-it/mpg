---
status: done   # built 2026-07-17 at AFU's direct request, same sitting
created: 2026-07-17
---
# Business-type profiles (/best/ by who-you-are)

## Goal
AFU: recommend gateways by BUSINESS TYPE, not just capability — physical
(kedai/restoran) vs digital (ebook/servis/SaaS).

## What shipped
Three new ProfileDef entries over the existing recommend() engine (spec 10
machinery, zero new page code):
- /best/payment-gateway-physical-store/ — needs duitnowqr+ewallet+noCode;
  intro points at terminal-first providers + banks' zero-MDR QR tiers.
- /best/payment-gateway-digital-products/ — needs noCode+fpx; ebook/course/
  services framing, flat-fee emphasis (Herepay ranks #1).
- /best/payment-gateway-saas/ — needs recurring+developer.
Chips auto-appear on /learn hub (PROFILE_CHIP labels added). Sitemap automatic.
SERP windows enforced by the existing seo-pages vitest.

## Notes
- Digital-products shares its ranked list shape with online-store/no-code by
  design; copy is de-cannibalised (different H1/title/intro/FAQ noun).
- BM versions belong to spec 15 slice F territory if wanted later.
