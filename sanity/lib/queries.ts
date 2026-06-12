import { defineQuery } from "next-sanity";

/**
 * Shared projection for the block library. Every page-like document
 * (newsletter, post, and later generic pages) renders the same `sections[]`,
 * so they all dereference it the same way here.
 */
const SECTIONS_PROJECTION = `
  sections[]{
    ...,
    _type == "storySection" => {
      ...,
      image
    },
    _type == "gallerySection" => {
      ...,
      images[]
    },
    _type == "countryGridSection" => {
      ...,
      regions[]{
        ...,
        country->{
          _id,
          name,
          isoCode,
          visualKey
        }
      }
    }
  }
`;

export const HOME_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    eyebrow,
    heading,
    intro
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    givingUrl,
    footerBlurb,
    siteUrl,
    youtubeUrl,
    instagramUrl,
    seoDescription
  }
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    seoTitle,
    seoDescription,
    ${SECTIONS_PROJECTION}
  }
`);

export const NEWSLETTER_BY_SLUG_QUERY = defineQuery(`
  *[_type == "newsletter" && slug.current == $slug][0] {
    _id,
    title,
    newsletterType,
    publishDate,
    eyebrow,
    heroHeading,
    heroAccent,
    summary,
    heroImage,
    heroActions,
    "countries": countries[]->{
      _id,
      name,
      isoCode
    },
    landingHighlights,
    ${SECTIONS_PROJECTION}
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    publishDate,
    eyebrow,
    heroHeading,
    heroAccent,
    summary,
    heroImage,
    "country": country->{
      _id,
      name,
      isoCode
    },
    landingHighlights,
    ${SECTIONS_PROJECTION}
  }
`);

export const NEWSLETTER_INDEX_QUERY = defineQuery(`
  *[
    _type == "newsletter" &&
    defined(slug.current) &&
    hideFromIndex != true
  ]
    | order(featured desc, publishDate desc) {
      _id,
      title,
      listName,
      "slug": slug.current,
      publishDate,
      landingTitle,
      landingSummary,
      landingHighlights,
      heroImage,
      "countries": countries[]->{
        name,
        isoCode
      }
    }
`);

export const POST_INDEX_QUERY = defineQuery(`
  *[
    _type == "post" &&
    defined(slug.current) &&
    hideFromIndex != true
  ]
    | order(featured desc, publishDate desc) {
      _id,
      title,
      listName,
      "slug": slug.current,
      publishDate,
      landingTitle,
      landingSummary,
      landingHighlights,
      heroImage,
      "country": country->{
        name,
        isoCode
      }
    }
`);
