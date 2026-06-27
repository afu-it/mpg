// Client behaviour for the /choose wizard: step navigation, collect Needs, render shortlist.
import { recommendOrClosest, type Needs, type Channel } from "../lib/recommend";
import type { ApiGateway } from "../lib/api";

type Row = ApiGateway & { logo: string | null };

const raw = document.getElementById("gw-data")?.textContent;
const form = document.getElementById("choose-form") as HTMLFormElement | null;
const results = document.getElementById("choose-results");
const nav = document.getElementById("choose-nav");
const nextBtn = document.getElementById("choose-next") as HTMLButtonElement | null;
const backBtn = document.getElementById("choose-back") as HTMLButtonElement | null;

if (raw && form && results && nav && nextBtn && backBtn) {
  const gateways = JSON.parse(raw) as Row[];
  const steps = Array.from(form.querySelectorAll<HTMLElement>("[data-step]"));
  let step = 0;

  function show(i: number) {
    steps.forEach((s, idx) => (s.hidden = idx !== i));
    backBtn!.hidden = i === 0;
    nextBtn!.textContent = i === steps.length - 1 ? "See results" : "Next";
  }

  function readNeeds(): Needs {
    const fd = new FormData(form!);
    const n: Needs = {};
    const channels = fd.getAll("channel").map(String) as Channel[];
    if (channels.length) n.channels = channels;
    if (fd.get("recurring") === "yes") n.recurring = true;
    const integration = fd.get("integration");
    if (integration === "nocode") n.noCode = true;
    if (integration === "developer") n.developer = true;
    const access = fd.get("access");
    if (access === "integrate" || access === "account" || access === "bnpl") n.access = access;
    return n;
  }

  function esc(s: string) {
    return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  }

  function render() {
    const needs = readNeeds();
    const { matches, relaxed } = recommendOrClosest(gateways as ApiGateway[], needs, 5);
    const ids = matches.map((m) => m.gateway.slug).join(",");
    const note = relaxed.length
      ? `<p class="mb-3 text-sm text-muted">No exact match, so we relaxed: ${esc(relaxed.join(", "))}.</p>`
      : `<p class="mb-3 text-sm text-muted">${matches.length} gateway${matches.length === 1 ? "" : "s"} fit your needs, cheapest first.</p>`;

    const cards = matches
      .map((m) => {
        const g = m.gateway as Row;
        const fee = g.rankable ? `RM${g.est_fee_rm100!.toFixed(2)} / RM100` : "Pricing on request";
        const chips = m.reasons.map((r) => `<span class="rounded-full border border-line px-2 py-0.5 text-xs text-muted">${esc(r)}</span>`).join(" ");
        const logo = g.logo ? `<img src="${esc(g.logo)}" alt="" width="24" height="24" class="rounded" />` : "";
        return `<div class="rounded-md border border-line bg-panel p-4">
          <div class="flex items-center gap-2.5">
            ${logo}<a href="/gateway/${esc(g.slug)}" class="font-medium text-fg hover:text-accent">${esc(g.name)}</a>
            <span class="ml-auto text-sm ${g.rankable ? "text-fg" : "text-muted"}">${esc(fee)}</span>
          </div>
          <div class="mt-2 flex flex-wrap gap-1.5">${chips}</div>
          <div class="mt-3 flex gap-3 text-sm">
            <a href="/gateway/${esc(g.slug)}" class="text-accent hover:underline">View details</a>
          </div>
        </div>`;
      })
      .join("");

    const empty = matches.length ? "" : `<p class="text-muted">No gateways found. <a href="/gateways" class="text-accent hover:underline">Browse all</a>.</p>`;
    const compare = matches.length ? `<a href="/compare?ids=${encodeURIComponent(ids)}" class="text-accent hover:underline">Compare these →</a>` : "";

    results!.innerHTML = `${note}<div class="space-y-3">${cards}</div>${empty}
      <div class="mt-5 flex gap-4 text-sm">${compare}
        <button type="button" id="choose-restart" class="text-muted hover:text-fg">Start over</button>
        <a href="/gateways" class="text-muted hover:text-fg">Browse all</a></div>`;
    results!.hidden = false;
    document.getElementById("choose-restart")?.addEventListener("click", restart);
  }

  function restart() {
    form!.reset();
    results!.hidden = true;
    results!.innerHTML = "";
    step = 0;
    show(0);
    form!.hidden = false;
    nav!.hidden = false;
  }

  nextBtn.addEventListener("click", () => {
    if (step < steps.length - 1) {
      step++;
      show(step);
    } else {
      form!.hidden = true;
      nav!.hidden = true;
      render();
    }
  });
  backBtn.addEventListener("click", () => {
    if (step > 0) {
      step--;
      show(step);
    }
  });

  show(0);
}
