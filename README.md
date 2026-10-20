# Malaysia Payment Gateway (MPG)

**Compare every Malaysian payment gateway's fees — FPX, cards, e-wallets, DuitNow QR and BNPL — from official sources only.**

Live site: **[malaysiapg.com.my](https://malaysiapg.com.my/)**

- **71 gateways**, every fee sourced from the provider's official pricing page with a `verified_date`
- Ranked by estimated blended cost on a RM100 transaction (FPX/card/e-wallet weighted 50/30/20) — providers without comparable published rates are listed as "on request", never guessed
- Free JSON API: [`/api/gateways.json`](https://malaysiapg.com.my/api/gateways.json) · per-gateway: `/api/gateways/<slug>.json`
- MCP server for AI agents: `https://mpg-mcp.afuitdev.workers.dev/mcp` (source in [`mcp/`](mcp/))
- Guides for merchants and developers at [/learn](https://malaysiapg.com.my/learn/) and [/blog](https://malaysiapg.com.my/blog/)

## The one hard rule

**Fees are never fabricated.** Every figure comes from an official source URL recorded next to it. If a provider does not publish a rate, the entry says `"Contact sales"` (negotiated/unpublished) or `"—"` (not offered). Third-party figures carry a trailing `*` and are excluded from rankings. Fees are indicative and often negotiable by volume — always confirm with the provider before deciding.

## Stack

- [Astro 7](https://astro.build/) static output + Tailwind CSS v4 — no server, no database
- Gateway data = one Markdown file per provider in [`src/content/gateways/`](src/content/gateways/), Zod-validated against [`src/content.config.ts`](src/content.config.ts)
- Auth (for the contribute flow) = Clerk via CDN, client-side only
- Deployed on Cloudflare Pages via GitHub Actions
- Standalone MCP server (Cloudflare Worker) in [`mcp/`](mcp/)

## Run it

```bash
npm install
npm run dev        # dev server
npm test           # vitest (fee parsing, ranking, content rules)
npx astro check    # types + content schema
npm run build      # static build (219 pages)
npm run preview    # preview the built site
```

## Contributing

The easiest high-value contribution: **spot a wrong fee and fix it with an official source.** See [CONTRIBUTING.md](CONTRIBUTING.md) — fork, edit the gateway's `.md` file, open a PR. Adding a missing Malaysian gateway is one new file in `src/content/gateways/`, no code required: the table row, detail page and API entry appear automatically at build.

## Licensing

| What | License |
|---|---|
| Source code | [MIT](LICENSE) |
| Gateway dataset (`src/content/gateways/`, JSON API) | [CC BY 4.0](LICENSE-DATA) — attribute "Malaysia Payment Gateway (malaysiapg.com.my)" |
| Provider logos (`src/assets/logos/`) | Trademarks of their respective owners, used for identification only |

## Author

Built by [Afu](https://github.com/afu-it) · [@afwzn on Threads](https://www.threads.net/@afwzn) · companion skills repo: [malaysia-payment-gateway](https://github.com/afu-it/malaysia-payment-gateway)
