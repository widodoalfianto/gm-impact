import { defineArrayMember, defineField, defineType } from "sanity";
import { accentHeadingField } from "./accentTitleType";
import { sharedSectionMembers } from "./sectionMembers";

// A video-led update (first block is a video/embed) renders with no hero, so
// the hero-only fields below don't apply to it and are hidden in the editor.
function isVideoLed(document?: Record<string, unknown>): boolean {
  const sections = document?.sections as
    | Array<{ _type?: string }>
    | undefined;
  const first = sections?.[0];
  return first?._type === "embedBlock" || first?._type === "videoSection";
}

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
      // Set by the create template (Newsletter vs Project update), not chosen
      // by the editor, so it stays hidden in the form.
      name: "newsletterType",
      title: "Newsletter format",
      type: "string",
      group: "content",
      hidden: true,
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
      title: "Title",
      type: "string",
      group: "content",
      description:
        "The article title. Also used as the home/feed card headline unless you set a separate listing headline below.",
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
      group: "landing",
      description:
        "Set automatically to today. Change it only to backdate an archive; the article list is ordered by this date.",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      group: "content",
      description: "Short label shown above the main heading.",
      hidden: ({ document }) => isVideoLed(document),
      validation: (rule) => rule.required().max(80),
    }),
    accentHeadingField({
      name: "heroHeading",
      title: "Main heading",
      group: "content",
      required: true,
      hidden: ({ document }) => isVideoLed(document),
    }),
    defineField({
      name: "heroAccent",
      title: "Accented heading text",
      type: "string",
      group: "content",
      description:
        "Optional second line rendered in the Superior Title accent style.",
      hidden: ({ document }) => isVideoLed(document),
      validation: (rule) => rule.max(90),
    }),
    defineField({
      name: "summary",
      title: "Introduction",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "A one or two sentence intro. Also used as the home/feed card summary unless you set a separate listing summary below.",
      validation: (rule) => rule.required().max(360),
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "content",
      description: "Used as the home/feed card image.",
    }),
    defineField({
      name: "countries",
      title: "Countries",
      type: "array",
      group: "content",
      description:
        "Shown as flag chips on the home/feed card and in the hero. Hidden for video updates, which have no hero.",
      hidden: ({ document }) => isVideoLed(document),
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
      description:
        "Call-to-action buttons in the hero. Only used on the full Newsletter format, so hidden on project updates.",
      // Only the Global Impact newsletter renders hero buttons.
      hidden: ({ document }) => document?.newsletterType !== "globalImpact",
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
      title: "Listing headline (optional)",
      type: "string",
      group: "landing",
      description:
        "Override for the home/feed card headline. Defaults to the article title above.",
      validation: (rule) => rule.max(100),
    }),
    defineField({
      name: "landingSummary",
      title: "Listing summary (optional)",
      type: "text",
      rows: 3,
      group: "landing",
      description:
        "Override for the home/feed card summary. Defaults to the introduction above.",
      validation: (rule) => rule.max(260),
    }),
    defineField({
      name: "landingHighlights",
      title: "Card highlights (optional)",
      type: "array",
      group: "landing",
      description: "Up to four short chips shown on the feed card.",
      of: [
        defineArrayMember({
          type: "string",
          validation: (rule) => rule.required().max(36),
        }),
      ],
      validation: (rule) => rule.max(4),
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
