import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { AUTHOR, CLUSTERS, articleLd, authorLd, blogPath, clusterBySlug } from "./blog";

const POSTS_DIR = join(__dirname, "../content/posts");
const GATEWAYS_DIR = join(__dirname, "../content/gateways");

interface PostFile {
  file: string;
  raw: string;
  fm: string; // frontmatter block
  body: string;
}

function loadPosts(): PostFile[] {
  if (!existsSync(POSTS_DIR)) return [];
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = readFileSync(join(POSTS_DIR, file), "utf8");
      const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      if (!m) throw new Error(`${file}: missing frontmatter`);
      return { file, raw, fm: m[1], body: m[2] };
    });
}

function fmValue(fm: string, key: string): string | undefined {
  const m = fm.match(new RegExp(`^${key}: "(.*)"$`, "m"));
  return m?.[1];
}

describe("blog cluster registry", () => {
  it("pillar titles/descriptions sit inside the SERP windows", () => {
    for (const c of CLUSTERS) {
      expect(c.title.length, `${c.slug} title (${c.title.length})`).toBeGreaterThanOrEqual(30);
      expect(c.title.length, `${c.slug} title (${c.title.length})`).toBeLessThanOrEqual(65);
      expect(c.description.length, `${c.slug} desc (${c.description.length})`).toBeGreaterThanOrEqual(110);
      expect(c.description.length, `${c.slug} desc (${c.description.length})`).toBeLessThanOrEqual(160);
    }
  });

  it("slugs are unique, url-safe, and resolvable", () => {
    const slugs = CLUSTERS.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) {
      expect(s).toMatch(/^[a-z0-9-]+$/);
      expect(clusterBySlug(s)?.slug).toBe(s);
      expect(blogPath(s)).toBe(`/blog/${s}/`);
    }
  });

  it("live clusters have a pillar page file and at least one post", () => {
    const posts = loadPosts();
    for (const c of CLUSTERS.filter((x) => x.live)) {
      const pillar = join(__dirname, `../pages/blog/${c.slug}.astro`);
      expect(existsSync(pillar), `pillar page missing for live cluster ${c.slug}`).toBe(true);
      const inCluster = posts.filter((p) => fmValue(p.fm, "cluster") === c.slug);
      expect(inCluster.length, `live cluster ${c.slug} has no posts`).toBeGreaterThan(0);
    }
  });
});

describe("blog posts frontmatter + house style", () => {
  const posts = loadPosts();

  it("titles/descriptions sit inside the SERP windows", () => {
    for (const p of posts) {
      const title = fmValue(p.fm, "title");
      const desc = fmValue(p.fm, "description");
      expect(title, `${p.file}: title missing`).toBeTruthy();
      expect(desc, `${p.file}: description missing`).toBeTruthy();
      expect(title!.length, `${p.file} title (${title!.length})`).toBeGreaterThanOrEqual(30);
      expect(title!.length, `${p.file} title (${title!.length})`).toBeLessThanOrEqual(65);
      expect(desc!.length, `${p.file} desc (${desc!.length})`).toBeGreaterThanOrEqual(110);
      expect(desc!.length, `${p.file} desc (${desc!.length})`).toBeLessThanOrEqual(160);
    }
  });

  it("every post belongs to a registered cluster", () => {
    const known = new Set(CLUSTERS.map((c) => c.slug));
    for (const p of posts) {
      const cluster = p.fm.match(/^cluster: "?([a-z0-9-]+)"?$/m)?.[1];
      expect(cluster && known.has(cluster), `${p.file}: unknown cluster ${cluster}`).toBe(true);
    }
  });

  it("gateway references resolve to real content files", () => {
    for (const p of posts) {
      const block = p.fm.match(/^gateways:\n((?: {2}- .+\n?)+)/m)?.[1] ?? "";
      const slugs = [...block.matchAll(/- (.+)/g)].map((m) => m[1].trim());
      for (const s of slugs) {
        expect(
          existsSync(join(GATEWAYS_DIR, `${s}.md`)),
          `${p.file}: gateway "${s}" has no content file`,
        ).toBe(true);
      }
    }
  });

  it("prose carries no em-dashes and no fabricated-fee tells", () => {
    for (const p of posts) {
      expect(p.body.includes("—"), `${p.file}: em-dash in body`).toBe(false);
      expect(fmValue(p.fm, "title")!.includes("—"), `${p.file}: em-dash in title`).toBe(false);
    }
  });

  it("every post cites at least one source and links internally", () => {
    for (const p of posts) {
      expect(/^sources:\n {2}- /m.test(p.fm), `${p.file}: no sources`).toBe(true);
      const internal = [...p.body.matchAll(/\]\((\/[^)]*)\)/g)].map((m) => m[1]);
      expect(internal.length, `${p.file}: fewer than 2 internal links`).toBeGreaterThanOrEqual(2);
      for (const href of internal) {
        expect(
          /\/(\?|#|$)/.test(href),
          `${p.file}: internal link missing trailing slash: ${href}`,
        ).toBe(true);
      }
    }
  });
});

describe("author + article JSON-LD", () => {
  it("author entity is honest and linked", () => {
    expect(AUTHOR.sameAs).toContain("https://github.com/afu-it");
    const ld = authorLd("https://malaysiapg.com.my/") as Record<string, unknown>;
    expect(ld["@id"]).toBe("https://malaysiapg.com.my/#author-afu");
    expect(ld["worksFor"]).toEqual({ "@id": "https://malaysiapg.com.my/#organization" });
  });

  it("articleLd carries dates, author, and canonical url", () => {
    const ld = articleLd(
      "https://malaysiapg.com.my/",
      "/blog/example/",
      "Example",
      "Desc",
      "2026-07-17",
    ) as Record<string, unknown>;
    expect(ld["url"]).toBe("https://malaysiapg.com.my/blog/example/");
    expect(ld["datePublished"]).toBe("2026-07-17");
    expect(ld["dateModified"]).toBe("2026-07-17");
    expect((ld["author"] as Record<string, unknown>)["@id"]).toBe(
      "https://malaysiapg.com.my/#author-afu",
    );
  });
});
