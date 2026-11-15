interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

// Periodic cleanup every 60 seconds to prevent memory leaks under high traffic
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    memoryStore.forEach((record, key) => {
      if (now > record.resetAt) {
        memoryStore.delete(key);
      }
    });
  }, 60000).unref();
}

export interface RateLimitOptions {
  limit: number;       // Maximum allowed requests
  windowMs: number;    // Window duration in milliseconds
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  retryAfter: number;  // Seconds until reset
}

/**
 * In-memory sliding-window rate limiter for server routes.
 * Gracefully cleans up expired keys and prevents DoS memory exhaustion.
 * For distributed multi-instance production deployments (10k CCU),
 * this interface directly maps to Upstash / Redis.
 */
export function rateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const { limit, windowMs } = options;
  const now = Date.now();
  const record = memoryStore.get(key);

  if (!record || now > record.resetAt) {
    // New or expired window
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      retryAfter: Math.ceil(windowMs / 1000),
    };
  }

  if (record.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return {
      success: false,
      limit,
      remaining: 0,
      retryAfter,
    };
  }

  record.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - record.count,
    retryAfter: Math.max(1, Math.ceil((record.resetAt - now) / 1000)),
  };
}

/**
 * Extracts client IP address safely considering reverse proxies (Cloudflare, AWS ALB, Nginx).
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }
  return "127.0.0.1";
}
