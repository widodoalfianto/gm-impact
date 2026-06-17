import { stegaClean } from "next-sanity";
import { CmsGlobalImpactNewsletter } from "./cms-global-impact-newsletter";
import {
  AccentText,
  CmsBlockView,
  CmsImageView,
  EditDocProvider,
} from "./cms-newsletter-sections";
import { SiteFooter } from "./footer";
import { ResponsiveNav } from "./responsive-nav";
import { DISPLAY, SANS, THEME } from "./data";
import { pageStyle } from "./theme-vars";
import type { CmsNewsletter, CmsSiteSettings } from "../../sanity/lib/types";
import "./styles.css";

export function CmsNewsletterPreview({
  newsletter,
  settings,
}: {
  newsletter: CmsNewsletter;
  settings?: CmsSiteSettings | null;
}) {
  // A video-led update (e.g. the "Project update - video" template) leads with
  // the video and skips the hero title entirely — it's just the video and the
  // update blocks below it. Triggered when the first block is a video/embed.
  const sections = newsletter.sections ?? [];
  const leadVideo =
    sections[0]?._type === "videoSection" || sections[0]?._type === "embedBlock"
      ? sections[0]
      : null;
  const bodySections = leadVideo ? sections.slice(1) : sections;

  return (
    <EditDocProvider id={newsletter._id} type="newsletter">
    <div className="gm-page" style={pageStyle}>
      <ResponsiveNav />
      {stegaClean(newsletter.newsletterType) === "globalImpact" ? (
        <CmsGlobalImpactNewsletter newsletter={newsletter} />
      ) : (
        <main>
        {leadVideo ? <CmsBlockView section={leadVideo} /> : null}
        {leadVideo ? null : (
        <section className="gm-cms-hero">
          <span>{newsletter.eyebrow}</span>
          <h1>
            <AccentText value={newsletter.heroHeading} />
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
        )}
        {bodySections.map((section) => (
          <CmsBlockView key={section._key} section={section} />
        ))}
        </main>
      )}
      <SiteFooter settings={settings ?? undefined} />
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
    </EditDocProvider>
  );
}
