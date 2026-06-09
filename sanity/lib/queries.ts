import { defineQuery } from "next-sanity";

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
