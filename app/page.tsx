import { NewsletterLandingPage } from "./gm-content";
import { getNewsletterLandingItems } from "./gm/newsletter-index-data";

export default async function Page() {
  const newsletters = await getNewsletterLandingItems();

  return <NewsletterLandingPage newsletters={newsletters} />;
}
