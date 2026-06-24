// Side-by-side gateway comparison. Fully client-side over embedded JSON.
import { parseFee } from "../lib/fees";
import { splitName } from "../lib/name";

interface GW {
  id: string;
  name: string;
  category: "gateway" | "bnpl";
  website: string;
  settlement: string;
  min_txn: string;
  channels: string[];
  features: { no_code: boolean; api: boolean; recurring: boolean };
  fees: Record<string, string | undefined>;
  logo: string | null;
}

const dataEl = document.getElementById("gw-data");
const root = document.getElementById("compare-root");
if (dataEl && root) {
  const ALL: GW[] = JSON.parse(dataEl.textContent || "[]");
  const byId = new Map(ALL.map((g) => [g.id, g]));
  const MAX = 4;
  let selected: string[] = [];

  // ---- url state ----
  function readUrl() {
    const ids = new URLSearchParams(location.search).get("ids");
    selected = ids
      ? ids.split(",").filter((id) => byId.has(id)).slice(0, MAX)
      : [];
  }
  function writeUrl() {
    const u = new URL(location.href);
    if (selected.length) u.searchParams.set("ids", selected.join(","));
    else u.searchParams.delete("ids");
    history.replaceState({}, "", u);
  }

  // ---- helpers ----
  function el(tag: string, className = "", text = ""): HTMLElement {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (text) e.textContent = text;
    return e;
  }
  function logoNode(g: GW, size = 22): HTMLElement {
    if (g.logo) {
      const img = document.createElement("img");
      img.src = g.logo;
      img.alt = `${g.name} logo`;
      img.loading = "lazy";
      img.style.height = `${size}px`;
      img.className = "w-auto max-w-[110px] object-contain";
      return img;
    }
    const span = el(
      "span",
      "grid shrink-0 place-items-center rounded-sm bg-raised font-semibold text-accent",
      (g.name.trim()[0] || "?").toUpperCase(),
    );
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.fontSize = `${Math.round(size * 0.48)}px`;
    return span;
  }
  function nameNode(name: string, className = ""): HTMLElement {
    const { base, note } = splitName(name);
    const span = el("span", className);
    span.appendChild(document.createTextNode(base));
    if (note) span.appendChild(el("span", "ml-1 text-xs font-normal text-muted", note));
    return span;
  }

  type Row =
    | { label: string; kind: "fee"; key: string }
    | { label: string; kind: "text"; get: (g: GW) => string }
    | { label: string; kind: "bool"; get: (g: GW) => boolean }
    | { label: string; kind: "link"; get: (g: GW) => string };

  const ROWS: Row[] = [
    { label: "Category", kind: "text", get: (g) => (g.category === "bnpl" ? "BNPL" : "Gateway") },
    { label: "FPX", kind: "fee", key: "fpx" },
    { label: "Card (local)", kind: "fee", key: "card" },
    { label: "International card", kind: "fee", key: "card_intl" },
    { label: "E-wallet", kind: "fee", key: "ewallet" },
    { label: "DuitNow QR", kind: "fee", key: "duitnowqr" },
    { label: "BNPL", kind: "fee", key: "bnpl" },
    { label: "Setup fee", kind: "fee", key: "setup" },
    { label: "Monthly / annual", kind: "fee", key: "monthly" },
    { label: "Settlement", kind: "text", get: (g) => g.settlement },
    { label: "Min transaction", kind: "text", get: (g) => g.min_txn },
    { label: "Recurring", kind: "bool", get: (g) => g.features.recurring },
    { label: "No-code", kind: "bool", get: (g) => g.features.no_code },
    { label: "API", kind: "bool", get: (g) => g.features.api },
    { label: "Website", kind: "link", get: (g) => g.website },
  ];

  function muted(v: string) {
    return !v || v === "—" || v === "Contact sales";
  }

  // ---- render ----
  function render() {
    root!.innerHTML = "";
    const gws = selected.map((id) => byId.get(id)!).filter(Boolean);

    if (gws.length === 0) {
      const box = el(
        "div",
        "rounded-lg border border-dashed border-line p-10 text-center",
      );
      box.appendChild(el("p", "text-muted", "No gateways selected yet."));
      const hint = el("p", "mt-1 text-sm text-muted", "Choose a preset above, or add gateways to compare.");
      box.appendChild(hint);
      const add = el("button", "mt-4 rounded-md bg-accent px-4 py-2 text-sm font-medium text-black hover:opacity-90", "+ Add gateway");
      add.addEventListener("click", openPicker);
      box.appendChild(add);
      root!.appendChild(box);
      return;
    }

    const table = el("table", "w-full min-w-[560px] border-collapse text-sm");

    // header
    const thead = el("thead");
    const htr = el("tr", "border-b border-line");
    htr.appendChild(el("th", "w-40 px-3 py-3 text-left align-bottom"));
    gws.forEach((g) => {
      const th = el("th", "min-w-[150px] px-3 py-3 align-bottom");
      const wrap = el("div", "flex flex-col items-center gap-1.5");
      const a = document.createElement("a");
      a.href = `/gateway/${g.id}`;
      a.className = "flex flex-col items-center gap-1.5 text-fg hover:text-accent";
      a.appendChild(logoNode(g, 28));
      a.appendChild(nameNode(g.name, "text-center font-medium leading-tight"));
      wrap.appendChild(a);
      const rm = el("button", "text-xs text-muted hover:text-accent", "remove ✕");
      rm.addEventListener("click", () => {
        selected = selected.filter((id) => id !== g.id);
        writeUrl();
        render();
      });
      wrap.appendChild(rm);
      th.appendChild(wrap);
      htr.appendChild(th);
    });
    if (gws.length < MAX) {
      const th = el("th", "min-w-[120px] px-3 py-3 align-middle");
      const add = el("button", "rounded-md border border-dashed border-line px-3 py-2 text-sm text-muted hover:border-accent hover:text-accent", "+ Add");
      add.addEventListener("click", openPicker);
      th.appendChild(add);
      htr.appendChild(th);
    }
    thead.appendChild(htr);
    table.appendChild(thead);

    // body
    const tbody = el("tbody");
    ROWS.forEach((row, i) => {
      const tr = el("tr", i % 2 ? "bg-panel" : "");
      const label = el("th", "sticky left-0 z-10 px-3 py-2 text-left font-normal text-muted " + (i % 2 ? "bg-panel" : "bg-surface"));
      label.textContent = row.label;
      tr.appendChild(label);

      // precompute best (lowest) fee for fee rows
      let bestVal = Infinity;
      if (row.kind === "fee") {
        const nums = gws.map((g) => parseFee(g.fees[row.key] ?? "—")).filter((n) => Number.isFinite(n));
        if (nums.length >= 2) bestVal = Math.min(...nums);
      }

      gws.forEach((g) => {
        const td = el("td", "px-3 py-2 text-center");
        if (row.kind === "fee") {
          const v = g.fees[row.key] ?? "—";
          td.textContent = v;
          if (muted(v)) td.classList.add("text-muted");
          if (Number.isFinite(bestVal) && parseFee(v) === bestVal) {
            td.classList.add("font-semibold", "text-accent");
            td.title = "Lowest in this row";
          }
        } else if (row.kind === "text") {
          const v = row.get(g);
          td.textContent = v;
          if (muted(v)) td.classList.add("text-muted");
        } else if (row.kind === "bool") {
          const on = row.get(g);
          td.textContent = on ? "✓" : "—";
          td.classList.add(on ? "text-accent" : "text-muted");
        } else {
          const a = document.createElement("a");
          a.href = row.get(g);
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.className = "text-accent hover:underline";
          a.textContent = "Visit →";
          td.appendChild(a);
        }
        tr.appendChild(td);
      });
      if (gws.length < MAX) tr.appendChild(el("td"));
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    root!.appendChild(table);
  }

  // ---- picker modal ----
  function openPicker() {
    const overlay = el("div", "fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20");
    const panel = el("div", "flex max-h-[70vh] w-full max-w-sm flex-col overflow-hidden rounded-lg border border-line bg-raised");
    const head = el("div", "flex items-center justify-between border-b border-line px-4 py-3");
    head.appendChild(el("h2", "text-sm font-semibold text-fg", "Add gateway"));
    const close = el("button", "text-muted hover:text-fg", "✕");
    head.appendChild(close);
    panel.appendChild(head);

    const search = document.createElement("input");
    search.type = "search";
    search.placeholder = "Search…";
    search.className = "m-3 mb-2 rounded-md border border-line bg-panel px-3 py-2 text-sm text-fg placeholder:text-muted focus:border-accent";
    panel.appendChild(search);

    const list = el("div", "flex-1 overflow-y-auto px-2 pb-3");
    panel.appendChild(list);

    function renderList() {
      list.innerHTML = "";
      const q = search.value.trim().toLowerCase();
      const avail = ALL.filter((g) => !selected.includes(g.id) && g.name.toLowerCase().includes(q));
      if (!avail.length) {
        list.appendChild(el("p", "px-2 py-3 text-sm text-muted", "Nothing to add."));
        return;
      }
      avail.forEach((g) => {
        const btn = el("button", "flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm text-fg hover:bg-panel");
        btn.appendChild(logoNode(g, 20));
        btn.appendChild(nameNode(g.name, "flex-1"));
        if (g.category === "bnpl") btn.appendChild(el("span", "rounded-full border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-accent", "BNPL"));
        btn.addEventListener("click", () => {
          if (selected.length >= MAX) return;
          selected.push(g.id);
          writeUrl();
          render();
          if (selected.length >= MAX) destroy();
          else renderList();
        });
        list.appendChild(btn);
      });
    }
    function destroy() {
      document.removeEventListener("keydown", onKey);
      overlay.remove();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") destroy();
    }

    close.addEventListener("click", destroy);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) destroy();
    });
    document.addEventListener("keydown", onKey);
    search.addEventListener("input", renderList);

    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    renderList();
    search.focus();
  }

  // init
  readUrl();
  render();
  window.addEventListener("popstate", () => {
    readUrl();
    render();
  });
}
