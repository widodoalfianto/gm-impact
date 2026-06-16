import type { NextConfig } from "next";

// The Sanity image host is allowlisted per project id. This must be set in
// every deployment environment (see .env.example); when it is unset the
// allowlist is empty and next/image will not load cdn.sanity.io images.
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // YouTube thumbnails, used as the card image fallback for video updates.
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      ...(sanityProjectId
        ? [
            {
              protocol: "https" as const,
              hostname: "cdn.sanity.io",
              pathname: `/images/${sanityProjectId}/**`,
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
