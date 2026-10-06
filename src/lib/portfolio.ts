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
  { value: 8, suffix: "+", label: "Tahun di Dunia Audit" },
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

export type SkillGroup = {
  name: string;
  emoji: string;
  note: string; // satu kalimat pengantar kelompok
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    name: "Audit",
    emoji: "🧾",
    note: "Disiplin berbasis bukti dan professional skepticism.",
    items: [
      "Internal Audit & GRC",
      "Internal Control (COSO)",
      "Risk Assessment",
      "Fraud Investigation",
      "Audit Data Analytics",
      "Report & Working Paper",
    ],
  },
  {
    name: "Teknologi",
    emoji: "💻",
    note: "Pengganda produktivitas — sekaligus arena bermain saya.",
    items: [
      "Python",
      "SQL & Database",
      "Web (Next.js / React)",
      "AI & LLM",
      "Power BI / Dashboard",
      "Hardware & Networking",
    ],
  },
  {
    name: "Tools Harian",
    emoji: "🧰",
    note: "Perangkat yang saya pakai setiap hari untuk menyelesaikan hal.",
    items: [
      "Excel / Google Sheets",
      "Git & GitHub",
      "Docker & Home Lab",
      "Obsidian / Notion",
    ],
  },
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

/* ============================================================
   PENGALAMAN — 3 ringkasan dari 7 peran detail
   (Leadership audit · Jalur auditor · Fondasi karier)
   ============================================================ */
export const experience = [
  {
    role: "Head of Internal Audit",
    industry: "Industri Kesehatan · Jaringan RS Swasta Nasional — Indonesia",
    period: "Mei 2021 — Sekarang",
    description:
      "Memimpin fungsi internal audit di level divisi lalu departemen korporat grup rumah sakit: merancang rencana audit berbasis risiko, memimpin penugasan operasional & kepatuhan lintas unit, mengonsolidasi laporan ke manajemen, dan memastikan rekomendasi ditindaklanjuti. Fokus pada efektivitas pengendalian internal, GRC, dan penguatan kapasitas tim audit.",
    tech: ["Corporate Audit", "Risk Assessment", "Team Leadership", "Internal Controls"],
  },
  {
    role: "Internal Auditor & Assistant Manager",
    industry: "Kesehatan (RS Multinasional Asia Tenggara) · Otomotif (Manufaktur Ekspor) — Jakarta",
    period: "Mar 2018 — Mei 2021",
    description:
      "Membangun fondasi audit profesional: dari Internal Auditor di manufaktur suku cadang otomotif global (financial & operational audit, working paper, follow-up) hingga Assistant Manager di jaringan RS multinasional — menyusun program audit tahunan, menguji pengendalian & efisiensi operasional, serta Acting Manager (Nov 2020–Mei 2021) yang mengoordinasikan penugasan dan laporan ke VP Corporate Risk & Internal Audit, termasuk dukungan data analytics.",
    tech: ["Internal Audit", "Working Paper", "Data Analytics", "Financial & Operational Audit"],
  },
  {
    role: "Accounting, Distribusi & Fondasi IT",
    industry: "Pelabuhan & Logistik · FMCG Distribusi · Retail & Jasa IT",
    period: "Jan 2010 — Mei 2017",
    description:
      "Tiga fondasi sebelum masuk audit: Accounting & Tax di terminal pelabuhan (PPN, PPh, AR, rekonsiliasi); Integrated Distribution System Specialist di distributor FMCG (ERP, sales order, inventori); dan teknisi komputer / toko game / sales IT (2010–2012) yang menanamkan rasa penasaran pada hardware dan troubleshooting — akar yang kini kembali bertemu dengan dunia audit dan teknologi.",
    tech: ["Pajak & VAT", "ERP", "Inventory", "Hardware & Troubleshooting"],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/triastantobimo-ux", icon: "github" },
  { label: "Email", href: `mailto:triastanto.bimo@gmail.com`, icon: "mail" },
] as const;
