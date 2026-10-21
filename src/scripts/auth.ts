// Client-side Clerk auth via CDN hotloading (full build WITH UI components).
// Single "Sign up" button when signed out (the modal links to sign-in),
// a UserButton when signed in. Dark-themed to match the site.

import { pageLocale, tr, href } from "../i18n/client";

const T = tr(pageLocale(), { en: { signUp: "Sign up" }, ms: { signUp: "Daftar" } });
const pk = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined;
const mount = document.getElementById("clerk-auth");

const appearance = {
  variables: {
    colorPrimary: "#0031a0",
    colorTextOnPrimaryBackground: "#ffffff",
    colorBackground: "#212025",
    colorText: "#dfe1e2",
    colorTextSecondary: "#a1a1aa",
    colorInputBackground: "#18181b",
    colorInputText: "#dfe1e2",
    colorNeutral: "#ffffff",
    colorShimmer: "rgba(0,49,160,0.16)",
    borderRadius: "8px",
    fontFamily: '"Inter Variable", Inter, ui-sans-serif, system-ui, sans-serif',
  },
  elements: {
    cardBox: { border: "1px solid #3d3d42", boxShadow: "none" },
    card: { backgroundColor: "#212025" },
    headerTitle: { color: "#fafafa" },
    footer: { backgroundColor: "#212025", borderTop: "1px solid #3d3d42" },
    footerActionLink: { color: "#4f86f5" },
    socialButtonsIconButton: {
      backgroundColor: "#18181b",
      border: "1px solid #3d3d42",
    },
    // Clerk renders the full-width "Continue with Google" as the BLOCK variant,
    // which the icon-button style above does not cover.
    socialButtonsBlockButton: {
      backgroundColor: "#18181b",
      border: "1px solid #3d3d42",
      color: "#dfe1e2",
    },
    formFieldInput: { backgroundColor: "#18181b", borderColor: "#3d3d42" },
    dividerLine: { backgroundColor: "#3d3d42" },
    formButtonPrimary: { color: "#ffffff" },
    userButtonPopoverCard: { backgroundColor: "#212025", border: "1px solid #3d3d42" },
  },
};

if (pk && mount) {
  // The publishable key base64-encodes the frontend API host (…clerk.accounts.dev$).
  let host = "";
  try {
    host = atob(pk.split("_")[2] || "").replace(/\$+$/, "");
  } catch {
    host = "";
  }

  if (host) {
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-clerk-publishable-key", pk);
    script.src = `https://${host}/npm/@clerk/clerk-js@latest/dist/clerk.browser.js`;

    script.addEventListener("load", async () => {
      const Clerk = (window as any).Clerk;
      if (!Clerk) return;
      await Clerk.load({ appearance });

      let signedIn: boolean | null = null;
      const render = () => {
        const isIn = !!Clerk.user;
        if (isIn === signedIn) return; // re-render only on state flip
        signedIn = isIn;
        mount.innerHTML = "";

        if (isIn) {
          const el = document.createElement("div");
          mount.appendChild(el);
          Clerk.mountUserButton(el, { afterSignOutUrl: href("/") });
        } else {
          const btn = document.createElement("button");
          btn.textContent = T.signUp;
          btn.className =
            "whitespace-nowrap rounded-md bg-brand-blue px-3 py-1.5 font-medium text-white hover:opacity-90";
          btn.addEventListener("click", () =>
            Clerk.openSignUp({ afterSignUpUrl: href("/"), afterSignInUrl: href("/") }),
          );
          mount.appendChild(btn);
        }
      };

      render();
      Clerk.addListener(render);
    });

    document.head.appendChild(script);
  }
}
