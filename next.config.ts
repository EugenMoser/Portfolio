import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode to help identify potential problems in the application

  productionBrowserSourceMaps: true, // Enable source maps in production to help with debugging

  // Self-contained server bundle for the Docker image (see Dockerfile).
  output: "standalone",
  poweredByHeader: false,
};

export default nextConfig;
