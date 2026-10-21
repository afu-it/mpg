// Card data for the blog hub and pillar pages: one shape, so every listing of
// posts looks the same. Covers are the post's own gateway logos on a
// cluster-tinted panel; the hero screenshots stay as OG images only.
import { getCollection } from "astro:content";
import { clusterBySlug, type BlogCluster } from "./blog";
import { formatDate, type Locale } from "../i18n/locale";
import { postMsEntry } from "../i18n/content";

export interface PostCard {
  href: string;
  title: string;
  description: string;
  date: string;
  mins: number;
  cluster: BlogCluster | undefined;
  tint: string;
  logos: { slug: string; name: string }[];
}

// one tint per cluster so a grid scans by topic at a glance
const TINT: Record<string, string> = {
  "fees-pricing": "from-brand-blue/40",
  "recurring-payments": "from-emerald-700/35",
  "fpx-duitnow": "from-duitnow/30",
  "ewallet-bnpl": "from-brand-yellow/25",
};

// "17 Jul 2026" reads faster than ISO; the machine date stays in <time datetime>
export const fmtDate = (iso: string, locale: Locale = "en") => formatDate(iso, locale);

const readMins = (body = "") => Math.max(1, Math.round(body.split(/\s+/).length / 220));

/** newest first; pass a cluster slug to list one topic only. On BM pages the
 * postsMs overlay supplies title/description when a translation exists. */
export async function postCards(cluster?: string, locale: Locale = "en"): Promise<PostCard[]> {
  const gatewayName = new Map(
    (await getCollection("gateways")).map((g) => [g.id, g.data.name] as const),
  );
  const posts = (await getCollection("posts"))
    .filter((p) => !cluster || p.data.cluster === cluster)
    .sort((a, b) =>
      (b.data.updatedDate ?? b.data.pubDate).localeCompare(a.data.updatedDate ?? a.data.pubDate),
    );
  const ms = await Promise.all(posts.map((p) => postMsEntry(p.id, locale)));
  return posts.map((p, i) => ({
      href: `/blog/${p.id}/`,
      title: ms[i]?.data.title ?? p.data.title,
      description: ms[i]?.data.description ?? p.data.description,
      date: p.data.updatedDate ?? p.data.pubDate,
      mins: readMins(ms[i]?.body?.trim() ? ms[i]!.body : p.body),
      cluster: clusterBySlug(p.data.cluster),
      tint: TINT[p.data.cluster] ?? "from-raised",
      logos: p.data.gateways
        .filter((s) => gatewayName.has(s))
        .slice(0, 4)
        .map((s) => ({ slug: s, name: gatewayName.get(s)! })),
    }));
}
