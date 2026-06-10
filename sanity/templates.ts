import { GIVE_URL } from "../app/gm/data";
import { newsletter2026Value } from "./presets/newsletter2026";

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

const sharedNewsletterDefaults = {
  featured: false,
  hideFromIndex: false,
  publishDate: new Date().toISOString().slice(0, 10),
};

const givingUrl = GIVE_URL;

export const newsletterTemplates = [
  {
    id: "global-impact-newsletter",
    title: "Global Impact Report",
    description: "A metrics-led mid-year or annual missions report.",
    schemaType: "newsletter",
    value: {
      ...sharedNewsletterDefaults,
      newsletterType: "globalImpact",
      eyebrow: "Global Impact",
      heroActions: [
        {
          _type: "actionLink",
          _key: "impact",
          label: "See Our Impact",
          url: "#impact",
          style: "primary",
        },
        {
          _type: "actionLink",
          _key: "partner",
          label: "Partner With Us",
          url: "#planters-giving",
          style: "secondary",
        },
      ],
      sections: [
        {
          _type: "impactGrid",
          _key: "impact-grid",
          heading: "Global Impact",
        },
        {
          _type: "countryGridSection",
          _key: "country-grid",
          eyebrow: "Where We Work",
          heading: "Nations Reached.",
          accentHeading: "One Mission.",
        },
        {
          _type: "partnerGridSection",
          _key: "partner-grid",
          eyebrow: "Partner With Us",
          heading: "Join the mission beyond the newsletter.",
          intro:
            "Help sustain prayer, sending, discipleship, care, and church planting among unreached communities.",
          cards: [
            {
              _type: "callToActionCard",
              _key: "planters",
              heading: "Planters Program",
              description:
                "Join a community of partners helping plant churches, care for pastors, and support long-term discipleship in unreached places.",
              buttonLabel: "Join the Planter Program",
              buttonUrl: givingUrl,
            },
            {
              _type: "callToActionCard",
              _key: "giving",
              heading: "Giving",
              description:
                "Your generosity helps fund Bibles, medical care, discipleship, and church planting.",
              buttonLabel: "Give to Global Missions",
              buttonUrl: givingUrl,
            },
          ],
        },
      ],
    },
  },
  {
    id: "global-impact-2026-newsletter",
    title: "2026 Global Impact Report",
    description:
      "The complete current 2026 newsletter, ready to recreate and edit.",
    schemaType: "newsletter",
    value: newsletter2026Value,
  },
  {
    id: "mission-trip-newsletter",
    title: "Mission Trip Highlight",
    description: "A visual field report centered on one mission trip.",
    schemaType: "newsletter",
    value: {
      ...sharedNewsletterDefaults,
      newsletterType: "missionTrip",
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
    id: "country-update-newsletter",
    title: "Country or Field Update",
    description: "A focused update from one country or ministry field.",
    schemaType: "newsletter",
    value: {
      ...sharedNewsletterDefaults,
      newsletterType: "countryUpdate",
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
    id: "project-update-newsletter",
    title: "Project Update",
    description:
      "A focused report on a building, care, relief, or ministry project.",
    schemaType: "newsletter",
    value: {
      ...sharedNewsletterDefaults,
      newsletterType: "projectUpdate",
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
];
