/* ============================================================
   DATA PORTOFOLIO — Ubah bagian ini saja untuk mempersonalisasi
   seluruh isi website (nama, skill, galeri, pengalaman, sosial).
   ============================================================ */

export const profile = {
  name: "Bimo GT",
  firstName: "Bimo",
  roles: [
    "Corporate Internal Auditor",
    "IT Enthusiast",
    "Tech Tinkerer & Builder",
    "Lifelong Learner",
  ],
  bio: "Auditor internal di jam kerja, eksplorator teknologi di luar itu. Saya menggabungkan dunia audit dan IT — video game, hardware, AI — lalu menuangkannya menjadi app, tools, dan jurnal tulisan yang bermanfaat.",
  location: "Indonesia",
  email: "triastanto.bimo@gmail.com",
  availability: "Terbuka untuk diskusi audit, IT & kolaborasi",
  avatarEmoji: "🧑‍💻",
  resumeNote: "CV lengkap tersedia via email",
};

export const stats = [
  { value: 5, suffix: "+", label: "Tahun di Dunia Audit" },
  { value: 40, suffix: "+", label: "Proyek Audit Dikerjakan" },
  { value: 10, suffix: "+", label: "App & Tools Dibangun" },
  { value: 4, suffix: "", label: "Area Belajar Aktif" },
];

export const aboutCards = {
  funFact:
    "Kariernya di ruang rapat audit, tapi malamnya saya bangun tools untuk otomatisasi pekerjaan sendiri. Sejak itu saya percaya: auditor yang paham teknologi bisa melihat risiko sekaligus peluang yang tersembunyi.",
  currentlyLearning: [
    "Python untuk Data Analytics",
    "AI & LLM untuk Produktivitas",
    "Home Lab & Self-Hosting",
    "Menulis yang Lebih Baik",
  ],
  focus: ["Internal Audit & Risk", "Data Analytics", "Otomatisasi & AI", "Lifelong Learning"],
};

export type Skill = {
  name: string;
  level: number; // 0–100
  category: "Audit" | "Teknologi" | "Tools";
};

export const skills: Skill[] = [
  // — Dunia audit —
  { name: "Internal Audit & GRC", level: 92, category: "Audit" },
  { name: "Internal Control (COSO)", level: 90, category: "Audit" },
  { name: "Risk Assessment", level: 88, category: "Audit" },
  { name: "Fraud Investigation", level: 80, category: "Audit" },
  { name: "Audit Data Analytics", level: 85, category: "Audit" },
  { name: "Report & Working Paper", level: 93, category: "Audit" },
  // — Dunia teknologi —
  { name: "Python", level: 82, category: "Teknologi" },
  { name: "SQL & Database", level: 84, category: "Teknologi" },
  { name: "Web (Next.js / React)", level: 75, category: "Teknologi" },
  { name: "AI & LLM Tools", level: 86, category: "Teknologi" },
  { name: "Power BI / Dashboard", level: 80, category: "Teknologi" },
  { name: "Hardware & Networking", level: 78, category: "Teknologi" },
  // — Perangkat harian —
  { name: "Excel / Google Sheets", level: 95, category: "Tools" },
  { name: "Git & GitHub", level: 78, category: "Tools" },
  { name: "Docker & Home Lab", level: 70, category: "Tools" },
  { name: "Obsidian / Notion", level: 88, category: "Tools" },
];

export const marqueeItems = [
  "Internal Audit", "Risk Management", "COSO", "Python", "SQL", "Excel",
  "Power BI", "AI & LLM", "Next.js", "Docker", "Home Lab", "Git",
  "Obsidian", "Video Game", "Olahraga",
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  category: "App" | "Tool" | "Eksperimen";
  emoji: string;
  gradient: string; // kelas tailwind gradient untuk cover
  link: string;
};

