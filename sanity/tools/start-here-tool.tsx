"use client";

import {
  AddDocumentIcon,
  ChartUpwardIcon,
  CheckmarkCircleIcon,
  ClockIcon,
  ComposeIcon,
  DashboardIcon,
  DocumentsIcon,
  EarthGlobeIcon,
  EditIcon,
  PinIcon,
  ProjectsIcon,
  RefreshIcon,
  WarningOutlineIcon,
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
import { useClient, useDataset } from "sanity";
import { IntentLink } from "sanity/router";
import { apiVersion } from "../env";
import {
  buildNewsletterRoutes,
  formatPublicationDate,
  getCurrentNewsletter,
  getMissingNewsletterFields,
  getRouteStatus,
  NEWSLETTER_WORKFLOW_QUERY,
  newsletterTypeLabels,
  type NewsletterDocument,
  type NewsletterRoute,
} from "./newsletter-workflow";
import styles from "./start-here-tool.module.css";

const newsletterTemplates = [
  {
    description: "A metrics-led mid-year or annual missions report.",
    icon: ChartUpwardIcon,
    id: "global-impact-newsletter",
    schemaType: "newsletter",
    title: "Global Impact Report",
  },
  {
    description: "A quick field update from one country or ministry.",
    icon: EarthGlobeIcon,
    id: "field-update-post",
    schemaType: "post",
    title: "Field Update",
  },
  {
    description: "A visual field report centered on one mission trip.",
    icon: PinIcon,
    id: "mission-trip-post",
    schemaType: "post",
    title: "Mission Trip Highlight",
  },
  {
    description: "Progress, stories, images, prayer, and next steps.",
    icon: ProjectsIcon,
    id: "project-update-post",
    schemaType: "post",
    title: "Project Update",
  },
] as const;

const workspaceLinks = [
  {
    description: "Edit pages visually on the live site. The best place to make changes.",
    href: "/studio/presentation",
    icon: ComposeIcon,
    title: "Preview and Edit",
  },
  {
    description: "Browse and edit every content item in a form view.",
    href: "/studio/structure",
    icon: DocumentsIcon,
    title: "Content library",
  },
  {
    description: "See each page and its public website address.",
    href: "/studio/site-map",
    icon: EarthGlobeIcon,
    title: "Site Map",
  },
] as const;

function formatUpdatedAt(value?: string) {
  if (!value) {
    return "Update time unavailable";
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return `Updated ${new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(parsed)}`;
}

function getTypeLabel(route: NewsletterRoute) {
  const type = getCurrentNewsletter(route)?.newsletterType;

  return type ? newsletterTypeLabels[type] || type : "Newsletter";
}

function NewsletterItem({
  detail,
  route,
}: {
  detail?: string;
  route: NewsletterRoute;
}) {
  const current = getCurrentNewsletter(route);
  const status = getRouteStatus(route);
  const previewPath = current?.slug
    ? `/newsletters/${current.slug}`
    : null;

  return (
    <Card border padding={3} radius={2}>
      <div className={styles.newsletterItem}>
        <Stack gap={2}>
          <Flex align="center" gap={2} wrap="wrap">
            <Badge tone={status.tone}>{status.label}</Badge>
            <Text muted size={0}>
              {getTypeLabel(route)}
            </Text>
          </Flex>
          <Heading as="h3" size={1}>
            {current?.title || "Untitled newsletter"}
          </Heading>
          <Text muted size={1}>
            {detail ||
              `${formatPublicationDate(current?.publishDate)} · ${formatUpdatedAt(
                current?._updatedAt,
              )}`}
          </Text>
        </Stack>
        <Flex align="center" gap={2}>
          {previewPath ? (
            <a
              aria-label={`Edit ${current?.title || "untitled newsletter"} in Preview and Edit`}
              className={styles.iconButton}
              href={`/studio/presentation?preview=${encodeURIComponent(
                previewPath,
              )}`}
              title="Edit in Preview and Edit"
            >
              <EditIcon />
            </a>
          ) : null}
          <IntentLink
            aria-label={`Open ${current?.title || "untitled newsletter"} in the form editor`}
            className={styles.iconButton}
            intent="edit"
            params={{ id: route.id, type: "newsletter" }}
            title="Open in the form editor"
          >
            <DocumentsIcon />
          </IntentLink>
        </Flex>
      </div>
    </Card>
  );
}

function EmptyQueue({ children }: { children: string }) {
  return (
    <Card border padding={4} radius={2} tone="transparent">
      <Text muted size={1}>
        {children}
      </Text>
    </Card>
  );
}

function StartHereTool() {
  const dataset = useDataset();
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
        const documents = await rawClient.fetch<NewsletterDocument[]>(
          NEWSLETTER_WORKFLOW_QUERY,
        );
        setRoutes(buildNewsletterRoutes(documents));
        setError(null);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load newsletter activity.",
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
            : "Unable to load newsletter activity.",
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
            "Live updates disconnected. Refresh this page to load the latest activity.",
          );
        },
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [loadRoutes, rawClient]);

  const recentRoutes = [...routes]
    .sort((left, right) => {
      const leftUpdated = getCurrentNewsletter(left)?._updatedAt || "";
      const rightUpdated = getCurrentNewsletter(right)?._updatedAt || "";

      return rightUpdated.localeCompare(leftUpdated);
    })
    .slice(0, 5);
  const needsAttention = routes
    .filter(
      (route) =>
        route.draft && getMissingNewsletterFields(route.draft).length > 0,
    )
    .slice(0, 5);
  const readyForReview = routes
    .filter(
      (route) =>
        route.draft && getMissingNewsletterFields(route.draft).length === 0,
    )
    .slice(0, 5);

  return (
    <div className={styles.page}>
      <Container width={5}>
        <Stack gap={7}>
          <Flex
            align="flex-start"
            gap={4}
            justify="space-between"
            wrap="wrap"
          >
            <Stack gap={3}>
              <Flex align="center" gap={3}>
                <DashboardIcon className={styles.titleIcon} />
                <Heading as="h1" size={4}>
                  Start Here
                </Heading>
              </Flex>
              <Text muted size={1}>
                Create a newsletter from a guided template, continue an edit,
                or check what needs attention.
              </Text>
              <Flex>
                <Badge
                  tone={dataset === "production" ? "caution" : "primary"}
                >
                  {dataset === "production"
                    ? "Production workspace"
                    : `${dataset} workspace`}
                </Badge>
              </Flex>
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

          <section aria-labelledby="create-newsletter-heading">
            <Stack gap={4}>
              <Stack gap={2}>
                <Heading as="h2" id="create-newsletter-heading" size={2}>
                  Create a Newsletter
                </Heading>
                <Text muted size={1}>
                  Choose the format that best matches the story. The essential
                  sections will be added for you.
                </Text>
              </Stack>
              <div className={styles.templateGrid}>
                {newsletterTemplates.map((template) => {
                  const Icon = template.icon;

                  return (
                    <IntentLink
                      className={styles.templateCard}
                      intent="create"
                      key={template.id}
                      params={{
                        template: template.id,
                        type: template.schemaType,
                      }}
                    >
                      <Flex align="flex-start" gap={3}>
                        <span className={styles.templateIcon}>
                          <Icon />
                        </span>
                        <Stack gap={2}>
                          <Heading as="h3" size={1}>
                            {template.title}
                          </Heading>
                          <Text muted size={1}>
                            {template.description}
                          </Text>
                        </Stack>
                      </Flex>
                      <Flex align="center" gap={2}>
                        <AddDocumentIcon />
                        <Text size={1} weight="semibold">
                          Start this newsletter
                        </Text>
                      </Flex>
                    </IntentLink>
                  );
                })}
              </div>
            </Stack>
          </section>

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
                  Loading newsletter activity
                </Text>
              </Flex>
            </Card>
          ) : null}

          {!loading ? (
            <div className={styles.workflowGrid}>
              <section aria-labelledby="recent-heading">
                <Stack gap={4}>
                  <Flex align="center" gap={2}>
                    <ClockIcon className={styles.sectionIcon} />
                    <Heading as="h2" id="recent-heading" size={2}>
                      Continue Working
                    </Heading>
                  </Flex>
                  {recentRoutes.length > 0 ? (
                    <Stack gap={2}>
                      {recentRoutes.map((route) => (
                        <NewsletterItem key={route.id} route={route} />
                      ))}
                    </Stack>
                  ) : (
                    <EmptyQueue>
                      Your recently edited newsletters will appear here.
                    </EmptyQueue>
                  )}
                </Stack>
              </section>

              <Stack gap={6}>
                <section aria-labelledby="attention-heading">
                  <Stack gap={4}>
                    <Flex align="center" gap={2}>
                      <WarningOutlineIcon className={styles.sectionIcon} />
                      <Heading as="h2" id="attention-heading" size={2}>
                        Needs Attention
                      </Heading>
                    </Flex>
                    {needsAttention.length > 0 ? (
                      <Stack gap={2}>
                        {needsAttention.map((route) => {
                          const missing = getMissingNewsletterFields(
                            route.draft,
                          );

                          return (
                            <NewsletterItem
                              detail={`Add: ${missing.join(", ")}`}
                              key={route.id}
                              route={route}
                            />
                          );
                        })}
                      </Stack>
                    ) : (
                      <EmptyQueue>
                        No incomplete newsletter drafts right now.
                      </EmptyQueue>
                    )}
                  </Stack>
                </section>

                <section aria-labelledby="review-heading">
                  <Stack gap={4}>
                    <Flex align="center" gap={2}>
                      <CheckmarkCircleIcon className={styles.sectionIcon} />
                      <Heading as="h2" id="review-heading" size={2}>
                        Ready for Review
                      </Heading>
                    </Flex>
                    {readyForReview.length > 0 ? (
                      <Stack gap={2}>
                        {readyForReview.map((route) => (
                          <NewsletterItem
                            detail="Core content is complete. Preview and review before publishing."
                            key={route.id}
                            route={route}
                          />
                        ))}
                      </Stack>
                    ) : (
                      <EmptyQueue>
                        Complete a draft&apos;s core fields to move it here.
                      </EmptyQueue>
                    )}
                  </Stack>
                </section>
              </Stack>
            </div>
          ) : null}

          <section aria-labelledby="workspace-heading">
            <Stack gap={4}>
              <Stack gap={2}>
                <Heading as="h2" id="workspace-heading" size={2}>
                  Explore the Workspace
                </Heading>
                <Text muted size={1}>
                  Use these views when you need more than the guided workflow.
                </Text>
              </Stack>
              <div className={styles.workspaceGrid}>
                {workspaceLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      className={styles.workspaceLink}
                      href={link.href}
                      key={link.href}
                    >
                      <Icon />
                      <Stack gap={2}>
                        <Text size={1} weight="semibold">
                          {link.title}
                        </Text>
                        <Text muted size={1}>
                          {link.description}
                        </Text>
                      </Stack>
                    </a>
                  );
                })}
              </div>
            </Stack>
          </section>
        </Stack>
      </Container>
    </div>
  );
}

export const startHereTool: Tool = {
  component: StartHereTool,
  controlsDocumentTitle: true,
  icon: DashboardIcon,
  name: "start",
  title: "Start Here",
};
