# Portofolio Web — Bimo GT

Website portofolio pribadi **Bimo GT** — Internal Auditor × IT Enthusiast.

🔗 **Live:** https://bimogt.vercel.app

## Apa ini

Situs portofolio ringan berisi profil, jurnal/artikel bertema audit–teknologi–game, dan galeri app/tool yang pernah dibangun. Didesain agar mudah dirawat: **menambah artikel = membuat satu file Markdown**, tanpa CMS, tanpa database untuk konten.

## Teknologi

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui + Framer Motion
- Prisma + Neon PostgreSQL (hanya untuk buku tamu)
- Artikel: file `.md` di `content/articles/` (gray-matter + marked), di-render di server
- Hosting: Vercel (deploy otomatis dari subdomain `bimogt.vercel.app`)

## Menjalankan lokal

```bash
bun install
bun run dev        # http://localhost:3000
```

> Prisma butuh `DATABASE_URL` — lihat `HANDOFF.md` bagian setup lokal.

## Menambah artikel jurnal

Buat file baru di `content/articles/` dengan frontmatter wajib:

```yaml
---
title: "Judul Artikel"
date: "2026-10-05"
category: audit   # audit | teknologi | game | lainnya
tags: ["audit", "excel"]
emoji: "🧾"
excerpt: "Ringkasan satu kalimat."
---
```

Simpan → artikel langsung muncul di jurnal berdasarkan kategorinya.

## Merawat situs

Semua instruksi lengkap — struktur project, aturan client-safe, deploy produksi, kredensial, dan checklist mutu — ada di **[HANDOFF.md](./HANDOFF.md)**. Mulai dari sana.
