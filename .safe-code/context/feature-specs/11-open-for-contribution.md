---
status: done   # suggested | approved | in-progress | done | rejected
created: 2026-07-02
---

> **DONE 2026-07-02** (same-day). `/contribute` (rules + 4-step flow + Clerk-gated
> apply form → prefilled mailto) + `src/scripts/contribute.ts` + footer//learn links
> + owner-gated deploy job. vitest 64/64, astro check 0, build 152. Manual smoke
> (sign-in unlock + mailto) left to AFU per house rule.

> **APPROVED 2026-07-02, AFU decisions:** repo stays **PRIVATE + invite**
> (decision 1 = A) and application channel = **prefilled email** (decision 2 = a).
> Mitigation for the no-branch-protection risk: the deploy workflow gains
> `if: github.actor == github.repository_owner` so only AFU's own pushes
> deploy production; collaborator pushes never auto-deploy.

# Open for contribution (`/contribute`)

AFU's idea (2026-07-02): a section where people can APPLY to contribute to the
directory (fix fees, add gateways, translations). Applicant must **sign up
(Clerk) first** — the first real use of the site's auth. After AFU approves an
application, the contributor works through GitHub (invite to the private repo,
or fork+PR if the repo goes public).

## Confirmed facts
- Repo `afu-it/mpg` is **PRIVATE** today. Push to `master` **auto-deploys production**.
- Site is pure static (no server) — a form cannot be received without a
  backend or third-party service. Clerk gating is client-side (UX gate, not security).
- Gateways data = one `.md` per provider (Zod-validated) → perfect contributor surface.

## Open decisions (AFU)
1. **Repo strategy:**
   - A. Stay private + invite approved applicants as collaborators.
     REQUIRES master branch protection first (require PR + review) or any
     collaborator push deploys straight to production.
   - B. Go public: contributors fork + PR, no invite needed, no write access
     (safest). Exposes code + `.safe-code/` notes publicly (no secrets by
     design, but internal notes become readable).
2. **Application channel (static-friendly):**
   - a. `mailto:` prefilled from the signed-in user (zero infra)
   - b. Embedded third-party form (Tally/Google Form)
   - c. GitHub issue template (only if repo public)
   - d. Pages Function + D1 (real backend — overlaps spec 02 Phase 3 direction)

## Sketch (v1, once decided)
- `/contribute` page: what you can contribute (fees fixes, new gateways,
  sources), the rules (sourced fees only, no fabrication), and the flow.
- Clerk gate: signed-out users see a "Sign up to apply" CTA (opens Clerk modal);
  signed-in users see the apply action (channel per decision 2).
- Application asks: GitHub username + what they want to contribute.
- After approval: AFU invites on GitHub (or points to fork+PR). Contributor
  guide (CONTRIBUTING.md or /learn page): add/edit `src/content/gateways/*.md`,
  fee sourcing rules, `npm test` + `astro check`, PR to master.
- Safety: master branch protection (require PR review) BEFORE any invite.

## Relation to existing specs
- Spec 02 (submit-a-gateway, Phase 3) = public form for DATA suggestions
  (needs server+DB). This spec = trusted-human contributor pipeline via
  GitHub. Complementary, not duplicates.
