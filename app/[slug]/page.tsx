import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPageView } from "../gm/cms-page-view";
import {
  getPageBySlug,
  getSiteSettings,
} from "../../sanity/lib/fetch-newsletter";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug, {
    perspective: "published",
    stega: false,
  });

  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription,
  };
}

export default async function CmsGenericPage({ params }: PageProps) {
  const { slug } = await params;
  const [page, settings] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
  ]);

  if (!page) {
    notFound();
  }

  return <CmsPageView page={page} settings={settings} />;
}
