# AGENTS.md — MPG (Malaysia Payment Gateway)

> Single source of truth for AI agents. Read these first, in order.

## Read First
1. `AGENTS.md` (this file)
2. `.safe-code/context/project-overview.md`
3. `.safe-code/context/architecture.md`
4. `.safe-code/context/code-standards.md`
5. `.safe-code/context/progress-tracker.md`
6. `.safe-code/ACTIVE.md` (resume point, if present)

## What this is
A minimalist, dark-mode website comparing Malaysian payment gateways — fees
(FPX, card, e-wallet, DuitNow QR, BNPL), settlement and features — styled after
openrouter.ai/models. Static Astro site on Cloudflare Pages.

## Commands
- Dev: `CHOKIDAR_USEPOLLING=true npm run dev -- --port 4321` (polling required on the NTFS mount). `astro dev` daemonizes — manage with `astro dev stop` / `status` / `logs`; kill stray daemons with `pkill -f "astro dev"`.
- Build: `npm run build` · Preview: `npm run preview`
- Test: `npm test` (Vitest — fee parsing) · Type/content check: `npx astro check`
- Deploy: push `master` → GitHub Actions → `wrangler pages deploy dist`

## Hard rules
- **Fees are sourced.** Every gateway carries `source` + `verified_date`. Never fabricate a fee — use `"Contact sales"` (negotiated/unpublished) or `"—"` (not offered).
- **Content pages stay static.** Auth is client-side via `@clerk/clerk-js` (CDN hotload), NOT `@clerk/astro`.
- **Secrets live in `.env`** (gitignored). Never commit keys. Clerk keys are currently `pk_test`/`sk_test`.
- **Add a gateway = one `.md`** in `src/content/gateways/` (Zod-validated). No code change needed.
- Do NOT add `@astrojs/cloudflare` or `@clerk/astro` while on Astro 7 (both break — see architecture.md).
- After changing a client script (`src/scripts/*.ts`), **hard-refresh** the browser; HMR for inline scripts lags on the NTFS mount.
