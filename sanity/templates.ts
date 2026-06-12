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
  landingTitle: "Project update headline",
  landingSummary: "A short summary for the newsletter card.",
  landingHighlights: ["Project", "Update"],
};

export const newsletterTemplates = [
  {
    // id matches the schema type, so this replaces the default blank template.
    id: "newsletter",
    title: "Newsletter",
    description:
      "A full newsletter: impact stats, where we work, and partner with us.",
    schemaType: "newsletter",
    value: {
      ...sharedNewsletterDefaults,
      newsletterType: "globalImpact",
      title: "New Newsletter",
      eyebrow: "Global Impact",
      heroHeading: pt("Newsletter heading"),
      heroAccent: "Accent line",
      summary: "Give a short summary here that details this mission's impacts",
      landingTitle: "Newsletter listing headline",
      landingSummary: "A short summary for the newsletter card.",
      landingHighlights: ["Highlight one", "Highlight two"],
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
      sections: [
        {
          _type: "embedBlock",
          _key: "video",
          heading: pt("Watch the update"),
          url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description:
            "Paste a YouTube, Vimeo, or other video embed URL. Use the embed/share link, not the page URL.",
        },
        {
          _type: "storySection",
          _key: "story",
          eyebrow: "Update",
          heading: pt("What's happening"),
          body: pt("Replace this with a few sentences describing the project update."),
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
        },
      ],
    },
  },
];

const sharedPostDefaults = {
  featured: false,
  hideFromIndex: false,
  publishDate: new Date().toISOString().slice(0, 10),
};

export const postTemplates = [
  {
    id: "field-update-post",
    title: "Field Update",
    description: "A focused update from one country or ministry field.",
    schemaType: "post",
    value: {
      ...sharedPostDefaults,
      eyebrow: "Field Update",
      sections: [
        {
          _type: "storySection",
          _key: "field-story",
          eyebrow: "From the field",
        },
        {
          _type: "prayerSection",
          _key: "field-prayer",
          heading: pt("How to pray"),
        },
        {
          _type: "callToActionSection",
          _key: "field-giving",
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
    id: "mission-trip-post",
    title: "Mission Trip Highlight",
    description: "A visual field report centered on one mission trip.",
    schemaType: "post",
    value: {
      ...sharedPostDefaults,
      eyebrow: "Mission Trip Highlight",
      sections: [
        {
          _type: "storySection",
          _key: "trip-story",
          eyebrow: "From the field",
        },
        {
          _type: "gallerySection",
          _key: "trip-gallery",
          heading: pt("Moments from the mission"),
        },
        {
          _type: "prayerSection",
          _key: "trip-prayer",
          heading: pt("How to pray"),
        },
        {
          _type: "callToActionSection",
          _key: "trip-giving",
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
    id: "project-update-post",
    title: "Project Update",
    description:
      "A focused report on a building, care, relief, or ministry project.",
    schemaType: "post",
    value: {
      ...sharedPostDefaults,
      eyebrow: "Project Update",
      sections: [
        {
          _type: "impactGrid",
          _key: "project-impact",
          heading: "Project progress",
        },
        {
          _type: "storySection",
          _key: "project-story",
          eyebrow: "Why it matters",
        },
        {
          _type: "gallerySection",
          _key: "project-gallery",
          heading: pt("Project gallery"),
        },
        {
          _type: "prayerSection",
          _key: "project-prayer",
          heading: pt("How to pray"),
        },
        {
          _type: "callToActionSection",
          _key: "project-giving",
          heading: pt("Help move this project forward"),
          description:
            "Partner with Global Missions to support this work and the communities it serves.",
          buttonLabel: "Give to Global Missions",
          buttonUrl: givingUrl,
        },
      ],
    },
  },
  {
    id: "mission-update-post",
    title: "Sample Mission Update",
    description: "An example short update with text and a video, filled with placeholder content.",
    schemaType: "post",
    value: {
      ...sharedPostDefaults,
      title: "Sample Mission Update",
      slug: { _type: "slug", current: "sample-mission-update" },
      eyebrow: "Mission Update",
      heroHeading: pt("A Mission Update"),
      summary:
        "A short placeholder summary for this mission update. Replace it with a sentence or two about what happened.",
      landingTitle: "A sample mission update.",
      landingSummary: "A short update with text and a video.",
      landingHighlights: ["Update", "Video"],
      sections: [
        {
          _type: "storySection",
          _key: "update-story",
          eyebrow: "What's happening",
          heading: pt("A short update"),
          body: pt(
            "Replace this with a few sentences describing the update. Keep it short — a mission update is meant to be quick to read.",
          ),
        },
        {
          _type: "videoSection",
          _key: "update-video",
          heading: pt("Watch"),
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          description: "Replace this with your own YouTube video link.",
        },
        {
          _type: "callToActionSection",
          _key: "update-cta",
          heading: pt("Partner with Global Missions"),
          description:
            "Help sustain prayer, sending, discipleship, care, and church planting among unreached communities.",
          buttonLabel: "Give to Global Missions",
          buttonUrl: givingUrl,
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
      sections: [
        { _type: "heroBlock", _key: "hero", eyebrow: "" },
        { _type: "richTextBlock", _key: "intro" },
      ],
    },
  },
];
