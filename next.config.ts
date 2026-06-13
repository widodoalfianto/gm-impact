import type { NextConfig } from "next";

// The Sanity image host is allowlisted per project id. This must be set in
// every deployment environment (see .env.example); when it is unset the
// allowlist is empty and next/image will not load cdn.sanity.io images.
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

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
