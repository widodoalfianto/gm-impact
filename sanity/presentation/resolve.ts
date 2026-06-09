import { defineDocuments, defineLocations } from "sanity/presentation";

export const mainDocuments = defineDocuments([
  {
    route: "/newsletters/:slug",
    filter: `_type == "newsletter" && slug.current == $slug`,
  },
]);

export const locations = {
  newsletter: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (document) => ({
      locations: document?.slug
        ? [
            {
              title: document.title || "Newsletter",
              href: `/newsletters/${document.slug}`,
            },
            {
              title: "Newsletter index",
              href: "/newsletters",
            },
          ]
        : [
            {
              title: "Newsletter index",
              href: "/newsletters",
            },
          ],
    }),
  }),
};
