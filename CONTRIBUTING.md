# Contributing to MPG

Thanks for helping keep Malaysia's payment gateway directory accurate. The
whole value of this site is **trustworthy, sourced data** — so the rules below
are strict about sources and relaxed about everything else.

## The hard rule (read this first)

**Every fee must come from an official source.**

- Each gateway file carries `source:` (the provider's official pricing page)
  and `verified_date:` (the date you checked it).
- If a provider does not publish a rate: use `"Contact sales"` (negotiated /
  unpublished) or `"—"` (channel not offered). **Never guess or fabricate.**
- A figure that only exists on a third-party site gets a trailing `*` and is
  excluded from rankings.
- No `Offer`/`Rating` schema on fees, ever (spam-risk; recorded project rule).

PRs that add unsourced numbers will not be merged, no matter how plausible.

## How to contribute

1. **Fork** this repo and create a branch.
2. Make your change (see recipes below).
3. Run the checks: `npm test` and `npx astro check` must both pass.
4. Open a **pull request** describing what changed and linking the official
   source for any data change.

### Fix a wrong or outdated fee

Edit the gateway's file in `src/content/gateways/<slug>.md`: update the fee,
bump `verified_date` to today, and make sure `source:` still points at the
page that shows the new rate. Mention the change in your PR description.

### Add a missing Malaysian gateway

One new file in `src/content/gateways/` — no code needed. Copy an existing
entry as a template. Requirements:

- Operates in Malaysia (BNM-regulated or a licensed provider's product)
- `source` + `verified_date` on day one; unpublished fees stay `"Contact sales"`
- A real logo in `src/assets/logos/` if you can find an official mark
  (square symbol-marks preferred; `logo_round: true` for circular marks)

### Everything else

Supported banks/methods backfills, `dev_docs` links, MCP server sightings
(`mcp: official|community` — evidence required), Learn/blog copy fixes, and
code improvements are all welcome. For big changes, open an issue first.

## Style notes

- No em-dashes in prose (house style); the standalone `—` fee placeholder stays.
- Internal links end with a trailing slash (`/gateways/`, not `/gateways`).
- Tests enforce SERP title/description windows and content rules — if
  `npm test` fails, read the assertion message; it usually tells you exactly
  what to fix.

## Licensing of contributions

Code contributions are accepted under MIT; data contributions under CC BY 4.0
(see LICENSE and LICENSE-DATA). By opening a PR you agree to license your
contribution under those terms.
