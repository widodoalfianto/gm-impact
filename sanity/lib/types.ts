import type { PortableTextBlock } from "@portabletext/types";
import type {
  CountryArtKey,
  ImpactArtKey,
} from "../../lib/gm-visual-library";

export type CmsImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  crop?: Record<string, number>;
  hotspot?: Record<string, number>;
};

export type CmsMetric = {
  _key: string;
  value: string;
  label: string;
  art?: ImpactArtKey;
};

type SectionBase = {
  _key: string;
};

export type CmsCountryImpact = {
  _key: string;
  country: {
    _id: string;
    name: string;
    isoCode: string;
    visualKey?: CountryArtKey;
  };
  subtitle: string;
  metrics?: CmsMetric[];
  highlights?: string[];
  mediaLabel?: string;
  mediaUrl?: string;
};

export type CmsPartnerCard = {
  _key: string;
  heading: string;
  description: string;
  buttonLabel: string;
  buttonUrl: string;
};

export type CmsNewsletterSection =
  | (SectionBase & {
      _type: "impactGrid";
      heading: string;
      intro?: string;
      metrics?: CmsMetric[];
    })
  | (SectionBase & {
      _type: "storySection";
      eyebrow?: string;
      heading: string;
      body?: PortableTextBlock[];
      image?: CmsImage;
      metrics?: CmsMetric[];
    })
  | (SectionBase & {
      _type: "quoteSection";
      quote: string;
      attribution: string;
      context?: string;
    })
  | (SectionBase & {
      _type: "gallerySection";
      heading: string;
      images?: Array<CmsImage & { _key: string }>;
    })
  | (SectionBase & {
      _type: "videoSection";
      heading: string;
      url: string;
      description?: string;
    })
  | (SectionBase & {
      _type: "prayerSection";
      heading: string;
      items?: string[];
    })
  | (SectionBase & {
      _type: "callToActionSection";
      heading: string;
      description: string;
      buttonLabel: string;
      buttonUrl: string;
    })
  | (SectionBase & {
      _type: "countryGridSection";
      eyebrow: string;
      heading: string;
      accentHeading?: string;
      regions?: CmsCountryImpact[];
    })
  | (SectionBase & {
      _type: "partnerGridSection";
      eyebrow: string;
      heading: string;
      intro: string;
      cards?: CmsPartnerCard[];
    });

export type CmsNewsletter = {
  _id: string;
  title: string;
  newsletterType: string;
  publishDate: string;
  eyebrow: string;
  heroHeading: string;
  heroAccent?: string;
  summary: string;
  heroImage?: CmsImage;
  heroActions?: Array<{
    _key: string;
    label: string;
    url: string;
    style: "primary" | "secondary";
  }>;
  countries?: Array<{
    _id: string;
    name: string;
    isoCode: string;
  }>;
  landingHighlights?: string[];
  sections?: CmsNewsletterSection[];
};

export type CmsNewsletterSummary = {
  _id: string;
  title: string;
  slug: string;
  publishDate: string;
  landingTitle: string;
  landingSummary: string;
  landingHighlights?: string[];
  heroImage?: CmsImage;
  countries?: Array<{
    name: string;
    isoCode: string;
  }>;
};
