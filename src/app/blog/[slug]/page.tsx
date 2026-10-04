import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { formatArticleDate } from "@/lib/format-date";
import { getCategory } from "@/lib/categories";
import { getArticle, getArticleSlugs } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Artikel tidak ditemukan — Bimo GT" };
  return {
    title: `${article.title} — Bimo GT`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 md:pt-36">
        <div
          aria-hidden
          className="animate-aurora-a absolute top-16 right-[-8%] size-[380px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--glow-1), transparent 70%)" }}
        />

        <article className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Semua tulisan
          </Link>

          {/* Kepala artikel */}
          <header className="mb-10">
            <span
              className="animate-float-y mb-6 grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-chart-2/25 text-3xl ring-2 ring-primary/30"
              role="img"
              aria-label={`Ikon artikel ${article.title}`}
            >
              {article.emoji}
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {article.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {(() => {
                const cat = getCategory(article.category);
                return (
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${cat.badge}`}
                  >
                    {cat.emoji} {cat.label}
                  </span>
                );
              })()}
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4 text-primary" aria-hidden />
                {formatArticleDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4 text-primary" aria-hidden />
                {article.readingMinutes} menit baca
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {article.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary"
                >
                  {t}
                </span>
              ))}
            </div>
          </header>

          {/* Isi artikel */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          {/* Penutup + navigasi */}
          <div className="mt-16 rounded-3xl border border-primary/25 bg-primary/5 p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Terima kasih sudah membaca sampai sini. Kalau kamu punya pengalaman
              atau pendapat berbeda tentang topik ini, saya sangat terbuka untuk
              diskusi — silakan sapa lewat{" "}
              <a href="/#buku-tamu" className="text-primary underline underline-offset-4">
                buku tamu
              </a>{" "}
              atau email di bagian{" "}
              <a href="/#kontak" className="text-primary underline underline-offset-4">
                kontak
              </a>
              .
            </p>
            <Link
              href="/blog"
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Baca tulisan lainnya
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
