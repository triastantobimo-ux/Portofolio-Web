/* ============================================================
   DATA PORTOFOLIO — Ubah bagian ini saja untuk mempersonalisasi
   seluruh isi website (nama, skill, proyek, pengalaman, sosial).
   ============================================================ */

export const profile = {
  name: "Raka Pratama",
  firstName: "Raka",
  roles: [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Open Source Contributor",
    "Problem Solver",
  ],
  bio: "Saya membangun produk digital yang cepat, indah, dan bermanfaat — dari desain antarmuka sampai arsitektur backend. Fokus saya: pengalaman pengguna yang mulus dan kode yang bersih.",
  location: "Jakarta, Indonesia",
  email: "halo@rakapratama.dev",
  availability: "Terbuka untuk proyek freelance & kolaborasi",
  avatarEmoji: "🧑‍💻",
  resumeNote: "CV lengkap tersedia via email",
};

export const stats = [
  { value: 5, suffix: "+", label: "Tahun Pengalaman" },
  { value: 48, suffix: "+", label: "Proyek Selesai" },
  { value: 32, suffix: "", label: "Klien Puas" },
  { value: 12, suffix: "", label: "Kontribusi OSS" },
];

export const aboutCards = {
  funFact:
    "Dulu saya remat kode HTML di notepad waktu SMA — sekarang saya bangun sistem full-stack utuh. Proses belajar nggak pernah berhenti.",
  currentlyLearning: ["Rust", "WebGPU", "Motion Design"],
  focus: ["Product Engineering", "Design System", "Performa Web"],
};

export type Skill = {
  name: string;
  level: number; // 0–100
  category: "Frontend" | "Backend" | "Tools";
};

export const skills: Skill[] = [
  { name: "React / Next.js", level: 95, category: "Frontend" },
  { name: "TypeScript", level: 92, category: "Frontend" },
  { name: "Tailwind CSS", level: 94, category: "Frontend" },
  { name: "Framer Motion", level: 86, category: "Frontend" },
  { name: "Node.js / Bun", level: 90, category: "Backend" },
  { name: "Prisma / SQL", level: 85, category: "Backend" },
  { name: "REST / WebSocket", level: 88, category: "Backend" },
  { name: "Autentikasi (NextAuth)", level: 80, category: "Backend" },
  { name: "Git & CI/CD", level: 88, category: "Tools" },
  { name: "Figma", level: 84, category: "Tools" },
  { name: "Docker", level: 76, category: "Tools" },
  { name: "Testing (Vitest)", level: 78, category: "Tools" },
];

export const marqueeItems = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Bun",
  "Prisma", "PostgreSQL", "WebSocket", "Docker", "Figma", "Vitest",
  "Framer Motion", "Zustand", "Git", "shadcn/ui",
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  category: "Web App" | "UI/UX" | "Open Source";
  emoji: string;
  gradient: string; // kelas tailwind gradient untuk cover
  link: string;
};

export const projects: Project[] = [
  {
    title: "Nusantara Eats",
    description:
      "Platform pemesanan makanan UMKM lokal dengan pelacakan real-time, integrasi pembayaran, dan dashboard penjual yang lengkap.",
    tags: ["Next.js", "Prisma", "WebSocket"],
    category: "Web App",
    emoji: "🍜",
    gradient: "from-emerald-500/30 via-teal-500/20 to-amber-400/30",
    link: "#",
  },
  {
    title: "SahamKu Analytics",
    description:
      "Dashboard analisis saham dengan visualisasi candlestick interaktif, screener saham, dan alarm harga otomatis.",
    tags: ["React", "Recharts", "API"],
    category: "Web App",
    emoji: "📈",
    gradient: "from-amber-400/30 via-orange-400/20 to-emerald-500/30",
    link: "#",
  },
  {
    title: "Loka Design System",
    description:
      "Design system open-source berisi 60+ komponen React yang dapat diakses (a11y), terdokumentasi, dan siap produksi.",
    tags: ["TypeScript", "A11y", "Storybook"],
    category: "Open Source",
    emoji: "🎨",
    gradient: "from-teal-500/30 via-emerald-400/20 to-lime-300/30",
    link: "#",
  },
  {
    title: "Redesign Bank Digital",
    description:
      "Studi kasus redesain aplikasi mobile banking: riset pengguna, prototipe hi-fi, dan uji kegunaan bersama 24 responden.",
    tags: ["Figma", "UX Research", "Prototyping"],
    category: "UI/UX",
    emoji: "🏦",
    gradient: "from-emerald-400/30 via-cyan-500/20 to-amber-300/30",
    link: "#",
  },
  {
    title: "Pomodoro Focus",
    description:
      "Aplikasi produktivitas offline-first dengan statistik fokus, suara ambien, dan sinkronisasi lintas perangkat.",
    tags: ["PWA", "IndexedDB", "React"],
    category: "Web App",
    emoji: "⏱️",
    gradient: "from-lime-400/30 via-emerald-500/20 to-teal-500/30",
    link: "#",
  },
  {
    title: "CLI Toolkit",
    description:
      "Kumpulan tooling CLI open-source untuk mempercepat scaffolding proyek dan migrasi basis data tim kecil.",
    tags: ["Node.js", "Bun", "OSS"],
    category: "Open Source",
    emoji: "🛠️",
    gradient: "from-amber-300/30 via-emerald-500/20 to-cyan-500/30",
    link: "#",
  },
];

export const experience = [
  {
    role: "Senior Frontend Engineer",
    company: "Tokopikir Studio",
    period: "2023 — Sekarang",
    description:
      "Memimpin pengembangan design system yang dipakai 6 produk internal, meningkatkan kecepatan rilis fitur hingga 40%. Mentor untuk 4 engineer junior.",
    tech: ["Next.js", "TypeScript", "Design System"],
  },
  {
    role: "Full-Stack Developer",
    company: "Sawala Tech",
    period: "2021 — 2023",
    description:
      "Membangun dari nol platform marketplace B2B dengan Node.js & React: sistem pembayaran, notifikasi real-time, dan panel admin. Melayani 12K+ pengguna aktif.",
    tech: ["React", "Node.js", "PostgreSQL"],
  },
  {
    role: "Frontend Developer",
    company: "Kreatif Bangsa",
    period: "2020 — 2021",
    description:
      "Mengerjakan 20+ landing page dan aplikasi web untuk klien dari berbagai industri. Fokus pada performa (Core Web Vitals hijau di semua proyek).",
    tech: ["Vue", "SCSS", "GSAP"],
  },
  {
    role: "Freelance Web Developer",
    company: "Mandiri",
    period: "2019 — 2020",
    description:
      "Memulai karier dengan proyek website UMKM dan komunitas. Belajar menangani klien, estimasi, dan melihat kode sebagai produk.",
    tech: ["HTML/CSS", "JavaScript", "WordPress"],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Email", href: `mailto:halo@rakapratama.dev`, icon: "mail" },
] as const;
