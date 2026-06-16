import type { FlagName, NewsletterSummary } from "./data";
import { getNewsletterSummaries } from "../../sanity/lib/fetch-newsletter";
import { urlFor } from "../../sanity/lib/image";

const supportedFlags: readonly FlagName[] = [
  "Nepal",
  "Algeria",
  "Indonesia",
  "Afghanistan",
  "Somalia",
  "Pakistan",
];

function isSupportedFlag(name: string): name is FlagName {
  return supportedFlags.includes(name as FlagName);
}

function youtubeId(url?: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match?.[1];
}

// Derives the best available YouTube thumbnail for use as the card image when
// no hero image is uploaded. Prefers the sharp maxres image, falling back to
// the always-available hqdefault when maxres doesn't exist (HEAD-checked and
// cached for a day).
async function youtubeThumbnail(url?: string): Promise<string | undefined> {
  const id = youtubeId(url);
  if (!id) return undefined;

  const maxres = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
  try {
    const res = await fetch(maxres, {
      method: "HEAD",
      next: { revalidate: 86400 },
    });
    if (res.ok) return maxres;
  } catch {
    // Network issue — fall back to the guaranteed thumbnail.
  }
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export async function getNewsletterLandingItems(): Promise<
  NewsletterSummary[]
> {
  const cmsNewsletters = await getNewsletterSummaries();
  const cmsItems: NewsletterSummary[] = await Promise.all(
    cmsNewsletters.map(async (newsletter) => {
      const year = newsletter.publishDate.slice(0, 4);
      // Uploaded hero image wins; otherwise fall back to the video thumbnail.
      const videoThumb = newsletter.heroImage
        ? undefined
        : await youtubeThumbnail(newsletter.videoUrl);

      return {
        year,
        date: newsletter.publishDate,
        label: year,
        href: `/newsletters/${newsletter.slug}`,
        // The card is connected to the article's own fields, with the optional
        // listing fields acting as overrides.
        title: newsletter.landingTitle || newsletter.title,
        snippet: newsletter.landingSummary || newsletter.summary || "",
        chips: newsletter.landingHighlights ?? [],
        countries:
          newsletter.countries
            ?.map((country) => country.name)
            .filter(isSupportedFlag) ?? [],
        image: newsletter.heroImage
          ? {
              src: urlFor(newsletter.heroImage)
                .width(1200)
                .height(800)
                .fit("crop")
                .url(),
              alt:
                newsletter.heroImage.alt ||
                newsletter.landingTitle ||
                newsletter.title,
            }
          : videoThumb
            ? {
                src: videoThumb,
                alt: newsletter.landingTitle || newsletter.title,
              }
            : undefined,
      };
    }),
  );
  // Only show CMS-managed newsletters, not the legacy hardcoded entries.
  const sortKey = (item: NewsletterSummary) => item.date ?? `${item.year}-01-01`;

  return [...cmsItems].sort((left, right) =>
    sortKey(right).localeCompare(sortKey(left)),
  );
}
