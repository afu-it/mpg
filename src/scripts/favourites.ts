// Client-side favourites + saved comparisons (Phase 2).
// Backed by /api/favourites and /api/compares (Cloudflare Pages Functions + D1),
// authenticated with the Clerk session token from the CDN-loaded browser SDK.
// Degrades silently when Clerk has no publishable key or the backend is not yet
// provisioned (API returns 503) — hearts simply stay empty.

type Clerk = {
  loaded?: boolean;
  user?: unknown;
  session?: { getToken: () => Promise<string | null> };
  openSignUp?: (opts?: Record<string, unknown>) => void;
  addListener?: (cb: () => void) => void;
};

const FAV_API = "/api/favourites";
const CMP_API = "/api/compares";

/** Resolve the loaded Clerk instance, or null if it never loads (~10s budget). */
function getClerk(): Promise<Clerk | null> {
  const w = window as unknown as { Clerk?: Clerk };
  if (w.Clerk?.loaded) return Promise.resolve(w.Clerk);
  return new Promise((resolve) => {
    let waited = 0;
    const t = setInterval(() => {
      if (w.Clerk?.loaded) {
        clearInterval(t);
        resolve(w.Clerk);
      } else if ((waited += 120) > 10000) {
        clearInterval(t);
        resolve(null);
      }
    }, 120);
  });
}

async function authHeaders(clerk: Clerk): Promise<HeadersInit | null> {
  try {
    const token = await clerk.session?.getToken();
    return token ? { Authorization: `Bearer ${token}` } : null;
  } catch {
    return null;
  }
}

const favourites = new Set<string>();

function paintHearts(): void {
  document
    .querySelectorAll<HTMLButtonElement>("[data-fav-slug]")
    .forEach((b) => b.setAttribute("aria-pressed", String(favourites.has(b.dataset.favSlug!))));
}

async function loadFavourites(clerk: Clerk): Promise<void> {
  favourites.clear();
  if (clerk.user) {
    const headers = await authHeaders(clerk);
    if (headers) {
      try {
        const res = await fetch(FAV_API, { headers });
        if (res.ok) {
          const data = (await res.json()) as { slugs?: string[] };
          (data.slugs ?? []).forEach((s) => favourites.add(s));
        }
      } catch {
        /* offline / not provisioned — leave empty */
      }
    }
  }
  paintHearts();
}

async function toggleFavourite(
  clerk: Clerk,
  slug: string,
  btn: HTMLButtonElement,
): Promise<void> {
  if (!clerk.user) {
    clerk.openSignUp?.({
      afterSignUpUrl: location.pathname,
      afterSignInUrl: location.pathname,
    });
    return;
  }
  const headers = await authHeaders(clerk);
  if (!headers) return;

  const adding = !favourites.has(slug);
  // optimistic
  if (adding) favourites.add(slug);
  else favourites.delete(slug);
  btn.setAttribute("aria-pressed", String(adding));

  try {
    const res = await fetch(FAV_API, {
      method: adding ? "POST" : "DELETE",
      headers: { ...headers, "content-type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    // revert on failure
    if (adding) favourites.delete(slug);
    else favourites.add(slug);
    btn.setAttribute("aria-pressed", String(!adding));
  }
}

/** Bind each heart's own click (stopPropagation beats the table row-click nav). */
function bindHearts(clerk: Clerk): void {
  document.querySelectorAll<HTMLButtonElement>("[data-fav-slug]").forEach((btn) => {
    if (btn.dataset.favBound) return;
    btn.dataset.favBound = "1";
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      void toggleFavourite(clerk, btn.dataset.favSlug!, btn);
    });
  });
}

// ---- /compare: "Save this comparison" ----
function bindSaveComparison(clerk: Clerk): void {
  const form = document.getElementById("save-compare") as HTMLFormElement | null;
  if (!form) return;
  const input = form.querySelector<HTMLInputElement>('input[name="cmp-name"]');
  const status = form.querySelector<HTMLElement>("[data-cmp-status]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ids = (new URLSearchParams(location.search).get("ids") ?? "")
      .split(",")
      .filter(Boolean);
    if (ids.length < 2) {
      if (status) status.textContent = "Pick at least 2 gateways first.";
      return;
    }
    if (!clerk.user) {
      clerk.openSignUp?.({
        afterSignUpUrl: location.pathname + location.search,
        afterSignInUrl: location.pathname + location.search,
      });
      return;
    }
    const headers = await authHeaders(clerk);
    if (!headers) return;
    const name = input?.value.trim() || `Comparison (${ids.length})`;
    try {
      const res = await fetch(CMP_API, {
        method: "POST",
        headers: { ...headers, "content-type": "application/json" },
        body: JSON.stringify({ name, ids }),
      });
      if (status) {
        status.textContent = res.ok
          ? "Saved to your favourites."
          : "Could not save (try again later).";
      }
      if (res.ok && input) input.value = "";
    } catch {
      if (status) status.textContent = "Could not save (offline).";
    }
  });
}

