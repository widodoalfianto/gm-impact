import { defineArrayMember, defineField, defineType } from "sanity";

const richTextField = defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: [defineArrayMember({ type: "block" })],
  validation: (rule) => rule.required(),
});

export const impactGridType = defineType({
  name: "impactGrid",
  title: "Impact Metrics",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [defineArrayMember({ type: "metric" })],
      validation: (rule) => rule.required().min(1).max(8),
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => ({
      title: title || "Impact Metrics",
      subtitle: "Metrics section",
    }),
  },
});

export const storySectionType = defineType({
  name: "storySection",
  title: "Story",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    richTextField,
    defineField({
      name: "image",
      title: "Story image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "metrics",
      title: "Supporting metrics",
      type: "array",
      of: [defineArrayMember({ type: "metric" })],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "eyebrow",
      media: "image",
    },
  },
});

export const quoteSectionType = defineType({
  name: "quoteSection",
  title: "Testimony or Quote",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: "attribution",
      title: "Attribution",
      type: "string",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "context",
      title: "Context",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
  ],
  preview: {
    select: {
      title: "quote",
      subtitle: "attribution",
    },
  },
});

export const gallerySectionType = defineType({
  name: "gallerySection",
  title: "Photo Gallery",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      options: {
        layout: "grid",
      },
      validation: (rule) => rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => ({
      title: title || "Photo Gallery",
      subtitle: "Gallery section",
    }),
  },
});

export const videoSectionType = defineType({
  name: "videoSection",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({
          scheme: ["https"],
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(240),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "url",
    },
  },
});

export const prayerSectionType = defineType({
  name: "prayerSection",
  title: "Prayer Needs",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "How to pray",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "items",
      title: "Prayer points",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(180),
        }),
      ],
      validation: (rule) => rule.required().min(1).max(8),
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => ({
      title: title || "Prayer Needs",
      subtitle: "Prayer section",
    }),
  },
});

export const callToActionSectionType = defineType({
  name: "callToActionSection",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "buttonLabel",
      title: "Button label",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto"],
        }),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "buttonLabel",
    },
  },
});

export const actionLinkType = defineType({
  name: "actionLink",
  title: "Action Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "string",
      description: "Use a full URL or an on-page anchor such as #impact.",
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
        ],
      },
      initialValue: "primary",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "url",
    },
  },
});

export const countryImpactType = defineType({
  name: "countryImpact",
  title: "Country Impact Card",
  type: "object",
  fields: [
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Ministry focus",
      type: "string",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "showArtwork",
      title: "Show country line art",
      type: "boolean",
      description:
        "Show the country's map and flag illustration on this card. Turn off for a text-only card.",
      initialValue: true,
    }),
    defineField({
      name: "metrics",
      title: "Card metrics",
      type: "array",
      of: [defineArrayMember({ type: "metric" })],
      validation: (rule) => rule.min(1).max(3),
    }),
    defineField({
      name: "highlights",
      title: "Expanded highlights",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(180),
        }),
      ],
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      name: "mediaLabel",
      title: "Media link label",
      type: "string",
      initialValue: "Placeholder for videos",
      validation: (rule) => rule.max(50),
    }),
    defineField({
      name: "mediaUrl",
      title: "Media link",
      type: "string",
      description: "Use a full URL or an on-page anchor such as #socials.",
      validation: (rule) => rule.max(300),
    }),
  ],
  preview: {
    select: {
      title: "country.name",
      subtitle: "subtitle",
    },
    prepare: ({ title, subtitle }) => ({
      title: title || "Country impact",
      subtitle,
    }),
  },
});

export const countryGridSectionType = defineType({
  name: "countryGridSection",
  title: "Country Impact Grid",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Where We Work",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "accentHeading",
      title: "Accented heading",
      type: "string",
      description: "Rendered in the italic accent font.",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "regions",
      title: "Country cards",
      type: "array",
      of: [defineArrayMember({ type: "countryImpact" })],
      validation: (rule) => rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => ({
      title: title || "Country Impact Grid",
      subtitle: "Interactive country cards",
    }),
  },
});

export const callToActionCardType = defineType({
  name: "callToActionCard",
  title: "Partner Card",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "buttonLabel",
      title: "Button label",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "buttonUrl",
      title: "Button URL",
      type: "url",
      validation: (rule) =>
        rule.required().uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto"],
        }),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "buttonLabel",
    },
  },
});

export const partnerGridSectionType = defineType({
  name: "partnerGridSection",
  title: "Partner Cards",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Partner With Us",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.max(110),
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "cards",
      title: "Partner cards",
      type: "array",
      of: [defineArrayMember({ type: "callToActionCard" })],
      validation: (rule) => rule.required().min(1).max(3),
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare: ({ title }) => ({
      title: title || "Partner Cards",
      subtitle: "Calls to action",
    }),
  },
});
