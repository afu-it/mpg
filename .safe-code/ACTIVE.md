# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-06-27
completed:
  - Pushed the prior 59-gateway expansion live (run 28278599282).
  - Payex resolved (rejected — now Xendit).
  - Ranking redesign A→D (spec 07): unit-correct effective-cost ranking + gating + Est. fee/RM100 column + per-channel sorts + corrected popularity. Built, verified, committed (1855633/6092b3e/7a1298c) and pushed live (run 28281111856).
  - API + MCP (spec 08): Phase 1 static JSON API + Phase 2 MCP Worker DEPLOYED at `https://mpg-mcp.afuitdev.workers.dev/mcp`, verified end-to-end. /learn/api + footer link carry the live URL.
  - "Help me choose" wizard (spec 09): full brainstorm → writing-plans → executing-plans (inline). `src/lib/recommend.ts` (pure, 8 vitest) + `/choose` page + wizard script + entry points (landing/footer/learn). astro check 0, build 70, vitest 42/42. Committed (d8e9476, d620cda, 048c8b2).
pending:
  - **Spec B — programmatic SEO pages** (the pair to spec 09; not yet specced): pre-render `recommend()` results for common need-profiles + "X vs Y" pages.
  - Custom domain malaysiapg.com.my (MYNIC LoU ready) → CF Pages + Clerk pk_live + update MPG_API_BASE in mcp/wrangler.jsonc.
  - Optional ranking follow-ups (spec 07): per-RM100 cells on /compare; separate visual track for BNPL/bank/wallet; decide if ranking should require FPX.
  - Reconsider deferred Tier 2 international PSPs; Phase 3 submit-a-gateway.
next_action: Wizard + API + MCP shipped and live. Next options: Spec B (programmatic SEO pages, reuses recommend()); custom domain malaysiapg.com.my + Clerk pk_live when it lands; or an optional spec-07/08 follow-up.
