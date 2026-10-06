export type RateLimitRule = {
  limit: number;
  windowMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

type RateLimitStore = {
  buckets: Map<string, Bucket>;
  operationCount: number;
};

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfter: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __portfolioRateLimitStore?: RateLimitStore;
};

const store =
  globalForRateLimit.__portfolioRateLimitStore ??
  ({ buckets: new Map<string, Bucket>(), operationCount: 0 } satisfies RateLimitStore);

globalForRateLimit.__portfolioRateLimitStore = store;

function cleanupExpired(now: number) {
  store.operationCount += 1;
  if (store.operationCount % 100 !== 0) return;

  for (const [key, bucket] of store.buckets) {
    if (bucket.resetAt <= now) store.buckets.delete(key);
  }
}

export function checkRateLimit(
  key: string,
  rule: RateLimitRule,
  now = Date.now()
): RateLimitResult {
  if (!key || rule.limit < 1 || rule.windowMs < 1) {
    throw new Error("Invalid rate-limit configuration");
  }

  cleanupExpired(now);

  const current = store.buckets.get(key);
  if (!current || current.resetAt <= now) {
    store.buckets.set(key, { count: 1, resetAt: now + rule.windowMs });
    return {
      allowed: true,
      remaining: Math.max(0, rule.limit - 1),
      retryAfter: 0,
    };
  }

  if (current.count >= rule.limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: Math.max(0, rule.limit - current.count),
    retryAfter: 0,
  };
}

export function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const cloudflareIp = req.headers.get("cf-connecting-ip")?.trim();
  return cloudflareIp || null;
}

// Exported only so the focused unit test can isolate buckets deterministically.
export function resetRateLimitsForTest() {
  store.buckets.clear();
  store.operationCount = 0;
}
