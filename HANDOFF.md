# HANDOFF TEKNIS — Website Portofolio Bimo GT

> **Dokumen instruksi untuk AI / developer yang mengambil alih pengelolaan website ini.**
> Baca dokumen ini SEBELUM mengubah apa pun. Semua fakta di bawah sudah diverifikasi per **5 Oktober 2026**.

---

## 1. Ringkasan

| Hal | Nilai |
|---|---|
| Website | Portofolio pribadi single-page + blog artikel |
| URL produksi | **https://bimogt.vercel.app** |
| Pemilik | Bimo GT (`triastantobimo-ux` di GitHub, email `triastanto.bimo@gmail.com`) |
| Framework | Next.js 16 (App Router) + TypeScript strict |
| Styling | Tailwind CSS 4 (tema oklch, emerald + amber) + shadcn/ui |
| Animasi | Framer Motion |
| Database | Neon Postgres (produksi) / SQLite (lokal sandbox) |
| Host | Vercel (proyek `portfolio`) |
| Bahasa konten | **Indonesia** (seluruh UI & artikel) |
| Lokasi proyek di mesin ini | `/home/z/my-project` |
| Status git | Commit terakhir `9127846` / `0a1cbe1` — repo LOKAL, belum ada remote GitHub |

---

## 2. Identitas Vercel & Database (non-rahasia)

| Hal | Nilai |
|---|---|
| Nama proyek Vercel | `portfolio` |
| Project ID | `prj_uupA2P8rc8lldjZwzKXV7WeYCxSo` |
| Org/Team ID | `team_pML5gyFeobEEgfsGl7lGv2cP` |
| Akun Vercel | `triastantobimo-7165` |
| Database Neon | host `ep-damp-heart-b345beot`, region `ap-southeast-1`, db `neondb` |
| Tabel | `GuestbookEntry` (nama, profesi, pesan, likes) & `SiteStats` (penghitung kunjungan) |
| Domain terpasang | `bimogt.vercel.app` (utama); `raka-pratama.vercel.app` & URL deployment lama → redirect 308 ke utama |

**Kredensial rahasia (token Vercel, URL Neon berisi password) TIDAK ditulis di dokumen ini.**
Di mesin ini tersimpan di file gitignored:

- `/home/z/my-project/.zscripts/vt` → Vercel token
- `/home/z/my-project/.zscripts/dburl` → Neon pooled connection string

> ⚠️ Untuk handoff: pemilik HARUS membuat token Vercel baru (vercel.com/account/settings/tokens)
> dan URL Neon baru (dashboard Neon → connection string) untuk pihak/AI baru. Jangan pernah
> menyalin kredensial lama ke chat, dokumen, atau commit.

---

## 3. Peta File Penting

```
/home/z/my-project
├── src/
│   ├── app/
│   │   ├── page.tsx              # Beranda (susunan section, server component)
│   │   ├── layout.tsx            # Metadata SEO, ThemeProvider (dark default), metadataBase bimogt.vercel.app
│   │   ├── blog/page.tsx         # /blog — pakai komponen Journal (showAllLink=false)
│   │   └── blog/[slug]/page.tsx  # Detail artikel (generateStaticParams + generateMetadata)
│   ├── components/portfolio/     # SEMUA section UI:
│   │   ├── navbar.tsx            #   nav glass + scroll-spy + menu mobile
│   │   ├── hero.tsx              #   hero (typewriter, aurora, spotlight)
│   │   ├── about.tsx             #   bento grid + counter
│   │   ├── skills.tsx            #   ✅ SIMPEL: 3 kartu kelompok + chip — TANPA %/bar
│   │   ├── projects.tsx          #   galeri bangunan (filter App/Tool/Eksperimen)
│   │   ├── experience.tsx        #   timeline karier
│   │   ├── journal.tsx           #   ✅ jurnal: KARTU KATEGORI DULU → grid artikel
│   │   ├── guestbook.tsx         #   buku tamu (API + optimistic like)
│   │   ├── contact.tsx, footer.tsx, section-heading.tsx, tilt-card.tsx, magnetic.tsx
│   │   └── theme-provider.tsx
│   ├── lib/
│   │   ├── portfolio.ts          # ★ SATU-SATUNYA sumber data profil/skills/galeri/experience
│   │   ├── articles.ts           # baca content/articles/*.md (fs, gray-matter, marked) — SERVER ONLY
│   │   ├── categories.ts         # ★ metadata kategori jurnal — CLIENT-SAFE (tanpa fs)
│   │   ├── format-date.ts        # format tanggal — CLIENT-SAFE
│   │   └── db.ts                 # Prisma client (SQLite lokal)
│   └── app/api/
│       ├── guestbook/route.ts    # GET/POST buku tamu
│       ├── guestbook/like/route.ts
│       └── visits/route.ts       # GET/POST penghitung kunjungan
├── content/articles/*.md         # ★ SELURUH artikel jurnal (file-based, frontmatter wajib)
├── prisma/
│   ├── schema.prisma             # SQLite — untuk lokal/sandbox
│   └── schema.postgres.prisma    # Postgres — untuk produksi (Neon)
├── scripts/
│   ├── deploy-vercel.sh          # ★ deploy 1-perintah (link, env, --prod, smoke test)
│   ├── claim-vercel-subdomain.sh # klaim subdomain *.vercel.app via API
│   └── check_domains.py          # cek ketersediaan domain (DoH + registry is-a.dev)
├── .zscripts/vt, .zscripts/dburl # kredensial lokal (chmod 600, JANGAN di-commit)
└── .vercel/project.json          # link project Vercel
```

