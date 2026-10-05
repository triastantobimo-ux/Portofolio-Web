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

export const experience = [
  {
    role: "Head of Internal Audit Department",
    industry: "Industri Kesehatan · Jaringan RS Swasta Nasional — Indonesia",
    period: "Nov 2024 — Sekarang",
    description:
      "Memimpin departemen internal audit di level korporat grup rumah sakit: menyusun rencana audit berbasis pemetaan risiko, memimpin penugasan audit operasional & kepatuhan lintas unit, melaporkan temuan ke manajemen, dan memastikan setiap rekomendasi ditindaklanjuti secara efektif.",
    tech: ["Corporate Audit", "Risk Assessment", "Internal Controls"],
  },
  {
    role: "Head of Internal Audit Division",
    industry: "Industri Kesehatan · Jaringan RS Swasta Nasional — Indonesia",
    period: "Mei 2021 — Nov 2024",
    description:
      "Memimpin divisi internal audit dalam merencanakan dan mengeksekusi penugasan audit di seluruh unit — dari pengujian efektivitas pengendalian internal dan kepatuhan kebijakan, konsolidasi laporan audit untuk manajemen korporat, sampai pemantauan realisasi tindak lanjut temuan.",
    tech: ["Audit Planning", "Team Leadership", "Audit Reporting"],
  },
  {
    role: "Assistant Manager Internal Audit",
    industry: "Industri Kesehatan · Jaringan RS Multinasional Asia Tenggara — Jakarta",
    period: "Des 2018 — Mei 2021",
    description:
      "Membantu menyusun rencana & program audit tahunan, menjalankan audit atas efektivitas pengendalian internal, akurasi catatan keuangan, dan efisiensi operasional, lalu mengomunikasikan hasil, rekomendasi, dan laporan audit ke manajemen. Nov 2020 — Mei 2021 dipercaya sebagai Acting Manager tim Internal Audit Indonesia: memimpin koordinasi penugasan, konsolidasi laporan ke VP Corporate Risk & Internal Audit, dan membantu tim korporat di audit program & data analytics.",
    tech: ["Internal Audit", "Working Paper", "Data Analytics"],
  },
  {
    role: "Internal Auditor",
    industry: "Industri Otomotif · Manufaktur Suku Cadang Ekspor — Jakarta",
    period: "Mar 2018 — Nov 2018",
    description:
      "Menyusun dan melaksanakan program kerja audit sesuai kebutuhan manajemen pada manufaktur suku cadang otomotif berjaringan global: menguji kebenaran & kepatuhan pelaporan keuangan dan operasional terhadap standar, mengaudit output divisi akuntansi, melakukan inquiries & testing untuk menutup celah, serta menyusun laporan audit dan follow-up bersama manajemen.",
    tech: ["Financial Audit", "Operational Audit", "Follow-up"],
  },
  {
    role: "Accounting & Tax",
    industry: "Industri Pelabuhan & Logistik · Terminal Serbaguna — Bekasi",
    period: "Mar 2016 — Mei 2017",
    description:
      "Mengelola faktur, PPN, PPh Pasal 23 & Pasal 4(2), serta piutang (AR); menjalankan siklus akuntansi harian dari jurnal pembayaran sampai arsip dokumen; menyusun laporan aging piutang bulanan, laporan pendapatan & throughput operasional, laporan PNBP dwi-mingguan, dan rekonsiliasi PPN bulanan.",
    tech: ["Pajak & VAT", "Account Receivable", "Rekonsiliasi"],
  },
  {
    role: "Integrated Distribution System Specialist",
    industry: "Industri Distribusi & Supply Chain · FMCG — Jakarta Timur",
    period: "Feb 2013 — Mar 2016",
    description:
      "Menjaga sistem distribusi terpadu distributor resmi produk FMCG area Jabodetabek: menerima & memverifikasi sales order lalu menginputnya ke sistem ERP, berkoordinasi dengan gudang untuk ketersediaan stok, menerbitkan delivery order & faktur, serta menyusun laporan harian penjualan, pemakaian, dan distribusi inventori.",
    tech: ["ERP", "Sales Order", "Inventory"],
  },
  {
    role: "Teknisi Komputer & Pekerjaan Informal",
    industry: "Beragam Industri · Retail & Jasa IT",
    period: "Jan 2010 — Nov 2012",
    description:
      "Jam terbang teknologi paling awal: teknisi komputer di internet cafe, clerk sekaligus teknisi di toko video game, dan sales di toko komputer. Dari sinilah rasa penasaran saya pada hardware, software, dan cara teknologi memecahkan masalah nyata berakar — hingga akhirnya bertemu kembali dengan dunia audit.",
    tech: ["Hardware", "Troubleshooting", "Customer Service"],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/triastantobimo-ux", icon: "github" },
  { label: "Email", href: `mailto:triastanto.bimo@gmail.com`, icon: "mail" },
] as const;
