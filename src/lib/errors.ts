/**
 * Central error representation for server code — a small, deliberately
 * trimmed error module. Extend this file rather than starting a second error
 * hierarchy alongside it.
 */

/** Closed set of error codes. Const object instead of `enum`: no runtime enum
 *  object, works with `isolatedModules`, and the values stay readable in logs. */
export const ErrorCode = {
  /** Missing or invalid runtime configuration (env vars). */
  Config: "config",
  /** The mail server refused or could not be reached. */
  MailSend: "mail_send",
  Unknown: "unknown",
} as const;

export type ErrorCode = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * How loud this failure is. Drives which `console` method the catch site
 * calls: info -> console.info, warn -> console.warn, error -> console.error.
 */
export const Severity = {
  /** Expected, no action needed. */
  Info: "info",
  /** Expected but worth noticing: degraded fallback, recovered automatically. */
  Warn: "warn",
  /** Unexpected: broken invariant, bug, misconfiguration. */
  Error: "error",
} as const;

export type Severity = (typeof Severity)[keyof typeof Severity];

/** Marker that survives module duplication and bundle boundaries, where
 *  `instanceof` silently stops working. */
const APP_ERROR_BRAND = Symbol.for("app.error");

export interface AppErrorOptions {
  code?: ErrorCode;
  /** The original thrown value. Kept for logs; never shown to users. */
  cause?: unknown;
  /** Structured context for the log line: no secrets, no PII. */
  details?: Readonly<Record<string, unknown>>;
  severity?: Severity;
  retryable?: boolean;
}

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly details: Readonly<Record<string, unknown>> | undefined;
  readonly severity: Severity;
  readonly retryable: boolean;

  readonly [APP_ERROR_BRAND] = true as const;

  constructor(message: string, options: AppErrorOptions = {}) {
    super(message, options.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = "AppError";
    this.code = options.code ?? ErrorCode.Unknown;
    this.details = options.details;
    this.severity = options.severity ?? Severity.Error;
    this.retryable = options.retryable ?? false;
  }
}

/** Type guard for `catch (error: unknown)`. Checks the brand as well as
 *  `instanceof`, so it still holds when two copies of this module end up in
 *  one process. */
export function isAppError(value: unknown): value is AppError {
  if (value instanceof AppError) return true;
  return typeof value === "object" && value !== null && APP_ERROR_BRAND in value;
}

/** `AbortController.abort()` produces a `DOMException`, not an `Error` subclass. */
function isAbortError(value: unknown): boolean {
  return value instanceof DOMException && value.name === "AbortError";
}

/**
 * Normalise anything a `catch` can hand you into an `AppError`.
 *
 * `catch` is typed `unknown` because JS allows throwing strings, numbers,
 * `null`, or rejected non-Error values. Funnel everything through here so the
 * rest of the code only ever deals with one shape.
 */
export function toAppError(value: unknown, fallbackMessage = "Unexpected error"): AppError {
  if (isAppError(value)) return value;

  if (isAbortError(value)) {
    return new AppError("Request aborted", {
      code: ErrorCode.Unknown,
      severity: Severity.Info,
      cause: value,
    });
  }

  if (value instanceof Error) {
    return new AppError(value.message || fallbackMessage, { cause: value });
  }

  if (typeof value === "string" && value !== "") {
    return new AppError(value, { cause: value });
  }

  return new AppError(fallbackMessage, { cause: value, details: { thrown: typeof value } });
}

/**
 * Flatten an error into a plain object for a `console.*` call. Pure — it does
 * not log anything itself; the catch site picks the console method based on
 * `severity`.
 */
export function toLogPayload(error: AppError): Record<string, unknown> {
  return {
    name: error.name,
    code: error.code,
    message: error.message,
    ...(error.details !== undefined ? { details: error.details } : {}),
    ...(error.retryable ? { retryable: true } : {}),
    ...(error.cause !== undefined ? { cause: error.cause } : {}),
  };
}
