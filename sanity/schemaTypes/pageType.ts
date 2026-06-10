import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { sharedSectionMembers } from "./sectionMembers";

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "Search and sharing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      description: "Used in the Studio and as a fallback page title.",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      description:
        "The page address, e.g. 'about' becomes /about. Use 'home' for the landing page.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      group: "content",
      description:
        "Build the page by adding and reordering approved sections.",
      of: sharedSectionMembers,
      validation: (rule) => rule.required().min(1).max(40),
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
      validation: (rule) => rule.max(160),
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title: title || "Untitled page",
      subtitle: slug ? `/${slug}` : "No address yet",
    }),
  },
});
