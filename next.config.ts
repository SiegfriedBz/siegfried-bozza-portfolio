import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't let `next dev` write an AGENTS.md into this public repo.
  agentRules: false,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    // Old preview hostnames → canonical domain (avoids duplicate indexing).
    return [
      {
        source: "/:path*",
        has: [
          { type: "host", value: "siegfried-bozza-portfolio-next.vercel.app" },
        ],
        destination: "https://www.siegfriedbozza.com/:path*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings so the config also works under Turbopack (next dev).
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
