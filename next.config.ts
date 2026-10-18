import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't let `next dev` write an AGENTS.md into this public repo.
  agentRules: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
