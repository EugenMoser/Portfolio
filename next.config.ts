import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// 'unsafe-inline' for scripts is a deliberate trade-off for a statically
// rendered site: the RSC payload is inline. A nonce-based CSP would need
// proxy.ts and force dynamic rendering for every page. 'unsafe-eval' and ws:
// are only needed by the dev server (HMR). frame-ancestors is 'self' (not
// 'none') because CertificateWindow embeds our own PDFs in an iframe.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

// WebKit and Firefox may apply a PDF response's own CSP to their built-in
// viewer (not verified, only Chromium tested), so the page CSP above could
// render the certificates blank. The PDFs only get frame-ancestors, matching
// X-Frame-Options.
const pdfCsp = "frame-ancestors 'self'";

const baseHeaders = [
  // One year, no preload. includeSubDomains covers this host and its own
  // subdomains (e.g. www.portfolio…), not the apex or its other subdomains.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // SAMEORIGIN instead of DENY: the certificate PDFs are framed by the site itself.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode to help identify potential problems in the application

  productionBrowserSourceMaps: true, // Enable source maps in production to help with debugging

  // Self-contained server bundle for the Docker image (see Dockerfile).
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Security-Policy", value: csp }, ...baseHeaders],
      },
      // A later rule overrides the same header key, so the PDFs keep the base
      // headers from the rule above and get only frame-ancestors as CSP.
      {
        source: "/certificates/:file(.*\\.pdf)",
        headers: [{ key: "Content-Security-Policy", value: pdfCsp }],
      },
    ];
  },
};

export default nextConfig;
