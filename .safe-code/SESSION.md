# SESSION — working memory

_2026-06-27_

## Carry Forward
- Live: https://mpg-1hw.pages.dev · auto-deploy on **push** to master (GitHub Actions → CF Pages). safe-code --save never pushes; AFU/agent pushes when going live.
- Pure **static** site. Astro 7 static + Clerk browser SDK (CDN) + Tailwind v4. Never `@clerk/astro` / `@astrojs/cloudflare`.
- **59 gateways**: gateway 40, bank 10, ewallet 1 (TNG), bnpl 7, infrastructure 1 (PayNet). Categories in `content.config.ts`; access label derived in `src/lib/access.ts`.
- **Ranking (spec 07, live 2026-06-27):** default sort = **lowest estimated fee**, gated. `src/lib/fees.ts` = single source of fee math (`parseFeeShape`/`effectiveCost`/`gatewayCost`, weighted FPX/card/e-wallet 50/30/20 on RM100). Only gateways with comparable published rates are ranked (18/59); the rest show **"On request"** below. Table has an **Est. fee / RM100** column (beside Fixed fee). Dropdown: Lowest fees · Popularity · Lowest FPX/card/e-wallet · Name. Don't regress to a single-number fee proxy or popularity-first default (see MEMORY.md + safe-refactor-code.md).
- **popularity** is editorial (a sort option + On-request tiebreaker); all 59 carry an explicit value (only PayNet=0). Corrected 2026-06-27 from a researched audit — estimates, retune freely.
- Theme = **Jalur Gemilang on dark**. **No em-dashes in prose** (house style); standalone `"—"` fee placeholder is data.
- Fees: official = no marker; third-party/indicative = trailing ` *` (excluded from the ranking); else `Contact sales`. Never fabricate.
- Logos: 59 real, 0 monograms. Square symbol-marks; `logo_round` for circular. In `src/assets/logos/<slug>.{svg,png,webp}`.
- **Don't use chrome-devtools to verify unless AFU asks.** Use build / astro check / npm test.
- Stray vite cache may reappear under a `src/` subdir (NTFS dev quirk) — `rm -rf`, gitignored + regenerates (see MEMORY.md).
- Payex REJECTED — it is now Xendit (already listed). Domain `malaysiapg.com.my`: MYNIC LoU ready, awaiting availability.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
