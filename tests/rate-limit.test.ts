import { beforeEach, describe, expect, test } from "bun:test";
import {
  checkRateLimit,
  getClientIp,
  resetRateLimitsForTest,
} from "../src/lib/rate-limit";

describe("rate limit", () => {
  beforeEach(() => resetRateLimitsForTest());

  test("allows until the limit then blocks with Retry-After", () => {
    const rule = { limit: 2, windowMs: 1_000 };

    expect(checkRateLimit("guestbook:1", rule, 10_000).allowed).toBe(true);
    expect(checkRateLimit("guestbook:1", rule, 10_100).allowed).toBe(true);

    const blocked = checkRateLimit("guestbook:1", rule, 10_200);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfter).toBe(1);
  });

  test("resets after the window expires", () => {
    const rule = { limit: 1, windowMs: 1_000 };

    expect(checkRateLimit("guestbook:2", rule, 20_000).allowed).toBe(true);
    expect(checkRateLimit("guestbook:2", rule, 20_500).allowed).toBe(false);
    expect(checkRateLimit("guestbook:2", rule, 21_001).allowed).toBe(true);
  });

  test("extracts a proxy-provided client IP", () => {
    const forwarded = new Request("https://example.test", {
      headers: { "x-forwarded-for": "203.0.113.10, 10.0.0.1" },
    });
    const realIp = new Request("https://example.test", {
      headers: { "x-real-ip": "198.51.100.8" },
    });

    expect(getClientIp(forwarded)).toBe("203.0.113.10");
    expect(getClientIp(realIp)).toBe("198.51.100.8");
    expect(getClientIp(new Request("https://example.test"))).toBeNull();
  });
});
