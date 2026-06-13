"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import {
  apiVersion,
  dataset,
  projectId,
} from "./sanity/env";
import {
  locations,
  mainDocuments,
} from "./sanity/presentation/resolve";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import {
  newsletterTemplates,
  pageTemplates,
  postTemplates,
} from "./sanity/templates";

const visionApiVersion = apiVersion.startsWith("v")
  ? apiVersion
  : `v${apiVersion}`;

export default defineConfig({
  name: "default",
  title: "GM Impact Newsletter",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    presentationTool({
      title: "Studio",
      previewUrl: {
        initial: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
      resolve: {
        locations,
        mainDocuments,
      },
    }),
    structureTool({
      title: "Content",
      structure,
    }),
    // Developer GROQ playground — only in local development, never in the
    // deployed Studio that admins use.
    ...(process.env.NODE_ENV === "development"
      ? [
          visionTool({
            title: "Query Lab",
            defaultApiVersion: visionApiVersion,
            defaultDataset: dataset,
            datasets: [dataset],
          }),
        ]
      : []),
  ],
  schema: {
    types: schemaTypes,
    templates: [...newsletterTemplates, ...postTemplates, ...pageTemplates],
  },
  document: {
    // Hide the singletons (reached through the structure) and the blank
    // default newsletter template, so newsletters are only created from the
    // explicit Newsletter / Project update templates.
    newDocumentOptions: (previousOptions, { creationContext }) => {
      const hidden = ["siteSettings", "homePage", "newsletter"];
      const options = previousOptions.filter(
        (option) => !hidden.includes(option.templateId),
      );

      // The navbar "+" mirrors the Articles list: only the three article
      // create templates. Structure panes (Pages, Countries, ...) keep their
      // own create options.
      if (creationContext.type === "global") {
        const articleTemplates = [
          "newsletter-full",
          "project-update-video",
          "project-update-images",
        ];
        return options.filter((option) =>
          articleTemplates.includes(option.templateId),
        );
      }

      return options;
    },
  },
});
