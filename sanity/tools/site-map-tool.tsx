"use client";

import {
  DocumentsIcon,
  EarthGlobeIcon,
  EditIcon,
  LaunchIcon,
  RefreshIcon,
} from "@sanity/icons";
import {
  Badge,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from "@sanity/ui";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Tool } from "sanity";
import { useClient } from "sanity";
import { IntentLink } from "sanity/router";
import { apiVersion } from "../env";
import {
  buildNewsletterRoutes,
  formatPublicationDate,
  getCurrentNewsletter,
  getRouteStatus,
  NEWSLETTER_WORKFLOW_QUERY,
  newsletterTypeLabels,
  type NewsletterDocument,
  type NewsletterRoute,
} from "./newsletter-workflow";
import styles from "./site-map-tool.module.css";

const fixedRoutes = [
  {
    title: "Newsletter home",
    path: "/",
    description: "The public landing page and newsletter directory.",
  },
  {
    title: "All newsletters",
    path: "/newsletters",
    description: "The full public newsletter listing.",
  },
  {
    title: "2025 archive",
    path: "/newsletters/2025",
    description: "Legacy newsletter maintained in the website code.",
  },
  {
    title: "2024 archive",
    path: "/newsletters/2024",
    description: "Legacy newsletter maintained in the website code.",
  },
] as const;

