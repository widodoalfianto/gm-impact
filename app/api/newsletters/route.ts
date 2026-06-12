import { getNewsletterLandingItems } from "../../gm/newsletter-index-data";

// Always reflect the current published newsletters/posts so the nav dropdown
// updates as soon as content is published, rather than serving a stale cache.
export const dynamic = "force-dynamic";

export async function GET() {
  const newsletters = await getNewsletterLandingItems();

  return Response.json(
    newsletters.map((newsletter) => ({
      label: newsletter.label,
      href: newsletter.href,
    })),
  );
}
