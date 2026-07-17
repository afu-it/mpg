---
status: done   # completed same day incl deploy migration to Pages Git; AFU approved 2026-07-17: "haa buat semua please, aku mmg nak opensource kan je"
created: 2026-07-17
---
# Open-source the repo on GitHub

## Goal
Flip `afu-it/mpg` from private to public safely: no leaked secrets in history,
proper licensing (code vs data vs logos), contributor docs that codify the
sourced-fees rule, and a contribution flow that switches from
invite-collaborator (spec 11) to fork+PR.

## Pre-flight audit (DONE 2026-07-17, this session)
- 149 commits scanned (`git log --all -p` + secret regexes): no sk_/pk_ values,
  no cloud tokens, no private keys, no Firecrawl keys, no `.env`/`.pem`/`.key`
  ever committed. Only emails in history: git author (afuitdev@gmail.com,
  public on GitHub anyway) + a provider's public support email.
- `.safe-code/` history: sanitized as designed (hits were design tokens and
  discussions of keys as concepts). Clerk app/instance IDs present = public
  identifiers, not secrets. DECISION: keep `.safe-code/` public (transparency).
- IndexNow key file is public by IndexNow spec.

## Scope (in)
- LICENSE (MIT, code) + LICENSE-DATA (CC BY 4.0 for `src/content/gateways/`),
  logo-trademark notice in README.
- README.md (what/live URL/stack/run/test/contribute/licensing).
- CONTRIBUTING.md: fork+PR flow; hard rule = every fee sourced from an official
  page + `verified_date`; `"Contact sales"` / `"—"` over fabrication; one `.md`
  per gateway; `npm test` + `npx astro check` must pass.
- .github/ISSUE_TEMPLATE: fee-change report + new-gateway suggestion.
- /contribute page copy: private-repo + email-application flow → public-repo
  fork+PR (Clerk-gated application no longer the main path).
- Flip visibility via `gh repo edit --visibility public`.
- Branch protection on master (public repo unlocks it on free plan): block
  force-push + deletion; direct pushes stay allowed (AFU solo flow).

## Scope (out)
- History rewrite/squash (not needed; scan clean).
- TM-001 pilihan A (Cloudflare Pages direct Git integration) — AFU dashboard
  task, recorded as follow-up. Public repo is safe meanwhile: GitHub does not
  expose secrets to fork-PR workflows; deploy job stays owner-gated. Guard
  rule: never add `pull_request_target` workflows; no write-access collaborators
  while the CF token lives in GH secrets.

## Acceptance criteria
- Repo public; README/LICENSE/CONTRIBUTING render on the GitHub front page.
- Secret scan documented clean before the flip.
- vitest green, astro check 0, build green; site unaffected.
- Branch protection active on master.

## Reversal note
Spec 11's "repo stays private + invite collaborators" decision is superseded
by this spec (AFU, 2026-07-17). The owner-gated deploy job stays.
