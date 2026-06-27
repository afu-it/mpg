// MPG MCP server — a standalone Cloudflare Worker (NOT the Astro app, which stays
// static). It exposes the Malaysia-payment-gateway directory to AI coding agents
// over the Model Context Protocol (Streamable HTTP at /mcp).
//
// Data source: the static JSON API the site already publishes
// (GET <MPG_API_BASE>/api/gateways.json), cached per isolate. One source of truth.
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";

interface Env {
  MPG_MCP: DurableObjectNamespace;
  MPG_API_BASE: string;
}

interface ApiGateway {
  slug: string;
  name: string;
  category: string;
  website: string;
  tagline: string;
  access: { key: string; short: string };
  fees: Record<string, string | undefined>;
  est_fee_rm100: number | null;
  rankable: boolean;
  channels: string[];
  features: { no_code: boolean; api: boolean; recurring: boolean };
  methods: string[];
  banks: string[];
  mcp: string;
  webhooks: boolean | null;
  plugins: string[];
  dev_docs: string | null;
  skill: string | null;
  popularity: number;
  verified_date: string;
  source: string;
}

interface ApiPayload {
  schema: string;
  generated_at: string;
  count: number;
  disclaimer: string;
  gateways: ApiGateway[];
}

const DEFAULT_BASE = "https://mpg-1hw.pages.dev";
const TTL_MS = 10 * 60 * 1000;
let cache: { at: number; data: ApiPayload } | null = null;

