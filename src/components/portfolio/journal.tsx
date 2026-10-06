"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock,
  PenLine,
  Search,
  X,
} from "lucide-react";
import { SectionHeading } from "./section-heading";
import { formatArticleDate } from "@/lib/format-date";
import { ARTICLE_CATEGORIES, type ArticleCategoryId } from "@/lib/categories";
import type { ArticleMeta } from "@/lib/articles";

type Filter = "semua" | ArticleCategoryId;

export function Journal({
  articles,
  showAllLink = true,
}: {
  articles: ArticleMeta[];
  showAllLink?: boolean;
}) {
  const [active, setActive] = useState<Filter>("semua");
  const [query, setQuery] = useState("");

  /* Jumlah tulisan per kategori untuk ditampilkan di kartu */
  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["semua", articles.length]]);
    for (const c of ARTICLE_CATEGORIES) {
      map.set(c.id, articles.filter((a) => a.category === c.id).length);
    }
    return map;
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list =
      active === "semua"
        ? articles
        : articles.filter((a) => a.category === active);

    if (q) {
      list = list.filter((a) => {
        const hay = [a.title, a.excerpt, a.tags.join(" "), a.category]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }
    return list;
  }, [active, articles, query]);

  const isAll = active === "semua";

  return (
    <section id="jurnal" className="relative py-20 md:py-28" aria-label="Jurnal dan tulisan">
      <div
        aria-hidden
        className="animate-aurora-b absolute bottom-0 right-[-10%] size-[400px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-3), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Jurnal"
          title="Tulisan & catatan"
          description="Saya menulis untuk berpikir lebih jernih — dibagi per segmen supaya kamu langsung menemukan yang dicari."
        />

        {/* ── Pencarian ── */}
        <div className="relative mb-5">
          <label htmlFor="journal-search" className="sr-only">
            Cari tulisan
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            id="journal-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari judul, tag, atau kata kunci…"
            className="w-full rounded-2xl border bg-card/60 py-3 pr-10 pl-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Hapus pencarian"
              className="absolute top-1/2 right-3 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          )}
        </div>

        {/* ── SEGMEN: pilih kategori dulu ── */}
        <div
          role="tablist"
          aria-label="Kategori jurnal"
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5"
        >
          <button
            role="tab"
            aria-selected={isAll}
            onClick={() => setActive("semua")}
            className={`group rounded-2xl border p-3 text-left transition-all duration-300 ${
              isAll
                ? "border-primary/60 bg-primary/10 shadow-lg shadow-primary/10"
                : "bg-card/60 hover:-translate-y-0.5 hover:border-primary/30"
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-xl border text-base transition-colors ${
                  isAll
                    ? "border-primary/30 bg-primary/15"
                    : "border-primary/20 bg-primary/10"
                }`}
                role="img"
                aria-label="Semua kategori"
              >
                🗂️
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">Semua</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {counts.get("semua")} tulisan
                </p>
              </div>
            </div>
            <p className="mt-1.5 hidden text-xs leading-snug text-muted-foreground sm:block">
              Semua tulisan dari berbagai segmen.
            </p>
          </button>

          {ARTICLE_CATEGORIES.map((c) => {
            const selected = active === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(c.id)}
                className={`group rounded-2xl border p-3 text-left transition-all duration-300 ${
                  selected
                    ? "border-primary/60 bg-primary/10 shadow-lg shadow-primary/10"
                    : "bg-card/60 hover:-translate-y-0.5 hover:border-primary/30"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-xl border text-base transition-transform duration-300 ${c.badge} ${
                      selected ? "scale-110" : "group-hover:scale-105"
                    }`}
                    role="img"
                    aria-label={`Kategori ${c.label}`}
                  >
                    {c.emoji}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">{c.label}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {counts.get(c.id)} tulisan
                    </p>
                  </div>
                </div>
                <p className="mt-1.5 hidden text-xs leading-snug text-muted-foreground sm:block">
                  {c.description}
                </p>
              </button>
            );
          })}
        </div>

        {query.trim() && (
          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
            {filtered.length === 0
              ? `Tidak ada tulisan untuk “${query.trim()}”.`
              : `${filtered.length} tulisan cocok dengan “${query.trim()}”.`}
          </p>
        )}

        <motion.div layout className="mt-6 grid grid-cols-1 gap-3.5 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((a, i) => {
              const cat = ARTICLE_CATEGORIES.find((c) => c.id === a.category);
              return (
                <motion.div
                  key={a.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -12 }}
                  transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <Link
                    href={`/blog/${a.slug}`}
                    className="group glass flex h-full flex-col rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-chart-2/25 text-xl ring-1 ring-primary/20"
                        role="img"
                        aria-label={`Ikon artikel ${a.title}`}
                      >
                        {a.emoji}
                      </span>
                      <ArrowUpRight
                        className="size-3.5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </div>

                    {cat && (
                      <span
                        className={`mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${cat.badge}`}
                      >
                        {cat.label}
                      </span>
                    )}

                    <h3 className="text-sm font-bold tracking-tight text-balance transition-colors group-hover:text-primary">
                      {a.title}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays className="size-3 text-primary" aria-hidden />
                        {formatArticleDate(a.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3 text-primary" aria-hidden />
                        {a.readingMinutes} menit
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
                      {a.excerpt}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                      {a.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-secondary-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && !query.trim() && (
          <p className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <PenLine className="size-4 text-primary" aria-hidden />
            Jurnal untuk segmen ini sedang ditulis — segera hadir.
          </p>
        )}

        {showAllLink && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-center"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-primary/15"
            >
              Lihat semua tulisan
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
