// Helpers for the /learn section and the per-gateway "Copy prompt" button.
// Everything here is derived from a gateway's `skill:` field, with no per-gateway
// curation, so it stays correct as gateways are added.

// AFU's agent-skills collection. Skills live at the repo ROOT as /setup-<gateway>/.
export const SKILLS_REPO = "https://github.com/afu-it/malaysia-payment-gateway";

/** Link to a specific setup-* skill folder in the repo. */
export function skillRepoUrl(skill: string): string {
  return `${SKILLS_REPO}/tree/main/${skill}`;
}

/** `npx` one-liner that installs a setup-* skill into the user's agent. */
export function skillInstallCommand(skill: string): string {
  return `npx skills@latest add afu-it/malaysia-payment-gateway --skill ${skill}`;
}

/**
 * Ready-to-paste prompt for an AI coding agent, generated from the gateway name
 * and its skill. Mirrors the repo's "How To Ask Your Agent" examples and the
 * safe-integration emphasis (verify webhooks, never unlock from a redirect).
 */
export function agentPrompt(name: string, skill: string): string {
  return (
    `Use $${skill} to integrate ${name} in this project: hosted checkout, ` +
    `callback/redirect handling, webhook signature verification, and idempotent ` +
    `settlement, with tests. Do not unlock paid access from a redirect alone; ` +
    `keep secrets server-side.`
  );
}
