# LOG — safe diary (append above)

## 2026-06-24 · type: feat
Phase 2 (save favourites) code-complete: Cloudflare Pages Functions (`/functions/api/favourites`, `/compares`) + D1 schema, Clerk session verified server-side via `@clerk/backend`; client ♥ toggle on table/detail, `/favourites` page, save-comparison on `/compare`. Functions 503 until D1+secret provisioned, so the deploy stays safe. Scoped `functions/tsconfig.json` (Workers types) away from the Astro/DOM root tsconfig. Verified: astro check 0 errors, functions tsc clean, build 39 pages, vitest 11/11. Live activation still needs owner CF account steps (d1 create, run schema.sql, set DB binding + CLERK_SECRET_KEY).
plain: Built the "save your favourite gateways" feature end-to-end. It's ready in code; going live just needs three setup clicks in the Cloudflare account.

## 2026-06-24 · type: feat
Built MPG from scratch: 34 MY payment gateways (sourced fees) → landing + /gateways (sort/filter/search) + /compare + detail + 404; GitHub Actions auto-deploy to Cloudflare Pages; client-side Clerk auth (CDN, dark-themed, WCAG contrast).
plain: Built the whole payment-gateway comparison website, put it online, and added login.

## 2026-06-24 · type: decision
Astro 7 incompatible with @clerk/astro + @astrojs/cloudflare → use Clerk browser SDK via CDN, keep site fully static. Removed defunct Split & Pace BNPL.
plain: Chose a login method that works with our setup; dropped two payment options that had shut down.

## 2026-06-24 · type: chore
Removed unused @clerk/clerk-js dependency (auth loads from CDN). Wired Clerk publishable key into the deploy build. Initialized safe-code project brain.
plain: Tidied an unused package, made login work on the live site, and saved project notes for next time.
