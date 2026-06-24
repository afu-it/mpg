---
status: approved
created: 2026-06-24
---
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
Not started. Decide D1 schema (favourites: userId, slug, created_at; saved_compares: userId, ids[], name).
