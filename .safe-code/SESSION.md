# SESSION — working memory

_2026-06-26_

## Carry Forward
- Live: https://mpg-1hw.pages.dev · auto-deploy on **push** to master (GitHub Actions → CF Pages).
- Pure **static** site. Astro 7 static + Clerk browser SDK (CDN) + Tailwind v4. Never `@clerk/astro` / `@astrojs/cloudflare`.
- **59 gateways** across categories: gateway 40, bank 10, ewallet 1 (TNG), bnpl 7, infrastructure 1 (PayNet).
- Categories: gateway/bank/ewallet/bnpl/infrastructure (`content.config.ts`). Access label derived in `src/lib/access.ts` (gateway/bnpl=Integrate, bank/ewallet=Merchant account). /learn "Which type" block deep-links via `?category=`.
- Theme = **Jalur Gemilang on dark** (see `context/ui-context.md`). **No em-dashes in prose** (house style); standalone `"—"` fee placeholder is data.
- Fees: official = no marker; third-party/indicative = trailing ` *`; else `Contact sales`. Never fabricate.
- Logos: 59 real, 0 monograms. Square symbol-marks; `logo_round` for circular; dark-on-transparent recoloured (not white-plated). In `src/assets/logos/<slug>.{svg,png,webp}`.
- **Don't use chrome-devtools to verify unless AFU asks.** Use build / astro check / npm test.
- Stray vite cache may reappear under a `src/` subdir (NTFS dev quirk) — `rm -rf`, gitignored + regenerates (see MEMORY.md).
- Domain `malaysiapg.com.my`: MYNIC Letter of Undertaking ready; awaiting availability.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
