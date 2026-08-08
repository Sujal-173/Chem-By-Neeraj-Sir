import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/mongodb";
import { sendWaitingListNotification } from "@/lib/resend";

const waitingListSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,15}$/)
    .optional(),
  email: z.string().trim().email().max(200),
  studentClass: z.string().trim().max(20).optional(),
  city: z.string().trim().max(100).optional(),
  school: z.string().trim().max(150).optional(),
});

// Basic in-memory rate limiting per IP (per serverless instance).
// For multi-instance production rate limiting, back this with Redis/Upstash.
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

  const parsed = waitingListSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide a valid email address.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const db = await getDb();
    await db.collection("waiting_list").insertOne({
      ...parsed.data,
      createdAt: new Date(),
      source: "homepage_coming_soon",
    });
  } catch (err) {
    console.error("[waiting-list] Failed to store submission:", err);
    return NextResponse.json(
      { error: "Could not save your request right now. Please try again later." },
      { status: 500 }
    );
  }

  // Email notification failure should not fail the user-facing request —
  // the signup is already safely stored in MongoDB.
  try {
    await sendWaitingListNotification(parsed.data);
  } catch (err) {
    console.error("[waiting-list] Failed to send admin notification email:", err);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
