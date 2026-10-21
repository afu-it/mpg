# MPG MCP server

A standalone Cloudflare Worker that exposes the [MPG](https://malaysiapg.com.my)
Malaysia-payment-gateway directory to AI coding agents over the
**Model Context Protocol** (Streamable HTTP).

It is **separate from the Astro site** (which stays static) and reads its data
from the site's static JSON API (`/api/gateways.json`), so there is one source of
truth and nothing to keep in sync.

## Tools

| Tool | What it does |
|------|--------------|
| `list_gateways` | List gateways, filterable by category, channel, capability, MCP support, or max estimated fee. |
| `get_gateway` | Full record for one gateway by slug. |
| `compare_gateways` | Compare 2–4 gateways side by side. |
| `recommend_gateway` | Cheapest gateways (by estimated RM100 fee) matching required channels + capabilities. |

## Develop

```bash
cd mcp
npm install
npm run typecheck      # tsc --noEmit
npm run dev            # wrangler dev → http://localhost:8787/mcp
npm run inspect        # MCP Inspector to exercise the tools
```

## Deploy (needs a Cloudflare login)

```bash
cd mcp
npx wrangler login     # once
npm run deploy         # wrangler deploy → https://mcp.malaysiapg.com.my (workers.dev URL stays live)
```

The Durable Object (`MpgMCP`, SQLite-backed) is created automatically by the
migration in `wrangler.jsonc`. To point the server at a different data source
(e.g. the custom domain when it lands), change `MPG_API_BASE` in `wrangler.jsonc`.

## Connect

Add the deployed URL to an MCP client. Example (Claude Code):

```bash
claude mcp add --transport http mpg https://mcp.malaysiapg.com.my/mcp
```

Or in a client config:

```jsonc
{ "mcpServers": { "mpg": { "url": "https://mcp.malaysiapg.com.my/mcp" } } }
```

Then ask your agent things like *"which Malaysian gateway is cheapest for FPX +
recurring with an official MCP server?"* and it will call `recommend_gateway`.

> Fees are indicative; agents should surface `verified_date`/`source` and remind
> users to confirm with the provider.
