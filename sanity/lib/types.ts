import type { PortableTextBlock } from "@portabletext/types";
import type {
  CountryArtKey,
  ImpactArtKey,
} from "../../lib/gm-visual-library";

export type CmsSiteSettings = {
  givingUrl?: string;
  footerBlurb?: string;
  siteUrl?: string;
  youtubeUrl?: string;
  instagramUrl?: string;
  seoDescription?: string;
};

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
  background?: "default" | "accent";
  topDivider?: "none" | "soft" | "wave";
  bottomDivider?: "none" | "soft" | "wave";
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
  showArtwork?: boolean;
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

export type CmsActionLink = {
  _key?: string;
  label: string;
  url: string;
  style: "primary" | "secondary";
};

export type CmsBlock =
  | (SectionBase & {
      _type: "impactGrid";
      heading: string;
      intro?: string;
      metrics?: CmsMetric[];
    })
  | (SectionBase & {
      _type: "storySection";
      eyebrow?: string;
      heading?: PortableTextBlock[];
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
      heading?: PortableTextBlock[];
      images?: Array<CmsImage & { _key: string }>;
    })
  | (SectionBase & {
      _type: "videoSection";
      heading?: PortableTextBlock[];
      url: string;
      description?: string;
    })
  | (SectionBase & {
      _type: "prayerSection";
      heading?: PortableTextBlock[];
      items?: string[];
    })
  | (SectionBase & {
      _type: "callToActionSection";
      heading?: PortableTextBlock[];
      description: string;
      buttonLabel: string;
      buttonUrl: string;
    })
  | (SectionBase & {
      _type: "countryGridSection";
      eyebrow: string;
      heading?: PortableTextBlock[];
      accentHeading?: string;
      regions?: CmsCountryImpact[];
    })
  | (SectionBase & {
      _type: "partnerGridSection";
      eyebrow: string;
      heading?: PortableTextBlock[];
      intro: string;
      cards?: CmsPartnerCard[];
    })
  | (SectionBase & {
      _type: "heroBlock";
      eyebrow?: string;
      heading?: PortableTextBlock[];
      body?: string;
      image?: CmsImage;
      actions?: CmsActionLink[];
    })
  | (SectionBase & {
      _type: "richTextBlock";
      heading?: PortableTextBlock[];
      body?: PortableTextBlock[];
    })
  | (SectionBase & {
      _type: "imageTextBlock";
      eyebrow?: string;
      heading?: PortableTextBlock[];
      body?: PortableTextBlock[];
      image?: CmsImage;
      imagePosition: "left" | "right";
      action?: CmsActionLink;
    })
  | (SectionBase & {
      _type: "faqBlock";
      heading?: PortableTextBlock[];
      items?: Array<{ _key: string; question: string; answer: string }>;
    })
  | (SectionBase & {
      _type: "logoStripBlock";
      heading?: PortableTextBlock[];
      logos?: Array<{ _key: string; image: CmsImage; url?: string }>;
    })
  | (SectionBase & {
      _type: "statsBannerBlock";
      heading?: string;
      intro?: string;
      metrics?: CmsMetric[];
    })
  | (SectionBase & {
      _type: "embedBlock";
      heading?: PortableTextBlock[];
      url: string;
      description?: string;
    });

export type CmsNewsletter = {
  _id: string;
  title: string;
  newsletterType: string;
  publishDate: string;
  eyebrow: string;
  heroHeading?: PortableTextBlock[];
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
  sections?: CmsBlock[];
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

export type CmsPostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishDate: string;
  landingTitle: string;
  landingSummary: string;
  landingHighlights?: string[];
  heroImage?: CmsImage;
  country?: {
    name: string;
    isoCode: string;
  };
};

export type CmsPost = {
  _id: string;
  title: string;
  publishDate: string;
  eyebrow: string;
  heroHeading?: PortableTextBlock[];
  heroAccent?: string;
  summary: string;
  heroImage?: CmsImage;
  country?: {
    _id: string;
    name: string;
    isoCode: string;
  };
  landingHighlights?: string[];
  sections?: CmsBlock[];
};
