"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, PenLine } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { formatArticleDate } from "@/lib/format-date";
import type { ArticleMeta } from "@/lib/articles";

export function Journal({ articles }: { articles: ArticleMeta[] }) {
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
          description="Saya menulis untuk berpikir lebih jernih — tentang audit, teknologi, dan kebiasaan belajar. Semoga ada yang berguna untukmu juga."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {articles.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <Link
                href={`/blog/${a.slug}`}
                className="group glass flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-chart-2/25 text-2xl ring-1 ring-primary/20"
                    role="img"
                    aria-label={`Ikon artikel ${a.title}`}
                  >
                    {a.emoji}
                  </span>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden
                  />
                </div>

                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5 text-primary" aria-hidden />
                    {formatArticleDate(a.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-3.5 text-primary" aria-hidden />
                    {a.readingMinutes} menit
                  </span>
                </div>

                <h3 className="text-base font-bold tracking-tight text-balance transition-colors group-hover:text-primary">
                  {a.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {a.excerpt}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {a.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {articles.length === 0 && (
          <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <PenLine className="size-4 text-primary" aria-hidden />
            Jurnal pertama sedang ditulis — segera hadir.
          </p>
        )}

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
      </div>
    </section>
  );
}
