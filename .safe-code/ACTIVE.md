# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-06-27
completed:
  - Pushed the prior 59-gateway expansion live (run 28278599282).
  - Payex resolved (rejected — now Xendit).
  - Ranking redesign A→D (spec 07): unit-correct effective-cost ranking + gating + Est. fee/RM100 column + per-channel sorts + corrected popularity. Built, verified, committed (1855633/6092b3e/7a1298c) and pushed live (run 28281111856).
  - API + MCP (spec 08): Phase 1 static JSON API (`src/lib/api.ts` + endpoints + `/learn/api` docs) — LIVE. Phase 2 MCP Worker (`mcp/`, 4 tools) DEPLOYED at `https://mpg-mcp.afuitdev.workers.dev/mcp` and verified end-to-end (initialize + tools/list + recommend_gateway returned real ranked data). /learn/api + README carry the live URL.
pending:
  - Custom domain malaysiapg.com.my (MYNIC LoU ready) → CF Pages + Clerk pk_live + update MPG_API_BASE in mcp/wrangler.jsonc.
  - Optional ranking follow-ups (spec 07): per-RM100 cells on /compare; separate visual track for BNPL/bank/wallet; decide if ranking should require FPX.
  - Reconsider deferred Tier 2 international PSPs; Phase 3 submit-a-gateway.
next_action: API + MCP shipped and live. Next: custom domain malaysiapg.com.my + Clerk pk_live when it lands (also update mcp/wrangler.jsonc MPG_API_BASE), or pick up an optional spec-07/08 follow-up.
