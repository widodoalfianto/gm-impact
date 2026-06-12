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
        initial: "/newsletters/2026",
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
    // Singletons are reached through the structure, never created ad hoc.
    newDocumentOptions: (previousOptions, { creationContext }) =>
      creationContext.type === "global"
        ? previousOptions.filter(
            (option) =>
              option.templateId !== "siteSettings" &&
              option.templateId !== "homePage",
          )
        : previousOptions,
  },
});
