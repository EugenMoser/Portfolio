import { setInterval } from "node:timers";

// In-memory limits for the contact endpoint. The site runs as a single
// container on the VPS, so process-local state is enough. Counters reset on
// restart; that is accepted.

export const WINDOW_MS = 10 * 60 * 1000;
export const MAX_PER_WINDOW = 5;
// Caps what the contact form can send through the SMTP mailbox per day, so
// abuse cannot turn the account into a spam source or get it blocked.
export const DAILY_SEND_CAP = 50;

const SWEEP_THRESHOLD = 1000;
const SWEEP_INTERVAL_MS = 60 * 1000;

export type RateLimitResult = { ok: true } | { ok: false; retryAfterSec: number };

const hits = new Map<string, number[]>();
let sendDay = "";
let sendsToday = 0;

// Drop expired keys even when no further requests arrive, so a client IP is
// held for at most WINDOW_MS + SWEEP_INTERVAL_MS (11 minutes). unref() keeps
// the timer from holding `next build` or a shutting-down server open.
setInterval(() => sweep(Date.now()), SWEEP_INTERVAL_MS).unref();

export function rateLimit(key: string, now: number = Date.now()): RateLimitResult {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  const oldest = recent[0];
  if (recent.length >= MAX_PER_WINDOW && oldest !== undefined) {
    // A blocked request is not recorded, so it cannot extend its own lockout.
    hits.set(key, recent);
    return { ok: false, retryAfterSec: Math.ceil((oldest + WINDOW_MS - now) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > SWEEP_THRESHOLD) sweep(now);
  return { ok: true };
}

export function reserveDailySend(now: number = Date.now()): boolean {
  const day = new Date(now).toISOString().slice(0, 10);
  if (day !== sendDay) {
    sendDay = day;
    sendsToday = 0;
  }
  if (sendsToday >= DAILY_SEND_CAP) return false;
  sendsToday += 1;
  return true;
}

export function resetRateLimits(): void {
  hits.clear();
  sendDay = "";
  sendsToday = 0;
}

function sweep(now: number): void {
  for (const [key, stamps] of hits) {
    if (stamps.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
}
