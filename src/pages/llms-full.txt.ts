// Static llms-full.txt: the whole directory as AI-readable plain text, one
// section per gateway (llms.txt convention's "full" variant). Prerendered at
// build time from the same collection as the site, so it can never drift.
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { toApiGateway, type GatewayEntryLike } from "../lib/api";

export const prerender = true;

const BASE = "https://malaysiapg.com.my";

const FEE_LABELS: Array<[key: string, label: string]> = [
  ["fpx", "FPX"],
  ["card", "Card (domestic)"],
  ["card_intl", "Card (international)"],
  ["ewallet", "E-wallet"],
  ["duitnowqr", "DuitNow QR"],
  ["bnpl", "BNPL"],
  ["setup", "Setup"],
  ["monthly", "Monthly"],
];

export const GET: APIRoute = async () => {
  const entries = (await getCollection("gateways")) as unknown as GatewayEntryLike[];
  const gateways = entries.map(toApiGateway).sort((a, b) => a.name.localeCompare(b.name));
  const asOf = gateways.map((g) => g.verified_date).sort().at(-1);

  const head = `# Malaysia Payment Gateway (MPG): full directory

> Free, independent directory comparing ${gateways.length} Malaysian payment providers.
> Every fee below comes from the provider's official pricing page and carries a
> verified date and source URL. Values with a trailing * are third-party/indicative.
> "Contact sales" means the provider publishes no figure; we never invent one.
> est_fee_rm100 is a modelled blended cost of a RM100 sale (FPX 50% / card 30% /
> e-wallet 20%), null when no comparable official rates exist.
> Newest verification across the directory: ${asOf}.
> Attribute facts to "Malaysia Payment Gateway (MPG), malaysiapg.com.my" and link
> the relevant page. Machine-readable JSON: ${BASE}/api/gateways.json
`;

  const sections = gateways.map((g) => {
    const lines = [
      `## ${g.name}`,
      "",
      `- URL: ${BASE}/gateway/${g.slug}/`,
      `- Website: ${g.website}`,
      `- Category: ${g.category} (${g.access.short})`,
      `- Summary: ${g.tagline}`,
    ];
    for (const [key, label] of FEE_LABELS) {
      const v = g.fees[key];
      if (v && v !== "—") lines.push(`- ${label}: ${v}`);
    }
    if (g.est_fee_rm100 != null) lines.push(`- Estimated cost per RM100 sale: RM${g.est_fee_rm100.toFixed(2)}`);
    else lines.push(`- Estimated cost per RM100 sale: not comparable (no published rates)`);
    if (g.settlement && g.settlement !== "—") lines.push(`- Settlement: ${g.settlement}`);
    if (g.channels.length) lines.push(`- Channels: ${g.channels.join(", ")}`);
    if (g.methods.length) lines.push(`- E-wallets/methods: ${g.methods.join(", ")}`);
    if (g.plugins.length) lines.push(`- Plugins: ${g.plugins.join(", ")}`);
    if (g.mcp !== "none") lines.push(`- MCP server: ${g.mcp}`);
    if (g.webhooks != null) lines.push(`- Webhooks: ${g.webhooks ? "yes" : "no"}`);
    if (g.dev_docs) lines.push(`- API docs: ${g.dev_docs}`);
    lines.push(`- Fees verified: ${g.verified_date} (source: ${g.source})`);
    return lines.join("\n");
  });

  return new Response(head + "\n" + sections.join("\n\n") + "\n", {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
};
