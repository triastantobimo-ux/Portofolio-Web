---
title: "Sampling yang Bisa Dipertanggungjawabkan: Bukan Sekadar Mengacak"
date: "2026-07-05"
category: "audit"
tags: ["Audit", "Sampling", "Metodologi"]
emoji: "🎯"
excerpt: "Sampel yang jelek bisa membuat temuan bagus tampak lemah — atau sebaliknya, kesimpulan meleset jauh. Catatan praktis tentang kapan pakai sampling statistik, kapan cukup judgmental, dan bagaimana mendokumentasikannya supaya tidak runtuh saat dipertanyakan."
---

Pertanyaan yang hampir selalu muncul di setiap audit: "kita perlu periksa berapa banyak?" Pertanyaan yang lebih penting tapi jarang ditanyakan: "kita memilih yang mana, dan kenapa?" Dua pertanyaan itu berbeda mutu. Sebuah sampel yang jelek bisa membuat temuan bagus tampak lemah di depan auditee, atau — lebih berbahaya lagi — membuat kesimpulan meleset jauh dari kondisi sebenarnya. Artikel ini adalah catatan lapangan tentang sampling yang benar-benar saya pakai, ditulis dengan bahasa seseorang yang pernah salah dan berharap kamu tidak mengulanginya.

## Mulai dari pertanyaan yang benar

Sebelum menyentuh data, jawab dulu: sampling ini untuk menjawab apa? Kalau tujuannya menilai apakah kontrol berjalan — misalnya setiap pembayaran besar punya persetujuan — kamu sedang mengetes keandalan kontrol, dan ukuran sampelnya mengikuti frekuensi kontrol itu berjalan. Kalau tujuannya menaksir nilai salah saji di populasi transaksi, itu ranah sampling statistik dengan hitungan yang lebih serius. Kesalahan paling umum yang saya lihat adalah memakai logika yang satu untuk tujuan yang lain: mengambil 25 sampel acak lalu menarik kesimpulan angka seperti hasil survei nasional. Beda tujuan, beda alat.

## Dua keluarga besar: statistik vs judgmental

**Sampling statistik** memberi kamu sesuatu yang judgmental tidak bisa: dasar matematis untuk menaksir populasi dan mengukur risiko sampelmu. Random sampling, monetary unit sampling (MUS) yang memilih sampel berbobot nilai, sampel berstrata yang memisahkan populasi ke dalam lapisan — semuanya memberi kerangka untuk mengatakan "dengan keyakinan X, salah saji tidak melebihi Y". Kekuatan ini dibayar dengan disiplin: definisi populasi yang jelas, pemilihan yang benar-benar acak, dan kesediaan menerima hasil hitungan walau tidak nyaman.

**Sampling judgmental** memakai pengetahuan risiko untuk memilih item yang paling berpotensi bermasalah: transaksi akhir tahun, vendor yang baru muncul, entitas pihak berelasi, nilai yang mentok ambang batas persetujuan. Ini sah dan sering lebih efisien untuk menemukan masalah — tapi jujurlah dengan diri sendiri: hasilnya tidak bisa diekstrapolasi ke populasi. Tidak ada yang lebih memalukan daripada menjawab "dari temuan 5 dari 25 sampel, diperkirakan 20% populasi bermasalah" ketika 25 sampel itu diambil dengan kriteria "yang terlihat mencurigakan".

## Praktik yang menyelamatkan: stratifikasi dan item khusus

Dalam praktik, kombinasi biasanya paling masuk akal. Populasi besar hampir selalu bercabang: sedikit transaksi bernilai besar, banyak transaksi kecil. Menarik 100 sampel acak murni bisa berarti hampir tidak menyentuh item bernilai besar — persis item yang paling berisiko. Maka: pisahkan populasi ke dalam strata (misalnya di atas dan di bawah ambang materialitas), uji 100% strata atas, lalu sampling di bawahnya. Tambahkan "item khusus" — transaksi yang secara kasat mata anomali — di luar sampel, dan tandai sebagai pencarian langsung, bukan bagian dari penaksiran. Dokumentasikan tiga lapis itu secara terpisah. Struktur sederhana ini membuat kesimpulanmu tidak tercampur dan mudah dipertanggungjawabkan.

## Dokumentasi: bagian yang menentukan kredibilitas

Sampel terbaik pun runtuh kalau tidak bisa dijelaskan. Working paper sampling yang layak paling tidak menjawab: apa definisi populasi (periode, sumber data, kriteria keluar-masuk), tujuan test, metode pemilihan dan parameternya, ukuran sampel dan dasar penentuannya, hasil pengujian per item, lalu kesimpulan dan kaitannya dengan prosedur lain. Ada satu kalimat ajaib yang menyelamatkan banyak diskusi: "populasi didefinisikan sebagai X dari sistem Y, dan sampel dipilih dengan metode Z menggunakan tool A dengan seed B". Kalimat itu membuat audit bisa direproduksi — standar tertinggi dari pembelaan.

## Kecil tapi menentukan: kejujuran dengan batas sampel

Hal terakhir yang sering dilupakan: kesediaan mengakui batas. Sampel memberi keyakinan, bukan kepastian. Ketika hasil menunjukkan anomali yang tidak bisa dijelaskan, jangan menguburnya di catatan kaki — perluas pengujian. Ketika sampel tidak menemukan apa-apa, itu bukan "populasi bersih", melainkan "tidak ditemukan salah saji dengan tingkat keyakinan ini". Nada yang tepat dalam laporan membuat temuanmu dihormati, dan nada yang tepat lahir dari pemahaman metode. Sampling pada akhirnya adalah soal kejujuran intelektual yang dibungkus statistik: katakan apa yang kamu periksa, jelaskan bagaimana kamu memilihnya, dan kesimpulanmu akan berdiri tegak di depan siapa pun.
