import { defineArrayMember, defineType } from "sanity";

/**
 * A title field that lets an admin select specific words and mark them as
 * "Accent" — rendered in the display/accent style. It is a deliberately
 * constrained rich-text field: one normal style, no lists, and a single
 * Accent decorator, so it behaves like a title, not a body.
 */
export const accentTitleType = defineType({
  name: "accentTitle",
  title: "Title",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [{ title: "Accent", value: "accent" }],
        annotations: [],
      },
    }),
  ],
});
