import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const HOME_ID = "homePage";

export const homeType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the landing headline.",
      initialValue: "Newsletters",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "heading",
      title: "Headline",
      type: "accentTitle",
      description:
        "The main landing headline. Select any words and use the Accent button to highlight them.",
      initialValue: [
        {
          _type: "block",
          _key: "heading",
          style: "normal",
          markDefs: [],
          children: [
            {
              _type: "span",
              _key: "heading-text",
              text: "Global Missions Updates",
              marks: [],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "intro",
      title: "Introduction",
      type: "text",
      rows: 3,
      initialValue:
        "Read the latest stories of sending, discipleship, care, and church planting among unreached communities.",
      validation: (rule) => rule.max(300),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
