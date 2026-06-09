import type { Metadata } from "next";
import { GlobalMissionsImpactPage } from "../../gm-content";
import { CmsNewsletterPreview } from "../../gm/cms-newsletter-preview";
import { getNewsletterBySlug } from "../../../sanity/lib/fetch-newsletter";

export async function generateMetadata(): Promise<Metadata> {
  const newsletter = await getNewsletterBySlug("2026", {
    perspective: "published",
    stega: false,
  });

  return {
    title: newsletter?.title || "Global Missions Impact 2026",
    description: newsletter?.summary,
  };
}

export default async function Newsletter2026Page() {
  const newsletter = await getNewsletterBySlug("2026");

  return newsletter ? (
    <CmsNewsletterPreview newsletter={newsletter} />
  ) : (
    <GlobalMissionsImpactPage />
  );
}
