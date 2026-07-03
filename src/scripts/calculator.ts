// Client behaviour for /calculator: recompute per-gateway effective cost from
// the user's ticket size, via the same fees.ts engine the whole site uses.
// DOM is built with createElement/textContent only (no innerHTML with data).
import { parseFeeShape, effectiveCost, gatewayCost } from "../lib/fees";

interface Row {
  slug: string;
  name: string;
  fees: Record<string, string | undefined>;
  popularity: number;
}

type ChannelKey = "blended" | "fpx" | "card" | "ewallet" | "duitnowqr";

const raw = document.getElementById("gw-data")?.textContent;
const amountInput = document.getElementById("calc-amount") as HTMLInputElement | null;
const channelSelect = document.getElementById("calc-channel") as HTMLSelectElement | null;
const tbody = document.getElementById("calc-rows");
const note = document.getElementById("calc-note");

if (raw && amountInput && channelSelect && tbody && note) {
  const gateways = JSON.parse(raw) as Row[];

  function el(tag: string, cls: string, text?: string) {
    const e = document.createElement(tag);
    e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function readAmount(): number {
    const v = Number.parseFloat(amountInput!.value);
    if (!Number.isFinite(v)) return 100;
    return Math.min(Math.max(v, 0.1), 1_000_000);
  }

  function render() {
    const amt = readAmount();
    const ch = (channelSelect!.value || "blended") as ChannelKey;

    const priced: Array<{ g: Row; cost: number; feeText: string }> = [];
    let unpriced = 0;

    for (const g of gateways) {
      if (ch === "blended") {
        const { rankable, cost } = gatewayCost(g.fees, amt);
        if (rankable) priced.push({ g, cost, feeText: "blended" });
        else unpriced++;
      } else {
        const value = g.fees[ch] ?? "";
        const shape = parseFeeShape(value);
        if (shape.known && !shape.indicative) {
          priced.push({ g, cost: effectiveCost(shape, amt), feeText: value });
        } else {
          unpriced++;
        }
      }
    }

    priced.sort((a, b) => a.cost - b.cost || b.g.popularity - a.g.popularity);

    tbody!.textContent = "";
    priced.forEach((row, i) => {
      const tr = el("tr", i === 0 ? "bg-raised" : "");
      tr.appendChild(el("td", "px-3 py-2 text-right text-muted", String(i + 1)));
      const nameTd = el("td", "px-3 py-2");
      const link = el("a", "text-fg hover:underline", row.g.name) as HTMLAnchorElement;
      link.href = `/gateway/${row.g.slug}`;
      nameTd.appendChild(link);
      tr.appendChild(nameTd);
      tr.appendChild(
        el("td", "px-3 py-2 text-muted", ch === "blended" ? "FPX/card/e-wallet mix" : row.feeText),
      );
      tr.appendChild(el("td", "px-3 py-2 text-right font-medium text-fg", `RM${row.cost.toFixed(2)}`));
      tr.appendChild(el("td", "hidden px-3 py-2 text-right text-muted sm:table-cell", `${((row.cost / amt) * 100).toFixed(2)}%`));
      tbody!.appendChild(tr);
    });

    const chLabel =
      ch === "blended"
        ? "a blended FPX/card/e-wallet mix (50/30/20)"
        : channelSelect!.options[channelSelect!.selectedIndex].text;
    note!.textContent = `${priced.length} gateways publish comparable official rates for ${chLabel}; ${unpriced} quote on request or publish no official figure and are not shown. Estimated cost on a RM${amt.toFixed(2)} sale.`;
  }

  amountInput.addEventListener("input", render);
  channelSelect.addEventListener("change", render);
  render();
}
