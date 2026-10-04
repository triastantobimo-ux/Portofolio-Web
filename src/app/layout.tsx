import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/portfolio/theme-provider";
import { profile } from "@/lib/portfolio";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bimogt.vercel.app"),
  title: `${profile.name} — Portofolio Pribadi`,
  description:
    "Website pribadi Bimo GT — Corporate Internal Auditor & IT enthusiast. Galeri app & tools yang saya bangun, jurnal tulisan seputar audit, IT, AI, dan kebiasaan belajar hal baru.",
  keywords: [
    "portofolio",
    "internal auditor",
    "IT enthusiast",
    "audit",
    "teknologi",
    "jurnal",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Portofolio Pribadi`,
    description:
      "Portofolio interaktif: proyek, keahlian, pengalaman, dan buku tamu. Dibangun dengan Next.js 16, Tailwind CSS 4, dan Prisma.",
    type: "website",
    locale: "id_ID",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4faf5" },
    { media: "(prefers-color-scheme: dark)", color: "#101715" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
