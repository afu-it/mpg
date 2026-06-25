// Top loading bar (NProgress-style). The site does full page loads, so the bar
// runs on every page load: it sweeps a full bar left-to-right and fades out.
// On an internal link click it also starts creeping on the CURRENT page, so on
// slower connections you see progress while the next page is still loading.

const bar = document.getElementById("top-progress");

if (bar) {
  let hideTimer: number | undefined;

  const reset = () => {
    bar.style.transition = "none";
    bar.style.transform = "scaleX(0)";
    bar.style.opacity = "1";
  };

  const fadeOut = () => {
    bar.style.transition = "opacity 350ms ease-out";
    bar.style.opacity = "0";
    hideTimer = window.setTimeout(reset, 360);
  };

  // Creep on the current page after a click (visible while the next page loads).
  const start = () => {
    window.clearTimeout(hideTimer);
    reset();
    void bar.offsetWidth; // commit the 0 state before animating
    requestAnimationFrame(() => {
      bar.style.transition = "transform 8000ms ease-out";
      bar.style.transform = "scaleX(0.9)";
    });
  };

  // Full left-to-right sweep, then fade. Runs on every page load.
  const sweepIn = () => {
    window.clearTimeout(hideTimer);
    reset();
    void bar.offsetWidth;
    requestAnimationFrame(() => {
      bar.style.transition = "transform 700ms ease-out";
      bar.style.transform = "scaleX(1)";
      hideTimer = window.setTimeout(fadeOut, 720);
    });
  };

  // Show the bar on every load.
  sweepIn();

  document.addEventListener("click", (e) => {
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const link = (e.target as HTMLElement)?.closest?.("a");
    if (!link) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    let url: URL;
    try {
      url = new URL(link.href, location.href);
    } catch {
      return;
    }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname) return; // same page or in-page anchor
    start();
  });

  // Back/forward cache restore: re-run the sweep so it shows there too.
  window.addEventListener("pageshow", (e) => {
    if ((e as PageTransitionEvent).persisted) sweepIn();
  });
}
