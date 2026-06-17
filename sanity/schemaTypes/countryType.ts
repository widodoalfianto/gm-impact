import { defineField, defineType } from "sanity";
import { COUNTRY_ART_OPTIONS } from "../../lib/gm-visual-library";
import { CountryArtPickerInput } from "../components/visual-picker-input";

export const countryType = defineType({
  name: "country",
  title: "Country",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isoCode",
      title: "ISO country code",
      type: "string",
      description: "Two-letter code such as NP, ID, or PK.",
      validation: (rule) =>
        rule.required().uppercase().length(2).regex(/^[A-Z]{2}$/),
    }),
    defineField({
      name: "summary",
      title: "Internal context",
      type: "text",
      rows: 3,
      description:
        "Optional editorial context. This is not displayed automatically.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "visualKey",
      title: "Map and flag artwork",
      type: "string",
      description:
        "Select the approved map outline and flat flag shown on newsletter cards.",
      options: {
        layout: "radio",
        list: COUNTRY_ART_OPTIONS.map(({ title, value }) => ({ title, value })),
      },
      components: {
        input: CountryArtPickerInput,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "isoCode",
    },
  },
});
