# LOG — safe diary (append above)

## 2026-06-24 · type: feat
Built MPG from scratch: 34 MY payment gateways (sourced fees) → landing + /gateways (sort/filter/search) + /compare + detail + 404; GitHub Actions auto-deploy to Cloudflare Pages; client-side Clerk auth (CDN, dark-themed, WCAG contrast).
plain: Built the whole payment-gateway comparison website, put it online, and added login.

## 2026-06-24 · type: decision
Astro 7 incompatible with @clerk/astro + @astrojs/cloudflare → use Clerk browser SDK via CDN, keep site fully static. Removed defunct Split & Pace BNPL.
plain: Chose a login method that works with our setup; dropped two payment options that had shut down.

## 2026-06-24 · type: chore
Removed unused @clerk/clerk-js dependency (auth loads from CDN). Wired Clerk publishable key into the deploy build. Initialized safe-code project brain.
plain: Tidied an unused package, made login work on the live site, and saved project notes for next time.