async function getDirectory(env: Env): Promise<ApiPayload> {
  const now = Date.now();
  if (cache && now - cache.at < TTL_MS) return cache.data;
  const base = env.MPG_API_BASE || DEFAULT_BASE;
  const res = await fetch(`${base}/api/gateways.json`, {
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Could not load directory (${res.status}) from ${base}`);
  const data = (await res.json()) as ApiPayload;
  cache = { at: now, data };
  return data;
}

// compact view for list/compare results
function slim(g: ApiGateway) {
  return {
    slug: g.slug,
    name: g.name,
    category: g.category,
    est_fee_rm100: g.est_fee_rm100,
    rankable: g.rankable,
    channels: g.channels,
    fees: g.fees,
    mcp: g.mcp,
    skill: g.skill,
    verified_date: g.verified_date,
  };
}

function json(value: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] };
}

const NOTE =
  "Fees are indicative; values with a trailing '*' are third-party/not officially published, and est_fee_rm100 is a modelled estimate (RM100 basket, FPX/card/e-wallet 50/30/20, null when not comparably published). Confirm with the provider and check verified_date/source.";

export class MpgMCP extends McpAgent<Env, unknown, Record<string, never>> {
  server = new McpServer({ name: "mpg", version: "1.0.0" });

  async init() {
    const env = this.env;

    this.server.registerTool(
      "list_gateways",
      {
        description:
          "List Malaysian payment gateways with optional filters. Use to browse or narrow by category, channel, capability, MCP support, or maximum estimated fee.",
        inputSchema: {
          category: z.enum(["gateway", "bank", "ewallet", "bnpl", "infrastructure"]).optional(),
          channel: z.enum(["fpx", "card", "ewallet", "duitnowqr", "bnpl"]).optional()
            .describe("only gateways that support this payment channel"),
          feature: z.enum(["no_code", "api", "recurring"]).optional(),
          mcp: z.enum(["official", "community", "none"]).optional()
            .describe("AI-agent MCP support level"),
          rankable_only: z.boolean().optional()
            .describe("only gateways with a comparable published fee (excludes 'on request')"),
          max_fee_rm100: z.number().optional()
            .describe("only gateways whose estimated RM100 fee is at most this"),
          limit: z.number().int().positive().max(60).optional(),
        },
      },
      async (a) => {
        const { gateways } = await getDirectory(env);
        let list = gateways;
        if (a.category) list = list.filter((g) => g.category === a.category);
        if (a.channel) list = list.filter((g) => g.channels.includes(a.channel as string));
        if (a.feature) list = list.filter((g) => g.features[a.feature as keyof ApiGateway["features"]]);
        if (a.mcp) list = list.filter((g) => g.mcp === a.mcp);
        if (a.rankable_only) list = list.filter((g) => g.rankable);
        if (a.max_fee_rm100 != null)
          list = list.filter((g) => g.est_fee_rm100 != null && g.est_fee_rm100 <= (a.max_fee_rm100 as number));
        const limit = a.limit ?? 20;
        return json({
          matched: list.length,
          shown: Math.min(limit, list.length),
          note: NOTE,
          gateways: list.slice(0, limit).map(slim),
        });
      },
    );

    this.server.registerTool(
      "get_gateway",
      {
        description: "Get the full record for one gateway by its slug (e.g. 'chip', 'billplz').",
        inputSchema: { slug: z.string().describe("gateway slug, e.g. 'chip'") },
      },
      async ({ slug }) => {
        const { gateways } = await getDirectory(env);
        const g = gateways.find((x) => x.slug === slug.toLowerCase().trim());
        if (!g)
          return json({
            error: `No gateway with slug '${slug}'.`,
            available_slugs: gateways.map((x) => x.slug),
          });
        return json({ note: NOTE, gateway: g });
      },
    );

    this.server.registerTool(
      "compare_gateways",
      {
        description: "Compare 2-4 gateways side by side by their slugs.",
        inputSchema: { slugs: z.array(z.string()).min(2).max(4) },
      },
      async ({ slugs }) => {
        const { gateways } = await getDirectory(env);
        const found = slugs.map((s) => gateways.find((g) => g.slug === s.toLowerCase().trim()) ?? { slug: s, error: "not found" });
        return json({ note: NOTE, gateways: found });
      },
    );

    this.server.registerTool(
      "recommend_gateway",
      {
        description:
          "Recommend the cheapest gateways (by estimated RM100 fee) that match a merchant's needs: required channels and optional capabilities. Only ranks gateways with comparable published rates.",
        inputSchema: {
          channels: z.array(z.enum(["fpx", "card", "ewallet", "duitnowqr", "bnpl"])).optional()
            .describe("payment channels the merchant must support"),
          need_recurring: z.boolean().optional(),
          need_no_code: z.boolean().optional(),
          prefer_mcp: z.boolean().optional().describe("prefer gateways with an official MCP server"),
          limit: z.number().int().positive().max(20).optional(),
        },
      },
      async (a) => {
        const { gateways } = await getDirectory(env);
        let list = gateways.filter((g) => g.rankable);
        for (const c of a.channels ?? []) list = list.filter((g) => g.channels.includes(c));
        if (a.need_recurring) list = list.filter((g) => g.features.recurring);
        if (a.need_no_code) list = list.filter((g) => g.features.no_code);
        list = [...list].sort((x, y) => {
          if (a.prefer_mcp) {
            const mx = x.mcp === "official" ? 0 : 1;
            const my = y.mcp === "official" ? 0 : 1;
            if (mx !== my) return mx - my;
          }
          return (x.est_fee_rm100 ?? Infinity) - (y.est_fee_rm100 ?? Infinity);
        });
        const limit = a.limit ?? 5;
        return json({
          matched: list.length,
          note: NOTE,
          recommendations: list.slice(0, limit).map(slim),
        });
      },
    );
  }
}

const HELP = `MPG MCP server — Malaysia payment gateway directory.
Connect an MCP client to: <this-url>/mcp  (Streamable HTTP)
Tools: list_gateways, get_gateway, compare_gateways, recommend_gateway.
Data: https://mpg-1hw.pages.dev/api/gateways.json
`;

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "") {
      return new Response(HELP, { headers: { "content-type": "text/plain; charset=utf-8" } });
    }
    if (url.pathname.startsWith("/mcp")) {
      return MpgMCP.serve("/mcp", { binding: "MPG_MCP" }).fetch(request, env, ctx);
    }
    return new Response("Not found", { status: 404 });
  },
};
