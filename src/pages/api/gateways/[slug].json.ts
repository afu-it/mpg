// Static JSON API: GET /api/gateways/<slug>.json — one gateway, machine-readable.
// One prerendered file per gateway.
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { toApiGateway, type GatewayEntryLike } from "../../../lib/api";

export const prerender = true;

export const getStaticPaths = (async () => {
  const entries = await getCollection("gateways");
  return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const gw = toApiGateway(props.entry as unknown as GatewayEntryLike);
  return new Response(JSON.stringify(gw, null, 2) + "\n", {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
