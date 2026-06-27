# ACTIVE — resume point

## Last Session
status: saved
saved_at: 2026-06-27
completed:
  - Pushed the prior 59-gateway expansion live (run 28278599282).
  - Payex resolved (rejected — now Xendit).
  - Ranking redesign A→D (spec 07): unit-correct effective-cost ranking + gating + Est. fee/RM100 column + per-channel sorts + corrected popularity. Built, verified, committed (1855633/6092b3e/7a1298c) and pushed live (run 28281111856).
  - API + MCP (spec 08): Phase 1 static JSON API (`src/lib/api.ts` + endpoints `/api/gateways.json`, `/api/gateways/<slug>.json` + `/learn/api` docs) and Phase 2 MCP Worker (`mcp/`, McpAgent, 4 tools). Built + verified (astro check 0, build 69, vitest 34/34; worker tsc 0 + wrangler dry-run OK). Committed (22a7e9f Phase 1, 5d66601 Phase 2).
pending:
  - **Deploy the MCP Worker**: AFU runs `cd mcp && npx wrangler login` (interactive), then `npm run deploy`. The Worker fetches the live `/api/gateways.json`, so Phase 1 must be deployed first. After deploy, connect a client to `https://mpg-mcp.<account>.workers.dev/mcp`, confirm the handshake + tools, then update `/learn/api` with the real URL.
  - Custom domain malaysiapg.com.my (MYNIC LoU ready) → CF Pages + Clerk pk_live + update MPG_API_BASE in mcp/wrangler.jsonc.
  - Optional ranking follow-ups (spec 07): per-RM100 cells on /compare; separate visual track for BNPL/bank/wallet; decide if ranking should require FPX.
  - Reconsider deferred Tier 2 international PSPs; Phase 3 submit-a-gateway.
next_action: Help AFU deploy the MCP Worker (AFU runs `npx wrangler login` first, then `npm run deploy` in mcp/), verify the live handshake, and wire the real Worker URL into /learn/api.
