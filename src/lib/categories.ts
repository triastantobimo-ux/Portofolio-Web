/* ============================================================
   KATEGORI JURNAL (client-safe — tanpa import fs)
   Dipakai oleh komponen client (journal.tsx) dan server
   (articles.ts) sekaligus. Jangan menambahkan import Node di sini.
   ============================================================ */

export type ArticleCategoryId = "audit" | "teknologi" | "game" | "lainnya";

export type ArticleCategory = {
  id: ArticleCategoryId;
  label: string;
  emoji: string;
  description: string;
  /** kelas tailwind untuk badge kategori (aman dark & light) */
  badge: string;
};

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  {
    id: "audit",
    label: "Audit",
    emoji: "🧾",
    description: "Risiko, kontrol, dan cerita dari ruang pemeriksaan.",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-600 dark:text-amber-400",
  },
  {
    id: "teknologi",
    label: "Teknologi",
    emoji: "💻",
    description: "IT, AI, hardware, dan tools yang saya kupas tuntas.",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "game",
    label: "Game",
    emoji: "🎮",
    description: "Video game dari sudut pandang lain: sistem & pelajaran.",
    badge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "lainnya",
    label: "Lainnya",
    emoji: "✨",
    description: "Catatan belajar, produktivitas, olahraga, kehidupan.",
    badge: "border-rose-400/30 bg-rose-400/10 text-rose-600 dark:text-rose-400",
  },
];

export function getCategory(id: string): ArticleCategory {
  return ARTICLE_CATEGORIES.find((c) => c.id === id) ?? ARTICLE_CATEGORIES[3];
}
