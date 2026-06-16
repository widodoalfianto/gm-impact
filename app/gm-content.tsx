"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  DISPLAY,
  GIVE_URL,
  REGIONS,
  SANS,
  SERIF,
  STAT_TARGETS,
  STATS,
  THEME,
  type NewsletterSummary,
  formatStatNumber,
} from "./gm/data";
import { AccentText } from "./gm/cms-newsletter-sections";
import { SiteFooter } from "./gm/footer";
import { ResponsiveNav } from "./gm/responsive-nav";
import "./gm/styles.css";
import { pageStyle } from "./gm/theme-vars";
import { bodyStyle, h2Style, heroLightTitle, overline, titleAccent, titleTight } from "./gm/typography";
import { useCountUpStats } from "./gm/use-count-up-stats";
import { CountryFlag, CountryMap, StatIllustration } from "./gm/visuals";
import type { CmsHome } from "../sanity/lib/types";

function NewsletterCardVisual({ newsletter }: { newsletter: NewsletterSummary }) {
  if (newsletter.image) {
    return (
      <Image
        src={newsletter.image.src}
        alt={newsletter.image.alt}
        fill
        sizes="(max-width: 980px) 100vw, 44vw"
        style={{ objectFit: "cover" }}
        priority={newsletter.year === "2026"}
      />
    );
  }

  return (
    <div className="gm-newsletter-placeholder" aria-hidden="true">
      <span className="gm-newsletter-placeholder-year">{newsletter.year}</span>
      <span className="gm-newsletter-placeholder-line" />
      <span className="gm-newsletter-placeholder-line is-short" />
      <span className="gm-newsletter-placeholder-accent" />
    </div>
  );
}

function NewsletterLandingCard({ newsletter }: { newsletter: NewsletterSummary }) {
  const T = THEME;

  return (
    <Link href={newsletter.href} className="gm-newsletter-card">
      <div className="gm-newsletter-image">
        <NewsletterCardVisual newsletter={newsletter} />
      </div>
      <div className="gm-newsletter-content">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18, marginBottom: 22 }}>
          <span style={{
            color: T.heroAccent,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}>{newsletter.label}</span>
          <div className="gm-country-flags" aria-label="Countries reached">
            {newsletter.countries.map((country) => (
              <CountryFlag key={country} name={country} />
            ))}
          </div>
        </div>
        <h2 style={{
          fontFamily: SERIF,
          fontSize: "clamp(34px, 5vw, 58px)",
          fontWeight: 400,
          lineHeight: 0.98,
          margin: "0 0 18px",
          color: T.text,
          ...titleTight,
        }}>
          {newsletter.title}
        </h2>
        <p style={{ color: T.textSub, fontSize: 18, lineHeight: 1.55, margin: 0 }}>
          {newsletter.snippet}
        </p>
        <div className="gm-newsletter-meta">
          {newsletter.chips.map((chip) => (
            <span key={chip} className="gm-newsletter-chip">{chip}</span>
          ))}
        </div>
        <span className="gm-text-link" style={{ fontSize: 16 }}>Read the {newsletter.year} Newsletter →</span>
      </div>
    </Link>
  );
}

