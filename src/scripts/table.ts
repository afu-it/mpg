// Client behaviour for the gateway comparison table: category, search, filter, sort.
// Sort values are precomputed server-side into data-sort-value attributes.

const table = document.getElementById("gw-table") as HTMLTableElement | null;

if (table && table.tBodies[0]) {
  const tbody = table.tBodies[0];
  const rows = () => Array.from(tbody.rows);

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
  // initial DOM order = server default (popularity, then value, then name)
  const defaultOrder = Array.from(tbody.rows);

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
      if (sortLabel) sortLabel.textContent = "Custom";
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

  function applyDropdownSort(key: string) {
    let sorted: HTMLTableRowElement[];
    if (key === "value") {
      sorted = [...defaultOrder].sort((a, b) =>
        cmpNum(a.dataset.value ?? "Infinity", b.dataset.value ?? "Infinity"),
      );
    } else if (key === "name-asc") {
      sorted = [...defaultOrder].sort((a, b) =>
        (a.dataset.name ?? "").localeCompare(b.dataset.name ?? ""),
      );
    } else if (key === "name-desc") {
      sorted = [...defaultOrder].sort((a, b) =>
        (b.dataset.name ?? "").localeCompare(a.dataset.name ?? ""),
      );
    } else {
      sorted = defaultOrder; // popularity = restore server default order
    }
    for (const row of sorted) tbody.appendChild(row);
    // dropdown owns the sort now: clear header arrows
    headerCells.forEach((cell) => cell.setAttribute("aria-sort", "none"));
    sortIndex = -1;
  }

  sortTrigger?.addEventListener("click", (e) => {
    e.stopPropagation();
    setMenuOpen(Boolean(sortMenu?.hidden));
  });

  sortItems.forEach((item) => {
    item.addEventListener("click", () => {
      const key = item.dataset.sortKey ?? "popularity";
      sortItems.forEach((i) => i.setAttribute("aria-checked", String(i === item)));
      if (sortLabel) sortLabel.textContent = item.dataset.sortLabel ?? "Popularity";
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

  // apply default (or deep-linked) category on load
  applyFilters();
}
