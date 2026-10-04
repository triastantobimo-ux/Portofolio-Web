"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { TiltCard } from "./tilt-card";
import { projects } from "@/lib/portfolio";

const filters = ["Semua", "Web App", "UI/UX", "Open Source"] as const;

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");

  const filtered = useMemo(
    () => (filter === "Semua" ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="proyek" className="relative py-20 md:py-28" aria-label="Proyek pilihan">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Portofolio"
          title="Proyek pilihan"
          description="Beberapa karya yang paling saya banggakan — mulai dari aplikasi web lengkap, eksperimen desain, sampai kontribusi open source."
        />

        {/* Filter kategori */}
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter proyek">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`relative rounded-full border px-4.5 py-2 text-sm font-medium transition-colors ${
                filter === f
                  ? "border-primary/50 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>

        {/* Grid proyek */}
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -14 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full rounded-3xl">
                  <article className="glass flex h-full flex-col overflow-hidden rounded-3xl">
                    {/* Cover gradient + emoji */}
                    <div
                      className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${p.gradient}`}
                    >
                      <span
                        className="text-6xl drop-shadow-lg transition-transform duration-500 group-hover/tilt:scale-125 group-hover/tilt:-rotate-6"
                        role="img"
                        aria-label={`Ikon proyek ${p.title}`}
                      >
                        {p.emoji}
                      </span>
                      <span className="absolute top-3 left-3 rounded-full bg-background/70 px-3 py-1 font-mono text-[10px] tracking-wider text-foreground/80 uppercase backdrop-blur-sm">
                        {p.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <h3 className="text-lg font-bold tracking-tight">{p.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                        {p.description}
                      </p>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] text-secondary-foreground"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <a
                          href={p.link}
                          aria-label={`Buka detail proyek ${p.title}`}
                          className="grid size-9 shrink-0 place-items-center rounded-full border text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                        >
                          <ExternalLink className="size-4" aria-hidden />
                        </a>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA proyek lainnya */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Folder className="size-4 text-primary" aria-hidden />
            Masih banyak eksperimen lain di beranda GitHub saya — mantapkan kursor dan jelajahi.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
