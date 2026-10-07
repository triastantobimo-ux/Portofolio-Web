"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { experienceClusters } from "@/lib/portfolio";

export function Experience() {
  return (
    <section id="pengalaman" className="relative py-20 md:py-28" aria-label="Pengalaman kerja">
      <div
        aria-hidden
        className="animate-aurora-a absolute top-1/4 left-[-12%] size-[400px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--glow-2), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Perjalanan"
          title="Pengalaman kerja"
          description="Satu perjalanan, tiga sifat kerja: internal audit, akuntansi-pajak-administrasi, dan pekerjaan informal yang berakar dari hobi."
        />

        <ol className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-border before:to-transparent sm:before:left-[23px]">
          {experienceClusters.map((cluster, i) => (
            <motion.li
              key={cluster.aspect}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-4 sm:gap-6"
            >
              {/* Titik timeline */}
              <span
                aria-hidden
                className="relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border bg-card text-lg shadow-md sm:size-12 sm:text-xl"
              >
                {cluster.emoji}
                <span className="absolute -inset-1 -z-10 rounded-2xl bg-primary/15 opacity-0 blur-md transition-opacity duration-500 hover:opacity-100" />
              </span>

              <div className="group flex-1 rounded-2xl border bg-card/60 p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold tracking-tight">{cluster.aspect}</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary">
                    {cluster.span}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {cluster.summary}
                </p>

                {/* Bullet historikal per aspek */}
                <ul className="mt-4 space-y-4 border-t pt-4">
                  {cluster.entries.map((entry) => (
                    <li key={`${cluster.aspect}-${entry.role}-${entry.period}`} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary/70 ring-4 ring-primary/10"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                          <h4 className="text-sm font-semibold">{entry.role}</h4>
                          <span className="font-mono text-[11px] whitespace-nowrap text-primary/90">
                            {entry.period}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs font-medium text-muted-foreground/80">
                          {entry.industry}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground text-pretty">
                          {entry.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cluster.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-secondary px-2 py-1 font-mono text-[10px] text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
