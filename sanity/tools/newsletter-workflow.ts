export type NewsletterDocument = {
  _id: string;
  _updatedAt: string;
  title?: string;
  slug?: string;
  publishDate?: string;
  hideFromIndex?: boolean;
  newsletterType?: string;
  heroHeading?: string;
  summary?: string;
  landingTitle?: string;
  landingSummary?: string;
  sectionCount?: number;
};

export type NewsletterRoute = {
  id: string;
  draft?: NewsletterDocument;
  published?: NewsletterDocument;
};

export type RouteStatus = {
  label: string;
  tone: "caution" | "positive" | "primary";
};

export const NEWSLETTER_WORKFLOW_QUERY = `*[
  _type == "newsletter" &&
  !(_id in path("versions.**"))
] {
  _id,
  _updatedAt,
  title,
  "slug": slug.current,
  publishDate,
  hideFromIndex,
  newsletterType,
  heroHeading,
  summary,
  landingTitle,
  landingSummary,
  "sectionCount": count(sections)
}`;

export const newsletterTypeLabels: Record<string, string> = {
  countryUpdate: "Country or Field Update",
  globalImpact: "Global Impact Report",
  missionTrip: "Mission Trip Highlight",
  projectUpdate: "Project Update",
};

export function getPublishedId(documentId: string) {
  return documentId.replace(/^drafts\./, "");
}

export function buildNewsletterRoutes(documents: NewsletterDocument[]) {
  const routes = new Map<string, NewsletterRoute>();

  documents.forEach((document) => {
    const id = getPublishedId(document._id);
    const route = routes.get(id) || { id };

    if (document._id.startsWith("drafts.")) {
      route.draft = document;
    } else {
      route.published = document;
    }

    routes.set(id, route);
  });

  return Array.from(routes.values()).sort((left, right) => {
    const leftDate =
      left.draft?.publishDate ||
      left.published?.publishDate ||
      left.draft?._updatedAt ||
      left.published?._updatedAt ||
      "";
    const rightDate =
      right.draft?.publishDate ||
      right.published?.publishDate ||
      right.draft?._updatedAt ||
      right.published?._updatedAt ||
      "";

    return rightDate.localeCompare(leftDate);
  });
}

export function getCurrentNewsletter(route: NewsletterRoute) {
  return route.draft || route.published;
}

export function getRouteStatus(route: NewsletterRoute): RouteStatus {
  if (route.draft && route.published) {
    return { label: "Unpublished changes", tone: "caution" };
  }

  if (route.published) {
    return { label: "Published", tone: "positive" };
  }

  return { label: "Draft", tone: "primary" };
}

export function getMissingNewsletterFields(document?: NewsletterDocument) {
  if (!document) {
    return [];
  }

  const missingFields = [
    [document.title, "Title"],
    [document.slug, "URL slug"],
    [document.heroHeading, "Hero heading"],
    [document.summary, "Short summary"],
    [document.landingTitle, "Listing title"],
    [document.landingSummary, "Listing summary"],
    [document.sectionCount && document.sectionCount > 0, "Content sections"],
  ];

  return missingFields
    .filter(([value]) => !value)
    .map(([, label]) => label as string);
}

export function formatPublicationDate(value?: string) {
  if (!value) {
    return "No publication date";
  }

  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}
