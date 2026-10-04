import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Ambil semua entri buku tamu (terbaru dulu, maksimal 50)
export async function GET() {
  try {
    const entries = await db.guestbookEntry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ entries });
  } catch (error) {
    console.error("GET /api/guestbook error:", error);
    return NextResponse.json(
      { error: "Gagal memuat buku tamu." },
      { status: 500 }
    );
  }
}

// Tambah entri buku tamu baru
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const role = typeof body?.role === "string" ? body.role.trim() : "";

    if (name.length < 2 || name.length > 60) {
      return NextResponse.json(
        { error: "Nama harus 2–60 karakter." },
        { status: 400 }
      );
    }
    if (message.length < 4 || message.length > 280) {
      return NextResponse.json(
        { error: "Pesan harus 4–280 karakter." },
        { status: 400 }
      );
    }

    const entry = await db.guestbookEntry.create({
      data: { name, message, role: role || null },
    });

    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    console.error("POST /api/guestbook error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim pesan. Coba lagi ya." },
      { status: 500 }
    );
  }
}
