import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsPostView } from "../../gm/cms-post-view";
import {
  getPostBySlug,
  getSiteSettings,
} from "../../../sanity/lib/fetch-newsletter";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, {
    perspective: "published",
    stega: false,
  });

  return {
    title: post?.title || "Global Missions Field Update",
    description: post?.summary,
  };
}

export default async function CmsPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
  ]);

  if (!post) {
    notFound();
  }

  return <CmsPostView post={post} settings={settings} />;
}
