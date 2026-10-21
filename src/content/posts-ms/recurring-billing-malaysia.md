---
title: "Caj berulang automatik di Malaysia: cara ia berfungsi"
description: "Cara caj berulang automatik berfungsi untuk peniaga Malaysia: API langganan vs jadual caj sendiri, bayaran gagal, cubaan semula dan kos setiap cara."
faq:
  - q: "Perlu ke tulis kod untuk setup caj berulang automatik?"
    a: "Tidak semestinya. Ada gateway yang dah masukkan caj berulang dalam dashboard. Anda boleh buat pelan dan kongsi link pendaftaran tanpa kod. Gateway lain beri API langganan atau API caj biasa (sambungan terus ke sistem anda). Developer anda pula uruskan jadual, cubaan semula dan pembatalan."
  - q: "Adakah caj berulang lebih mahal daripada bayaran sekali?"
    a: "Boleh jadi. Ada gateway yang tambah caj atas kadar kad biasa untuk ciri langganan. Xendit senaraikan MYR1.50 untuk setiap langganan aktif sebulan. HitPay tambah caj 0.2% bila anda guna alat perisiannya, termasuk caj berulang. Jadi semak caj tambahan juga, jangan tengok kadar dalam iklan sahaja."
  - q: "Apa jadi bila caj kad berulang gagal?"
    a: "Caj itu gagal dan pelanggan tak dicaj. Sistem yang baik akan cuba semula ikut jadual, hantar email minta pelanggan kemas kini kad, dan tangguh atau batalkan pelan kalau gagal beberapa kali. API langganan biasanya uruskan semua ini. Kalau guna API caj biasa, anda kena bina sendiri."
  - q: "Tempoh duit masuk mana yang penting untuk langganan?"
    a: "Tempoh duit masuk ialah berapa lama gateway pegang duit anda sebelum masukkan ke akaun anda. Untuk langganan, tempoh ini berulang setiap kali caj. Jadi gateway T+7 (tujuh hari selepas jualan) sentiasa pegang duit jualan anda seminggu. Banding tempoh duit masuk bersama caj."
---

Caj berulang automatik ialah sistem di sebalik bayaran berulang. Ia jawab tiga
soalan: siapa simpan cara bayar pelanggan, siapa tentukan bila nak caj, dan apa
jadi bila caj gagal. Gateway di Malaysia ada tiga cara setup. Cara yang anda
pilih tentukan berapa banyak kerja anda kena buat, dan berapa banyak anda bayar.

## Tiga cara jalankan caj berulang automatik

**1. Caj berulang yang siap ada (tanpa kod).** Dalam dashboard gateway, anda
buat pelan dan kongsi link pendaftaran. Gateway simpan kad, jalankan jadual dan
hantar resit. HitPay buat begini. Caj berulangnya ada dalam akaun yang sama
dengan checkout (halaman bayar), invois dan POS.

**2. API langganan.** API ialah sambungan terus antara sistem anda dengan
gateway. Anda buat pelanggan dan pelan melalui API, dan gateway jalankan jadual
caj untuk anda. Stripe Billing contoh paling terkenal. Ia uruskan langganan dan
caj ikut penggunaan. Xendit dan Curlec pun ada produk langganan.

**3. API caj, campur token yang disimpan.** Gateway simpan
[token kad](/learn/glossary/tokenisation/), dan sistem anda sendiri tentukan
bila nak caj. Anda dapat kawalan penuh, dan juga tanggungjawab penuh. Jadual,
cubaan semula dan email peringatan bayaran semuanya kod anda yang buat.

Kebanyakan PKS paling sesuai dengan cara 1 atau 2. Cara 3 untuk pasukan yang
dah ada sistem bil sendiri.

## Bahagian yang selalu rosak: caj gagal

Kad boleh tamat tempoh, diganti selepas kes penipuan, atau sampai had. Kalau
sistem bayaran berulang anda cuma jalan bila semuanya okey, anda akan hilang
pelanggan tanpa sedar. Perkara asas yang perlu ada, seperti dalam
[entri glosari bayaran berulang](/learn/glossary/recurring-payments/):

- **Cubaan semula** ikut jadual, bukan cuba sekali sahaja.
- **Cara kemas kini kad**, supaya pelanggan boleh tukar kad yang dah tamat
  tempoh dengan satu klik.
- **Cara batal yang jelas**, supaya pelanggan yang berhenti tak dicaj lagi.
- **[Webhook](/learn/glossary/webhook/)** (mesej automatik dari gateway ke
  sistem anda), supaya sistem anda tahu bila caj berjaya atau gagal. Dengan itu,
  sistem boleh buka atau tangguh akses pelanggan.

API langganan biasanya dah uruskan tiga yang pertama. Kalau guna API caj biasa,
sediakan masa developer untuk keempat-empatnya.

## Berapa kos caj berulang automatik

Caj untuk setiap bayaran biasanya ikut kadar kad gateway. Tapi hati-hati dengan
caj tambahan untuk langganan. Xendit caj MYR1.50 untuk setiap langganan aktif
sebulan, atas kadar kad. HitPay tambah 0.2% bila anda guna alat perisiannya,
termasuk caj berulang. Stripe tiada fee setup atau fee bulanan, tapi kadar kad
Malaysianya agak tinggi dan duit masuk pada T+7 (tujuh hari selepas jualan).

Jadual di bawah banding tiga gateway ini, terus dari data yang disemak.
Masukkan harga pelan bulanan anda dalam [kalkulator caj](/calculator/). Lepas
itu lihat semua pilihan yang disusun dalam
[senarai gateway bayaran berulang](/best/payment-gateway-recurring/), atau kalau
anda bina perisian, [senarai gateway SaaS](/best/payment-gateway-saas/). Untuk
perbandingan lebih luas, baca
[perbandingan payment gateway bayaran berulang di Malaysia](/blog/recurring-payment-gateway-malaysia/).
