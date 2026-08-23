import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Serves the Swagger UI reference at a clean /api-docs path.
    return [{ source: "/api-docs", destination: "/api-docs.html" }];
  },
};

export default nextConfig;