function SiteMapTool() {
  const client = useClient({ apiVersion });
  const rawClient = useMemo(
    () => client.withConfig({ perspective: "raw" }),
    [client],
  );
  const [routes, setRoutes] = useState<NewsletterRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRoutes = useCallback(
    async (manualRefresh = false) => {
      if (manualRefresh) {
        setRefreshing(true);
      }

      try {
        const documents =
          await rawClient.fetch<NewsletterDocument[]>(
            NEWSLETTER_WORKFLOW_QUERY,
          );
        setRoutes(buildNewsletterRoutes(documents));
        setError(null);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load newsletter routes.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [rawClient],
  );

  useEffect(() => {
    let active = true;

    rawClient
      .fetch<NewsletterDocument[]>(NEWSLETTER_WORKFLOW_QUERY)
      .then((documents) => {
        if (!active) {
          return;
        }

        setRoutes(buildNewsletterRoutes(documents));
        setError(null);
      })
      .catch((loadError: unknown) => {
        if (!active) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load newsletter routes.",
        );
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    const subscription = rawClient
      .listen('*[_type == "newsletter"]', {}, { includeResult: false })
      .subscribe({
        next: () => {
          void loadRoutes();
        },
        error: () => {
          setError(
            "Live updates disconnected. Refresh this page to load the latest routes.",
          );
        },
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [loadRoutes, rawClient]);

  const publishedCount = routes.filter(
    (route) => route.published && !route.draft,
  ).length;
  const draftCount = routes.filter(
    (route) => route.draft && !route.published,
  ).length;
  const pendingCount = routes.filter(
    (route) => route.draft && route.published,
  ).length;

  return (
    <div className={styles.page}>
      <Container width={5}>
        <Stack gap={6}>
          <Flex
            align="flex-start"
            gap={4}
            justify="space-between"
            wrap="wrap"
          >
            <Stack gap={3}>
              <Flex align="center" gap={3}>
                <EarthGlobeIcon className={styles.titleIcon} />
                <Heading as="h1" size={4}>
                  Site Map
                </Heading>
              </Flex>
              <Text muted size={1}>
                See where website pages live and follow every newsletter from
                draft to public URL.
              </Text>
            </Stack>
            <Button
              disabled={refreshing}
              icon={RefreshIcon}
              loading={refreshing}
              mode="ghost"
              onClick={() => void loadRoutes(true)}
              text="Refresh"
            />
          </Flex>

          <section aria-labelledby="site-pages-heading">
            <Stack gap={4}>
              <Stack gap={2}>
                <Heading as="h2" id="site-pages-heading" size={2}>
                  Website Pages
                </Heading>
                <Text muted size={1}>
                  These routes are part of the website itself.
                </Text>
              </Stack>
              <div className={styles.routeGrid}>
                {fixedRoutes.map((route) => (
                  <Card
                    border
                    key={route.path}
                    padding={4}
                    radius={2}
                    shadow={1}
                  >
                    <Stack gap={4}>
                      <Stack gap={2}>
                        <Heading as="h3" size={1}>
                          {route.title}
                        </Heading>
                        <Text muted size={1}>
                          {route.description}
                        </Text>
                      </Stack>
                      <Flex align="center" gap={3} justify="space-between">
                        <code className={styles.routePath}>{route.path}</code>
                        <a
                          aria-label={`Open ${route.title}`}
                          className={styles.iconLink}
                          href={route.path}
                          rel="noreferrer"
                          target="_blank"
                          title={`Open ${route.title}`}
                        >
                          <LaunchIcon />
                        </a>
                      </Flex>
                    </Stack>
                  </Card>
                ))}
              </div>
            </Stack>
          </section>

          <section aria-labelledby="newsletter-routes-heading">
            <Stack gap={4}>
              <Flex
                align="flex-end"
                gap={4}
                justify="space-between"
                wrap="wrap"
              >
                <Stack gap={2}>
                  <Heading as="h2" id="newsletter-routes-heading" size={2}>
                    Newsletter Routes
                  </Heading>
                  <Text muted size={1}>
                    A newsletter&apos;s URL comes from its URL slug.
                  </Text>
                </Stack>
                <Flex gap={2} wrap="wrap">
                  <Badge tone="positive">{publishedCount} published</Badge>
                  <Badge tone="primary">
                    {draftCount} {draftCount === 1 ? "draft" : "drafts"}
                  </Badge>
                  <Badge tone="caution">{pendingCount} pending</Badge>
                </Flex>
              </Flex>

              {error ? (
                <Card border padding={4} radius={2} tone="critical">
                  <Text size={1}>{error}</Text>
                </Card>
              ) : null}

              {loading ? (
                <Card border padding={5} radius={2}>
                  <Flex align="center" gap={3} justify="center">
                    <Spinner muted />
                    <Text muted size={1}>
                      Loading newsletter routes
                    </Text>
                  </Flex>
                </Card>
              ) : null}

              {!loading && routes.length === 0 ? (
                <Card border padding={5} radius={2}>
                  <Stack gap={3}>
                    <Heading as="h3" size={1}>
                      No newsletters yet
                    </Heading>
                    <Text muted size={1}>
                      Create a newsletter from the Content tool. Its slug will
                      appear here as soon as the draft is saved.
                    </Text>
                  </Stack>
                </Card>
              ) : null}

              {!loading && routes.length > 0 ? (
                <Stack gap={3}>
                  {routes.map((route) => {
                    const current = getCurrentNewsletter(route);
                    const status = getRouteStatus(route);
                    const draftSlug = route.draft?.slug;
                    const publishedSlug = route.published?.slug;
                    const displayedSlug = draftSlug || publishedSlug;
                    const previewPath = displayedSlug
                      ? `/newsletters/${displayedSlug}`
                      : null;
                    const publicPath = publishedSlug
                      ? `/newsletters/${publishedSlug}`
                      : null;
                    const typeLabel = current?.newsletterType
                      ? newsletterTypeLabels[current.newsletterType] ||
                        current.newsletterType
                      : "Newsletter";

                    return (
                      <Card
                        border
                        key={route.id}
                        padding={4}
                        radius={2}
                        shadow={1}
                      >
                        <div className={styles.newsletterRow}>
                          <Stack gap={3}>
                            <Flex align="center" gap={2} wrap="wrap">
                              <Badge tone={status.tone}>{status.label}</Badge>
                              {current?.hideFromIndex ? (
                                <Badge tone="default">
                                  Hidden from listing
                                </Badge>
                              ) : null}
                            </Flex>
                            <Stack gap={2}>
                              <Heading as="h3" size={1}>
                                {current?.title || "Untitled newsletter"}
                              </Heading>
                              <Text muted size={1}>
                                {typeLabel} ·{" "}
                                {formatPublicationDate(current?.publishDate)}
                              </Text>
                            </Stack>
                          </Stack>

                          <Stack gap={2}>
                            <Text muted size={0} weight="medium">
                              WEBSITE PATH
                            </Text>
                            {displayedSlug ? (
                              <code className={styles.routePath}>
                                /newsletters/{displayedSlug}
                              </code>
                            ) : (
                              <Card padding={2} radius={1} tone="critical">
                                <Text size={1}>
                                  Generate a URL slug before publishing.
                                </Text>
                              </Card>
                            )}
                            {draftSlug &&
                            publishedSlug &&
                            draftSlug !== publishedSlug ? (
                              <Text muted size={0}>
                                Published path: /newsletters/{publishedSlug}
                              </Text>
                            ) : null}
                          </Stack>

                          <Flex
                            align="center"
                            className={styles.actions}
                            gap={2}
                            justify="flex-end"
                            wrap="wrap"
                          >
                            <IntentLink
                              className={styles.actionLink}
                              intent="edit"
                              params={{
                                id: route.id,
                                type: "newsletter",
                              }}
                            >
                              <EditIcon />
                              <span>Edit</span>
                            </IntentLink>
                            {previewPath ? (
                              <a
                                className={styles.actionLink}
                                href={`/studio/presentation?preview=${encodeURIComponent(
                                  previewPath,
                                )}`}
                              >
                                <DocumentsIcon />
                                <span>Preview</span>
                              </a>
                            ) : null}
                            {publicPath ? (
                              <a
                                className={styles.actionLink}
                                href={publicPath}
                                rel="noreferrer"
                                target="_blank"
                              >
                                <LaunchIcon />
                                <span>Open page</span>
                              </a>
                            ) : null}
                          </Flex>
                        </div>
                      </Card>
                    );
                  })}
                </Stack>
              ) : null}
            </Stack>
          </section>

          <Card border padding={4} radius={2} tone="primary">
            <Text size={1}>
              New newsletters use{" "}
              <code className={styles.inlineCode}>
                /newsletters/your-url-slug
              </code>
              . Publishing makes that address public; turning on{" "}
              <strong>Hide from newsletter listing</strong> keeps it out of the
              home page and navigation while preserving the direct URL.
            </Text>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}

export const siteMapTool: Tool = {
  component: SiteMapTool,
  controlsDocumentTitle: true,
  icon: EarthGlobeIcon,
  name: "site-map",
  title: "Site Map",
};
