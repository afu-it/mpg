---
tagline: "Payment gateway Malaysia dengan e-wallet dan mesin POS"
settlement: "Hubungi jualan"
notes: "Disemak semula pada 2026-10-20 melalui pelayar sebenar (bacaan biasa disekat dengan ralat 403): kadar Standard Package tidak berubah; Starter Package kini turut menunjukkan kad debit tempatan 1.50%, UnionPay 3.50%, pelbagai mata wang 4.00% dan fee bulanan RM29 yang dikecualikan jika GTV (jumlah nilai jualan) melebihi RM8,000. Baris DuitNow QR dan e-wallet hanya ada logo di halaman itu, jadi nilai itu dibawa dari bacaan sebelum ini. Bayaran berulang: halaman bayaran rasmi (kiple.com/payments) menyenaraikan Recurring Payments dan Tokenization sebagai ciri gateway. MBSB Bank sebagai bank FPX yang disokong, dan sokongan bayaran berulang: pengesahan Kiple melalui email kepada MPG, 2026-10-12 (MBSB tidak ditunjukkan di mana-mana halaman awam Kiple). Sebelum ini: disemak semula pada 2026-07-17 melalui Firecrawl (melepasi sekatan Cloudflare): nilai promo Standard Package disahkan; halaman itu juga menyenaraikan Fee Tahunan RM500 untuk Standard, dan Starter Package (RM0 sekali bayar, FPX RM1.20/RM2.00, kad kredit tempatan 2.00%, kad luar negara 3.70%, DNQR 1.50%, e-wallet 1.7% hingga 2.0%). UnionPay 2.80%, pelbagai mata wang 3.80%. Standard Package (yang ditunjukkan): FPX B2C RM1.00 / B2B RM1.50, kad kredit tempatan 1.50% / debit 1.00%, kad luar negara 3.20%, e-wallet 1.70% (WeChat 1.50%, Alipay 1.80%), DuitNow QR 1.20%, UnionPay 2.80%. Setup RM199 (promo, daripada RM500); RM29/bulan dikecualikan jika GTV bulanan melebihi RM8,000. Starter Package baharu tanpa fee setup mempunyai kadar lebih tinggi (kad 2.00%, DuitNow QR 1.50%). Tempoh duit masuk tidak disiarkan."
plans:
  - name: "Starter Package"
    eligibility: "Fee sekali bayar RM0 + RM29/bulan (dikecualikan jika GTV melebihi RM8,000)"
    rows:
      - { label: "FPX" }
      - { label: "Kad kredit tempatan" }
      - { label: "Kad debit tempatan" }
      - { label: "Kad luar negara" }
      - { label: "UnionPay" }
      - { label: "Pelbagai mata wang" }
      - { label: "DuitNow QR" }
      - { label: "E-wallet" }
  - name: "Standard Package"
    eligibility: "Promo RM199 sekali bayar (biasanya RM500) + RM29/bulan (dikecualikan jika GTV melebihi RM8,000)"
    rows:
      - { label: "FPX" }
      - { label: "Kad tempatan", value: "1.50% kredit / 1.00% debit" }
      - { label: "Kad luar negara" }
      - { label: "DuitNow QR" }
      - { label: "E-wallet" }
---

Kiple (dikendalikan oleh Kiplepay Sdn Bhd, pengeluar e-money dan pemproses bayaran kad yang dikawal selia oleh Bank Negara Malaysia) menawarkan payment gateway (sistem terima bayaran online) bersama mesin POS di kedai, e-wallet (dompet digital) berjenama sendiri, dan sistem gaji eWages. "Standard Package" untuk SME ada fee sekali bayar RM199 (harga promo, biasanya RM500), fee tahunan RM500, dan fee bulanan RM29 yang dikecualikan apabila jumlah nilai jualan melebihi RM8,000.

Caj setiap transaksi yang disiarkan untuk Standard Package: FPX (bayaran terus dari akaun bank online) RM1.00 (B2C) / RM1.50 (B2B), kad kredit tempatan 1.5%, kad debit tempatan 1.0%, kad luar negara 3.20%, UnionPay 2.80%, dan pelbagai mata wang 3.80%. E-wallet antara 1.5% hingga 1.8% ikut saluran (e-wallet utama Malaysia 1.7%), dan DuitNow QR (bayar dengan imbas kod QR) 1.2%. Ada juga Starter Package yang lebih murah untuk bermula (setup RM0) dan pakej untuk kedai fizikal.

Pelanggan boleh bayar dengan kad kredit/debit, FPX, DuitNow QR, dan e-wallet. Caj Google Pay ikut kadar kad yang digunakan di belakangnya. Kiple menyokong sambungan API (cara sistem anda bercakap terus dengan sistem Kiple), halaman checkout (halaman bayar) yang disediakan, link bayaran, simpanan kad secara selamat (tokenization) dan bayaran berulang (tersenarai di halaman bayarannya dan disahkan oleh Kiple kepada MPG). Kiple juga mengesahkan MBSB Bank sebagai bank perbankan online yang disokong.
