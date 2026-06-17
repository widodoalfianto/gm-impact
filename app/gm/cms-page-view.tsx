import { CmsBlockView } from "./cms-newsletter-sections";
import { DISPLAY, SANS, THEME } from "./data";
import { SiteFooter } from "./footer";
import { ResponsiveNav } from "./responsive-nav";
import { pageStyle } from "./theme-vars";
import type { CmsPage, CmsSiteSettings } from "../../sanity/lib/types";
import "./styles.css";

export function CmsPageView({
  page,
  settings,
}: {
  page: CmsPage;
  settings?: CmsSiteSettings | null;
}) {
  return (
    <div className="gm-page" style={pageStyle}>
      <ResponsiveNav />
      <main>
        {page.sections?.map((section) => (
          <CmsBlockView key={section._key} section={section} />
        ))}
      </main>
      <SiteFooter settings={settings ?? undefined} />
      <style>{`
        .gm-cms-section h2 {
          font-family: ${SANS};
        }
        .gm-cms-hero-block h2 em,
        .gm-cms-accent {
          color: ${THEME.heroAccent};
          font-family: ${DISPLAY};
        }
      `}</style>
    </div>
  );
}
