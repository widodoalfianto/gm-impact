import { CogIcon, DocumentsIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import { SITE_SETTINGS_ID } from "./schemaTypes/siteSettingsType";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("GM Impact Content")
    .items([
      S.listItem()
        .id("articles")
        .title("Articles")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Articles")
            .items([
              S.listItem()
                .id("newsletters")
                .title("Newsletters")
                .child(
                  S.documentTypeList("newsletter")
                    .title("Newsletters")
                    .defaultOrdering([
                      { field: "publishDate", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .id("field-updates")
                .title("Field Updates")
                .child(
                  S.documentTypeList("post")
                    .title("Field Updates")
                    .defaultOrdering([
                      { field: "publishDate", direction: "desc" },
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
