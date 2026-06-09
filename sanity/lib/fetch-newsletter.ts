import { isSanityConfigured } from "../env";
import { sanityFetch } from "./live";
import {
  NEWSLETTER_BY_SLUG_QUERY,
  NEWSLETTER_INDEX_QUERY,
} from "./queries";
import type { CmsNewsletter, CmsNewsletterSummary } from "./types";

export async function getNewsletterBySlug(
  slug: string,
  options?: {
    perspective?: "published" | "drafts";
    stega?: boolean;
  },
) {
  if (!isSanityConfigured) {
    return null;
  }

  const { data } = await sanityFetch({
    query: NEWSLETTER_BY_SLUG_QUERY,
    params: { slug },
    perspective: options?.perspective,
    stega: options?.stega,
    tags: [`newsletter:${slug}`],
  });

  return data as CmsNewsletter | null;
}

export async function getNewsletterSummaries() {
  if (!isSanityConfigured) {
    return [];
  }

  const { data } = await sanityFetch({
    query: NEWSLETTER_INDEX_QUERY,
    perspective: "published",
    stega: false,
    tags: ["newsletters"],
  });

  return data as CmsNewsletterSummary[];
}
