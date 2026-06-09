import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsNewsletterPreview } from "../../gm/cms-newsletter-preview";
import { getNewsletterBySlug } from "../../../sanity/lib/fetch-newsletter";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug, {
    perspective: "published",
    stega: false,
  });

  return {
    title: newsletter?.title || "Global Missions Newsletter",
    description: newsletter?.summary,
  };
}

export default async function CmsNewsletterPage({ params }: PageProps) {
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug);

  if (!newsletter) {
    notFound();
  }

  return <CmsNewsletterPreview newsletter={newsletter} />;
}
