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
   PENGALAMAN — dikluster berdasarkan sifat/nature pekerjaan:
   1. Internal Audit
   2. Accounting, Tax & Administration
   3. Non-formal (berkaitan dengan hobi)
   Tiap aspek berisi bullet historikal + penjelasan singkat
   apa pekerjaannya & apa yang dikerjakan.
   ============================================================ */
export type ExperienceEntry = {
  role: string;
  period?: string; // opsional — aspek dengan satu rentang waktu cukup pakai span di level kluster
  industry?: string; // industri + lokasi — TANPA nama perusahaan (opsional bila berulang)
  detail: string; // penjelasan singkat: apa & ngapain
};

export type ExperienceCluster = {
  aspect: string; // nature pekerjaan
  emoji: string;
  span: string; // rentang waktu keseluruhan aspek
  summary: string; // pengantar singkat nature kerjaannya
  entries: ExperienceEntry[];
  tags: string[];
};

export const experienceClusters: ExperienceCluster[] = [
  {
    aspect: "Internal Audit",
    emoji: "🔍",
    span: "2018 — Sekarang",
    summary:
      "Alur utama karier: dari auditor lapangan yang menyusun working paper sampai memimpin fungsi internal audit di tingkat departemen korporat.",
    entries: [
      {
        role: "Head of Internal Audit Department",
        period: "Nov 2024 — Sekarang",
        industry: "Kesehatan · Jaringan RS Swasta Nasional — Indonesia",
        detail:
          "Memimpin departemen internal audit korporat grup: menetapkan rencana audit berbasis risiko, mengawasi penugasan lintas unit usaha, dan menyampaikan hasil audit ke manajemen puncak.",
      },
      {
        role: "Head of Internal Audit Division",
        period: "Mei 2021 — Nov 2024",
        industry: "Kesehatan · Jaringan RS Swasta Nasional — Indonesia",
        detail:
          "Merancang program audit tahunan, memimpin penugasan operasional & kepatuhan lintas rumah sakit, mengonsolidasi laporan, dan memastikan rekomendasi benar-benar ditindaklanjuti.",
      },
      {
        role: "Assistant Manager Internal Audit",
        period: "Des 2018 — Mei 2021",
        industry:
          "Kesehatan · RS Multinasional Asia Tenggara — Jakarta · Acting Manager Nov 2020 — Mei 2021",
        detail:
          "Membantu penyusunan annual audit plan serta pengujian efektivitas pengendalian internal dan efisiensi operasional. Saat dipercaya sebagai Acting Manager, memimpin tim audit Indonesia dan melapor ke VP Corporate Risk & Internal Audit.",
      },
      {
        role: "Internal Auditor",
        period: "Mar 2018 — Nov 2018",
        industry: "Otomotif · Manufaktur Suku Cadang Ekspor — Jakarta",
        detail:
          "Menjalankan audit keuangan & operasional: menyusun working paper, mengaudit output divisi akuntansi, lalu menulis laporan dan menindaklanjuti temuan bersama manajemen.",
      },
    ],
    tags: ["Corporate Audit", "Risk Assessment", "Internal Controls", "Data Analytics"],
  },
  {
    aspect: "Accounting, Tax & Administration",
    emoji: "🧾",
    span: "2013 — 2017",
    summary:
      "Fondasi angka-angka: memahami transaksi dari sisi pencatatannya — invoice, pajak, ERP — sebelum akhirnya mengauditnya dari sisi lain meja.",
    entries: [
      {
        role: "Accounting & Tax",
        period: "Mar 2016 — Mei 2017",
        industry: "Pelabuhan & Logistik · Terminal Multiguna — Bekasi",
        detail:
          "Mengelola invoice, PPN, PPh Art. 23 & 4(2), dan piutang: input-post jurnal pembayaran, rekonsiliasi PPN bulanan, serta penyusunan laporan aging piutang dan pendapatan operasional.",
      },
      {
        role: "Integrated Distribution System Specialist",
        period: "Feb 2013 — Mar 2016",
        industry: "Distribusi FMCG — Jakarta",
        detail:
          "Mengoperasikan ERP distributor FMCG: memproses sales order, berkoordinasi dengan gudang untuk ketersediaan stok, menerbitkan delivery order & invoice, dan menyusun laporan harian penjualan serta inventori.",
      },
    ],
    tags: ["Pajak & VAT", "AR & Jurnal", "ERP", "Inventory"],
  },
  {
    aspect: "Non-formal — Hobi & Teknologi",
    emoji: "🎮",
    span: "2010 — 2012",
    summary:
      "Sebelum karier formal, hobi komputer & video game menjadi penghasilan — di sinilah akar rasa penasaran teknologi yang kini bertemu kembali dengan dunia audit.",
    entries: [
      {
        role: "Teknisi Komputer — Internet Café",
        detail:
          "Perawatan dan troubleshooting PC harian — hardware, jaringan, dan software diperbaiki dengan tangan sendiri.",
      },
      {
        role: "Store Clerk & Teknisi — Toko Video Game",
        detail:
          "Melayani penjualan sekaligus merawat konsol dan media game — tempat hobi gaming pertama kali membayar dirinya sendiri.",
      },
      {
        role: "Sales — Toko Komputer",
        detail:
          "Menjual PC dan aksesori sambil membedah spesifikasi untuk pelanggan awam — melatih kemampuan menjelaskan teknologi dengan bahasa sederhana.",
      },
    ],
    tags: ["Hardware", "Troubleshooting", "Retail IT"],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/triastantobimo-ux", icon: "github" },
  { label: "Email", href: `mailto:triastanto.bimo@gmail.com`, icon: "mail" },
] as const;
