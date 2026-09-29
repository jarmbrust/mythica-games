import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { checkRateLimit, resetRateLimits } from './rate-limit';

const LIMIT = 3;
const WINDOW_MS = 60_000;
const opts = { limit: LIMIT, windowMs: WINDOW_MS };

function exhaust(key: string): void {
  for (let i = 0; i < LIMIT; i += 1) {
    checkRateLimit(key, opts);
  }
}

describe('checkRateLimit', () => {
  beforeEach(() => {
    resetRateLimits();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('allows requests up to the limit', () => {
    expect(checkRateLimit('client-a', opts)).toBe(true);
    expect(checkRateLimit('client-a', opts)).toBe(true);
    expect(checkRateLimit('client-a', opts)).toBe(true);
  });

  it('blocks requests beyond the limit', () => {
    exhaust('client-a');
    expect(checkRateLimit('client-a', opts)).toBe(false);
  });

  it('allows the key again after the window elapses', () => {
    exhaust('client-a');
    vi.advanceTimersByTime(WINDOW_MS);
    expect(checkRateLimit('client-a', opts)).toBe(true);
  });

  it('does not unblock early', () => {
    exhaust('client-a');
    vi.advanceTimersByTime(WINDOW_MS - 1);
    expect(checkRateLimit('client-a', opts)).toBe(false);
  });

  it('keeps keys independent', () => {
    exhaust('client-a');
    expect(checkRateLimit('client-b', opts)).toBe(true);
  });

  it('starts a fresh counter after the window, not just lifting the block', () => {
    checkRateLimit('client-a', opts);
    checkRateLimit('client-a', opts);
    vi.advanceTimersByTime(WINDOW_MS);

    expect(checkRateLimit('client-a', opts)).toBe(true);
    expect(checkRateLimit('client-a', opts)).toBe(true);
    expect(checkRateLimit('client-a', opts)).toBe(true);
    expect(checkRateLimit('client-a', opts)).toBe(false);
  });
});
