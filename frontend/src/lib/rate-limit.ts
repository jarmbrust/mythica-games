type RateLimitBucket = {
  count: number;
  resetAt: number;
};

/**
 * In-memory fixed-window rate limiter.
 *
 * Buckets live in module scope, so on Vercel they are per-serverless-instance
 * and reset on cold starts. This is best-effort burst protection, not a hard
 * guarantee — sustained or distributed abuse needs a shared store (see
 * docs/decision-log.md §11).
 */
const buckets = new Map<string, RateLimitBucket>();

const MAX_BUCKETS = 10_000;

function prune(now: number): void {
  if (buckets.size < MAX_BUCKETS) {
    return;
  }

  for (const [key, bucket] of buckets) {
    if (now >= bucket.resetAt) {
      buckets.delete(key);
    }
  }

  // If every bucket is still active (attack-scale traffic), evict the oldest
  // one so the map cannot grow without bound.
  if (buckets.size >= MAX_BUCKETS) {
    const oldestKey = buckets.keys().next().value;
    if (oldestKey !== undefined) {
      buckets.delete(oldestKey);
    }
  }
}

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    prune(now);
    return true;
  }

  if (bucket.count >= limit) {
    return false;
  }

  bucket.count += 1;
  return true;
}

/**
 * Clears all buckets. Exists for tests: the module-scoped map persists between
 * test cases in a single process, so each test calls this in `beforeEach`.
 */
export function resetRateLimits(): void {
  buckets.clear();
}
