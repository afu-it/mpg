// Glossary registry (spec 12 item 2): single source for the /learn/glossary
// hub and the per-term pages at /learn/glossary/<slug>/. Pure data, no DOM.
// Copy rules: plain English, no em-dashes, never state a fee number here
// (fee facts live in the gateway data with sources).

export interface GlossaryTerm {
  slug: string;
  /** display name used on the hub list */
  term: string;
  /** the H1 of the term page, phrased as the searched question */
  question: string;
  /** <title>, must sit in the 30-65 char SERP window (test-enforced) */
  title: string;
  /** meta description, 110-160 chars (test-enforced) */
  description: string;
  /** one-line definition: hub list + the term page's lead answer */
  def: string;
  /** supporting paragraphs on the term page */
  body: string[];
  /** where to go next, data-true links only */
  related: { label: string; href: string }[];
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "fpx",
    term: "FPX",
    question: "What is FPX?",
    title: "What is FPX? Malaysia's online banking rail | MPG",
    description:
      "FPX explained in plain language: how Malaysia's online banking payment rail works, who runs it, what it costs merchants, and how to accept it.",
    def: "Financial Process Exchange, Malaysia's online-banking rail. The customer logs into their bank and approves the payment. Run by PayNet; almost every gateway supports it.",
    body: [
      "When a customer picks FPX at checkout, they are redirected to their own bank's login page, approve the payment there, and get sent back to your site. The money moves as a direct bank transfer, so there is no card involved and no chargeback mechanism like the card networks have.",
      "For merchants, FPX is usually the cheapest rail: most gateways price it as a flat ringgit amount or a low percentage per transaction. Because the customer authorises the payment inside their own bank, failed-fraud risk is low, but a customer must have online banking set up to use it.",
    ],
    related: [
      { label: "Best FPX payment gateways", href: "/best/payment-gateway-fpx/" },
      { label: "PayNet, the operator behind FPX", href: "/gateway/paynet/" },
      { label: "Browse all gateways", href: "/gateways/" },
    ],
  },
  {
    slug: "duitnow-qr",
    term: "DuitNow QR",
    question: "What is DuitNow QR?",
    title: "What is DuitNow QR? The national QR standard | MPG",
    description:
      "DuitNow QR explained: Malaysia's interoperable QR payment standard, how one code accepts bank apps and e-wallets, and what merchants pay.",
    def: "The national interoperable QR standard. One QR code accepts most Malaysian bank apps and e-wallets.",
    body: [
      "DuitNow QR is run by PayNet, the same body behind FPX. Instead of showing a different QR code for every wallet, a merchant displays one code and the customer can scan it with almost any Malaysian banking app or e-wallet.",
      "Online gateways expose DuitNow QR as a checkout method next to FPX and cards. Rates are typically low and percentage-based, and some providers set a minimum fee per transaction. It suits mobile-first customers who prefer scanning over typing bank credentials.",
    ],
    related: [
      { label: "Best DuitNow QR gateways", href: "/best/payment-gateway-duitnow-qr/" },
      { label: "PayNet, who runs DuitNow QR", href: "/gateway/paynet/" },
      { label: "Compare gateways", href: "/compare/" },
    ],
  },
  {
    slug: "e-wallet",
    term: "E-wallet",
    question: "What is an e-wallet payment?",
    title: "E-wallet payments in Malaysia, explained | MPG",
    description:
      "What accepting e-wallets like Touch 'n Go, GrabPay, Boost and ShopeePay means for a Malaysian merchant, and how gateway e-wallet fees work.",
    def: "Stored-value apps like Touch 'n Go eWallet, GrabPay, Boost and ShopeePay. Gateways usually charge a separate e-wallet rate.",
    body: [
      "Customers pay from a balance stored in the app rather than a bank account or card. In Malaysia the big four are Touch 'n Go eWallet, GrabPay, Boost and ShopeePay, and most payment gateways bundle several of them behind one integration.",
      "Gateways usually publish a distinct e-wallet rate, often between the FPX and card rates. Which specific wallets you get differs by provider, so check the supported-methods list on each gateway's detail page before deciding.",
    ],
    related: [
      { label: "Best e-wallet gateways", href: "/best/payment-gateway-ewallet/" },
      { label: "Help me choose", href: "/choose/" },
    ],
  },
  {
    slug: "bnpl",
    term: "BNPL",
    question: "What is BNPL?",
    title: "What is BNPL? Buy now, pay later in Malaysia | MPG",
    description:
      "Buy now, pay later explained for Malaysian merchants: how instalment providers like Atome and SPayLater pay you upfront, and what it costs.",
    def: "Buy Now, Pay Later: the customer pays in instalments (Atome, SPayLater, etc.) while you're paid upfront, minus a higher merchant fee.",
    body: [
      "The BNPL provider takes on the instalment risk: your customer splits the purchase into three or more payments, while you receive the full amount upfront minus the provider's merchant fee. That fee is noticeably higher than FPX or card rates because it prices in credit risk.",
      "BNPL works best for baskets large enough that instalments genuinely change the buying decision. Some full-service gateways include a BNPL option alongside other channels, while dedicated providers integrate as their own checkout button.",
    ],
    related: [
      { label: "BNPL providers in Malaysia", href: "/best/bnpl-malaysia/" },
      { label: "Browse all providers", href: "/gateways/?category=bnpl" },
    ],
  },
  {
    slug: "mdr",
    term: "MDR / discount rate",
    question: "What is MDR (Merchant Discount Rate)?",
    title: "What is MDR? Merchant Discount Rate explained | MPG",
    description:
      "MDR, the Merchant Discount Rate, is the cut a payment gateway keeps per transaction. What it covers, and how to compare MDRs honestly.",
    def: "Merchant Discount Rate: the percentage a gateway keeps per successful transaction. The headline 'fee' in the comparison table.",
    body: [
      "If your MDR for cards is 1.5% and a customer pays RM100, the gateway settles RM98.50 to you. The MDR bundles the acquirer's margin, card network fees and processing costs into one number, which is why it differs by payment channel.",
      "Compare MDRs on the same channel and the same transaction size, and watch for flat add-ons per transaction: a low percentage plus a fixed fee can cost more on small baskets than a higher plain percentage. That is exactly what this site's estimated cost per RM100 normalises.",
    ],
    related: [
      { label: "Cheapest payment gateways", href: "/best/cheapest-payment-gateway-malaysia/" },
      { label: "How fees are ranked", href: "/gateways/" },
    ],
  },
  {
    slug: "settlement",
    term: "Settlement (T+1 / T+2)",
    question: "What does settlement (T+1, T+2) mean?",
    title: "Settlement T+1 vs T+2: payout timing explained | MPG",
    description:
      "What T+1 and T+2 settlement mean for a Malaysian merchant, why payout timing differs by channel, and how it affects your cash flow.",
    def: "How many business days after a payment the money lands in your bank account. T+2 means two working days later.",
    body: [
      "T stands for the transaction day. T+1 means the money reaches your bank account one working day after the customer paid; T+2 means two. Weekends and public holidays do not count, so a Friday sale on T+2 can land the following Tuesday.",
      "Settlement speed often differs by channel within the same gateway: FPX may settle faster than cards. If cash flow is tight, weigh a slightly higher fee with faster settlement against the cheapest headline rate.",
    ],
    related: [
      { label: "Fastest-settlement gateways ranked", href: "/best/fastest-settlement/" },
      { label: "Compare settlement side by side", href: "/compare/" },
      { label: "Browse all gateways", href: "/gateways/" },
    ],
  },
  {
    slug: "webhook",
    term: "Webhook / callback",
    question: "What is a payment webhook?",
    title: "Payment webhooks and callbacks, explained | MPG",
    description:
      "Why the webhook, not the browser redirect, is the source of truth for whether you were paid, and how Malaysian gateways deliver them.",
    def: "A server-to-server message the gateway sends your backend when a payment's status changes. It's the source of truth for whether you were actually paid, not the browser redirect.",
    body: [
      "After a payment, two things happen: the customer's browser is redirected back to your site, and the gateway's server sends your server a webhook (some Malaysian providers call it a callback). The redirect can be faked, abandoned or replayed; the signed webhook cannot, so fulfilment must key off the webhook alone.",
      "A safe handler verifies the signature, checks the amount and currency against your own pending record, marks the order paid exactly once, and returns success. Everything else, including redirect pages, is presentation.",
    ],
    related: [
      { label: "The safe integration flow", href: "/learn/integration-flow/" },
      { label: "Signature verification", href: "/learn/glossary/signature-verification/" },
    ],
  },
  {
    slug: "signature-verification",
    term: "Signature / checksum verification",
    question: "What is signature verification?",
    title: "Payment signature verification, explained | MPG",
    description:
      "How HMAC signatures on gateway callbacks prove a payment notice is genuine, and why skipping verification lets anyone fake a payment.",
    def: "A cryptographic stamp (usually HMAC) on each callback proving it really came from the gateway and wasn't tampered with. Always verify it before trusting a webhook.",
    body: [
      "Each webhook carries a signature computed from the payload and a secret key only you and the gateway share. Recompute it on your side and compare before trusting anything in the message. If they differ, discard the request: anyone on the internet can POST to your webhook URL.",
      "Skipping this check is the classic Malaysian integration bug: an attacker replays or forges a success callback and walks away with fulfilled goods that were never paid for. Every gateway documents its exact signing recipe; follow it precisely, including field order and encoding.",
    ],
    related: [
      { label: "The safe integration flow", href: "/learn/integration-flow/" },
      { label: "Production checklist", href: "/learn/checklist/" },
    ],
  },
  {
    slug: "idempotent-settlement",
    term: "Idempotent settlement",
    question: "What is idempotent settlement?",
    title: "Idempotent settlement in payments, explained | MPG",
    description:
      "Why processing the same paid event twice must not ship goods twice, and how to make a payment webhook handler safely re-runnable.",
    def: "Processing the same paid event twice must not deliver the goods twice or double-count revenue. Key off the gateway's reference and ignore repeats.",
    body: [
      "Gateways retry webhooks when your server is slow or returns an error, so receiving the same success event several times is normal, not a bug. Your handler must produce the same result no matter how many times it runs: one order marked paid, one fulfilment, one revenue entry.",
      "The standard pattern is to record the gateway's transaction reference the first time you process it, and short-circuit any later event carrying the same reference. Do the check and the state change inside one database transaction to close race windows.",
    ],
    related: [
      { label: "The safe integration flow", href: "/learn/integration-flow/" },
      { label: "Webhooks explained", href: "/learn/glossary/webhook/" },
    ],
  },
  {
    slug: "sandbox-vs-live",
    term: "Sandbox vs live",
    question: "Sandbox vs live mode: what's the difference?",
    title: "Sandbox vs live mode in payment gateways | MPG",
    description:
      "What separates a gateway's sandbox from live mode: fake money, separate keys and test banks, and what to switch before going to production.",
    def: "Sandbox is a test environment with fake money and test keys. Live uses real money and production keys. Build and test in sandbox first; the two have separate credentials.",
    body: [
      "Sandbox lets you exercise the whole flow, including simulated FPX banks and test cards, without moving real money. It has its own API keys, its own webhook secrets and often its own dashboard, so nothing you do there can touch production.",
      "Going live is a credential swap, not a code rewrite: point your integration at the live endpoints, replace every test key with its production counterpart, and re-run one real end-to-end payment. Leaving a single sandbox key in production is one of the most common launch failures.",
    ],
    related: [
      { label: "Production checklist", href: "/learn/checklist/" },
      { label: "The safe integration flow", href: "/learn/integration-flow/" },
    ],
  },
  {
    slug: "tokenisation",
    term: "Tokenisation",
    question: "What is card tokenisation?",
    title: "What is card tokenisation in payments? | MPG",
    description:
      "How tokenisation replaces card numbers with safe tokens so you can charge customers again without storing card data or carrying PCI scope.",
    def: "Replacing card details with a safe token so you can charge again later without ever storing the raw card number.",
    body: [
      "The first time a customer pays, the gateway vaults the card and hands you an opaque token. Future charges reference the token; the real card number never touches your database, which keeps you out of serious PCI DSS scope.",
      "Tokenisation is the foundation for one-click checkout and subscriptions. If you plan recurring billing, confirm the gateway offers token storage or a subscription API on its detail page before you commit.",
    ],
    related: [
      { label: "Gateways with recurring billing", href: "/best/payment-gateway-recurring/" },
      { label: "Recurring payments", href: "/learn/glossary/recurring-payments/" },
    ],
  },
  {
    slug: "recurring-payments",
    term: "Recurring / subscription",
    question: "How do recurring payments work?",
    title: "Recurring payments in Malaysia, explained | MPG",
    description:
      "How subscription billing works with Malaysian gateways: saved payment methods, retries on failure, and which rails support recurring charges.",
    def: "Automatically charging a saved payment method on a schedule (memberships, SaaS plans, instalments).",
    body: [
      "Recurring billing charges a saved payment method on a schedule without the customer being present. In Malaysia that is usually a tokenised card; bank-transfer rails like FPX are customer-initiated, so they do not support background charges in the same way.",
      "A good recurring setup handles more than the happy path: failed-charge retries, card-expiry updates and cancellation flows. Gateways with a subscription API do this for you; with a bare charge API you schedule and retry yourself.",
    ],
    related: [
      { label: "Best gateways for recurring billing", href: "/best/payment-gateway-recurring/" },
      { label: "Tokenisation", href: "/learn/glossary/tokenisation/" },
    ],
  },
  {
    slug: "mcp",
    term: "MCP",
    question: "What is MCP (Model Context Protocol)?",
    title: "What is MCP? Model Context Protocol | MPG",
    description:
      "The Model Context Protocol lets AI coding agents query a service directly. What an official MCP server means when picking a payment gateway.",
    def: "Model Context Protocol: a standard that lets AI coding tools (Claude, Cursor, Codex) talk to a service's API directly. A gateway with an official MCP server is the easiest to wire up with an agent.",
    body: [
      "MCP gives AI coding tools a standard way to call a service: instead of pasting documentation into a prompt, the agent connects to the provider's MCP server and reads live, structured answers. For payment gateways that means an agent can look up APIs, create test objects or inspect payments while it writes your integration.",
      "This directory tracks MCP support per gateway (official, community or none), and MPG itself ships an MCP server, so an agent can query this directory the same way while choosing a provider.",
    ],
    related: [
      { label: "Build with AI agents", href: "/learn/ai-agents/" },
      { label: "MPG's own MCP server", href: "/learn/api/" },
    ],
  },
  {
    slug: "agent-skill",
    term: "Agent skill",
    question: "What is an AI agent skill?",
    title: "AI agent skills for payment integrations | MPG",
    description:
      "Agent skills are packaged instructions that teach AI coding tools to integrate a specific Malaysian gateway safely: verified flows, not guesses.",
    def: "A packaged instruction set that teaches an AI coding agent how to integrate a specific gateway correctly and securely. See the setup-* skills in the Build with AI agents section.",
    body: [
      "A skill bundles the provider-specific knowledge an AI coding agent needs: correct endpoints, the signing recipe for callbacks, sandbox setup and the security rules that must not be skipped. The agent follows the skill instead of improvising from partial training data.",
      "Most gateways in this directory link a matching setup skill on their detail page, and every detail page offers a ready copy-paste prompt so you can hand your agent the right starting point in one click.",
    ],
    related: [
      { label: "Build with AI agents", href: "/learn/ai-agents/" },
      { label: "Browse gateways", href: "/gateways/" },
    ],
  },
];

export function glossaryPath(slug: string): string {
  return `/learn/glossary/${slug}/`;
}