---

## 4. Cara Kerja Sistem (pahami dulu, jangan dilewati)

### 4.1 Data profil terpusat
Seluruh isi situs ditarik dari **`src/lib/portfolio.ts`**: `profile`, `stats`, `aboutCards`,
`skillGroups`, `marqueeItems`, `projects` (galeri), `experience`, `socials`.
Mengubah konten = mengedit file ini. Tidak ada CMS, tidak ada data profil di database.

### 4.2 Artikel file-based dengan kategori wajib
Artikel = file `.md` di `content/articles/`. Slug = nama file. Tambah artikel = buat file baru.

Frontmatter **wajib** (contoh nyata):

```md
---
title: "Judul Artikel"
date: "2026-09-14"          # ISO yyyy-mm-dd — mengurutkan artikel (terbaru dulu)
category: "teknologi"       # WAJIB: audit | teknologi | game | lainnya
tags: ["AI", "LLM"]
emoji: "🤖"
excerpt: "Ringkasan 1-2 kalimat untuk kartu."
---

Isi artikel dalam Markdown. Panjang ideal 400–700 kata, heading `##` per bagian.
```

- Kategori didefinisikan di `src/lib/categories.ts` (label, emoji, deskripsi, warna badge).
- **PENTING:** `categories.ts` sengaja TIDAK mengimpor `fs` karena dipakai komponen client
  (`journal.tsx`). Jangan pernah mengimpor `articles.ts` (ber-`fs`) di komponen `"use client"`
  — akan error `fs not found`. Pola yang benar: server page memanggil `getArticleMetas()`
  lalu mem-pass hasilnya sebagai props.

### 4.3 Dual-schema Prisma
- **Lokal/sandbox**: `prisma/schema.prisma` (SQLite, `db/custom.db`). `bun run db:push`.
- **Produksi**: `prisma/schema.postgres.prisma` (Neon). Script `vercel-build` di package.json
  otomatis menjalankan `prisma generate` + `prisma db push` dengan schema postgres saat build di Vercel.
- Runtime produksi memakai **pooled URL + `pgbouncer=true`**, dan **TANPA `channel_binding=require`**
  (parameter ini membuat Prisma gagal connect — selalu strip dari URL Neon).

### 4.4 Keputusan desain dari pemilik (JANGAN dibatalkan)
1. **Skills = list sederhana.** Pemilik eksplisit menolak angka persen (`92%`) dan bar progres —
   itu dianggap overdesign. Jangan tambahkan lagi field `level`/meter apa pun.
2. **Jurnal harus "kategori dulu, baru isi"**: section dibuka kartu-kartu segmen
   (Semua/Audit/Teknologi/Game/Lainnya) dengan emoji + deskripsi + jumlah tulisan, baru grid
   artikel terfilter + badge kategori berwarna. Pertahankan pola ini.
3. Tanpa warna **biru/indigo**. Palet: emerald (primary) + amber, latar gelap default.
4. Semua teks UI & konten dalam **bahasa Indonesia**.
5. Situs harus tetap ringan & responsif (mobile wajib dicek).

---

## 5. Setup Lingkungan Lokal

```bash
cd /home/z/my-project
bun install            # atau npm install
bun run db:push        # push schema SQLite lokal
bun run dev            # dev server di http://localhost:3000 (log: dev.log)
bun run lint           # ESLint — WAJIB bersih sebelum selesai
```

Catatan sandbox: dev server port 3000 kadang sudah berjalan otomatis — cek `dev.log` dulu,
jangan jalankan dua instance. Untuk cek visual gunakan browser headless (agent-browser/Playwright).

---

## 6. Resep Tugas Rutin

### 6.1 Ubah profil (nama, bio, sosial, availability)
Edit `src/lib/portfolio.ts` → `profile` & `socials`. Email dipakai juga di contact & footer.

### 6.2 Tulis artikel baru
Buat `content/articles/<slug>.md` dengan frontmatter lengkap (lihat 4.2). Slug = URL
(`/blog/<slug>`), gunakan kebab-case singkat. Tanggal makin baru makin atas. Selesai —
tidak perlu daftar manual; section jurnal & /blog otomatis menghitung ulang.

### 6.3 Tambah galeri bangunan (app/tools)
Edit `src/lib/portfolio.ts` → array `projects`. Field: `title`, `description`, `tags`,
`category` ("App" | "Tool" | "Eksperimen"), `emoji`, `gradient` (kelas tailwind from/via/to),
`link` (boleh `"#"` jika belum ada URL).

### 6.4 Ubah kelompok keahlian
Edit `skillGroups` di `src/lib/portfolio.ts` (name, emoji, note, items). Ingat aturan #1 di 4.4.

### 6.5 Hapus entri uji "Deploy Bot" dari buku tamu produksi
Script deploy selalu menulis 1 entri uji. Bersihkan bila perlu:

```bash
echo "DELETE FROM \"GuestbookEntry\" WHERE name = 'Deploy Bot';" \
  | npx prisma db execute --url "$(cat .zscripts/dburl)" --stdin
