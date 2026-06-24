# MEMORY — temporary audit/architecture notes

_2026-06-24_

## Astro 7 ecosystem traps (June 2026)
- `@clerk/astro` peer-deps cap at Astro ≤6 → won't install/run on Astro 7.
- `@astrojs/cloudflare` dev (workerd) breaks on Astro 7 ("return statement…"); downgrading to Astro 6 hit Vite-7 + `@tailwindcss/vite` resolution hell.
- **Working combo:** Astro 7 static + `@clerk/clerk-js` via CDN hotload + Tailwind v4 (`@tailwindcss/vite`). No SSR adapter.
- Dev gotcha: `astro dev` daemonizes → stale daemons serve old code; use `CHOKIDAR_USEPOLLING=true` on the NTFS mount; hard-refresh after client-script edits.

## Phase 2/3 backend (planned)
- Cloudflare **Pages Functions** (`/functions/api/*`) + **D1**, kept separate from the static Astro build. Verify Clerk sessions server-side with `@clerk/backend`.
