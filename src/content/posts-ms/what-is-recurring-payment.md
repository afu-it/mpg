---
title: "Apa itu bayaran berulang? Maksud dan contoh di Malaysia"
description: "Maksud bayaran berulang untuk peniaga Malaysia: cara caj automatik berulang berfungsi, token kad vs direct debit, dan bila perniagaan anda memerlukannya."
faq:
  - q: "Apa maksud bayaran berulang?"
    a: "Bayaran berulang ialah caj yang berulang ikut jadual, contohnya setiap bulan atau setiap tahun. Pelanggan cuma setuju sekali. Lepas itu gateway tolak bayaran secara automatik, jadi pelanggan tak perlu bayar sendiri setiap kali."
  - q: "Adakah bayaran berulang sama dengan langganan?"
    a: "Hampir sama. Langganan ialah cara bisnes anda jual (pelanggan daftar untuk pelan yang berterusan). Bayaran berulang pula cara anda kutip duitnya. Pelan ansuran dan yuran keahlian juga guna bayaran berulang, walaupun tak dipanggil langganan."
  - q: "Boleh ke FPX digunakan untuk bayaran berulang?"
    a: "Tidak, kalau FPX biasa. FPX minta pembayar log masuk dan luluskan setiap bayaran. Jadi ia sesuai untuk checkout sekali bayar dan link bayaran. Untuk caj automatik berulang, gateway Malaysia guna token kad yang disimpan atau mandat direct debit (kebenaran tolak terus dari akaun bank)."
  - q: "Macam mana nak tahu sama ada gateway sokong bayaran berulang?"
    a: "Semak tanda Caj berulang pada profil gateway dalam direktori ini, atau tapis senarai gateway yang sokong bayaran berulang. Lepas itu, tanya gateway itu cara tepatnya (token kad, API langganan atau direct debit) sebelum anda bina sistem anda."
---

Bayaran berulang (recurring payment) ialah caj yang berulang ikut jadual
selepas pelanggan setuju sekali. Contohnya yuran keahlian gim, pelan perisian
bulanan, atau pembaharuan domain setiap tahun. Pelanggan daftar sekali, dan
lepas itu bayaran dikutip untuk mereka setiap kali sampai tarikh. Ramai juga
panggil ia auto-debit.

## Cara bayaran berulang berfungsi

Tiga perkara mesti ada supaya bayaran boleh berulang tanpa pelanggan buat
apa-apa:

1. **Persetujuan, sekali.** Pelanggan setuju dicaj jumlah tetap (atau jumlah
   ikut penggunaan) pada jadual tetap.
2. **Cara bayar yang disimpan.** Gateway simpan sesuatu yang boleh dicaj nanti.
   Untuk kad, ini dipanggil token: kod ganti nombor kad yang tak boleh diguna di
   luar akaun gateway anda. Lihat [tokenisation](/learn/glossary/tokenisation/)
   untuk cara ia berfungsi.
3. **Jadual.** Sama ada gateway jalankan jadual untuk anda (melalui ciri
   langganan atau API, iaitu sambungan terus ke sistem anda), atau sistem anda
   sendiri yang mulakan setiap caj.

Kalau salah satu tiada, anda terpaksa hantar link bayaran setiap bulan dan
harap pelanggan klik.

## Token kad vs direct debit

Di Malaysia, ada dua cara utama untuk bayaran berulang.

**Token kad yang disimpan.** Pelanggan bayar sekali guna kad. Gateway simpan
token. Caj seterusnya berjalan sendiri tanpa pelanggan perlu buat apa-apa.
Contohnya, CHIP sokong caj berulang melalui token yang disimpan. senangPay pula
iklankan caj berulang yang dah ada dalam sistemnya, dengan simpanan token kad.

**Direct debit dari akaun bank.** Pelanggan beri kebenaran (mandat), dan jumlah
itu ditolak dari akaun bank mereka setiap kali sampai tarikh. Bayarcash
senaraikan direct debit (auto-debit untuk bayaran berulang) sebagai salah satu
cara bayar, dengan caj untuk setiap transaksi.

[FPX](/learn/glossary/fpx/) biasa (bayar terus dari akaun bank online) tak boleh
buat bayaran berulang. Ia bawa pembayar ke laman bank mereka untuk luluskan
setiap bayaran. Jadi ia bagus untuk checkout (halaman bayar) sekali bayar, tapi
tak boleh caj pelanggan secara automatik masa mereka tidur.

## Bila perniagaan anda memerlukannya

Anda perlu bayaran berulang kalau duit masuk ikut kitaran: keahlian, yuran
tuisyen, pelan SaaS (perisian dalam talian), kotak langganan, kontrak
penyelenggaraan, derma bulanan. Kalau pelanggan bayar sekali untuk setiap
pesanan, anda tak perlu ciri ini. Gateway FPX caj rata yang lebih murah mungkin
lebih sesuai.

Masalahnya, bila anda perlu bayaran berulang, pilihan gateway jadi lebih sikit.
Ada gateway FPX murah yang paling popular di Malaysia dibina untuk kutipan
sekali bayar, dan tak boleh caj kad yang disimpan. Jadi tapis dulu sebelum pilih.
Senarai [gateway yang sokong bayaran berulang](/best/payment-gateway-recurring/)
hanya susun gateway yang ada ciri ini, ikut anggaran kos berdasarkan kadar yang
disiarkan. Jadual di bawah tunjuk tiga contoh yang guna cara berbeza. Untuk
cara kerja penuh, termasuk caj gagal dan cubaan semula, baca
[cara caj berulang automatik berfungsi di Malaysia](/blog/recurring-billing-malaysia/).
