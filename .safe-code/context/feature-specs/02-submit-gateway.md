---
status: approved
created: 2026-06-24
---
# Submit a gateway (public submissions)

## Goal
Let the public/providers submit a new payment gateway for review, so the list
grows from submissions without hurting data accuracy.

## Scope
- In: a submit form (name, website, fees, channels, source); store as a pending submission; admin (AFU) reviews.
- Out: auto-publishing to the live list. **Submissions are moderated, not live** — AFU verifies and curates approved ones into `src/content/gateways/*.md` (keeps fees accurate/sourced).

## Approach (planned)
- Form (client) → **Pages Function** (`/functions/api/submit`) → **Cloudflare D1** `submissions` table (status: pending).
- Optional: require sign-in (Clerk) to submit (reduce spam) + a captcha.
- Admin review: simple AFU-only page or read D1; on approve, add a verified `.md`.

## Acceptance criteria
- Submission stored with status=pending; not shown on public list until curated.
- Spam-resistant (auth and/or captcha). No fabricated fees reach the live site.

## Notes
Not started. Moderation chosen over auto-publish to protect fee accuracy (core value).