```

### 6.6 Klaim subdomain *.vercel.app tambahan
```bash
./scripts/claim-vercel-subdomain.sh <nama1> [nama2]...
```
Catatan: DNS `*.vercel.app` adalah wildcard — cek DNS TIDAK bisa dipakai untuk menilai
ketersediaan; satu-satunya cara adalah mencoba klaim via API (script sudah menangani 409).

---

## 7. Deploy ke Produksi

### Cara standar (1 perintah)
```bash
./scripts/deploy-vercel.sh "$(cat .zscripts/vt)" "$(cat .zscripts/dburl)"
```
Script otomatis: link project → set env `DATABASE_URL` (production) → `vercel --prod`
(build di Vercel: prisma generate + db push postgres + next build) → smoke test
(homepage 200, `/api/visits`, `/api/guestbook`).

### Prasyarat
- `vercel` CLI terinstall (`npm i -g vercel`), token Vercel VALID dengan scope akun pemilik.
- URL Neon format: `postgresql://neondb_owner:<PASSWORD>@ep-damp-heart-b345beot-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&pgbouncer=true`
  (tanpa `channel_binding=require`).

### Alternatif manual (tanpa script)
```bash
vercel link --yes --project portfolio --token <TOKEN>
echo "<DATABASE_URL>" | vercel env add DATABASE_URL production --token <TOKEN>
vercel --prod --token <TOKEN>
```

