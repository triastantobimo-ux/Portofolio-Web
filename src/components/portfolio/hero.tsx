"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Instagram, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { profile, socials } from "@/lib/portfolio";

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
} as const;

/* Efek mesin tik: menulis & menghapus daftar peran berulang kali */
function useTypewriter(words: string[], typeMs = 65, deleteMs = 32, holdMs = 1600) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex % words.length];
    let delay = deleting ? deleteMs : typeMs;

    if (!deleting && text === word) {
      delay = holdMs;
    } else if (deleting && text === "") {
      delay = 250;
    }

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words, typeMs, deleteMs, holdMs]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(profile.roles);
  const [pos, setPos] = useState({ x: 50, y: 30 });

  // Spotlight mengikuti kursor (hanya di area hero)
  function onSpotlight(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="beranda"
      onMouseMove={onSpotlight}
      className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16"
      aria-label="Perkenalan"
    >
      {/* Latar: pola grid + aurora + spotlight */}
      <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden />
      <div
        aria-hidden
        className="animate-aurora-a absolute -top-32 left-[8%] size-[420px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-1), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="animate-aurora-b absolute top-[30%] right-[4%] size-[460px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-2), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="animate-aurora-a absolute bottom-[-15%] left-[35%] size-[380px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-3), transparent 70%)", animationDelay: "-8s" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-[background] duration-200"
        style={{
          background: `radial-gradient(560px circle at ${pos.x}% ${pos.y}%, oklch(0.81 0.15 162 / 9%), transparent 65%)`,
        }}
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm text-primary"
        >
          <Sparkles className="size-4" aria-hidden />
          <span>{profile.availability}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-4xl font-extrabold tracking-tight text-balance sm:text-6xl md:text-7xl"
        >
          Halo, saya{" "}
          <span className="text-gradient">{profile.name}</span>
          <span className="text-primary">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 flex h-8 items-center font-mono text-lg text-muted-foreground sm:text-2xl"
          aria-label="Peran profesional"
        >
          <span className="mr-3 select-none text-primary">&gt;</span>
          {typed}
          <span className="animate-caret ml-1 inline-block h-[1.2em] w-[3px] rounded-sm bg-primary" aria-hidden />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground"
        >
          <MapPin className="size-4 text-primary" aria-hidden />
          {profile.location}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <Button
              size="lg"
              onClick={() => scrollTo("proyek")}
              className="group rounded-full px-7 text-base shadow-lg shadow-primary/25"
            >
              Lihat Galeri
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("kontak")}
              className="rounded-full px-7 text-base"
            >
              Hubungi Saya
            </Button>
          </Magnetic>

          <div className="ml-1 flex items-center gap-1 sm:ml-3">
            {socials.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full text-muted-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:text-primary"
                >
                  <Icon className="size-5" aria-hidden />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Indikator gulir — posisi kanan-bawah agar tidak menabrak deretan ikon */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        onClick={() => scrollTo("tentang")}
        className="absolute right-6 bottom-7 hidden flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary lg:flex xl:right-14"
        aria-label="Gulir ke bagian tentang"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Gulir</span>
        <span className="flex h-9 w-5.5 justify-center rounded-full border-2 border-current p-1">
          <span className="animate-scroll-dot size-1.5 rounded-full bg-current" />
        </span>
        <ArrowDown className="size-3" aria-hidden />
      </motion.button>
    </section>
  );
}
