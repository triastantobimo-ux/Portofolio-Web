/* ============================================================
   SISTEM ARTIKEL (FILE-BASED)
   Cara menambah artikel: buat file .md baru di content/articles/
   dengan frontmatter di bagian atas file:

   ---
   title: "Judul Artikel"
   date: "2026-02-01"
   tags: ["Audit", "IT"]
   emoji: "✍️"
   excerpt: "Ringkasan satu-dua kalimat untuk kartu & preview."
   ---

   Isi artikel ditulis dengan Markdown biasa di bawah frontmatter.
   ============================================================ */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import { formatArticleDate } from "./format-date";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  emoji: string;
  excerpt: string;
  readingMinutes: number;
};

export type Article = ArticleMeta & { html: string };

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/* Ambil metadata semua artikel, terbaru dulu */
export function getArticleMetas(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  const metas: ArticleMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    metas.push({
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? "1970-01-01"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      emoji: String(data.emoji ?? "✍️"),
      excerpt: String(data.excerpt ?? ""),
      readingMinutes: Math.max(1, Math.round(countWords(content) / 200)),
    });
  }

  return metas.sort((a, b) => b.date.localeCompare(a.date));
}

/* Ambil 3 artikel terbaru untuk section Jurnal di landing page */
export function getLatestArticles(n = 3): ArticleMeta[] {
  return getArticleMetas().slice(0, n);
}

/* Ambil satu artikel lengkap (Markdown sudah dirender ke HTML) */
export function getArticle(slug: string): Article | null {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? "1970-01-01"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    emoji: String(data.emoji ?? "✍️"),
    excerpt: String(data.excerpt ?? ""),
    readingMinutes: Math.max(1, Math.round(countWords(content) / 200)),
    html: marked.parse(content, { async: false }) as string,
  };
}

/* Daftar slug untuk generateStaticParams */
export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
