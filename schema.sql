-- MPG · Cloudflare D1 schema for Phase 2 (save favourites / saved comparisons).
-- Apply once after `wrangler d1 create mpg-db`:
--   npx wrangler d1 execute mpg-db --remote --file=schema.sql
-- Rows are keyed by the Clerk userId, verified server-side in functions/_lib/clerk.ts.

CREATE TABLE IF NOT EXISTS favourites (
  user_id    TEXT    NOT NULL,
  slug       TEXT    NOT NULL,            -- gateway slug (matches src/content/gateways/<slug>.md)
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (user_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_favourites_user ON favourites (user_id);

CREATE TABLE IF NOT EXISTS saved_compares (
  id         TEXT    PRIMARY KEY,         -- client-generated id (crypto.randomUUID)
  user_id    TEXT    NOT NULL,
  name       TEXT    NOT NULL,
  ids        TEXT    NOT NULL,            -- comma-separated gateway slugs, in order
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_saved_compares_user ON saved_compares (user_id);
