// Shared JSON-LD builders. Every url/item value carries a trailing slash so
// structured data always matches the canonical and sitemap URL form.

export interface Crumb {
  name: string;
  /** site-relative path with trailing slash; omit on the current (last) crumb */
  path?: string;
}

export function breadcrumbLd(site: string, crumbs: Crumb[]): object {
  const base = site.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: `${base}${c.path}` } : {}),
    })),
  };
}
