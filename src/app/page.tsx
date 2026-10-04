import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Projects } from "@/components/portfolio/projects";
import { Experience } from "@/components/portfolio/experience";
import { Journal } from "@/components/portfolio/journal";
import { Guestbook } from "@/components/portfolio/guestbook";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";
import { getArticleMetas } from "@/lib/articles";

export default function Home() {
  const latestArticles = getArticleMetas();

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Skip link untuk aksesibilitas keyboard */}
      <a
        href="#tentang"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-primary-foreground"
      >
        Lewati ke konten utama
      </a>

      <Navbar />

      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Journal articles={latestArticles} />
        <Guestbook />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
