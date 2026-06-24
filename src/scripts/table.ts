// Client behaviour for the gateway comparison table: search, filter, sort.
// Sort values are precomputed server-side into data-sort-value attributes.

const table = document.getElementById("gw-table") as HTMLTableElement | null;

if (table && table.tBodies[0]) {
  const tbody = table.tBodies[0];
  const rows = () => Array.from(tbody.rows);

  const search = document.getElementById("gw-search") as HTMLInputElement | null;
  const countEl = document.getElementById("gw-count");
  const emptyEl = document.getElementById("gw-empty");

  const channelBtns = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-filter-channel]"),
  );
  const featureBtns = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-filter-feature]"),
  );

  const activeChannels = new Set<string>();
  const activeFeatures = new Set<string>();

  function applyFilters() {
    const q = (search?.value ?? "").trim().toLowerCase();
    let visible = 0;

    for (const row of rows()) {
      const name = row.getAttribute("data-name") ?? "";
      const channels = (row.getAttribute("data-channels") ?? "").split(" ");

      let ok = !q || name.includes(q);
      if (ok) {
        for (const c of activeChannels) {
          if (!channels.includes(c)) {
            ok = false;
            break;
          }
        }
      }
      if (ok) {
        for (const f of activeFeatures) {
          if (row.getAttribute(`data-${f}`) !== "true") {
            ok = false;
            break;
          }
        }
      }

      row.hidden = !ok;
      if (ok) visible++;
    }

    if (countEl) countEl.textContent = String(visible);
    if (emptyEl) emptyEl.hidden = visible !== 0;
  }

  function toggleChip(set: Set<string>, key: string, btn: HTMLButtonElement) {
    if (set.has(key)) {
      set.delete(key);
      btn.setAttribute("aria-pressed", "false");
    } else {
      set.add(key);
      btn.setAttribute("aria-pressed", "true");
    }
    applyFilters();
  }

  search?.addEventListener("input", applyFilters);
  channelBtns.forEach((btn) =>
    btn.addEventListener("click", () =>
      toggleChip(activeChannels, btn.getAttribute("data-filter-channel")!, btn),
    ),
  );
  featureBtns.forEach((btn) =>
    btn.addEventListener("click", () =>
      toggleChip(activeFeatures, btn.getAttribute("data-filter-feature")!, btn),
    ),
  );

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
}
