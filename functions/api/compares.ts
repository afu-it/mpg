// GET    /api/compares                  → { compares: {id,name,ids[]}[] }
// POST   /api/compares { name, ids[] }   → save a comparison set → { id }
// DELETE /api/compares { id }            → remove a saved set    → { ok: true }
// Auth: Clerk session token in `Authorization: Bearer <token>`.
import type { PagesFunction } from "@cloudflare/workers-types";
import { type Env, getUserId, isReady, json } from "../_lib/clerk";

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (!isReady(env)) return json({ error: "compares_unavailable" }, 503);

  const userId = await getUserId(request, env);
  if (!userId) return json({ error: "unauthorized" }, 401);
  const db = env.DB!;

  if (request.method === "GET") {
    const { results } = await db
      .prepare("SELECT id, name, ids FROM saved_compares WHERE user_id = ? ORDER BY created_at DESC")
      .bind(userId)
      .all<{ id: string; name: string; ids: string }>();
    return json({
      compares: results.map((r) => ({ id: r.id, name: r.name, ids: r.ids.split(",") })),
    });
  }

  if (request.method === "POST") {
    let body: { name?: unknown; ids?: unknown };
    try {
      body = (await request.json()) as typeof body;
    } catch {
      return json({ error: "invalid_body" }, 400);
    }
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 80) : "";
    const ids = Array.isArray(body.ids)
      ? body.ids.filter((s): s is string => typeof s === "string" && SLUG_RE.test(s))
      : [];
    if (!name || ids.length < 2 || ids.length > 4) {
      return json({ error: "invalid_comparison" }, 400);
    }
    const id = crypto.randomUUID();
    await db
      .prepare("INSERT INTO saved_compares (id, user_id, name, ids) VALUES (?, ?, ?, ?)")
      .bind(id, userId, name, ids.join(","))
      .run();
    return json({ id });
  }

  if (request.method === "DELETE") {
    let body: { id?: unknown };
    try {
      body = (await request.json()) as typeof body;
    } catch {
      return json({ error: "invalid_body" }, 400);
    }
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) return json({ error: "invalid_id" }, 400);
    await db
      .prepare("DELETE FROM saved_compares WHERE user_id = ? AND id = ?")
      .bind(userId, id)
      .run();
    return json({ ok: true });
  }

  return json({ error: "method_not_allowed" }, 405);
};
