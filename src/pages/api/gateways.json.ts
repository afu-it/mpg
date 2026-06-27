// Static JSON API: GET /api/gateways.json — the whole directory, machine-readable.
// Prerendered to dist/api/gateways.json at build time (no server, stays static).
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { buildApiPayload, type GatewayEntryLike } from "../../lib/api";

export const prerender = true;

export const GET: APIRoute = async () => {
  const entries = (await getCollection("gateways")) as unknown as GatewayEntryLike[];
  const payload = buildApiPayload(entries, new Date().toISOString().slice(0, 10));
  return new Response(JSON.stringify(payload, null, 2) + "\n", {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
};
