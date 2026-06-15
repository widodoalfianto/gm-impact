import { defineDocuments, defineLocations } from "sanity/presentation";

export const mainDocuments = defineDocuments([
  {
    route: "/newsletters/:slug",
    filter: `_type == "newsletter" && slug.current == $slug`,
  },
  {
    route: "/:slug",
    filter: `_type == "page" && slug.current == $slug`,
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
  page: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (document) =>
      document?.slug
        ? {
            locations: [
              {
                title: document.title || "Page",
                href: `/${document.slug}`,
              },
            ],
          }
        : { locations: [] },
  }),
};
