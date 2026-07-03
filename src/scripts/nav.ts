// Mobile nav drawer (spec 14): hamburger-triggered left slide-in on every page.
const drawer = document.getElementById("nav-drawer");
const scrim = document.getElementById("nav-scrim");
const openBtn = document.getElementById("nav-open");
const closeBtn = document.getElementById("nav-close");

if (drawer && scrim && openBtn && closeBtn) {
  function setOpen(open: boolean) {
    if (open) drawer!.setAttribute("data-open", "");
    else drawer!.removeAttribute("data-open");
    scrim!.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    openBtn!.setAttribute("aria-expanded", String(open));
    if (open) closeBtn!.focus();
    else openBtn!.focus();
  }

  openBtn.addEventListener("click", () => setOpen(true));
  closeBtn.addEventListener("click", () => setOpen(false));
  scrim.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.hasAttribute("data-open")) setOpen(false);
  });
}
