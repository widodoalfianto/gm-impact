import { stegaClean } from "next-sanity";
import { CmsGlobalImpactNewsletter } from "./cms-global-impact-newsletter";
import {
  CmsImageView,
  CmsNewsletterSectionView,
} from "./cms-newsletter-sections";
import { SiteFooter } from "./footer";
import { ResponsiveNav } from "./responsive-nav";
import { DISPLAY, SANS, THEME } from "./data";
import { pageStyle } from "./theme-vars";
import type { CmsNewsletter } from "../../sanity/lib/types";
import "./styles.css";

export function CmsNewsletterPreview({
  newsletter,
}: {
  newsletter: CmsNewsletter;
}) {
  return (
    <div className="gm-page" style={pageStyle}>
      <ResponsiveNav />
      {stegaClean(newsletter.newsletterType) === "globalImpact" ? (
        <CmsGlobalImpactNewsletter newsletter={newsletter} />
      ) : (
        <main>
        <section className="gm-cms-hero">
          <span>{newsletter.eyebrow}</span>
          <h1>
            {newsletter.heroHeading}
            {newsletter.heroAccent ? (
              <>
                <br />
                <em>{newsletter.heroAccent}</em>
              </>
            ) : null}
          </h1>
          <p>{newsletter.summary}</p>
          {newsletter.countries?.length ? (
            <div className="gm-cms-country-list">
              {newsletter.countries.map((country) => (
                <span key={country._id}>{country.name}</span>
              ))}
            </div>
          ) : null}
          {newsletter.heroImage ? (
            <div className="gm-cms-hero-image">
              <CmsImageView image={newsletter.heroImage} />
            </div>
          ) : null}
        </section>
        {newsletter.sections?.map((section) => (
          <CmsNewsletterSectionView key={section._key} section={section} />
        ))}
        </main>
      )}
      <SiteFooter />
      <style>{`
        .gm-cms-hero h1,
        .gm-cms-section h2 {
          font-family: ${SANS};
        }
        .gm-cms-hero h1 em {
          color: ${THEME.heroAccent};
          font-family: ${DISPLAY};
        }
      `}</style>
    </div>
  );
}
