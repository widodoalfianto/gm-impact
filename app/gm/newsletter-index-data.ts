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

// Derives a YouTube thumbnail URL from a video/embed URL, for use as the card
// image when no hero image is uploaded. hqdefault is always available.
function youtubeThumbnail(url?: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : undefined;
}

export async function getNewsletterLandingItems(): Promise<
  NewsletterSummary[]
> {
  const cmsNewsletters = await getNewsletterSummaries();
  const cmsItems: NewsletterSummary[] = cmsNewsletters.map((newsletter) => {
    const year = newsletter.publishDate.slice(0, 4);

    return {
      year,
      date: newsletter.publishDate,
      label: newsletter.listName || year,
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
      // Uploaded hero image wins; otherwise fall back to the video thumbnail.
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
        : youtubeThumbnail(newsletter.videoUrl)
          ? {
              src: youtubeThumbnail(newsletter.videoUrl) as string,
              alt: newsletter.landingTitle || newsletter.title,
            }
          : undefined,
    };
  });
  // Only show CMS-managed newsletters, not the legacy hardcoded entries.
  const sortKey = (item: NewsletterSummary) => item.date ?? `${item.year}-01-01`;

  return [...cmsItems].sort((left, right) =>
    sortKey(right).localeCompare(sortKey(left)),
  );
}
