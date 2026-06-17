import { isSanityConfigured } from "../env";
import { sanityFetch } from "./live";
import {
  HOME_QUERY,
  NEWSLETTER_BY_SLUG_QUERY,
  NEWSLETTER_INDEX_QUERY,
  PAGE_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import type {
  CmsHome,
  CmsNewsletter,
  CmsNewsletterSummary,
  CmsPage,
  CmsSiteSettings,
} from "./types";

export async function getHome() {
  if (!isSanityConfigured) {
    return null;
  }

  const { data } = await sanityFetch({
    query: HOME_QUERY,
    perspective: "published",
    stega: false,
    tags: ["homePage"],
  });

  return data as CmsHome | null;
}

export async function getPageBySlug(
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
    query: PAGE_BY_SLUG_QUERY,
    params: { slug },
    perspective: options?.perspective,
    stega: options?.stega,
    tags: [`page:${slug}`],
  });

  return data as CmsPage | null;
}

export async function getSiteSettings() {
  if (!isSanityConfigured) {
    return null;
  }

  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
    perspective: "published",
    stega: false,
    tags: ["siteSettings"],
  });

  return data as CmsSiteSettings | null;
}

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
