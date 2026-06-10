"use client";

import { stegaClean } from "next-sanity";
import { DISPLAY, SANS, THEME } from "./data";
import { heroLightTitle, titleTight } from "./typography";
import { CmsBlockView } from "./cms-newsletter-sections";
import type { CmsNewsletter } from "../../sanity/lib/types";

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
        <CmsBlockView key={section._key} section={section} />
      ))}
    </main>
  );
}
