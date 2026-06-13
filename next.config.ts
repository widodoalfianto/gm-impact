import type { NextConfig } from "next";

// Mirror the project-id fallback in sanity/env.ts so the Sanity image host is
// always allowlisted, even when NEXT_PUBLIC_SANITY_PROJECT_ID is unset in the
// deployment environment. Without this, next/image blocks every cdn.sanity.io
// image and hero photos fail to load.
const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ipt53rbp";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: sanityProjectId
      ? [
          {
            protocol: "https",
            hostname: "cdn.sanity.io",
            pathname: `/images/${sanityProjectId}/**`,
          },
        ]
      : [],
  },
};

export default nextConfig;
