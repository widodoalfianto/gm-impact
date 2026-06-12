import { NewsletterLandingPage } from "./gm-content";
import { getNewsletterLandingItems } from "./gm/newsletter-index-data";
import { getHome } from "../sanity/lib/fetch-newsletter";

export default async function Page() {
  const [newsletters, home] = await Promise.all([
    getNewsletterLandingItems(),
    getHome(),
  ]);

  return <NewsletterLandingPage newsletters={newsletters} home={home} />;
}
