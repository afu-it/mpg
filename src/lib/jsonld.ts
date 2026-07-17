// Shared JSON-LD builders. Every url/item value carries a trailing slash so
// structured data always matches the canonical and sitemap URL form.

export interface Crumb {
  name: string;
  /** site-relative path with trailing slash; omit on the current (last) crumb */
  path?: string;
}

/**
 * Compact sitewide Organization node. Uses the same @id as the homepage's
 * WebSite/Organization graph so Google merges them into one entity (spec 12).
 */
export function organizationLd(site: string): object {
  const base = site.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: "Malaysia Payment Gateway (MPG)",
    url: `${base}/`,
    logo: `${base}/icon-512.png`,
    sameAs: ["https://github.com/afu-it/mpg"],
  };
}

/** TechArticle for the /learn guides; dateModified = newest fee verification. */
export function techArticleLd(
  site: string,
  path: string,
  headline: string,
  description: string,
  dateModified?: string,
): object {
  const base = site.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline,
    description,
    url: `${base}${path}`,
    inLanguage: "en",
    ...(dateModified ? { dateModified } : {}),
    author: { "@id": `${base}/#organization` },
    publisher: { "@id": `${base}/#organization` },
  };
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