### Setelah deploy — verifikasi WAJIB
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://bimogt.vercel.app        # harus 200
curl -s https://bimogt.vercel.app/api/visits                              # {"views":N}
curl -s -o /dev/null -w "%{http_code}\n" https://bimogt.vercel.app/blog   # harus 200
```
Jika situs terkunci 302 → **Deployment Protection menyala**; matikan via
`PATCH /v9/projects/prj_uupA2P8rc8lldjZwzKXV7WeYCxSo` body `{"ssoProtection": null}`
atau dashboard Vercel → Settings → Deployment Protection → off.

---

## 8. Keamanan & Kebersihan Repo

- `.gitignore` sudah mencakup: `.env`, `.env.local`, `db/*.db`, `.zscripts/`, `.vercel/`, `upload/`, `node_modules`, `.next`.
- Jangan pernah commit token/password/URL Neon mentah.
- `.env.local` berbahaya: pernah menimpa konfigurasi lokal (dibuat oleh `vercel env add`).
  Hapus bila muncul, dan pastikan kembali ke SQLite lokal setelah deploy.
- Bila token pernah terekspos di chat/log → revoke di vercel.com/account/settings/tokens, buat baru.
- Setelah deploy, bersihkan entri "Deploy Bot" (6.5) bila ingin buku tamu bersih.

---

## 9. Checklist Mutu Sebelum Menganggap Selesai

1. `bun run lint` → nol error.
2. Buka beranda: semua section render, tidak ada blank/error boundary.
3. Cek console browser: tanpa error/hydration mismatch.
4. Klik semua interaksi yang diubah (filter kategori jurnal, tab, tombol tema, form buku tamu).
5. Mode mobile 390px: layout tidak rusak, footer menempel benar.
6. Kalau menambah artikel: buka `/blog` dan detail slug-nya, badge kategori muncul.
7. Deploy → jalankan verifikasi 4 langkah di bagian 7 → lapor hasil jujur (yang belum terverifikasi, bilang belum).

---

## 10. Dua Skenario Handoff

### A. Pemilik kelola manual (tanpa AI)
1. Ubah konten = edit 2 tempat saja: `src/lib/portfolio.ts` (profil/skills/galeri) dan
   `content/articles/*.md` (jurnal). Tidak perlu menyentuh komponen.
2. Lihat hasil: `bun run dev` → http://localhost:3000.
3. Naikkan ke produksi: jalankan script deploy (7), atau pasang GitHub: buat repo di
   github.com → `git remote add origin <url> && git push -u origin main` → di Vercel
   "Import Project" → set env `DATABASE_URL` → sejak itu setiap push otomatis deploy.

### B. Handoff ke AI lain (semacam saya)
Berikan 4 hal ini:
1. **Akses kode** — folder proyek ini (atau repo GitHub bila sudah dipush, lihat 10.A langkah 3).
2. **Dokumen ini** (`HANDOFF-WEBSITE-BIMOGT.md`) — instruksi: "baca dulu sebelum mengubah apa pun".
3. **Token Vercel BARU** dari pemilik (lama sebaiknya di-revoke).
4. **Connection string Neon BARU** (pooled, tanpa channel_binding).

Prompt pembuka yang disarankan untuk AI baru:

```
Kamu akan mengelola website portofolio saya (Next.js 16, live di https://bimogt.vercel.app).
Baca file HANDOFF-WEBSITE-BIMOGT.md di root proyek SEBELUM bekerja — patuhi semua aturan
di sana, terutama: konten bahasa Indonesia, tanpa warna biru/indigo, skills TANPA persen/bar,
jurnal dengan kategori dulu (audit|teknologi|game|lainnya). Kredensial deploy: <VERCEL_TOKEN>
dan <NEON_DATABASE_URL>. Alur kerja: edit → bun run lint → verifikasi browser →
./scripts/deploy-vercel.sh "<token>" "<dburl>" → smoke test → lapor hasil.
```

---

## 11. Riwayat Singkat (konteks)

1. **v1** — Situs portofolio dibangun (Next.js 16 + Tailwind 4 + Prisma + Framer Motion), 3 API, buku tamu + penghitung kunjungan.
2. **v2** — Siap-deploy: dual-schema Prisma, script `vercel-build`, deploy pertama ke Vercel + Neon.
3. **v3** — Domain: klaim `raka-pratama.vercel.app` lalu migrasi ke **`bimogt.vercel.app`** (redirect 308), identitas placeholder diganti Bimo GT.
4. **v4** — Identitas baru: Corporate Internal Auditor × IT Enthusiast; fitur jurnal artikel file-based (`/blog`), galeri bangunan, pengalaman karier.
5. **v5 (sekarang)** — Skills disederhanakan (tanpa %/bar), jurnal 13 artikel dengan sistem kategori segmen (kartu kategori → artikel terfilter + badge).

**Perilaku terverifikasi saat ini:** beranda 200, `/blog` 200, detail artikel 200, API visits & guestbook berfungsi (Neon), buku tamu bersih (0 entri uji), lint bersih, mobile 390px aman.
