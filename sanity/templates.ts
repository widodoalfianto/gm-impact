import { GIVE_URL } from "../app/gm/data";

// Builds a portable-text value for accentTitle heading fields (no accents).
function pt(text: string) {
  return [
    {
      _type: "block",
      _key: "heading",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "heading-text", text, marks: [] }],
    },
  ];
}

// Portable-text body blocks: a bold sub-heading and a bullet list item.
function strongBlock(key: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-0`, text, marks: ["strong"] }],
  };
}

function bulletBlock(key: string, text: string) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-0`, text, marks: [] }],
  };
}

// Placeholder update body that mirrors the real Q2 report format: bold
// location/theme headings, each followed by a short bullet list.
const projectUpdateStoryBody = [
  strongBlock("intro", "Report highlights"),
  strongBlock("loc1", "Location or focus area"),
  bulletBlock("loc1-a", "Add a key result or highlight here"),
  bulletBlock("loc1-b", "Add another highlight"),
  strongBlock("loc2", "Another location or focus area"),
  bulletBlock("loc2-a", "Add a key result or highlight here"),
  bulletBlock("loc2-b", "Add another highlight"),
];

function placeholderCountryCard(key: string, countryRef: string) {
  return {
    _type: "countryImpact",
    _key: key,
    country: { _type: "reference", _ref: countryRef },
    subtitle: "Ministry focus",
    metrics: [
      { _key: `${key}-m1`, _type: "metric", value: "TBD", label: "Stat label" },
      { _key: `${key}-m2`, _type: "metric", value: "TBD", label: "Stat label" },
    ],
    highlights: ["Add a highlight here", "Add another highlight"],
  };
}

// Placeholder photos uploaded to the dataset via
// sanity/scripts/upload-gallery-placeholders.ts. Sanity assets are
// content-addressed, so these ids are stable as long as the asset documents
// exist in the dataset.
const galleryPlaceholderAssets = [
  "image-4dce71dd36d442dfd09c5ba38bbbc60c74ebe58f-980x651-avif",
  "image-be9b9d0a3e4ecd4d47875468c6a5fcddcc9489e2-980x651-avif",
  "image-bd9824e9d2a16eecd61c986cca218314688120db-980x651-avif",
];

const galleryPlaceholders = galleryPlaceholderAssets.map((ref, index) => ({
  _type: "imageWithAlt",
  _key: `gallery-${index + 1}`,
  asset: { _type: "reference", _ref: ref },
  alt: "Replace this placeholder photo with your own.",
}));

const sharedNewsletterDefaults = {
  featured: false,
  hideFromIndex: false,
  publishDate: new Date().toISOString().slice(0, 10),
};

const givingUrl = GIVE_URL;

const projectUpdateHero = {
  ...sharedNewsletterDefaults,
  newsletterType: "projectUpdate",
  title: "Project Update",
  eyebrow: "Project Update",
  heroHeading: pt("Project update"),
  summary: "Give a short summary here that details this mission's impacts",
};

export const newsletterTemplates = [
  {
    id: "newsletter-full",
    title: "Newsletter",
    description:
      "A full newsletter: impact stats, where we work, and partner with us.",
    schemaType: "newsletter",
    value: {
      ...sharedNewsletterDefaults,
      newsletterType: "globalImpact",
      title: "New Newsletter",
      slug: { _type: "slug", current: "new-newsletter" },
      eyebrow: "Global Impact",
      heroHeading: pt("Newsletter heading"),
      heroAccent: "Accent line",
      summary: "Give a short summary here that details this mission's impacts",
      sections: [
        {
          _type: "impactGrid",
          _key: "impact",
          heading: "Global Impact",
          metrics: [
            { _key: "i1", _type: "metric", value: "TBD", label: "Nations Reached", art: "nations" },
            { _key: "i2", _type: "metric", value: "TBD", label: "New Believers", art: "believers" },
            { _key: "i3", _type: "metric", value: "TBD", label: "Leaders Trained", art: "leaders" },
            { _key: "i4", _type: "metric", value: "TBD", label: "Bibles Given", art: "bibles" },
          ],
        },
        {
          _type: "countryGridSection",
          _key: "where-we-work",
          eyebrow: "Where We Work",
          heading: pt("Nations Reached."),
          accentHeading: "One Mission.",
          regions: [
            placeholderCountryCard("c1", "country-nepal"),
            placeholderCountryCard("c2", "country-algeria"),
            placeholderCountryCard("c3", "country-indonesia"),
          ],
        },
        {
          _type: "partnerGridSection",
          _key: "partner",
          eyebrow: "Partner With Us",
          heading: pt("Join the mission beyond the newsletter."),
          intro:
            "Help sustain prayer, sending, discipleship, care, and church planting among unreached communities.",
          cards: [
            {
              _key: "planters",
              _type: "callToActionCard",
              heading: "Planters Program",
              description:
                "Join a community of partners helping plant churches, care for pastors, and support long-term discipleship in unreached places.",
              buttonLabel: "Join the Planter Program",
              buttonUrl: givingUrl,
            },
            {
              _key: "giving",
              _type: "callToActionCard",
              heading: "Giving",
              description:
                "Your generosity reaches the unreached by funding Bibles, medical care, discipleship, and church planting across five nations.",
              buttonLabel: "Give to Global Missions",
              buttonUrl: givingUrl,
            },
          ],
        },
      ],
    },
  },
  {
    id: "project-update-video",
    title: "Project update - video",
    description: "A short project update led by an embedded video, with text.",
    schemaType: "newsletter",
    value: {
      ...projectUpdateHero,
      slug: { _type: "slug", current: "new-video-update" },
      sections: [
        {
          _type: "embedBlock",
          _key: "video",
          heading: pt("Project update title"),
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Add a short subtitle for this update",
        },
        {
          _type: "storySection",
          _key: "story",
          eyebrow: "Update",
          heading: pt("What's happening"),
          body: projectUpdateStoryBody,
        },
        {
          _type: "callToActionSection",
          _key: "cta",
          heading: pt("Partner with Global Missions"),
          description:
            "Help sustain prayer, sending, discipleship, care, and church planting among unreached communities.",
          buttonLabel: "Give to Global Missions",
          buttonUrl: givingUrl,
        },
      ],
    },
  },
  {
    id: "project-update-images",
    title: "Project update - images",
    description: "A short project update with a collection of images and text.",
    schemaType: "newsletter",
    value: {
      ...projectUpdateHero,
      slug: { _type: "slug", current: "new-image-update" },
      sections: [
        {
          _type: "storySection",
          _key: "story",
          eyebrow: "Update",
          heading: pt("What's happening"),
          body: pt("Replace this with a few sentences describing the project update."),
        },
        {
          _type: "gallerySection",
          _key: "gallery",
          heading: pt("Photo gallery"),
          images: galleryPlaceholders,
        },
      ],
    },
  },
];

export const pageTemplates = [
  {
    id: "standard-page",
    title: "Standard Page",
    description: "A blank page with a hero and a text section to start from.",
    schemaType: "page",
    value: {
      slug: { _type: "slug", current: "new-page" },
      sections: [
        { _type: "heroBlock", _key: "hero", eyebrow: "" },
        { _type: "richTextBlock", _key: "intro" },
      ],
    },
  },
];
