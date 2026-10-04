import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { formatArticleDate } from "@/lib/format-date";
import { getArticleMetas } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Jurnal & Tulisan — Bimo GT",
  description:
    "Kumpulan jurnal dan tulisan Bimo GT: audit, teknologi, AI, kebiasaan belajar, dan hal-hal kecil yang bermanfaat untuk dibaca ulang.",
};

export default function BlogPage() {
  const articles = getArticleMetas();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 md:pt-36">
        {/* Aurora latar tipis */}
        <div
          aria-hidden
          className="animate-aurora-a absolute top-24 left-[-8%] size-[380px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--glow-1), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="animate-aurora-b absolute top-1/2 right-[-10%] size-[420px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--glow-2), transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Kembali ke beranda
          </Link>

          <SectionHeading
            eyebrow="Jurnal"
            title="Tulisan & catatan"
            description="Catatan dari perjalanan belajar saya: audit, teknologi, AI, dan kebiasaan kecil yang ternyata penting. Ditulis santai, dengan harapan berguna untuk dibaca ulang."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group glass flex flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
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
                    {a.readingMinutes} menit baca
                  </span>
                </div>

                <h2 className="text-lg font-bold tracking-tight text-balance transition-colors group-hover:text-primary">
                  {a.title}
                </h2>
                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {a.excerpt}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {a.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <p className="text-center text-muted-foreground">
              Belum ada tulisan — segera hadir.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
