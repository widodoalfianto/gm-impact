import { NEWSLETTERS, type FlagName, type NewsletterSummary } from "./data";
import {
  getNewsletterSummaries,
  getPostSummaries,
} from "../../sanity/lib/fetch-newsletter";
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
  const cmsPosts = await getPostSummaries();
  const postItems: NewsletterSummary[] = cmsPosts.map((post) => {
    const year = post.publishDate.slice(0, 4);

    return {
      year,
      label: `${year} Field Update`,
      href: `/posts/${post.slug}`,
      title: post.landingTitle || post.title,
      snippet: post.landingSummary,
      chips: post.landingHighlights ?? [],
      countries:
        post.country && isSupportedFlag(post.country.name)
          ? [post.country.name]
          : [],
      image: post.heroImage
        ? {
            src: urlFor(post.heroImage)
              .width(1200)
              .height(800)
              .fit("crop")
              .url(),
            alt: post.heroImage.alt || post.landingTitle,
          }
        : undefined,
    };
  });

  const cmsHrefs = new Set(
    [...cmsItems, ...postItems].map((item) => item.href),
  );
  const legacyItems = NEWSLETTERS.filter(
    (newsletter) => !cmsHrefs.has(newsletter.href),
  );

  return [...cmsItems, ...postItems, ...legacyItems].sort(
    (left, right) => Number(right.year) - Number(left.year),
  );
}
