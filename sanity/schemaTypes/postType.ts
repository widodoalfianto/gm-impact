import { PinIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { sharedSectionMembers } from "./sectionMembers";

export const postType = defineType({
  name: "post",
  title: "Field Update",
  type: "document",
  icon: PinIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "landing", title: "Newsletter listing" },
    { name: "seo", title: "Search and sharing" },
  ],
  fields: [
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
      options: { source: "title", maxLength: 96 },
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
      name: "country",
      title: "Country",
      type: "reference",
      group: "content",
      description: "The main country or field this update comes from.",
      to: [{ type: "country" }],
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
      description: "Short label shown above the main heading.",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "heroHeading",
      title: "Main heading",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(130),
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
      name: "sections",
      title: "Update sections",
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
      title: "Feature this update",
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
        "Keep this off for public updates. Turn it on for private demos or drafts.",
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
      date: "publishDate",
      media: "heroImage",
      country: "country.name",
    },
    prepare: ({ title, date, media, country }) => ({
      title,
      subtitle: ["Field Update", country, date].filter(Boolean).join(" · "),
      media,
    }),
  },
});
