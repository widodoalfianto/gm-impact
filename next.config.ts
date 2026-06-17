import type { NextConfig } from "next";

// The Sanity image host is allowlisted per project id. This must be set in
// every deployment environment (see .env.example); when it is unset the
// allowlist is empty and next/image will not load cdn.sanity.io images.
// Trim it so a stray space/newline in the deployment value doesn't produce a
// malformed pathname (which silently breaks card images).
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();

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
