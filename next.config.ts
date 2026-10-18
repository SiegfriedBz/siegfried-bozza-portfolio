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
  async headers() {
    // Baseline hardening. No CSP yet: Mermaid and motion inject inline styles, so a
    // useful policy needs nonces (see the SEO audit notes).
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
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
