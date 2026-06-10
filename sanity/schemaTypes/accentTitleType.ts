import { defineArrayMember, defineField, defineType } from "sanity";

type PreviewBlock = { _type?: string; children?: { text?: string }[] };

/** Flattens an accentTitle (portable text) into plain text for Studio previews. */
export function accentTitlePreview(blocks?: unknown) {
  if (!Array.isArray(blocks)) {
    return typeof blocks === "string" ? blocks : "";
  }

  return (blocks as PreviewBlock[])
    .map((block) =>
      (block.children ?? []).map((child) => child.text ?? "").join(""),
    )
    .join(" ")
    .trim();
}

/** A heading field that supports inline "Accent" highlighting. */
export function accentHeadingField(options?: {
  name?: string;
  title?: string;
  description?: string;
  group?: string;
  required?: boolean;
}) {
  return defineField({
    name: options?.name ?? "heading",
    title: options?.title ?? "Heading",
    type: "accentTitle",
    ...(options?.group ? { group: options.group } : {}),
    description:
      options?.description ??
      "Select any words and use the Accent button to highlight them.",
    validation: (rule) => (options?.required ? rule.required() : rule),
  });
}

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
