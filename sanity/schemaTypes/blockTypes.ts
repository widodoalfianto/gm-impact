import {
  BlockContentIcon,
  HelpCircleIcon,
  ImageIcon,
  ImagesIcon,
  StarIcon,
  ThLargeIcon,
  PlayIcon,
} from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { accentHeadingField, accentTitlePreview } from "./accentTitleType";

const richTextField = defineField({
  name: "body",
  title: "Body",
  type: "array",
  of: [defineArrayMember({ type: "block" })],
  validation: (rule) => rule.required(),
});

export const heroBlockType = defineType({
  name: "heroBlock",
  title: "Hero Banner",
  type: "object",
  icon: StarIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Short label shown above the heading.",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "accentTitle",
      description:
        "Select any words and use the Accent button to highlight them.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Introduction",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(360),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "actions",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "actionLink" })],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title: accentTitlePreview(title) || "Hero Banner",
      subtitle: subtitle || "Hero",
      media,
    }),
  },
});

export const richTextBlockType = defineType({
  name: "richTextBlock",
  title: "Rich Text",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    accentHeadingField({
      description: "Optional heading shown above the text.",
    }),
    richTextField,
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: accentTitlePreview(title) || "Rich Text",
      subtitle: "Text section",
    }),
  },
});

export const imageTextBlockType = defineType({
  name: "imageTextBlock",
  title: "Image and Text",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    accentHeadingField(),
    richTextField,
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "imagePosition",
      title: "Image position",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Right", value: "right" },
          { title: "Left", value: "left" },
        ],
      },
      initialValue: "right",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "action",
      title: "Button",
      type: "actionLink",
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "eyebrow", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title: accentTitlePreview(title) || "Image and Text",
      subtitle: subtitle || "Image + text",
      media,
    }),
  },
});

export const faqBlockType = defineType({
  name: "faqBlock",
  title: "FAQ",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    accentHeadingField(),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required().max(160),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(600),
            }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(20),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: accentTitlePreview(title) || "FAQ",
      subtitle: "Questions and answers",
    }),
  },
});

export const logoStripBlockType = defineType({
  name: "logoStripBlock",
  title: "Logo Strip",
  type: "object",
  icon: ImagesIcon,
  fields: [
    accentHeadingField(),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "logo",
          fields: [
            defineField({
              name: "image",
              title: "Logo",
              type: "imageWithAlt",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
              validation: (rule) =>
                rule.uri({ scheme: ["http", "https"] }),
            }),
          ],
          preview: { select: { title: "image.alt", media: "image" } },
        }),
      ],
      validation: (rule) => rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: accentTitlePreview(title) || "Logo Strip",
      subtitle: "Partner or sponsor logos",
    }),
  },
});

export const statsBannerBlockType = defineType({
  name: "statsBannerBlock",
  title: "Stats Banner",
  type: "object",
  icon: ThLargeIcon,
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
      title: "Stats",
      type: "array",
      of: [defineArrayMember({ type: "metric" })],
      validation: (rule) => rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Stats Banner",
      subtitle: "Highlighted stats",
    }),
  },
});

export const embedBlockType = defineType({
  name: "embedBlock",
  title: "Embed",
  type: "object",
  icon: PlayIcon,
  fields: [
    accentHeadingField(),
    defineField({
      name: "url",
      title: "Embed URL",
      type: "url",
      description:
        "A page to embed in a frame, such as a map, form, or document.",
      validation: (rule) =>
        rule.required().uri({ scheme: ["https"] }),
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
    select: { title: "heading", subtitle: "url" },
    prepare: ({ title, subtitle }) => ({
      title: accentTitlePreview(title) || "Embed",
      subtitle,
    }),
  },
});
