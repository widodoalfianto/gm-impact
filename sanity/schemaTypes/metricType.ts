import { defineField, defineType } from "sanity";
import { IMPACT_ART_OPTIONS } from "../../lib/gm-visual-library";
import { ImpactArtPickerInput } from "../components/visual-picker-input";

export const metricType = defineType({
  name: "metric",
  title: "Impact Metric",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "Examples: 193+, 1,000, 5 nations",
      validation: (rule) => rule.required().max(24),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Examples: New Believers, Bibles Given",
      validation: (rule) => rule.required().max(48),
    }),
    defineField({
      name: "art",
      title: "Illustration",
      type: "string",
      description:
        "Choose one of the approved line-art illustrations for this metric.",
      options: {
        layout: "radio",
        list: IMPACT_ART_OPTIONS.map(({ title, value }) => ({ title, value })),
      },
      components: {
        input: ImpactArtPickerInput,
      },
    }),
  ],
  preview: {
    select: {
      title: "value",
      subtitle: "label",
    },
  },
});
