---
title: "Perbandingan payment gateway bayaran berulang di Malaysia (2026)"
description: "Tujuh payment gateway Malaysia dengan caj berulang automatik dibanding: kadar kad, caj tambahan langganan, fee setup dan tempoh duit masuk."
faq:
  - q: "Payment gateway mana di Malaysia yang sokong bayaran berulang?"
    a: "Banyak, termasuk CHIP, HitPay, Xendit, senangPay, Curlec, Stripe dan Bayarcash. Setiap profil gateway dalam direktori ini ada tanda sama ada ia sokong bayaran berulang. Senarai gateway bayaran berulang pula susun semuanya ikut anggaran kos, berdasarkan kadar yang disiarkan."
  - q: "Apa payment gateway bayaran berulang paling murah di Malaysia?"
    a: "Bergantung pada harga pelan anda, dan sama ada gateway itu tambah caj untuk langganan. Banding anggaran kos untuk jualan RM100 dalam jadual. Lepas itu campur caj tambahan: Xendit caj MYR1.50 untuk setiap langganan aktif sebulan, dan HitPay tambah 0.2% pada alat perisiannya."
  - q: "Adakah toyyibPay dan Billplz sokong caj berulang automatik?"
    a: "Kedua-duanya tidak ditanda sokong bayaran berulang dalam direktori ini. Kedua-duanya dibina terutamanya untuk kutip bayaran FPX dan link bayaran. Billplz senaraikan bayaran berulang hanya pada pelan Enterprise, yang harganya perlu dirunding. Jadi tanya pasukan jualannya kalau anda perlu."
  - q: "Boleh ke terima bayaran berulang melalui akaun bank, bukan kad?"
    a: "Boleh, melalui direct debit (tolak terus dari akaun bank). Bayarcash senaraikan direct debit sebagai cara bayar untuk bayaran berulang auto-debit, dengan caj untuk setiap transaksi. FPX biasa tak boleh buat begini, sebab pembayar perlu luluskan setiap bayaran."
---

Banyak payment gateway (syarikat yang terima bayaran online untuk anda) di
Malaysia kata mereka ada caj berulang automatik. Tapi cara dan harganya sangat
berbeza. Ada yang beri percuma. Ada yang tambah fee bulanan untuk setiap
pelanggan langganan. Satu lagi tolak dari akaun bank, bukan kad. Ini tujuh
gateway yang patut masuk senarai pendek anda, dengan kadar terkini dalam jadual
di bawah.

## Tujuh gateway, ikut cara mereka urus bayaran berulang

**CHIP.** Caj berulang melalui token kad yang disimpan (kod ganti nombor kad yang
selamat). Ada juga link bayaran dan API untuk developer (sambungan terus ke
sistem anda). Tiada fee setup atau fee bulanan. Sesuai kalau anda selesa
jalankan caj dari sistem anda sendiri.

**HitPay.** Caj berulang dah ada dalam dashboard, bersama checkout (halaman
bayar), invois, kedai dan POS. Tiada fee setup atau fee bulanan. Tapi ambil
perhatian: ada caj tambahan 0.2% pada alat perisiannya, termasuk caj berulang.

**Xendit.** Langganan ialah produk khas. Cajnya MYR1.50 untuk setiap langganan
aktif sebulan, ditambah atas kadar kad. Ciri payout (bayar keluar kepada pihak
lain) yang kukuh dan liputan banyak negara buat ia sesuai untuk bisnes yang
sedang membesar.

**senangPay.** Gateway PKS yang memang ada caj berulang dan simpanan token kad.
Ada fee langganan tahunan, mula sekitar RM199 setahun. Jumlah minimum untuk
duit masuk ialah RM100.

**Curlec.** Cabang Malaysia milik Razorpay. Ciri langganannya datang dari
platform Razorpay. Ada fee setup sekali bayar, tapi jumlah tepatnya tidak
disiarkan. Jadi tanya pasukan jualan mereka.

**Stripe.** Stripe Billing uruskan langganan dan caj ikut penggunaan.
Kelemahannya, kadar tempatan lebih tinggi dan duit masuk pada T+7 (tujuh hari
selepas jualan).

**Bayarcash.** Yang paling lain: direct debit (auto-debit) dari akaun bank, dengan
caj untuk setiap transaksi. Bayaran kad pun ada. Kadar yang disebut belum
termasuk SST.

## Cara memilih

Mula dengan harga pelan anda. Kalau harga bulanan rendah (contohnya yuran kelas
bulanan yang murah), fee tetap untuk setiap pelanggan seperti Xendit terasa
berat. Kalau harga tinggi, peratus kad lebih penting. Lepas itu, tentukan siapa
yang jalankan jadual caj: ciri dalam dashboard (HitPay, senangPay), API
langganan (Stripe, Xendit, Curlec), atau kod anda sendiri yang guna token yang
disimpan (CHIP).
[Panduan caj berulang automatik](/blog/recurring-billing-malaysia/) terangkan
apa yang setiap cara perlukan daripada anda.

Yang jadual ini tak tunjuk: gateway yang popular untuk FPX (bayar terus dari
akaun bank online) tapi tak boleh caj kad yang disimpan. toyyibPay dan Billplz
tidak ditanda sokong bayaran berulang dalam direktori. (Billplz senaraikan
bayaran berulang hanya pada pelan Enterprise yang harganya perlu dirunding.)
Jadi kedua-duanya lebih sesuai untuk kutipan sekali bayar.
[Panduan harga toyyibPay](/blog/toyyibpay-pricing-explained/) terangkan bahagian
itu.

Untuk banding satu lawan satu, lihat [CHIP vs Xendit](/vs/chip-vs-xendit/)
dan [Curlec vs Stripe](/vs/curlec-vs-stripe-malaysia/). Untuk semua gateway
yang sokong bayaran berulang, disusun ikut kos, lihat
[senarai gateway bayaran berulang](/best/payment-gateway-recurring/), atau jawab
empat soalan dalam [Bantu saya pilih](/choose/).
