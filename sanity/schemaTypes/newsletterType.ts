import { defineArrayMember, defineField, defineType } from "sanity";
import { accentHeadingField } from "./accentTitleType";
import { sharedSectionMembers } from "./sectionMembers";

export const newsletterType = defineType({
  name: "newsletter",
  title: "Newsletter",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "landing", title: "Newsletter listing" },
    { name: "seo", title: "Search and sharing" },
  ],
  fields: [
    defineField({
      name: "newsletterType",
      title: "Newsletter format",
      type: "string",
      group: "content",
      options: {
        layout: "radio",
        list: [
          { title: "Global Impact Report", value: "globalImpact" },
          { title: "Mission Trip Highlight", value: "missionTrip" },
          { title: "Country or Field Update", value: "countryUpdate" },
          { title: "Project Update", value: "projectUpdate" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      description:
        "Used in the Studio and as a fallback page title. Keep it descriptive.",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishDate",
      title: "Publication date",
      type: "date",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
      description: "Short label shown above the main heading.",
      validation: (rule) => rule.required().max(80),
    }),
    accentHeadingField({
      name: "heroHeading",
      title: "Main heading",
      group: "content",
      required: true,
    }),
    defineField({
      name: "heroAccent",
      title: "Accented heading text",
      type: "string",
      group: "content",
      description:
        "Optional second line rendered in the Superior Title accent style.",
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: "summary",
      title: "Introduction",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(360),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "countries",
      title: "Countries",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "country" }],
        }),
      ],
      validation: (rule) => rule.unique().max(12),
    }),
    defineField({
      name: "heroActions",
      title: "Hero buttons",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "actionLink" })],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: "sections",
      title: "Newsletter sections",
      type: "array",
      group: "content",
      description:
        "Add and reorder approved sections. The website controls their responsive layout.",
      of: sharedSectionMembers,
      validation: (rule) => rule.required().min(1).max(20),
    }),
    defineField({
      name: "landingTitle",
      title: "Listing headline",
      type: "string",
      group: "landing",
      description:
        "Short, punchy headline for the card on the Newsletters page.",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "landingSummary",
      title: "Listing summary",
      type: "text",
      rows: 3,
      group: "landing",
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "landingHighlights",
      title: "Card highlights",
      type: "array",
      group: "landing",
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(36),
        }),
      ],
      validation: (rule) => rule.required().min(1).max(4),
    }),
    defineField({
      name: "featured",
      title: "Feature this newsletter",
      type: "boolean",
      group: "landing",
      initialValue: false,
    }),
    defineField({
      name: "hideFromIndex",
      title: "Hide from newsletter listing",
      type: "boolean",
      group: "landing",
      description:
        "Keep this off for public newsletters. Turn it on for private demos or drafts.",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO title",
      type: "string",
      group: "seo",
      description: "Optional. The internal title is used when this is empty.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Optional. The introduction is used when this is empty.",
      validation: (rule) => rule.max(160),
    }),
  ],
  orderings: [
    {
      title: "Publication date, newest",
      name: "publishDateDesc",
      by: [{ field: "publishDate", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      type: "newsletterType",
      date: "publishDate",
      media: "heroImage",
    },
    prepare: ({ title, type, date, media }) => {
      const labels: Record<string, string> = {
        globalImpact: "Global Impact Report",
        missionTrip: "Mission Trip Highlight",
        countryUpdate: "Country or Field Update",
        projectUpdate: "Project Update",
      };

      return {
        title,
        subtitle: [labels[type] || type, date].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
