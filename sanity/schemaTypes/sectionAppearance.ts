import { defineField } from "sanity";

const dividerList = [
  { title: "None", value: "none" },
  { title: "Soft curve", value: "soft" },
  { title: "Wave", value: "wave" },
];

const hideUnlessAccent = ({ parent }: { parent?: { background?: string } }) =>
  parent?.background !== "accent";

/**
 * Optional appearance options shared by every section/block. The bespoke 2026
 * styling is exposed as choices, never required. A section can sit on a warm
 * accent band; when it does, admins can add curved dividers above and/or below
 * it to recreate the flowing transitions of the hand-made design.
 */
export const appearanceFields = [
  defineField({
    name: "background",
    title: "Section color",
    type: "string",
    description:
      "Put this section on a warm accent band. Curved dividers are available when this is on.",
    options: {
      layout: "radio",
      list: [
        { title: "Default (page background)", value: "default" },
        { title: "Warm accent", value: "accent" },
      ],
    },
    initialValue: "default",
  }),
  defineField({
    name: "topDivider",
    title: "Top divider",
    type: "string",
    description: "Curved transition above this accent section.",
    options: { layout: "radio", list: dividerList },
    initialValue: "none",
    hidden: hideUnlessAccent,
  }),
  defineField({
    name: "bottomDivider",
    title: "Bottom divider",
    type: "string",
    description: "Curved transition below this accent section.",
    options: { layout: "radio", list: dividerList },
    initialValue: "none",
    hidden: hideUnlessAccent,
  }),
];
