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
    });
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

  // apply default category (Gateways) on load
  applyFilters();
}
