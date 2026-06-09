import type { StructureResolver } from "sanity/structure";
import { apiVersion } from "./env";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("GM Impact Content")
    .items([
      S.listItem()
        .id("newsletters")
        .title("Newsletters")
        .child(
          S.list()
            .title("Newsletters")
            .items([
              S.listItem()
                .id("all-newsletters")
                .title("All Newsletters")
                .child(
                  S.documentTypeList("newsletter")
                    .title("All Newsletters")
                    .defaultOrdering([
                      { field: "publishDate", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .id("public-newsletters")
                .title("Public Newsletters")
                .child(
                  S.documentList()
                    .id("public-newsletters-list")
                    .title("Public Newsletters")
                    .schemaType("newsletter")
                    .apiVersion(apiVersion)
                    .filter(
                      '_type == "newsletter" && hideFromIndex != true && defined(slug.current)',
                    )
                    .defaultOrdering([
                      { field: "publishDate", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .id("hidden-newsletters")
                .title("Hidden and Internal")
                .child(
                  S.documentList()
                    .id("hidden-newsletters-list")
                    .title("Hidden and Internal Newsletters")
                    .schemaType("newsletter")
                    .apiVersion(apiVersion)
                    .filter(
                      '_type == "newsletter" && hideFromIndex == true',
                    )
                    .defaultOrdering([
                      { field: "_updatedAt", direction: "desc" },
                    ]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .id("countries")
        .title("Countries and Artwork")
        .child(
          S.documentTypeList("country")
            .title("Countries and Artwork")
            .defaultOrdering([{ field: "name", direction: "asc" }]),
        ),
    ]);
