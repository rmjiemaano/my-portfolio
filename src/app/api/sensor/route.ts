import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("x-api-key");
  if (authHeader !== process.env.SENSOR_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { temperature, humidity } = body;

  if (temperature === undefined || humidity === undefined) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await redis.set(
    "sensor:room",
    JSON.stringify({
      temperature,
      humidity,
      updatedAt: Date.now(),
    }),
    { ex: 300 } // expires after 5 minutes — if ESP32 goes down, data dies
  );

  return NextResponse.json({ success: true });
}

export async function GET() {
  const data = await redis.get("sensor:room");

  if (!data) {
    return NextResponse.json({ online: false });
  }

  const parsed = typeof data === "string" ? JSON.parse(data) : data;
  const isOnline = Date.now() - parsed.updatedAt < 90000; // 90 seconds threshold

  return NextResponse.json({
    online: isOnline,
    temperature: parsed.temperature,
    humidity: parsed.humidity,
    updatedAt: parsed.updatedAt,
  });
}