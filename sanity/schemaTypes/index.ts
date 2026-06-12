import { accentTitleType } from "./accentTitleType";
import {
  embedBlockType,
  faqBlockType,
  heroBlockType,
  imageTextBlockType,
  logoStripBlockType,
  richTextBlockType,
  statsBannerBlockType,
} from "./blockTypes";
import { countryType } from "./countryType";
import { homeType } from "./homeType";
import { imageWithAltType } from "./imageWithAltType";
import { metricType } from "./metricType";
import { newsletterType } from "./newsletterType";
import { pageType } from "./pageType";
import { postType } from "./postType";
import { appearanceFields } from "./sectionAppearance";
import { siteSettingsType } from "./siteSettingsType";
import {
  actionLinkType,
  callToActionCardType,
  callToActionSectionType,
  countryGridSectionType,
  countryImpactType,
  gallerySectionType,
  impactGridType,
  partnerGridSectionType,
  prayerSectionType,
  quoteSectionType,
  storySectionType,
  videoSectionType,
} from "./sectionTypes";

// Appends the shared optional appearance options (curved divider, etc.) to a
// block type, so every section gains them from one place.
function withAppearance<T extends { fields: unknown[] }>(type: T): T {
  return { ...type, fields: [...type.fields, ...appearanceFields] };
}

export const schemaTypes = [
  accentTitleType,
  siteSettingsType,
  homeType,
  pageType,
  countryType,
  newsletterType,
  postType,
  imageWithAltType,
  metricType,
  actionLinkType,
  countryImpactType,
  callToActionCardType,
  ...[
    impactGridType,
    storySectionType,
    quoteSectionType,
    gallerySectionType,
    videoSectionType,
    prayerSectionType,
    callToActionSectionType,
    countryGridSectionType,
    partnerGridSectionType,
    heroBlockType,
    richTextBlockType,
    imageTextBlockType,
    faqBlockType,
    logoStripBlockType,
    statsBannerBlockType,
    embedBlockType,
  ].map(withAppearance),
];
