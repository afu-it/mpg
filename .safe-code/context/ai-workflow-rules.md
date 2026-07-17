# AI Workflow Rules — MPG

- Verify before claiming done: `npm test` + `npx astro check` + `npm run build` green. Prefer build/curl checks (screenshot tooling is broken in this environment).
- Keep content pages static; don't add SSR adapters or `@clerk/astro` (Astro 7 incompatibility).
- Data changes (gateways): edit `.md` files only; keep to the Zod schema; cite sources.
- Commit on user request; deploy = push master (triggers auto-deploy). `/safe-code --save` commits locally and never pushes.
- For client-script changes, remind to hard-refresh (NTFS HMR lag).
- Big new features → brainstorm/design first; small iterations → just do them (AFU dislikes ceremony for small work).

## Scraping rule (2026-07-17, from the AffanPay incident)
- NEVER truncate scraped page content before extracting facts. Save the full output, search all of it (pricing sections often sit low on homepages). A truncated read that concludes "not published" is a data bug.
