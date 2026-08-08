import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getEnv } from "@/lib/env";
import { getDb } from "@/lib/mongodb";
import { sendContactNotification } from "@/lib/resend";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/),
  email: z.string().trim().email().max(200),
  studentClass: z.string().trim().min(1).max(30),
  message: z.string().trim().min(1).max(2000),
});

const requestLog = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > MAX_REQUESTS;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in all fields correctly.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const env = getEnv();
  let stored = false;
  let persistenceError: string | null = null;

  if (env.MONGODB_URI) {
    try {
      const db = await getDb();
      await db.collection("contact_messages").insertOne({
        ...parsed.data,
        createdAt: new Date(),
        status: "new",
      });
      stored = true;
    } catch (err) {
      persistenceError = err instanceof Error ? err.message : "Unknown database error";
      console.error("[contact] Failed to store submission:", err);
    }
  } else {
    console.warn("[contact] MongoDB is not configured; skipping message storage.");
  }

  // No auto-reply is sent to the person, per spec — only an admin notification.
  if (env.RESEND_API_KEY && env.RESEND_FROM_EMAIL && env.ADMIN_NOTIFICATION_EMAIL) {
    try {
      await sendContactNotification(parsed.data);
    } catch (err) {
      console.error("[contact] Failed to send admin notification email:", err);
    }
  } else {
    console.warn("[contact] Resend is not configured; skipping notification email.");
  }

  if (!stored && persistenceError) {
    return NextResponse.json(
      {
        error:
          "Your message could not be saved right now because the database connection is unavailable. Please try again shortly or contact us directly on WhatsApp.",
        details: persistenceError,
      },
      { status: 503 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: stored
        ? "Message received."
        : "Message received. Notification delivery is pending until email/database services are configured.",
    },
    { status: 201 }
  );
}
