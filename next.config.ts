import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

const withMDX = createMDX({
  options: {
    // Plugin names as strings so the config also works under Turbopack (next dev).
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
