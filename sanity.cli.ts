import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  // Standalone Studio for contributors at https://gm-impact.sanity.studio
  // (independent of the Vercel deployment; gated by Sanity membership).
  studioHost: "gm-impact",
  deployment: {
    appId: "ujj7mogiwzowjop1pjoj9buh",
  },
});
