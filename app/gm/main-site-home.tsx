import Image from "next/image";
import Link from "next/link";
import { DISPLAY, GIVE_URL, NEWSLETTERS, SANS, THEME, YOUTUBE_URL } from "./data";
import {
  ACTIVE_FIELDS,
  CURRENT_TRIPS,
  MAIN_HERO_STATS,
  MAIN_SITE_NAV,
  PLANTERS_GIVE_URL,
  PROJECT_AREAS,
  TAKEOVER_ACTIONS,
} from "./main-site-data";
import "./styles.css";
import { pageStyle } from "./theme-vars";
import { bodyStyle, h2Style, heroLightTitle, overline, titleTight } from "./typography";

export function MainSiteHomePage() {
  const T = THEME;
  const latestNewsletter = NEWSLETTERS[0];

  return (
    <div className="gm-page" style={pageStyle}>
      <header className="gm-main-nav">
        <Link href="/" className="gm-main-brand" style={titleTight}>
          Global Missions
        </Link>
        <nav className="gm-main-nav-links" aria-label="Main site sections">
          {MAIN_SITE_NAV.map((item) => (
            <a key={item.label} href={item.href} className="gm-nav-link">
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="gm-main-hero">
          <span style={overline}>IFGF Global Missions</span>
          <h1 className="gm-main-hero-title" style={{ ...titleTight, fontFamily: SANS }}>
            <span style={heroLightTitle}>A sending movement</span><br />
            <em style={{ color: T.heroAccent, fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 400, ...titleTight }}>
              for unreached places.
            </em>
          </h1>
          <p className="gm-main-hero-copy">
            We exist to mobilize prayer, people, and resources for discipleship, care, church planting, and long-term mission work among communities still waiting to hear.
          </p>
          <div className="gm-main-actions" aria-label="Primary actions">
            <a href={GIVE_URL} className="gm-hero-action gm-hero-primary">Give</a>
            <a href={PLANTERS_GIVE_URL} className="gm-hero-action gm-hero-secondary">Join Planters</a>
            <a href="#current-trips" className="gm-hero-action gm-hero-secondary">Current Trips</a>
          </div>
          <div className="gm-main-stat-row">
            {MAIN_HERO_STATS.map((stat) => (
              <div key={stat.label} className="gm-main-stat">
                <div className="gm-main-stat-value">{stat.value}</div>
                <div className="gm-main-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div aria-hidden="true" className="gm-main-curve gm-main-curve-to-tint">
          <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
            <path d="M0 180 L0 132 C238 156 426 132 645 80 C898 20 1150 9 1440 42 L1440 180 Z" fill={T.accentLight} />
          </svg>
        </div>

        <section id="who-we-are" className="gm-main-section gm-main-section-tint">
          <div className="gm-main-centered">
            <span style={overline}>Who We Are</span>
            <h2 style={h2Style}>Mission should feel close, clear, and actionable.</h2>
            <p style={bodyStyle}>
              This draft begins the main-site takeover by turning the old Wix site into a modern operating home for Global Missions: fewer pages, stronger stories, clearer next steps, and a structure ready for future CMS/admin editing.
            </p>
            <div className="gm-main-action-grid">
              {TAKEOVER_ACTIONS.map((action) => (
                <a key={action.title} href={action.href} className="gm-main-action-card">
                  <h3>{action.title}</h3>
                  <p>{action.body}</p>
                  <span>{action.cta} →</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="where-we-work" className="gm-main-section gm-main-section-tint gm-main-section-tight">
          <div className="gm-main-centered">
            <span style={overline}>Where We Work</span>
            <h2 style={h2Style}>A living map of mission relationships.</h2>
            <div className="gm-main-field-cloud" aria-label="Mission fields">
              {ACTIVE_FIELDS.map((field) => (
                <span key={field}>{field}</span>
              ))}
            </div>
          </div>
        </section>

        <div aria-hidden="true" className="gm-main-curve gm-main-curve-to-base">
          <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
            <path d="M0 180 L0 58 C190 106 388 138 625 90 C830 48 1012 38 1216 78 C1304 95 1378 112 1440 118 L1440 180 Z" fill={T.bg} />
          </svg>
        </div>

        <section id="projects" className="gm-main-section">
          <div className="gm-main-centered">
            <span style={overline}>Projects</span>
            <h2 style={h2Style}>Ways to partner beyond a single trip.</h2>
            <div className="gm-main-project-grid">
              {PROJECT_AREAS.map((project) => (
                <article key={project.title} className="gm-main-project-card">
                  <h3>{project.title}</h3>
                  <p>{project.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="current-trips" className="gm-main-section gm-main-section-compact">
          <div className="gm-main-centered">
            <span style={overline}>Current Trips</span>
            <h2 style={h2Style}>A clearer path from interest to registration.</h2>
            <div className="gm-main-trip-grid">
              {CURRENT_TRIPS.map((trip) => (
                <article key={trip.location} className="gm-main-trip-card">
                  <span>{trip.status}</span>
                  <h3>{trip.location}</h3>
                  <p>{trip.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reports" className="gm-main-report-section">
          <div className="gm-main-report-copy">
            <span style={overline}>Latest Report</span>
            <h2 style={{ ...h2Style, textAlign: "left", marginLeft: 0 }}>{latestNewsletter.title}</h2>
            <p>{latestNewsletter.snippet}</p>
            <Link href={latestNewsletter.href} className="gm-primary-button">Read the Latest Newsletter →</Link>
          </div>
          <Link href={latestNewsletter.href} className="gm-main-report-image" aria-label="Open latest newsletter">
            <Image
              src={latestNewsletter.image?.src ?? "/images/newsletter-2026.avif"}
              alt={latestNewsletter.image?.alt ?? "Global Missions report"}
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              style={{ objectFit: "cover", filter: "grayscale(100%)" }}
            />
          </Link>
        </section>

        <section id="videos" className="gm-main-section gm-main-section-tint">
          <div className="gm-main-centered">
            <span style={overline}>Videos</span>
            <h2 style={h2Style}>Mission reports people can actually revisit.</h2>
            <p style={{ ...bodyStyle, marginBottom: 32 }}>
              The future videos page should become a curated report library. For now, the homepage keeps a direct channel path while we decide whether videos are CMS-curated or pulled from YouTube.
            </p>
            <a href={YOUTUBE_URL} className="gm-primary-button">Watch on YouTube →</a>
          </div>
        </section>

        <section id="give" className="gm-main-give-section">
          <div className="gm-main-centered">
            <span style={overline}>Give</span>
            <h2 style={h2Style}>Move generosity toward the field.</h2>
            <p style={{ ...bodyStyle, marginBottom: 40 }}>
              The new Give page will eventually clarify funds, recurring partnerships, Planters, mission trips, and infrastructure. This draft keeps the action simple while credentials and final fund links are collected.
            </p>
            <div className="gm-main-actions">
              <a href={GIVE_URL} className="gm-hero-action gm-hero-primary">Give to Global Missions</a>
              <a href={PLANTERS_GIVE_URL} className="gm-hero-action gm-hero-secondary">Join Planters</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
