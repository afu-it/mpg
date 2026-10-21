// BM pages are the English pages re-rendered at /ms/ (i18n fallback), so their
// HTML still links to "/gateways/" etc. Rewrite internal page links to the /ms/
// twin so a reader who switched to BM stays in BM. Links that must keep their
// target (the language switch) carry data-l10n="off" before href.
import { defineMiddleware } from "astro:middleware";
import { localizePath } from "./i18n/locale";

const LINK = /(<a\b[^>]*?\shref=")(\/[^"]*)"/g;

export const onRequest = defineMiddleware(async (ctx, next) => {
  const res = await next();
  if (ctx.currentLocale !== "ms") return res;
  if (!(res.headers.get("content-type") ?? "").includes("text/html")) return res;
  const html = (await res.text()).replace(LINK, (all, head: string, path: string) =>
    head.includes('data-l10n="off"') ? all : `${head}${localizePath(path, "ms")}"`,
  );
  return new Response(html, { status: res.status, headers: res.headers });
});
