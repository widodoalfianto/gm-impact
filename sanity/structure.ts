import { CogIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import { apiVersion } from "./env";
import { SITE_SETTINGS_ID } from "./schemaTypes/siteSettingsType";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("GM Impact Content")
    .items([
      S.listItem()
        .id("pages")
        .title("Pages")
        .child(
          S.documentTypeList("page")
            .title("Pages")
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
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
      S.listItem()
        .id("field-updates")
        .title("Field Updates")
        .child(
          S.documentTypeList("post")
            .title("Field Updates")
            .defaultOrdering([{ field: "publishDate", direction: "desc" }]),
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
      S.divider(),
      S.listItem()
        .id("site-settings")
        .title("Site Settings")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId(SITE_SETTINGS_ID)
            .title("Site Settings"),
        ),
    ]);
