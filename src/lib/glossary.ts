// Glossary registry (spec 12 item 2): single source for the /learn/glossary
// hub and the per-term pages at /learn/glossary/<slug>/. Pure data, no DOM.
// Copy rules: plain English (and plain everyday Malay in `ms`), no em-dashes, never state a fee number here
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
  /**
   * Bahasa Malaysia copy for /ms/ pages. Plain everyday Malay for business
   * owners; same SERP windows and house style as the English fields.
   * `related` holds the BM labels in the same order as the English links.
   */
  ms: {
    term: string;
    question: string;
    title: string;
    description: string;
    def: string;
    body: string[];
    related: string[];
  };
}

/** Reader-facing copy of a term in the page's language (hrefs stay shared). */
export function termCopy(t: GlossaryTerm, locale: "en" | "ms") {
  if (locale === "en") {
    const { term, question, title, description, def, body, related } = t;
    return { term, question, title, description, def, body, related };
  }
  return {
    ...t.ms,
    related: t.related.map((r, i) => ({ href: r.href, label: t.ms.related[i] ?? r.label })),
  };
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
    ms: {
      term: "FPX",
      question: "Apa itu FPX?",
      title: "Apa itu FPX? Bayar guna online banking | MPG",
      description:
        "Apa itu FPX dalam bahasa mudah: macam mana bayar guna online banking berfungsi, siapa yang uruskan, berapa caj untuk peniaga, dan cara terima FPX.",
      def: "FPX (Financial Process Exchange) ialah cara bayar guna online banking: pelanggan log masuk ke bank sendiri dan sahkan bayaran. PayNet yang uruskan FPX, dan hampir semua gateway ada FPX.",
      body: [
        "Bila pelanggan pilih FPX masa bayar, dia dibawa ke laman bank dia sendiri. Dia log masuk, sahkan bayaran, kemudian dibawa balik ke laman anda. Duit pindah terus dari akaun bank dia. Tiada kad terlibat, jadi tiada chargeback (pelanggan minta bank tarik balik duit) macam bayaran kad.",
        "Bagi peniaga, FPX biasanya cara bayar paling murah. Kebanyakan gateway caj jumlah tetap dalam ringgit, atau peratus yang kecil, bagi setiap transaksi. Pelanggan sahkan sendiri dalam bank dia, jadi risiko penipuan rendah. Cuma, pelanggan mesti ada online banking.",
      ],
      related: ["Payment gateway FPX terbaik", "PayNet, yang uruskan FPX", "Lihat semua gateway"],
    },
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
    ms: {
      term: "DuitNow QR",
      question: "Apa itu DuitNow QR?",
      title: "Apa itu DuitNow QR? Kod QR standard negara | MPG",
      description:
        "DuitNow QR dalam bahasa mudah: QR standard negara, macam mana satu kod boleh terima bayaran dari app bank dan e-wallet, dan berapa caj untuk peniaga.",
      def: "Kod QR standard negara. Satu kod QR boleh diimbas guna kebanyakan app bank dan e-wallet di Malaysia.",
      body: [
        "DuitNow QR diuruskan oleh PayNet, syarikat yang sama uruskan FPX. Anda tak perlu letak satu QR untuk setiap e-wallet. Cukup satu kod, dan pelanggan boleh imbas guna hampir semua app bank atau e-wallet di Malaysia.",
        "Gateway online letak DuitNow QR sebagai satu pilihan bayar, sebelah FPX dan kad. Caj biasanya rendah dan dikira ikut peratus. Sesetengah gateway ada caj minimum bagi setiap transaksi. Ia sesuai untuk pelanggan yang lebih suka imbas QR guna telefon daripada taip maklumat bank.",
      ],
      related: ["Gateway DuitNow QR terbaik", "PayNet, yang uruskan DuitNow QR", "Banding gateway"],
    },
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
    ms: {
      term: "E-wallet",
      question: "Apa itu bayaran e-wallet?",
      title: "Terima bayaran e-wallet di Malaysia | MPG",
      description:
        "Apa maksud terima e-wallet macam Touch 'n Go, GrabPay, Boost dan ShopeePay bagi peniaga Malaysia, dan macam mana gateway kira caj e-wallet.",
      def: "App simpan duit dalam telefon, macam Touch 'n Go eWallet, GrabPay, Boost dan ShopeePay. Gateway biasanya ada caj khas untuk e-wallet, lain dari caj FPX dan kad.",
      body: [
        "Pelanggan bayar guna baki duit dalam app, bukan terus dari akaun bank atau kad. Di Malaysia, empat yang paling besar ialah Touch 'n Go eWallet, GrabPay, Boost dan ShopeePay. Kebanyakan gateway beri beberapa e-wallet sekali gus, dengan satu sambungan sahaja.",
        "Gateway biasanya siarkan caj e-wallet yang tersendiri, selalunya lebih mahal dari FPX tapi lebih murah dari kad. E-wallet yang anda dapat lain-lain ikut gateway. Jadi semak senarai cara bayar di halaman setiap gateway sebelum pilih.",
      ],
      related: ["Gateway e-wallet terbaik", "Bantu saya pilih"],
    },
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
    ms: {
      term: "BNPL",
      question: "Apa itu BNPL?",
      title: "Apa itu BNPL? Beli dulu, bayar kemudian | MPG",
      description:
        "Beli dulu bayar kemudian, untuk peniaga Malaysia: macam mana syarikat ansuran seperti Atome dan SPayLater bayar anda dulu, dan berapa kosnya.",
      def: "Buy Now, Pay Later (beli dulu, bayar kemudian): pelanggan bayar ansuran guna Atome, SPayLater dan lain-lain. Anda terima duit penuh terus, tolak fee yang lebih tinggi dari biasa.",
      body: [
        "Syarikat BNPL yang tanggung risiko kalau pelanggan tak habis bayar ansuran. Pelanggan pecahkan harga kepada tiga bayaran atau lebih. Anda pula terima jumlah penuh terus, tolak fee syarikat BNPL itu. Fee ini jelas lebih tinggi dari caj FPX atau kad, sebab ia termasuk risiko beri hutang.",
        "BNPL paling berbaloi untuk barang yang cukup mahal, sampai pilihan ansuran boleh buat pelanggan jadi beli. Sesetengah gateway sudah ada BNPL bersama cara bayar lain. Syarikat BNPL sendiri pula dipasang sebagai butang bayar yang berasingan.",
      ],
      related: ["Syarikat BNPL di Malaysia", "Lihat semua syarikat BNPL"],
    },
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
    ms: {
      term: "MDR (Merchant Discount Rate)",
      question: "Apa itu MDR (Merchant Discount Rate)?",
      title: "Apa itu MDR? Merchant Discount Rate diterangkan | MPG",
      description:
        "MDR (Merchant Discount Rate) ialah bahagian yang gateway ambil dari setiap transaksi. Apa yang termasuk dalamnya, dan cara banding MDR dengan adil.",
      def: "Peratus yang gateway potong dari setiap bayaran yang berjaya. Inilah caj utama yang anda nampak dalam jadual perbandingan kami.",
      body: [
        "Contoh: MDR kad ialah 1.5% dan pelanggan bayar RM100. Gateway potong RM1.50, dan RM98.50 masuk ke akaun anda. Angka MDR ini sudah gabungkan untung bank yang proses bayaran, caj syarikat kad dan kos proses. Sebab itu MDR lain-lain ikut cara bayar.",
        "Bila banding MDR, banding cara bayar yang sama dan jumlah jualan yang sama. Hati-hati dengan caj tetap tambahan bagi setiap transaksi. Peratus rendah campur caj tetap boleh jadi lebih mahal untuk jualan kecil, berbanding peratus lebih tinggi tanpa caj tetap. Sebab itu laman ini kira anggaran caj bagi setiap jualan RM100, supaya semua gateway dibanding dengan cara yang sama.",
      ],
      related: ["Payment gateway paling murah", "Cara kami susun fee"],
    },
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
    ms: {
      term: "Duit masuk (T+1 / T+2)",
      question: "Apa maksud tempoh duit masuk (T+1, T+2)?",
      title: "T+1 vs T+2: bila duit masuk ke akaun anda | MPG",
      description:
        "Apa maksud T+1 dan T+2 bagi peniaga Malaysia, kenapa tempoh duit masuk lain-lain ikut cara bayar, dan kesannya pada aliran tunai anda.",
      def: "Berapa hari bekerja selepas pelanggan bayar sampai duit masuk ke akaun bank anda. T+2 maksudnya dua hari bekerja kemudian.",
      body: [
        "T ialah hari pelanggan bayar. T+1 maksudnya duit masuk ke akaun anda satu hari bekerja selepas itu. T+2 pula dua hari bekerja. Hujung minggu dan cuti umum tak dikira. Jadi jualan hari Jumaat dengan T+2 mungkin masuk hari Selasa minggu depan.",
        "Dalam gateway yang sama pun, duit masuk boleh lain-lain ikut cara bayar. Contohnya, duit FPX mungkin masuk lebih cepat dari kad. Kalau duit tunai anda ketat, gateway yang caj sedikit tinggi tapi duit masuk lebih cepat mungkin lebih sesuai dari gateway yang paling murah.",
      ],
      related: ["Gateway dengan duit masuk paling cepat", "Banding tempoh duit masuk", "Lihat semua gateway"],
    },
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
    ms: {
      term: "Webhook / callback",
      question: "Apa itu webhook bayaran?",
      title: "Webhook dan callback bayaran, diterangkan | MPG",
      description:
        "Kenapa webhook, bukan halaman yang pelanggan nampak lepas bayar, yang jadi bukti sebenar anda sudah dibayar, dan cara gateway Malaysia hantar webhook.",
      def: "Mesej automatik yang gateway hantar terus ke sistem anda bila status bayaran berubah. Inilah bukti sebenar anda sudah dibayar, bukan halaman yang pelanggan nampak lepas bayar.",
      body: [
        "Lepas pelanggan bayar, dua benda berlaku. Pelanggan dibawa balik ke laman anda, dan gateway hantar webhook ke sistem anda (sesetengah gateway Malaysia panggil callback). Langkah pelanggan dibawa balik itu boleh dipalsukan, terputus di tengah jalan, atau diulang. Webhook yang ada tandatangan digital tak boleh dipalsukan. Jadi hantar barang hanya bila webhook sampai.",
        "Sistem yang selamat buat empat benda bila webhook sampai: semak tandatangan, semak jumlah dan mata wang sama dengan pesanan anda, tanda pesanan dibayar sekali sahaja, dan balas berjaya kepada gateway. Halaman yang pelanggan nampak lepas bayar cuma paparan, bukan bukti.",
      ],
      related: ["Cara sambung gateway dengan selamat", "Semakan tandatangan"],
    },
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
    ms: {
      term: "Semakan tandatangan / checksum",
      question: "Apa itu semakan tandatangan (signature)?",
      title: "Semakan tandatangan bayaran, diterangkan | MPG",
      description:
        "Cara tandatangan HMAC pada callback gateway buktikan mesej bayaran itu tulen, dan kenapa kalau tak disemak, sesiapa sahaja boleh palsukan bayaran.",
      def: "Cop rahsia digital (biasanya HMAC) pada setiap callback, yang buktikan mesej itu betul-betul dari gateway dan tak diusik orang. Sentiasa semak cop ini sebelum percaya webhook.",
      body: [
        "Setiap webhook datang dengan satu tandatangan. Ia dikira dari isi mesej dan satu kunci rahsia yang hanya anda dan gateway tahu. Sistem anda kira semula tandatangan itu dan bandingkan dulu, sebelum percaya apa-apa dalam mesej. Kalau tak sama, buang mesej itu. Sesiapa sahaja di internet boleh hantar mesej ke alamat webhook anda.",
        "Tak buat semakan ini ialah kesilapan paling biasa bila sambung gateway di Malaysia. Penipu hantar semula atau palsukan mesej bayaran berjaya, dan dapat barang yang tak pernah dibayar. Setiap gateway terangkan cara tandatangan mereka dikira. Ikut betul-betul, termasuk susunan maklumat dan format teks.",
      ],
      related: ["Cara sambung gateway dengan selamat", "Senarai semak sebelum mula live"],
    },
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
    ms: {
      term: "Idempotent (bayaran dikira sekali)",
      question: "Apa itu idempotent settlement?",
      title: "Idempotent: bayaran sama dikira sekali sahaja | MPG",
      description:
        "Kenapa bayaran yang sama diproses dua kali tak boleh hantar barang dua kali, dan cara buat sistem webhook yang selamat walaupun mesej sampai berulang kali.",
      def: "Kalau mesej bayaran yang sama sampai dua kali, sistem anda tak boleh hantar barang dua kali atau kira jualan dua kali. Guna nombor rujukan dari gateway, dan abaikan mesej yang berulang.",
      body: [
        "Bila sistem anda lambat atau balas ralat, gateway akan hantar webhook semula. Jadi dapat mesej berjaya yang sama beberapa kali itu perkara biasa, bukan rosak. Sistem anda mesti beri hasil yang sama walau berapa kali mesej itu diproses: satu pesanan dibayar, satu penghantaran, satu rekod jualan.",
        "Caranya: kali pertama mesej sampai, simpan nombor rujukan transaksi dari gateway. Kalau mesej lain datang dengan nombor yang sama, abaikan. Buat semakan dan tukar status dalam satu langkah database, supaya dua mesej yang sampai serentak tak diproses dua kali.",
      ],
      related: ["Cara sambung gateway dengan selamat", "Webhook diterangkan"],
    },
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
    ms: {
      term: "Sandbox vs live",
      question: "Sandbox vs live: apa bezanya?",
      title: "Mod sandbox vs live dalam payment gateway | MPG",
      description:
        "Beza sandbox dan live dalam gateway: duit olok-olok, key berasingan dan bank ujian, serta apa yang perlu ditukar sebelum mula terima duit sebenar.",
      def: "Sandbox ialah mod ujian dengan duit olok-olok, manakala live guna duit sebenar. Uji semua dalam sandbox dulu, dan ingat key (kod akses) untuk kedua-duanya berlainan.",
      body: [
        "Dalam sandbox, anda boleh cuba seluruh proses bayaran, termasuk bank FPX ujian dan kad ujian, tanpa duit sebenar bergerak. Sandbox ada API key sendiri, kunci rahsia webhook sendiri, dan selalunya dashboard sendiri. Jadi apa sahaja yang anda buat di situ tak kacau sistem sebenar.",
        "Untuk mula live, anda cuma tukar key, bukan tulis semula kod. Tukar alamat sambungan ke alamat live, ganti setiap key ujian dengan key sebenar, kemudian buat satu bayaran sebenar dari mula sampai habis. Tertinggal satu key sandbox dalam sistem sebenar ialah antara masalah paling biasa masa mula live.",
      ],
      related: ["Senarai semak sebelum mula live", "Cara sambung gateway dengan selamat"],
    },
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
    ms: {
      term: "Tokenisation",
      question: "Apa itu tokenisation kad?",
      title: "Apa itu tokenisation kad dalam bayaran? | MPG",
      description:
        "Cara tokenisation ganti nombor kad dengan token yang selamat, supaya anda boleh caj pelanggan lagi tanpa simpan data kad atau tanggung beban PCI.",
      def: "Gateway tukar maklumat kad pelanggan kepada token (kod ganti) yang selamat. Anda boleh caj kad itu lagi nanti tanpa simpan nombor kad sebenar.",
      body: [
        "Kali pertama pelanggan bayar, gateway simpan kad itu di tempat selamat dan beri anda satu token. Token itu kod yang tak bermakna kepada orang lain. Bila nak caj lagi, anda guna token itu. Nombor kad sebenar tak pernah masuk sistem anda, jadi anda terlepas dari banyak peraturan keselamatan kad (PCI DSS) yang berat.",
        "Token inilah yang buat checkout satu klik dan langganan boleh jalan. Kalau anda nak caj pelanggan secara berulang, pastikan halaman gateway itu sebut ada simpanan token atau API langganan, sebelum anda pilih.",
      ],
      related: ["Gateway dengan caj berulang automatik", "Bayaran berulang"],
    },
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
    ms: {
      term: "Bayaran berulang / langganan",
      question: "Macam mana bayaran berulang berfungsi?",
      title: "Bayaran berulang di Malaysia, diterangkan | MPG",
      description:
        "Cara caj langganan berfungsi dengan gateway Malaysia: cara bayar yang disimpan, cuba semula bila gagal, dan cara bayar mana yang boleh caj berulang.",
      def: "Caj automatik ikut jadual pada cara bayar yang pelanggan sudah simpan. Contoh: yuran keahlian, langganan software, ansuran.",
      body: [
        "Caj berulang potong bayaran dari cara bayar yang disimpan, ikut jadual, tanpa pelanggan perlu buat apa-apa. Di Malaysia, biasanya ia guna kad yang sudah ditukar jadi token. FPX pula pelanggan sendiri yang mulakan setiap kali, jadi FPX tak boleh potong bayaran secara automatik macam kad.",
        "Caj berulang yang baik bukan setakat jalan bila semua okey. Ia juga perlu cuba caj semula bila gagal, kemas kini kad yang sudah tamat tempoh, dan bagi pelanggan batal langganan. Gateway yang ada API langganan buat semua ini untuk anda. Kalau gateway cuma ada API caj biasa (caj satu kali), anda sendiri kena atur jadual dan cuba semula.",
      ],
      related: ["Gateway terbaik untuk caj berulang automatik", "Tokenisation"],
    },
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
    ms: {
      term: "MCP",
      question: "Apa itu MCP (Model Context Protocol)?",
      title: "Apa itu MCP? Model Context Protocol | MPG",
      description:
        "Model Context Protocol biar AI yang tulis kod tanya sesuatu servis secara terus. Apa maksudnya kalau gateway ada server MCP rasmi, bila anda pilih gateway.",
      def: "Model Context Protocol: satu standard yang biar alat AI penulis kod (Claude, Cursor, Codex) bercakap terus dengan API sesuatu servis. Gateway yang ada server MCP rasmi paling mudah disambung guna AI.",
      body: [
        "MCP beri alat AI satu cara standard untuk guna sesuatu servis. Tak perlu salin dokumentasi ke dalam chat AI. AI itu sambung terus ke server MCP gateway dan baca jawapan terkini yang tersusun. Bagi payment gateway, maksudnya AI boleh semak API, buat data ujian atau tengok bayaran, sambil ia tulis kod sambungan untuk anda.",
        "Kami rekod sokongan MCP setiap gateway (rasmi, komuniti atau tiada). MPG sendiri pun ada server MCP, jadi AI boleh tanya direktori ini dengan cara yang sama masa bantu anda pilih gateway.",
      ],
      related: ["Bina dengan AI agent", "Server MCP milik MPG"],
    },
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
    ms: {
      term: "Agent skill",
      question: "Apa itu AI agent skill?",
      title: "AI agent skill untuk sambung payment gateway | MPG",
      description:
        "Agent skill ialah set arahan siap yang ajar alat AI cara sambung gateway Malaysia tertentu dengan selamat: langkah yang sudah disemak, bukan agakan.",
      def: "Satu set arahan siap yang ajar AI penulis kod cara sambung gateway tertentu dengan betul dan selamat. Lihat setup-* skill di bahagian Bina dengan AI agent.",
      body: [
        "Skill ini kumpulkan apa yang AI perlu tahu tentang satu gateway: alamat API yang betul, cara kira tandatangan untuk callback, cara setup sandbox, dan peraturan keselamatan yang tak boleh dilangkau. AI ikut skill itu, bukan main teka dari apa yang ia separuh tahu.",
        "Kebanyakan gateway dalam direktori ini ada pautan ke setup skill yang sepadan di halaman gateway itu. Setiap halaman gateway juga ada prompt (arahan untuk AI) siap untuk disalin. Satu klik, dan AI anda dapat titik mula yang betul.",
      ],
      related: ["Bina dengan AI agent", "Lihat gateway"],
    },
  },
];

export function glossaryPath(slug: string): string {
  return `/learn/glossary/${slug}/`;
}
