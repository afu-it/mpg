# SESSION — working memory

_2026-06-26_

## Carry Forward
- Live: https://mpg-1hw.pages.dev · auto-deploy on **push** to master (GitHub Actions → CF Pages).
- Pure **static** site. Astro 7 static + Clerk browser SDK (CDN) + Tailwind v4. Never `@clerk/astro` / `@astrojs/cloudflare`.
- Theme = **Jalur Gemilang on dark**: blue primary buttons, accent `#4f86f5`, brand-blue/red/yellow tokens, surface `#0a0a0a`, panel `#141416`. FPX `#6f83cc` + DuitNow `#e61f65` labels. See `context/ui-context.md`.
- **No em-dashes in prose** (house style). Standalone `"—"` fee placeholder is data, stays.
- **Don't use chrome-devtools to verify unless AFU asks.** Use build / astro check / npm test.
- Fees: official = no marker; third-party/indicative = trailing ` *`; else `Contact sales`. Never fabricate.
- Stray vite cache may reappear under a `src/` subdir (NTFS dev quirk) — `rm -rf`, it's gitignored + regenerates (see MEMORY.md).
- Domain `malaysiapg.com.my`: MYNIC Letter of Undertaking filled + ready in ~/Downloads; AFU waiting for the name to become available.

## Task List
- (none active — session saved)

## Draft updates
- (none pending)
