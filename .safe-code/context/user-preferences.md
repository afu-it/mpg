# User Preferences — MPG (AFU)

- **Language:** reply in casual Bahasa Melayu (santai, kawan-style). AFU is a vibe coder ("buta IT") — explain technical things simply, with analogies; avoid raw jargon.
- **Design:** minimalist, dark, OpenRouter-style. Dislikes ugly/overdecorated UI. Wants it to look "expensive"/clean.
- **Workflow:** wants a **localhost dev link** to see changes instantly (don't make him wait for deploy each time). Iterate fast: edit → he refreshes localhost → feedback.
- **Shipping:** wants work actually deployed/live, not just planned. Auto-deploy on push is set up.
- **Data integrity:** never fabricate fees — "Contact sales" / "—" where unknown. Sources matter.
- **Accounts:** wants real user accounts (Clerk) for favourites + gateway submission.
- **Dislikes:** over-ceremony for simple changes; heavy multi-subagent flows for trivial sequential work (prefers inline).
- **No em-dashes (—) in any prose/copy** — reads as AI writing. Use comma/colon/period/parentheses instead. The standalone `"—"` fee placeholder (= not offered) is data and stays. (2026-06-25)
- **Don't use chrome-devtools MCP to verify/test unless AFU explicitly asks.** Verify via `npm run build` / `astro check` / `npm test`. (2026-06-25)
- **Brand colours welcome:** AFU likes per-brand accent colours on labels (e.g. FPX navy `#6f83cc`, DuitNow magenta `#e61f65`) and the Malaysia-flag palette as theme accents — but keep WCAG contrast on the dark bg (lighten dark brand colours, or put them on a white chip, rather than ship invisible text).
