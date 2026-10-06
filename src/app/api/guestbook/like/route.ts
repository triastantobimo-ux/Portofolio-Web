import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const LIKE_LIMIT = { limit: 30, windowMs: 60 * 60 * 1_000 } as const;
const LIKE_ENTRY_LIMIT = { limit: 1, windowMs: 60 * 60 * 1_000 } as const;

function rateLimited(retryAfter: number) {
  return NextResponse.json(
    { error: "Terlalu banyak percobaan. Coba lagi beberapa saat lagi." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
        "Cache-Control": "no-store",
      },
    }
  );
}

// Tambah 1 like pada entri tertentu: POST { id: string }
export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Format permintaan tidak valid." },
        { status: 400 }
      );
    }

    const value = body && typeof body === "object" ? body as Record<string, unknown> : {};
    const id = typeof value.id === "string" ? value.id.trim() : "";

    if (!id || id.length > 64) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const ip = getClientIp(req);
    if (ip) {
      const general = checkRateLimit(`guestbook:like:${ip}`, LIKE_LIMIT);
      if (!general.allowed) return rateLimited(general.retryAfter);

      const perEntry = checkRateLimit(
        `guestbook:like:${ip}:${id}`,
        LIKE_ENTRY_LIMIT
      );
      if (!perEntry.allowed) return rateLimited(perEntry.retryAfter);
    }

    const entry = await db.guestbookEntry.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    return NextResponse.json(
      { likes: entry.likes },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("POST /api/guestbook/like error:", error);
    return NextResponse.json(
      { error: "Gagal menyukai pesan." },
      { status: 500 }
    );
  }
}
