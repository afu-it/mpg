---
status: rejected
created: 2026-06-24
---
> REJECTED 2026-06-24 — owner decided not to use favourites. All code removed
> (functions/, D1 schema, FavButton, favourites client, /favourites page,
> save-comparison form; @clerk/backend + @cloudflare/workers-types uninstalled).
> Kept as history — do not re-suggest. Clerk sign-in/up itself was kept.

# Save favourites / comparisons

## Goal
Logged-in users bookmark favourite gateways and save comparison sets to revisit
across devices.

## Scope
- In: ❤️ toggle on gateway rows/detail; "My favourites" view; save a `/compare?ids=` set to the account.
- Out: sharing/teams, notifications (separate phase).

## Approach (planned)
- Auth: Clerk (already in, client-side). Get user id client-side; call an API with the Clerk session token.
- Storage: **Cloudflare D1** via **Pages Functions** (`/functions/api/favourites`), keyed by Clerk userId. Kept separate from the static Astro build (Astro CF adapter dev is broken on Astro 7).
- Verify Clerk session server-side with `@clerk/backend` in the Function.

## Acceptance criteria
- Signed-out: favourite prompts sign up. Signed-in: toggle persists; survives reload + other device.
- No secret keys in client; D1 writes keyed to verified userId.

## Notes
Code complete (2026-06-24). Schema decided & shipped in `schema.sql`:
`favourites(user_id, slug, created_at)` + `saved_compares(id, user_id, name, ids, created_at)`.

Built:
- `functions/api/favourites.ts` (GET/POST/DELETE) + `functions/api/compares.ts` (GET/POST/DELETE),
  Clerk token verified server-side in `functions/_lib/clerk.ts` via `@clerk/backend` (`verifyToken`).
  Functions return 503 when `DB`/`CLERK_SECRET_KEY` are absent → safe to deploy before provisioning.
- Client: `FavButton.astro` ♥ on table rows + detail; `src/scripts/favourites.ts` (loaded in Base)
  hydrates state, optimistic toggle, sign-up prompt when signed out.
- `/favourites` page (saved gateways + saved comparisons); "Save this comparison" form on `/compare`.
- `functions/tsconfig.json` scopes Workers types away from the Astro/DOM root tsconfig.

Remaining to go live (needs the owner's Cloudflare account — cannot be done from the repo):
1. `npx wrangler d1 create mpg-db` → put `database_id` in `wrangler.toml` and uncomment the `[[d1_databases]]` block.
2. `npx wrangler d1 execute mpg-db --remote --file=schema.sql`.
3. CF Pages → mpg → add D1 binding `DB` + secret `CLERK_SECRET_KEY`.
→ flip status to `done` once verified on live.
