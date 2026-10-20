# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-10-20 (save #7: --continue, all pending items run in parallel)
completed:
  - Spec 15 slice D DONE: /blog/recurring-payments/ pillar + 3 EN posts (what-is, billing, gateway compare), cluster live.
  - Fee/data refresh 2026-10-20 on 16 gateways (Fiuu Aug-2026 card, Airwallex intl increase, MOBY repricing, M1Pay plan fees unpublished, CHIP SPayLater+stablecoin, SMAP Pay API, SecurePay docs, HLB + Kiple re-verified); 5 fee-change log entries.
  - Kiple vendor email (2026-10-12) applied: recurring true (also public at kiple.com/payments/), MBSB added to FPX banks (email-only source, noted).
  - SwiF re-checked: spam gone, keep with dormancy warning; body fixed (it publishes a rate card).
  - Old `mpg` Pages project deleted (live domain confirmed on mpg-site); repo Website field set; mcp dev-deps bump type-checked + committed.
pending:
  - PUSH to master = deploy (4 local commits); needs AFU OK.
  - AFU HIGH: revoke old Cloudflare API token in the dashboard (no tool here has token-list permission; already absent from shell env).
  - AFU: reply to Kiple (draft given in chat; ask affiliate terms). Joining an affiliate programme contradicts /about "no affiliate links" claim; needs a disclosure decision first.
  - AFU distribution round: GSC Request Indexing (incl. new recurring posts), Threads post, MCP registries, Wikidata.
  - Spec 15 slices E-G (fpx-duitnow, ewallet-bnpl clusters; inbound links; BM subset incl "maksud recurring payment" in slice F).
  - Data follow-ups: eGHL now redirects to NTT DATA Pay (ADAPTIS) brand/website/source pass; MOBY channels still [bnpl] though it publishes FPX/card/wallet/QR; Kiple QR/e-wallet rows unlabeled on pricing page; Fiuu BNPL kept in channels but unpriced; SwiF re-check ~2027-01 (delist if still dormant).
  - Repo node_modules (root + mcp) were installed on another OS; on this Mac run `npm ci` before tests/build.
next_action: Get AFU OK to push the 4 local commits (deploys the recurring cluster + fee refresh), then Spec 15 slice E.
