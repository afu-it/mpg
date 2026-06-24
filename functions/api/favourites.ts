// GET    /api/favourites        → { slugs: string[] }       (current user's favourites)
// POST   /api/favourites { slug } → add a favourite      → { ok: true }
// DELETE /api/favourites { slug } → remove a favourite   → { ok: true }
// Auth: Clerk session token in `Authorization: Bearer <token>`.
import type { PagesFunction } from "@cloudflare/workers-types";
import { type Env, getUserId, isReady, json } from "../_lib/clerk";

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;

async function readSlug(request: Request): Promise<string | null> {
  try {
    const body = (await request.json()) as { slug?: unknown };
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    return SLUG_RE.test(slug) ? slug : null;
  } catch {
    return null;
  }
}

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (!isReady(env)) return json({ error: "favourites_unavailable" }, 503);

  const userId = await getUserId(request, env);
  if (!userId) return json({ error: "unauthorized" }, 401);
  const db = env.DB!;

  if (request.method === "GET") {
    const { results } = await db
      .prepare("SELECT slug FROM favourites WHERE user_id = ? ORDER BY created_at DESC")
      .bind(userId)
      .all<{ slug: string }>();
    return json({ slugs: results.map((r) => r.slug) });
  }

  if (request.method === "POST" || request.method === "DELETE") {
    const slug = await readSlug(request);
    if (!slug) return json({ error: "invalid_slug" }, 400);

    if (request.method === "POST") {
      await db
        .prepare("INSERT OR IGNORE INTO favourites (user_id, slug) VALUES (?, ?)")
        .bind(userId, slug)
        .run();
    } else {
      await db
        .prepare("DELETE FROM favourites WHERE user_id = ? AND slug = ?")
        .bind(userId, slug)
        .run();
    }
    return json({ ok: true });
  }

  return json({ error: "method_not_allowed" }, 405);
};
