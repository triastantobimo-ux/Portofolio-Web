"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Magnetic } from "./magnetic";
import { profile, socials } from "@/lib/portfolio";

const socialIcons = {
  github: (props) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>,
  linkedin: (props) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z"/></svg>,
  instagram: (props) => <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.35 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.35-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.35-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.35 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/></svg>,
  mail: (props) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
} as const;

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email tersalin ke clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin email.");
    }
  }

  return (
    <section id="kontak" className="relative py-20 md:py-28" aria-label="Kontak">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border p-8 text-center sm:p-14"
        >
          {/* Latar dekoratif */}
          <div
            aria-hidden
            className="animate-aurora-a absolute top-[-40%] left-1/2 size-[520px] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, var(--glow-1), transparent 70%)" }}
          />
          <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-balance sm:text-5xl">
              Punya ide menarik? <span className="text-gradient">Mari wujudkan</span> bersama.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty md:text-lg">
              {profile.availability}. Kirim email atau sapa saya di media sosial — saya biasanya
              membalas dalam 1×24 jam.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Button size="lg" asChild className="rounded-full px-7 text-base shadow-lg shadow-primary/25">
                  <a href={`mailto:${profile.email}`} className="gap-2">
                    <Mail className="size-4" aria-hidden />
                    Kirim Email
                  </a>
                </Button>
              </Magnetic>
              <Button
                size="lg"
                variant="outline"
                onClick={copyEmail}
                className="gap-2 rounded-full px-7 font-mono text-sm"
              >
                {copied ? (
                  <Check className="size-4 text-primary" aria-hidden />
                ) : (
                  <Copy className="size-4" aria-hidden />
                )}
                {profile.email}
              </Button>
            </div>

            <div className="mt-9 flex items-center justify-center gap-2">
              {socials.map((s) => {
                const Icon = socialIcons[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="grid size-12 place-items-center rounded-full border bg-card/60 text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
