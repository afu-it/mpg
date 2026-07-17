---
status: done   # 2026-07-17: AFU smoke clean (phone + signed-in), CSP flipped to enforcing; securityheaders.com grade A achieved 2026-07-03
created: 2026-07-03
---

# Security hardening pass — review + ownership map + threat model

AFU requested (2026-07-03, after a securityheaders.com scan) a dedicated security
session running three skills, in this order:

1. `/security-ownership-map` — map what we own vs what third parties own
2. `/security-threat-model` — model realistic threats against that map
3. `/security-review` — code-level review of the repo, scoped by the model

Run in that order so the review is scoped by the model, and the model by the map.

## Context (facts at spec time)

- The pasted grade-D report was scanned at 03:42 UTC, BEFORE the 03:48 UTC deploy
  that shipped `public/_headers`. Verified post-deploy: HSTS, X-Frame-Options
  SAMEORIGIN, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all
  live. A re-scan should read ~A-/B. Do the re-scan first; don't re-fix what
  already shipped.
- Site is pure static Astro on Cloudflare Pages; NO server code in this repo
  except the separate `mcp/` Worker. Auth is client-side Clerk (CDN); the
  contribute form is a Clerk-gated mailto (no backend to attack).
- Deploy safety net: workflow gated `if: github.actor == github.repository_owner`
  (private repo, no branch protection on the free plan) — spec 11.
- Secrets: `.env` gitignored (`pk_test` local); GH secret holds `pk_live` +
  Cloudflare token; Clerk `sk_*` never in repo. Google OAuth secret rotation has
  been floated before (ACTIVE 2026-07-02 pending) — fold into this pass.

## Scope

### A. Header gaps (the known remainder)
1. **Content-Security-Policy** — the one deliberately-missing header. Design a
   Clerk-compatible policy: needs `clerk.malaysiapg.com.my` (script/connect),
   `static.cloudflareinsights.com` (script), inline bootstrap scripts (JSON-LD is
   fine — `script-src` doesn't block `application/ld+json`), data: images
   (LogoCycle), Clerk iframes/workers (Google OAuth popups). Roll out as
   **Content-Security-Policy-Report-Only first**, watch console/reports, then
   enforce. Must not break: sign-in (email + Google), user button, contribute
   form unlock, CF analytics beacon.
2. **`access-control-allow-origin: *` on HTML pages** — present on `/` but NOT
   set by us for HTML (we only rely on it for `/api/*`). Find the source
   (Cloudflare zone setting / Pages default?) and scope it to `/api/*` via
   `_headers` if possible. Low actual risk (public static content, no cookies
   readable cross-origin), but flagged by scanners and sloppier than needed.
3. Consider COOP (`same-origin-allow-popups` — Clerk's Google popup needs care),
   CORP, COEP: likely NOT worth enabling (no cross-origin isolation need);
   document the decision either way.

### B. Ownership map (skill 1)
- Us: repo, content data, Astro build, `_headers`, deploy workflow, `mcp/` Worker,
  DNS zone (Cloudflare account), GSC property.
- Third parties: Cloudflare Pages/CDN/Analytics, Clerk (auth, session cookies),
  GitHub (repo + Actions + secrets), YeahHost (registrar), Google (OAuth app),
  provider logos/links (external content we point at).
- Access inventory: who can push (owner + future invited collaborators), who can
  deploy (owner only), Clerk dashboard access, Cloudflare account access.

### C. Threat model (skill 2) — candidate threats to weigh
- Malicious/compromised collaborator pushes (mitigated: owner-gated deploy; check
  what else a collaborator COULD do — e.g. edit workflow file on a branch?).
- Supply chain: npm deps (astro, fontsource, sitemap), Clerk CDN script
  (hotloaded at runtime — biggest runtime trust), GitHub Actions runners.
- Data integrity: fee data poisoning via contribution flow (mitigated: PR review
  + sourcing rules); typosquatting/impersonation of the new domain.
- Account takeover: AFU's GitHub / Cloudflare / Clerk accounts (2FA status?).
- MCP Worker abuse: read-only tools, but check rate limits / cost exposure.
- Scraper/email harvesting (mitigated: runtime-assembled mailto — verify it
  actually keeps the address out of static HTML everywhere).
- Clerk session risks on a static site (XSS = the main vector → CSP matters).

### D. Code review (skill 3) — repo-scoped
- `src/scripts/*.ts` (DOM injection points: compare.ts/choose.ts render user-URL
  params via `?ids=` — verify textContent-only, no innerHTML with external data).
- `mcp/` Worker input handling.
- `deploy.yml` (secret exposure, actor gate, action pinning).
- `.safe-code`/docs for accidental secret leakage.
- Rotate the Google OAuth client secret (old pending item) if still unrotated.

## Acceptance criteria
- securityheaders.com re-scan ≥ A- (CSP enforced or a documented Report-Only
  plan with a target date).
- Ownership map + threat model documented in `.safe-code/context/` (or MEMORY if
  short-lived), with mitigations mapped to threats and explicit accepted risks.
- Code review findings triaged: fixed, backlogged, or accepted-with-reason.
- Auth verified working end-to-end after any CSP change (AFU smoke: email +
  Google sign-in, contribute unlock).

## Notes
- Grade chasing is not the goal; the static architecture already removes most
  attack surface. The real assets to protect: data integrity (fees), the deploy
  pipeline, AFU's accounts, and visitors (XSS via the one runtime script we
  don't control — Clerk CDN).
