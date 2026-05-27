import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Section 2.1: Initialize the Upstash Redis client utilizing standard environment variables
const redisClient = Redis.fromEnv();

// Section 2.2: Configure a sliding window rate limiter tracking 3 requests per 24 hours
const ratelimiter = new Ratelimit({
  redis: redisClient,
  limiter: Ratelimit.slidingWindow(2, "24 h"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export async function POST(request: Request) {
  try {
    // Section 2.3: Extract the client's public IP address reliably behind production proxies
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // Section 2.4: Execute secure check against Upstash Redis tracking
    const { success, limit, reset, remaining } = await ratelimiter.limit(ip);

    // Section 2.5: Block transaction immediately if rate limit is exceeded
    if (!success) {
      return NextResponse.json(
        { success: false, isAllowed: false, error: "RATE_LIMIT_EXCEEDED" },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          }
        }
      );
    }

    // Section 2.6: Access Granted. Return token approval to the client browser side
    return NextResponse.json({ 
      success: true, 
      isAllowed: true 
    });

  } catch (error) {
    console.error("Gatekeeper Protection Error:", error);
    return NextResponse.json(
      { success: false, isAllowed: false, error: "INTERNAL_SERVER_ERROR" },
      { status: 500 }
    );
  }
}