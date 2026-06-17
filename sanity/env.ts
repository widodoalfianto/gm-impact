// The Next app provides config via NEXT_PUBLIC_* (inlined by Next). The
// standalone Studio (`sanity build`/`deploy`) only inlines SANITY_STUDIO_*, so
// fall back to those so the deployed Studio gets the right project/dataset.
// Values are trimmed so a stray space/newline from a dashboard doesn't break
// the build.
const rawProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
  process.env.SANITY_STUDIO_PROJECT_ID?.trim();

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() ||
  process.env.SANITY_STUDIO_API_VERSION?.trim() ||
  "2026-06-08";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
  process.env.SANITY_STUDIO_DATASET?.trim() ||
  "production";
// Falls back to a dummy id so the Sanity client can still be constructed when
// the project is not configured; isSanityConfigured (below) reflects whether a
// real project id was actually provided, and the app degrades gracefully when
// it was not.
export const projectId = rawProjectId || "placeholder";
export const previewOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.SANITY_STUDIO_SITE_URL?.trim() ||
  "http://localhost:3000";
export const isSanityConfigured = Boolean(rawProjectId);
