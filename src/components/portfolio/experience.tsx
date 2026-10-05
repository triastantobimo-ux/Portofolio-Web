"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { experience } from "@/lib/portfolio";

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
          description="Dari teknisi komputer, dunia distribusi & perpajakan, sampai memimpin tim audit — setiap langkah mengajarkan sesuatu yang baru."
        />

        <ol className="relative space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[19px] before:w-px before:bg-gradient-to-b before:from-primary/60 before:via-border before:to-transparent sm:before:left-[23px]">
          {experience.map((e, i) => (
            <motion.li
              key={`${e.period}-${e.role}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-4 sm:gap-6"
            >
              {/* Titik timeline */}
              <span
                aria-hidden
                className="relative z-10 grid size-10 shrink-0 place-items-center rounded-xl border bg-card shadow-md sm:size-12"
              >
                <Briefcase className="size-4 text-primary sm:size-5" />
                <span className="absolute -inset-1 -z-10 rounded-2xl bg-primary/15 opacity-0 blur-md transition-opacity duration-500 hover:opacity-100" />
              </span>

              <div className="group flex-1 rounded-2xl border bg-card/60 p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold tracking-tight">{e.role}</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary">
                    {e.period}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-muted-foreground">{e.industry}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {e.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.tech.map((t) => (
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