export const projects: Project[] = [
  {
    title: "Audit Sampling Helper",
    description:
      "Tool sampling dan analisis data transaksi untuk kebutuhan audit: random sampling, deteksi duplikasi, dan uji distribusi Benford dalam sekali jalan.",
    tags: ["Python", "Excel", "Benford"],
    category: "Tool",
    emoji: "🧮",
    gradient: "from-emerald-500/30 via-teal-500/20 to-amber-400/30",
    link: "#",
  },
  {
    title: "AI Meeting Notes",
    description:
      "Ringkasan rapat otomatis dengan LLM: transkrip berubah menjadi poin keputusan, tindak lanjut, dan daftar risiko yang siap dibawa ke working paper.",
    tags: ["LLM", "Python", "Whisper"],
    category: "App",
    emoji: "🤖",
    gradient: "from-amber-400/30 via-orange-400/20 to-emerald-500/30",
    link: "#",
  },
  {
    title: "Checklist Audit Digital",
    description:
      "Working paper digital: checklist audit interaktif dengan pelacakan temuan, keterangan, dan status tindak lanjut per entitas.",
    tags: ["Next.js", "Prisma", "Workflow"],
    category: "Tool",
    emoji: "✅",
    gradient: "from-teal-500/30 via-emerald-400/20 to-lime-300/30",
    link: "#",
  },
  {
    title: "Expense Tracker PWA",
    description:
      "Aplikasi pencatat keuangan pribadi offline-first: input cepat, visualisasi bulanan, dan ekspor laporan — jadi proyek belajar PWA sekaligus.",
    tags: ["React", "PWA", "IndexedDB"],
    category: "App",
    emoji: "💰",
    gradient: "from-emerald-400/30 via-cyan-500/20 to-amber-300/30",
    link: "#",
  },
  {
    title: "Home Lab Mini Server",
    description:
      "Server rumahan untuk belajar networking dan self-hosting: NAS pribadi, dashboard monitoring, backup otomatis, dan container lab.",
    tags: ["Docker", "Linux", "NAS"],
    category: "Eksperimen",
    emoji: "🖥️",
    gradient: "from-lime-400/30 via-emerald-500/20 to-teal-500/30",
    link: "#",
  },
  {
    title: "Website bimogt",
    description:
      "Situs yang sedang kamu lihat: portofolio, galeri bangunan, dan jurnal tulisan — laboratorium web yang saya rawat terus-menerus.",
    tags: ["Next.js 16", "Tailwind 4", "Vercel"],
    category: "App",
    emoji: "🌐",
    gradient: "from-amber-300/30 via-emerald-500/20 to-cyan-500/30",
    link: "https://bimogt.vercel.app",
  },
];

export const experience = [
  {
    role: "Corporate Internal Auditor",
    company: "Perusahaan Multiindustri Nasional",
    period: "2022 — Sekarang",
    description:
      "Menyusun rencana audit tahunan berbasis pemetaan risiko, mengeksekusi audit operasional dan kepatuhan lintas unit, serta memastikan tindak lanjut temuan berjalan efektif. Membangun tools internal untuk analisis data agar pekerjaan audit lebih cepat dan berbasis bukti.",
    tech: ["Internal Audit", "Risk Assessment", "Data Analytics"],
  },
  {
    role: "Staff Auditor",
    company: "Kantor Akuntan Publik",
    period: "2020 — 2022",
    description:
      "Menjalankan pemeriksaan laporan keuangan klien dari berbagai industri: pengujian sampel, verifikasi bukti audit, dokumentasi working paper, dan komunikasi temuan kepada manajer audit. Fondasi disiplin bukti yang sekarang saya bawa ke mana-mana.",
    tech: ["Financial Audit", "Sampling", "Working Paper"],
  },
  {
    role: "IT Support & Freelance",
    company: "Mandiri / Komunitas",
    period: "2018 — 2020",
    description:
      "Perjalanan hobi jadi keahlian: merakit PC, troubleshooting hardware-software, membangun website kecil, dan membantu UMKM sekitar. Dari sini saya sadar teknologi adalah pengganda produktivitas — termasuk untuk dunia audit.",
    tech: ["Hardware", "Troubleshooting", "Web"],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/triastantobimo-ux", icon: "github" },
  { label: "Email", href: `mailto:triastanto.bimo@gmail.com`, icon: "mail" },
] as const;
