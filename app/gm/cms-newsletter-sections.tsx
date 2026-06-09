import { PortableText } from "@portabletext/react";
import { stegaClean } from "next-sanity";
import { Image } from "next-sanity/image";
import { urlFor } from "../../sanity/lib/image";
import type {
  CmsImage,
  CmsMetric,
  CmsNewsletterSection,
} from "../../sanity/lib/types";

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

export function CmsNewsletterSectionView({
  section,
}: {
  section: CmsNewsletterSection;
}) {
  switch (section._type) {
    case "impactGrid":
      return (
        <section className="gm-cms-section gm-cms-impact">
          <div className="gm-cms-section-inner">
            <h2>{section.heading}</h2>
            {section.intro ? <p>{section.intro}</p> : null}
            <MetricGrid metrics={section.metrics} />
          </div>
        </section>
      );
    case "storySection":
      return (
        <section className="gm-cms-section">
          <div
            className={`gm-cms-story${section.image ? " has-image" : ""}`}
          >
            <div>
              {section.eyebrow ? <span>{section.eyebrow}</span> : null}
              <h2>{section.heading}</h2>
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
            <h2>{section.heading}</h2>
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
            <h2>{section.heading}</h2>
            {section.description ? <p>{section.description}</p> : null}
            {embedUrl ? (
              <div className="gm-cms-video">
                <iframe
                  src={embedUrl}
                  title={section.heading}
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
            <h2>{section.heading}</h2>
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
            <h2>{section.heading}</h2>
            <p>{section.description}</p>
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
