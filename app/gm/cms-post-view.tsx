import {
  CmsImageView,
  CmsNewsletterSectionView,
} from "./cms-newsletter-sections";
import { DISPLAY, SANS, THEME } from "./data";
import { SiteFooter } from "./footer";
import { ResponsiveNav } from "./responsive-nav";
import { pageStyle } from "./theme-vars";
import type { CmsPost, CmsSiteSettings } from "../../sanity/lib/types";
import "./styles.css";

export function CmsPostView({
  post,
  settings,
}: {
  post: CmsPost;
  settings?: CmsSiteSettings | null;
}) {
  return (
    <div className="gm-page" style={pageStyle}>
      <ResponsiveNav />
      <main>
        <section className="gm-cms-hero">
          <span>{post.eyebrow}</span>
          <h1>
            {post.heroHeading}
            {post.heroAccent ? (
              <>
                <br />
                <em>{post.heroAccent}</em>
              </>
            ) : null}
          </h1>
          <p>{post.summary}</p>
          {post.country ? (
            <div className="gm-cms-country-list">
              <span>{post.country.name}</span>
            </div>
          ) : null}
          {post.heroImage ? (
            <div className="gm-cms-hero-image">
              <CmsImageView image={post.heroImage} />
            </div>
          ) : null}
        </section>
        {post.sections?.map((section) => (
          <CmsNewsletterSectionView key={section._key} section={section} />
        ))}
      </main>
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
  );
}
