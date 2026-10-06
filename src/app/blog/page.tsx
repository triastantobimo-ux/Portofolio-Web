import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { Journal } from "@/components/portfolio/journal";
import { getArticleMetas } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Jurnal & Tulisan",
  description:
    "Kumpulan jurnal dan tulisan Bimo GT, terbagi per segmen: audit, teknologi, game, dan catatan kehidupan. Ditulis santai dengan harapan berguna untuk dibaca ulang.",
  alternates: {
    canonical: "https://bimogt.vercel.app/blog",
  },
  openGraph: {
    title: "Jurnal & Tulisan — Bimo GT",
    description:
      "Kumpulan jurnal audit, teknologi, game, dan catatan belajar.",
    url: "https://bimogt.vercel.app/blog",
    type: "website",
    locale: "id_ID",
  },
};

export default function BlogPage() {
  const articles = getArticleMetas();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 md:pt-36">
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

          <Journal articles={articles} showAllLink={false} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