function PartnerSection() {
  const T = THEME;

  return (
    <section id="planters-giving" style={{ padding: "72px 28px 96px", background: T.bg }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <span style={overline}>Partner With Us</span>
        <h2 style={h2Style}>Join the mission beyond the newsletter.</h2>
        <p style={{ ...bodyStyle, marginBottom: 48 }}>
          Help sustain prayer, sending, discipleship, care, and church planting among unreached communities.
        </p>
        <div className="gm-cta-grid">
          <div className="gm-cta-panel">
            <h3 style={{
              fontFamily: SERIF,
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 400,
              lineHeight: 1,
              margin: "0 0 16px",
              color: T.text,
              ...titleTight,
            }}>Planters Program</h3>
            <p style={{ color: T.textSub, fontSize: 18, lineHeight: 1.55, margin: "0 auto 28px", maxWidth: 400 }}>
              Join a community of partners helping plant churches, care for pastors, and support long-term discipleship in unreached places.
            </p>
            <a href={GIVE_URL} className="gm-primary-button">
              Join the Planter Program →
            </a>
          </div>
          <div className="gm-cta-panel">
            <h3 style={{
              fontFamily: SERIF,
              fontSize: "clamp(32px, 4.5vw, 52px)",
              fontWeight: 400,
              lineHeight: 1,
              margin: "0 0 16px",
              color: T.text,
              ...titleTight,
            }}>Giving</h3>
            <p style={{ color: T.textSub, fontSize: 18, lineHeight: 1.55, margin: "0 auto 28px", maxWidth: 400 }}>
              Your generosity reaches the unreached by funding Bibles, medical care, discipleship, and church planting across five nations.
            </p>
            <a href={GIVE_URL} className="gm-primary-button">
              Give to Global Missions →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GlobalMissionsImpactPage({
  variant = "update",
  newsletters = [],
  home,
}: {
  variant?: "update" | "newsletter";
  newsletters?: readonly NewsletterSummary[];
  home?: CmsHome | null;
} = {}) {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { animatedStats, statsRef } = useCountUpStats();
  const T = THEME;
  const isNewsletterLanding = variant === "newsletter";

  return (
    <div className="gm-page" style={pageStyle}>
      <ResponsiveNav />

      {isNewsletterLanding ? (
      <>
      {/* ── NEWSLETTER INDEX ── */}
      <section id="newsletter" style={{
        background: T.bg,
        color: T.text,
        padding: "86px 28px 96px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <span style={overline}>{home?.eyebrow || "Newsletters"}</span>
          <h1 style={{
            fontFamily: SERIF,
            fontSize: "clamp(54px, 9vw, 112px)",
            fontWeight: 400,
            lineHeight: 0.92,
            margin: "0 auto 22px",
            maxWidth: 940,
            color: T.text,
            ...titleTight,
          }}>
            {home?.heading?.length ? (
              <AccentText value={home.heading} />
            ) : (
              "Global Missions Updates"
            )}
          </h1>
          <p style={{ ...bodyStyle, marginBottom: 48 }}>
            {home?.intro ||
              "Read the latest stories of sending, discipleship, care, and church planting among unreached communities."}
          </p>
          <div className="gm-newsletter-list">
            {newsletters.map((newsletter) => (
              <NewsletterLandingCard key={newsletter.href} newsletter={newsletter} />
            ))}
          </div>
        </div>
      </section>
      </>
      ) : (
      <>

      {/* ── HERO ── */}
      <section id="newsletter-2026" style={{
        background: T.heroBg, color: T.navText,
        padding: "94px 28px 88px",
        textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "none",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative" }}>
          <h1 style={{
            fontFamily: SANS,
            fontSize: "clamp(58px, 11vw, 132px)",
            fontWeight: 500, lineHeight: 0.92,
            margin: "0 auto 34px", maxWidth: 1120,
            color: T.navText,
            ...titleTight,
          }}>
            <span style={heroLightTitle}>Reaching the Unreached,</span><br />
            <em style={{ color: T.heroAccent, fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 400, ...titleTight }}>Across Five Nations</em>
          </h1>
          <p style={{
            fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 300, lineHeight: 1.2,
            color: T.navText,
            maxWidth: 760, margin: "0 auto 52px",
          }}>
            God is moving in Nepal, Algeria, Indonesia, Afghanistan, and Somalia. Here is what your partnership made possible in the first half of 2026.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#impact" className="gm-hero-action gm-hero-primary">See Our Impact ↓</a>
            <a href="#planters-giving" className="gm-hero-action gm-hero-secondary">Partner With Us</a>
          </div>
        </div>
      </section>

      <div aria-hidden="true" style={{
        height: "clamp(96px, 12vw, 170px)",
        background: T.heroBg,
        overflow: "hidden",
        marginTop: -2,
        marginBottom: -2,
      }}>
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "100%" }}>
          <path
            d="M0 180 L0 148 C270 148 440 122 650 76 C900 22 1135 8 1440 0 L1440 180 Z"
            fill={T.accentLight}
          />
        </svg>
      </div>

      {/* ── GLOBAL STATS ── */}
      <section id="impact" ref={statsRef} style={{
        background: T.accentLight, padding: "56px 28px 48px",
        }}>
        <p style={{
          textAlign: "center", fontFamily: SANS,
          fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase",
          fontWeight: 600, color: T.textMuted, marginBottom: 52,
        }}>Global Impact · First Half of 2026</p>
        <div className="gm-stats-grid">
          {STATS.map(({ num, label, art }, index) => (
            <div key={label} className="gm-stat-card">
              <StatIllustration kind={art} label={label} />
              <div style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(42px, 4.8vw, 64px)",
                fontWeight: 400, color: T.stat,
                lineHeight: 1, marginBottom: 10,
                fontKerning: "normal",
                fontFeatureSettings: "\"kern\" 1",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: 0,
                whiteSpace: "nowrap",
                width: "100%",
              }}>
                <span style={{ display: "inline-block", minWidth: `${Math.max(num.length, 4)}ch`, textAlign: "center" }}>
                  {formatStatNumber(animatedStats[index] ?? 0, STAT_TARGETS[index].suffix)}
                </span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 400, color: T.textMuted, letterSpacing: "0.04em" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── REGIONS ── */}
      <section id="regions" style={{ padding: "48px 28px 92px", background: T.accentLight }}>
        <div style={{ maxWidth: 1020, margin: "0 auto" }}>
          <div style={{ marginBottom: 60, textAlign: "center" }}>
            <span style={overline}>Where We Work</span>
            <h2 style={h2Style}>
              Five Nations.<br />
              <em style={titleAccent}>One Mission.</em>
            </h2>
          </div>
          <div className="gm-regions-grid">
            {REGIONS.map((r, i) => {
              const open = expanded === i;
              return (
                <div key={r.name}
                  className={`gm-region-card${open ? " is-open" : ""}`}
                  onClick={() => setExpanded(open ? null : i)}
                  onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                    if (event.target !== event.currentTarget) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setExpanded(open ? null : i);
                    }
                  }}
                  role="button"
                  tabIndex={0}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: SERIF, fontSize: 32, fontWeight: 400, color: T.text, lineHeight: 0.95, ...titleTight }}>{r.name}</div>
                      <div style={{ fontSize: 13, color: T.textMuted, fontWeight: 400, marginTop: 8 }}>{r.sub}</div>
                    </div>
                    <CountryFlag name={r.name} />
                  </div>
                  <div style={{ height: 104, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                    <CountryMap name={r.name} color={T.heroAccent} />
                  </div>
                  {!open && (
                    <div style={{
                      display: "flex", gap: 10, justifyContent: "space-around",
                    }}>
                      {r.stats.map(({ n, l }) => (
                        <div key={l} style={{ textAlign: "center", flex: 1 }}>
                          <div style={{ fontFamily: SERIF, fontSize: 34, fontWeight: 400, color: T.stat, lineHeight: 1, marginBottom: 5, ...titleTight }}>{n}</div>
                          <div style={{ fontSize: 12, color: T.textMuted, fontWeight: 400, lineHeight: 1.35 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {open && (
                    <>
                      <ul style={{ margin: "0 auto", padding: "0 0 0 18px", fontSize: 16, lineHeight: 1.75, color: T.textSub, textAlign: "left", maxWidth: 280 }}>
                        {r.bullets.map(b => <li key={b}>{b}</li>)}
                      </ul>
                      <a
                        href={r.mediaHref}
                        className="gm-text-link gm-region-media-link"
                        onClick={(event: React.MouseEvent<HTMLAnchorElement>) => event.stopPropagation()}
                      >
                        Placeholder for videos →
                      </a>
                    </>
                  )}
                  <div className="gm-region-toggle">
                    {open ? "↑ Show Less" : "See Details →"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div aria-hidden="true" style={{
        height: "clamp(86px, 11vw, 150px)",
        background: T.accentLight,
        overflow: "hidden",
        marginTop: -2,
        marginBottom: -2,
      }}>
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "100%" }}>
          <path
            d="M0 180 L0 58 C190 106 388 138 625 90 C830 48 1012 38 1216 78 C1304 95 1378 112 1440 118 L1440 180 Z"
            fill={T.bg}
          />
        </svg>
      </div>

      <PartnerSection />
      </>
      )}

      <SiteFooter />
    </div>
  );
}

export function NewsletterLandingPage({
  newsletters = [],
  home,
}: {
  newsletters?: readonly NewsletterSummary[];
  home?: CmsHome | null;
} = {}) {
  return (
    <GlobalMissionsImpactPage
      variant="newsletter"
      newsletters={newsletters}
      home={home}
    />
  );
}

export default GlobalMissionsImpactPage;
