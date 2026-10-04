import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Ambil jumlah kunjungan
export async function GET() {
  try {
    const stats = await db.siteStats.upsert({
      where: { id: "main" },
      update: {},
      create: { id: "main", views: 0 },
    });
    return NextResponse.json({ views: stats.views });
  } catch (error) {
    console.error("GET /api/visits error:", error);
    return NextResponse.json({ views: null }, { status: 500 });
  }
}

// Tambah 1 kunjungan lalu kembalikan totalnya
export async function POST() {
  try {
    const stats = await db.siteStats.upsert({
      where: { id: "main" },
      update: { views: { increment: 1 } },
      create: { id: "main", views: 1 },
    });
    return NextResponse.json({ views: stats.views });
  } catch (error) {
    console.error("POST /api/visits error:", error);
    return NextResponse.json({ views: null }, { status: 500 });
  }
}
