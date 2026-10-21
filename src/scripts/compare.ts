// Side-by-side gateway comparison. Fully client-side over embedded JSON.
import { effectiveCostAt, gatewayCost, parseFeeShape } from "../lib/fees";
import { splitName } from "../lib/name";
import { FPX_BANKS } from "../lib/fpx-banks";
import { accessInfo } from "../lib/access";
import { pageLocale, tr, href } from "../i18n/client";

const T = tr(pageLocale(), {
  en: {
    logo: (n: string) => `${n} logo`,
    groups: {
      Overview: "Overview",
      "Transaction fees": "Transaction fees",
      "Account & payouts": "Account & payouts",
      Features: "Features",
      Developer: "Developer",
    },
    cat: { bnpl: "BNPL", bank: "Bank", ewallet: "E-wallet", infrastructure: "Infrastructure", gateway: "Gateway" },
    rows: {
      category: "Category",
      access: "Access",
      card: "Card (local)",
      card_intl: "International card",
      ewallet: "E-wallet",
      setup: "Setup fee",
      monthly: "Monthly / annual",
      settlement: "Settlement",
      min_txn: "Min transaction",
      recurring: "Recurring",
      no_code: "No-code",
      banks: "Banks",
      methods: "Other methods",
      webhooks: "Webhooks",
      mcp: "MCP (AI agent)",
      plugins: "Plugins",
      website: "Website",
    },
    viaFpx: (n: number) => `${n} via FPX`,
    nBanks: (n: number) => `${n} banks`,
    official: "Official",
    community: "Community",
    contactSales: "Contact sales",
    noneYet: "No gateways selected yet.",
    noneHint: "Choose a preset above, or add gateways to compare.",
    addGateway: "+ Add gateway",
    estHead: "Est. fee per RM100 sale",
    onRequest: "On request",
    cheapest: "Cheapest",
    remove: (n: string) => `Remove ${n}`,
    removeTitle: "Remove",
    add: "+ Add",
    lowest: "Lowest in this row",
    fastest: "Fastest payout in this comparison",
    showLess: "show less",
    more: (n: number) => `+${n} more`,
    visit: "Visit →",
    allMatch: "These gateways match on every row except their website.",
    pickerTitle: "Add gateway",
    close: "Close",
    search: "Search…",
    types: { all: "All", gateway: "Gateways", bank: "Banks", bnpl: "BNPL", ewallet: "E-wallets" },
    chCard: "Card",
    chEwallet: "E-wallet",
    cheapestFirst: "Cheapest first",
    supports: "Supports",
    maxReached: (n: number) => `You can compare up to ${n}. Remove one with ✕ first.`,
    count: (n: number) => `${n} ${n === 1 ? "provider" : "providers"}`,
    noMatch: "No provider matches these filters.",
  },
  ms: {
    logo: (n: string) => `Logo ${n}`,
    groups: {
      Overview: "Ringkasan",
      "Transaction fees": "Caj transaksi",
      "Account & payouts": "Akaun & duit masuk",
      Features: "Ciri",
      Developer: "Developer",
    },
    cat: { bnpl: "BNPL", bank: "Bank", ewallet: "E-wallet", infrastructure: "Infrastruktur", gateway: "Gateway" },
    rows: {
      category: "Jenis",
      access: "Cara mula",
      card: "Kad (tempatan)",
      card_intl: "Kad luar negara",
      ewallet: "E-wallet",
      setup: "Fee setup",
      monthly: "Bulanan / tahunan",
      settlement: "Duit masuk",
      min_txn: "Transaksi minimum",
      recurring: "Caj berulang",
      no_code: "Tanpa kod",
      banks: "Bank",
      methods: "Cara bayar lain",
      webhooks: "Webhook",
      mcp: "MCP (AI agent)",
      plugins: "Plugin",
      website: "Laman web",
    },
    viaFpx: (n: number) => `${n} melalui FPX`,
    nBanks: (n: number) => `${n} bank`,
    official: "Rasmi",
    community: "Komuniti",
    contactSales: "Hubungi jualan",
    noneYet: "Belum ada gateway dipilih.",
    noneHint: "Pilih set siap di atas, atau tambah gateway sendiri untuk dibandingkan.",
    addGateway: "+ Tambah gateway",
    estHead: "Anggaran caj bagi jualan RM100",
    onRequest: "Atas permintaan",
    cheapest: "Paling murah",
    remove: (n: string) => `Buang ${n}`,
    removeTitle: "Buang",
    add: "+ Tambah",
    lowest: "Paling rendah dalam baris ini",
    fastest: "Duit masuk paling cepat dalam perbandingan ini",
    showLess: "tunjuk kurang",
    more: (n: number) => `+${n} lagi`,
    visit: "Lawat →",
    allMatch: "Gateway ini sama pada setiap baris kecuali laman web.",
    pickerTitle: "Tambah gateway",
    close: "Tutup",
    search: "Cari…",
    types: { all: "Semua", gateway: "Gateway", bank: "Bank", bnpl: "BNPL", ewallet: "E-wallet" },
    chCard: "Kad",
    chEwallet: "E-wallet",
    cheapestFirst: "Paling murah dulu",
    supports: "Terima",
    maxReached: (n: number) => `Anda boleh bandingkan sampai ${n} sahaja. Buang satu dengan ✕ dulu.`,
    count: (n: number) => `${n} penyedia`,
    noMatch: "Tiada penyedia yang ikut penapis ini.",
  },
});

