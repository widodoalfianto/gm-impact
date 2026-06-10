"use client";

import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { stegaClean } from "next-sanity";
import { Image } from "next-sanity/image";
import { useMemo, useState } from "react";
import {
  DISPLAY,
  SANS,
  SERIF,
  THEME,
  formatStatNumber,
  type CountryName,
  type FlagName,
  type StatArtKind,
} from "./data";
import {
  bodyStyle,
  h2Style,
  overline,
  titleAccent,
  titleTight,
} from "./typography";
import { CountryFlag, CountryMap, StatIllustration } from "./visuals";
import { useCountUpValues } from "./use-count-up-stats";
import { getCountryArtName } from "../../lib/gm-visual-library";
import { urlFor } from "../../sanity/lib/image";
import type {
  CmsActionLink,
  CmsBlock,
  CmsCountryImpact,
  CmsImage,
  CmsMetric,
} from "../../sanity/lib/types";

const knownCountries: readonly CountryName[] = [
  "Nepal",
  "Algeria",
  "Indonesia",
  "Afghanistan",
  "Somalia",
];

function isKnownCountry(name: string): name is CountryName {
  return knownCountries.includes(name as CountryName);
}

// Renders an accentTitle (portable text) inline, with admin-marked "accent"
// words highlighted. Use inside an existing heading element (hero, grids).
export function AccentText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) {
    return null;
  }

  return (
    <PortableText
      value={value}
      components={{
        block: ({ children }) => <>{children}</>,
        marks: {
          accent: ({ children }) => (
            <em className="gm-cms-accent">{children}</em>
          ),
        },
      }}
    />
  );
}

// Renders an accentTitle as a standalone <h2> for the standard section blocks.
function AccentTitle({
  value,
  className,
}: {
  value?: PortableTextBlock[];
  className?: string;
}) {
  if (!value?.length) {
    return null;
  }

  return (
    <h2 className={className}>
      <AccentText value={value} />
    </h2>
  );
}

function ActionLinks({ actions }: { actions?: CmsActionLink[] }) {
  if (!actions?.length) {
    return null;
  }

  return (
    <div className="gm-cms-actions">
      {actions.map((action, index) => (
        <a
          key={action._key ?? index}
          href={stegaClean(action.url)}
          className={`gm-hero-action ${
            stegaClean(action.style) === "secondary"
              ? "gm-hero-secondary"
              : "gm-hero-primary"
          }`}
        >
          {action.label}
        </a>
      ))}
    </div>
  );
}

export function CmsImageView({
  image,
  className,
}: {
  image: CmsImage;
  className?: string;
}) {
  return (
    <Image
      className={className}
      src={urlFor(image).width(1600).height(1000).fit("crop").url()}
      alt={image.alt || ""}
      width={1600}
      height={1000}
      sizes="(max-width: 760px) 100vw, 900px"
    />
  );
}

