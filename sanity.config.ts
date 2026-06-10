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
import { newsletterTemplates, postTemplates } from "./sanity/templates";
import { siteMapTool } from "./sanity/tools/site-map-tool";
import { startHereTool } from "./sanity/tools/start-here-tool";

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
      title: "Preview and Edit",
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
    visionTool({
      title: "Query Lab (Developers)",
      defaultApiVersion: visionApiVersion,
      defaultDataset: dataset,
      datasets: [dataset],
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: [...newsletterTemplates, ...postTemplates],
  },
  document: {
    // Singletons are reached through the structure, never created ad hoc.
    newDocumentOptions: (previousOptions, { creationContext }) =>
      creationContext.type === "global"
        ? previousOptions.filter(
            (option) => option.templateId !== "siteSettings",
          )
        : previousOptions,
  },
  tools: (previousTools) => [startHereTool, siteMapTool, ...previousTools],
});
