import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

export default nextConfig;
