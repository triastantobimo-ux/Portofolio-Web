---
title: "Mendeteksi Anomali dengan Hukum Benford: dari Excel ke Python"
date: "2026-01-18"
tags: ["Audit", "Data Analytics", "Python"]
category: "audit"
emoji: "📊"
excerpt: "Angka-angka asli mengikuti pola matematis yang mengejutkan. Hukum Benford memakai pola itu untuk membantu auditor menemukan data mencurigakan — dan mengimplementasikannya ternyata lebih mudah dari yang dibayangkan."
---

Pernahkah kamu sadar bahwa angka-angka di dunia nyata punya kebiasaan aneh? Dalam banyak kumpulan data alami — nilai transaksi, populasi kota, panjang sungai — angka pertama tidak terdistribusi merata. Angka 1 muncul sebagai angka pertama sekitar 30% dari waktu, angka 2 sekitar 17%, dan makin besar angkanya makin jarang — angka 9 hanya sekitar 4,6%. Pola ini disebut Hukum Benford, dan bagi auditor, pola ini adalah alat deteksi anomali yang murah, cepat, dan mengejutkan efektif.

## Kenapa ini bekerja untuk audit

Logikanya sederhana: data transaksi keuangan yang "asli" — lahir dari proses bisnis yang beragam — cenderung mengikuti distribusi Benford. Sebaliknya, data yang dipalsukan manusia sering tidak mengikutinya. Orang yang mengarang angka cenderung mendistribusikan angka pertama secara merata (1 sampai 9 terlihat "adil"), atau mengelompokkannya di nilai-nilai favorit seperti yang dimulai dari 4, 5, atau 6.

Penting dicatat sejak awal: penyimpangan dari Benford **bukan bukti kecurangan**. Ini alat pengarah, bukan penghakiman. Deviasinya hanya memberi tahu di mana layak melihat lebih dekat. Data yang dibatasi rentangnya (misalnya tarif flat), angka nomor telepon, atau harga dengan batas psikologis (Rp100.000, Rp950.000) memang tidak akan mengikuti Benford — dan itu normal.

## Versi Excel: cukup 4 langkah

Tidak perlu tool khusus untuk uji pertama. Dengan kolom nilai transaksi di Excel:

1. Ambil angka pertama: `=LEFT(ABS(A2),1)` — atau jika nilainya ada desimal, `=LEFT(ABS(TEXT(A2,"0.############")),1)`.
2. Hitung frekuensi tiap angka 1–9 dengan `COUNTIF`.
3. Hitung proporsi aktual: frekuensi dibagi total baris.
4. Bandingkan dengan proporsi Benford: `=LOG10(1+1/d)`, di mana d adalah angka 1–9.

Buat bar chart yang menampilkan dua seri berdampingan — aktual vs teoretis Benford. Dalam lima menit, kamu sudah punya peta awal: angka pertama mana yang "menonjol" dan layak diselidiki. Untuk uji statistik yang lebih formal, chi-square atau Z-statistic per digit bisa dihitung di kolom tambahan yang sama.

## Versi Python: satu puluhan baris

Ketika data ribuan baris dan kamu ingin pengujian yang bisa diulang setiap periode, Python lebih nyaman. Ini inti implementasinya:

```python
import pandas as pd
import numpy as np

df = pd.read_csv("transaksi.csv")

# Ambil angka pertama dari nilai absolut
digits = df["nilai"].abs().astype(str).str.lstrip("0.").str[0]
actual = digits.value_counts(normalize=True).sort_index()

# Proporsi teoretis Benford untuk 1-9
benford = pd.Series({str(d): np.log10(1 + 1/d) for d in range(1, 10)})

report = pd.DataFrame({"aktual": actual, "benford": benford}).fillna(0)
report["selisih"] = report["aktual"] - report["benford"]
report.sort_values("selisih", key=abs, ascending=False, inplace=True)

print(report.head(3))  # digit dengan deviasi terbesar
```

Selisih absolut di atas kisaran 2–3 poin persentase untuk digit pertama biasanya jadi kandidat investigasi pertama — terutama jika deviasinya terkonsentrasi di satu jenis transaksi, satu vendor, atau satu periode tertentu. Di titik itu, uji Benford selesai; pekerjaan auditor sebenarnya dimulai.

## Keterbatasan yang perlu dihormati

Tiga hal yang selalu saya ingatkan ke diri sendiri. Pertama, Benford sensitif terhadap struktur data: data dengan nilai minimum/maximum yang dipaksakan, angka hasil pembulatan sistem, atau data yang diakumulasi (bukan transaksi mentah) bisa gagal mengikuti pola tanpa ada niat jahat. Kedua, ukuran sampel penting — distribusi pada 50 baris data tidak bermakna, sementara 50.000 baris cukup stabil. Ketiga, ini analisis digit pertama saja sudah cukup informatif, tapi uji digit kedua dan dua-digit pertama (10–99) memberi lapisan kedua yang sering menarik.

## Penutup

Bagi saya, Hukum Benford adalah gerbang yang bagus ke dunia audit data analytics: matematisnya cukup sederhana untuk dipahami, implementasinya bisa dimulai dari Excel yang sudah terbuka di monitor, dan hasilnya langsung terasa berguna di pekerjaan nyata. Dari titik ini, jalan ke pengujian lain — deteksi duplikasi, gap analysis, pembulatan berlebihan — terasa seperti kelanjutan yang wajar, bukan lompatan.