interface GW {
  id: string;
  name: string;
  category: "gateway" | "bank" | "ewallet" | "bnpl" | "infrastructure";
  website: string;
  settlement: string;
  /** English settlement text, parsed for payout speed (display text may be BM) */
  settlementEn?: string;
  min_txn: string;
  channels: string[];
  features: { no_code: boolean; api: boolean; recurring: boolean };
  fees: Record<string, string | undefined>;
  methods: string[];
  banks: string[];
  mcp: "official" | "community" | "none";
  webhooks: boolean | null;
  plugins: string[];
  logo: string | null;
}

const dataEl = document.getElementById("gw-data");
const root = document.getElementById("compare-root");
if (dataEl && root) {
  const ALL: GW[] = JSON.parse(dataEl.textContent || "[]");
  // method / plugin name -> official mark url (names without a mark stay as text)
  const BRAND: Record<string, { url: string; light: boolean }> = JSON.parse(document.getElementById("brand-icons")?.textContent || "{}");
  const byId = new Map(ALL.map((g) => [g.id, g]));
  const MAX = 7;
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
      img.alt = T.logo(g.name);
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

  type Group = "Overview" | "Transaction fees" | "Account & payouts" | "Features" | "Developer";
  type Row = { group: Group } & (
    | { label: string; kind: "fee"; key: string }
    | { label: string; kind: "text"; get: (g: GW) => string }
    | { label: string; kind: "bool"; get: (g: GW) => boolean }
    | { label: string; kind: "link"; get: (g: GW) => string }
    | { label: string; kind: "list"; get: (g: GW) => string[] }
  );

  // per-transaction fee rows get a "≈ RMx.xx" cost annotation on a RM100 ticket
  // (setup/monthly are one-off or recurring charges, so a ticket cost is meaningless)
  const TICKET_FEES = new Set(["fpx", "card", "card_intl", "ewallet", "duitnowqr", "bnpl"]);

  const categoryLabel = (g: GW) => T.cat[g.category] ?? T.cat.gateway;
  const accessLabel = (g: GW) => accessInfo(g.category, pageLocale()).short;
  // "Contact sales" is a placeholder, so it reads in the page language
  const feeText = (v: string) => (v === "Contact sales" ? T.contactSales : v);

  const ROWS: Row[] = [
    { group: "Overview", label: T.rows.category, kind: "text", get: categoryLabel },
    { group: "Overview", label: T.rows.access, kind: "text", get: accessLabel },
    { group: "Transaction fees", label: "FPX", kind: "fee", key: "fpx" },
    { group: "Transaction fees", label: T.rows.card, kind: "fee", key: "card" },
    { group: "Transaction fees", label: T.rows.card_intl, kind: "fee", key: "card_intl" },
    { group: "Transaction fees", label: T.rows.ewallet, kind: "fee", key: "ewallet" },
    { group: "Transaction fees", label: "DuitNow QR", kind: "fee", key: "duitnowqr" },
    { group: "Transaction fees", label: "BNPL", kind: "fee", key: "bnpl" },
    { group: "Account & payouts", label: T.rows.setup, kind: "fee", key: "setup" },
    { group: "Account & payouts", label: T.rows.monthly, kind: "fee", key: "monthly" },
    { group: "Account & payouts", label: T.rows.settlement, kind: "text", get: (g) => g.settlement },
    { group: "Account & payouts", label: T.rows.min_txn, kind: "text", get: (g) => g.min_txn },
    { group: "Features", label: T.rows.recurring, kind: "bool", get: (g) => g.features.recurring },
    { group: "Features", label: T.rows.no_code, kind: "bool", get: (g) => g.features.no_code },
    {
      group: "Features",
      label: T.rows.banks,
      kind: "text",
      get: (g) =>
        g.channels.includes("fpx")
          ? T.viaFpx(FPX_BANKS.length + g.banks.length)
          : g.banks.length
            ? T.nBanks(g.banks.length)
            : "—",
    },
    { group: "Features", label: T.rows.methods, kind: "list", get: (g) => g.methods },
    { group: "Developer", label: "API", kind: "bool", get: (g) => g.features.api },
    {
      group: "Developer",
      label: T.rows.webhooks,
      kind: "text",
      get: (g) => (g.webhooks === true ? "✓" : "—"),
    },
    {
      group: "Developer",
      label: T.rows.mcp,
      kind: "text",
      get: (g) =>
        g.mcp === "official" ? T.official : g.mcp === "community" ? T.community : "—",
    },
    { group: "Developer", label: T.rows.plugins, kind: "list", get: (g) => g.plugins },
    { group: "Developer", label: T.rows.website, kind: "link", get: (g) => g.website },
  ];

  function muted(v: string) {
    return !v || v === "—" || v === "Contact sales";
  }

  // comparable value of a row for one gateway; "show differences only" hides rows where all match
  function rowKey(row: Row, g: GW): string {
    if (row.kind === "fee") return g.fees[row.key] ?? "—";
    if (row.kind === "bool") return String(row.get(g));
    if (row.kind === "list") return row.get(g).join("|");
    return row.get(g);
  }

  // payout speed in days from strings like "T+1 (next business day)"; NaN when unpublished
  function settleDays(s: string): number {
    const t = s.toLowerCase();
    if (/instant|same.?day|real.?time|t\s*\+?\s*0\b/.test(t)) return 0;
    const m = t.match(/t\s*\+\s*(\d+)/) ?? t.match(/(\d+)\s*(?:business|working)?\s*days?/);
    return m ? Number(m[1]) : NaN;
  }

  // the lowest value wins; ties share the badge, and nobody wins when everyone is equal
  function winners(vals: number[]): boolean[] {
    const nums = vals.filter((n) => Number.isFinite(n));
    if (nums.length < 2) return vals.map(() => false);
    const best = Math.min(...nums);
    if (nums.every((n) => n === best) && nums.length === vals.length) return vals.map(() => false);
    return vals.map((n) => n === best);
  }

  // on by default (the checkbox ships checked); read it back in case the browser restored an older state
  const diffToggle = document.getElementById("compare-diff") as HTMLInputElement | null;
  let diffOnly = diffToggle?.checked ?? true;
  diffToggle?.addEventListener("change", () => {
    diffOnly = diffToggle.checked;
    render();
  });
  document.getElementById("compare-add")?.addEventListener("click", () => openPicker());

  // ---- render ----
  function render() {
    root!.innerHTML = "";
    const gws = selected.map((id) => byId.get(id)!).filter(Boolean);

    if (gws.length === 0) {
      const box = el(
        "div",
        "rounded-lg border border-dashed border-line p-10 text-center",
      );
      box.appendChild(el("p", "text-muted", T.noneYet));
      const hint = el("p", "mt-1 text-sm text-muted", T.noneHint);
      box.appendChild(hint);
      const add = el("button", "mt-4 rounded-md bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:opacity-90", T.addGateway);
      add.addEventListener("click", openPicker);
      box.appendChild(add);
      root!.appendChild(box);
      return;
    }

    // columns keep a fixed width so a short shortlist stays compact instead of spreading across the page
    const table = el("table", "w-auto min-w-[560px] border-collapse text-sm");

    // header
    const thead = el("thead");
    const htr = el("tr");
    // corner cell sticks with the label column; narrower on phones (spec 14)
    htr.appendChild(el("th", "sticky left-0 z-10 w-28 border-b border-line bg-surface px-3 pb-4 text-left align-bottom text-xs font-normal text-muted sm:w-40", T.estHead));
    headRow = htr;
    // header stays compact: name + blended cost; per-row winners are highlighted in the table itself
    const costs = gws.map((g) => gatewayCost(g.fees));
    const cheapest = winners(costs.map((c) => (c.rankable ? c.cost : NaN)));
    headCells = [];
    gws.forEach((g, gi) => {
      const th = el("th", "w-44 min-w-[150px] border-b border-line px-2 pb-4 pt-2 align-top");
      const wrap = el("div", "group relative flex flex-col items-center gap-1 font-normal");
      const a = document.createElement("a");
      a.href = href(`/gateway/${g.id}/`);
      a.className = "flex flex-col items-center gap-1.5 text-fg hover:text-accent";
      a.appendChild(logoNode(g, 28));
      a.appendChild(nameNode(g.name, "text-center font-medium leading-tight"));
      wrap.appendChild(a);
      wrap.appendChild(
        el(
          "p",
          costs[gi].rankable
            ? `mt-1 text-xl font-semibold tabular-nums ${cheapest[gi] ? "text-accent" : "text-white"}`
            : "mt-2 text-sm text-muted",
          costs[gi].rankable ? `RM${costs[gi].cost.toFixed(2)}` : T.onRequest,
        ),
      );
      // fixed-height line so every column's price sits on the same baseline
      wrap.appendChild(el("p", "h-4 text-[10px] font-medium uppercase tracking-widest text-accent", cheapest[gi] ? T.cheapest : ""));
      // remove control shows on hover/focus on desktop so seven ✕ marks don't clutter the header; always visible on touch
      const rm = el("button", "absolute -top-1 right-0 grid size-6 place-items-center rounded-full text-muted hover:bg-raised hover:text-white focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100", "✕");
      rm.setAttribute("aria-label", T.remove(splitName(g.name).base));
      rm.title = T.removeTitle;
      rm.addEventListener("click", () => {
        selected = selected.filter((id) => id !== g.id);
        writeUrl();
        render();
      });
      wrap.appendChild(rm);
      th.appendChild(wrap);
      htr.appendChild(th);
      headCells.push({ th, g, price: costs[gi].rankable ? `RM${costs[gi].cost.toFixed(2)}` : T.onRequest });
    });
    // header-only add slot: body rows stop at the last provider, so no empty striped column
    if (gws.length < MAX) {
      const th = el("th", "w-32 px-3 pb-4 pt-2 align-top");
      const add = el("button", "mt-6 rounded-md border border-dashed border-line px-3 py-2 text-sm text-muted hover:border-accent hover:text-accent", T.add);
      add.addEventListener("click", openPicker);
      th.appendChild(add);
      htr.appendChild(th);
    }
    thead.appendChild(htr);
    table.appendChild(thead);

    // body
    const tbody = el("tbody");
    // shared expand state: toggling any list cell expands every provider column at once
    let listExpanded = false;
    const listDraws: Array<() => void> = [];
    const cols = gws.length;
    const fastest = winners(gws.map((g) => settleDays(g.settlementEn ?? g.settlement)));
    const visible = ROWS.filter(
      (row) => !diffOnly || gws.length < 2 || new Set(gws.map((g) => rowKey(row, g))).size > 1,
    );
    let group: Group | null = null;
    let i = 0;
    visible.forEach((row) => {
      if (row.group !== group) {
        group = row.group;
        i = 0;
        // group headings are a filled band across the table so they read as section boxes, not rows
        const gtr = el("tr");
        const gth = el("th", "border-y border-line bg-raised px-3 py-2 text-left");
        (gth as HTMLTableCellElement).colSpan = cols + 1;
        // label sticks to the left edge while the table scrolls sideways on phones
        gth.appendChild(el("span", "sticky left-3 text-xs font-semibold uppercase tracking-widest text-white", T.groups[group]));
        gtr.appendChild(gth);
        tbody.appendChild(gtr);
      }
      i++;
      const tr = el("tr", i % 2 ? "" : "bg-panel");
      const label = el("th", "sticky left-0 z-10 max-w-28 whitespace-normal px-3 py-2 text-left font-normal text-muted sm:max-w-none " + (i % 2 ? "bg-surface" : "bg-panel"));
      label.textContent = row.label;
      if (row.kind === "fee" && row.key === "duitnowqr") label.style.color = "#e61f65"; // DuitNow brand
      if (row.kind === "fee" && row.key === "fpx") label.style.color = "#6f83cc"; // FPX navy (lightened for dark)
      tr.appendChild(label);

      // precompute best (lowest) fee for fee rows
      let bestVal = Infinity;
      if (row.kind === "fee") {
        const nums = gws.map((g) => effectiveCostAt(g.fees[row.key] ?? "—", 100)).filter((n) => Number.isFinite(n));
        // a tie across every provider has no winner, so nothing is highlighted
        if (nums.length >= 2 && !(nums.length === gws.length && nums.every((n) => n === nums[0]))) bestVal = Math.min(...nums);
      }

      gws.forEach((g) => {
        const td = el("td", "border-l border-line px-3 py-2 text-center");
        if (row.kind === "fee") {
          const v = g.fees[row.key] ?? "—";
          const shape = parseFeeShape(v);
          // %-based fees get a ringgit annotation so they compare against flat "RMx" rates
          if (TICKET_FEES.has(row.key) && shape.known && shape.pct > 0) {
            td.appendChild(el("div", "", feeText(v)));
            td.appendChild(el("div", "text-[11px] text-muted", `≈ RM${effectiveCostAt(v, 100).toFixed(2)}`));
          } else {
            td.textContent = feeText(v);
          }
          if (muted(v)) td.classList.add("text-muted");
          if (Number.isFinite(bestVal) && effectiveCostAt(v, 100) === bestVal) {
            td.classList.add("font-semibold", "text-accent");
            td.title = T.lowest;
          }
        } else if (row.kind === "text") {
          const v = row.get(g);
          td.textContent = v;
          if (muted(v)) td.classList.add("text-muted");
          if (row.label === T.rows.settlement && fastest[gws.indexOf(g)]) {
            td.classList.add("font-semibold", "text-accent");
            td.title = T.fastest;
          }
        } else if (row.kind === "bool") {
          const on = row.get(g);
          td.textContent = on ? "✓" : "—";
          td.classList.add(on ? "text-accent" : "text-muted");
        } else if (row.kind === "list") {
          const items = row.get(g);
          if (!items.length) {
            td.textContent = "—";
            td.classList.add("text-muted");
          } else {
            // marks first (compact), text-only names after; products sharing one mark
            // (Boost + Boost PayFlex) show it once, with every name in the tooltip
            const LIMIT = 8;
            const marks = new Map<string, string[]>();
            items.filter((m) => BRAND[m]).forEach((m) => marks.set(BRAND[m].url, [...(marks.get(BRAND[m].url) ?? []), m]));
            const ordered: Array<{ names: string[]; url?: string }> = [
              ...[...marks].map(([url, names]) => ({ url, names })),
              ...items.filter((m) => !BRAND[m]).map((m) => ({ names: [m] })),
            ];
            const wrap = el("div", "mx-auto flex max-w-[10.5rem] flex-wrap items-center justify-center gap-1.5");
            const mark = (names: string[], url: string) => {
              // marks sit bare on the row; dark marks get a white outline that follows their shape
              const light = BRAND[names[0]].light;
              const tile = el(
                "span",
                "group/mark relative inline-flex h-7 min-w-7 items-center justify-center rounded px-1 outline-none focus-visible:ring-1 focus-visible:ring-accent",
              );
              // instant styled tooltip (native title is slow and plain); keyboard users get it on focus
              tile.tabIndex = 0;
              tile.appendChild(
                el(
                  "span",
                  "pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-raised px-2 py-1 text-[11px] font-medium text-fg opacity-0 shadow-lg transition-opacity duration-100 group-hover/mark:opacity-100 group-focus-visible/mark:opacity-100",
                  names.join(" · "),
                ),
              );
              const img = document.createElement("img");
              img.src = url;
              img.alt = names.join(", ");
              img.loading = "lazy";
              img.className = "h-5 w-auto object-contain";
              // equal visual weight: wide wordmarks (FPX, WHMCS) shrink in height so their
              // area matches a square 20px mark instead of stretching to 3-4x its width
              img.addEventListener("load", () => {
                const ratio = img.naturalWidth / img.naturalHeight;
                if (ratio > 1.2) img.style.height = `${Math.max(10, Math.min(20, Math.sqrt(560 / ratio)))}px`;
              }, { once: true });
              // four hard (0-blur) offsets build a crisp, solid 1px outline that follows the mark's shape
              if (light) img.style.filter = "drop-shadow(1px 0 0 #fff) drop-shadow(-1px 0 0 #fff) drop-shadow(0 1px 0 #fff) drop-shadow(0 -1px 0 #fff)";
              tile.appendChild(img);
              return tile;
            };
            const chip = (m: string) =>
              el("span", "whitespace-nowrap rounded-full border border-line bg-raised px-2 py-0.5 text-[11px] text-fg", m);
            const draw = () => {
              wrap.innerHTML = "";
              const displayed = listExpanded ? ordered : ordered.slice(0, LIMIT);
              displayed.forEach((o) => wrap.appendChild(o.url ? mark(o.names, o.url) : chip(o.names[0])));
              if (ordered.length > LIMIT) {
                const btn = el(
                  "button",
                  "basis-full rounded-full px-2 py-0.5 text-[11px] text-muted hover:text-accent",
                  listExpanded ? T.showLess : T.more(ordered.length - LIMIT),
                );
                btn.addEventListener("click", () => {
                  listExpanded = !listExpanded;
                  listDraws.forEach((d) => d());
                });
                wrap.appendChild(btn);
              }
            };
            listDraws.push(draw);
            draw();
            td.appendChild(wrap);
          }
        } else {
          const a = document.createElement("a");
          a.href = row.get(g);
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.className = "text-accent hover:underline";
          a.textContent = T.visit;
          td.appendChild(a);
        }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    if (diffOnly && gws.length >= 2 && visible.length === ROWS.filter((r) => r.kind === "link").length) {
      const tr = el("tr");
      const td = el("td", "px-3 py-6 text-center text-sm text-muted", T.allMatch);
      (td as HTMLTableCellElement).colSpan = cols + 1;
      tr.appendChild(td);
      tbody.prepend(tr);
    }
    table.appendChild(tbody);
    root!.appendChild(table);
    syncBar();
  }

  // ---- slim sticky header: keeps the gateway names in view once the cards scroll away ----
  let headRow: HTMLElement | null = null;
  let headCells: Array<{ th: HTMLElement; g: GW; price: string }> = [];
  const siteHeader = document.querySelector<HTMLElement>("body > header, header.sticky");
  const bar = el("div", "pointer-events-none fixed inset-x-0 z-10 hidden border-b border-line bg-surface/95 backdrop-blur");
  const barInner = el("div", "relative h-11 overflow-hidden");
  bar.appendChild(barInner);
  document.body.appendChild(bar);
  function syncBar() {
    const top = siteHeader?.offsetHeight ?? 0;
    const table = root!.querySelector("table");
    if (!headRow || !table || !headCells.length) {
      bar.classList.add("hidden");
      return;
    }
    const head = headRow.getBoundingClientRect();
    const tb = table.getBoundingClientRect();
    const show = head.bottom < top && tb.bottom > top + 80;
    bar.classList.toggle("hidden", !show);
    if (!show) return;
    bar.style.top = `${top}px`;
    const rr = root!.getBoundingClientRect();
    barInner.style.marginLeft = `${rr.left}px`;
    barInner.style.width = `${rr.width}px`;
    barInner.innerHTML = "";
    headCells.forEach(({ th, g, price }) => {
      const r = th.getBoundingClientRect();
      const cell = el("div", "absolute inset-y-0 flex items-center justify-center gap-2 px-2 text-sm");
      cell.style.left = `${r.left - rr.left}px`;
      cell.style.width = `${r.width}px`;
      cell.appendChild(logoNode(g, 18));
      cell.appendChild(el("span", "truncate font-medium text-fg", splitName(g.name).base));
      cell.appendChild(el("span", "text-xs tabular-nums text-muted", price));
      barInner.appendChild(cell);
    });
  }
  let barQueued = false;
  const queueBar = () => {
    if (barQueued) return;
    barQueued = true;
    requestAnimationFrame(() => {
      barQueued = false;
      syncBar();
    });
  };
  addEventListener("scroll", queueBar, { passive: true });
  addEventListener("resize", queueBar);
  root.addEventListener("scroll", queueBar, { passive: true });

  // ---- picker modal ----
  function openPicker() {
    const overlay = el("div", "fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20");
    const panel = el("div", "flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-line bg-raised");
    const head = el("div", "flex items-center justify-between border-b border-line px-4 py-3");
    head.appendChild(el("h2", "text-sm font-semibold text-fg", T.pickerTitle));
    const close = el("button", "text-muted hover:text-fg", "✕");
    close.setAttribute("aria-label", T.close);
    head.appendChild(close);
    panel.appendChild(head);

    const search = document.createElement("input");
    search.type = "search";
    search.placeholder = T.search;
    search.className = "m-3 mb-2 rounded-md border border-line bg-panel px-3 py-2 text-sm text-fg placeholder:text-muted focus:border-accent";
    panel.appendChild(search);

    // filters: provider type, channels it must support, and a cheapest-first sort
    const TYPES: Array<[string, string]> = [
      ["all", T.types.all],
      ["gateway", T.types.gateway],
      ["bank", T.types.bank],
      ["bnpl", T.types.bnpl],
      ["ewallet", T.types.ewallet],
    ];
    const CHANNELS: Array<[string, string]> = [
      ["fpx", "FPX"],
      ["card", T.chCard],
      ["ewallet", T.chEwallet],
      ["duitnowqr", "DuitNow QR"],
    ];
    let type = "all";
    const need = new Set<string>();
    let cheapestFirst = false;
    const filters = el("div", "flex flex-col gap-2 border-b border-line px-3 pb-3");
    panel.appendChild(filters);
    const count = el("p", "px-4 pb-1 pt-2 text-xs text-muted");
    panel.appendChild(count);

    function chip(label: string, on: boolean, onClick: () => void): HTMLElement {
      const b = el(
        "button",
        `rounded-full border px-2.5 py-1 text-xs ${on ? "border-accent bg-accent/15 text-white" : "border-line text-muted hover:border-accent hover:text-fg"}`,
        label,
      );
      b.setAttribute("aria-pressed", String(on));
      b.addEventListener("click", () => {
        onClick();
        drawFilters();
        renderList();
      });
      return b;
    }
    function drawFilters() {
      filters.innerHTML = "";
      const r1 = el("div", "flex flex-wrap gap-1.5");
      TYPES.forEach(([k, label]) => r1.appendChild(chip(label, type === k, () => (type = k))));
      const sort = chip(T.cheapestFirst, cheapestFirst, () => (cheapestFirst = !cheapestFirst));
      sort.classList.add("ml-auto");
      r1.appendChild(sort);
      filters.appendChild(r1);
      const r2 = el("div", "flex flex-wrap items-center gap-1.5");
      r2.appendChild(el("span", "mr-1 text-xs text-muted", T.supports));
      CHANNELS.forEach(([k, label]) =>
        r2.appendChild(chip(label, need.has(k), () => (need.has(k) ? need.delete(k) : need.add(k)))),
      );
      filters.appendChild(r2);
    }
    const matchesType = (g: GW) =>
      type === "all" || g.category === type || (type === "gateway" && g.category === "infrastructure");

    const list = el("div", "flex-1 overflow-y-auto px-2 pb-3");
    panel.appendChild(list);

    function renderList() {
      list.innerHTML = "";
      if (selected.length >= MAX) {
        list.appendChild(el("p", "px-2 py-3 text-sm text-muted", T.maxReached(MAX)));
        return;
      }
      const q = search.value.trim().toLowerCase();
      const avail = ALL.filter(
        (g) =>
          !selected.includes(g.id) &&
          g.name.toLowerCase().includes(q) &&
          matchesType(g) &&
          [...need].every((c) => g.channels.includes(c)),
      );
      if (cheapestFirst) {
        // unranked providers (no comparable published rates) sink to the bottom
        const key = (g: GW) => {
          const c = gatewayCost(g.fees);
          return c.rankable ? c.cost : Infinity;
        };
        avail.sort((a, b) => key(a) - key(b));
      }
      count.textContent = T.count(avail.length);
      if (!avail.length) {
        list.appendChild(el("p", "px-2 py-3 text-sm text-muted", T.noMatch));
        return;
      }
      avail.forEach((g) => {
        const btn = el("button", "flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm text-fg hover:bg-panel");
        btn.appendChild(logoNode(g, 20));
        btn.appendChild(nameNode(g.name, "flex-1"));
        const c = gatewayCost(g.fees);
        btn.appendChild(el("span", "text-xs tabular-nums text-muted", c.rankable ? `RM${c.cost.toFixed(2)}` : ""));
        if (g.category === "bnpl") btn.appendChild(el("span", "rounded-full border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-accent", "BNPL"));
        else if (g.category === "bank") btn.appendChild(el("span", "rounded-full border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted", T.cat.bank));
        else if (g.category === "ewallet") btn.appendChild(el("span", "rounded-full border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted", T.cat.ewallet));
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
    drawFilters();

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
