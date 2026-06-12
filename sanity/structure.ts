import { CogIcon, DocumentsIcon, HomeIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import { apiVersion } from "./env";
import { HOME_ID } from "./schemaTypes/homeType";
import { SITE_SETTINGS_ID } from "./schemaTypes/siteSettingsType";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("GM Impact Content")
    .items([
      S.listItem()
        .id("home")
        .title("Home Page")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId(HOME_ID)
            .title("Home Page"),
        ),
      S.listItem()
        .id("pages")
        .title("Pages")
        .child(
          S.documentTypeList("page")
            .title("Pages")
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.listItem()
        .id("articles")
        .title("Articles")
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title("Articles")
            .items([
              S.listItem()
                .id("newsletter-field-updates")
                .title("Newsletter & Field Updates")
                .child(
                  S.documentList()
                    .id("newsletter-field-updates-list")
                    .title("Newsletter & Field Updates")
                    .filter('_type == "newsletter" || _type == "post"')
                    .apiVersion(apiVersion)
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
