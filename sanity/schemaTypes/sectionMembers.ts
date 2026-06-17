import { defineArrayMember } from "sanity";

/**
 * The shared block library. Reused by every page-like document
 * (newsletter, post, and — in a later phase — generic pages) so the
 * editor experience and rendering stay consistent across content types.
 */
export const sharedSectionMembers = [
  defineArrayMember({ type: "heroBlock" }),
  defineArrayMember({ type: "richTextBlock" }),
  defineArrayMember({ type: "imageTextBlock" }),
  defineArrayMember({ type: "impactGrid" }),
  defineArrayMember({ type: "statsBannerBlock" }),
  defineArrayMember({ type: "storySection" }),
  defineArrayMember({ type: "quoteSection" }),
  defineArrayMember({ type: "gallerySection" }),
  defineArrayMember({ type: "videoSection" }),
  defineArrayMember({ type: "embedBlock" }),
  defineArrayMember({ type: "faqBlock" }),
  defineArrayMember({ type: "prayerSection" }),
  defineArrayMember({ type: "callToActionSection" }),
  defineArrayMember({ type: "logoStripBlock" }),
  defineArrayMember({ type: "countryGridSection" }),
  defineArrayMember({ type: "partnerGridSection" }),
];
