// Cheap checks for POST /api/contact that run before the body is parsed.

export const MAX_BODY_BYTES = 16_000;

const DEFAULT_SITE_URL = "https://portfolio.eugen-moser.com";
const MIN_FILL_MS = 3_000;
const MAX_FILL_MS = 24 * 60 * 60 * 1000;

// SITE_URL is compared with the browser's Origin header, which is scheme +
// host (+ port) without a path. Normalising guards against an empty value or a
// trailing slash in the deployment config, both of which would block every
// real visitor.
function toOrigin(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return new URL(value).origin;
  } catch {
    return undefined;
  }
}

export function allowedOrigins(): string[] {
  const origins = [toOrigin(process.env.SITE_URL) ?? new URL(DEFAULT_SITE_URL).origin];
  if (process.env.NODE_ENV !== "production") origins.push("http://localhost:3000");
  return origins;
}

export function isAllowedOrigin(
  origin: string | null,
  allowed: string[] = allowedOrigins(),
): boolean {
  return origin !== null && allowed.includes(origin);
}

export function isJsonContentType(value: string | null): boolean {
  return value?.toLowerCase().startsWith("application/json") ?? false;
}

// Behind Traefik/Coolify the proxy appends the real peer IP to the END of
// X-Forwarded-For; earlier entries are client-controlled. X-Real-IP is only a
// fallback because a proxy may pass a client-sent value through. Both headers
// are spoofable if the Node port is reachable without the proxy, so the
// container port must not be published.
export function getClientIp(headers: Headers): string {
  const lastHop = headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  if (lastHop) return lastHop;
  const realIp = headers.get("x-real-ip")?.trim();
  return realIp || "unknown";
}

export type SubmitTiming = "ok" | "too-fast" | "stale" | "bot";

// elapsedMs is measured on the client (submit time minus mount time), so a
// wrong client clock cancels out. It is forgeable; it only filters simple bots.
export function checkSubmitTiming(elapsedMs: unknown): SubmitTiming {
  if (typeof elapsedMs !== "number" || !Number.isFinite(elapsedMs) || elapsedMs < 0) {
    return "bot";
  }
  if (elapsedMs < MIN_FILL_MS) return "too-fast";
  if (elapsedMs > MAX_FILL_MS) return "stale";
  return "ok";
}
