import { createClient } from "next-sanity";
import {
  apiVersion,
  dataset,
  previewOrigin,
  projectId,
} from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  stega: {
    studioUrl: `${previewOrigin}/studio`,
  },
});