// ---- /favourites page renderer ----
type GwMeta = { id: string; name: string; category: string; logo: string | null; tagline: string };

function gwCard(g: GwMeta): HTMLElement {
  const a = document.createElement("a");
  a.href = `/gateway/${g.id}`;
  a.className =
    "flex items-center gap-3 rounded-lg border border-line bg-panel p-3 transition-colors hover:border-accent";
  if (g.logo) {
    const img = document.createElement("img");
    img.src = g.logo;
    img.alt = `${g.name} logo`;
    img.loading = "lazy";
    img.className = "h-6 w-auto max-w-[110px] object-contain";
    a.appendChild(img);
  }
  const text = document.createElement("div");
  text.className = "min-w-0";
  const h = document.createElement("p");
  h.className = "truncate font-medium text-fg";
  h.textContent = g.name;
  const p = document.createElement("p");
  p.className = "truncate text-xs text-muted";
  p.textContent = g.tagline;
  text.append(h, p);
  a.appendChild(text);
  return a;
}

async function renderFavouritesPage(clerk: Clerk): Promise<void> {
  const root = document.getElementById("fav-root");
  if (!root) return;
  const meta: GwMeta[] = JSON.parse(
    document.getElementById("gw-meta")?.textContent || "[]",
  );
  const byId = new Map(meta.map((g) => [g.id, g]));

  const signedOut = document.getElementById("fav-signedout");
  const favList = document.getElementById("fav-list");
  const favEmpty = document.getElementById("fav-empty");
  const cmpList = document.getElementById("cmp-list");
  const cmpEmpty = document.getElementById("cmp-empty");

  function show(el: HTMLElement | null, on: boolean) {
    if (el) el.hidden = !on;
  }

  if (!clerk.user) {
    show(signedOut, true);
    show(root, false);
    return;
  }
  show(signedOut, false);
  show(root, true);

  const headers = await authHeaders(clerk);
  if (!headers) return;

  // favourites
  if (favList) {
    favList.innerHTML = "";
    const slugs = [...favourites];
    show(favEmpty, slugs.length === 0);
    slugs.forEach((s) => {
      const g = byId.get(s);
      if (g) favList.appendChild(gwCard(g));
    });
  }

  // saved comparisons
  if (cmpList) {
    try {
      const res = await fetch(CMP_API, { headers });
      const data = res.ok
        ? ((await res.json()) as { compares?: { id: string; name: string; ids: string[] }[] })
        : { compares: [] };
      const compares = data.compares ?? [];
      cmpList.innerHTML = "";
      show(cmpEmpty, compares.length === 0);
      compares.forEach((c) => {
        const row = document.createElement("div");
        row.className =
          "flex items-center justify-between gap-3 rounded-lg border border-line bg-panel p-3";
        const link = document.createElement("a");
        link.href = `/compare?ids=${c.ids.join(",")}`;
        link.className = "min-w-0 flex-1 hover:text-accent";
        const name = document.createElement("p");
        name.className = "truncate font-medium text-fg";
        name.textContent = c.name;
        const sub = document.createElement("p");
        sub.className = "truncate text-xs text-muted";
        sub.textContent = c.ids.join(" · ");
        link.append(name, sub);
        const del = document.createElement("button");
        del.type = "button";
        del.className = "shrink-0 text-xs text-muted hover:text-accent";
        del.textContent = "remove ✕";
        del.addEventListener("click", async () => {
          const h = await authHeaders(clerk);
          if (!h) return;
          const r = await fetch(CMP_API, {
            method: "DELETE",
            headers: { ...h, "content-type": "application/json" },
            body: JSON.stringify({ id: c.id }),
          });
          if (r.ok) row.remove();
          if (!cmpList.children.length) show(cmpEmpty, true);
        });
        row.append(link, del);
        cmpList.appendChild(row);
      });
    } catch {
      show(cmpEmpty, true);
    }
  }
}

// ---- init ----
(async () => {
  const clerk = await getClerk();
  if (!clerk) return; // no Clerk (missing pk) → favourites disabled
  bindHearts(clerk);
  bindSaveComparison(clerk);
  await loadFavourites(clerk);
  await renderFavouritesPage(clerk);
  clerk.addListener?.(() => {
    void loadFavourites(clerk).then(() => renderFavouritesPage(clerk));
  });
})();
