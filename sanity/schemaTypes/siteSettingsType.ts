import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const SITE_SETTINGS_ID = "siteSettings";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "social", title: "Social and sharing" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "givingUrl",
      title: "Giving link",
      type: "url",
      group: "general",
      description:
        "The donation page used by giving buttons and new newsletter templates.",
      validation: (rule) =>
        rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "footerBlurb",
      title: "Footer blurb",
      type: "text",
      rows: 2,
      group: "general",
      description: "Short paragraph shown in the site footer.",
      validation: (rule) => rule.max(240),
    }),
    defineField({
      name: "siteUrl",
      title: "Public site URL",
      type: "url",
      group: "social",
      description: "Used for the footer share link.",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "youtubeUrl",
      title: "YouTube",
      type: "url",
      group: "social",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram",
      type: "url",
      group: "social",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "seoDescription",
      title: "Default description",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Fallback description for pages that do not set their own.",
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
