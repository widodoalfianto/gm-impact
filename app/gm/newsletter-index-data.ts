import { NEWSLETTERS, type FlagName, type NewsletterSummary } from "./data";
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

export async function getNewsletterLandingItems(): Promise<
  NewsletterSummary[]
> {
  const cmsNewsletters = await getNewsletterSummaries();
  const cmsItems: NewsletterSummary[] = cmsNewsletters.map((newsletter) => {
    const year = newsletter.publishDate.slice(0, 4);

    return {
      year,
      label: `${year} Newsletter`,
      href: `/newsletters/${newsletter.slug}`,
      title: newsletter.landingTitle || newsletter.title,
      snippet: newsletter.landingSummary,
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
            alt: newsletter.heroImage.alt || newsletter.landingTitle,
          }
        : undefined,
    };
  });
  const cmsHrefs = new Set(cmsItems.map((newsletter) => newsletter.href));
  const legacyItems = NEWSLETTERS.filter(
    (newsletter) => !cmsHrefs.has(newsletter.href),
  );

  return [...cmsItems, ...legacyItems].sort(
    (left, right) => Number(right.year) - Number(left.year),
  );
}
