// Shared helpers for MPG Pages Functions (Phase 2).
// Underscore-prefixed dir → Cloudflare Pages does NOT route this as an endpoint.
import { verifyToken } from "@clerk/backend";
import type { D1Database } from "@cloudflare/workers-types";

export interface Env {
  DB?: D1Database; // inert until provisioned (see wrangler.toml)
  CLERK_SECRET_KEY?: string; // CF Pages encrypted secret
}

export const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

/** True only when both the DB binding and the Clerk secret are configured. */
export const isReady = (env: Env): boolean => !!env.DB && !!env.CLERK_SECRET_KEY;

/**
 * Verify the Clerk session token from the Authorization header and return the
 * userId (`sub`), or null when missing/invalid. Never throws.
 */
export async function getUserId(
  request: Request,
  env: Env,
): Promise<string | null> {
  if (!env.CLERK_SECRET_KEY) return null;
  const header = request.headers.get("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) return null;
  try {
    const payload = await verifyToken(token, {
      secretKey: env.CLERK_SECRET_KEY,
    });
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}
