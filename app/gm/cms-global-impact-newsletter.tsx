"use client";

import { stegaClean } from "next-sanity";
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
  heroLightTitle,
  overline,
  titleAccent,
  titleTight,
} from "./typography";
import { useCountUpValues } from "./use-count-up-stats";
import { CountryFlag, CountryMap, StatIllustration } from "./visuals";
import { CmsNewsletterSectionView } from "./cms-newsletter-sections";
import { getCountryArtName } from "../../lib/gm-visual-library";
import type {
  CmsCountryImpact,
  CmsMetric,
  CmsNewsletter,
  CmsNewsletterSection,
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

function HeroCurve() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "clamp(96px, 12vw, 170px)",
        background: THEME.heroBg,
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
          d="M0 180 L0 148 C270 148 440 122 650 76 C900 22 1135 8 1440 0 L1440 180 Z"
          fill={THEME.accentLight}
        />
      </svg>
    </div>
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

function ImpactSection({
  section,
}: {
  section: Extract<CmsNewsletterSection, { _type: "impactGrid" }>;
}) {
  const metrics = useMemo<CmsMetric[]>(
    () =>
      (section.metrics ?? []).map((metric) => ({
        ...metric,
        value: stegaClean(metric.value),
        art: metric.art ? stegaClean(metric.art) : undefined,
      })),
    [section.metrics],
  );
  const values = useMemo(
    () => metrics.map((metric) => metric.value),
    [metrics],
  );
  const { animatedStats, statsRef, targets } = useCountUpValues(values);

  return (
    <section
      id="impact"
      ref={statsRef}
      style={{
        background: THEME.accentLight,
        padding: "56px 28px 48px",
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontFamily: SANS,
          fontSize: 13,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: THEME.textMuted,
          marginBottom: 52,
        }}
      >
        {section.heading}
      </p>
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
  const canIllustrate = Boolean(selectedArtName);

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

function CountryGridSection({
  section,
}: {
  section: Extract<
    CmsNewsletterSection,
    { _type: "countryGridSection" }
  >;
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
            {section.heading}
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

function PartnerGridSection({
  section,
}: {
  section: Extract<
    CmsNewsletterSection,
    { _type: "partnerGridSection" }
  >;
}) {
  return (
    <section
      id="planters-giving"
      style={{ padding: "72px 28px 96px", background: THEME.bg }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <span style={overline}>{section.eyebrow}</span>
        <h2 style={h2Style}>{section.heading}</h2>
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

function PageBuilderSection({
  section,
}: {
  section: CmsNewsletterSection;
}) {
  switch (section._type) {
    case "impactGrid":
      return <ImpactSection section={section} />;
    case "countryGridSection":
      return <CountryGridSection section={section} />;
    case "partnerGridSection":
      return (
        <>
          <PartnerCurve />
          <PartnerGridSection section={section} />
        </>
      );
    default:
      return <CmsNewsletterSectionView section={section} />;
  }
}

export function CmsGlobalImpactNewsletter({
  newsletter,
}: {
  newsletter: CmsNewsletter;
}) {
  return (
    <main>
      <section
        id={`newsletter-${stegaClean(newsletter.publishDate).slice(0, 4)}`}
        style={{
          background: THEME.heroBg,
          color: THEME.navText,
          padding: "94px 28px 88px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative" }}>
          <h1
            style={{
              fontFamily: SANS,
              fontSize: "clamp(58px, 11vw, 132px)",
              fontWeight: 500,
              lineHeight: 0.92,
              margin: "0 auto 34px",
              maxWidth: 1120,
              color: THEME.navText,
              ...titleTight,
            }}
          >
            <span style={heroLightTitle}>{newsletter.heroHeading}</span>
            {newsletter.heroAccent ? (
              <>
                <br />
                <em
                  style={{
                    color: THEME.heroAccent,
                    fontFamily: DISPLAY,
                    fontStyle: "italic",
                    fontWeight: 400,
                    ...titleTight,
                  }}
                >
                  {newsletter.heroAccent}
                </em>
              </>
            ) : null}
          </h1>
          <p
            style={{
              fontSize: "clamp(20px, 2.6vw, 28px)",
              fontWeight: 300,
              lineHeight: 1.2,
              color: THEME.navText,
              maxWidth: 760,
              margin: "0 auto 52px",
            }}
          >
            {newsletter.summary}
          </p>
          {newsletter.heroActions?.length ? (
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {newsletter.heroActions.map((action) => (
                <a
                  key={action._key}
                  href={stegaClean(action.url)}
                  className={`gm-hero-action ${
                    stegaClean(action.style) === "secondary"
                      ? "gm-hero-secondary"
                      : "gm-hero-primary"
                  }`}
                >
                  {action.label}
                  {stegaClean(action.style) === "primary" ? " ↓" : ""}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <HeroCurve />

      {newsletter.sections?.map((section) => (
        <PageBuilderSection key={section._key} section={section} />
      ))}
    </main>
  );
}
