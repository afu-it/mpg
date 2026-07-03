# Code Standards — MPG

- **Language:** TypeScript (strict via `astro/tsconfigs/strict`). Astro components for UI; plain `.ts` for client behaviour + logic.
- **Styling:** Tailwind v4 utilities using the semantic tokens (`bg-surface/panel/raised`, `text-fg/muted/accent`, `border-line`). Don't hardcode hex in components — use tokens. Dark mode only.
- **Data:** one gateway per markdown file; keep frontmatter to the Zod schema. Fee strings quoted. `"Contact sales"` / `"—"` conventions (never invent numbers).
- **Client scripts:** vanilla TS over the static DOM (no heavy libs). Precompute sortable values server-side into `data-sort-value`.
- **Accessibility:** WCAG 2.2 AA — visible focus (`*:focus-visible` accent ring), sufficient contrast, keyboard-operable controls, semantic tables.
- **Verification before done:** `npm test` + `npx astro check` + `npm run build` must be green.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `data:`, `style:`, `chore:`, `docs:`). Co-author trailer for AI-made commits.
- **Fonts:** Inter (variable, self-hosted via `@fontsource-variable/inter`).
- **Astro prose whitespace:** Astro trims whitespace at inline-tag boundaries, so a link/span on its own source line glues to the surrounding words ("thecontribute page"). Keep inline tags on the same line as their text, or end the adjacent lines with `{" "}`. When adding prose pages, scan the built HTML for gluings before calling it done.
- **SEO invariants:** every page emits a canonical (https + trailing slash, from Base.astro); titles 30-65 chars, descriptions 110-160; JSON-LD urls trailing-slash; new inline links in prose need the whitespace rule above.
