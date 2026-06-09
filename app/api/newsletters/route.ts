import { getNewsletterLandingItems } from "../../gm/newsletter-index-data";

export async function GET() {
  const newsletters = await getNewsletterLandingItems();

  return Response.json(
    newsletters.map((newsletter) => ({
      label: `${newsletter.year} Newsletter`,
      href: newsletter.href,
    })),
  );
}