function MetricGrid({ metrics }: { metrics?: CmsMetric[] }) {
  if (!metrics?.length) {
    return null;
  }

  return (
    <div className="gm-cms-metric-grid">
      {metrics.map((metric) => (
        <div className="gm-cms-metric" key={metric._key}>
          {metric.art ? (
            <StatIllustration
              kind={stegaClean(metric.art) as StatArtKind}
              label={metric.label}
            />
          ) : null}
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  );
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(stegaClean(url));
    const id =
      parsed.hostname === "youtu.be"
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v");

    return id ? `https://www.youtube.com/embed/${id}` : null;
  } catch {
    return null;
  }
}

function StatsGrid({
  heading,
  intro,
  metrics: rawMetrics,
  anchorId,
}: {
  heading?: string;
  intro?: string;
  metrics?: CmsMetric[];
  anchorId?: string;
}) {
  const metrics = useMemo<CmsMetric[]>(
    () =>
      (rawMetrics ?? []).map((metric) => ({
        ...metric,
        value: metric.value ? stegaClean(metric.value) : "",
        art: metric.art ? stegaClean(metric.art) : undefined,
      })),
    [rawMetrics],
  );
  const values = useMemo(() => metrics.map((metric) => metric.value), [metrics]);
  const { animatedStats, statsRef, targets } = useCountUpValues(values);

  return (
    <section
      id={anchorId}
      ref={statsRef}
      style={{ background: THEME.accentLight, padding: "56px 28px 48px" }}
    >
      {heading ? (
        <p
          style={{
            textAlign: "center",
            fontFamily: SANS,
            fontSize: 13,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: THEME.textMuted,
            marginBottom: intro ? 16 : 52,
          }}
        >
          {heading}
        </p>
      ) : null}
      {intro ? (
        <p style={{ ...bodyStyle, textAlign: "center", maxWidth: 680, margin: "0 auto 44px" }}>
          {intro}
        </p>
      ) : null}
      <div className="gm-stats-grid">
        {metrics.map((metric, index) => (
          <div key={metric._key} className="gm-stat-card">
            {metric.art ? (
              <StatIllustration
                kind={metric.art as StatArtKind}
                label={metric.label}
              />
            ) : null}
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(42px, 4.8vw, 64px)",
                fontWeight: 400,
                color: THEME.stat,
                lineHeight: 1,
                marginBottom: 10,
                fontKerning: "normal",
                fontFeatureSettings: "\"kern\" 1",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: 0,
                whiteSpace: "nowrap",
                width: "100%",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  minWidth: `${Math.max(metric.value.length, 4)}ch`,
                  textAlign: "center",
                }}
              >
                {formatStatNumber(
                  animatedStats[index] ?? 0,
                  targets[index]?.suffix ?? "",
                )}
              </span>
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: THEME.textMuted,
                letterSpacing: "0.04em",
              }}
            >
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountryCard({
  region,
  open,
  toggle,
}: {
  region: CmsCountryImpact;
  open: boolean;
  toggle: () => void;
}) {
  const countryName = region.country?.name;
  const cleanCountryName = countryName ? stegaClean(countryName) : undefined;
  const cleanVisualKey = region.country?.visualKey
    ? stegaClean(region.country.visualKey)
    : undefined;
  const selectedArtName =
    getCountryArtName(cleanVisualKey) ??
    (cleanCountryName && isKnownCountry(cleanCountryName)
      ? cleanCountryName
      : undefined);
  const canIllustrate =
    Boolean(selectedArtName) && region.showArtwork !== false;

  return (
    <div
      className={`gm-region-card${open ? " is-open" : ""}`}
      onClick={toggle}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 18,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 32,
              fontWeight: 400,
              color: THEME.text,
              lineHeight: 0.95,
              ...titleTight,
            }}
          >
            {countryName}
          </div>
          <div
            style={{
              fontSize: 13,
              color: THEME.textMuted,
              fontWeight: 400,
              marginTop: 8,
            }}
          >
            {region.subtitle}
          </div>
        </div>
        {canIllustrate ? (
          <CountryFlag name={selectedArtName as FlagName} />
        ) : null}
      </div>
      <div
        style={{
          height: 104,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        {canIllustrate ? (
          <CountryMap
            name={selectedArtName as CountryName}
            color={THEME.heroAccent}
          />
        ) : null}
      </div>
      {!open ? (
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "space-around",
          }}
        >
          {region.metrics?.map((metric) => (
            <div key={metric._key} style={{ textAlign: "center", flex: 1 }}>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 34,
                  fontWeight: 400,
                  color: THEME.stat,
                  lineHeight: 1,
                  marginBottom: 5,
                  ...titleTight,
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: THEME.textMuted,
                  fontWeight: 400,
                  lineHeight: 1.35,
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <ul
            style={{
              margin: "0 auto",
              padding: "0 0 0 18px",
              fontSize: 16,
              lineHeight: 1.75,
              color: THEME.textSub,
              textAlign: "left",
              maxWidth: 280,
            }}
          >
            {region.highlights?.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          {region.mediaLabel && region.mediaUrl ? (
            <a
              href={stegaClean(region.mediaUrl)}
              className="gm-text-link gm-region-media-link"
              onClick={(event) => event.stopPropagation()}
            >
              {region.mediaLabel} →
            </a>
          ) : null}
        </>
      )}
      <div className="gm-region-toggle">
        {open ? "↑ Show Less" : "See Details →"}
      </div>
    </div>
  );
}

function CountryGrid({
  section,
}: {
  section: Extract<CmsBlock, { _type: "countryGridSection" }>;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section
      id="regions"
      style={{ padding: "48px 28px 92px", background: THEME.accentLight }}
    >
      <div style={{ maxWidth: 1020, margin: "0 auto" }}>
        <div style={{ marginBottom: 60, textAlign: "center" }}>
          <span style={overline}>{section.eyebrow}</span>
          <h2 style={h2Style}>
            <AccentText value={section.heading} />
            {section.accentHeading ? (
              <>
                <br />
                <em style={titleAccent}>{section.accentHeading}</em>
              </>
            ) : null}
          </h2>
        </div>
        <div className="gm-regions-grid">
          {section.regions?.map((region, index) => (
            <CountryCard
              key={region._key}
              region={region}
              open={expanded === index}
              toggle={() =>
                setExpanded((current) => (current === index ? null : index))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerCurve() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "clamp(86px, 11vw, 150px)",
        background: THEME.accentLight,
        overflow: "hidden",
        marginTop: -2,
        marginBottom: -2,
      }}
    >
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <path
          d="M0 180 L0 58 C190 106 388 138 625 90 C830 48 1012 38 1216 78 C1304 95 1378 112 1440 118 L1440 180 Z"
          fill={THEME.bg}
        />
      </svg>
    </div>
  );
}

function PartnerGrid({
  section,
}: {
  section: Extract<CmsBlock, { _type: "partnerGridSection" }>;
}) {
  return (
    <section
      id="planters-giving"
      style={{ padding: "72px 28px 96px", background: THEME.bg }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <span style={overline}>{section.eyebrow}</span>
        <h2 style={h2Style}>
          <AccentText value={section.heading} />
        </h2>
        <p style={{ ...bodyStyle, marginBottom: 48 }}>{section.intro}</p>
        <div className="gm-cta-grid">
          {section.cards?.map((card) => (
            <div key={card._key} className="gm-cta-panel">
              <h3
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(32px, 4.5vw, 52px)",
                  fontWeight: 400,
                  lineHeight: 1,
                  margin: "0 0 16px",
                  color: THEME.text,
                  ...titleTight,
                }}
              >
                {card.heading}
              </h3>
              <p
                style={{
                  color: THEME.textSub,
                  fontSize: 18,
                  lineHeight: 1.55,
                  margin: "0 auto 28px",
                  maxWidth: 400,
                }}
              >
                {card.description}
              </p>
              <a
                href={stegaClean(card.buttonUrl)}
                className="gm-primary-button"
              >
                {card.buttonLabel} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const DIVIDER_PATHS = {
  soft: "M0 180 L0 148 C270 148 440 122 650 76 C900 22 1135 8 1440 0 L1440 180 Z",
  wave: "M0 180 L0 58 C190 106 388 138 625 90 C830 48 1012 38 1216 78 C1304 95 1378 112 1440 118 L1440 180 Z",
} as const;

function SectionDivider({
  kind,
  position,
}: {
  kind: "soft" | "wave";
  position: "top" | "bottom";
}) {
  const isTop = position === "top";

  return (
    <div
      aria-hidden="true"
      style={{
        height: "clamp(86px, 11vw, 150px)",
        overflow: "hidden",
        // The band is the page color above the section and the accent color
        // below it; the curve fills the rest so the accent band reads as
        // flowing into and out of the surrounding page.
        background: isTop ? THEME.bg : THEME.accentLight,
        [isTop ? "marginBottom" : "marginTop"]: -1,
      }}
    >
      <svg
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <path
          d={DIVIDER_PATHS[kind]}
          fill={isTop ? THEME.accentLight : THEME.bg}
        />
      </svg>
    </div>
  );
}

export function CmsBlockView({ section }: { section: CmsBlock }) {
  const accent = stegaClean(section.background) === "accent";
  const top = accent ? stegaClean(section.topDivider) : "none";
  const bottom = accent ? stegaClean(section.bottomDivider) : "none";

  return (
    <div className={accent ? "gm-cms-block gm-cms-block-accent" : "gm-cms-block"}>
      {top === "soft" || top === "wave" ? (
        <SectionDivider kind={top} position="top" />
      ) : null}
      <CmsBlockBody section={section} />
      {bottom === "soft" || bottom === "wave" ? (
        <SectionDivider kind={bottom} position="bottom" />
      ) : null}
    </div>
  );
}

function CmsBlockBody({ section }: { section: CmsBlock }) {
  switch (section._type) {
    case "heroBlock":
      return (
        <section className="gm-cms-section gm-cms-hero-block">
          <div className="gm-cms-section-inner">
            {section.eyebrow ? <span>{section.eyebrow}</span> : null}
            <AccentTitle value={section.heading} />
            {section.body ? <p>{section.body}</p> : null}
            {section.image ? (
              <div className="gm-cms-hero-image">
                <CmsImageView image={section.image} />
              </div>
            ) : null}
            <ActionLinks actions={section.actions} />
          </div>
        </section>
      );
    case "richTextBlock":
      return (
        <section className="gm-cms-section">
          <div className="gm-cms-section-inner">
            <AccentTitle value={section.heading} />
            {section.body ? (
              <div className="gm-cms-rich-text">
                <PortableText value={section.body} />
              </div>
            ) : null}
          </div>
        </section>
      );
    case "imageTextBlock":
      return (
        <section className="gm-cms-section">
          <div
            className={`gm-cms-story${section.image ? " has-image" : ""} gm-cms-imagetext image-${stegaClean(
              section.imagePosition,
            )}`}
          >
            <div>
              {section.eyebrow ? <span>{section.eyebrow}</span> : null}
              <AccentTitle value={section.heading} />
              {section.body ? (
                <div className="gm-cms-rich-text">
                  <PortableText value={section.body} />
                </div>
              ) : null}
              {section.action ? (
                <ActionLinks actions={[section.action]} />
              ) : null}
            </div>
            {section.image ? (
              <CmsImageView image={section.image} className="gm-cms-story-image" />
            ) : null}
          </div>
        </section>
      );
    case "faqBlock":
      return (
        <section className="gm-cms-section gm-cms-faq">
          <div className="gm-cms-section-inner">
            <AccentTitle value={section.heading} />
            <div className="gm-cms-faq-list">
              {section.items?.map((item) => (
                <details key={item._key}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      );
    case "logoStripBlock":
      return (
        <section className="gm-cms-section">
          <div className="gm-cms-section-inner">
            <AccentTitle value={section.heading} />
            <div className="gm-cms-logos">
              {section.logos?.map((logo) => {
                const image = (
                  <Image
                    src={urlFor(logo.image).height(120).fit("max").url()}
                    alt={logo.image.alt || ""}
                    width={200}
                    height={120}
                  />
                );

                return logo.url ? (
                  <a key={logo._key} href={stegaClean(logo.url)}>
                    {image}
                  </a>
                ) : (
                  <span key={logo._key}>{image}</span>
                );
              })}
            </div>
          </div>
        </section>
      );
    case "statsBannerBlock":
      return (
        <StatsGrid
          heading={section.heading}
          intro={section.intro}
          metrics={section.metrics}
        />
      );
    case "embedBlock":
      return (
        <section className="gm-cms-section">
          <div className="gm-cms-section-inner">
            <AccentTitle value={section.heading} />
            {section.description ? <p>{section.description}</p> : null}
            <div className="gm-cms-video">
              <iframe
                src={stegaClean(section.url)}
                title="Embedded content"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      );
    case "impactGrid":
      return (
        <StatsGrid
          heading={section.heading}
          intro={section.intro}
          metrics={section.metrics}
          anchorId="impact"
        />
      );
    case "countryGridSection":
      return <CountryGrid section={section} />;
    case "partnerGridSection":
      return (
        <>
          <PartnerCurve />
          <PartnerGrid section={section} />
        </>
      );
    case "storySection":
      return (
        <section className="gm-cms-section">
          <div
            className={`gm-cms-story${section.image ? " has-image" : ""}`}
          >
            <div>
              {section.eyebrow ? <span>{section.eyebrow}</span> : null}
              <AccentTitle value={section.heading} />
              {section.body ? (
                <div className="gm-cms-rich-text">
                  <PortableText value={section.body} />
                </div>
              ) : null}
              <MetricGrid metrics={section.metrics} />
            </div>
            {section.image ? (
              <CmsImageView image={section.image} className="gm-cms-story-image" />
            ) : null}
          </div>
        </section>
      );
    case "quoteSection":
      return (
        <section className="gm-cms-section gm-cms-quote">
          <blockquote>
            <p>&ldquo;{section.quote}&rdquo;</p>
            <footer>
              {section.attribution}
              {section.context ? `, ${section.context}` : ""}
            </footer>
          </blockquote>
        </section>
      );
    case "gallerySection":
      return (
        <section className="gm-cms-section">
          <div className="gm-cms-section-inner">
            <AccentTitle value={section.heading} />
            <div className="gm-cms-gallery">
              {section.images?.map((image) => (
                <figure key={image._key}>
                  <CmsImageView image={image} />
                  {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      );
    case "videoSection": {
      const embedUrl = getYouTubeEmbedUrl(section.url);

      return (
        <section className="gm-cms-section">
          <div className="gm-cms-section-inner">
            <AccentTitle value={section.heading} />
            {section.description ? <p>{section.description}</p> : null}
            {embedUrl ? (
              <div className="gm-cms-video">
                <iframe
                  src={embedUrl}
                  title="Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                className="gm-primary-button"
                href={stegaClean(section.url)}
              >
                Watch the video
              </a>
            )}
          </div>
        </section>
      );
    }
    case "prayerSection":
      return (
        <section className="gm-cms-section gm-cms-prayer">
          <div className="gm-cms-section-inner">
            <AccentTitle value={section.heading} />
            <ul>
              {section.items?.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>
      );
    case "callToActionSection":
      return (
        <section className="gm-cms-section gm-cms-cta">
          <div className="gm-cms-section-inner">
            <AccentTitle value={section.heading} />
            {section.description ? <p>{section.description}</p> : null}
            <a
              className="gm-primary-button"
              href={stegaClean(section.buttonUrl)}
            >
              {section.buttonLabel}
            </a>
          </div>
        </section>
      );
    default:
      return null;
  }
}
