// Client behaviour for the gateway comparison table: category, search, filter, sort.
// Sort values are precomputed server-side into data-sort-value attributes.
// Row links (data-href) arrive already localized from GatewayTable.astro.
import { pageLocale, tr } from "../i18n/client";

const T = tr(pageLocale(), {
  en: { custom: "Custom", popularity: "Popularity" },
  ms: { custom: "Pilihan sendiri", popularity: "Populariti" },
});

const table = document.getElementById("gw-table") as HTMLTableElement | null;

if (table && table.tBodies[0]) {
  const tbody = table.tBodies[0];
  // the "Pricing on request" divider row is presentational: excluded from
  // filtering/sorting and repositioned (or removed) by updateDivider()
  const divider = document.getElementById("gw-divider");
  const rows = () =>
    Array.from(tbody.rows).filter((r) => !r.hasAttribute("data-divider"));

  const search = document.getElementById("gw-search") as HTMLInputElement | null;
  const countEl = document.getElementById("gw-count");
  const emptyEl = document.getElementById("gw-empty");
  const resetBtn = document.getElementById("gw-reset");

  // sort dropdown (left of the search box)
  const sortRoot = document.getElementById("gw-sort");
  const sortTrigger = document.getElementById("gw-sort-trigger");
  const sortMenu = document.getElementById("gw-sort-menu");
  const sortLabel = document.getElementById("gw-sort-label");
  const sortItems = Array.from(
    sortMenu?.querySelectorAll<HTMLButtonElement>("[data-sort-key]") ?? [],
  );
  // initial DOM order = server default (lowest fee, then popularity, then name)
  const defaultOrder = Array.from(tbody.rows).filter(
    (r) => !r.hasAttribute("data-divider"),
  );

  // the divider only makes sense under the blended "Lowest fees" order, where
  // ranked and on-request rows form two contiguous zones
  let sortMode = "value";
  function updateDivider() {
    if (!divider) return;
    divider.remove();
    if (sortMode !== "value") return;
    const visible = rows().filter((r) => !r.hidden);
    const firstOnRequest = visible.find((r) => r.dataset.rankable === "false");
    // skip when a zone is empty (nothing ranked above, or nothing on request)
    if (!firstOnRequest || visible.indexOf(firstOnRequest) === 0) return;
    tbody.insertBefore(divider, firstOnRequest);
  }

  const categoryInputs = Array.from(
    document.querySelectorAll<HTMLInputElement>('input[name="gw-category"]'),
  );
  const channelInputs = Array.from(
    document.querySelectorAll<HTMLInputElement>("input[data-filter-channel]"),
  );
  const featureInputs = Array.from(
    document.querySelectorAll<HTMLInputElement>("input[data-filter-feature]"),
  );

  function activeCategory(): string {
    return categoryInputs.find((i) => i.checked)?.value ?? "all";
  }

  function applyFilters() {
    const q = (search?.value ?? "").trim().toLowerCase();
    const cat = activeCategory();
    const channels = channelInputs.filter((i) => i.checked).map((i) => i.getAttribute("data-filter-channel")!);
    const features = featureInputs.filter((i) => i.checked).map((i) => i.getAttribute("data-filter-feature")!);

    let visible = 0;
    for (const row of rows()) {
      const name = row.getAttribute("data-name") ?? "";
      const rowCat = row.getAttribute("data-category") ?? "gateway";
      const rowChannels = (row.getAttribute("data-channels") ?? "").split(" ");

      let ok = cat === "all" || rowCat === cat;
      if (ok && q) ok = name.includes(q);
      if (ok) for (const c of channels) if (!rowChannels.includes(c)) { ok = false; break; }
      if (ok) for (const f of features) if (row.getAttribute(`data-${f}`) !== "true") { ok = false; break; }

      row.hidden = !ok;
      if (ok) visible++;
    }

    if (countEl) countEl.textContent = String(visible);
    if (emptyEl) emptyEl.hidden = visible !== 0;
    updateDivider();
    updateFilterCount();
  }

  // mobile Filters button badge: how many filters differ from the default state
  const filterCountEl = document.getElementById("gw-filters-count");
  function updateFilterCount() {
    if (!filterCountEl) return;
    let n = channelInputs.filter((i) => i.checked).length + featureInputs.filter((i) => i.checked).length;
    if (activeCategory() !== "gateway") n++;
    filterCountEl.textContent = String(n);
    filterCountEl.hidden = n === 0;
  }

  categoryInputs.forEach((i) => i.addEventListener("change", applyFilters));
  channelInputs.forEach((i) => i.addEventListener("change", applyFilters));
  featureInputs.forEach((i) => i.addEventListener("change", applyFilters));
  search?.addEventListener("input", applyFilters);

  resetBtn?.addEventListener("click", () => {
    if (search) search.value = "";
    channelInputs.forEach((i) => (i.checked = false));
    featureInputs.forEach((i) => (i.checked = false));
    const def = categoryInputs.find((i) => i.value === "gateway") ?? categoryInputs[0];
    if (def) def.checked = true;
    applyFilters();
  });

  // ---- sorting ----
  const headerCells = Array.from(table.tHead?.rows[0]?.cells ?? []);
  // map a channel key (fpx/card/ewallet/…) to its column index, for per-channel sorts
  const colIndex: Record<string, number> = {};
  headerCells.forEach((cell, i) => {
    const k = cell.getAttribute("data-col-key");
    if (k) colIndex[k] = i;
  });
  let sortIndex = -1;
  let sortDir: "asc" | "desc" = "asc";

  function sortRows(index: number, type: string, dir: "asc" | "desc") {
    const sorted = rows().sort((a, b) => {
      const ca = a.cells[index];
      const cb = b.cells[index];
      const av = ca.getAttribute("data-sort-value") ?? ca.textContent!.trim();
      const bv = cb.getAttribute("data-sort-value") ?? cb.textContent!.trim();

      let cmp: number;
      if (type === "num") {
        const na = parseFloat(av);
        const nb = parseFloat(bv);
        cmp = na === nb ? 0 : na < nb ? -1 : 1; // handles Infinity safely
      } else {
        cmp = av.localeCompare(bv);
      }
      return dir === "asc" ? cmp : -cmp;
    });

    for (const row of sorted) tbody.appendChild(row);
  }

  headerCells.forEach((th, index) => {
    const btn = th.querySelector<HTMLButtonElement>("button[data-sort-type]");
    if (!btn) return;
    const type = btn.getAttribute("data-sort-type") ?? "text";

    btn.addEventListener("click", () => {
      sortDir = sortIndex === index && sortDir === "asc" ? "desc" : "asc";
      sortIndex = index;
      headerCells.forEach((cell) => cell.setAttribute("aria-sort", "none"));
      th.setAttribute("aria-sort", sortDir === "asc" ? "ascending" : "descending");
      sortRows(index, type, sortDir);
      // a column header now drives the sort: clear the dropdown's selection
      sortItems.forEach((i) => i.setAttribute("aria-checked", "false"));
      if (sortLabel) sortLabel.textContent = T.custom;
      sortMode = "custom";
      updateDivider();
    });
  });

  // ---- sort dropdown (higher-level sort entry point) ----
  function setMenuOpen(open: boolean) {
    if (!sortMenu || !sortTrigger) return;
    sortMenu.hidden = !open;
    sortTrigger.setAttribute("aria-expanded", String(open));
  }

  function cmpNum(av: string, bv: string) {
    const a = parseFloat(av);
    const b = parseFloat(bv);
    return a === b ? 0 : a < b ? -1 : 1; // Infinity-safe (unknown fees sink)
  }

  function colVal(row: HTMLTableRowElement, idx: number): string {
    const c = row.cells[idx];
    return c ? (c.getAttribute("data-sort-value") ?? c.textContent ?? "") : "";
  }

  function applyDropdownSort(key: string) {
    let sorted: HTMLTableRowElement[];
    if (key === "value") {
      // Lowest fees = blended effective cost; "On request" rows (Infinity) sink.
      sorted = [...defaultOrder].sort((a, b) =>
        cmpNum(a.dataset.value ?? "Infinity", b.dataset.value ?? "Infinity"),
      );
    } else if (key === "popularity") {
      sorted = [...defaultOrder].sort((a, b) => {
        const pa = parseFloat(a.dataset.popularity ?? "0");
        const pb = parseFloat(b.dataset.popularity ?? "0");
        if (pa !== pb) return pb - pa; // higher popularity first
        return (a.dataset.name ?? "").localeCompare(b.dataset.name ?? "");
      });
    } else if (key === "name-asc") {
      sorted = [...defaultOrder].sort((a, b) =>
        (a.dataset.name ?? "").localeCompare(b.dataset.name ?? ""),
      );
    } else if (key === "name-desc") {
      sorted = [...defaultOrder].sort((a, b) =>
        (b.dataset.name ?? "").localeCompare(a.dataset.name ?? ""),
      );
    } else if (key in colIndex) {
      // per-channel sort (Lowest FPX / card / e-wallet) by effective cost, asc
      const idx = colIndex[key];
      sorted = [...defaultOrder].sort((a, b) => cmpNum(colVal(a, idx), colVal(b, idx)));
    } else {
      sorted = defaultOrder; // restore server default order
    }
    for (const row of sorted) tbody.appendChild(row);
    // dropdown owns the sort now: clear header arrows
    headerCells.forEach((cell) => cell.setAttribute("aria-sort", "none"));
    sortIndex = -1;
    sortMode = key;
    updateDivider();
  }

  sortTrigger?.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenuOpen(Boolean(sortMenu?.hidden));
  });

  sortItems.forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.dataset.sortKey ?? "popularity";
      sortItems.forEach((i) => i.setAttribute("aria-checked", String(i === item)));
      if (sortLabel) sortLabel.textContent = item.dataset.sortLabel ?? T.popularity;
      applyDropdownSort(key);
      setMenuOpen(false);
    });
  });

  document.addEventListener("click", (e) => {
    if (sortRoot && !sortRoot.contains(e.target as Node)) setMenuOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenuOpen(false);
  });

  // ---- whole-row click → detail page (links still work) ----
  rows().forEach((row) => {
    const href = row.getAttribute("data-href");
    if (!href) return;
    row.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).closest("a")) return;
      window.location.href = href;
    });
  });

  // deep-link support: /gateways?category=bank preselects that filter (used by /learn)
  const urlCat = new URLSearchParams(location.search).get("category");
  if (urlCat) {
    const match = categoryInputs.find((i) => i.value === urlCat);
    if (match) match.checked = true;
  }

  // ---- mobile filter drawer (spec 14): same <aside>, slid in from the left ----
  const drawer = document.getElementById("gw-filters");
  const drawerScrim = document.getElementById("gw-filters-scrim");
  const drawerOpenBtn = document.getElementById("gw-filters-open");
  const drawerCloseBtn = document.getElementById("gw-filters-close");

  function setDrawer(open: boolean) {
    if (!drawer || !drawerScrim) return;
    if (open) drawer.setAttribute("data-open", "");
    else drawer.removeAttribute("data-open");
    drawerScrim.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    drawerOpenBtn?.setAttribute("aria-expanded", String(open));
    if (open) drawerCloseBtn?.focus();
    else drawerOpenBtn?.focus();
  }

  drawerOpenBtn?.addEventListener("click", () => setDrawer(true));
  drawerCloseBtn?.addEventListener("click", () => setDrawer(false));
  drawerScrim?.addEventListener("click", () => setDrawer(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer?.hasAttribute("data-open")) setDrawer(false);
  });

  // apply default (or deep-linked) category on load
  applyFilters();
}

// Fit the scroll box into the space left below it on first view, so its sideways
// scrollbar sits on screen without scrolling the page. Too little room (short
// screens) falls back to a full screen minus the site header.
const scrollBox = table?.closest<HTMLElement>(".gw-scroll");
if (scrollBox) {
  const fit = () => {
    const top = scrollBox.getBoundingClientRect().top + window.scrollY;
    const room = window.innerHeight - top - 16;
    const headerH = document.querySelector("header")?.getBoundingClientRect().height ?? 80;
    scrollBox.style.maxHeight = `${room >= 360 ? room : window.innerHeight - headerH - 16}px`;
  };
  fit();
  window.addEventListener("resize", fit);
}
