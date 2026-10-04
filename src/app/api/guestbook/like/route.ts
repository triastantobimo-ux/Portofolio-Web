import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Tambah 1 like pada entri tertentu: POST { id: string }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = typeof body?.id === "string" ? body.id : "";

    if (!id) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const entry = await db.guestbookEntry.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json({ likes: entry.likes });
  } catch (error) {
    console.error("POST /api/guestbook/like error:", error);
    return NextResponse.json(
      { error: "Gagal menyukai pesan." },
      { status: 500 }
    );
  }
}
