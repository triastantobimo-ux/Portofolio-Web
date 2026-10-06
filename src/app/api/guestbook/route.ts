import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const MAX_BODY_BYTES = 2_048;
const POST_LIMIT = { limit: 3, windowMs: 15 * 60 * 1_000 } as const;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1_000;

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

// Ambil semua entri buku tamu (terbaru dulu, maksimal 50)
export async function GET() {
  try {
    const entries = await db.guestbookEntry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(
      { entries },
      { headers: { "Cache-Control": "no-store" } }
    );
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
    const contentLength = Number(req.headers.get("content-length") ?? "0");
    if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Payload terlalu besar." },
        { status: 413 }
      );
    }

    const ip = getClientIp(req);
    if (ip) {
      const limit = checkRateLimit(`guestbook:post:${ip}`, POST_LIMIT);
      if (!limit.allowed) return rateLimited(limit.retryAfter);
    }

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
    const name = typeof value.name === "string" ? value.name.trim() : "";
    const message = typeof value.message === "string" ? value.message.trim() : "";
    const role = typeof value.role === "string" ? value.role.trim() : "";

    if (name.length < 2 || name.length > 60) {
      return NextResponse.json(
        { error: "Nama harus 2–60 karakter." },
        { status: 400 }
      );
    }
    if (role.length > 40) {
      return NextResponse.json(
        { error: "Profesi maksimal 40 karakter." },
        { status: 400 }
      );
    }
    if (message.length < 4 || message.length > 280) {
      return NextResponse.json(
        { error: "Pesan harus 4–280 karakter." },
        { status: 400 }
      );
    }

    const duplicate = await db.guestbookEntry.findFirst({
      where: {
        name,
        message,
        createdAt: { gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
      },
      select: { id: true },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "Pesan yang sama baru saja dikirim." },
        { status: 409 }
      );
    }

    const entry = await db.guestbookEntry.create({
      data: { name, message, role: role || null },
    });

    return NextResponse.json(
      { entry },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("POST /api/guestbook error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim pesan. Coba lagi ya." },
      { status: 500 }
    );
  }
}
