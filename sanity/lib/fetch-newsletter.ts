import { isSanityConfigured } from "../env";
import { sanityFetch } from "./live";
import {
  NEWSLETTER_BY_SLUG_QUERY,
  NEWSLETTER_INDEX_QUERY,
  POST_BY_SLUG_QUERY,
  POST_INDEX_QUERY,
  SITE_SETTINGS_QUERY,
} from "./queries";
import type {
  CmsNewsletter,
  CmsNewsletterSummary,
  CmsPost,
  CmsPostSummary,
  CmsSiteSettings,
} from "./types";

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

export async function getPostBySlug(
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
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    perspective: options?.perspective,
    stega: options?.stega,
    tags: [`post:${slug}`],
  });

  return data as CmsPost | null;
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

export async function getPostSummaries() {
  if (!isSanityConfigured) {
    return [];
  }

  const { data } = await sanityFetch({
    query: POST_INDEX_QUERY,
    perspective: "published",
    stega: false,
    tags: ["posts"],
  });

  return data as CmsPostSummary[];
}
